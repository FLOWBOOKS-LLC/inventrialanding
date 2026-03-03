import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Tag } from 'lucide-react';
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
    <div className="bg-[#f5f7fd] border-b border-[#d7e1f5] py-2 md:py-1">
      <style>{`
        .topnav-icon { display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; border-radius:6px; transition: transform .16s ease, background-color .16s ease, box-shadow .16s ease; }
        .topnav-icon:hover { transform: translateY(-2px) scale(1.03); background-color: rgba(11,53,116,0.04); box-shadow: 0 4px 10px rgba(11,53,116,0.06); }
        .topnav-icon:focus { outline: 2px solid rgba(11,53,116,0.12); outline-offset: 2px; }
      `}</style>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 lg:px-6">
        <a href="/" aria-label="Flowbooks home" className="hidden md:flex items-center flex-shrink-0">
          <img src={logo} alt="Flowbooks" className="h-7 md:h-8 w-auto" />
        </a>

        {/* Promotional banner - compact on mobile */}
        <div className="flex flex-1 items-center justify-center gap-2 min-w-0 py-1">
          <Tag className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 text-[#0b3574]" strokeWidth={2} />
          <span className="inline-flex items-center rounded-full bg-[#0b3574] px-1.5 py-0.5 text-[10px] font-semibold text-white uppercase">
            Sale
          </span>
          <span className="hidden sm:inline text-[11px] md:text-sm text-[#0b3574] truncate">
            Buy now and <strong className="font-bold">save 90% off today</strong>
          </span>
          <button
            type="button"
            onClick={goToPlans}
            className="text-[10px] sm:text-[11px] md:text-sm font-medium text-[#0b3574] underline underline-offset-2 hover:text-[#0a2942] transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            See plans & pricing
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
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
                style={{ color: socialIconColor }}
              >
                <Icon size={14} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
