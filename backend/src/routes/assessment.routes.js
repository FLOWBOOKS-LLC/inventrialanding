import { Router } from "express";
import { submitComplianceAssessment } from "../services/assessment.service.js";

const router = Router();

router.post("/compliance", async (req, res) => {
  try {
    const result = await submitComplianceAssessment(req.body || {});
    res.status(200).json(result);
  } catch (error) {
    const status = error?.statusCode || 500;
    console.error("[assessment]", error?.message || error);
    res.status(status).json({
      ok: false,
      message: error?.message || "Failed to submit assessment.",
    });
  }
});

export default router;
