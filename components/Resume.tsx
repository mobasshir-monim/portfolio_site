import React, { useState } from 'react';
import { Download, ExternalLink, GraduationCap, Users, Briefcase, Trophy, Sparkles, Rocket, Cpu } from 'lucide-react';
import { 
  RESUME_EDUCATION, 
  RESUME_LEADERSHIP, 
  RESUME_EXPERIENCE, 
  RESUME_ACHIEVEMENTS_LEADERSHIP,
  RESUME_ACHIEVEMENTS_ROVER,
  RESUME_TECHNICAL_SKILLS,
  RESUME_SOFT_SKILLS 
} from '../constants';

const Resume: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'leadership' | 'experience' | 'achievement' | 'skills'>('education');

  const tabs = [
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'leadership', label: 'Leadership and ECA', icon: Users },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'achievement', label: 'Achievement', icon: Trophy },
    { id: 'skills', label: 'Skills', icon: Sparkles },
  ] as const;

  return (
    <section id="resume" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header and Action Buttons */}
        <div className="flex flex-col items-center mb-16 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-mono mb-4">
              Resume & Experience
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A comprehensive look at my academic journey, professional roles, and extracurricular contributions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-3xl">
            <a 
              href="Monim_cv.pdf" 
              download="Monim_cv.pdf"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transform hover:-translate-y-1 w-full sm:w-auto"
            >
              <Download size={20} />
              Download Resume
            </a>
            <a 
              href="https://drive.google.com/drive/folders/1zN3p_TiNFRB9qu0wiGRoyd3djNbwT7Jx?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-cyan-400 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-400/20 transform hover:-translate-y-1 w-full sm:w-auto"
            >
              <ExternalLink size={20} />
              Portfolio Projects and Certificates
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-slate-900/50 p-2 rounded-2xl backdrop-blur-sm border border-slate-800/50 max-w-4xl mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm md:text-base transition-all duration-300
                ${activeTab === tab.id 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }
              `}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          
          {/* Education Content */}
          {activeTab === 'education' && (
            <div className="space-y-6 animate-fadeIn">
              {RESUME_EDUCATION.map((edu, index) => (
                <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{edu.title}</h3>
                      <p className="text-cyan-400 font-medium">{edu.organization}</p>
                    </div>
                    <span className="inline-block px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm font-mono whitespace-nowrap self-start">
                      {edu.date}
                    </span>
                  </div>
                  {edu.points && (
                    <ul className="space-y-2 mt-4">
                      {edu.points.map((point, i) => (
                        <li key={i} className="flex items-start text-slate-400 gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Leadership Content */}
          {activeTab === 'leadership' && (
            <div className="space-y-6 animate-fadeIn">
              {RESUME_LEADERSHIP.map((role, index) => (
                <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{role.title}</h3>
                      <p className="text-cyan-400 font-medium">{role.organization}</p>
                    </div>
                    <span className="inline-block px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm font-mono whitespace-nowrap self-start">
                      {role.date}
                    </span>
                  </div>
                  {role.points && (
                    <ul className="space-y-2 mt-4">
                      {role.points.map((point, i) => (
                        <li key={i} className="flex items-start text-slate-400 gap-2 text-sm md:text-base">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Experience Content */}
          {activeTab === 'experience' && (
            <div className="space-y-6 animate-fadeIn">
               {RESUME_EXPERIENCE.map((exp, index) => (
                <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-cyan-400 font-medium">{exp.organization}</p>
                    </div>
                    {exp.date && (
                      <span className="inline-block px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm font-mono whitespace-nowrap self-start">
                        {exp.date}
                      </span>
                    )}
                  </div>
                  {exp.points && (
                    <ul className="space-y-2 mt-4">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start text-slate-400 gap-2 text-sm md:text-base">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Achievement Content */}
          {activeTab === 'achievement' && (
            <div className="space-y-12 animate-fadeIn">
              
              {/* Entrepreneurship and Leadership Section */}
              <div>
                 <h3 className="text-xl font-bold text-white mb-6 pl-4 border-l-4 border-yellow-500 flex items-center gap-3">
                    <span>Entrepreneurship and Leadership Journey</span>
                    <Trophy className="w-5 h-5 text-yellow-500" />
                 </h3>
                 <div className="grid gap-4">
                  {RESUME_ACHIEVEMENTS_LEADERSHIP.map((item, index) => (
                    <div key={index} className="bg-slate-900 border-l-4 border-yellow-500 p-6 rounded-r-xl hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <Trophy className="text-yellow-500 w-5 h-5 flex-shrink-0 mt-1 opacity-60" />
                        <p className="text-slate-200 font-medium">{item.text}</p>
                      </div>
                    </div>
                  ))}
                 </div>
              </div>

              {/* Rover Challenge Section */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6 pl-4 border-l-4 border-orange-500 flex items-center gap-3">
                    <span>Rover Challenge</span>
                    <Rocket className="w-5 h-5 text-orange-500" />
                 </h3>
                <div className="grid gap-4">
                  {RESUME_ACHIEVEMENTS_ROVER.map((item, index) => (
                    <div key={index} className="bg-slate-900 border-l-4 border-orange-500 p-6 rounded-r-xl hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <Rocket className="text-orange-500 w-5 h-5 flex-shrink-0 mt-1 opacity-60" />
                        <p className="text-slate-200 font-medium">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Skills Content (Technical & Soft) */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Technical Skills */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Cpu className="text-blue-500" />
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {RESUME_TECHNICAL_SKILLS.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg font-medium border border-slate-700 hover:border-blue-500 hover:text-blue-400 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="text-cyan-400" />
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {RESUME_SOFT_SKILLS.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg font-medium border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Resume;