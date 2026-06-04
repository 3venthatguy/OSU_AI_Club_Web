import React, { useState } from 'react';
import { NeuralNetworkCanvas } from '../components/NeuralNetworkCanvas';
import { StatsBar } from '../components/StatsBar';
import { MissionStatement } from '../components/MissionStatement';
import { WhatWeDo } from '../components/WhatWeDo';
import { SponsorsBar } from '../components/SponsorsBar';
import { AboutSection } from '../components/AboutSection';
import { HackAITeaser } from '../components/HackAITeaser';
import { TextScramble } from '../components/TextScramble';
import { PROJECTS } from '../data';
import { FolderGit2, Sparkles, Code2, ArrowRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Extract all unique tags
  const allTags = ['All', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))].slice(0, 7);

  const filteredProjects = selectedTag === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(selectedTag));

  return (
    <div id="homepage-root">
      
      {/* 1. HERO SECTION (Full Viewport with Interactive 3D Backdrop) */}
      <section
        id="hero-section"
        className="h-screen w-full sticky top-0 z-0 flex items-center pt-[72px] overflow-hidden"
      >
        {/* Subtle, beautiful background glow centered behind the network canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none" />

        {/* Full-width 3D Backdrop - pointer events mapped explicitly */}
        <div className="absolute inset-0 w-full h-full z-0">
          <NeuralNetworkCanvas />
        </div>

        {/* Text Content Overlay Layer */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 z-10 relative pointer-events-none hidden lg:block">
          {/* Left Block — Text block with active pointer interaction for actions copy, clicks */}
          <div
            id="hero-left-col"
            className="flex flex-col items-start justify-center text-left py-12 lg:py-24 pr-0 lg:pr-8 max-w-2xl pointer-events-auto select-none"
          >
            {/* Campus Eyebrow */}
            <div className="flex items-center space-x-2.5 mb-5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
              <span className="font-sans text-[12px] font-bold text-accent-secondary uppercase tracking-[0.18em]">
                The Ohio State University
              </span>
            </div>

            {/* Title stacked */}
            <h1
              id="hero-heading"
              className="font-display text-[42px] md:text-[68px] lg:text-[72px] font-extrabold text-text-primary leading-[1.08] tracking-tight mb-6"
            >
              <TextScramble id="hero-title-scramble-1" text="Artificial Intelligence" className="block text-text-primary" />
              <TextScramble id="hero-title-scramble-2" text="Club at Ohio State" delay={500} className="block text-text-primary mt-1 md:mt-2" />
            </h1>

            {/* Subtext description */}
            <p className="font-sans text-[16px] md:text-[18px] text-text-secondary leading-relaxed max-w-md mb-8">
              Building the next generation of AI researchers, engineers, and innovators — one project at a time.
            </p>

            {/* Two Pill buttons matching specified references */}
            <div id="hero-ctas-row" className="flex flex-wrap items-center gap-4">
              <button
                id="hero-primary-cta"
                onClick={() => onNavigate('projects')}
                className="h-[52px] px-8 bg-accent-primary hover:bg-accent-primary-hover text-white font-sans text-[15px] font-semibold rounded-full flex items-center space-x-2 shadow-[0_4px_20px_rgba(59,91,255,0.22)] hover:shadow-[0_8px_32px_rgba(59,91,255,0.32)] transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Projects</span>
                <span className="text-[18px] leading-zero mb-0.5">›</span>
              </button>

              <button
                id="hero-secondary-cta"
                onClick={() => onNavigate('about')}
                className="h-[52px] px-8 bg-transparent hover:bg-accent-primary-dim border border-accent-primary text-accent-primary hover:border-accent-primary-hover font-sans text-[15px] font-semibold rounded-full flex items-center space-x-2 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>Learn More</span>
                <span className="text-[18px] leading-zero mb-0.5">›</span>
              </button>
            </div>

            {/* Hanging animated down chevron scroll indicator */}
            <div className="mt-14 lg:mt-20 flex flex-col items-start select-none">
              <svg
                className="w-5 h-5 text-text-muted animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2-8. OVERLAPPING CONTENT WRAPPER */}
      <div className="relative z-10 bg-bg-primary shadow-[0_-15px_30px_rgba(14,27,46,0.06)] border-t border-border-subtle">
        {/* Mobile/Tablet Hero Title Card - Displays at the top of the flowing content card wrapper, sliding gracefully up over the full 3D interactive backdrop */}
        <div className="block lg:hidden w-full max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24 border-b border-border-subtle bg-bg-primary">
          <div className="flex flex-col items-start justify-center text-left max-w-2xl select-none">
            {/* Campus Eyebrow */}
            <div className="flex items-center space-x-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
              <span className="font-sans text-[12px] font-bold text-accent-secondary uppercase tracking-[0.18em]">
                The Ohio State University
              </span>
            </div>

            {/* Title stacked */}
            <h1 className="font-display text-[38px] md:text-[56px] font-extrabold text-text-primary leading-[1.12] tracking-tight mb-5">
              <TextScramble id="hero-mobile-title-scramble-1" text="Artificial Intelligence" className="block text-text-primary" />
              <TextScramble id="hero-mobile-title-scramble-2" text="Club at Ohio State" delay={500} className="block text-text-primary mt-1" />
            </h1>

            {/* Subtext description */}
            <p className="font-sans text-[15px] md:text-[17px] text-text-secondary leading-relaxed max-w-md mb-8">
              Building the next generation of AI researchers, engineers, and innovators — one project at a time.
            </p>

             {/* Two Pill buttons matching specified references */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('projects')}
                className="h-[48px] px-6 bg-accent-primary hover:bg-accent-primary-hover text-white font-sans text-[14px] font-semibold rounded-full flex items-center space-x-2 shadow-[0_4px_20px_rgba(59,91,255,0.22)] transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer animate-none"
              >
                <span>Explore Projects</span>
                <span className="text-[16px] leading-zero mb-0.5">›</span>
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="h-[48px] px-6 bg-transparent hover:bg-accent-primary-dim border border-accent-primary text-accent-primary hover:border-accent-primary-hover font-sans text-[14px] font-semibold rounded-full flex items-center space-x-2 transform hover:-translate-y-0.5 transition-all duration-250 cursor-pointer"
              >
                <span>Learn More</span>
                <span className="text-[16px] leading-zero mb-0.5">›</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. STATS BAR */}
        <StatsBar />

      {/* 3. MISSION STATEMENT */}
      <MissionStatement />

      {/* 4. WHAT WE DO (PHILOSOPHY HORIZONTAL PRESENTATION TRACK) */}
      <WhatWeDo onNavigate={onNavigate} />

      {/* 5. SPONSORS BAR */}
      <SponsorsBar />

      {/* g. DETAILED HOME PROJECTS SHOWCASE */}
      <section
        id="projects-section"
        className="py-24 bg-bg-secondary relative border-b border-border-subtle"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          
          <div id="projects-header" className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-sans text-[12px] font-bold text-accent-secondary uppercase tracking-[0.2em] block mb-3">
                Incubator Pipeline
              </span>
              <h2 className="font-display text-[32px] md:text-[46px] font-extrabold text-text-primary tracking-tight">
                Featured Semester Projects
              </h2>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  id={`project-filter-tag-${tag}`}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full font-sans text-xs font-semibold cursor-pointer transition-all border ${
                    selectedTag === tag
                      ? 'bg-accent-primary text-white border-accent-primary shadow-md'
                      : 'bg-bg-elevated text-text-secondary hover:text-accent-primary border-border-subtle'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Card Grid */}
          <div id="projects-showcase-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                id={`project-item-card-${proj.id}`}
                className="group bg-bg-elevated rounded-3xl overflow-hidden border border-border-subtle hover:border-accent-primary/20 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-card flex flex-col md:flex-row h-auto md:h-[260px]"
              >
                {/* Visual Thumbnail */}
                <div className="w-full md:w-[40%] h-[180px] md:h-full relative overflow-hidden bg-bg-primary">
                  <img
                    referrerPolicy="no-referrer"
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 font-mono text-[11px] font-bold text-white px-2.5 py-1 rounded-full bg-accent-secondary flex items-center space-x-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping mr-0.5" />
                    <span>{proj.stats}</span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between items-start">
                  <div className="w-full">
                    <span className="font-sans text-[11px] font-bold text-accent-secondary uppercase tracking-[0.12em] block mb-2">
                      {proj.category}
                    </span>
                    <h3 className="font-display text-[18px] md:text-[20px] font-bold text-text-primary leading-tight mb-2 group-hover:text-accent-primary transition-colors">
                      {proj.title}
                    </h3>
                    <p className="font-sans text-[13px] text-text-secondary leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  {/* Badges footer */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proj.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 bg-bg-primary border border-border-subtle rounded-full font-mono text-[9px] font-semibold text-text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core Portal CTA Link to Dedicated Projects Page */}
          <div className="flex flex-col items-center justify-center mt-12 pt-4 border-t border-border-subtle/40">
            <span className="font-sans text-[12px] font-bold text-text-muted uppercase tracking-wider mb-3 select-none">
              Looking for architecture maps or student applications?
            </span>
            <button
              onClick={() => onNavigate('projects')}
              className="h-[48px] px-8 bg-accent-primary hover:bg-accent-primary-hover text-white font-sans text-xs font-bold rounded-full flex items-center space-x-2.5 shadow-[0_4px_14px_rgba(59,91,255,0.2)] hover:shadow-[0_6px_20px_rgba(59,91,255,0.3)] transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span>Explore All Incubator Pipelines</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 8. HACKAI TEASER PROMO BLOCK */}
      <HackAITeaser onNavigate={onNavigate} />
      </div>

    </div>
  );
};
