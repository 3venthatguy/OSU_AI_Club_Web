import React, { useState } from 'react';
import { Calendar, MapPin, Trophy, ShieldCheck, Mail, Send, Sparkles, BrainCircuit, Users, Terminal, Code2, Play } from 'lucide-react';
import { TextScramble } from '../components/TextScramble';

export const HackAI: React.FC = () => {
  // Registration form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [major, setMajor] = useState('');
  const [experience, setExperience] = useState('Beginner');
  const [registered, setRegistered] = useState(false);

  const prizes = [
    { rank: '1st Place Overall', cash: '$5,000', label: 'Grand Prize Sweepstakes', cardBg: 'bg-[linear-gradient(135deg,#0E1B2E_0%,#080E1A_100%)] border-accent-secondary/35' },
    { rank: '2nd Place Overall', cash: '$3,000', label: 'Silver Medalist', cardBg: 'bg-bg-secondary border-border-subtle' },
    { rank: '3rd Place Overall', cash: '$1,500', label: 'Bronze Medalist', cardBg: 'bg-bg-secondary border-border-subtle' },
    { rank: 'Best Novel UI Agent', cash: '$1,000', label: 'Generative Human Interface', cardBg: 'bg-bg-secondary border-border-subtle' },
    { rank: 'Best Applied CV Pipeline', cash: '$1,000', label: 'Sensor Vision Tracking', cardBg: 'bg-bg-secondary border-border-subtle' },
    { rank: 'Best Undergrad Track', cash: '$500', label: 'Emerging Freshmen Team', cardBg: 'bg-bg-secondary border-border-subtle' },
  ];

  const schedule = [
    { time: 'Friday 5:00 PM', title: 'Check-In & Registration opens', desc: 'Arrive at the Ohio Union Ballard, pick up event credentials and swag kits.' },
    { time: 'Friday 6:00 PM', title: 'Opening ceremony & keynote address', desc: 'Hear from our corporate research sponsors and reveal the prompt dataset.' },
    { time: 'Friday 7:30 PM', title: 'Hacking begins & team placement', desc: 'Form team groups of up to 4 or work solo. Dinner is served!' },
    { time: 'Saturday 10:00 AM', title: 'Workshop session: Deploying LLMs', desc: 'A quick tutorial session for cloud containers led by Google engineers.' },
    { time: 'Saturday 4:00 PM', title: 'Midpoint code design progress review', desc: 'Optional project feedback checkins from clinical mentors and PhD volunteers.' },
    { time: 'Sunday 9:00 AM', title: 'Hacking deadline & submissions lock', desc: 'All notebooks and project code repositories must be committed onto GitHub.' },
    { time: 'Sunday 11:00 AM', title: 'Science-Fair demonstration rounds', desc: 'Interactive live demos with judges in Dreese Laboratories.' },
    { time: 'Sunday 3:30 PM', title: 'Awards ceremony', desc: 'Keynote conclusions, grand cash winners announced and photo rounds.' }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && major) {
      setRegistered(true);
    }
  };

  return (
    <div id="hackai-page-root" className="pt-[72px] bg-bg-primary min-h-screen">
      
      {/* 1. HACKAI HERO WITH DETAILS */}
      <section
        id="hackai-hero"
        className="py-16 md:py-24 border-b border-border-subtle relative overflow-hidden bg-[linear-gradient(135deg,#EEF2F9_0%,#E4ECF6_60%,#D6E4F7_100%)] flex flex-col items-center justify-center text-center"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_30%,rgba(59,91,255,0.08)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-secondary/15 text-accent-secondary border border-accent-secondary/20 mb-5 select-none shadow-sm">
            ✦ FEB 20–22, 2026 — DREESE AUDITORIUM
          </span>

          <h1 className="font-display text-[44px] md:text-[76px] font-extrabold text-text-primary leading-none tracking-tighter mb-6">
            <TextScramble id="hackai-title-scramble" text="HACKAI 2026" />
          </h1>
          
          <p className="font-sans text-[16px] md:text-[18px] text-text-secondary leading-relaxed max-w-2xl mb-10">
            Ohio State's flagship annual machine learning competition. Grab your teammates, open your compilers, and build groundbreaking AI agents to solve concrete problems within 36 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-mono text-text-primary mb-12">
            <div className="flex items-center space-x-2 bg-white/60 border border-border-subtle px-4 py-2.5 rounded-full shadow-sm">
              <Calendar className="w-4 h-4 text-accent-primary" />
              <span>Feb 20–22, 2026</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 border border-border-subtle px-4 py-2.5 rounded-full shadow-sm">
              <MapPin className="w-4 h-4 text-accent-primary" />
              <span>Ohio Union Ballrooms</span>
            </div>
          </div>

          <button
            id="scrolldown-register-btn"
            onClick={() => {
              document.getElementById('hack-registration-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-accent-primary hover:bg-accent-primary-hover text-white font-sans text-sm font-bold rounded-full shadow-[0_4px_16px_rgba(59,91,255,0.25)] hover:shadow-[0_6px_24px_rgba(59,91,255,0.35)] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2"
          >
            <span>Proceed to Registration Form</span>
            <span>↓</span>
          </button>
        </div>
      </section>

      {/* 2. CASH PRIZES SECTIONS */}
      <section id="hackai-prizes-section" className="py-24 max-w-7xl mx-auto px-6 md:px-16">
        <div className="mb-14 text-center select-none">
          <span className="font-sans text-[12px] font-bold text-accent-secondary uppercase tracking-[0.2em] block mb-3 animate-pulse">
            Prize Pool Stakes
          </span>
          <h2 className="font-display text-[32px] md:text-[46px] font-extrabold text-text-primary tracking-tight">
            $12,000+ Team Cash Prizes
          </h2>
          <p className="font-sans text-sm text-text-secondary mt-3">
            Grand cash prizes and specialized category badges sponsored by our corporate computing sponsors.
          </p>
        </div>

        {/* Prizes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prizes.map((item, idx) => {
            const isGrand = idx === 0;
            return (
              <div
                key={idx}
                id={`prize-item-${idx}`}
                className={`p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${item.cardBg}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isGrand ? 'text-accent-secondary' : 'text-text-muted'}`}>
                      {item.rank}
                    </span>
                    <Trophy className={`w-5 h-5 ${isGrand ? 'text-accent-secondary' : 'text-accent-primary/60'}`} />
                  </div>
                  
                  <div className={`font-mono text-[38px] md:text-[48px] font-extrabold tracking-tight leading-none mt-4 ${isGrand ? 'text-white' : 'text-accent-primary'}`}>
                    {item.cash}
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle/40 mt-8">
                  <span className={`text-xs font-sans ${isGrand ? 'text-[#8A9AB4]' : 'text-text-secondary'}`}>
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. WEEKEND SCHEDULE TIMELINE */}
      <section id="hackai-timeline-section" className="py-24 bg-bg-secondary/40 border-y border-border-subtle">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-14 text-center select-none">
            <span className="font-sans text-[12px] font-bold text-accent-secondary uppercase tracking-[0.2em] block mb-3">
              Event Agenda
            </span>
            <h2 className="font-display text-[32px] md:text-[42px] font-extrabold text-text-primary tracking-tight">
              36-Hour Hack Schedule
            </h2>
          </div>

          {/* Timeline Node Chain */}
          <div className="relative border-l border-border-medium/60 ml-3 md:ml-6 space-y-12">
            {schedule.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10">
                
                {/* Timeline node marker circle */}
                <span className="absolute -left-2 top-1.5 w-4.5 h-4.5 rounded-full border-2 border-accent-primary bg-bg-primary flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                </span>

                <div className="text-left">
                  <span className="font-mono text-[11px] font-extrabold text-[#3B5BFF] bg-accent-primary-dim px-2.5 py-1 rounded-md">
                    {item.time}
                  </span>
                  <h4 className="font-sans text-[16px] md:text-[18px] font-extrabold text-text-primary leading-tight mt-3">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-text-secondary leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC INTERACTIVE REGISTRATION FORM */}
      <section id="hack-registration-form" className="py-24 max-w-7xl mx-auto px-6 md:px-16 flex justify-center">
        <div className="w-full max-w-2xl bg-bg-elevated border border-border-subtle rounded-3xl p-8 md:p-12 shadow-card">
          
          <div id="registration-headers" className="mb-8 text-center">
            <span className="font-sans text-[11px] font-bold text-accent-secondary uppercase tracking-widest block mb-2">
              Apply Now
            </span>
            <h2 className="font-display text-[28px] md:text-[38px] font-black text-text-primary">
              Competitor Intake Registration
            </h2>
            <p className="font-sans text-xs text-text-secondary mt-1">
              Join individually or as a team. Full participation is 100% free with meals covered.
            </p>
          </div>

          {registered ? (
            <div id="intake-confirmation-box" className="py-12 p-8 text-center bg-accent-secondary/5 border border-accent-secondary/20 rounded-2xl flex flex-col items-center animate-fade-in select-none">
              <div className="w-16 h-16 rounded-full bg-accent-secondary/15 flex items-center justify-center text-accent-secondary mb-4 shadow-sm animate-pulse">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-display text-[22px] font-bold text-text-primary">Intake Application Confirmed!</h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-sm mt-3">
                Thank you for applying to HackAI, <span className="font-bold text-accent-primary">{name}</span>. A registration voucher has been dispatched to <span className="underline font-sans">{email}</span>. Bring this email printout to the Ohio Union Ballard check-in!
              </p>
              
              <button
                id="reset-registration-form"
                onClick={() => {
                  setRegistered(false);
                  setName('');
                  setEmail('');
                  setGithub('');
                  setMajor('');
                }}
                className="mt-8 font-sans text-xs font-semibold text-text-muted hover:text-accent-primary hover:underline cursor-pointer"
              >
                Register another team competitor
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="font-sans text-[11px] font-bold uppercase text-text-primary tracking-wide mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brutus Buckeye"
                    className="h-12 bg-bg-secondary border border-border-medium rounded-xl pl-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="font-sans text-[11px] font-bold uppercase text-text-primary tracking-wide mb-2">
                    BuckeyeMail Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="buckeye.1@buckeyemail.osu.edu"
                    className="h-12 bg-bg-secondary border border-border-medium rounded-xl pl-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Major */}
                <div className="flex flex-col">
                  <label className="font-sans text-[11px] font-bold uppercase text-text-primary tracking-wide mb-2">
                    Major / Department *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Data Analytics"
                    className="h-12 bg-bg-secondary border border-border-medium rounded-xl pl-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                </div>

                {/* GitHub */}
                <div className="flex flex-col">
                  <label className="font-sans text-[11px] font-bold uppercase text-text-primary tracking-wide mb-2">
                    GitHub Handle
                  </label>
                  <input
                    type="text"
                    placeholder="github.com/brutusbuckeye"
                    className="h-12 bg-bg-secondary border border-border-medium rounded-xl pl-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent-primary"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="flex flex-col">
                <label className="font-sans text-[11px] font-bold uppercase text-text-primary tracking-wide mb-2">
                  My Machine Learning Experience Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Beginner', 'Intermediate', 'Expert (Graduate/PhD)'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setExperience(lvl)}
                      className={`h-11 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        experience === lvl
                          ? 'bg-accent-primary text-white border-accent-primary'
                          : 'bg-bg-secondary text-text-secondary hover:text-accent-primary border-border-subtle'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legal disclaimer check */}
              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  required
                  id="disclaimer-check"
                  className="mt-1 accent-accent-primary cursor-pointer"
                />
                <label htmlFor="disclaimer-check" className="font-sans text-[11px] text-text-secondary leading-relaxed cursor-pointer select-none">
                  I agree to participate in HackAI 2026 responsibly, adhering fully to the Ohio State student Code of Conduct and guaranteeing that all project notebook repositories submitted are coded entirely inside the 36-hour window.
                </label>
              </div>

              {/* Submit btn */}
              <button
                type="submit"
                id="submit-competitor-form"
                className="w-full h-12 bg-accent-primary hover:bg-accent-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              >
                Submit Competitor Application Info
              </button>

            </form>
          )}

        </div>
      </section>

    </div>
  );
};
