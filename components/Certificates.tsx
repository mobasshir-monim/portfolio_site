import React, { useState } from 'react';
import { CERTIFICATES } from '../constants';
import { CertificateCategory } from '../types';
import { Award, Brain, Database, Calculator, Code, ExternalLink, BadgeCheck, BriefcaseBusiness, Spotlight , Ellipsis } from 'lucide-react';

const categories: CertificateCategory[] = [
  'Awards',
  'Machine Learning',
  'Data Science',
  'Matlab',
  'Programming',
  'Entrepreneurship',
  'Leadership',
  'Other'
];

const categoryIcons: Record<CertificateCategory, React.ElementType> = {
  'Awards': Award,
  'Machine Learning': Brain,
  'Data Science': Database,
  'Matlab': Calculator,
  'Programming': Code,
  'Entrepreneurship': BriefcaseBusiness ,
  'Leadership':  Spotlight ,
  'Other': Ellipsis
};

const Certificates: React.FC = () => {
  // CHANGED: State is now an array of categories
  const [selectedCategories, setSelectedCategories] = useState<CertificateCategory[]>([]);

  // NEW: Function to toggle categories
  const toggleCategory = (category: CertificateCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredCertificates = selectedCategories.length === 0
    ? CERTIFICATES 
    : CERTIFICATES.filter(cert => {
        const certCategories = Array.isArray(cert.category) ? cert.category : [cert.category];
        return certCategories.some(cat => selectedCategories.includes(cat));
      });

  return (
    <section id="certificates" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Abstract Cyber Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-2 px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-full">
            <span className="text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase">Validations & Honors</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            CERTIFICATIONS
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Official credentials validating technical expertise and achievements.
          </p>
        </div>

        {/* Dynamic Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          <button
            onClick={() => setSelectedCategories([])} // Clear array for "ALL"
            className={`
              px-6 py-2 rounded-full font-mono text-sm font-bold transition-all duration-300 border
              ${selectedCategories.length === 0 
                ? 'bg-white text-slate-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105' 
                : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'
              }
            `}
          >
            ALL
          </button>
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const isActive = selectedCategories.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`
                  flex items-center gap-2 px-5 py-2 rounded-full font-mono text-sm font-bold transition-all duration-300 border
                  ${isActive 
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105' 
                    : 'bg-slate-900/50 text-slate-400 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400'
                  }
                `}
              >
                <Icon size={14} />
                {category.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCertificates.map((cert) => {
            // Handle array or string category for icon display
            const primaryCategory = Array.isArray(cert.category) ? cert.category[0] : cert.category;
            const Icon = categoryIcons[primaryCategory] || Ellipsis;
            
            // Display string for badge
            const categoryDisplay = Array.isArray(cert.category) ? cert.category.join(', ') : cert.category;

            return (
              <div 
                key={cert.id}
                className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-900/20 hover:-translate-y-2 flex flex-col"
              >
                {/* Image Section with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-2 text-xs font-bold text-cyan-400 shadow-lg max-w-[90%]">
                    <Icon size={12} className="shrink-0" />
                    <span className="truncate">{categoryDisplay}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                     <h3 className="text-xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-slate-800/50 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <BadgeCheck size={16} className="text-blue-500" />
                        <span className="font-medium">{cert.issuer}</span>
                      </div>
                      <span className="font-mono text-slate-500 text-xs">{cert.date}</span>
                    </div>

                    <a 
                      href={cert.credentialUrl || "#"} 
                      className="w-full mt-2 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20"
                    >
                      <ExternalLink size={16} />
                      View Credential
                    </a>
                  </div>
                </div>

                {/* Decorative Glow */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/40 transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
        
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 font-mono">No certificates found in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;