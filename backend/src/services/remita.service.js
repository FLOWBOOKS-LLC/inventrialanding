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

function getRemitaMode(preferredChannel) {
  // Bank RRR invoices require the legacy merchant paymentinit API.
  if (preferredChannel === "rrr" || preferredChannel === "bank") {
    return hasLegacyCredentials() ? "legacy" : "unconfigured";
  }
  if (hasConnectCredentials()) return "connect";
  if (hasLegacyCredentials()) return "legacy";
  return "unconfigured";
}

export function validateRemitaConfig(preferredChannel) {
  const missingBase = baseRequiredKeys.filter((key) => !process.env[key]);
  const mode = getRemitaMode(preferredChannel);

  let missingCredentials = [];
  if (mode === "unconfigured") {
    if (preferredChannel === "rrr" || preferredChannel === "bank") {
      missingCredentials = [
        "REMITA_MERCHANT_ID + REMITA_SERVICE_TYPE_ID + REMITA_API_KEY are required to generate bank RRRs",
      ];
    } else {
      missingCredentials = [
        "Either set REMITA_PUBLIC_KEY + REMITA_SECRET_KEY (Connect checkout) OR REMITA_MERCHANT_ID + REMITA_SERVICE_TYPE_ID + REMITA_API_KEY (RRR / bank)",
      ];
    }
  }

  const missing = [...missingBase, ...missingCredentials];
  return { ok: missing.length === 0, missing, mode };
}

export function buildRemitaHash(orderId, amount) {
  const raw = `${process.env.REMITA_MERCHANT_ID}${process.env.REMITA_SERVICE_TYPE_ID}${orderId}${amount}${process.env.REMITA_API_KEY}`;
  return crypto.createHash("sha512").update(raw).digest("hex");
}

function safeReturnUrl(value) {
  const fallback = process.env.REMITA_CALLBACK_URL || "";
  if (!value || typeof value !== "string") return fallback;
  try {
    const url = new URL(value);
    const host = url.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host.endsWith("flowbooks.org")) {
      return url.toString();
    }
  } catch {
    return fallback;
  }
  return fallback;
}

function isDemoRemita(base) {
  return /demo\.remita\.net|remitademo\.net/i.test(base || "");
}

export function buildPayNow(rrr, returnUrl) {
  const merchantId = process.env.REMITA_MERCHANT_ID;
  const hash = crypto
    .createHash("sha512")
    .update(`${merchantId}${rrr}${process.env.REMITA_API_KEY}`)
    .digest("hex");
  const base = (process.env.REMITA_BASE_URL || "https://demo.remita.net").replace(/\/$/, "");
  const publicKey = process.env.REMITA_PUBLIC_KEY || "";
  const widgetBase =
    publicKey.startsWith("pk_test_") || isDemoRemita(base)
      ? "https://demo.remita.net"
      : "https://login.remita.net";
  // demo.remita.net/remita/ecomm/finalize.reg 302s to live remita.net, which
  // rejects sandbox RRRs as "Invalid RRR". The demo pay page accepts them.
  const demo = isDemoRemita(base);
  return {
    mode: demo ? "page" : "redirect",
    url: demo
      ? `https://demo.remita.net/pay/pay-rrr/${encodeURIComponent(rrr)}`
      : `${base}/remita/ecomm/finalize.reg`,
    scriptUrl: `${widgetBase}/payment/v1/remita-pay-inline.bundle.js`,
    publicKey,
    fields: {
      merchantId,
      rrr,
      hash,
      responseurl: safeReturnUrl(returnUrl),
    },
  };
}

function checkoutBaseUrl() {
  const configured = process.env.REMITA_CHECKOUT_BASE_URL;
  if (configured) return String(configured).replace(/\/$/, "");
  const key = process.env.REMITA_PUBLIC_KEY || "";
  return key.startsWith("pk_test_")
    ? "https://api-checkout-demo.systemspecsng.com/api/v1"
    : "https://api-checkout.remita.net/api/v1";
}

function checkoutHeaders() {
  return {
    "Content-Type": "application/json",
    publicKey: process.env.REMITA_PUBLIC_KEY || "",
  };
}

function checkoutPhone(value) {
  const digits = String(value || "").replace(/[^\d]/g, "");
  if (digits.startsWith("234") && digits.length >= 13) return `0${digits.slice(3, 13)}`;
  if (digits.startsWith("0") && digits.length >= 11) return digits.slice(0, 11);
  return "08000000000";
}

function nairaToKobo(amount) {
  const naira = Number(amount);
  if (!Number.isFinite(naira) || naira <= 0) {
    throw new Error("Valid amount is required.");
  }
  return Math.round(naira * 100);
}

