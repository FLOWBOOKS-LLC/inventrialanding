import {
  Calculator,
  BadgeCheck,
  Scale,
  FileText,
  BarChart3,
  Shield,
  GraduationCap,
  Globe2,
  ChevronRight,
  Quote,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const features = [
  {
    icon: Calculator,
    iconColor: "#4166b2",
    title: "Accounting software / ERP",
    description: "ERP-grade bookkeeping, inventory, manufacturing visibility, reconciliation, and reporting.",
    details:
      "Run your accounting software and ERP in one workspace—automated categorisation, bank reconciliation, receivables and payables, inventory, manufacturing visibility, and audit-ready financial statements. Flowbooks gives owners and finance teams clear control of operations and cash without the complexity of traditional tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1753955900083-b62ee8d97805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NvdW50aW5nJTIwZGFzaGJvYXJkJTIwc2NyZWVufGVufDF8fHx8MTc2ODkxNzI1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: BadgeCheck,
    iconColor: "#0b3574",
    title: "NRS e-invoicing",
    description: "Validate, sign, and transmit NRS-compliant invoices with IRN and QR clearance.",
    details:
      "Flowbooks supports Nigeria’s NRS e-invoicing mandate as a System Integrator and Access Point. Standardise invoices from your systems, validate against live reference data, generate IRNs, return QR codes, and track clearance and payment status—so statutory e-invoicing fits into how you already bill customers.",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: Scale,
    iconColor: "#14b8a6",
    title: "NDPR data compliance",
    description: "NDPR / NDPC-aligned compliance—from registration and audits to DPIAs and training.",
    details:
      "Our NDPR data compliance service helps organisations meet Nigeria’s data protection expectations: registration assistance, audits, guidance on lawful bases for processing, data subject rights mechanisms, DPIAs, cross-border transfer compliance, semi-annual reporting guidance, and staff training and awareness.",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: FileText,
    iconColor: "#10b981",
    title: "Invoicing & receivables",
    description: "Create, send, and track invoices so cash does not get stuck in AR.",
    details:
      "Issue professional invoices, monitor what is paid or overdue, and keep customer statements current. Pair operational invoicing with NRS e-invoicing when you need statutory clearance—without running two disconnected processes.",
    imageUrl:
      "https://images.unsplash.com/photo-1762427354566-2b6902a9fd06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZvaWNlJTIwZG9jdW1lbnQlMjBidXNpbmVzc3xlbnwxfHx8fDE3Njg5MTcyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: BarChart3,
    iconColor: "#8b5cf6",
    title: "Financial reporting & insights",
    description: "Real-time P&L, balance sheet, and cash flow for faster decisions.",
    details:
      "Turn transactions into clear statements and dashboards. Filter by period or entity, support audits with cleaner records, and give leadership the visibility they need to manage growth.",
    imageUrl:
      "https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBjaGFydHMlMjBncmFwaHN8ZW58MXx8fHwxNzY4ODQ0MTM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: Shield,
    iconColor: "#ef4444",
    title: "Registration & audits",
    description: "Assistance with organisational registration and conducting or filing audits.",
    details:
      "We assist organisations with registration requirements and support the conduct and filing of audits—so compliance work is structured, documented, and easier to sustain as your operations grow.",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: Globe2,
    iconColor: "#f59e0b",
    title: "Privacy rights & cross-border transfers",
    description: "Lawful bases, data subject rights, DPIAs, and cross-border transfer compliance.",
    details:
      "Get practical guidance on personal data processing principles and lawful bases, mechanisms for data subjects to exercise their rights, Data Privacy Impact Assessments, and compliance with cross-border data transfer laws—aligned to Nigeria’s data protection framework.",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    icon: GraduationCap,
    iconColor: "#06b6d4",
    title: "Reporting, training & awareness",
    description: "Semi-annual data protection reporting guidance plus staff training.",
    details:
      "We guide organisations on preparing and verifying their Internal Semi-Annual Data Protection Report, and deliver training and awareness programmes so teams understand their obligations and apply them day to day.",
    imageUrl:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

interface FeaturesProps {
  onNavigate?: (page: string) => void;
}

export function Features({ onNavigate }: FeaturesProps) {
  const [selectedFeature, setSelectedFeature] = useState(0);

  return (
    <section
      className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="max-w-2xl mb-10 lg:mb-12">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "#4166b2" }}>
            What we offer
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white mb-3">
            Accounting software / ERP, NRS e-invoicing, and NDPR data compliance
          </h2>
          <p className="text-base text-gray-600 dark:text-slate-300">
            Flowbooks offers accounting software and ERP, NRS e-invoicing, and NDPR data compliance—so operations, statutory invoicing, and NDPC readiness sit in one trusted partnership.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isSelected = selectedFeature === index;

              return (
                <button
                  key={feature.title}
                  onClick={() => setSelectedFeature(index)}
                  className="w-full flex items-start gap-4 p-4 rounded-xl transition-all duration-300 text-left group"
                  style={{
                    backgroundColor: isSelected ? "white" : "rgba(0, 0, 0, 0)",
                    boxShadow: isSelected ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "none",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ backgroundColor: isSelected ? feature.iconColor : "#f3f4f6" }}
                  >
                    <Icon
                      className="w-6 h-6 transition-colors"
                      style={{ color: isSelected ? "white" : "#6b7280" }}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                      {feature.title}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                  <ChevronRight
                    className="w-5 h-5 transition-all duration-300"
                    style={{
                      color: isSelected ? feature.iconColor : "#d1d5db",
                      opacity: isSelected ? 1 : 0,
                      transform: isSelected ? "translateX(0)" : "translateX(-8px)",
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col">
            <div className="relative h-48 overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={features[selectedFeature].imageUrl}
                alt={features[selectedFeature].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <div className="p-5 flex-1 flex flex-col min-h-0 items-center text-center">
              <div className="text-xs font-semibold mb-1 tracking-wider" style={{ color: "#4166b2" }}>
                FLOWBOOKS
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {features[selectedFeature].title}
              </h3>
              <div className="flex flex-1 min-h-0 justify-center">
                <div className="relative w-full max-w-2xl flex flex-col">
                  <Quote
                    className="absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 text-[#0b3574] dark:text-sky-400 flex-shrink-0 scale-x-[-1]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <p className="text-[#0a2942] dark:text-slate-200 text-xl md:text-2xl leading-relaxed flex-1 min-h-0 pt-1 pl-9 pr-9 pb-4 w-full text-center">
                    {features[selectedFeature].details}
                  </p>
                  <Quote
                    className="absolute right-0 bottom-0 w-8 h-8 md:w-10 md:h-10 text-[#0b3574] dark:text-sky-400 flex-shrink-0"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
              </div>
              <Button
                className="text-white hover:opacity-90 transition-opacity w-fit mt-2 flex-shrink-0"
                style={{ backgroundColor: "#0b3574" }}
                onClick={() => {
                  const title = features[selectedFeature].title.toLowerCase();
                  if (title.includes("e-invoicing") || title.includes("invoicing & receivables")) {
                    onNavigate?.("e-invoicing");
                  } else if (
                    title.includes("compliance") ||
                    title.includes("registration") ||
                    title.includes("privacy") ||
                    title.includes("reporting, training") ||
                    title.includes("ndpr") ||
                    title.includes("data compliance") ||
                    title.includes("data protection")
                  ) {
                    onNavigate?.("compliance-assessment");
                  } else {
                    onNavigate?.("accounting");
                  }
                }}
              >
                View pricing
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
