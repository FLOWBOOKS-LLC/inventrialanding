import { ArrowRight, Check, ChevronRight, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { SeoLink } from "@/app/components/seo/SeoLink";
import { landingPages } from "@/app/constants/seoLandingPages";
import { absoluteUrl, pathForPage, routes, type PageKey } from "@/app/lib/seo";

interface FeatureLandingPageProps {
  page: PageKey;
  onNavigate?: (page: string) => void;
}

/**
 * Shared layout for keyword landing pages that describe capabilities FlowBooks
 * already ships. Content comes from `seoLandingPages.ts`.
 */
export function FeatureLandingPage({ page, onNavigate }: FeatureLandingPageProps) {
  const content = landingPages[page];
  const meta = routes[page];

  if (!content || !meta) return null;

  return (
    <div className="bg-background text-foreground transition-colors" style={{ fontFamily: "Roboto, sans-serif" }}>
      <section
        className="relative overflow-hidden py-16 lg:py-24"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 20%, #1a2942 50%, #0b3574 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6 relative z-10 text-white">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/70">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <a href={pathForPage("home")} onClick={(e) => { e.preventDefault(); onNavigate?.("home"); }} className="hover:text-white">
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href={pathForPage("services")} onClick={(e) => { e.preventDefault(); onNavigate?.("services"); }} className="hover:text-white">
                  Services
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90">{content.heading}</li>
            </ol>
          </nav>

          <p className="text-white/70 text-sm uppercase tracking-[0.2em] mb-3">{content.eyebrow}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 max-w-3xl">{content.heading}</h1>
          <p className="text-base md:text-lg text-white/80 max-w-3xl">{content.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="text-white hover:opacity-90"
              style={{ backgroundColor: "#0b3574" }}
              onClick={() => onNavigate?.("accounting")}
            >
              View plans and pricing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={() => onNavigate?.("contact")}
            >
              Talk to sales
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 grid lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-2 space-y-10">
            {content.sections.map((section, index) => (
              <div key={section.title}>
                <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-3">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                {index === 0 ? (
                  <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                    {content.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-3 text-sm text-foreground">
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-[#0b3574]/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-[#0b3574]" />
                        </span>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-4">Explore related capabilities</h2>
              <ul className="space-y-3 text-sm">
                {content.related.map((related) => (
                  <li key={related}>
                    <SeoLink
                      page={related}
                      onNavigate={onNavigate}
                      className="inline-flex items-center gap-1 text-[#0b3574] hover:underline"
                    >
                      {routes[related].title.split("|")[0].trim()}
                      <ChevronRight className="w-4 h-4" />
                    </SeoLink>
                  </li>
                ))}
                <li>
                  <SeoLink page="accounting" onNavigate={onNavigate} className="inline-flex items-center gap-1 text-[#0b3574] hover:underline">
                    ERP and accounting plans
                    <ChevronRight className="w-4 h-4" />
                  </SeoLink>
                </li>
                <li>
                  <SeoLink page="e-invoicing" onNavigate={onNavigate} className="inline-flex items-center gap-1 text-[#0b3574] hover:underline">
                    NRS e-invoicing packages
                    <ChevronRight className="w-4 h-4" />
                  </SeoLink>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#0b3574]/20 bg-[#0b3574]/5 p-6">
              <p className="text-sm font-semibold text-foreground mb-2">Canonical page</p>
              <p className="text-xs text-muted-foreground break-all">{absoluteUrl(meta.path)}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-muted/30 to-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircleQuestion className="w-5 h-5 text-[#0b3574]" />
            <h2 className="text-2xl font-semibold text-foreground">Frequently asked questions</h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-foreground marker:content-none">
                  {faq.question}
                  <ChevronRight className="w-4 h-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button className="text-white" style={{ backgroundColor: "#0b3574" }} onClick={() => onNavigate?.("faqs")}>
              More FlowBooks FAQs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-[#0b3574] text-[#0b3574] hover:bg-[#0b3574] hover:text-white"
              onClick={() => onNavigate?.("contact")}
            >
              Ask a question
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
