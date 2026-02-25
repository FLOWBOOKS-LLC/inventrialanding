import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

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
      <section
        className="relative overflow-hidden py-20 lg:py-28"
        style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 20%, #1a2942 50%, #4166b2 100%)' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-16 left-12 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: '#4166b2' }}
            animate={{ y: [0, 50, 0], x: [0, 30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-12 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: '#0a1929' }}
            animate={{ y: [0, -40, 0], x: [0, -30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 text-center text-white relative z-10">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">Choose a plan that fits your business</h2>
          <p className="text-sm text-white/80 max-w-2xl mx-auto">Start with a 30-day free trial. Upgrade anytime.</p>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 lg:h-32" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,50 C360,90 720,10 1080,50 C1260,70 1350,80 1440,90 L1440,100 L0,100 Z" fill="white" fillOpacity="0.1"/>
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1350,90 1440,100 L1440,100 L0,100 Z" fill="white"/>
          </svg>
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
