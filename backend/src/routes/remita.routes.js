import { Router } from "express";
import {
  buildRrrInvoicePdf,
  fetchRrrInvoice,
  initiateRemitaPayment,
  validateRemitaConfig,
  verifyRemitaPayment,
} from "../services/remita.service.js";

const router = Router();

router.get("/health", (_req, res) => {
  const rrrConfig = validateRemitaConfig("rrr");
  const checkoutConfig = validateRemitaConfig("checkout");
  res.status(200).json({
    ok: true,
    remitaConfigured: rrrConfig.ok || checkoutConfig.ok,
    rrr: rrrConfig,
    checkout: checkoutConfig,
  });
});

router.post("/initiate", async (req, res) => {
  const body = req.body ?? {};
  const channel = String(body.channel || body.paymentMethod || "rrr").toLowerCase();
  const config = validateRemitaConfig(channel);

  if (!config.ok) {
    return res.status(500).json({
      ok: false,
      message: "Missing Remita configuration",
      missing: config.missing,
      mode: config.mode,
    });
  }

  try {
    const result = await initiateRemitaPayment(body);

    if (channel === "checkout" && result?.mode === "connect" && !result?.redirectUrl) {
      return res.status(502).json({
        ok: false,
        message:
          "Remita Connect payment was created but no redirect URL was returned. Check Remita response shape.",
        data: result?.data,
      });
    }

    if ((channel === "rrr" || channel === "bank") && !result?.rrr) {
      return res.status(502).json({
        ok: false,
        message:
          "Remita payment was created but no RRR was returned. Check merchant credentials and Remita response.",
        data: result?.data,
      });
    }

    return res.status(200).json({ ok: true, ...result });
  } catch (error) {
    console.error("[Remita initiate error]", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
    });
    return res.status(400).json({
      ok: false,
      message: error?.response?.data?.message || error?.message || "Failed to initialize payment",
      remitaStatus: error?.response?.status,
      remitaData: error?.response?.data,
    });
  }
});

router.get("/print/:rrr", async (req, res) => {
  try {
    const invoice = await fetchRrrInvoice(req.params.rrr);
    const pdf = buildRrrInvoicePdf(invoice);
    const filename = `Remita-RRR-${invoice.rrr}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    return res.status(200).send(pdf);
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error?.message || "Failed to build the Remita invoice PDF.",
    });
  }
});

router.get("/verify/:rrr", async (req, res) => {
  const config = validateRemitaConfig("rrr");
  const checkoutConfig = validateRemitaConfig("checkout");
  if (!config.ok && !checkoutConfig.ok) {
    return res.status(500).json({
      ok: false,
      message: "Missing Remita configuration",
      missing: config.missing,
    });
  }

  try {
    const data = await verifyRemitaPayment(req.params.rrr);
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error?.message || "Failed to verify payment",
      remitaData: error?.response?.data,
    });
  }
});

router.post("/webhook", (req, res) => {
  console.log("[Remita webhook payload]", req.body);
  return res.status(200).json({ ok: true });
});

router.post("/inline/callback", (req, res) => {
  console.log("[Remita inline callback]", req.body);
  return res.status(200).json({ ok: true });
});

export default router;
