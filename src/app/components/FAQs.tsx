import { Plus, ShieldCheck, LifeBuoy, Wallet, Lock, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { FAQS } from "@/app/constants/faqs";

interface FAQsProps {
  onNavigate?: (page: string) => void;
}

export function FAQs({ onNavigate }: FAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const points = [
    {
      icon: ShieldCheck,
      title: "Three clear offers",
      description: "Accounting software / ERP, NRS e-invoicing, and NDPR data compliance.",
    },
    {
      icon: Wallet,
      title: "Separate pricing",
      description: "Each service has its own plans under Services.",
    },
    {
      icon: LifeBuoy,
      title: "Practical support",
      description: "Onboarding, audits, reporting help, and training when you need it.",
    },
  ];

  const topics = [
    {
      icon: Lock,
      title: "NDPR data compliance",
      description: "Registration, audits, DPIAs, rights, transfers, and reporting.",
    },
    {
      icon: Users,
      title: "ERP & finance teams",
      description: "Accounting software access for operators, accountants, and advisors.",
    },
  ];

  return (
    <div className="bg-background text-foreground transition-colors">
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 20%, #1a2942 50%, #0b3574 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "#0b3574" }}
            animate={{ y: [0, 50, 0], x: [0, 30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "#0a1929" }}
            animate={{ y: [0, -40, 0], x: [0, -30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 lg:px-6 relative z-10 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <p className="text-white/70 text-sm uppercase tracking-[0.2em]">FAQs</p>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold mt-3">
              Questions about Flowbooks
            </h1>
            <p className="text-white/80 mt-4 text-base md:text-lg">
              How Flowbooks helps with accounting software / ERP, NRS e-invoicing, and NDPR data compliance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14">
          <div>
            <div className="space-y-3">
              {FAQS.map((item, index) => {
                const open = openIndex === index;
                return (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-border bg-card overflow-hidden"
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-4 p-5 text-left"
                      onClick={() => setOpenIndex(open ? null : index)}
                    >
                      <span className="font-medium text-foreground">{item.question}</span>
                      <Plus
                        className={`w-5 h-5 text-[#0b3574] transition-transform ${open ? "rotate-45" : ""}`}
                      />
                    </button>
                    {open && (
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Why organisations choose Flowbooks</h3>
              <div className="space-y-4">
                {points.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div key={point.title} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0b3574]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#0b3574]" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{point.title}</div>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Popular topics</h3>
              <div className="space-y-4">
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <div key={topic.title} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#e8eef9] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#0b3574]" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{topic.title}</div>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button
                className="mt-6 w-full text-white"
                style={{ backgroundColor: "#0b3574" }}
                onClick={() => onNavigate?.("contact")}
              >
                Contact support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
