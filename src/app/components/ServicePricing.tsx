import { Calculator, BadgeCheck, Scale, Check, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { serviceCatalog, type ServiceKey } from "@/app/constants/servicePlans";

interface ServicePricingProps {
  onNavigate?: (page: string) => void;
}

const serviceMeta: Record<
  ServiceKey,
  { icon: typeof Calculator; badge: string; blurb: string }
> = {
  accounting: {
    icon: Calculator,
    badge: "ERP / accounting plans",
    blurb: "Simple Start to Advanced—accounting software and ERP pricing for every team size.",
  },
  "e-invoicing": {
    icon: BadgeCheck,
    badge: "NRS e-invoicing plans",
    blurb: "Connect, Scale, and Enterprise plans for NRS statutory e-invoicing.",
  },
  compliance: {
    icon: Scale,
    badge: "Assessment → proposal",
    blurb: "Take the NDPR assessment; we email a tailored data compliance proposal.",
  },
};

export function ServicePricing({ onNavigate }: ServicePricingProps) {
  const keys: ServiceKey[] = ["accounting", "e-invoicing", "compliance"];

  return (
    <section
      className="py-20 lg:py-28 bg-white dark:bg-slate-950 transition-colors"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <p className="text-sm font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "#4166b2" }}>
            Services & pricing
          </p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Separate plans for each offer
          </h2>
          <p className="text-base lg:text-lg text-gray-600 dark:text-slate-300">
            Open ERP, NRS E-Invoicing, or NDPR Data Compliance in Services to see that offer’s own plans.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-7">
          {keys.map((key) => {
            const service = serviceCatalog[key];
            const meta = serviceMeta[key];
            const Icon = meta.icon;
            const startingPlan = service.plans.find((plan) => plan.priceDisplay) || service.plans[0];
            const isAssessmentOnly = key === "compliance" || service.plans.length === 0;

            return (
              <div
                key={key}
                className="rounded-2xl border bg-card p-6 lg:p-7 flex flex-col"
                style={{
                  borderColor: "rgba(15, 23, 42, 0.08)",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#e8eef9" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#0b3574" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ color: "#4166b2" }}>
                      {meta.badge}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {service.navLabel}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-slate-300 mb-6">{meta.blurb}</p>

                <div className="mb-6">
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    {isAssessmentOnly ? "Pricing" : "Starting from"}
                  </div>
                  {isAssessmentOnly ? (
                    <div className="text-3xl font-semibold text-gray-900 dark:text-white">By proposal</div>
                  ) : startingPlan?.priceDisplay ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-semibold text-gray-900 dark:text-white">
                        ₦{startingPlan.priceDisplay}
                      </span>
                      <span className="text-gray-500 dark:text-slate-400">{startingPlan.per || "/mo"}</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-semibold text-gray-900 dark:text-white">Custom</div>
                  )}
                  <p className="text-sm mt-2" style={{ color: "#0b3574" }}>
                    {isAssessmentOnly
                      ? "Complete assessment to receive a quote"
                      : `${service.plans.length} plans available`}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-5 mb-6 flex-1">
                  {isAssessmentOnly ? (
                    <ul className="space-y-3">
                      {[
                        "NDP Act / GAID client assessment",
                        "Classification & compliance roadmap",
                        "Tailored proposal by email",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-200">
                          <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-[#0b3574]/10">
                            <Check className="w-3.5 h-3.5 text-[#0b3574]" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-3">
                      {service.plans.map((plan) => (
                        <li key={plan.name} className="flex items-start gap-3 text-sm text-gray-700 dark:text-slate-200">
                          <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-[#0b3574]/10">
                            <Check className="w-3.5 h-3.5 text-[#0b3574]" />
                          </span>
                          <span>
                            <span className="font-medium">{plan.name}</span>
                            {plan.priceDisplay ? ` — ₦${plan.priceDisplay}${plan.per || "/mo"}` : " — Custom"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Button
                  className="text-white hover:opacity-90 transition-opacity w-full"
                  style={{ backgroundColor: "#0b3574" }}
                  onClick={() => onNavigate?.(isAssessmentOnly ? "compliance-assessment" : key)}
                >
                  {isAssessmentOnly ? "Take the assessment" : `View ${service.navLabel} pricing`}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