function assertCheckoutOk(data, fallback) {
  if (String(data?.status) === "00" && data?.data) return data.data;
  const message = data?.message || data?.data?.processorResponse || fallback;
  throw new Error(message || fallback);
}

export async function listCheckoutBanks() {
  const { data } = await axios.get(`${checkoutBaseUrl()}/misc/ussd-codes`, {
    headers: checkoutHeaders(),
    timeout: 20000,
  });
  const list = Array.isArray(data?.data) ? data.data : [];
  return list
    .map((item) => ({
      code: String(item.code || ""),
      name: String(item.shortname || item.shortName || item.code || ""),
    }))
    .filter((item) => item.code);
}

export async function createConnectCheckout(input) {
  if (!hasConnectCredentials()) {
    throw new Error("Remita Connect keys are not configured.");
  }
  if (!input?.email) throw new Error("Customer email is required.");

  const paymentIdentifier = `${String(input.orderId || "FB").replace(/[^\w-]/g, "").slice(0, 24)}-${Date.now()}`;
  const firstName = String(input.firstName || input.payerName || "Customer").trim() || "Customer";
  const lastName = String(input.lastName || "Customer").trim() || "Customer";
  const amount = nairaToKobo(input.amount);
  const response = await axios.post(
    `${checkoutBaseUrl()}/payment/pre`,
    {
      useRRR: false,
      firstName,
      lastName,
      email: String(input.email).trim(),
      phoneNumber: checkoutPhone(input.phone),
      currency: "NGN",
      narration: String(input.description || input.planName || "Flowbooks Connect").slice(0, 120),
      amount,
      paymentIdentifier,
      tokenize: false,
    },
    { headers: checkoutHeaders(), timeout: 20000 }
  );
  const payment = assertCheckoutOk(response.data, "Remita test checkout did not start.");
  const banks = await listCheckoutBanks().catch(() => []);
  return {
    paymentIdentifier: payment.paymentIdentifier || paymentIdentifier,
    rrr: String(payment.rrrNumber || ""),
    amountKobo: Number(payment.amount || amount),
    totalKobo: Number(payment.totalAmountWithFee || payment.amount || amount),
    currency: payment.paymentCurrency || "NGN",
    channels: Array.isArray(payment.channels) ? payment.channels : [],
    banks,
    test: String(process.env.REMITA_PUBLIC_KEY || "").startsWith("pk_test_"),
  };
}

export async function startCheckoutUssd(input) {
  if (!input?.paymentIdentifier || !input?.rrr || !input?.bankCode) {
    throw new Error("Payment, RRR, and bank are required.");
  }
  const response = await axios.post(
    `${checkoutBaseUrl()}/payment/initiate`,
    {
      paymentIdentifier: input.paymentIdentifier,
      paymentChannel: "USSD",
      rrrNumber: input.rrr,
      bankCode: input.bankCode,
      amount: Number(input.amountKobo),
      currency: "NGN",
    },
    { headers: checkoutHeaders(), timeout: 20000 }
  );
  const payment = assertCheckoutOk(response.data, "Remita could not start the USSD payment.");
  const meta = payment.metaData || {};
  return {
    dialCode: meta.dialCode || "",
    rrr: meta.rrr || input.rrr,
    bank: meta.shortName || "",
    amountToBePaid: meta.amountToBePaid ?? payment.totalAmountWithFee ?? null,
    originalAmount: meta.originalAmount ?? null,
    message: response.data?.message || "Your payment is being processed.",
    paymentState: payment.paymentState || "PENDING",
  };
}

async function getBearerTokenIfConfigured() {
  if (hasConnectCredentials()) return null;
  if (!process.env.REMITA_API_TOKEN) return null;

  const now = Date.now();
  if (cachedBearer && cachedBearerExpMs - now > 30_000) return cachedBearer;

  const tokenUrl =
    process.env.REMITA_TOKEN_URL ||
    `${process.env.REMITA_BASE_URL}/remita/exapp/api/v1/send/api/uaasvc/uaa/token`;

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

function productLabel(product) {
  if (product === "connect_app") return "Flowbooks Connect (NRS e-invoicing)";
  if (product === "flowbooks_subscription") return "Flowbooks subscription (ERP / Accounting)";
  return "Flowbooks payment";
}

function buildInitPayload(payload, mode) {
  const orderId = payload.orderId ?? `FB-${Date.now()}`;
  const amount = Number(payload.amount);
  const product = payload.product || payload.metadata?.product || "flowbooks_subscription";
  const planName = payload.planName || payload.metadata?.plan || "";

  if (!amount || Number.isNaN(amount) || amount <= 0) {
    throw new Error("Valid amount is required.");
  }
  if (!payload.email) {
    throw new Error("Customer email is required.");
  }

  const description =
    payload.description ||
    `${productLabel(product)}${planName ? `: ${planName}` : ""}`;

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
      description,
      callbackUrl: process.env.REMITA_CALLBACK_URL,
      metadata: {
        ...(payload.metadata ?? {}),
        product,
        plan: planName,
      },
    };
  }

  return {
    merchantId: process.env.REMITA_MERCHANT_ID,
    serviceTypeId: process.env.REMITA_SERVICE_TYPE_ID,
    amount: amount.toFixed(2),
    orderId,
    payerName:
      payload.payerName ||
      [payload.firstName, payload.lastName].filter(Boolean).join(" ") ||
      "Customer",
    payerEmail: payload.email,
    payerPhone: payload.phone ?? "",
    description,
  };
}

function buildConnectHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REMITA_SECRET_KEY}`,
    "x-public-key": process.env.REMITA_PUBLIC_KEY,
  };
}

function extractConnectRedirectUrl(data) {
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

  return candidates[0] ? String(candidates[0]) : null;
}

function parsePossiblyJsonp(raw) {
  if (raw == null) return null;
  if (typeof raw === "object") return raw;
  const text = String(raw).trim();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

export function extractRrr(data) {
  const parsed = parsePossiblyJsonp(data) || data;
  const candidates = [
    parsed?.RRR,
    parsed?.rrr,
    parsed?.data?.RRR,
    parsed?.data?.rrr,
    parsed?.response?.RRR,
    parsed?.response?.rrr,
    parsed?.paymentReference,
    parsed?.data?.paymentReference,
  ].filter(Boolean);
  return candidates[0] ? String(candidates[0]) : null;
}

export async function initiateRemitaPayment(input) {
  const preferredChannel = String(input?.channel || input?.paymentMethod || "rrr").toLowerCase();
  const mode = getRemitaMode(preferredChannel);
  if (mode === "unconfigured") {
    throw new Error(
      preferredChannel === "rrr" || preferredChannel === "bank"
        ? "Remita legacy credentials are required to generate a bank RRR."
        : "Remita credentials are not configured."
    );
  }

  const product = input.product || input.metadata?.product || "flowbooks_subscription";
  const planName = input.planName || input.metadata?.plan || "";
  const payload = buildInitPayload({ ...input, product, planName }, mode);

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
  const legacyHash = mode === "legacy" ? body.hash : "";

  const response = await axios.post(url, body, {
    headers:
      mode === "connect"
        ? buildConnectHeaders()
        : {
            "Content-Type": "application/json",
            Authorization: bearer
              ? `Bearer ${bearer}`
              : `remitaConsumerKey=${process.env.REMITA_MERCHANT_ID},remitaConsumerToken=${legacyHash}`,
          },
    timeout: 20000,
    // Remita legacy sometimes returns text/jsonp
    transformResponse: [
      (data) => {
        if (typeof data === "string") {
          return parsePossiblyJsonp(data) || data;
        }
        return data;
      },
    ],
  });

  const data = response.data;
  const redirectUrl = mode === "connect" ? extractConnectRedirectUrl(data) : null;
  const rrr = extractRrr(data);

  return {
    mode,
    channel: preferredChannel,
    product,
    planName,
    orderId: payload.orderId || payload.reference,
    amount: payload.amount,
    currency: process.env.REMITA_CURRENCY || "NGN",
    rrr,
    redirectUrl,
    payNow: rrr ? buildPayNow(rrr, input.returnUrl) : null,
    bankPaymentInstructions: rrr
      ? [
          "Visit any commercial bank in Nigeria that supports Remita.",
          `Tell the teller you want to pay with Remita RRR: ${rrr}`,
          "Or pay via Remita channels (internet banking / Remita Retrieval Reference).",
          "Keep your payment receipt and verify the RRR on this page after payment.",
        ]
      : null,
    data,
  };
}

export async function verifyRemitaPayment(rrr) {
  if (!rrr) throw new Error("RRR is required");

  // Bank RRRs are confirmed on Remita's echannels status API. The merchant
  // status.reg path returns "Name is null" for these invoices.
  if (hasLegacyCredentials()) {
    const invoice = await fetchRrrInvoice(rrr);
    const statuscode = String(invoice.status ?? invoice.statuscode ?? "").trim();
    const message = String(invoice.message || invoice.statusMessage || "").trim();
    return {
      rrr: invoice.rrr,
      status: message || statuscode || null,
      statuscode: statuscode || null,
      amount: invoice.amount ?? null,
      raw: invoice,
    };
  }

  if (!hasConnectCredentials()) {
    throw new Error("Remita credentials are not configured.");
  }

  const path = (process.env.REMITA_CONNECT_VERIFY_PATH || "/payment/v1/payments/{reference}").replace(
    "{reference}",
    encodeURIComponent(rrr)
  );
  const url = `${process.env.REMITA_BASE_URL}${path}`;
  const { data } = await axios.get(url, {
    headers: buildConnectHeaders(),
    timeout: 20000,
    transformResponse: [
      (raw) => {
        if (typeof raw === "string") {
          return parsePossiblyJsonp(raw) || raw;
        }
        return raw;
      },
    ],
  });

  const parsed = parsePossiblyJsonp(data) || data;
  return {
    rrr,
    status:
      parsed?.status ||
      parsed?.message ||
      parsed?.data?.status ||
      parsed?.statusMessage ||
      null,
    statuscode: parsed?.statuscode || parsed?.statusCode || parsed?.data?.statuscode || null,
    amount: parsed?.amount || parsed?.data?.amount || null,
    raw: parsed,
  };
}

function remitaApiOrigin() {
  const base = process.env.REMITA_BASE_URL || "https://demo.remita.net";
  return isDemoRemita(base) ? "https://demo.remita.net" : "https://login.remita.net";
}

export async function fetchRrrInvoice(rrr) {
  const clean = String(rrr || "").replace(/\D/g, "");
  if (!/^\d{8,20}$/.test(clean)) {
    throw new Error("A valid RRR is required.");
  }
  const merchantId = process.env.REMITA_MERCHANT_ID;
  const apiKey = process.env.REMITA_API_KEY;
  if (!merchantId || !apiKey) {
    throw new Error("Remita merchant credentials are required to print the invoice.");
  }
  const hash = crypto.createHash("sha512").update(`${clean}${apiKey}${merchantId}`).digest("hex");
  const url = `${remitaApiOrigin()}/remita/exapp/api/v1/send/api/echannelsvc/${merchantId}/${clean}/${hash}/status.reg`;
  const { data } = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `remitaConsumerKey=${merchantId},remitaConsumerToken=${hash}`,
    },
    timeout: 20000,
  });
  const parsed = parsePossiblyJsonp(data) || data || {};
  if (!parsed.rrr && !parsed.RRR && parsed.status == null && parsed.message == null) {
    throw new Error("Remita did not return an invoice for this RRR.");
  }
  return { ...parsed, rrr: String(parsed.rrr || parsed.RRR || clean) };
}

function pdfEscape(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x20-\x7E]/g, "");
}

function naira(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "NGN 0.00";
  return `NGN ${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function buildRrrInvoicePdf(invoice) {
  const rrr = String(invoice.rrr || "");
  const amount = Number(invoice.amount || 0);
  const charge = Number(invoice.chargeFee || 0);
  const total = amount + (Number.isFinite(charge) ? charge : 0);
  const lines = [
    ["Status", invoice.message || invoice.status || ""],
    ["Payer", invoice.payerName || ""],
    ["Email", invoice.payerEmail || ""],
    ["Phone", invoice.payerPhoneNumber || ""],
    ["Amount", naira(amount)],
    ["Remita charge", naira(charge)],
    ["Total payable", naira(total)],
    ["Order", invoice.orderId || ""],
    ["Description", invoice.paymentDescription || ""],
    ["Beneficiary", invoice.billerName || ""],
    ["Date", invoice.transactionDate || ""],
  ];
  const steps = [
    "1. Visit any commercial bank in Nigeria that supports Remita.",
    `2. Tell the teller you want to pay with Remita RRR: ${rrr}`,
    "3. Or pay via Remita channels (internet banking / Remita Retrieval Reference).",
    "4. Keep this invoice and verify the RRR after payment.",
  ];

  const commands = [
    "BT",
    "/F2 16 Tf",
    "48 790 Td",
    `(REMITA) Tj`,
    "/F1 11 Tf",
    "0 -18 Td",
    `(Payment invoice) Tj`,
    "/F1 10 Tf",
    "0 -36 Td",
    `(Remita Retrieval Reference) Tj`,
    "/F2 22 Tf",
    "0 -28 Td",
    `(${pdfEscape(rrr)}) Tj`,
  ];
  lines.forEach(([label, value]) => {
    commands.push("/F2 10 Tf", "0 -22 Td", `(${pdfEscape(label)}) Tj`);
    commands.push("/F1 10 Tf", "140 0 Td", `(${pdfEscape(value)}) Tj`, "-140 0 Td");
  });
  commands.push("/F2 11 Tf", "0 -32 Td", `(How to pay) Tj`);
  steps.forEach((step) => {
    commands.push("/F1 10 Tf", "0 -16 Td", `(${pdfEscape(step)}) Tj`);
  });
  commands.push("ET");
  const stream = commands.join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Count 1 /Kids [3 0 R] >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf);
}
