import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Projects from './components/Projects';
// import AcademicPublications from './components/AcademicPublications'; // Uncomment to publish the papers section
import Certificates from './components/Certificates';
import Highlights from './components/Highlights';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import YoutubePage from './components/YouTubePage';

const Home = () => {
  const location = useLocation();

  // Scroll to a section when arriving from another route (e.g. /youtube-feed -> #projects)
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo || location.hash.slice(1);
    if (!target) return;
    const t = setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 120);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <main>
      <Hero />
      <Marquee />
      <Highlights />
      <Skills />
      <Resume />
      <Projects />
      {/* <AcademicPublications /> */}
      <Certificates />
      <AboutMe />
    </main>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== '/') window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <MotionConfig reducedMotion="user">
    <Router basename={import.meta.env.BASE_URL.startsWith('/') ? import.meta.env.BASE_URL : undefined}>
      <ScrollToTop />
      <div className="min-h-screen overflow-x-clip bg-ink text-ivory">
        <div className="grain" aria-hidden />
        <Navbar />
        <Routes>
          <Route path="/youtube-feed" element={<YoutubePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </MotionConfig>
);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
