import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
// @ts-ignore
import aiLogo from '../../assets/.aistudio/images/AI_Logo_Final.png';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (e?: Event) => {
      let scrollY = window.scrollY;
      if (e && (e as CustomEvent).detail && typeof (e as CustomEvent).detail.scrollY === 'number') {
        scrollY = (e as CustomEvent).detail.scrollY;
      }
      if (scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('smoothscroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('smoothscroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: 'About Us', id: 'about' },
    { label: 'HackAI', id: 'hackai' },
    { label: 'Projects', id: 'projects' }, // on home page, anchors to projects list
    { label: 'Events', id: 'events' },
    { label: 'Contact Us', id: 'contact' }, // scrolls down to footer
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'contact') {
      document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (id === activePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate(id);
    }
  };

  return (
    <>
      <nav
        id="main-navigation-header"
        className={`fixed top-0 left-0 right-0 w-full z-50 h-[72px] transition-all duration-350 flex items-center ${
          scrolled || activePage !== 'home'
            ? 'bg-[rgba(238,242,249,0.82)] backdrop-blur-xl border-b border-border-subtle shadow-[0_1px_12px_rgba(14,27,46,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
          
          {/* Left: Logo Mark */}
          <div
            id="nav-brand-logo"
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-9 h-9 flex items-center justify-center bg-[#0E1B2E] rounded-xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_4px_16px_rgba(14,27,46,0.25)]">
              <img
                src={aiLogo}
                alt="AI @ OSU Logo"
                className="w-5.5 h-5.5 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Center: Desktop Nav Links */}
          <div id="desktop-nav-links" className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-[15px] font-medium tracking-wide py-1 border-b-2 transition-colors duration-250 cursor-pointer ${
                    isActive
                      ? 'text-accent-primary border-accent-primary'
                      : 'text-text-nav border-transparent hover:text-accent-primary'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right: Join Pill CTA */}
          <div className="hidden md:block">
            <button
              id="nav-join-cta-button"
              onClick={() => onNavigate('events')}
              className="h-[38px] px-5 bg-accent-primary hover:bg-accent-primary-hover text-white font-sans text-[14px] font-semibold rounded-full flex items-center space-x-1.5 shadow-[0_4px_14px_rgba(59,91,255,0.25)] hover:shadow-[0_6px_20px_rgba(59,91,255,0.35)] transform hover:scale-[1.03] transition-all duration-200 cursor-pointer"
            >
              <span>Join the Club</span>
              <span className="text-[16px] leading-none mb-0.5">›</span>
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-primary p-1 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 top-[72px] bg-bg-primary/95 backdrop-blur-2xl z-40 flex flex-col px-6 py-8 md:hidden shadow-lg animate-fade-in border-t border-border-subtle"
        >
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className="text-[18px] font-display font-semibold text-text-primary text-left py-2 border-b border-border-subtle focus:text-accent-primary"
              >
                {item.label}
              </button>
            ))}

            <button
              id="mobile-nav-join-button"
              onClick={() => handleNavClick('events')}
              className="w-full h-12 bg-accent-primary text-white font-sans font-semibold rounded-full flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Join the Club</span>
              <span className="text-[18px]">›</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
