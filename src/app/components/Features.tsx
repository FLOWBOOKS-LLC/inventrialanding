import { Calculator, FileText, BarChart3, Shield, Zap, Users, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const features = [
  {
    icon: Calculator,
    iconColor: "#4166b2",
    title: "Automated Bookkeeping",
    description: "Automatically categorize transactions and reconcile accounts with AI-powered accuracy. Save hours of manual data entry.",
    details: "Advanced AI algorithms learn from your transaction patterns to categorize expenses and income automatically. Real-time bank synchronization keeps your books up-to-date.",
    imageUrl: "https://images.unsplash.com/photo-1753955900083-b62ee8d97805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2NvdW50aW5nJTIwZGFzaGJvYXJkJTIwc2NyZWVufGVufDF8fHx8MTc2ODkxNzI1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: FileText,
    iconColor: "#10b981",
    title: "Smart Invoicing",
    description: "Create, send, and track professional invoices. Get paid faster with automated reminders and payment tracking.",
    details: "Professional invoice templates with your branding. Automated payment reminders and real-time payment tracking help you get paid 2x faster.",
    imageUrl: "https://images.unsplash.com/photo-1762427354566-2b6902a9fd06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZvaWNlJTIwZG9jdW1lbnQlMjBidXNpbmVzc3xlbnwxfHx8fDE3Njg5MTcyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: BarChart3,
    iconColor: "#8b5cf6",
    title: "Real-time Analytics",
    description: "Access comprehensive financial reports and dashboards updated in real-time. Make data-driven decisions with confidence.",
    details: "Beautiful, interactive dashboards show your financial health at a glance. Custom reports help you understand cash flow, profitability, and growth trends.",
    imageUrl: "https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBjaGFydHMlMjBncmFwaHN8ZW58MXx8fHwxNzY4ODQ0MTM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: Shield,
    iconColor: "#ef4444",
    title: "Bank-level Security",
    description: "Your data is protected with 256-bit encryption and multi-factor authentication. Sleep soundly knowing your data is safe.",
    details: "Enterprise-grade security with 256-bit SSL encryption, multi-factor authentication, and regular security audits. Your financial data is always protected.",
    imageUrl: "https://images.unsplash.com/photo-1767972464040-8bfee42d7bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGxvY2slMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2ODkxNzI1NHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: Zap,
    iconColor: "#f59e0b",
    title: "Seamless Integration",
    description: "Connect with 100+ apps including your bank, payroll, and CRM systems. All your tools work together seamlessly.",
    details: "Pre-built integrations with all major banks, payment processors, and business tools. Data flows automatically between your favorite apps.",
    imageUrl: "https://images.unsplash.com/photo-1703113690885-8caf0c77a7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwaW50ZWdyYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2ODkxNzI1NXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: Users,
    iconColor: "#06b6d4",
    title: "Multi-user Access",
    description: "Collaborate with your team and accountant with customizable permission levels. Everyone stays in sync.",
    details: "Invite team members and your accountant with role-based permissions. Real-time collaboration keeps everyone on the same page.",
    imageUrl: "https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3Njg4NjEzMDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function Features() {
  const [selectedFeature, setSelectedFeature] = useState(0);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Feature list */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isSelected = selectedFeature === index;
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedFeature(index)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left group"
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
                  <div className="flex-1">
                    <div className="text-lg font-medium text-gray-900">{feature.title}</div>
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
                style={{ backgroundColor: '#4166b2' }}
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