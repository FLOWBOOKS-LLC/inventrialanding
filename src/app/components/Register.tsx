import React from 'react';
import { Button } from '@/app/components/ui/button';

interface RegisterProps {
  onNavigate?: (page: string) => void;
}

const plans = [
  {
    name: 'Simple Start',
    price: '2,824',
    per: '/mo',
    note: 'Save ₦25,418/mo for 3 months',
    features: ['Track income & expenses', 'Send unlimited invoices', 'Connect your bank', 'Track GST and VAT'],
  },
  {
    name: 'Essentials',
    price: '4,169',
    per: '/mo',
    note: 'Save ₦37,521/mo for 3 months',
    features: ['All Simple features', 'Insights & reports', 'Progress invoicing'],
  },
  {
    name: 'Plus',
    price: '6,186',
    per: '/mo',
    note: 'Save ₦55,677/mo for 3 months',
    features: ['Everything in Essentials', 'Advanced reports', 'Multi-user access'],
    highlight: true,
  },
  {
    name: 'Advanced',
    price: '11,969',
    per: '/mo',
    note: 'Save ₦107,722/mo for 3 months',
    features: ['All Plus features', 'Unlimited items', 'Priority support'],
  },
];

export function Register({ onNavigate }: RegisterProps) {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0a1929 0%, #1a2942 100%)' }}>
        <div className="container mx-auto px-4 lg:px-8 text-center text-white">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-4">Choose a plan that fits your business</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Start with a 30-day free trial. Upgrade anytime. Our plans scale with you.</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`bg-white rounded-2xl shadow-lg border ${p.highlight ? 'border-2' : 'border-gray-100'} p-6 flex flex-col`}
                style={p.highlight ? { borderColor: 'rgba(65,102,178,0.14)', boxShadow: '0 10px 30px rgba(65,102,178,0.06)' } : {}}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: '#0a1929' }}>{p.name}</h3>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl lg:text-4xl font-bold" style={{ color: '#0a1929' }}>₦{p.price}</div>
                    <div className="text-sm text-gray-500">{p.per}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{p.note}</div>
                </div>

                <ul className="flex-1 space-y-2 text-sm text-gray-600 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="w-2.5 h-2.5 mt-1 rounded-full" style={{ background: '#4166b2' }}></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <Button
                    className="w-full text-white"
                    style={{ background: '#4166b2' }}
                    onClick={() => onNavigate?.('contact')}
                  >
                    Select plan
                  </Button>

                  <div className="text-center text-xs text-gray-500 mt-3">Start a free 30-day trial</div>
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
