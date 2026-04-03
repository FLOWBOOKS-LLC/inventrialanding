import crypto from "crypto";
import axios from "axios";

/**
 * Calendly webhook signatures: https://developer.calendly.com/api-docs/4c305798a61d3-webhook-signatures
 * Signed payload: `${timestamp}.${rawBodyString}`
 */
export function verifyCalendlySignature(rawBodyBuffer, signatureHeader, signingKey) {
  if (!signingKey || !signatureHeader || !Buffer.isBuffer(rawBodyBuffer)) {
    return false;
  }

  const raw = rawBodyBuffer.toString("utf8");
  const parts = String(signatureHeader).split(",");
  let timestamp;
  let v1;
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key === "t") timestamp = value;
    if (key === "v1") v1 = value;
  }
  if (!timestamp || !v1) return false;

  const signedPayload = `${timestamp}.${raw}`;
  const expectedHex = crypto.createHmac("sha256", signingKey).update(signedPayload, "utf8").digest("hex");

  try {
    const a = Buffer.from(v1, "hex");
    const b = Buffer.from(expectedHex, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

async function fetchCalendlyResource(url, token) {
  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 15000,
  });
  return data?.resource ?? data;
}

/**
 * Resolves invitee + scheduled event URLs from the webhook into readable fields.
 */
export async function enrichCalendlyWebhookPayload(body, personalAccessToken) {
  const p = body?.payload;
  if (!p || !personalAccessToken) return body;

  const out = { ...body, _resolved: {} };

  try {
    if (typeof p.invitee === "string" && p.invitee.startsWith("http")) {
      out._resolved.invitee = await fetchCalendlyResource(p.invitee, personalAccessToken);
    }
  } catch (e) {
    console.warn("[Calendly] invitee fetch failed:", e?.message);
  }

  try {
    const eventUri = p.scheduled_event || p.event;
    if (typeof eventUri === "string" && eventUri.startsWith("http")) {
      out._resolved.scheduled_event = await fetchCalendlyResource(eventUri, personalAccessToken);
    }
  } catch (e) {
    console.warn("[Calendly] scheduled_event fetch failed:", e?.message);
  }

  return out;
}

function formatBookingSummary(enriched) {
  const inv = enriched?._resolved?.invitee;
  const ev = enriched?._resolved?.scheduled_event;
  const lines = [];

  lines.push(`Event: ${enriched?.event ?? "unknown"}`);
  lines.push("");

  if (inv) {
    lines.push(`Invitee: ${inv.name ?? "(no name)"}`);
    lines.push(`Email: ${inv.email ?? "(no email)"}`);
    if (inv.timezone) lines.push(`Timezone: ${inv.timezone}`);
    lines.push("");
  }

  if (ev) {
    lines.push(`Start: ${ev.start_time ?? "(unknown)"}`);
    lines.push(`End: ${ev.end_time ?? "(unknown)"}`);
    if (ev.location?.location) lines.push(`Location: ${ev.location.location}`);
    lines.push("");
  }

  lines.push("Full payload (JSON):");
  lines.push(JSON.stringify(enriched, null, 2));
  return lines.join("\n");
}

export async function sendCalendlyBookingEmail({ to, from, subject, text, resendApiKey }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend ${res.status}: ${errText}`);
  }
}

export async function processCalendlyWebhook(rawBodyBuffer, signatureHeader) {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY?.trim();
  const allowUnsigned = process.env.CALENDLY_WEBHOOK_ALLOW_UNSIGNED === "true";

  if (signingKey) {
    if (!verifyCalendlySignature(rawBodyBuffer, signatureHeader, signingKey)) {
      const err = new Error("Invalid Calendly webhook signature");
      err.statusCode = 401;
      throw err;
    }
  } else if (!allowUnsigned) {
    const err = new Error(
      "Calendly webhook is not configured: set CALENDLY_WEBHOOK_SIGNING_KEY (or CALENDLY_WEBHOOK_ALLOW_UNSIGNED=true for local testing only)"
    );
    err.statusCode = 503;
    throw err;
  } else {
    console.warn("[Calendly] Webhook accepted without signature verification (CALENDLY_WEBHOOK_ALLOW_UNSIGNED=true)");
  }

  let body;
  try {
    body = JSON.parse(rawBodyBuffer.toString("utf8"));
  } catch {
    const err = new Error("Invalid JSON body");
    err.statusCode = 400;
    throw err;
  }

  const eventType = body?.event ?? "unknown";
  const pat = process.env.CALENDLY_PERSONAL_ACCESS_TOKEN?.trim();
  const enriched = pat ? await enrichCalendlyWebhookPayload(body, pat) : body;

  const notifyEmail = process.env.CALENDLY_NOTIFY_EMAIL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.CALENDLY_EMAIL_FROM?.trim() || "Flowbooks <onboarding@resend.dev>";

  console.log("[Calendly webhook]", eventType, notifyEmail ? `(notify → ${notifyEmail})` : "");

  if (notifyEmail && resendKey) {
    const text = formatBookingSummary(enriched);
    const subject = `New Calendly booking — ${eventType}`;
    await sendCalendlyBookingEmail({
      to: notifyEmail,
      from,
      subject,
      text,
      resendApiKey: resendKey,
    });
    console.log("[Calendly webhook] Notification email sent.");
  } else if (notifyEmail && !resendKey) {
    console.log("[Calendly webhook] Set RESEND_API_KEY to email summaries. Payload:\n", JSON.stringify(enriched, null, 2));
  } else {
    console.log("[Calendly webhook] Set CALENDLY_NOTIFY_EMAIL (+ RESEND_API_KEY) to receive booking emails.");
  }

  return { eventType };
}
