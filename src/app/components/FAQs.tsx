import { Plus, ShieldCheck, LifeBuoy, Wallet, Lock, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";

interface FAQsProps {
  onNavigate?: (page: string) => void;
}

const FAQS = [
  {
    question: "What makes Flowbooks different from traditional accounting tools?",
    answer:
      "Flowbooks combines clean bookkeeping, real-time reporting, and simple workflows built for owners and operators. You spend less time on accounting and more time running the business.",
  },
  {
    question: "Do I need an accountant to use Flowbooks?",
    answer:
      "No. You can manage day-to-day finances on your own, and your accountant can still access reports or collaborate with you when needed.",
  },
  {
    question: "Can I connect my bank accounts?",
    answer:
      "Yes. Secure bank connections let you sync transactions automatically and keep books up to date without manual entry.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We use encryption in transit and at rest, strict access controls, and continuous monitoring to keep your data safe.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely. Upgrade or downgrade at any time as your business changes.",
  },
  {
    question: "Do you offer onboarding support?",
    answer:
      "Yes. Our team helps you set up your chart of accounts, import data, and go live confidently.",
  },
];

export function FAQs({ onNavigate }: FAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const points = [
    {
      icon: ShieldCheck,
      title: "Trusted and secure",
      description: "Built with modern security practices and audit-ready controls.",
    },
    {
      icon: Wallet,
      title: "Transparent pricing",
      description: "Clear plans with no hidden fees or surprise upgrades.",
    },
    {
      icon: LifeBuoy,
      title: "Fast support",
      description: "Helpful humans ready to assist when you need it most.",
    },
  ];

  const topics = [
    {
      icon: Lock,
      title: "Security & compliance",
      description: "Encryption, roles, and access policies for peace of mind.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Share access with partners, teams, and advisors.",
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
              Answers for your finance questions
            </h1>
            <p className="text-white/80 mt-4 text-base md:text-lg">
              How Flowbooks helps with invoicing, reconciliation, and financial reporting.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => onNavigate?.("contact")}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 lg:h-32" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,50 C360,90 720,10 1080,50 C1260,70 1350,80 1440,90 L1440,100 L0,100 Z" fill="white" fillOpacity="0.1"/>
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1350,90 1440,100 L1440,100 L0,100 Z" fill="white"/>
          </svg>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Frequently asked questions</h2>
            <p className="text-muted-foreground mt-2">
              Not seeing your question? Reach out and our team will help quickly.
            </p>
            <div className="mt-8 space-y-4">
              {FAQS.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <button
                    key={item.question}
                    type="button"
                    className="w-full text-left rounded-2xl border border-border p-5 transition hover:border-[#0b3574]/50 bg-card"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base md:text-lg font-semibold text-foreground">{item.question}</h3>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-border transition ${
                          isOpen ? "bg-[#0b3574] text-white border-[#0b3574]" : "text-muted-foreground"
                        }`}
                        aria-hidden="true"
                      >
                        <Plus className={`h-4 w-4 transition ${isOpen ? "rotate-45" : ""}`} />
                      </span>
                    </div>
                    {isOpen && <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6 h-full flex flex-col">
            <div className="rounded-3xl border border-border p-6 flex flex-col flex-1 bg-card">
              <h3 className="text-lg font-semibold text-foreground">Support that feels human</h3>
              <p className="text-sm text-muted-foreground mt-2">
                We guide you through onboarding, reports, and workflows so you can focus on growth.
              </p>
              <Button
                className="mt-4 bg-[#0b3574] text-white hover:opacity-90"
                onClick={() => onNavigate?.("contact")}
              >
                Ask us anything
              </Button>
            </div>

            <div className="rounded-3xl border border-border p-6 bg-muted/30 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-foreground">Why businesses trust Flowbooks</h3>
              <div className="mt-4 space-y-4">
                {points.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div key={point.title} className="flex gap-3">
                      <div className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center">
                        <Icon className="h-4 w-4 text-[#0b3574]" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{point.title}</p>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-border p-6 flex flex-col flex-1 bg-card">
              <h3 className="text-lg font-semibold text-foreground">Popular topics</h3>
              <div className="mt-4 space-y-3">
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <div key={topic.title} className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-[#0b3574]" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{topic.title}</p>
                        <p className="text-xs text-muted-foreground">{topic.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
