import React, { useEffect, useRef, useState } from 'react';

export const MissionStatement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mission-statement-section"
      ref={containerRef}
      className="py-24 bg-bg-secondary relative border-b border-border-subtle"
    >
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Eyebrow with decorative lines on both sides */}
        <div id="mission-eyebrow-container" className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-[1px] bg-accent-secondary opacity-60" />
          <span className="font-sans text-[12px] font-bold text-accent-secondary uppercase tracking-[0.15em]">
            Our Mission
          </span>
          <div className="w-12 h-[1px] bg-accent-secondary opacity-60" />
        </div>

        {/* Big displaying headline */}
        <h2
          id="mission-main-text"
          className="font-display text-[28px] md:text-[42px] font-extrabold text-[#0E1B2E] dark:text-text-primary leading-[1.2] tracking-tight max-w-3xl mb-4 transition-all duration-700"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            opacity: isVisible ? 1 : 0
          }}
        >
          To foster curiosity, accelerate learning, and empower every student to build{' '}
          <span className="text-accent-primary font-extrabold underline decoration-accent-primary/20 decoration-2 underline-offset-4">
            AI systems
          </span>{' '}
          that solve real problems — through community, competition, and hands-on creation.
        </h2>

      </div>
    </section>
  );
};
