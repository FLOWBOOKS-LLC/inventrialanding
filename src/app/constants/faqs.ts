export interface FaqItem {
  question: string;
  answer: string;
}

/** Shared FAQ content, used by the FAQ page UI and FAQPage structured data. */
export const FAQS: FaqItem[] = [
  {
    question: "What does Flowbooks offer?",
    answer:
      "Flowbooks offers three connected services: accounting software / ERP for operations and finance, NRS e-invoicing for statutory invoice clearance, and NDPR data compliance aligned with Nigeria’s NDPC framework.",
  },
  {
    question: "What is included in your NDPR data compliance service?",
    answer:
      "We assist organisations with registration; conduct and file audits; advise on personal data processing principles and lawful bases; help implement mechanisms for data subject rights; support Data Privacy Impact Assessments; guide cross-border data transfer compliance; support Internal Semi-Annual Data Protection Reports; and deliver training and awareness programmes.",
  },
  {
    question: "Do you offer NRS e-invoicing?",
    answer:
      "Yes. Our NRS e-invoicing service helps organisations validate, sign, and transmit invoices, generate IRNs and QR codes, and track clearance and payment status alongside ERP and accounting workflows.",
  },
  {
    question: "Is Flowbooks an accounting software / ERP?",
    answer:
      "Yes. Flowbooks provides accounting software and ERP capabilities—including bookkeeping, invoicing, inventory, reconciliation, reporting, and multi-user access—so operators and finance teams can run the business from one workspace.",
  },
  {
    question: "How is NDPR data compliance priced?",
    answer:
      "NDPR data compliance has no fixed packages on the site. Complete the NDPR / NDP Act / GAID assessment and we email a tailored proposal to you and to muhammad.fahad@flowbooks.org, separating NDPC statutory fees from our professional fees. ERP and NRS e-invoicing keep their own published Remita plans under Services.",
  },
  {
    question: "Do you offer onboarding and training?",
    answer:
      "Yes. We help you go live on the accounting software / ERP and NRS e-invoicing, and NDPR data compliance includes training and awareness so teams understand their obligations.",
  },
];
