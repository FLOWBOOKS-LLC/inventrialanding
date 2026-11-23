import { useMemo, useState } from "react";
import { Check, ArrowRight, ClipboardList, CreditCard } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/app/components/ui/button";
import { RemitaPaymentDialog } from "@/app/components/RemitaPaymentDialog";
import { serviceCatalog, type Plan, type ServiceKey } from "@/app/constants/servicePlans";
import type { RemitaProduct } from "@/app/lib/remitaApi";

interface ServicePlanPageProps {
  serviceKey: ServiceKey;
  onNavigate?: (page: string) => void;
}

type CheckoutState = {
  product: RemitaProduct;
  planName: string;
  amount: number;
  amountLabel: string;
} | null;

function planAmount(plan: Plan) {
  if (!plan.priceDisplay) return 0;
  return Number(String(plan.priceDisplay).replace(/,/g, ""));
}

function remitaProductFor(serviceKey: ServiceKey): RemitaProduct | null {
  if (serviceKey === "accounting") return "flowbooks_subscription";
  if (serviceKey === "e-invoicing") return "connect_app";
  return null;
}

function kycAppUrl() {
  const fromEnv = import.meta.env.VITE_KYC_URL as string | undefined;
  return ((fromEnv && fromEnv.trim()) || "http://localhost:5174").replace(/\/$/, "");
}

function openConnectKyc(plan: Plan, amount: number, product: RemitaProduct) {
  const params = new URLSearchParams({
    product,
    plan: plan.name,
    amount: String(amount),
    per: plan.per || "/month",
    allowance: plan.allowance || "",
  });
  window.location.assign(`${kycAppUrl()}/signup?${params.toString()}`);
}

