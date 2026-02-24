import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Check } from 'lucide-react';

interface RegisterProps {
  onNavigate?: (page: string) => void;
}

const plans = [
  {
    name: 'Simple Start',
    priceDisplay: '2,824',
    originalPrice: '28,242',
    per: '/mo',
    note: 'Save ₦25,418/mo for 3 months',
    features: [
      'Track income & expenses',
      'Send unlimited custom invoices & quotes',
      'Connect your bank',
      'Track GST and VAT',
      'Insights & reports',
      'Progress invoicing',
      'Up to 250 items in Chart of Accounts',
      'For one user, plus your accountant',
    ],
  },
  {
    name: 'Essentials',
    priceDisplay: '4,169',
    originalPrice: '41,690',
    per: '/mo',
    note: 'Save ₦37,521/mo for 3 months',
    features: [
      'Track income & expenses',
      'Send unlimited custom invoices & quotes',
      'Connect your bank',
      'Track GST and VAT',
      'Insights & reports',
      'Progress invoicing',
      'Up to 250 items in Chart of Accounts',
      'Manage bills & payments',
      'Track employee time',
      'Multi-currency',
      'For three users, plus your accountant',
    ],
  },
  {
    name: 'Plus',
    priceDisplay: '6,186',
    originalPrice: '61,863',
    per: '/mo',
    note: 'Save ₦55,677/mo for 3 months',
    features: [
      'Track income & expenses',
      'Send unlimited custom invoices & quotes',
      'Connect your bank',
      'Track GST and VAT',
      'Insights & reports',
      'Progress invoicing',
      'Up to 250 items in Chart of Accounts',
      'Manage bills & payments',
      'Track employee time',
      'Multi-currency',
      'Recurring transactions and bills',
      'Track inventory',
      'Manage budgets',
      'Up to 40 classes and locations',
      'For five users, plus your accountant',
    ],
    highlight: true,
  },
  {
    name: 'Advanced',
    priceDisplay: '11,969',
    originalPrice: '119,691',
    per: '/mo',
    note: 'Save ₦107,722/mo for 3 months',
    features: [
      'Track income & expenses',
      'Send unlimited custom invoices & quotes',
      'Connect your bank',
      'Track GST and VAT',
      'Insights & reports',
      'Progress invoicing',
      'UNLIMITED items in Chart of Accounts',
      'Manage bills & payments',
      'Track employee time',
      'Multi-currency',
      'Recurring transactions and bills',
      'Track inventory',
      'Manage budgets',
      'UNLIMITED classes and locations',
      'Data sync with Excel',
      'Customise role permissions',
      'Manage users (up to 25)',
      'Automate workflows',
      'Custom reporting fields',
      'Customise dashboards',
      'Backup online & restore data',
      'Manage revenue recognition',
    ],
  },
];

export function Register({ onNavigate }: RegisterProps) {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0a1929 0%, #1a2942 100%)' }}>
        <div className="container mx-auto px-4 lg:px-8 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">Choose a plan that fits your business</h2>
          <p className="text-sm text-white/80 max-w-2xl mx-auto">Start with a 30-day free trial. Upgrade anytime.</p>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`bg-white rounded-2xl shadow-sm border ${p.highlight ? 'border-2' : 'border-gray-100'} flex flex-col overflow-hidden`}
                style={p.highlight ? { borderColor: '#4166b2', boxShadow: '0 12px 30px rgba(65,102,178,0.06)' } : {}}
              >
                {/* Upper section */}
                <div className="px-6 py-8 text-center">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#0a1929' }}>{p.name}</h3>

                  <div className="text-xs text-gray-400 line-through mb-2">₦{p.originalPrice}</div>

                  <div className="flex items-baseline justify-center gap-2">
                    <div className="text-3xl lg:text-4xl font-extrabold" style={{ color: '#0a1929' }}>₦{p.priceDisplay}</div>
                    <div className="text-sm text-gray-500 mt-1">{p.per}</div>
                  </div>

                  <div className="text-xs text-gray-500 mt-3">{p.note}</div>

                  <div className="mt-6">
                    <Button className="w-full text-white py-3" style={{ background: '#4166b2' }} onClick={() => onNavigate?.('contact')}>
                      Select plan
                    </Button>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Lower section - features */}
                <div className="px-6 py-6 flex-1 overflow-y-auto">
                  <ul className="space-y-3 text-sm text-gray-700">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-1 text-white rounded-full p-1" style={{ background: '#e6eefc' }}>
                          <Check className="w-3 h-3 text-[#4166b2]" />
                        </span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
