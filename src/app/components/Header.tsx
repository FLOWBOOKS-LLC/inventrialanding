import { Button } from "@/app/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/flo-blue.svg";

interface HeaderProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Header({ onNavigate, currentPage = 'home' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50" style={{ background: 'linear-gradient(135deg, #0a1929 0%, #1a2942 100%)', fontFamily: 'Roboto, sans-serif' }}>
      <div className="px-4 md:px-8">
        <div className="flex items-center h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <img src={logo} alt="flowbooks" className="h-10 w-10" />
            {/* <span className="text-2xl font-medium text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>flowbooks</span> */}
          </div>
          
          <nav className="hidden md:flex items-center gap-8 mx-auto">
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="transition-all duration-200 relative group cursor-pointer text-white font-bold"
            >
              About us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: '#4166b2' }}></span>
            </button>
            <button
            type="button"
              onClick={() => handleNavClick('clients')}
              className="transition-all duration-200 relative group cursor-pointer text-white font-bold"
            >
              Clients
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: '#4166b2' }}></span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('blog')}
              className="transition-all duration-200 relative group cursor-pointer text-white font-bold"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: '#4166b2' }}></span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="transition-all duration-200 relative group cursor-pointer text-white font-bold"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: '#4166b2' }}></span>
            </button>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => handleNavClick('contact')}
              className="hidden md:block text-white hover:opacity-90" 
              style={{ backgroundColor: '#4166b2' }}
            >
              Get Started
            </Button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10" style={{ background: 'linear-gradient(135deg, #0a1929 0%, #1a2942 100%)' }}>
          <nav className="px-4 py-4 flex flex-col gap-4">
            <a 
              onClick={() => handleNavClick('about')}
              className={`py-2 transition-colors cursor-pointer text-white font-bold`}
            >
              About us
            </a>
            <a 
              onClick={() => handleNavClick('clients')}
              className={`py-2 transition-colors cursor-pointer text-white font-bold`}
            >
              Clients
            </a>
            <a 
              onClick={() => handleNavClick('blog')}
              className={`py-2 transition-colors cursor-pointer text-white font-bold`}
            >
              Blog
            </a>
            <a 
              onClick={() => handleNavClick('contact')}
              className={`py-2 transition-colors cursor-pointer text-white font-bold`}
            >
              Contact Us
            </a>
            <Button 
              onClick={() => handleNavClick('contact')}
              className="text-white hover:opacity-90 w-full" 
              style={{ backgroundColor: '#4166b2' }}
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}