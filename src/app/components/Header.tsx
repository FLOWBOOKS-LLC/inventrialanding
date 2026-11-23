import { Button } from "@/app/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { useTheme } from "@/app/theme/ThemeProvider";
import logo from "@/assets/flowbooks-blue.png";
import { serviceCatalog, serviceNavItems, type ServiceKey } from "@/app/constants/servicePlans";

interface HeaderProps {
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Header({ onNavigate, currentPage = "home" }: HeaderProps) {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (page: string) => {
    onNavigate?.(page);
    setMobileMenuOpen(false);
    setServicesOpen(false);
  };

  const isServicesActive =
    currentPage === "services" ||
    serviceNavItems.includes(currentPage as ServiceKey) ||
    currentPage === "compliance-assessment";

  const linkClass = (active: boolean) =>
    `transition-all duration-200 relative group cursor-pointer font-medium ${
      active ? "text-[#0b3574] dark:text-sky-300" : "text-gray-900 dark:text-white"
    }`;

  const underline = (active: boolean) => (
    <span
      className={`absolute bottom-0 left-0 h-0.5 transition-all duration-200 ${
        active ? "w-full" : "w-0 group-hover:w-full"
      }`}
      style={{ backgroundColor: "#0b3574" }}
    />
  );

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

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
        <div className="flex h-16 min-h-[4rem] w-full items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href="/"
              aria-label="Flowbooks home"
              className="flex items-center md:hidden"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("home");
              }}
            >
              <img src={logo} alt="Flowbooks" className="h-11 w-auto" />
            </a>

            <div
              className="hidden xl:flex flex-col justify-center flex-shrink-0 pr-3 mr-1 border-r border-gray-300/70 dark:border-white/10"
              aria-hidden
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0b3574] dark:text-sky-300">
                Our services
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                ERP · NRS e-invoicing · NDPR data compliance
              </span>
            </div>

            <nav className="hidden items-center gap-5 text-sm md:flex lg:gap-7">
              <button type="button" onClick={() => handleNavClick("home")} className={linkClass(currentPage === "home")}>
                Home
                {underline(currentPage === "home")}
              </button>

              <div className="relative" ref={servicesRef}>
                <button
                  type="button"
                  onClick={() => setServicesOpen((open) => !open)}
                  onMouseEnter={() => setServicesOpen(true)}
                  className={`${linkClass(isServicesActive)} inline-flex items-center gap-1`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  {underline(isServicesActive)}
                </button>

                {servicesOpen ? (
                  <div
                    className="absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-border bg-card shadow-xl p-2"
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick("services")}
                      className="w-full rounded-xl px-3 py-3 text-left hover:bg-[#0b3574]/5"
                    >
                      <div className="text-sm font-semibold text-foreground">All services</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Overview of ERP, NRS e-invoicing & NDPR data compliance
                      </div>
                    </button>
                    <div className="my-1 h-px bg-border" />
                    {serviceNavItems.map((key: ServiceKey) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleNavClick(key)}
                        className={`w-full rounded-xl px-3 py-3 text-left hover:bg-[#0b3574]/5 ${
                          currentPage === key ? "bg-[#0b3574]/5" : ""
                        }`}
                      >
                        <div className="text-sm font-semibold text-foreground">
                          {serviceCatalog[key].navLabel}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {serviceCatalog[key].eyebrow}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <button type="button" onClick={() => handleNavClick("about")} className={linkClass(currentPage === "about")}>
                About
                {underline(currentPage === "about")}
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className={linkClass(currentPage === "contact")}
              >
                Contact
                {underline(currentPage === "contact")}
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("faqs")}
                className={`hidden lg:inline-flex ${linkClass(currentPage === "faqs")}`}
              >
                FAQs
                {underline(currentPage === "faqs")}
              </button>
            </nav>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Button
              onClick={() => {
                window.open("https://app.flowbooks.org/signup", "_blank", "noopener,noreferrer");
              }}
              className="hidden md:block text-white hover:opacity-90"
              style={{ backgroundColor: "#0b3574" }}
            >
              Register
            </Button>

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
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 lg:px-6">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="py-2 text-left text-gray-900 dark:text-white font-bold"
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNavClick("services")}
              className={`py-2 text-left font-bold ${
                isServicesActive ? "text-[#0b3574] dark:text-sky-300" : "text-gray-900 dark:text-white"
              }`}
            >
              Services
            </button>
            <div className="pl-3 pb-1 text-[11px] uppercase tracking-[0.18em] text-[#0b3574] dark:text-sky-300 font-semibold">
              Our services
            </div>
            {serviceNavItems.map((key: ServiceKey) => (
              <button
                key={key}
                type="button"
                onClick={() => handleNavClick(key)}
                className={`pl-3 py-2 text-left font-medium ${
                  currentPage === key ? "text-[#0b3574] dark:text-sky-300" : "text-gray-900 dark:text-white"
                }`}
              >
                {serviceCatalog[key].navLabel}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handleNavClick("about")}
              className="py-2 text-left text-gray-900 dark:text-white font-bold"
            >
              About us
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("blog")}
              className="py-2 text-left text-gray-900 dark:text-white font-bold"
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("contact")}
              className="py-2 text-left text-gray-900 dark:text-white font-bold"
            >
              Contact Us
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("faqs")}
              className="py-2 text-left text-gray-900 dark:text-white font-bold"
            >
              FAQs
            </button>

            <div className="pt-2">
              <ThemeToggle />
            </div>
            <Button
              onClick={() => {
                window.open("https://app.flowbooks.org/signup", "_blank", "noopener,noreferrer");
              }}
              className="text-white hover:opacity-90 w-full mt-2"
              style={{ backgroundColor: "#0b3574" }}
            >
              Register
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
