import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..");

const envName = process.env.REMITA_ENV || "sandbox";
const envPath = path.join(backendRoot, `.env.${envName}`);
const dotenvResult = dotenv.config({ path: envPath });
if (dotenvResult.error) {
  console.warn("[dotenv] failed to load", envPath, dotenvResult.error?.message);
} else {
  console.log("[dotenv] loaded", envPath);
}

const { default: remitaRoutes } = await import("./routes/remita.routes.js");
const { default: calendlyWebhookRouter } = await import("./routes/calendly.webhook.route.js");
const { default: assessmentRoutes } = await import("./routes/assessment.routes.js");

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(
  helmet({
    // KYC (Connect) and the landing site call this API from different local ports.
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

const allowedOrigins = (process.env.FRONTEND_ORIGINS || process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const localDev = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      if (localDev || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(morgan("dev"));

// Calendly webhooks need the raw body for signature verification (must be before express.json()).
app.use("/api/integrations/calendly", calendlyWebhookRouter);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "inventria-backend" });
});

app.use("/api/payments/remita", remitaRoutes);
app.use("/api/assessments", assessmentRoutes);

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ ok: false, message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
