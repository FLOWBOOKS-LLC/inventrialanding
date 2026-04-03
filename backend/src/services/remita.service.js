import axios from "axios";
import crypto from "crypto";

const baseRequiredKeys = ["REMITA_BASE_URL", "REMITA_CALLBACK_URL"];

let cachedBearer = null;
let cachedBearerExpMs = 0;

function hasLegacyCredentials() {
  return Boolean(
    process.env.REMITA_MERCHANT_ID &&
      process.env.REMITA_SERVICE_TYPE_ID &&
      process.env.REMITA_API_KEY
  );
}

function hasConnectCredentials() {
  return Boolean(process.env.REMITA_PUBLIC_KEY && process.env.REMITA_SECRET_KEY);
}

function getRemitaMode() {
  if (hasConnectCredentials()) return "connect";
  if (hasLegacyCredentials()) return "legacy";
  return "unconfigured";
}

export function validateRemitaConfig() {
  const missingBase = baseRequiredKeys.filter((key) => !process.env[key]);
  const mode = getRemitaMode();

  const missingCredentials =
    mode !== "unconfigured"
      ? []
      : [
          "Either set REMITA_PUBLIC_KEY + REMITA_SECRET_KEY (Connect) OR REMITA_MERCHANT_ID + REMITA_SERVICE_TYPE_ID + REMITA_API_KEY (Legacy)",
        ];

  const missing = [...missingBase, ...missingCredentials];
  return { ok: missing.length === 0, missing, mode };
}

export function buildRemitaHash(orderId, amount) {
  const raw = `${process.env.REMITA_MERCHANT_ID}${process.env.REMITA_SERVICE_TYPE_ID}${orderId}${amount}${process.env.REMITA_API_KEY}`;
  return crypto.createHash("sha512").update(raw).digest("hex");
}

async function getBearerTokenIfConfigured() {
  if (hasConnectCredentials()) return null;
  if (!process.env.REMITA_API_TOKEN) return null;

  const now = Date.now();
  if (cachedBearer && cachedBearerExpMs - now > 30_000) return cachedBearer;

  const tokenUrl =
    process.env.REMITA_TOKEN_URL ||
    `${process.env.REMITA_BASE_URL}/remita/exapp/api/v1/send/api/uaasvc/uaa/token`;

  // Remita UAAS token endpoints are commonly token-based auth. We’ll support the
  // simplest expected shape: apiKey + apiToken (you provided both).
  const { data } = await axios.post(
    tokenUrl,
    {
      apiKey: process.env.REMITA_API_KEY,
      apiToken: process.env.REMITA_API_TOKEN,
    },
    { headers: { "Content-Type": "application/json" }, timeout: 20000 }
  );

  const accessToken =
    data?.access_token || data?.accessToken || data?.token || data?.data?.token;
  const expiresIn =
    Number(data?.expires_in || data?.expiresIn || data?.expiry || 3600) || 3600;

  if (!accessToken) {
    throw new Error("Failed to obtain Remita access token (no token in response).");
  }

  cachedBearer = String(accessToken);
  cachedBearerExpMs = now + expiresIn * 1000;
  return cachedBearer;
}

function buildInitPayload(payload, mode) {
  const orderId = payload.orderId ?? `INV-${Date.now()}`;
  const amount = Number(payload.amount);

  if (!amount || Number.isNaN(amount) || amount <= 0) {
    throw new Error("Valid amount is required.");
  }
  if (!payload.email) {
    throw new Error("Customer email is required.");
  }

  if (mode === "connect") {
    return {
      reference: orderId,
      amount: amount.toFixed(2),
      currency: payload.currency ?? process.env.REMITA_CURRENCY ?? "NGN",
      customer: {
        email: payload.email,
        firstName: payload.firstName ?? payload.payerName ?? "Customer",
        lastName: payload.lastName ?? "",
        phone: payload.phone ?? "",
      },
      description: payload.description ?? "Inventria pricing payment",
      callbackUrl: process.env.REMITA_CALLBACK_URL,
      metadata: payload.metadata ?? {},
    };
  }

  return {
    merchantId: process.env.REMITA_MERCHANT_ID,
    serviceTypeId: process.env.REMITA_SERVICE_TYPE_ID,
    amount: amount.toFixed(2),
    orderId,
    payerName: payload.payerName ?? "Customer",
    payerEmail: payload.email,
    payerPhone: payload.phone ?? "",
    description: payload.description ?? "Inventria pricing payment",
  };
}

