async function sendResendEmail({ to, from, subject, text, html, replyTo, resendApiKey }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      ...(html ? { html } : {}),
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend ${res.status}: ${errText}`);
  }

  return res.json().catch(() => ({}));
}

function asList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function formatAssessmentText(payload) {
  const lines = [];
  lines.push("NDP Act / GAID Client Assessment submission");
  lines.push(`Submitted at: ${new Date().toISOString()}`);
  lines.push("");

  const sections = [
    ["Organisation profile", payload.organisation],
    ["Contact & governance", payload.contact],
    ["Personal data volume", payload.dataVolume],
    ["Systems & processing", payload.systems],
    ["Budget & commercial", payload.budget],
    ["Declaration", payload.declaration],
  ];

  for (const [title, data] of sections) {
    lines.push(`=== ${title} ===`);
    if (!data || typeof data !== "object") {
      lines.push("(none)");
      lines.push("");
      continue;
    }
    for (const [key, value] of Object.entries(data)) {
      lines.push(`${key}: ${value ?? ""}`);
    }
    lines.push("");
  }

  lines.push("=== Registration status ===");
  lines.push(payload.registrationStatus || "(not provided)");
  lines.push("");

  lines.push("=== Existing controls ===");
  const existing = asList(payload.existingControls);
  lines.push(existing.length ? existing.map((item) => `- ${item}`).join("\n") : "(none selected)");
  lines.push("");

  lines.push("=== Services requested ===");
  const requested = asList(payload.requestedServices);
  lines.push(requested.length ? requested.map((item) => `- ${item}`).join("\n") : "(none selected)");
  if (payload.requestedOther) {
    lines.push(`Other: ${payload.requestedOther}`);
  }
  lines.push("");

  lines.push("=== Raw JSON ===");
  lines.push(JSON.stringify(payload, null, 2));

  return lines.join("\n");
}

function formatAssessmentHtml(payload) {
  const escape = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const rows = (obj) =>
    obj && typeof obj === "object"
      ? Object.entries(obj)
          .map(
            ([key, value]) =>
              `<tr><td style="padding:6px 10px;border:1px solid #e5e7eb;font-weight:600;">${escape(
                key
              )}</td><td style="padding:6px 10px;border:1px solid #e5e7eb;">${escape(
                value
              )}</td></tr>`
          )
          .join("")
      : "";

  const list = (items) => {
    const values = asList(items);
    if (!values.length) return "<p>(none selected)</p>";
    return `<ul>${values.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>`;
  };

  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.5;">
      <h2>NDP Act / GAID Client Assessment</h2>
      <p>Submitted at ${escape(new Date().toISOString())}</p>

      <h3>Organisation profile</h3>
      <table style="border-collapse:collapse;width:100%;">${rows(payload.organisation)}</table>

      <h3>Contact &amp; governance</h3>
      <table style="border-collapse:collapse;width:100%;">${rows(payload.contact)}</table>

      <h3>Personal data volume</h3>
      <table style="border-collapse:collapse;width:100%;">${rows(payload.dataVolume)}</table>

      <h3>Systems &amp; processing</h3>
      <table style="border-collapse:collapse;width:100%;">${rows(payload.systems)}</table>

      <h3>Registration status</h3>
      <p>${escape(payload.registrationStatus || "(not provided)")}</p>

      <h3>Existing controls</h3>
      ${list(payload.existingControls)}

      <h3>Services requested</h3>
      ${list(payload.requestedServices)}
      ${payload.requestedOther ? `<p><strong>Other:</strong> ${escape(payload.requestedOther)}</p>` : ""}

      <h3>Budget &amp; commercial</h3>
      <table style="border-collapse:collapse;width:100%;">${rows(payload.budget)}</table>

      <h3>Declaration</h3>
      <table style="border-collapse:collapse;width:100%;">${rows(payload.declaration)}</table>
    </div>
  `;
}

export async function submitComplianceAssessment(payload) {
  const contactEmail = String(payload?.contact?.email || "").trim();
  const contactName = String(payload?.contact?.name || payload?.declaration?.name || "Client").trim();
  const orgName = String(payload?.organisation?.legalName || "Organisation").trim();

  if (!contactEmail) {
    const err = new Error("Primary contact email is required.");
    err.statusCode = 400;
    throw err;
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (!resendApiKey) {
    const err = new Error("Email is not configured. Set RESEND_API_KEY on the backend.");
    err.statusCode = 503;
    throw err;
  }

  const notifyEmail =
    process.env.ASSESSMENT_NOTIFY_EMAIL?.trim() ||
    process.env.CALENDLY_NOTIFY_EMAIL?.trim() ||
    "muhammad.fahad@flowbooks.org";

  const from =
    process.env.ASSESSMENT_EMAIL_FROM?.trim() ||
    process.env.CALENDLY_EMAIL_FROM?.trim() ||
    "Flowbooks <onboarding@resend.dev>";

  const text = formatAssessmentText(payload);
  const html = formatAssessmentHtml(payload);

  await sendResendEmail({
    to: notifyEmail,
    from,
    subject: `Data compliance assessment — ${orgName}`,
    text,
    html,
    replyTo: contactEmail,
    resendApiKey,
  });

  const clientText = [
    `Dear ${contactName},`,
    "",
    "Thank you for completing the Flowbooks NDP Act / GAID data compliance assessment.",
    "",
    `We have received your submission for ${orgName}. Our team will review your answers and send you a tailored proposal covering:`,
    "- Likely classification tier (UHL / EHL / OHL / not of major importance)",
    "- Registration + CAR roadmap (where applicable)",
    "- Fee lines: NDPC registration fee, NDPC CAR fee (if any), and our professional fees",
    "",
    "If you have supporting documents (CAC status, privacy notice, NDPC certificate, etc.), you can reply to this email with attachments.",
    "",
    "Kind regards,",
    "Flowbooks Data Compliance Team",
    "muhammad.fahad@flowbooks.org",
  ].join("\n");

  await sendResendEmail({
    to: contactEmail,
    from,
    subject: `We received your data compliance assessment — ${orgName}`,
    text: clientText,
    replyTo: notifyEmail,
    resendApiKey,
  });

  return {
    ok: true,
    notified: notifyEmail,
    clientEmail: contactEmail,
  };
}
