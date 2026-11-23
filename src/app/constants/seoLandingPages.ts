import type { PageKey } from "@/app/lib/seo";

/**
 * Keyword landing pages for capabilities FlowBooks already ships.
 * Every claim below is drawn from existing product/plan copy in
 * `src/app/constants/servicePlans.ts` and `src/app/components/Features.tsx`.
 */

export interface LandingSection {
  title: string;
  body: string;
}

export interface LandingPageContent {
  eyebrow: string;
  heading: string;
  intro: string;
  sections: LandingSection[];
  capabilities: string[];
  faqs: { question: string; answer: string }[];
  related: PageKey[];
}

export const landingPages: Partial<Record<PageKey, LandingPageContent>> = {
  "accounting-software-nigeria": {
    eyebrow: "Accounting software / ERP",
    heading: "Accounting software in Nigeria for growing businesses",
    intro:
      "FlowBooks is accounting software and ERP for Nigerian organisations: bookkeeping, invoicing, inventory, bank reconciliation, and reporting in one secure workspace.",
    sections: [
      {
        title: "One workspace for books and operations",
        body:
          "Track income and expenses, manage bills and payments, connect your bank, and reconcile transactions without moving data between disconnected tools. Owners and finance teams see the same numbers.",
      },
      {
        title: "Invoicing built into your accounts",
        body:
          "Send unlimited custom invoices and quotes, use progress invoicing for milestone work, and track GST and VAT as part of the same ledger that produces your statements.",
      },
      {
        title: "Reporting for owners and finance teams",
        body:
          "Review insights and reports by period or entity, keep records audit-ready, and give leadership the visibility they need to manage cash and growth with confidence.",
      },
    ],
    capabilities: [
      "Track income & expenses",
      "Send unlimited custom invoices & quotes",
      "Connect your bank",
      "Track GST and VAT",
      "Insights & reports",
      "Manage bills & payments",
    ],
    faqs: [
      {
        question: "How much does FlowBooks accounting software cost?",
        answer:
          "ERP plans are published on the ERP and accounting plans page, starting with Simple Start, then Essentials, Plus, and Advanced. Each plan lists its monthly price and features before you subscribe.",
      },
      {
        question: "How do I pay for a FlowBooks ERP plan?",
        answer:
          "FlowBooks ERP subscriptions are paid through Remita. You can pay directly or generate a Remita RRR, and keep the payment history in FlowBooks Connect.",
      },
      {
        question: "Can finance teams share access?",
        answer:
          "Yes. Plans define user counts, from a single user plus your accountant on Simple Start through three, five, or up to twenty-five users on Advanced, with role permissions on the Advanced plan.",
      },
    ],
    related: ["invoicing-software", "inventory-management-software", "financial-reporting-software"],
  },

  "inventory-management-software": {
    eyebrow: "Inventory management",
    heading: "Inventory management software that stays close to your books",
    intro:
      "FlowBooks tracks inventory inside the same accounting workspace you use for invoicing and reporting, so stock records, sales, and financial statements stay consistent.",
    sections: [
      {
        title: "Stock records next to your ledger",
        body:
          "Keep item and stock records in the same system that produces your invoices and financial statements, instead of reconciling a separate spreadsheet against your accounts every month.",
      },
      {
        title: "Classes and locations",
        body:
          "Use up to 40 classes and locations on the Plus plan to separate stock by branch, warehouse, or product line, and extend to unlimited classes and locations on the Advanced plan.",
      },
      {
        title: "Reporting that includes what you own",
        body:
          "Insights and reports draw on the same transaction data, so inventory positions, invoicing, and financial reporting stay aligned as volumes grow.",
      },
    ],
    capabilities: [
      "Track inventory",
      "Up to 40 classes and locations",
      "Unlimited classes and locations on Advanced",
      "Insights & reports",
      "Multi-currency",
      "Manage budgets",
    ],
    faqs: [
      {
        question: "Which FlowBooks plan includes inventory?",
        answer:
          "Inventory tracking is included from the Plus plan upwards. Advanced adds unlimited chart of accounts items, unlimited classes and locations, custom reporting fields, and custom dashboards.",
      },
      {
        question: "Does FlowBooks support multiple locations?",
        answer:
          "Yes. Classes and locations can be used to separate stock and reporting by branch or location, with up to 40 on Plus and unlimited on Advanced.",
      },
      {
        question: "Is inventory separate from accounting?",
        answer:
          "No. Inventory sits inside the FlowBooks accounting software / ERP workspace alongside invoicing, reconciliation, and reporting rather than in a separate system.",
      },
    ],
    related: ["stock-management-software", "accounting-software-nigeria", "manufacturing-management-software"],
  },

  "manufacturing-management-software": {
    eyebrow: "Manufacturing visibility",
    heading: "Manufacturing management visibility on top of your accounting",
    intro:
      "FlowBooks ERP is built for organisations that need accounting discipline plus visibility into inventory and manufacturing operations, without running separate systems.",
    sections: [
      {
        title: "Manufacturing visibility with ERP accounting",
        body:
          "ERP-grade bookkeeping, inventory, manufacturing visibility, reconciliation, and reporting sit in one workspace, so operational activity and financial records describe the same business.",
      },
      {
        title: "Inventory and location structure",
        body:
          "Keep inventory records organised by classes and locations, and extend to unlimited classes and locations on Advanced as sites, lines, or product families multiply.",
      },
      {
        title: "Audit-ready financial records",
        body:
          "Daily backups, audit-friendly records, and role-based permissions support month-end close, internal reviews, and external audit requests without spreadsheet reconstructions.",
      },
    ],
    capabilities: [
      "Manufacturing visibility",
      "Track inventory",
      "Up to 40 classes and locations",
      "Reconciliation and reporting",
      "Customise role permissions",
      "Backup online & restore data",
    ],
    faqs: [
      {
        question: "What does manufacturing visibility mean in FlowBooks?",
        answer:
          "FlowBooks ERP presents inventory and manufacturing visibility alongside your accounting records, so finance teams can see operational activity in the same workspace used for bookkeeping and reporting.",
      },
      {
        question: "Can manufacturers use FlowBooks for invoicing too?",
        answer:
          "Yes. Invoicing is part of the same accounting workspace, and NRS e-invoicing packages can be added for statutory invoice clearance with IRN and QR codes.",
      },
      {
        question: "Does FlowBooks support multiple sites?",
        answer:
          "Classes and locations can separate records across sites or branches, with up to 40 on the Plus plan and unlimited classes and locations on Advanced.",
      },
    ],
    related: ["inventory-management-software", "business-management-software", "accounting-software-nigeria"],
  },

  "stock-management-software": {
    eyebrow: "Stock management",
    heading: "Stock management software connected to your accounting",
    intro:
      "Manage stock records, locations, and item data in FlowBooks, and see how stock activity flows into invoicing, reconciliation, and financial reporting.",
    sections: [
      {
        title: "Know what you hold",
        body:
          "Keep stock and item records organised in the accounting workspace, so purchasing, sales, and month-end reporting all reference the same source of truth.",
      },
      {
        title: "Organise by class and location",
        body:
          "Separate stock by branch, warehouse, or category with classes and locations, scaling from 40 on Plus to unlimited on Advanced.",
      },
      {
        title: "Close the month with confidence",
        body:
          "Reconcile bank transactions and review insights and reports alongside stock activity, so finance teams can explain movements instead of chasing them.",
      },
    ],
    capabilities: [
      "Track inventory",
      "Classes and locations",
      "Insights & reports",
      "Reconciliation",
      "Multi-currency",
      "Recurring transactions and bills",
    ],
    faqs: [
      {
        question: "Is stock management included in every plan?",
        answer:
          "No. Inventory tracking is part of the Plus and Advanced plans. Simple Start and Essentials focus on income, expenses, bills, and multi-currency accounting.",
      },
      {
        question: "Can I track stock across branches?",
        answer:
          "Yes. Classes and locations let you separate stock records by branch, with up to 40 on Plus and unlimited on Advanced.",
      },
      {
        question: "Do stock records feed financial reports?",
        answer:
          "Stock records sit in the same accounting workspace that produces insights and reports, so reporting reflects the same transaction data used day to day.",
      },
    ],
    related: ["inventory-management-software", "accounting-software-nigeria", "business-management-software"],
  },

  "financial-reporting-software": {
    eyebrow: "Financial reporting",
    heading: "Financial reporting software for faster, cleaner decisions",
    intro:
      "FlowBooks turns daily transactions into profit and loss, balance sheet, and cash flow reporting, with dashboards and custom reporting fields for growing teams.",
    sections: [
      {
        title: "Statements without spreadsheet assembly",
        body:
          "Real-time profit and loss, balance sheet, and cash flow views help owners and finance leads understand performance quickly, filtered by the period or entity that matters.",
      },
      {
        title: "Custom reporting fields and dashboards",
        body:
          "Advanced adds custom reporting fields, customisable dashboards, and revenue recognition management, so reporting can follow how your organisation actually operates.",
      },
      {
        title: "Audit-ready records",
        body:
          "Daily backups, audit-friendly records, and role-based permissions make it easier to answer audit, tax, and board questions with evidence instead of reconstruction.",
      },
    ],
    capabilities: [
      "Real-time P&L, balance sheet, and cash flow",
      "Insights & reports",
      "Custom reporting fields",
      "Customise dashboards",
      "Manage revenue recognition",
      "Manage budgets",
    ],
    faqs: [
      {
        question: "Which reports are available in FlowBooks?",
        answer:
          "FlowBooks provides insights and reports alongside profit and loss, balance sheet, and cash flow views. Advanced adds custom reporting fields, dashboards, and revenue recognition management.",
      },
      {
        question: "Can I report per period or entity?",
        answer:
          "Yes. Reports can be filtered by period or entity, and classes and locations help separate reporting by branch or business unit.",
      },
      {
        question: "Does FlowBooks support budgeting?",
        answer:
          "Yes. Budget management is included in the Plus plan, alongside recurring transactions and inventory tracking.",
      },
    ],
    related: ["accounting-software-nigeria", "business-management-software", "invoicing-software"],
  },

  "invoicing-software": {
    eyebrow: "Invoicing & receivables",
    heading: "Invoicing software that keeps cash moving",
    intro:
      "Create and send professional invoices and quotes, track what is paid or overdue, and pair operational billing with NRS e-invoicing clearance when statutory invoices are required.",
    sections: [
      {
        title: "Unlimited invoices and quotes",
        body:
          "Send unlimited custom invoices and quotes, use progress invoicing for staged work, and keep customer statements current so cash does not get stuck in receivables.",
      },
      {
        title: "Recurring billing and multi-currency",
        body:
          "Recurring transactions and bills are available on Plus, and multi-currency invoicing is available from Essentials for customers billed outside the naira.",
      },
      {
        title: "NRS e-invoicing when you need clearance",
        body:
          "FlowBooks NRS e-invoicing validates, signs, and transmits invoices with IRN generation and QR codes, and tracks clearance and payment status alongside your accounting workflows.",
      },
    ],
    capabilities: [
      "Send unlimited custom invoices & quotes",
      "Progress invoicing",
      "Recurring transactions and bills",
      "Multi-currency",
      "NRS validate, sign & transmit",
      "IRN generation with QR codes",
    ],
    faqs: [
      {
        question: "Is invoicing included in all FlowBooks plans?",
        answer:
          "Yes. Unlimited custom invoices and quotes are included from Simple Start upwards, with recurring transactions on Plus and above.",
      },
      {
        question: "How does NRS e-invoicing work with my invoices?",
        answer:
          "FlowBooks NRS e-invoicing packages validate, sign, and transmit invoices, generate IRNs with QR codes, and support B2B, B2G, and B2C invoicing with status lookup.",
      },
      {
        question: "Can I bill customers in other currencies?",
        answer:
          "Multi-currency is included from the Essentials plan upwards.",
      },
    ],
    related: ["accounting-software-nigeria", "financial-reporting-software", "inventory-management-software"],
  },

  "business-management-software": {
    eyebrow: "Business management software",
    heading: "Business management software that runs finance and operations together",
    intro:
      "FlowBooks combines accounting, invoicing, inventory, bank reconciliation, and reporting in one ERP workspace, so growing organisations stop stitching tools together.",
    sections: [
      {
        title: "Replace the spreadsheet stack",
        body:
          "Bookkeeping, invoicing, inventory, and reporting live in one place, which means one set of numbers for owners, finance teams, and auditors to work from.",
      },
      {
        title: "Controls as you grow",
        body:
          "Add users, customise role permissions, automate workflows, and manage up to 25 users on Advanced, with backup and restore available when you need it.",
      },
      {
        title: "Compliance in the same partnership",
        body:
          "Alongside ERP, FlowBooks provides NRS e-invoicing and NDPR data compliance, so statutory invoicing and data protection obligations are handled with the same provider.",
      },
    ],
    capabilities: [
      "Accounting software / ERP",
      "Invoicing & receivables",
      "Inventory & locations",
      "Reconciliation",
      "Customise role permissions",
      "Automate workflows",
    ],
    faqs: [
      {
        question: "What is included in FlowBooks business management software?",
        answer:
          "The ERP workspace covers accounting, invoicing, inventory, bank reconciliation, and reporting, with plan-based user counts, roles, workflows, and dashboards.",
      },
      {
        question: "Does FlowBooks handle statutory e-invoicing?",
        answer:
          "Yes. FlowBooks provides NRS e-invoicing as a System Integrator and Access Point, with invoice validation, signing, transmission, IRNs, and QR clearance status.",
      },
      {
        question: "Can FlowBooks support compliance work too?",
        answer:
          "FlowBooks provides NDPR data compliance services covering registration, audits, DPIAs, cross-border transfers, semi-annual reporting, and training, quoted after an assessment.",
      },
    ],
    related: ["accounting-software-nigeria", "manufacturing-management-software", "financial-reporting-software"],
  },
};

export function isLandingPage(page: PageKey): boolean {
  return Boolean(landingPages[page]);
}
