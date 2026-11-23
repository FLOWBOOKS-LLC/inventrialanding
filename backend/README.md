# Deprecated — Remita moved to flowbooks_api

Remita payment routes (`/api/payments/remita/*`) now live in **flowbooks_api**.

Run a single backend:

```bash
cd ../../flowbooks_api
npm run dev
```

Connect KYC and the marketing site call `flowbooks_api` (Vite proxies `/api/payments`).

This folder still hosts optional Calendly / compliance assessment helpers if needed locally.
