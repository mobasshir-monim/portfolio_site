import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Highlights from './components/Highlights';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import YoutubePage from './components/YouTubePage';

const Home = () => (
  <main>
    <Hero />
    <Skills />
    <Highlights />
    <Resume />
    <Projects />
    <Certificates />
    <AboutMe />
  </main>
);

// 2. Update App to use Routes
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
        <Navbar />
        <Routes>
          {/* Route for the main page */}
          <Route path="/" element={<Home />} />
          
          {/* Route for the new Youtube page */}
          <Route path="/youtube-feed" element={<YoutubePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);