function buildConnectHeaders() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REMITA_SECRET_KEY}`,
    "x-public-key": process.env.REMITA_PUBLIC_KEY,
  };
  return headers;
}

function extractConnectRedirectUrl(data) {
  // Remita Connect response shapes can vary by product/version.
  // We defensively check common fields.
  const candidates = [
    data?.paymentUrl,
    data?.checkoutUrl,
    data?.authorizationUrl,
    data?.link,
    data?.url,
    data?.data?.paymentUrl,
    data?.data?.checkoutUrl,
    data?.data?.authorizationUrl,
    data?.data?.link,
    data?.data?.url,
    data?.response?.paymentUrl,
    data?.response?.checkoutUrl,
    data?.response?.authorizationUrl,
    data?.response?.link,
    data?.response?.url,
  ].filter(Boolean);

  const first = candidates[0];
  return first ? String(first) : null;
}

export async function initiateRemitaPayment(input) {
  const mode = getRemitaMode();
  if (mode === "unconfigured") {
    throw new Error("Remita credentials are not configured.");
  }

  const payload = buildInitPayload(input, mode);
  const path =
    mode === "connect"
      ? process.env.REMITA_CONNECT_INIT_PATH || "/payment/v1/payments"
      : process.env.REMITA_INIT_PATH ||
        "/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit";
  const url = `${process.env.REMITA_BASE_URL}${path}`;

  const body =
    mode === "connect"
      ? payload
      : {
          ...payload,
          hash: buildRemitaHash(payload.orderId, payload.amount),
          callbackUrl: process.env.REMITA_CALLBACK_URL,
        };

  const bearer = mode === "legacy" ? await getBearerTokenIfConfigured() : null;

  const { data } = await axios.post(url, body, {
    headers:
      mode === "connect"
        ? buildConnectHeaders()
        : {
            "Content-Type": "application/json",
            ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
          },
    timeout: 20000,
  });

  const redirectUrl = mode === "connect" ? extractConnectRedirectUrl(data) : null;

  return {
    mode,
    orderId: payload.orderId || payload.reference,
    amount: payload.amount,
    redirectUrl,
    data,
  };
}

export async function verifyRemitaPayment(rrr) {
  if (!rrr) throw new Error("RRR is required");

  const mode = getRemitaMode();
  if (mode === "unconfigured") {
    throw new Error("Remita credentials are not configured.");
  }

  const path =
    mode === "connect"
      ? (process.env.REMITA_CONNECT_VERIFY_PATH || "/payment/v1/payments/{reference}").replace(
          "{reference}",
          encodeURIComponent(rrr)
        )
      : (
          process.env.REMITA_STATUS_PATH ||
          "/remita/exapp/api/v1/send/api/echannelsvc/merchant/{merchantId}/{rrr}/status.reg"
        )
          .replace("{merchantId}", process.env.REMITA_MERCHANT_ID)
          .replace("{rrr}", encodeURIComponent(rrr));

  const url = `${process.env.REMITA_BASE_URL}${path}`;

  const bearer = mode === "legacy" ? await getBearerTokenIfConfigured() : null;

  const { data } = await axios.get(url, {
    headers:
      mode === "connect"
        ? buildConnectHeaders()
        : {
            "Content-Type": "application/json",
            ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
          },
    timeout: 20000,
  });

  return data;
}
