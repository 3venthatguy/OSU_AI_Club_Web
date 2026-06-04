import React, { useState } from 'react';
import { Mail, MessageSquare, ExternalLink, Instagram, Linkedin, Send } from 'lucide-react';
// @ts-ignore
import aiLogo from '../../assets/.aistudio/images/AI_Logo_Final.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      id="footer-contact"
      className="bg-bg-primary pt-24 pb-12 relative overflow-hidden border-t border-border-subtle"
    >
      {/* Decorative gradient shadows */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[300px] bg-[radial-gradient(circle_at_80%_80%,rgba(59,91,255,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16">
        
        {/* Col 1 (5/12): Brand logo, bio, newsletter */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <div className="flex items-center mb-6">
            <div className="w-9 h-9 flex items-center justify-center bg-[#0E1B2E] rounded-xl shadow-md">
              <img
                src={aiLogo}
                alt="Discord Server"
                className="w-5.5 h-5.5 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <p className="font-sans text-[14px] text-text-secondary leading-relaxed mb-8 max-w-sm">
            The official student-led engineering & research incubator for Artificial Intelligence and Machine Learning at The Ohio State University, Dreese Laboratories.
          </p>

          {/* Inline Newsletter Entry */}
          <div className="w-full max-w-sm">
            <span className="font-sans text-[11px] font-bold text-text-primary uppercase tracking-widest block mb-3">
              Stay in the Loop
            </span>
            {subscribed ? (
              <div id="footer-subscribed-toast" className="p-3 bg-accent-secondary/10 border border-accent-secondary/20 rounded-xl text-accent-secondary text-xs font-semibold flex items-center space-x-2 animate-fade-in">
                <span>✓ Thank you! You've been subscribed to weekly digests.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex items-center w-full">
                <input
                  type="email"
                  required
                  placeholder="osuaiclub@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 bg-bg-elevated border border-border-medium rounded-full pl-5 pr-12 text-sm text-text-primary font-sans focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
                />
                <button
                  type="submit"
                  id="footer-email-submit"
                  className="absolute right-1 w-9 h-9 rounded-full bg-accent-primary hover:bg-accent-primary-hover flex items-center justify-center text-white cursor-pointer transition-all hover:scale-[1.04]"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Col 2 (3/12): Quick Links */}
        <div className="lg:col-span-3 flex flex-col items-start">
          <span className="font-sans text-[11px] font-bold text-text-primary uppercase tracking-widest block mb-6">
            Quick Navigation
          </span>
          <div className="flex flex-col space-y-3.5 text-sm font-medium">
            {[
              { label: 'Campus Homepage', id: 'home' },
              { label: 'Our Story & Officers', id: 'about' },
              { label: 'HackAI 2026', id: 'hackai' },
              { label: 'Events Calendar', id: 'events' },
            ].map((link) => (
              <button
                key={link.id}
                id={`footer-nav-link-${link.id}`}
                onClick={() => {
                  onNavigate(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-text-secondary hover:text-accent-primary text-left transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Col 3 (4/12): Contacts / External */}
        <div id="footer-external-presence" className="lg:col-span-4 flex flex-col items-start">
          <span className="font-sans text-[11px] font-bold text-text-primary uppercase tracking-widest block mb-6">
            Resources & Contact
          </span>
          <div className="space-y-4 w-full text-sm">
            
            {/* Discord */}
            <a
              id="footer-discord-link"
              href="https://discord.com/invite/GPCmTECWRu"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-3 text-text-secondary hover:text-accent-primary transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-bg-secondary group-hover:bg-accent-primary-dim flex items-center justify-center transition-colors">
                <MessageSquare className="w-4 h-4 text-accent-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-text-primary group-hover:text-accent-primary">Discord Server</span>
                <span className="text-xs text-text-muted">Join 500+ active campus members</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              id="footer-instagram-link"
              href="http://www.instagram.com/ohiostateaiclub"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-3 text-text-secondary hover:text-accent-primary transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-bg-secondary group-hover:bg-accent-primary-dim flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 text-accent-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-text-primary group-hover:text-accent-primary">Instagram</span>
                <span className="text-xs text-text-muted">Follow our visual updates</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              id="footer-linkedin-link"
              href="https://www.linkedin.com/company/artificial-intelligence-club/about/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-3 text-text-secondary hover:text-accent-primary transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-bg-secondary group-hover:bg-accent-primary-dim flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-accent-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-text-primary group-hover:text-accent-primary">LinkedIn Professional</span>
                <span className="text-xs text-text-muted">Connect with our alumni network</span>
              </div>
            </a>

            {/* Email */}
            <div className="flex items-center space-x-3 text-text-secondary">
              <div className="w-9 h-9 rounded-xl bg-bg-secondary flex items-center justify-center">
                <Mail className="w-4 h-4 text-text-muted" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-text-primary">Contact Officers</span>
                <span className="text-xs text-text-muted">osuaiclub@gmail.com</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Footer Bottom copyright row */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between text-xs text-text-muted">
        <div>
          © {new Date().getFullYear()} Artificial Intelligence Club at The Ohio State University. All rights reserved.
        </div>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-accent-primary transition-colors">Constitution</a>
          <a href="#" className="hover:text-accent-primary transition-colors">Dreese Lab Access</a>
          <div className="flex items-center text-[10px] uppercase font-mono font-bold text-accent-secondary">
            <span className="w-2 h-2 rounded-full bg-accent-secondary inline-block mr-1.5 animate-pulse" />
            Campus Active
          </div>
        </div>
      </div>
    </footer>
  );
};
