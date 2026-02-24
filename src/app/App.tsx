import { useState, useEffect } from 'react';
import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { Features } from '@/app/components/Features';
import { Testimonials } from '@/app/components/Testimonials';
import { CTA } from '@/app/components/CTA';
import { Footer } from '@/app/components/Footer';
import { AboutUs } from '@/app/components/AboutUs';
import { Clients } from '@/app/components/Clients';
import { Blog } from '@/app/components/Blog';
import { ContactUs } from '@/app/components/ContactUs';
import Register from '@/app/components/Register';
import RegisterChoice from '@/app/components/RegisterChoice';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { TopNavbar } from '@/app/components/TopNavbar';
// Removed Container import to avoid side paddings

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Check for admin URL hash on mount
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setCurrentPage('admin');
    }
  }, []);

  // Scroll to top whenever the page changes
  useEffect(() => {
    // Use setTimeout to ensure scroll happens after component render
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white">
      
      <TopNavbar />
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Features />
            <Testimonials />
            <CTA onNavigate={setCurrentPage} />
          </>
        ) : currentPage === 'about' ? (
          <AboutUs onNavigate={setCurrentPage} />
        ) : currentPage === 'clients' ? (
          <Clients onNavigate={setCurrentPage} />
        ) : currentPage === 'blog' ? (
          <Blog />
        ) : currentPage === 'contact' ? (
          <ContactUs />
        ) : currentPage === 'register' ? (
          <RegisterChoice onNavigate={setCurrentPage} />
        ) : currentPage === 'register-partner' ? (
          <Register onNavigate={setCurrentPage} />
        ) : currentPage === 'admin' ? (
          <AdminDashboard />
        ) : null}
      </main>
      {currentPage !== 'admin' && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
}
