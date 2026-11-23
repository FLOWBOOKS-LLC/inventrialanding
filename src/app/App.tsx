import { useCallback, useEffect, useState } from 'react';
import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { Features } from '@/app/components/Features';
import { Services } from '@/app/components/Services';
import { ServicePlanPage } from '@/app/components/ServicePlanPage';
import { ComplianceAssessment } from '@/app/components/ComplianceAssessment';
import { Testimonials } from '@/app/components/Testimonials';
import { CTA } from '@/app/components/CTA';
import { Footer } from '@/app/components/Footer';
import { AboutUs } from '@/app/components/AboutUs';
import { Clients } from '@/app/components/Clients';
import { Blog } from '@/app/components/Blog';
import { ContactUs } from '@/app/components/ContactUs';
import { TopNavbar } from '@/app/components/TopNavbar';
import { FAQs } from '@/app/components/FAQs';
import { TrustedPartnersStrip } from '@/app/components/TrustedPartnersStrip';
import { CookieNotice } from '@/app/components/CookieNotice';
import { FeatureLandingPage } from '@/app/components/seo/FeatureLandingPage';
import { NotFoundPage } from '@/app/components/seo/NotFoundPage';
import { isLandingPage } from '@/app/constants/seoLandingPages';
import { serviceNavItems, type ServiceKey } from '@/app/constants/servicePlans';
import { pageFromLocation, pushPage } from '@/app/lib/router';
import { useSeo } from '@/app/lib/useSeo';
import { applyConsentChange, initAnalyticsIfConsented, trackPageView, watchConsent } from '@/app/lib/analytics';
import { pathForPage, routes, type PageKey } from '@/app/lib/seo';

const registerUrl = 'https://dashboard.inventria.app/signup';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>(() => pageFromLocation());

  const isServicePage = serviceNavItems.includes(currentPage as ServiceKey);

  // Keep <head> (title, description, canonical, social tags, JSON-LD) in sync with the route
  useSeo(currentPage);

  const navigate = useCallback((page: string) => {
    const next = (page in routes ? page : 'not-found') as PageKey;
    setCurrentPage(next);
    pushPage(next);
  }, []);

  // Analytics: GA4 only loads after analytics consent is granted (cookie policy)
  useEffect(() => {
    initAnalyticsIfConsented();
    return watchConsent(applyConsentChange);
  }, []);

  useEffect(() => {
    trackPageView(pathForPage(currentPage), routes[currentPage].title);
  }, [currentPage]);

  // Browser back/forward navigation
  useEffect(() => {
    const onPopState = () => setCurrentPage(pageFromLocation());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Scroll to top whenever the page changes
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 0);
  }, [currentPage]);

  // Redirect any legacy "register" navigation to the new signup portal
  useEffect(() => {
    if (currentPage === 'register') {
      window.open(registerUrl, '_blank', 'noopener,noreferrer');
      setCurrentPage('accounting');
      pushPage('accounting', { replace: true });
    } else if (currentPage === 'register-partner') {
      setCurrentPage('accounting');
      pushPage('accounting', { replace: true });
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0b3574] focus:shadow"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50">
        <TopNavbar onNavigate={navigate} />
        <Header onNavigate={navigate} currentPage={currentPage} />
      </header>
      <main id="main-content">
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={navigate} />
            <Features onNavigate={navigate} />
            <TrustedPartnersStrip />
            <Testimonials onNavigate={navigate} />
            <CTA onNavigate={navigate} />
          </>
        ) : currentPage === 'services' ? (
          <Services onNavigate={navigate} />
        ) : currentPage === 'compliance-assessment' ? (
          <ComplianceAssessment onNavigate={navigate} />
        ) : isServicePage ? (
          <ServicePlanPage serviceKey={currentPage as ServiceKey} onNavigate={navigate} />
        ) : currentPage === 'about' ? (
          <AboutUs onNavigate={navigate} />
        ) : currentPage === 'clients' ? (
          <Clients onNavigate={navigate} />
        ) : currentPage === 'blog' ? (
          <Blog />
        ) : currentPage === 'contact' ? (
          <ContactUs />
        ) : currentPage === 'faqs' ? (
          <FAQs onNavigate={navigate} />
        ) : isLandingPage(currentPage) ? (
          <FeatureLandingPage page={currentPage} onNavigate={navigate} />
        ) : (
          <NotFoundPage onNavigate={navigate} />
        )}
      </main>
      <Footer onNavigate={navigate} />
      <CookieNotice />
    </div>
  );
}
