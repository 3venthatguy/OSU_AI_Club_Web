import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { HackAI } from './pages/HackAI';
import { Projects } from './pages/Projects';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { PageTransition } from './components/PageTransition';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');

  const renderActivePage = (page: string) => {
    switch (page) {
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
      {/* Navigation header pinned to the top of all pages */}
      <Navbar activePage={activePage} onNavigate={setActivePage} />

      <SmoothScrollProvider>
        {/* Dynamic Client Page Layout with Directional Transition */}
        <main id="main-content-flow" className="w-full">
          <PageTransition activePage={activePage} renderPage={renderActivePage} />
        </main>

        {/* Unified professional bottom footer */}
        <Footer onNavigate={setActivePage} />
      </SmoothScrollProvider>
    </div>
  );
}


