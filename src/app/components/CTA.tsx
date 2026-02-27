import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  onNavigate?: (page: string) => void;
}

export function CTA({ onNavigate }: CTAProps) {
  return (
    <section
      className="py-20 lg:py-32 relative overflow-hidden transition-colors"
      style={{ background: `linear-gradient(to bottom right, #0b3574, #172842)` }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-3xl text-white mb-6">
            Ready to streamline your accounting?
          </h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Flowbooks brings invoicing, reconciliation, and financial reporting into one secure workspace so your team can close the books faster and with fewer errors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 px-8 text-base" 
                style={{ color: '#0b3574' }}
              onClick={() => window.open('https://app.flowbooks.org/', '_blank', 'noopener,noreferrer')}
            >
              Register
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
              <Button 
                size="lg" 
                className="border-2 border-white bg-transparent text-white hover:bg-white px-8 text-base"
                style={{ 
                backgroundColor: 'transparent',
              }}
              onClick={() => onNavigate?.('contact')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#0b3574';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Contact Sales
            </Button>
          </div>
          
          <p className="text-sky-100 text-sm mt-6">
            Bank-level security · Built for accountants and finance teams · Works across entities and locations
          </p>
        </div>
      </div>
    </section>
  );
}