import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { ABOUT_ME_CONTENT } from '../constants';
import { Reveal, EASE } from './ui/Reveal';

const AboutMe: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="about" className="relative border-t border-white/10 bg-ink-2 py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span>06</span>
              <span className="h-px w-8 bg-gold/50" />
              <span>About</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">
              The person <em className="text-gold-soft">behind</em> the projects.
            </h2>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="text-xl leading-relaxed text-ivory/90 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold md:text-2xl">
              {ABOUT_ME_CONTENT.intro}
            </p>
          </Reveal>

          <div className="mt-16 border-t border-white/10">
            {ABOUT_ME_CONTENT.sections.map((s, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={s.title} delay={i * 0.03}>
                  <div className="border-b border-white/10">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-6 py-6 text-left"
                    >
                      <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`flex-1 font-serif text-2xl transition-colors duration-500 md:text-3xl ${isOpen ? 'text-gold-soft' : 'text-ivory group-hover:text-gold-soft'}`}>
                        {s.title}
                      </span>
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                          isOpen ? 'rotate-45 border-gold bg-gold text-ink' : 'border-white/15 text-ivory'
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pb-8 pl-11 leading-relaxed text-mute md:pl-12 md:text-lg">{s.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
