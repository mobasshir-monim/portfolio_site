import React from 'react';
import { Youtube, FolderGit2, FileText, Award, Trophy, Code2 } from 'lucide-react';

const links = [
  { label: "Youtube", href: "#youtube", icon: Youtube, color: "hover:border-red-500 hover:text-red-500" },
  { label: "Projects", href: "#projects", icon: FolderGit2, color: "hover:border-green-500 hover:text-green-500" },
  { label: "Resume", href: "#resume", icon: FileText, color: "hover:border-blue-500 hover:text-blue-500" },
  { label: "Certificates", href: "#certificates", icon: Award, color: "hover:border-yellow-500 hover:text-yellow-500" },
  { label: "Achievements", href: "#achievements", icon: Trophy, color: "hover:border-purple-500 hover:text-purple-500" },
  { label: "Skills", href: "#skills", icon: Code2, color: "hover:border-cyan-500 hover:text-cyan-500" },
];

const QuickLinks: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 relative border-b border-slate-900">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`group flex flex-col items-center justify-center p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl ${link.color} hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:bg-slate-900 transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="mb-4 text-slate-500 group-hover:text-inherit transition-colors duration-300 transform group-hover:scale-110">
                <link.icon size={48} strokeWidth={1.5} />
              </div>
              <span className="text-lg md:text-xl font-bold text-slate-400 group-hover:text-inherit tracking-wide uppercase font-mono">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;