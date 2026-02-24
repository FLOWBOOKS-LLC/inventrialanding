import React from 'react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';
import { Users, Briefcase } from 'lucide-react';

interface RegisterChoiceProps {
  onNavigate?: (page: string) => void;
}

export function RegisterChoice({ onNavigate }: RegisterChoiceProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#0a1929' }}>
            How would you like to get started?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the registration type that best fits your needs
          </p>
        </motion.div>

        {/* Registration Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* User Registration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group bg-white rounded-3xl border-2 border-gray-200 p-8 hover:border-transparent hover:shadow-2xl transition-all duration-300"
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ background: '#4166b2' }}></div>
            <div className="relative z-10">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ background: '#4166b2' }}
              >
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: '#0a1929' }}>
                Register as User
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Access Flowbooks accounting software to manage your business finances, track income, and generate financial reports.
              </p>
              <ul className="space-y-2 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4166b2' }}></span>
                  Full accounting features
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4166b2' }}></span>
                  30-day free trial
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4166b2' }}></span>
                  Choose your plan later
                </li>
              </ul>
              <Button
                className="w-full text-white hover:opacity-90"
                style={{ background: '#4166b2' }}
                onClick={() => onNavigate?.('contact')}
              >
                Register as User
              </Button>
            </div>
          </motion.div>

          {/* Partner Registration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group bg-white rounded-3xl border-2 p-8 hover:shadow-2xl transition-all duration-300"
            style={{
              borderColor: '#4166b2',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300" style={{ background: '#4166b2' }}></div>
            <div className="relative z-10">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-white"
                style={{ background: '#4166b2' }}
              >
                <Briefcase className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: '#0a1929' }}>
                Register as Client
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Join our partner program to offer Flowbooks to your clients and grow your business with our flexible pricing plans.
              </p>
              <ul className="space-y-2 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4166b2' }}></span>
                  Partner benefits
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4166b2' }}></span>
                  Flexible pricing plans
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4166b2' }}></span>
                  Dedicated support
                </li>
              </ul>
              <Button
                className="w-full text-white hover:opacity-90"
                style={{ background: '#4166b2' }}
                onClick={() => onNavigate?.('register-partner')}
              >
                View Plans & Register
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-sm">
            Have questions? <span style={{ color: '#4166b2' }} className="font-semibold cursor-pointer">Contact our sales team</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default RegisterChoice;
