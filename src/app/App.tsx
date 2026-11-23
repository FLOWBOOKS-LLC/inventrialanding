import { useState, useEffect } from 'react';
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
import { serviceNavItems, type ServiceKey } from '@/app/constants/servicePlans';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const registerUrl = 'https://dashboard.inventria.app/signup';
  const isServicePage = serviceNavItems.includes(currentPage as ServiceKey);

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
    if (currentPage === 'register' || currentPage === 'register-partner') {
      if (currentPage === 'register') {
        window.open(registerUrl, '_blank', 'noopener,noreferrer');
      } else {
        setCurrentPage('accounting');
      }
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <header className="sticky top-0 z-50">
        <TopNavbar onNavigate={setCurrentPage} />
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      </header>
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Features onNavigate={setCurrentPage} />
            <TrustedPartnersStrip />
            <Testimonials onNavigate={setCurrentPage} />
            <CTA onNavigate={setCurrentPage} />
          </>
        ) : currentPage === 'services' ? (
          <Services onNavigate={setCurrentPage} />
        ) : currentPage === 'compliance-assessment' ? (
          <ComplianceAssessment onNavigate={setCurrentPage} />
        ) : isServicePage ? (
          <ServicePlanPage serviceKey={currentPage as ServiceKey} onNavigate={setCurrentPage} />
        ) : currentPage === 'about' ? (
          <AboutUs onNavigate={setCurrentPage} />
        ) : currentPage === 'clients' ? (
          <Clients onNavigate={setCurrentPage} />
        ) : currentPage === 'blog' ? (
          <Blog />
        ) : currentPage === 'contact' ? (
          <ContactUs />
        ) : currentPage === 'faqs' ? (
          <FAQs onNavigate={setCurrentPage} />
        ) : null}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <CookieNotice />
    </div>
  );
}
