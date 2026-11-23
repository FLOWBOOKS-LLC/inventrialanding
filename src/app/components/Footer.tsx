import logo from '@/assets/flowbooks-blue.png';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {
  ShieldCheck,
  BadgeCheck,
  FileCheck2,
  Network,
  Building2,
  Landmark,
  GraduationCap,
  Cpu,
  Handshake,
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const trustBadges = [
  {
    icon: ShieldCheck,
    title: 'ISO/IEC 27001:2022',
    subtitle: 'Certified',
  },
  {
    icon: BadgeCheck,
    title: 'NRS / NITDA Approved',
    subtitle: 'System Integrator',
  },
  {
    icon: FileCheck2,
    title: 'NDPA Audit Compliance',
    subtitle: 'Certificate 2025',
  },
  {
    icon: Network,
    title: 'NRS / NITDA Approved',
    subtitle: 'Access Point Provider',
  },
  {
    icon: Building2,
    title: 'Computer Professionals',
    subtitle: 'Registration Council of Nigeria',
  },
  {
    icon: Landmark,
    title: 'Nigeria Social Insurance',
    subtitle: 'Trust Fund',
  },
  {
    icon: GraduationCap,
    title: 'Industrial Training Fund',
    subtitle: 'Registered',
  },
  {
    icon: Cpu,
    title: 'NITDA',
    subtitle: 'National Information Technology Development Agency',
  },
  {
    icon: Handshake,
    title: 'NDP Act 2023 Audit',
    subtitle: 'Afri Invoice Nig Ltd — Certified Partner',
  },
];

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="text-white" style={{ backgroundColor: '#0b3574' }}>
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-12">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt="Flowbooks" className="h-8 w-auto" />
            </div>
            <p className="text-white/90 mb-6 leading-relaxed">
              Accounting software / ERP, NRS e-invoicing, and NDPR data compliance—helping organisations run operations, finance, and stay regulation-ready.
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-white/80">
                <span className="text-white/60">Email:</span> hello@flowbooks.com
              </p>
              <p className="text-sm text-white/80">
                <span className="text-white/60">Support:</span> support@flowbooks.com
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/flowbooksng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/flowbooksng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/flowbooksng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/flowbooksng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Navigation (matches main navbar) */}
          <div>
            <h3 className="text-white font-semibold mb-5">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate?.('home')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('about')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('clients')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Clients
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('blog')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('accounting')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  ERP / Accounting plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('e-invoicing')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  NRS E-Invoicing plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('compliance')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  NDPR Data Compliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('faqs')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact us
                </button>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Company */}
          <div>
            <h3 className="text-white font-semibold mb-5">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate?.('about')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  About Flowbooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('clients')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Our clients
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('blog')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Blog & insights
                </button>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Resources (existing pages only) */}
          <div>
            <h3 className="text-white font-semibold mb-5">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate?.('faqs')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('register-partner')}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust and Compliance */}
        <div className="border-t border-white/20 pt-10 mb-10">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-2">
              Trust and Compliance
            </p>
            <h3 className="text-xl font-semibold text-white">
              Certified, approved, and audit-ready
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={`${badge.title}-${badge.subtitle}`}
                  className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3"
                >
                  <div className="mt-0.5 w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white leading-snug">{badge.title}</div>
                    <div className="text-xs text-white/75 mt-0.5 leading-snug">{badge.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-white/70 text-sm">
              © 2026 flowbooks, Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a id="privacy" href="#privacy" className="text-white/70 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Cookies</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
