import { Calculator, FileText, BarChart3, Shield, Zap, Users, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const features = [
  {
    icon: Calculator,
    iconColor: "#4166b2",
    title: "Automated bookkeeping & reconciliations",
    description: "Automatically categorize transactions and reconcile accounts with bank feeds and rules-based workflows.",
    details: "Import bank feeds, auto-categorize transactions, and reconcile accounts with rules-based workflows. Flowbooks reduces manual posting, keeps your general ledger clean, and helps you close each period with confidence.",
    imageUrl: "https://images.unsplash.com/photo-1753955900083-b62ee8d97805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NvdW50aW5nJTIwZGFzaGJvYXJkJTIwc2NyZWVufGVufDF8fHx8MTc2ODkxNzI1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: FileText,
    iconColor: "#10b981",
    title: "Invoicing & receivables",
    description: "Create, send, and track invoices end-to-end so cash doesn’t get stuck in AR.",
    details: "Create professional invoices in seconds, send them by email or link, and track what’s paid, overdue, or disputed. Aging reports and customer statements keep your receivables under control and improve cash collection.",
    imageUrl: "https://images.unsplash.com/photo-1762427354566-2b6902a9fd06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZvaWNlJTIwZG9jdW1lbnQlMjBidXNpbmVzc3xlbnwxfHx8fDE3Njg5MTcyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: BarChart3,
    iconColor: "#8b5cf6",
    title: "Financial reporting & insights",
    description: "See real-time P&L, balance sheet, and cash flow so you always know where the business stands.",
    details: "Drill into profit and loss, balance sheet, and cash flow views with filters by period, entity, or segment. Turn raw transactions into audit-ready statements and dashboards that help owners and finance teams make faster decisions.",
    imageUrl: "https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBjaGFydHMlMjBncmFwaHN8ZW58MXx8fHwxNzY4ODQ0MTM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: Shield,
    iconColor: "#ef4444",
    title: "Security & compliance",
    description: "Protect sensitive financial data with bank-level security and audit-friendly records.",
    details: "Keep financial data safe with strong encryption, fine-grained access controls, and detailed activity history. Flowbooks is designed to support audit trails and compliance-ready documentation for your books.",
    imageUrl: "https://images.unsplash.com/photo-1767972464040-8bfee42d7bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGxvY2slMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2ODkxNzI1NHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: Zap,
    iconColor: "#f59e0b",
    title: "Bank, payroll & app integrations",
    description: "Connect bank accounts, payroll, and payment tools so data flows automatically into your books.",
    details: "Sync transactions from banks, payroll systems, and payment providers to avoid duplicate entry. Keep your ledgers aligned with the tools you already use while maintaining a single source of financial truth.",
    imageUrl: "https://images.unsplash.com/photo-1703113690885-8caf0c77a7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwaW50ZWdyYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2ODkxNzI1NXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: Users,
    iconColor: "#06b6d4",
    title: "Multi-entity & role-based access",
    description: "Collaborate with your team and accountant while keeping access and entities under control.",
    details: "Invite founders, finance teams, and external accountants into one workspace with role-based access. Manage multiple entities or locations from a single login while keeping each set of books properly separated.",
    imageUrl: "https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3Njg4NjEzMDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left side - Feature list */}
          <div className="space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isSelected = selectedFeature === index;
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedFeature(index)}
                  className="w-full flex items-start gap-4 p-4 rounded-xl transition-all duration-300 text-left group"
                  style={{
                    backgroundColor: isSelected ? 'white' : 'rgba(0, 0, 0, 0)',
                    boxShadow: isSelected ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ backgroundColor: isSelected ? feature.iconColor : '#f3f4f6' }}
                  >
                    <Icon 
                      className="w-6 h-6 transition-colors" 
                      style={{ color: isSelected ? 'white' : '#6b7280' }}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm md:text-base font-medium text-gray-900">
                      {feature.title}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                  <ChevronRight 
                    className="w-5 h-5 transition-all duration-300" 
                    style={{ 
                      color: isSelected ? feature.iconColor : '#d1d5db',
                      opacity: isSelected ? 1 : 0,
                      transform: isSelected ? 'translateX(0)' : 'translateX(-8px)'
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right side - Feature details */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col">
            <div className="relative h-48 overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={features[selectedFeature].imageUrl}
                alt={features[selectedFeature].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xs font-semibold mb-2 tracking-wider" style={{ color: '#4166b2' }}>
                FLOWBOOKS
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
                {features[selectedFeature].title}
              </h3>
              <p className="text-gray-600 text-base mb-4 leading-relaxed flex-1">
                {features[selectedFeature].details}
              </p>
              <Button 
                className="text-white hover:opacity-90 transition-opacity w-fit"
                style={{ backgroundColor: '#0b3574' }}
                onClick={() => onNavigate?.('faqs')}
              >
                Learn more
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}