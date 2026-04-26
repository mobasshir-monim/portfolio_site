import React, { useState } from 'react';
import { ACADEMIC_PUBLICATIONS } from '../constants';
import { FileText, BookOpen, Users, Calendar, Tag, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const AcademicPublications: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>('All');

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getPublicationTypeIcon = (type: string) => {
    switch(type) {
      case 'Conference':
        return <BookOpen className="w-4 h-4" />;
      case 'Journal':
        return <FileText className="w-4 h-4" />;
      case 'Workshop':
        return <Users className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getPublicationTypeColor = (type: string) => {
    switch(type) {
      case 'Conference':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'Journal':
        return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
      case 'Workshop':
        return 'bg-green-500/20 border-green-500/30 text-green-400';
      default:
        return 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400';
    }
  };

  const publicationTypes = ['All', ...new Set(ACADEMIC_PUBLICATIONS.map(pub => pub.type))];
  
  const filteredPublications = (filterType === 'All' 
    ? ACADEMIC_PUBLICATIONS 
    : ACADEMIC_PUBLICATIONS.filter(pub => pub.type === filterType)
  ).sort((a, b) => parseInt(b.date) - parseInt(a.date));

  return (
    <section id="publications" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] -z-10"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-600/5 blur-[150px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/5 blur-[150px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="font-mono text-3xl md:text-5xl font-bold text-white mb-4">
            ACADEMIC PUBLICATIONS
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-mono text-sm uppercase tracking-widest">
            Research Papers, Conferences & Journals
          </p>
          <div className="h-1 w-24 bg-cyan-500 mx-auto mt-6 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {publicationTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`
                px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 border
                ${filterType === type
                  ? 'bg-cyan-500 text-slate-950 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPublications.map((publication) => (
            <div
              key={publication.id}
              className={`
                group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl overflow-hidden 
                transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10
                flex flex-col
                ${expandedId === publication.id ? 'lg:col-span-2 z-10' : ''}
              `}
            >
              {/* Publication Type Badge & Header */}
              <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900/80 to-slate-900/40 group-hover:from-slate-800/80 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getPublicationTypeColor(publication.type)}`}>
                    {getPublicationTypeIcon(publication.type)}
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">{publication.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Calendar size={14} />
                    {publication.date}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                  {publication.title}
                </h3>
              </div>

              {/* Main Content */}
              <div className="p-6 flex-grow flex flex-col">
                {/* Authors */}
                <div className="mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <Users size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Authors</p>
                      <p className="text-sm text-slate-300">
                        {publication.authors.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Venue */}
                <div className="mb-4">
                  <div className="flex items-start gap-2">
                    <BookOpen size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Venue</p>
                      <p className="text-sm text-slate-300">{publication.venue}</p>
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div className="mb-4">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {publication.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800/60 border border-slate-700 rounded text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                      >
                        <Tag size={12} />
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Abstract - Expandable */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleExpand(publication.id)}
                    className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest hover:text-cyan-300 transition-colors mb-2"
                  >
                    {expandedId === publication.id ? (
                      <>
                        <ChevronUp size={16} />
                        Hide Abstract
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        View Abstract
                      </>
                    )}
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${expandedId === publication.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pt-4 border-t border-slate-800">
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {publication.abstract}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto pt-4 border-t border-slate-800">
                  {publication.doiUrl && (
                    <a
                      href={publication.doiUrl}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 rounded text-xs font-mono transition-colors"
                    >
                      <ExternalLink size={14} />
                      DOI
                    </a>
                  )}
                  {publication.pdfUrl && (
                    <a
                      href={publication.pdfUrl}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 rounded text-xs font-mono transition-colors"
                    >
                      <FileText size={14} />
                      PDF
                    </a>
                  )}
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-slate-700 group-hover:border-cyan-500 transition-colors"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-slate-700 group-hover:border-cyan-500 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-slate-700 group-hover:border-cyan-500 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-slate-700 group-hover:border-cyan-500 transition-colors"></div>
            </div>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 font-mono">No publications in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AcademicPublications;
