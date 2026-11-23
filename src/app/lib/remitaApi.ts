export type RemitaProduct = "flowbooks_subscription" | "connect_app";

export type RemitaInitiateInput = {
  amount: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  planName: string;
  product: RemitaProduct;
  channel?: "rrr" | "bank" | "checkout";
  description?: string;
};

export type RemitaInitiateResult = {
  ok: true;
  mode: string;
  channel: string;
  product: string;
  planName: string;
  orderId: string;
  amount: string;
  currency: string;
  rrr: string | null;
  redirectUrl: string | null;
  bankPaymentInstructions: string[] | null;
  data?: unknown;
};

/** Empty = same-origin `/api/payments/remita` (Vite → flowbooks_api). */
function remitaApiBase() {
  const fromEnv = import.meta.env.VITE_REMITA_API_URL as string | undefined;
  if (fromEnv != null && String(fromEnv).trim() !== "") {
    return String(fromEnv).trim().replace(/\/$/, "");
  }
  return "";
}

export async function initiateRemitaPayment(input: RemitaInitiateInput) {
  const orderId = `FB-${input.product === "connect_app" ? "CONNECT" : "SUB"}-${Date.now()}`;
  const resp = await fetch(`${remitaApiBase()}/api/payments/remita/initiate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId,
      amount: input.amount,
      email: input.email,
      firstName: input.firstName || "Customer",
      lastName: input.lastName || "",
      phone: input.phone || "",
      planName: input.planName,
      product: input.product,
      channel: input.channel || "rrr",
      description:
        input.description ||
        `${input.product === "connect_app" ? "Flowbooks Connect" : "Flowbooks subscription"}: ${input.planName}`,
      metadata: {
        product: input.product,
        plan: input.planName,
      },
    }),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data?.ok) {
    throw new Error(data?.message || "Failed to initiate Remita payment.");
  }

  return data as RemitaInitiateResult;
}

export async function verifyRemitaPayment(rrr: string) {
  const resp = await fetch(
    `${remitaApiBase()}/api/payments/remita/verify/${encodeURIComponent(rrr)}`
  );
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data?.ok) {
    throw new Error(data?.message || "Failed to verify Remita payment.");
  }
  return data.data;
}
