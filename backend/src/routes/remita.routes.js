import { Router } from "express";
import {
  initiateRemitaPayment,
  validateRemitaConfig,
  verifyRemitaPayment,
} from "../services/remita.service.js";

const router = Router();

router.get("/health", (_req, res) => {
  const config = validateRemitaConfig();
  res.status(200).json({
    ok: true,
    remitaConfigured: config.ok,
    mode: config.mode,
    missing: config.missing,
  });
});

router.post("/initiate", async (req, res) => {
  const config = validateRemitaConfig();
  if (!config.ok) {
    return res.status(500).json({
      ok: false,
      message: "Missing Remita configuration",
      missing: config.missing,
    });
  }

  try {
    const result = await initiateRemitaPayment(req.body ?? {});
    if (result?.mode === "connect" && !result?.redirectUrl) {
      return res.status(502).json({
        ok: false,
        message:
          "Remita Connect payment was created but no redirect URL was returned. Check Remita response shape.",
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

router.get("/verify/:rrr", async (req, res) => {
  const config = validateRemitaConfig();
  if (!config.ok) {
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
    });
  }
});

router.post("/webhook", (req, res) => {
  // TODO: Validate signature and persist transaction events.
  console.log("[Remita webhook payload]", req.body);
  return res.status(200).json({ ok: true });
});

// Inline checkout callback (client-side success payload)
router.post("/inline/callback", (req, res) => {
  console.log("[Remita inline callback]", req.body);
  return res.status(200).json({ ok: true });
});

export default router;
