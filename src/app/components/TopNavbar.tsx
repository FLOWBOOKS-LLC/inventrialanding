import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logo from '@/assets/flowbooks-blue.png';

interface TopNavbarProps {
  onNavigate?: (page: string) => void;
}

export function TopNavbar({ onNavigate }: TopNavbarProps) {
  const socialIconColor = '#0b3574';

  const socials = [
    { name: 'twitter', href: 'https://twitter.com/flowbooksng', Icon: FaXTwitter },
    { name: 'linkedin', href: 'https://linkedin.com/company/flowbooksng', Icon: FaLinkedin },
    { name: 'facebook', href: 'https://facebook.com/flowbooksng', Icon: FaFacebook },
    { name: 'instagram', href: 'https://instagram.com/flowbooksng', Icon: FaInstagram },
  ];

  const goToPlans = () => {
    if (onNavigate) {
      onNavigate('register-partner');
    } else {
      window.open('https://dashboard.inventria.app/signup', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 py-1">
      <style>{`
        .topnav-icon { display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:6px; transition: transform .16s ease, background-color .16s ease, box-shadow .16s ease; opacity:0; transform: translateY(4px); }
        .topnav-icon:hover { transform: translateY(-2px) scale(1.03); background-color: rgba(11,53,116,0.04); box-shadow: 0 4px 10px rgba(11,53,116,0.06); }
        .topnav-icon:focus { outline: 2px solid rgba(11,53,116,0.12); outline-offset: 2px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(4px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="px-4 md:px-8 flex items-center justify-between gap-4">
        <a href="/" aria-label="Flowbooks home" className="flex items-center">
          <img src={logo} alt="Flowbooks" className="h-8 w-auto" />
        </a>

        {/* Moving promotional ticker */}
        <div className="hidden md:block flex-1 max-w-3xl">
          <button
            type="button"
            onClick={goToPlans}
            className="group w-full relative overflow-hidden py-1 px-2 text-left transition-all duration-150 cursor-pointer focus:outline-none active:opacity-70 hover:opacity-90"
            aria-label="View our pricing plans"
          >
            <div
              className="promo-text whitespace-nowrap flex gap-8 text-[11px] md:text-xs font-normal text-[#0b3574]/70 tracking-tight transition-colors duration-150 group-hover:text-[#0b3574]"
                 style={{ animation: 'marquee 14s linear infinite' }}>
              <span>Enjoy 25% off our product · Explore our plans · Start your free trial today</span>
              <span>Enjoy 25% off our product · Explore our plans · Start your free trial today</span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {socials.map((s, i) => {
              const Icon = s.Icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="topnav-icon"
                  style={{ color: socialIconColor, animation: `fadeUp .36s ease forwards`, animationDelay: `${i * 80}ms` }}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
