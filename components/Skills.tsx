import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { Cpu, Code, Database, Terminal, PenTool, LayoutTemplate } from 'lucide-react';

const getIconForCategory = (title: string) => {
  if (title.includes("Programming")) return <Code className="w-5 h-5" />;
  if (title.includes("Analysis")) return <Cpu className="w-5 h-5" />;
  if (title.includes("Handling")) return <Database className="w-5 h-5" />;
  if (title.includes("Simulation")) return <LayoutTemplate className="w-5 h-5" />;
  if (title.includes("Graphics")) return <PenTool className="w-5 h-5" />;
  return <Terminal className="w-5 h-5" />;
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-cyan-500/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-blue-600/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-mono text-4xl md:text-5xl font-bold text-white inline-block relative">
            <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur"></span>
            <span className="relative">Technical Arsenal</span>
            <div className="h-1 w-24 bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
          </h2>
          <p className="mt-4 text-slate-400 font-mono text-sm uppercase tracking-widest">System Capabilities & Tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, index) => (
            <div 
              key={index} 
              className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors duration-500"
            >
              {/* Header Bar */}
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between group-hover:bg-slate-800/80 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors shadow-cyan-500/20">
                    {getIconForCategory(category.title)}
                  </span>
                  <h3 className="font-mono font-bold text-slate-200 text-sm md:text-base tracking-wide uppercase">
                    {category.title}
                  </h3>
                </div>
                {/* Decorative Dots */}
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-red-500 transition-colors"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-yellow-500 transition-colors"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-green-500 transition-colors"></div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 relative">
                 {/* Scanline effect on hover */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[200%] w-full -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                 
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill} 
                      className="relative px-3 py-1.5 bg-slate-800 text-slate-300 text-sm font-medium rounded border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-slate-700 group-hover:border-cyan-500 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-slate-700 group-hover:border-cyan-500 transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;