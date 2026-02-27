import logo from '@/assets/flowbooks-blue.png';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-12">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt="Flowbooks" className="h-8 w-auto" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Simplifying accounting for businesses of all sizes. From invoicing to expense tracking, we've got you covered.
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-400">
                <span className="text-gray-500">Email:</span> hello@flowbooks.com
              </p>
              <p className="text-sm text-gray-400">
                <span className="text-gray-500">Support:</span> support@flowbooks.com
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/flowbooksng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/flowbooksng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/flowbooksng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/flowbooksng"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
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
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('clients')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Clients
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('blog')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('register-partner')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('faqs')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
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
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Flowbooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('clients')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our clients
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('blog')}
                  className="text-gray-400 hover:text-white transition-colors"
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
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('register-partner')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 flowbooks, Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Cookies</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Sitemap</a>
              <button 
                onClick={() => onNavigate?.('admin')}
                className="text-gray-600 hover:text-gray-400 transition-colors opacity-50 hover:opacity-100"
                title="Admin Dashboard"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}