export function ServicePlanPage({ serviceKey, onNavigate }: ServicePlanPageProps) {
  const service = serviceCatalog[serviceKey];
  const [checkout, setCheckout] = useState<CheckoutState>(null);
  const remitaProduct = useMemo(() => remitaProductFor(serviceKey), [serviceKey]);
  const isEinvoicing = serviceKey === "e-invoicing";

  const handlePlanClick = (plan: Plan) => {
    if (serviceKey === "compliance") {
      onNavigate?.("compliance-assessment");
      return;
    }

    const amount = planAmount(plan);
    if ((serviceKey === "e-invoicing" || serviceKey === "accounting") && remitaProduct) {
      if (!amount) {
        onNavigate?.("contact");
        return;
      }
      openConnectKyc(plan, amount, remitaProduct);
      return;
    }

    if (!remitaProduct || !amount) {
      onNavigate?.("contact");
      return;
    }

    setCheckout({
      product: remitaProduct,
      planName: plan.name,
      amount,
      amountLabel: `₦${plan.priceDisplay}${plan.per || "/mo"}`,
    });
  };

  const ctaLabel = (plan: Plan) => {
    if (serviceKey === "compliance") return "Start assessment";
    if (!plan.priceDisplay) return plan.cta || "Contact sales";
    if (serviceKey === "e-invoicing" || serviceKey === "accounting") return "Get started";
    return "Subscribe with Remita";
  };

  const planGridClass = isEinvoicing
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
    : service.plans.length >= 4
      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
      : "grid-cols-1 md:grid-cols-3";

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
          <motion.div
            className="absolute bottom-10 right-12 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "#0a1929" }}
            animate={{ y: [0, -40, 0], x: [0, -30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 lg:px-6 text-center text-white relative z-10">
          <p className="text-white/70 text-sm uppercase tracking-[0.2em] mb-3">{service.eyebrow}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">{service.title}</h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">{service.subtitle}</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 lg:h-32" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,50 C360,90 720,10 1080,50 C1260,70 1350,80 1440,90 L1440,100 L0,100 Z" fill="white" fillOpacity="0.1" />
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1350,90 1440,100 L1440,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">{service.summary}</p>

          {serviceKey === "compliance" ? (
            <div className="mb-12 rounded-2xl border-2 border-[#0b3574] bg-[#0b3574]/5 p-6 lg:p-8 text-center shadow-[0_12px_30px_rgba(11,53,116,0.12)]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0b3574] text-white mb-4">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Get a tailored NDPR proposal after assessment
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Complete our NDPR / NDP Act / GAID client assessment. We review your answers, then email a
                proposal with likely classification, registration/CAR roadmap, and fee lines. A copy
                goes to you and to muhammad.fahad@flowbooks.org.
              </p>
              <Button
                className="text-white"
                style={{ background: "#0b3574" }}
                onClick={() => onNavigate?.("compliance-assessment")}
              >
                Take the assessment
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          ) : (
            <div className="mb-10 rounded-2xl border border-[#0b3574]/20 bg-[#0b3574]/5 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0b3574] text-white flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="text-sm text-foreground">
                <strong>Pay with Remita.</strong>{" "}
                {serviceKey === "accounting"
                  ? "Get started opens FlowBooks Connect for the ERP subscription. Pay now, or generate a Remita RRR, and keep the payment history there."
                  : "Get started opens FlowBooks Connect. Pay now or generate a Remita RRR, then review payment history."}
              </div>
            </div>
          )}

          {service.plans.length > 0 ? (
            <div className={`grid gap-5 ${planGridClass}`}>
              {service.plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-card rounded-2xl shadow-sm border flex flex-col overflow-hidden transition-all duration-300 ${
                    plan.highlight ? "border-2" : "border-border hover:border-[#0b3574]"
                  }`}
                  style={
                    plan.highlight
                      ? { borderColor: "#0b3574", boxShadow: "0 12px 30px rgba(11,53,116,0.12)" }
                      : undefined
                  }
                >
                  {plan.badge ? (
                    <div className="absolute top-3 right-3 rounded-full bg-[#0b3574] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      {plan.badge}
                    </div>
                  ) : null}

                  <div className="px-5 py-7 text-center">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">{plan.name}</h3>

                    {plan.priceDisplay ? (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm text-muted-foreground">₦</span>
                        <div className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                          {plan.priceDisplay}
                        </div>
                        {plan.per ? <div className="text-sm text-muted-foreground">{plan.per}</div> : null}
                      </div>
                    ) : (
                      <div className="text-3xl lg:text-4xl font-extrabold text-foreground">Custom</div>
                    )}

                    {plan.allowance ? (
                      <div className="mt-3 inline-flex rounded-full bg-[#0b3574]/10 px-3 py-1 text-sm font-semibold text-[#0b3574]">
                        {plan.allowance}
                      </div>
                    ) : null}

                    <div className="text-xs mt-3 text-muted-foreground">{plan.note}</div>

                    <div className="mt-6">
                      <Button
                        className="w-full text-white py-3"
                        style={{ background: "#0b3574" }}
                        onClick={() => handlePlanClick(plan)}
                      >
                        {ctaLabel(plan)}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  <div className="px-5 py-5 flex-1">
                    <ul className="space-y-2.5 text-sm text-muted-foreground">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span className="mt-0.5 rounded-full p-1 bg-primary/10 flex-shrink-0">
                            <Check className="w-3 h-3" style={{ color: "#0b3574" }} />
                          </span>
                          <span className="leading-relaxed text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {isEinvoicing ? (
            <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Package comparison</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  All FlowBooks packages at a glance — price and monthly invoice allowance.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="bg-[#0b3574]/5 text-left">
                      <th className="px-5 py-3 font-semibold text-foreground">FlowBooks package</th>
                      <th className="px-5 py-3 font-semibold text-foreground">Price</th>
                      <th className="px-5 py-3 font-semibold text-foreground">Allowance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.plans.map((plan) => (
                      <tr key={plan.name} className="border-t border-border">
                        <td className="px-5 py-3 font-medium text-foreground">
                          {plan.name}
                          {plan.badge ? (
                            <span className="ml-2 rounded-full bg-[#0b3574] px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                              {plan.badge}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">
                          {plan.priceDisplay ? `₦${plan.priceDisplay}/month` : "Custom"}
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">{plan.allowance || plan.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Need a bundle across accounting software / ERP, NRS e-invoicing, and NDPR data compliance?
            </p>
            <Button
              variant="outline"
              className="border-[#0b3574] text-[#0b3574] hover:bg-[#0b3574] hover:text-white"
              onClick={() => onNavigate?.("contact")}
            >
              Talk to sales about a combined proposal
            </Button>
          </div>
        </div>
      </section>

      {checkout ? (
        <RemitaPaymentDialog
          open
          onClose={() => setCheckout(null)}
          product={checkout.product}
          planName={checkout.planName}
          amount={checkout.amount}
          amountLabel={checkout.amountLabel}
        />
      ) : null}
    </div>
  );
}
