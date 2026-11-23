import { Calculator, BadgeCheck, Scale, ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/app/components/ui/button";
import { serviceCatalog, serviceNavItems, type ServiceKey } from "@/app/constants/servicePlans";

interface ServicesProps {
  onNavigate?: (page: string) => void;
}

const serviceMeta: Record<
  ServiceKey,
  { icon: typeof Calculator; points: string[]; cta: string; target: string }
> = {
  accounting: {
    icon: Calculator,
    points: [
      "Accounting software & ERP workspace",
      "Bookkeeping, inventory & reporting",
      "Remita subscription plans with bank RRR",
    ],
    cta: "View ERP plans",
    target: "accounting",
  },
  "e-invoicing": {
    icon: BadgeCheck,
    points: [
      "Micro to Business packages by invoice volume",
      "NRS validate, sign & transmit with IRN + QR",
      "Pay with Remita RRR · Enterprise custom",
    ],
    cta: "View FlowBooks packages",
    target: "e-invoicing",
  },
  compliance: {
    icon: Scale,
    points: [
      "NDP Act / GAID client assessment",
      "Registration, audits, DPIAs & training",
      "Tailored proposal after assessment",
    ],
    cta: "Take the assessment",
    target: "compliance-assessment",
  },
};

export function Services({ onNavigate }: ServicesProps) {
  return (
    <div className="bg-background text-foreground transition-colors" style={{ fontFamily: "Roboto, sans-serif" }}>
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 20%, #1a2942 50%, #0b3574 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-16 left-12 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "#0b3574" }}
            animate={{ y: [0, 50, 0], x: [0, 30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 lg:px-6 relative z-10 text-center text-white">
          <p className="text-white/70 text-sm uppercase tracking-[0.2em] mb-3">Our services</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Accounting software / ERP, NRS e-invoicing, and NDPR data compliance
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
            Three connected offers for organisations that need finance systems, statutory invoicing,
            and NDPR / NDPC-aligned compliance support.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 lg:h-32" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,50 C360,90 720,10 1080,50 C1260,70 1350,80 1440,90 L1440,100 L0,100 Z" fill="white" fillOpacity="0.1" />
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1350,90 1440,100 L1440,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {serviceNavItems.map((key) => {
              const service = serviceCatalog[key];
              const meta = serviceMeta[key];
              const Icon = meta.icon;

              return (
                <div
                  key={key}
                  className="rounded-2xl border border-border bg-card p-6 lg:p-8 flex flex-col shadow-sm hover:border-[#0b3574] transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: "#0b3574" }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] mb-2" style={{ color: "#4166b2" }}>
                    {service.eyebrow}
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-3">{service.navLabel}</h2>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">{service.subtitle}</p>
                  <ul className="space-y-3 mb-8">
                    {meta.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-[#0b3574]/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-[#0b3574]" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full text-white"
                    style={{ backgroundColor: "#0b3574" }}
                    onClick={() => onNavigate?.(meta.target)}
                  >
                    {meta.cta}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
