export type ServiceKey = "accounting" | "e-invoicing" | "compliance";

export type Plan = {
  name: string;
  priceDisplay: string | null;
  originalPrice?: string;
  per?: string;
  note: string;
  allowance?: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
  cta?: string;
};

export type ServiceCatalogItem = {
  key: ServiceKey;
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  plans: Plan[];
};

export const serviceCatalog: Record<ServiceKey, ServiceCatalogItem> = {
  accounting: {
    key: "accounting",
    navLabel: "ERP",
    eyebrow: "Accounting software / ERP",
    title: "Accounting software & ERP plans",
    subtitle:
      "Full accounting software and ERP capabilities—bookkeeping, invoicing, inventory, manufacturing visibility, reconciliation, and financial reporting—priced for operators, growing teams, and finance leaders.",
    summary:
      "Choose the ERP / accounting plan that matches your team size and operational needs.",
    plans: [
      {
        name: "Simple Start",
        priceDisplay: "2,824",
        originalPrice: "28,242",
        per: "/mo",
        note: "Save ₦25,418/mo for 3 months",
        features: [
          "Track income & expenses",
          "Send unlimited custom invoices & quotes",
          "Connect your bank",
          "Track GST and VAT",
          "Insights & reports",
          "Progress invoicing",
          "Up to 250 items in Chart of Accounts",
          "For one user, plus your accountant",
        ],
      },
      {
        name: "Essentials",
        priceDisplay: "4,169",
        originalPrice: "41,690",
        per: "/mo",
        note: "Save ₦37,521/mo for 3 months",
        features: [
          "Everything in Simple Start",
          "Manage bills & payments",
          "Track employee time",
          "Multi-currency",
          "For three users, plus your accountant",
        ],
      },
      {
        name: "Plus",
        priceDisplay: "6,186",
        originalPrice: "61,863",
        per: "/mo",
        note: "Save ₦55,677/mo for 3 months",
        highlight: true,
        features: [
          "Everything in Essentials",
          "Recurring transactions and bills",
          "Track inventory",
          "Manage budgets",
          "Up to 40 classes and locations",
          "For five users, plus your accountant",
        ],
      },
      {
        name: "Advanced",
        priceDisplay: "11,969",
        originalPrice: "119,691",
        per: "/mo",
        note: "Save ₦107,722/mo for 3 months",
        features: [
          "Everything in Plus",
          "UNLIMITED Chart of Accounts items",
          "UNLIMITED classes and locations",
          "Data sync with Excel",
          "Customise role permissions",
          "Manage users (up to 25)",
          "Automate workflows",
          "Custom reporting fields",
          "Customise dashboards",
          "Backup online & restore data",
          "Manage revenue recognition",
        ],
      },
    ],
  },
  "e-invoicing": {
    key: "e-invoicing",
    navLabel: "NRS E-Invoicing",
    eyebrow: "FlowBooks packages",
    title: "Simple, transparent NRS e-invoicing pricing",
    subtitle:
      "Choose the FlowBooks package that matches your monthly invoice volume. Validate, sign, and transmit NRS-compliant invoices with IRN and QR clearance—pay with Remita RRR.",
    summary:
      "Monthly packages with a clear invoice allowance. Scale up as your volume grows—or talk to us for Enterprise.",
    plans: [
      {
        name: "Micro",
        priceDisplay: "15,000",
        per: "/month",
        allowance: "100 invoices",
        note: "Small teams starting NRS compliance",
        features: [
          "100 invoices / month",
          "NRS validate, sign & transmit",
          "IRN generation with QR codes",
          "B2B, B2G & B2C support",
          "Status lookup",
          "Email support",
        ],
      },
      {
        name: "Starter",
        priceDisplay: "30,000",
        per: "/month",
        allowance: "300 invoices",
        note: "Growing SMEs with steady billing",
        features: [
          "300 invoices / month",
          "Everything in Micro",
          "Credit & debit notes",
          "Sandbox onboarding",
          "API docs & Postman guidance",
        ],
      },
      {
        name: "Growth",
        priceDisplay: "60,000",
        per: "/month",
        allowance: "1,000 invoices",
        note: "Businesses with rising invoice volume",
        highlight: true,
        badge: "Best value",
        features: [
          "1,000 invoices / month",
          "Everything in Starter",
          "Payment notify & reconciliation",
          "Per-business NRS credentials",
          "Priority support",
        ],
      },
      {
        name: "Business",
        priceDisplay: "120,000",
        per: "/month",
        allowance: "3,000 invoices",
        note: "High-activity finance & ops teams",
        features: [
          "3,000 invoices / month",
          "Everything in Growth",
          "Live cutover support",
          "Multi-user access guidance",
          "Named support contact",
        ],
      },
      {
        name: "Enterprise",
        priceDisplay: null,
        per: "",
        allowance: "Custom",
        note: "Banks, telcos, FMCGs & multi-branch orgs",
        cta: "Request enterprise pricing",
        features: [
          "Custom invoice allowance",
          "Unlimited / high-volume throughput",
          "Custom integrations & SLA",
          "Dedicated onboarding manager",
          "Training for finance & IT teams",
        ],
      },
    ],
  },
  compliance: {
    key: "compliance",
    navLabel: "NDPR Data Compliance",
    eyebrow: "NDPR data compliance service",
    title: "NDPR data compliance — assessment then proposal",
    subtitle:
      "Complete our NDPR / NDP Act / GAID client assessment. We classify your organisation, map registration and CAR needs, then send a tailored proposal. NDPC statutory fees are quoted separately from our professional fees.",
    summary:
      "No fixed packages on this page — NDPR pricing is confirmed after assessment. We email the proposal to you and our compliance lead.",
    plans: [],
  },
};

export const serviceNavItems: ServiceKey[] = ["accounting", "e-invoicing", "compliance"];
