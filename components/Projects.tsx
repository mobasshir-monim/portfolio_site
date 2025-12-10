import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ChevronDown, ChevronUp, Code, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-mono text-3xl md:text-5xl font-bold text-white mb-4">
            FEATURED PROJECTS
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A showcase of engineering solutions, simulations, and creative developments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className={`
                bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col
                ${expandedId === project.id ? 'lg:col-span-2 lg:row-span-2 z-10' : ''}
              `}
            >
              {/* Image Header */}
              <div className={`relative overflow-hidden ${expandedId === project.id ? 'h-64 md:h-80' : 'h-48'} transition-all duration-500`}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-cyan-400 px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-2">
                   <Code size={14} />
                   PROJECT 0{project.id}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bio / Short Description */}
                <div className="mb-4">
                  <p className="text-slate-300 leading-relaxed">
                    {project.bio}
                  </p>
                </div>

                {/* Expanded Details */}
                <div className={`overflow-hidden transition-all duration-500 ${expandedId === project.id ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="text-sm font-mono text-cyan-400 mb-2 uppercase tracking-widest">Project Details</h4>
                    <p className="text-slate-400 leading-relaxed">
                      {project.details}
                    </p>
                  </div>
                </div>

                {/* Footer / Action */}
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-800/50">
                  <button 
                    onClick={() => toggleExpand(project.id)}
                    className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wide group"
                  >
                    {expandedId === project.id ? (
                      <>Read Less <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform" /></>
                    ) : (
                      <>Read More <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" /></>
                    )}
                  </button>

                  <button className="text-slate-500 hover:text-white transition-colors">
                    <ArrowRight size={20} className="-rotate-45" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;