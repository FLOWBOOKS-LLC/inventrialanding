import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/app/theme/ThemeProvider";

interface CTAProps {
  onNavigate?: (page: string) => void;
}

export function CTA({ onNavigate }: CTAProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className="py-20 lg:py-32 relative overflow-hidden transition-colors"
      style={{
        background: isDark
          ? "radial-gradient(circle at top, #020617 0%, #020617 55%, #000000 100%)"
          : "linear-gradient(180deg, #f0f5fc 0%, #e8eef9 50%, #e2e9f5 100%)",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl lg:text-3xl mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Ready to streamline your accounting?
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDark ? "text-sky-100" : "text-gray-600"}`}>
            Flowbooks brings invoicing, reconciliation, and financial reporting into one secure workspace so your team can close the books faster and with fewer errors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className={`px-8 text-base ${isDark ? "bg-white hover:bg-gray-100 text-[#0b3574]" : "bg-[#0b3574] hover:bg-[#0a2942] text-white"}`}
              onClick={() => window.open('https://app.flowbooks.org/', '_blank', 'noopener,noreferrer')}
            >
              Register
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
              <Button 
                size="lg" 
                className={`border-2 px-8 text-base ${
                  isDark 
                    ? "border-white bg-transparent text-white hover:bg-white" 
                    : "border-[#0b3574] bg-transparent text-[#0b3574] hover:bg-[#0b3574] hover:text-white"
                }`}
                style={{ backgroundColor: 'transparent' }}
                onClick={() => onNavigate?.('contact')}
                onMouseEnter={(e) => {
                  if (isDark) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#0b3574';
                  } else {
                    e.currentTarget.style.backgroundColor = '#0b3574';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = isDark ? 'white' : '#0b3574';
                }}
              >
                Contact Us
              </Button>
          </div>
          
          <p className={`text-sm mt-6 ${isDark ? "text-sky-100" : "text-gray-600"}`}>
            Bank-level security · Built for accountants and finance teams · Works across entities and locations
          </p>
        </div>
      </div>
    </section>
  );
}