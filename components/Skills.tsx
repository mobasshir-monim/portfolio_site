import React from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../constants';
import { Reveal, SectionHeading, EASE } from './ui/Reveal';

const Skills: React.FC = () => (
  <section id="skills" className="relative py-28 md:py-40">
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <SectionHeading
        index="01"
        eyebrow="Toolkit"
        title="The craft behind"
        italic="the work."
        description="From numerical simulation to machine learning and motion design — the tools I reach for when turning ideas into working things."
      />

      <div className="border-t border-white/10">
        {SKILL_CATEGORIES.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.04}>
            <div className="group relative grid gap-4 border-b border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-[80px_1fr_2fr] md:items-baseline md:gap-8 md:px-4">
              <span className="font-mono text-xs text-mute transition-colors duration-500 group-hover:text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-3xl text-ivory transition-transform duration-700 ease-out-expo group-hover:translate-x-2 md:text-4xl">
                {cat.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((s, j) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 + j * 0.04 }}
                    className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-ivory/80 transition-colors duration-300 hover:border-gold/50 hover:text-gold-soft"
                  >
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
