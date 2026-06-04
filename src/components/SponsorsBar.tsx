import React from 'react';
// @ts-ignore
import lab99Logo from '../../assets/.aistudio/sponsors/99PLabs_Logo_Final.png';
// @ts-ignore
import ciscoLogo from '../../assets/.aistudio/sponsors/Cisco_logo_blue_2016.svg.png';
// @ts-ignore
import janeStreetLogo from '../../assets/.aistudio/sponsors/Jane_Street_Logo.png';

export const SponsorsBar: React.FC = () => {
  const sponsors = [
    { name: '99P Labs', img: lab99Logo },
    { name: 'Cisco', img: ciscoLogo },
    { name: 'Jane Street', img: janeStreetLogo },
  ];

  // Repeat the sponsor list to ensure a dense, smooth infinite marquee animation
  const scrollingSponsors = [
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
    ...sponsors,
  ];

  return (
    <div
      id="sponsors-scrolling-band"
      className="h-[120px] bg-bg-secondary border-y border-border-subtle relative flex items-center overflow-hidden z-10"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
        
        {/* Left fixed label */}
        <div className="flex items-center space-x-6 h-full flex-shrink-0 z-20 bg-bg-secondary pr-6 md:pr-10 border-r border-border-subtle">
          <span className="font-sans text-[11px] md:text-[12px] font-bold text-text-muted uppercase tracking-[0.2em] whitespace-nowrap">
            Presenting Partners
          </span>
        </div>

        {/* Right scrolling ticker wrapper */}
        <div
          id="sponsors-ticker-viewport"
          className="flex-1 overflow-hidden relative"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          <div
            id="sponsors-infinite-row"
            className="flex items-center space-x-8 animate-marquee cursor-pointer py-1"
          >
            {scrollingSponsors.map((sponsor, idx) => (
              <div
                key={idx}
                id={`sponsor-logo-box-${idx}`}
                className="w-48 h-[60px] px-5 bg-white border border-[#E5E7EB] dark:border-border-subtle rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(14,27,46,0.02)] hover:border-accent-primary/30 hover:scale-[1.04] hover:shadow-[0_4px_12px_rgba(14,27,46,0.04)] transition-all duration-300"
              >
                <img
                  src={sponsor.img}
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-[38px] object-contain filter brightness-95 hover:brightness-100 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
