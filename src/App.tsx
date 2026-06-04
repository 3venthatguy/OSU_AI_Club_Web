import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { HackAI } from './pages/HackAI';
import { Projects } from './pages/Projects';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');

  // Trigger scroll-to-top whenever the user shifts routing pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activePage]);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigate={setActivePage} />;
      case 'about':
        return <About onNavigate={setActivePage} />;
      case 'events':
        return <Events />;
      case 'hackai':
        return <HackAI />;
      case 'projects':
        return <Projects />;
      default:
        return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <div id="application-container-viewport" className="min-h-screen flex flex-col justify-between">
      <div>
        {/* Navigation header pinned to the top of all pages */}
        <Navbar activePage={activePage} onNavigate={setActivePage} />

        {/* Dynamic Client Page Layout */}
        <main id="main-content-flow" className="w-full">
          {renderActivePage()}
        </main>
      </div>

      {/* Unified professional bottom footer */}
      <Footer onNavigate={setActivePage} />
    </div>
  );
}
