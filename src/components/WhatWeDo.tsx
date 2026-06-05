import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Trophy, Compass, Users2, ArrowRight } from 'lucide-react';
import { ScrollDrawSVG } from './ScrollDrawSVG';

interface Panel {
  id: string;
  num: string;
  tag: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  bgClass: string;
}

interface WhatWeDoProps {
  onNavigate: (page: string) => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e?: Event) => {
      if (!sectionRef.current) return;
      
      // Exit early for mobile/tablet screens to prevent scroll-jacking style translations
      if (window.innerWidth < 1024) {
        const stickyElement = sectionRef.current.querySelector('.sticky-layout-box') as HTMLElement;
        if (stickyElement) {
          stickyElement.style.transform = '';
        }
        return;
      }

      // Calculate total page offset of the section within the scroll content container
      let sectionTopY = 0;
      let el: HTMLElement | null = sectionRef.current;
      while (el && el.id !== 'smooth-scroll-content' && el !== document.body) {
        sectionTopY += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
      }

      // Check if smoothscroll event provided scrollY, otherwise fall back to window.scrollY
      let sY = window.scrollY;
      if (e && (e as CustomEvent).detail && typeof (e as CustomEvent).detail.scrollY === 'number') {
        sY = (e as CustomEvent).detail.scrollY;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = sY - sectionTopY;
      const scrollHeight = rect.height - window.innerHeight;
      
      if (scrollHeight > 0) {
        const progress = Math.min(1, Math.max(0, scrollTop / scrollHeight));
        setScrollProgress(progress);
        
        // Compute manual translation to keep the box sticky in the transformed container
        const translation = Math.min(scrollHeight, Math.max(0, scrollTop));
        const stickyElement = sectionRef.current.querySelector('.sticky-layout-box') as HTMLElement;
        if (stickyElement) {
          stickyElement.style.transform = `translate3d(0px, ${translation}px, 0px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('smoothscroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('smoothscroll', handleScroll);
    };
  }, []);

  const panels: Panel[] = [
    {
      id: 'research',
      num: '01',
      tag: 'Philosophy',
      title: 'Research First, Always',
      body: 'We ground everything in academic literature. Before we build, we read. Weekly paper reading sessions, guest lectures from OSU faculty, and internal research showcases keep us sharp.',
      bgClass: 'bg-bg-primary',
      icon: (
        <div className="relative w-full max-w-[260px] h-[200px] flex items-center justify-center bg-bg-elevated/80 border border-border-subtle rounded-2xl shadow-card overflow-hidden">
          {/* Animated SVG open book with circuit traces */}
          <svg className="w-24 h-24 text-accent-primary" viewBox="0 0 100 100" fill="none">
            <path d="M15,80 C30,75 50,78 50,25 C50,78 70,75 85,80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M15,25 C30,20 50,25 50,15 C50,25 70,20 85,25" stroke="currentColor" strokeWidth="2.5" />
            <line x1="50" y1="15" x2="50" y2="80" stroke="currentColor" strokeWidth="2.5" />
            {/* Circuit traces */}
            <circle cx="28" cy="40" r="3" fill="#00A878" />
            <line x1="28" y1="40" x2="40" y2="40" stroke="#00A878" strokeWidth="1.5" />
            <circle cx="72" cy="55" r="3" fill="#3B5BFF" />
            <line x1="72" y1="55" x2="60" y2="55" stroke="#3B5BFF" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        </div>
      )
    },
    {
      id: 'workshops',
      num: '02',
      tag: 'Practice',
      title: 'Build Things That Matter',
      body: 'From computer vision pipelines to NLP tools and RL agents — our members ship real projects. Every semester, teams form around ideas and push code to production.',
      bgClass: 'bg-bg-secondary',
      icon: (
        <div className="grid grid-cols-2 gap-3 w-full max-w-[260px]">
          {/* Mock project mini grid */}
          {[
            { title: 'RL Agent', border: 'border-accent-primary' },
            { title: 'Chatbot', border: 'border-accent-secondary' },
            { title: 'YOLO CV', border: 'border-accent-primary' },
            { title: 'Generative', border: 'border-accent-secondary' }
          ].map((item, i) => (
            <div key={i} className={`p-3 bg-bg-elevated rounded-xl border ${item.border} shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[85px]`}>
              <div className="w-5 h-2 bg-text-muted/20 rounded-full" />
              <span className="font-mono text-[10px] font-bold text-text-primary uppercase tracking-tight">{item.title}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'competition',
      num: '03',
      tag: 'Compete',
      title: 'Design. Build. Compete.',
      body: 'We field teams at national AI competitions, Kaggle challenges, and host our own HackAI event each year — one of OSU\'s largest student-run hackathons with $12K+ in prizes.',
      bgClass: 'bg-bg-primary',
      icon: (
        <div className="flex flex-col items-center justify-center p-4 w-full max-w-[260px] bg-bg-elevated/90 border border-border-subtle rounded-2xl shadow-card h-[200px]">
          <Trophy className="w-12 h-12 text-accent-secondary mb-3 animate-bounce" />
          <div className="w-full space-y-2 mt-1">
            <div className="flex justify-between text-[11px] font-mono border-b border-border-subtle pb-1">
              <span className="text-text-secondary">#1 OSU HackAI</span>
              <span className="text-accent-secondary font-bold">2025</span>
            </div>
            <div className="flex justify-between text-[11px] font-mono border-b border-border-subtle pb-1">
              <span className="text-text-secondary">Top 5% Kaggle RL</span>
              <span className="text-accent-primary font-bold">Global</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'networking',
      num: '04',
      tag: 'Networking',
      title: 'Your Network is your Net Worth',
      body: 'Weekly meetings, industry speaker nights, alumni mentorship, and a 500+ member Discord server. We connect students to internships, research labs, and each other.',
      bgClass: 'bg-bg-secondary',
      icon: (
        <div className="relative w-full max-w-[260px] h-[200px] flex items-center justify-center bg-bg-elevated/80 border border-border-subtle rounded-2xl shadow-card p-4">
          {/* Radial connected network SVG */}
          <svg className="w-32 h-32 text-text-muted opacity-80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="6" fill="#3B5BFF" />
            <circle cx="20" cy="50" r="4" fill="#00A878" />
            <circle cx="80" cy="50" r="4" fill="#00A878" />
            <circle cx="50" cy="20" r="4" fill="#5C7CFA" />
            <circle cx="50" cy="80" r="4" fill="#5C7CFA" />
            <circle cx="30" cy="30" r="3.5" fill="#3B5BFF" />
            <circle cx="70" cy="70" r="3.5" fill="#3B5BFF" />
            {/* Connection lines */}
            <line x1="50" y1="50" x2="20" y2="50" stroke="#3B5BFF" strokeWidth="1" />
            <line x1="50" y1="50" x2="80" y2="50" stroke="#3B5BFF" strokeWidth="1" />
            <line x1="50" y1="50" x2="50" y2="20" stroke="#3B5BFF" strokeWidth="1" />
            <line x1="50" y1="50" x2="50" y2="80" stroke="#3B5BFF" strokeWidth="1" />
            <line x1="50" y1="50" x2="30" y2="30" stroke="#3B5BFF" strokeWidth="1" />
            <line x1="50" y1="50" x2="70" y2="70" stroke="#3B5BFF" strokeWidth="1" />
          </svg>
        </div>
      )
    },
    {
      id: 'cta',
      num: '05',
      tag: 'Action',
      title: 'Ready to Build?',
      body: 'Whether you want to write academic models, learn standard Python compilers, or win regional cash hackathons — there is a spot for you here at Ohio State.',
      bgClass: 'bg-gradient-to-br from-[#04080F] via-[#08152A] to-[#0A1F14]',
      icon: (
        <div className="flex flex-col space-y-3 w-full max-w-[240px]">
          <button
            id="panels-join-cta"
            onClick={() => {
              onNavigate('hackai');
            }}
            className="w-full py-3 px-5 bg-accent-primary hover:bg-accent-primary-hover text-white text-[14px] font-semibold rounded-full shadow-lg transition-all text-center cursor-pointer"
          >
            Join the Club
          </button>
          <button
            id="panels-projects-cta"
            onClick={() => {
              const el = document.getElementById('projects-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-3 px-5 bg-transparent hover:bg-white/10 text-accent-secondary border border-accent-secondary text-[14px] font-semibold rounded-full transition-all text-center cursor-pointer"
          >
            See Our Projects
          </button>
        </div>
      )
    }
  ];

  const activeIndex = Math.min(panels.length - 1, Math.floor(scrollProgress * panels.length));

  const handleDotClick = (idx: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const parentTop = window.scrollY + rect.top;
    const parentHeight = rect.height;
    
    // Position target to middle coordinates of the specified step to prevent edge flickering
    const targetFraction = (idx + 0.5) / panels.length;
    const scrollHeight = parentHeight - window.innerHeight;
    const targetScrollY = parentTop + targetFraction * scrollHeight;
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % panels.length;
    handleDotClick(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + panels.length) % panels.length;
    handleDotClick(prevIdx);
  };

  return (
    <section
      ref={sectionRef}
      id="philosophy-horizontal-interactive-section"
      className="relative w-full h-auto lg:h-[450vh] bg-bg-primary overflow-visible"
    >
      {/* 1. DESKTOP INTERACTIVE STICKY LAYOUT (Hidden below lg) */}
      <div className="sticky-layout-box hidden lg:flex sticky top-0 left-0 w-full h-screen overflow-hidden flex-col justify-center bg-bg-primary border-b border-border-subtle z-10 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16 w-full relative z-20 flex flex-row items-center gap-16">
          
          {/* Left Column - Large Interactive Scroll Timeline side-by-side */}
          <div className="flex flex-col items-center justify-center w-[120px] h-[74vh] shrink-0 relative">
            <ScrollDrawSVG 
              progress={scrollProgress} 
              onNodeClick={handleDotClick} 
              className="relative w-[120px] h-[74vh] pointer-events-auto z-10 overflow-visible"
            />
          </div>

          {/* Right Column - What We Do Content */}
          <div className="flex-1 w-full min-w-0">
          
            {/* Section Header */}
            <div id="panels-header-bar" className="flex flex-row items-end justify-between mb-12">
              <div>
                <h2 className="font-display text-[48px] font-extrabold text-[#0E1B2E] dark:text-text-primary tracking-tight">
                  What We Do
                </h2>
              </div>

              {/* Interactive slide controllers */}
              <div className="flex items-center space-x-3">
                <button
                  id="philosophies-prev-arrow"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-border-medium hover:border-accent-primary hover:text-accent-primary flex items-center justify-center transition-all text-text-primary cursor-pointer bg-bg-primary/50 backdrop-blur-sm shadow-sm"
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <div className="font-mono text-xs text-text-muted tracking-widest px-2 select-none">
                  <span className="text-accent-primary font-bold">{(activeIndex + 1).toString().padStart(2, '0')}</span> / {panels.length.toString().padStart(2, '0')}
                </div>
                <button
                  id="philosophies-next-arrow"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-border-medium hover:border-accent-primary hover:text-accent-primary flex items-center justify-center transition-all text-text-primary cursor-pointer bg-bg-primary/50 backdrop-blur-sm shadow-sm"
                  aria-label="Next slide"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Carousel slide container */}
            <div
              ref={trackRef}
              className="relative min-h-[420px] rounded-2xl overflow-hidden transition-all duration-500 shadow-card"
            >
              {panels.map((panel, idx) => {
                const isActive = idx === activeIndex;
                const isDarkCTA = panel.id === 'cta';

                return (
                  <div
                    key={panel.id}
                    id={`philosophy-grid-panel-${panel.id}`}
                    className={`absolute inset-0 w-full h-full p-14 flex flex-row items-center justify-between transition-all duration-500 ${panel.bgClass} ${
                      isActive
                        ? 'opacity-100 translate-x-0 scale-100 z-10'
                        : 'opacity-0 translate-x-12 scale-95 pointer-events-none z-0'
                    }`}
                  >
                    {/* Large Background watermarked index number */}
                    {!isDarkCTA && (
                      <div className="absolute top-2 right-4 font-mono text-[144px] font-extrabold text-[#3B5BFF]/[0.03] select-none pointer-events-none z-0 leading-none">
                        {panel.num}
                      </div>
                    )}

                    {/* Left informational block */}
                    <div className="flex-1 max-w-xl pr-8 z-10">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5 ${
                          isDarkCTA
                            ? 'bg-accent-secondary/20 text-accent-secondary'
                            : 'bg-accent-primary-dim text-accent-primary'
                        }`}
                      >
                        {panel.tag}
                      </span>
                      
                      <h3
                        className={`font-display text-[38px] font-extrabold leading-[1.15] tracking-tight mb-4 ${
                          isDarkCTA ? 'text-white' : 'text-text-primary'
                        }`}
                      >
                        {panel.title}
                      </h3>

                      <p
                        className={`font-sans text-[16px] leading-[1.7] mb-6 ${
                          isDarkCTA ? 'text-[#8A9AB4]' : 'text-text-secondary'
                        }`}
                      >
                        {panel.body}
                      </p>
                    </div>

                    {/* Right Interactive/Static Graphic Component */}
                    <div className="flex-shrink-0 w-auto flex justify-center z-10">
                      {panel.icon}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Panel dot navigation indicators */}
            <div id="panels-dots-navigation" className="flex justify-center items-center space-x-2.5 mt-8">
              {panels.map((_, idx) => (
                <button
                  key={idx}
                  id={`pill-dot-nav-bullet-${idx}`}
                  onClick={() => handleDotClick(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'bg-accent-primary w-6'
                      : 'bg-border-medium hover:bg-accent-primary/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* 2. MOBILE & TABLET LAYOUT (Visible only < lg; flow naturally without scroll-jacking, sticky height constraints, or absolute cutoffs) */}
      <div className="block lg:hidden w-full h-auto bg-bg-primary border-b border-border-subtle py-16 px-6 relative z-10">
        <div className="max-w-xl mx-auto">
          <div id="panels-mobile-header" className="mb-10 text-center">
            <span className="font-sans text-[11px] font-bold text-accent-secondary uppercase tracking-[0.16em] px-3 py-1 bg-accent-secondary/10 rounded-full">
              Core Identity
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0E1B2E] dark:text-text-primary mt-3.5 tracking-tight">
              What We Do
            </h2>
            <p className="font-sans text-[14px] text-text-secondary mt-3 max-w-sm mx-auto leading-relaxed">
              Cultivating key strengths in machine learning first-principles, active system deployments, and national collegiate challenges.
            </p>
          </div>

          <div id="panels-mobile-list" className="space-y-6">
            {panels.map((panel) => {
              const isDarkCTA = panel.id === 'cta';
              return (
                <div
                  key={panel.id}
                  id={`philosophy-mobile-card-${panel.id}`}
                  className={`rounded-2xl border border-border-subtle p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-sm ${
                    isDarkCTA 
                      ? 'bg-gradient-to-br from-[#04080F] via-[#08152A] to-[#011C10] border-accent-secondary/30 text-white' 
                      : 'bg-bg-elevated text-text-primary'
                  }`}
                >
                  {/* Watermarked index badge */}
                  {!isDarkCTA && (
                    <div className="absolute top-2 right-4 font-mono text-7xl font-extrabold text-[#3B5BFF]/[0.05] select-none pointer-events-none z-0">
                      {panel.num}
                    </div>
                  )}

                  <div className="z-10 flex-grow text-left">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${
                        isDarkCTA
                          ? 'bg-accent-secondary/20 text-accent-secondary'
                          : 'bg-accent-primary-dim text-accent-primary'
                      }`}
                    >
                      {panel.tag}
                    </span>
                    <h3 className={`font-display text-xl font-extrabold leading-tight mb-2.5 ${isDarkCTA ? 'text-white' : 'text-text-primary'}`}>
                      {panel.title}
                    </h3>
                    <p className={`font-sans text-[13.5px] leading-relaxed mb-6 ${isDarkCTA ? 'text-[#8A9AB4]' : 'text-text-secondary'}`}>
                      {panel.body}
                    </p>
                  </div>

                  {/* High fidelity dynamic graphic element */}
                  <div className="z-10 mt-2 flex justify-center w-full">
                    {panel.icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
