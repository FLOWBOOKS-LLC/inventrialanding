import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { SeoLink } from "@/app/components/seo/SeoLink";

interface NotFoundPageProps {
  onNavigate?: (page: string) => void;
}

/** Rendered for unknown URLs. Kept out of search results via a noindex route. */
export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-3xl mx-auto px-4 lg:px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#0b3574]/10 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-7 h-7 text-[#0b3574]" />
        </div>
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for has moved or no longer exists. These pages cover what FlowBooks offers.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button className="text-white" style={{ backgroundColor: "#0b3574" }} onClick={() => onNavigate?.("home")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Button>
          <Button
            variant="outline"
            className="border-[#0b3574] text-[#0b3574] hover:bg-[#0b3574] hover:text-white"
            onClick={() => onNavigate?.("contact")}
          >
            Contact us
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <li><SeoLink page="services" onNavigate={onNavigate} className="text-[#0b3574] hover:underline">Services</SeoLink></li>
          <li><SeoLink page="accounting" onNavigate={onNavigate} className="text-[#0b3574] hover:underline">ERP plans</SeoLink></li>
          <li><SeoLink page="e-invoicing" onNavigate={onNavigate} className="text-[#0b3574] hover:underline">NRS e-invoicing</SeoLink></li>
          <li><SeoLink page="faqs" onNavigate={onNavigate} className="text-[#0b3574] hover:underline">FAQs</SeoLink></li>
          <li><SeoLink page="blog" onNavigate={onNavigate} className="text-[#0b3574] hover:underline">Blog</SeoLink></li>
        </ul>
      </div>
    </section>
  );
}
