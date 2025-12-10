import React from 'react';
import { HERO_TEXT, SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-10 md:pt-0">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2 tracking-tight">
              {HERO_TEXT.greeting}
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1]">
              <span className="block text-slate-100">I'm Monim!</span>
              <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-400 mt-4 block italic font-mono">
                &lt;{HERO_TEXT.headline} /&gt;
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0 border-l-4 border-cyan-500/50 pl-6">
              {HERO_TEXT.bio}
            </p>
            
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <p className="text-sm md:text-base font-mono font-medium text-cyan-400 bg-cyan-950/30 px-4 py-1.5 rounded-full border border-cyan-500/20">
                {HERO_TEXT.subBio}
              </p>
            </div>
          </div>

          {/* Image Content & Social Links */}
          <div className="flex-1 w-full flex flex-col items-center md:items-end relative z-10 group">
             {/* Decorative Background Elements - Glowing Circuit */}
            <div className="absolute top-0 right-0 w-[120%] h-[120%] -translate-y-10 translate-x-10 opacity-30 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M10 10 L30 10 L30 50 L80 50 L80 90" stroke="#0ea5e9" strokeWidth="0.5" fill="none" className="drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                    <circle cx="10" cy="10" r="1" className="fill-cyan-400" />
                    <circle cx="80" cy="90" r="1" className="fill-cyan-400" />
                    <path d="M90 10 L70 10 L70 30 L20 30 L20 80" stroke="#f97316" strokeWidth="0.5" fill="none" className="drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                     <circle cx="90" cy="10" r="1" className="fill-orange-500" />
                </svg>
            </div>
            
            <div className="relative mb-8">
                {/* Colorful splash effect behind */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 rounded-full blur-[60px] transform scale-110"></div>
                
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 z-10">
                  <img 
                    src="/monim.png" 
                    alt="Mobasshir Monim" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                </div>

                {/* Decorative floating badges */}
                <div className="absolute -bottom-6 -left-6 bg-slate-900 p-4 shadow-xl shadow-cyan-900/20 rounded-lg border border-slate-800 border-l-4 border-l-cyan-500 animate-bounce z-20" style={{ animationDuration: '3s' }}>
                    <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">MECH. ENG.</span>
                </div>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-sm p-3 rounded-2xl border border-slate-800/50 transform hover:scale-105 transition-transform duration-300">
              <span className="text-xs font-mono text-slate-400 mr-2 border-r border-slate-700 pr-3">CONNECT</span>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                  aria-label={link.platform}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;