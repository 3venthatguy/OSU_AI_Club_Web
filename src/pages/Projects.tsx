import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Code2, 
  Users, 
  Rocket, 
  ExternalLink, 
  ArrowRight, 
  Check, 
  Plus, 
  Briefcase, 
  ArrowUpRight, 
  HelpCircle,
  FileCode,
  Github,
  Globe,
  Database,
  Cpu
} from 'lucide-react';
import { PROJECTS } from '../data';
import { ProjectItem } from '../types';
import { TextScramble } from '../components/TextScramble';

export const Projects: React.FC = () => {
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  
  // Selected project for detailed modal
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Application/Pitch forms state
  const [activeTab, setActiveTab] = useState<'join' | 'pitch'>('join');
  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
    discord: '',
    major: '',
    year: '1st Year',
    projectId: '',
    experience: 'Beginner',
    statement: ''
  });
  const [pitchForm, setPitchForm] = useState({
    name: '',
    email: '',
    discord: '',
    title: '',
    category: 'Computer Vision',
    pitch: '',
    stack: '',
    teamSize: '3-4 members',
    description: ''
  });

  const [joinSuccess, setJoinSuccess] = useState(false);
  const [pitchSuccess, setPitchSuccess] = useState(false);

  // Extract unique categories and tags
  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  const allTags = ['All', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

  // Filtering logic
  const filteredProjects = PROJECTS.filter(proj => {
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesTag = selectedTag === 'All' || proj.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinForm.name || !joinForm.email || !joinForm.projectId) {
      alert('Please fill out the required fields.');
      return;
    }
    setJoinSuccess(true);
    setTimeout(() => {
      // Auto transition back after visual state feedback
    }, 5000);
  };

  const handlePitchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchForm.name || !pitchForm.email || !pitchForm.title || !pitchForm.pitch) {
      alert('Please fill out the required fields.');
      return;
    }
    setPitchSuccess(true);
  };

  const resetJoinForm = () => {
    setJoinForm({
      name: '',
      email: '',
      discord: '',
      major: '',
      year: '1st Year',
      projectId: '',
      experience: 'Beginner',
      statement: ''
    });
    setJoinSuccess(false);
  };

  const resetPitchForm = () => {
    setPitchForm({
      name: '',
      email: '',
      discord: '',
      title: '',
      category: 'Computer Vision',
      pitch: '',
      stack: '',
      teamSize: '3-4 members',
      description: ''
    });
    setPitchSuccess(false);
  };

  // Static mock roadmap milestones to enrich modal details
  const getProjectMilestones = (id: string) => {
    switch (id) {
      case 'buckeye-chatbot':
        return [
          { phase: 'Phase 1: PDF Scraper', status: 'Completed', details: 'Extracted and sanitized 2,500+ pages of OSU bulletins.' },
          { phase: 'Phase 2: Embedding Pipeline', status: 'Completed', details: 'Generated dense vector index using local BGE embeddings.' },
          { phase: 'Phase 3: RAG Fine-tuning', status: 'Active', details: 'Refining prompt templates with user feedback logs.' }
        ];
      case 'traffic-analysis':
        return [
          { phase: 'Phase 1: Video Collection', status: 'Completed', details: 'Captured & annotation of Lane Ave dashcam sequences.' },
          { phase: 'Phase 2: Model Deployment', status: 'Completed', details: 'Configured model parameters to operate live on NVIDIA Jetson.' },
          { phase: 'Phase 3: Interface Build', status: 'Active', details: 'Building dashboard map indicating average speed metrics.' }
        ];
      case 'rl-quadcopter':
        return [
          { phase: 'Phase 1: Env Gym Sim', status: 'Completed', details: 'Ported custom quadcopter parameters into Pybullet environments.' },
          { phase: 'Phase 2: PPO Algorithm Tuning', status: 'Completed', details: 'Optimized reward functions to prioritize horizontal stability.' },
          { phase: 'Phase 3: Real Hardware Build', status: 'Active', details: 'Translating trained weights into flight-controller firmwares.' }
        ];
      default:
        return [
          { phase: 'Phase 1: Data Gathering', status: 'Completed', details: 'Wrangled datasets and set validation limits.' },
          { phase: 'Phase 2: Neural Training', status: 'Completed', details: 'Optimized loss functions on high-performance rigs.' },
          { phase: 'Phase 3: Interactive Demo', status: 'Active', details: 'Configuring web integrations for community testing.' }
        ];
    }
  };

  return (
    <div id="projects-page-root" className="pt-[72px] bg-bg-primary min-h-screen select-none">
      
      {/* 1. HERO HEADER INTRO */}
      <section id="projects-hero-banner" className="py-20 md:py-24 bg-gradient-to-b from-[#EEF2F9] to-bg-primary border-b border-border-subtle relative overflow-hidden">
        {/* Decorative elements representing AI connections */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="max-w-3xl">
            <span className="font-sans text-[12px] font-bold text-accent-secondary uppercase tracking-[0.2em] block mb-3">
              Student-Led Innovation
            </span>
            <h1 className="font-display text-[38px] md:text-[54px] font-extrabold text-[#0E1B2E] dark:text-text-primary tracking-tight leading-[1.1]">
              <TextScramble id="projects-title-scramble" text="The Projects Incubator" />
            </h1>
            <p className="font-sans text-[16px] md:text-[18px] text-text-secondary leading-relaxed mt-4 max-w-2xl">
              Each semester, our members form multidisciplinary sprint teams to construct open-source AI software. From state-of-the-art computer vision tools to autonomous reinforcement learning models, we build real products.
            </p>
          </div>

          {/* Quick Stats Counter strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t border-border-subtle/70">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent-primary-dim text-accent-primary flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-mono text-2xl font-black text-[#0E1B2E] dark:text-text-primary">4 Active</span>
                <span className="text-[11px] uppercase font-bold text-text-muted tracking-wider block">Core Pipelines</span>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-accent-secondary/10 text-accent-secondary flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-mono text-2xl font-black text-[#0E1B2E] dark:text-text-primary">28 Total</span>
                <span className="text-[11px] uppercase font-bold text-text-muted tracking-wider block">Sprint Programmers</span>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-mono text-2xl font-black text-[#0E1B2E] dark:text-text-primary">100k+</span>
                <span className="text-[11px] uppercase font-bold text-text-muted tracking-wider block">Training Tokens</span>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-mono text-2xl font-black text-[#0E1B2E] dark:text-text-primary">100%</span>
                <span className="text-[11px] uppercase font-bold text-text-muted tracking-wider block">Open-Source Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC WORKSPACE EXPLORER */}
      <section id="projects-browser-hub" className="py-24 bg-bg-primary max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        
        {/* Left Column Filters (1 Col) */}
        <div id="filter-controls-sidebar" className="lg:col-span-1 border border-border-subtle rounded-2xl p-6 bg-bg-elevated/40 backdrop-blur-sm sticky top-24 self-start space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <h3 className="font-display font-black text-[15px] text-text-primary uppercase tracking-wide flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-accent-primary" />
              <span>Refine View</span>
            </h3>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag('All');
              }}
              className="text-[11px] font-bold text-accent-primary hover:underline cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Search bar */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted block mb-2">Keyword Search</label>
            <div className="relative">
              <input
                id="sidebar-projects-search"
                type="text"
                placeholder="Search ML tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 bg-bg-primary border border-border-medium rounded-xl text-[13px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
              />
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
            </div>
          </div>

          {/* Categories select list */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted block mb-2.5">Domain Category</label>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`cat-filter-btn-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-sans text-xs font-semibold cursor-pointer transition-all flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-accent-primary/10 text-accent-primary'
                      : 'text-text-secondary hover:bg-bg-primary'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Tags pills */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted block mb-2.5">Core Technology</label>
            <div className="flex flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  id={`tag-filter-btn-${tag}`}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-1.5 rounded-md font-mono text-[10px] font-bold cursor-pointer transition-all border ${
                    selectedTag === tag
                      ? 'bg-accent-primary text-white border-accent-primary'
                      : 'bg-bg-primary text-text-secondary border-border-subtle hover:border-text-muted'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-[11px] text-text-muted leading-relaxed">
            <span className="font-bold text-[#E28026] uppercase block mb-1">Weekly Standups</span>
            Our project teams assemble weekly in Dreese Lab 260. Attendees receive hardware credits and technical coaching.
          </div>
        </div>

        {/* Right Column Project Cards Grid (3 Cols) */}
        <div id="projects-presentation-grid" className="lg:col-span-3 space-y-8">
          
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-text-muted">
              Displaying <strong className="text-text-primary">{filteredProjects.length}</strong> of {PROJECTS.length} products
            </span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-20 border border-dashed border-border-medium rounded-3xl text-center bg-bg-secondary/40">
              <span className="font-display font-black text-lg text-text-primary block">No matching pipeline found</span>
              <p className="font-sans text-xs text-text-muted mt-2 max-w-sm mx-auto">
                Try clearing active filters or resetting your parameters to explore core semester projects.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTag('All');
                }}
                className="mt-5 h-9 px-4 rounded-full bg-accent-primary text-white font-sans text-xs font-semibold cursor-pointer shadow-sm hover:bg-accent-primary-hover"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  id={`project-card-view-${proj.id}`}
                  onClick={() => setSelectedProject(proj)}
                  className="group bg-bg-elevated rounded-2xl overflow-hidden border border-border-subtle hover:border-accent-primary/20 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between h-[420px] cursor-pointer"
                >
                  <div>
                    {/* Thumbnail banner */}
                    <div className="h-[200px] w-full relative overflow-hidden bg-bg-primary border-b border-border-subtle">
                      <img
                        referrerPolicy="no-referrer"
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2E]/60 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Interactive ping metrics badge */}
                      <div className="absolute top-4 left-4 font-mono text-[10px] font-bold text-white px-2.5 py-1 rounded-full bg-accent-secondary flex items-center space-x-1 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping mr-0.5" />
                        <span>{proj.stats}</span>
                      </div>
                      
                      <div className="absolute bottom-4 left-4">
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-black uppercase text-accent-secondary tracking-widest leading-none">
                          {proj.category}
                        </span>
                      </div>
                    </div>

                    {/* Content panel */}
                    <div className="p-6">
                      <h4 className="font-display text-lg font-extrabold text-[#0E1B2E] dark:text-text-primary tracking-tight leading-snug group-hover:text-accent-primary transition-colors">
                        {proj.title}
                      </h4>
                      <p className="font-sans text-[13px] text-text-secondary leading-relaxed mt-2.5 line-clamp-3">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  {/* Card bottom tags */}
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-border-subtle/50 bg-bg-secondary/20">
                    <div className="flex flex-wrap gap-1.5 max-w-[75%] overflow-hidden">
                      {proj.tags.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-bg-elevated border border-border-subtle rounded font-mono text-[9px] font-semibold text-text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="font-semibold text-xs text-accent-primary flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. CORE SUB-ACTIONS HUB: JOIN TEAM AND PITCH IDEA */}
      <section id="projects-apply-dock" className="py-24 bg-bg-secondary border-t border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 select-none">
            <span className="font-sans text-[12px] font-bold text-accent-secondary uppercase tracking-[0.2em] block mb-3">
              Direct Contribution
            </span>
            <h2 className="font-display text-[28px] md:text-[38px] font-extrabold text-[#0E1B2E] dark:text-text-primary tracking-tight">
              Join or Form an ML Team
            </h2>
            <p className="font-sans text-sm text-text-secondary max-w-xl mx-auto mt-2.5">
              Applications are reviewed at the beginning of each semester by Jordan Kim, our Director of Projects. Let's make something impactful.
            </p>

            {/* Selector Option tabs */}
            <div className="flex items-center justify-center space-x-3.5 mt-8">
              <button
                onClick={() => setActiveTab('join')}
                className={`px-5 py-2.5 rounded-full font-sans text-xs font-bold transition-all border cursor-pointer ${
                  activeTab === 'join'
                    ? 'bg-accent-primary text-white border-accent-primary shadow-sm'
                    : 'bg-bg-elevated text-text-secondary border-border-medium hover:border-text-muted'
                }`}
              >
                Apply to Active Project
              </button>
              <button
                onClick={() => setActiveTab('pitch')}
                className={`px-5 py-2.5 rounded-full font-sans text-xs font-bold transition-all border cursor-pointer ${
                  activeTab === 'pitch'
                    ? 'bg-accent-primary text-white border-accent-primary shadow-sm'
                    : 'bg-bg-elevated text-text-secondary border-border-medium hover:border-text-muted'
                }`}
              >
                Pitch a New Project Idea
              </button>
            </div>
          </div>

          {/* Form panels container */}
          <div className="bg-bg-elevated border border-border-subtle rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
            {activeTab === 'join' ? (
              joinSuccess ? (
                <div className="text-center py-10 animate-fade-in select-none">
                  <div className="w-16 h-16 bg-green-500/15 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">Application Submitted!</h3>
                  <p className="font-sans text-sm text-text-secondary mt-3 max-w-md mx-auto">
                    Jordan Kim has received your details. If there is a vacant coder seat matched with your specified stack, you will get a Discord server invite within 48 hours.
                  </p>
                  <button
                    onClick={resetJoinForm}
                    className="mt-8 text-xs font-bold text-accent-primary underline hover:text-accent-primary-hover"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleJoinSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">First & Last Name <span className="text-[#3B5BFF]">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="John Buckeye"
                        value={joinForm.name}
                        onChange={(e) => setJoinForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">OSU Email Address <span className="text-[#3B5BFF]">*</span></label>
                      <input
                        type="email"
                        required
                        placeholder="buckeye.123@osu.edu"
                        value={joinForm.email}
                        onChange={(e) => setJoinForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Discord Username</label>
                      <input
                        type="text"
                        placeholder="buckeye_ai"
                        value={joinForm.discord}
                        onChange={(e) => setJoinForm(prev => ({ ...prev, discord: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Academic Major</label>
                      <input
                        type="text"
                        placeholder="Computer Science & Eng"
                        value={joinForm.major}
                        onChange={(e) => setJoinForm(prev => ({ ...prev, major: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Academic Standing <span className="text-[#3B5BFF]">*</span></label>
                      <select
                        value={joinForm.year}
                        onChange={(e) => setJoinForm(prev => ({ ...prev, year: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary focus:border-accent-primary focus:outline-none transition-all"
                      >
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                        <option>Graduate / PhD</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Target Project Team <span className="text-[#3B5BFF]">*</span></label>
                      <select
                        required
                        value={joinForm.projectId}
                        onChange={(e) => setJoinForm(prev => ({ ...prev, projectId: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary focus:border-accent-primary focus:outline-none transition-all"
                      >
                        <option value="">-- Choose active pipeline --</option>
                        {PROJECTS.map(p => (
                          <option key={p.id} value={p.id}>{p.title} ({p.category})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Deep Learning Experience</label>
                      <select
                        value={joinForm.experience}
                        onChange={(e) => setJoinForm(prev => ({ ...prev, experience: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary focus:border-accent-primary focus:outline-none transition-all"
                      >
                        <option>Beginner (familiar with general Python basics)</option>
                        <option>Intermediate (understand CNNs / MLP training bounds)</option>
                        <option>Advanced (formulated custom loss / published ML code)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Why do you want to join this specific pipeline?</label>
                    <textarea
                      rows={4}
                      placeholder="Share a bit about what libraries you want to practice or features you want to build..."
                      value={joinForm.statement}
                      onChange={(e) => setJoinForm(prev => ({ ...prev, statement: e.target.value }))}
                      className="w-full p-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-accent-primary hover:bg-accent-primary-hover text-white font-sans text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <span>Submit Active Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )
            ) : (
              pitchSuccess ? (
                <div className="text-center py-10 animate-fade-in select-none">
                  <div className="w-16 h-16 bg-accent-primary/15 text-accent-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary">Project Pitch Submitted!</h3>
                  <p className="font-sans text-sm text-text-secondary mt-3 max-w-md mx-auto">
                    Awesome concept! Jordan Kim and the other directors will review your tech stack and schedule space for you to pitch to general members at the upcoming semester Projects Kickoff.
                  </p>
                  <button
                    onClick={resetPitchForm}
                    className="mt-8 text-xs font-bold text-accent-primary underline hover:text-accent-primary-hover"
                  >
                    Submit another pitch concept
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePitchSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Lead Pitcher Name <span className="text-[#3B5BFF]">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="Alice Coder"
                        value={pitchForm.name}
                        onChange={(e) => setPitchForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Lead Email <span className="text-[#3B5BFF]">*</span></label>
                      <input
                        type="email"
                        required
                        placeholder="bucks.999@osu.edu"
                        value={pitchForm.email}
                        onChange={(e) => setPitchForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Discord Handle</label>
                      <input
                        type="text"
                        placeholder="alice_neural"
                        value={pitchForm.discord}
                        onChange={(e) => setPitchForm(prev => ({ ...prev, discord: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Proposed Project Title <span className="text-[#3B5BFF]">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="Autonomous Campus Delivery Drone ML Engine"
                        value={pitchForm.title}
                        onChange={(e) => setPitchForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Primary Domain</label>
                      <select
                        value={pitchForm.category}
                        onChange={(e) => setPitchForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary focus:border-accent-primary focus:outline-none transition-all"
                      >
                        <option>Computer Vision</option>
                        <option>Natural Language Process</option>
                        <option>Reinforcement Learning</option>
                        <option>Generative AI Art</option>
                        <option>Bio-Informatics Research</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">One-sentence Pitch <span className="text-[#3B5BFF]">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="A real-time edge network coordinating camera streams to guide miniature mobile delivery boxes"
                        value={pitchForm.pitch}
                        onChange={(e) => setPitchForm(prev => ({ ...prev, pitch: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Target Team Size</label>
                      <select
                        value={pitchForm.teamSize}
                        onChange={(e) => setPitchForm(prev => ({ ...prev, teamSize: e.target.value }))}
                        className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary focus:border-accent-primary focus:outline-none transition-all"
                      >
                        <option>3-4 members (Focused Sprint)</option>
                        <option>5-7 members (Collaborative Pipeline)</option>
                        <option>8+ members (Large Core Research)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Core Tech Stack Ideas</label>
                    <input
                      type="text"
                      placeholder="OpenCV, Ultralytics, ROS2, Raspberry Pi, PyTorch"
                      value={pitchForm.stack}
                      onChange={(e) => setPitchForm(prev => ({ ...prev, stack: e.target.value }))}
                      className="w-full h-11 px-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wide text-text-primary block mb-2">Describe the concept, architecture, and required datasets:</label>
                    <textarea
                      rows={4}
                      placeholder="Detail what data you plan to leverage, which academic papers ground this design, or what concrete end products members will construct..."
                      value={pitchForm.description}
                      onChange={(e) => setPitchForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-4 bg-bg-primary border border-border-medium rounded-xl text-[13.5px] text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-accent-primary hover:bg-accent-primary-hover text-white font-sans text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <span>Pitch concept concept</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </form>
              )
            )}
          </div>
        </div>
      </section>

      {/* 4. MODAL - PROJECT OVERVIEW SYSTEM LAYOUT */}
      {selectedProject && (
        <div id="project-overview-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in select-none">
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-bg-primary border border-border-subtle rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative animate-scale-up"
          >
            {/* Top Close bar */}
            <div className="sticky top-0 bg-bg-primary border-b border-border-subtle/50 px-6 py-4 flex items-center justify-between z-10">
              <span className="font-sans text-[11px] font-bold text-accent-secondary uppercase tracking-[0.15em]">
                System Architecture Deep-Dive
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full border border-border-medium hover:border-text-primary hover:bg-bg-secondary flex items-center justify-center transition-colors font-bold text-md text-text-primary cursor-pointer focus:outline-none"
              >
                ×
              </button>
            </div>

            {/* Modal Scrollable Core Content */}
            <div className="p-6 md:p-8 space-y-8">
              
              {/* Header Title with cover image overlay */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-bg-secondary border border-border-subtle shrink-0">
                  <img
                    referrerPolicy="no-referrer"
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <span className="inline-block px-2.5 py-0.5 bg-accent-primary-dim text-accent-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#0E1B2E] dark:text-text-primary tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-accent-secondary bg-badge-accent px-2 py-0.5 rounded">
                      Metric Indicator: {selectedProject.stats}
                    </span>
                  </div>
                  <p className="font-sans text-[14px] text-text-secondary leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Stack and Technology section */}
              <div className="border border-border-subtle rounded-2xl p-5 bg-bg-elevated/20">
                <h5 className="font-display font-bold text-xs uppercase tracking-wider text-text-primary mb-3">Targeted Technical Stack</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 bg-bg-primary border border-border-medium rounded-lg font-mono text-[11px] font-bold text-text-primary flex items-center space-x-1.5"
                    >
                      <Cpu className="w-3.5 h-3.5 text-accent-primary" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Interactive Pipeline Architecture flowchart representation */}
              <div className="space-y-4">
                <h5 className="font-display font-bold text-xs uppercase tracking-wider text-text-primary">System Dataflow Sequence</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  
                  {/* Step 1 */}
                  <div className="p-4 bg-bg-elevated border border-border-subtle rounded-xl flex flex-col justify-between items-start space-y-3 relative group">
                    <span className="absolute top-2 right-2 text-[10px] font-mono text-text-muted font-bold">01</span>
                    <span className="text-[10px] font-black uppercase text-accent-secondary tracking-widest leading-none">Ingestion</span>
                    <span className="font-display font-medium text-[13px] text-text-primary">Raw Sensor Data / Scrapes</span>
                    <p className="font-sans text-[11px] text-text-secondary">Wrangling unstructured real-time inputs cleanly.</p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 bg-bg-elevated border border-border-subtle rounded-xl flex flex-col justify-between items-start space-y-3 relative">
                    <span className="absolute top-2 right-2 text-[10px] font-mono text-text-muted font-bold">02</span>
                    <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest leading-none">Embeddings</span>
                    <span className="font-display font-medium text-[13px] text-text-primary">Vectorization VectorDB</span>
                    <p className="font-sans text-[11px] text-text-secondary">Transforming inputs into dense numerical vectors.</p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 bg-bg-elevated border border-border-subtle rounded-xl flex flex-col justify-between items-start space-y-3 relative">
                    <span className="absolute top-2 right-2 text-[10px] font-mono text-text-muted font-bold">03</span>
                    <span className="text-[10px] font-black uppercase text-green-500 tracking-widest leading-none">Model Layer</span>
                    <span className="font-display font-medium text-[13px] text-text-primary">Core Inference NN</span>
                    <p className="font-sans text-[11px] text-text-secondary">Pulsing model computations through live layers.</p>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 bg-bg-elevated border border-border-subtle rounded-xl flex flex-col justify-between items-start space-y-3 relative">
                    <span className="absolute top-2 right-2 text-[10px] font-mono text-text-muted font-bold">04</span>
                    <span className="text-[10px] font-black uppercase text-purple-500 tracking-widest leading-none">Client UI</span>
                    <span className="font-display font-medium text-[13px] text-text-primary">Interactive Dashboards</span>
                    <p className="font-sans text-[11px] text-text-secondary">Connecting endpoints to student and advisor apps.</p>
                  </div>

                </div>
              </div>

              {/* Project milestones progress bar */}
              <div className="space-y-4">
                <h5 className="font-display font-bold text-xs uppercase tracking-wider text-text-primary">Current Execution Milestones</h5>
                <div className="space-y-3.5">
                  {getProjectMilestones(selectedProject.id).map((m, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-[13px]">
                      <div className={`mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center font-bold text-[9px] ${
                        m.status === 'Completed' 
                          ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                          : 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20 animate-pulse'
                      }`}>
                        {m.status === 'Completed' ? '✓' : '•'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-text-primary">{m.phase}</span>
                          <span className={`text-[10px] uppercase font-black tracking-widest ${
                            m.status === 'Completed' ? 'text-green-500' : 'text-accent-primary'
                          }`}>{m.status}</span>
                        </div>
                        <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">{m.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Panel Actions */}
            <div className="sticky bottom-0 bg-bg-primary border-t border-border-subtle px-6 py-5 flex flex-wrap items-center justify-between gap-4 z-10">
              <span className="font-mono text-[11px] font-bold text-text-muted">
                Need details? Reach out to jordan.kim@osu.edu
              </span>
              <div className="flex space-x-2.5">
                <button
                  onClick={() => alert(`This sandbox repository represents the secure, open-source model parameters representing the compiled weights of "${selectedProject.title}".`)}
                  className="h-10 px-4 rounded-xl border border-border-medium hover:border-text-primary font-sans text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer bg-bg-primary"
                >
                  <Github className="w-4 h-4 text-text-nav" />
                  <span>Sandbox Code</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setActiveTab('join');
                    setJoinForm(prev => ({ ...prev, projectId: selectedProject.id }));
                    setTimeout(() => {
                      document.getElementById('projects-apply-dock')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="h-10 px-4 rounded-xl bg-accent-primary hover:bg-accent-primary-hover text-white font-sans text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
                >
                  <span>Apply for this Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
