import { Button } from "@/app/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { useTheme } from "@/app/theme/ThemeProvider";

interface HeaderProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Header({ onNavigate, currentPage = 'home' }: HeaderProps) {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="shrink-0"
      style={{
        background:
          theme === "dark"
            ? "radial-gradient(circle at top, #020617 0%, #020617 55%, #000000 100%)"
            : "linear-gradient(180deg, #f0f5fc 0%, #e8eef9 50%, #e2e9f5 100%)",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex h-16 min-h-[4rem] w-full items-center justify-between">
          <nav className="hidden items-center gap-8 text-sm md:flex lg:gap-10">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="transition-all duration-200 relative group cursor-pointer text-gray-900 dark:text-white font-medium"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: '#0b3574' }}></span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="transition-all duration-200 relative group cursor-pointer text-gray-900 dark:text-white font-medium"
            >
              About us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: '#0b3574' }}></span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('blog')}
              className="transition-all duration-200 relative group cursor-pointer text-gray-900 dark:text-white font-medium"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: '#0b3574' }}></span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="transition-all duration-200 relative group cursor-pointer text-gray-900 dark:text-white font-medium"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: '#0b3574' }}></span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('register-partner')}
              className="transition-all duration-200 relative group cursor-pointer text-gray-900 dark:text-white font-medium"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: '#0b3574' }}></span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faqs')}
              className="transition-all duration-200 relative group cursor-pointer text-gray-900 dark:text-white font-medium"
            >
              FAQs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full" style={{ backgroundColor: '#0b3574' }}></span>
            </button>
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Button 
              onClick={() => handleNavClick('contact')}
              className="hidden md:block text-white hover:opacity-90" 
              style={{ backgroundColor: '#0b3574' }}
            >
              Contact sales
            </Button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="border-t border-white/10 md:hidden"
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(circle at top, #020617 0%, #020617 55%, #000000 100%)"
                : "linear-gradient(180deg, #f0f5fc 0%, #e8eef9 50%, #e2e9f5 100%)",
          }}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 lg:px-6">
            <a 
              onClick={() => handleNavClick('home')}
              className={`py-2 transition-colors cursor-pointer text-gray-900 dark:text-white font-bold`}
            >
              Home
            </a>
            <a 
              onClick={() => handleNavClick('about')}
              className={`py-2 transition-colors cursor-pointer text-gray-900 dark:text-white font-bold`}
            >
              About us
            </a>
            <a 
              onClick={() => handleNavClick('blog')}
              className={`py-2 transition-colors cursor-pointer text-gray-900 dark:text-white font-bold`}
            >
              Blog
            </a>
            <a 
              onClick={() => handleNavClick('contact')}
              className={`py-2 transition-colors cursor-pointer text-gray-900 dark:text-white font-bold`}
            >
              Contact Us
            </a>
            <a 
              onClick={() => handleNavClick('register-partner')}
              className={`py-2 transition-colors cursor-pointer text-gray-900 dark:text-white font-bold`}
            >
              Pricing
            </a>
            <a 
              onClick={() => handleNavClick('faqs')}
              className={`py-2 transition-colors cursor-pointer text-gray-900 dark:text-white font-bold`}
            >
              FAQs
            </a>
            <div className="md:hidden mr-2">
              <ThemeToggle />
            </div>
            <Button 
              onClick={() => handleNavClick('contact')}
              className="text-white hover:opacity-90 w-full" 
              style={{ backgroundColor: '#0b3574' }}
            >
              Contact sales
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
