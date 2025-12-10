import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 text-white pt-24 pb-12 border-t border-slate-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tight font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
            CONNECT WITH ME
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl bg-slate-900 border-2 border-slate-800 hover:border-cyan-500 hover:bg-slate-800 hover:text-cyan-400 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 group"
                aria-label={link.platform}
              >
                <link.icon className="w-8 h-8 md:w-10 md:h-10 text-slate-400 group-hover:text-cyan-400 transition-colors" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-900 pt-12 flex flex-col items-center">
          <p className="text-slate-300 font-bold text-xl md:text-2xl mb-3 tracking-wide">
            Bangladesh University of Engineering & Technology
          </p>
          <p className="text-slate-500 text-sm font-mono">
            © {new Date().getFullYear()} Mobasshir Monim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;