import express from "express";
import { processCalendlyWebhook } from "../services/calendly.webhook.service.js";

const router = express.Router();

router.post(
  "/webhook",
  express.raw({
    type: (req) => /application\/json/i.test(String(req.headers["content-type"] || "")),
  }),
  async (req, res) => {
    try {
      const raw = req.body;
      if (!Buffer.isBuffer(raw)) {
        return res.status(400).json({ ok: false, message: "Expected raw JSON body" });
      }

      const signature =
        req.get("Calendly-Webhook-Signature") || req.get("calendly-webhook-signature") || "";

      await processCalendlyWebhook(raw, signature);
      return res.status(200).json({ ok: true });
    } catch (error) {
      const code = error?.statusCode || 500;
      if (code >= 500) {
        console.error("[Calendly webhook]", error?.message);
      }
      return res.status(code).json({ ok: false, message: error?.message || "Webhook error" });
    }
  }
);

export default router;
