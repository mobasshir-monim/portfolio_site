import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ACADEMIC_PUBLICATIONS } from '../constants';
import { SectionHeading, Reveal, EASE } from './ui/Reveal';

const AcademicPublications: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const pubs = [...ACADEMIC_PUBLICATIONS].sort((a, b) => parseInt(b.date) - parseInt(a.date));

  return (
    <section id="publications" className="relative border-t border-white/10 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="—"
          eyebrow="Research"
          title="Papers &"
          italic="publications."
          description="Scientific machine learning, fluid dynamics and assistive robotics."
        />
        <div className="border-t border-white/10">
          {pubs.map((p, i) => {
            const isOpen = open === p.id;
            return (
              <Reveal key={p.id} delay={i * 0.04}>
                <article className="grid gap-4 border-b border-white/10 py-10 md:grid-cols-[140px_1fr] md:gap-10">
                  <div className="font-mono text-xs uppercase tracking-[0.15em] text-mute">
                    <p>{p.date}</p>
                    <p className="mt-1 text-gold">{p.type}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl leading-snug md:text-3xl">{p.title}</h3>
                    <p className="mt-3 text-sm text-ivory/80">{p.authors.join(', ')}</p>
                    <p className="mt-1 text-sm italic text-mute">{p.venue}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button onClick={() => setOpen(isOpen ? null : p.id)} className="btn-ghost !py-2 !text-[13px]">
                        Abstract <Plus size={14} className={`transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} />
                      </button>
                      {p.doiUrl && p.doiUrl !== '#' && (
                        <a href={p.doiUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 !text-[13px]">
                          DOI <ArrowUpRight size={14} />
                        </a>
                      )}
                      {p.pdfUrl && p.pdfUrl !== '#' && (
                        <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2 !text-[13px]">
                          PDF <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="mt-6 max-w-3xl leading-relaxed text-mute">{p.abstract}</p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {p.keywords.map((k) => (
                              <li key={k} className="chip">{k}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademicPublications;
