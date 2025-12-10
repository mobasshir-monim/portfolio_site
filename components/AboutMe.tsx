import React, { useState } from 'react';
import { ABOUT_ME_CONTENT } from '../constants';
import { ChevronDown, ChevronUp, User } from 'lucide-react';

const AboutMe: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="py-24 bg-slate-900 border-t border-slate-900 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-800/20 to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
            <div className="bg-cyan-900/30 p-3 rounded-full border border-cyan-500/30">
                <User size={32} className="text-cyan-400" />
            </div>
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
                    ABOUT ME
                </h2>
                <p className="text-slate-400 text-sm md:text-base">The person behind the projects.</p>
            </div>
        </div>

        {/* Content Container */}
        <div className="bg-slate-950/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-10 shadow-xl">
            
            {/* Intro Paragraph */}
            <p className="text-lg text-slate-300 leading-relaxed mb-6 font-medium border-l-4 border-cyan-500 pl-4">
                {ABOUT_ME_CONTENT.intro}
            </p>

            {/* Expandable Sections */}
            <div 
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="space-y-8 mt-8 border-t border-slate-800/50 pt-8">
                    {ABOUT_ME_CONTENT.sections.map((section, index) => (
                        <div key={index} className="group">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                {section.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-base">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toggle Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-500 font-bold transition-all duration-300 group shadow-lg"
                >
                    {isExpanded ? (
                        <>
                            Read Less <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" />
                        </>
                    ) : (
                        <>
                            Read More <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>

        </div>

      </div>
    </section>
  );
};

export default AboutMe;