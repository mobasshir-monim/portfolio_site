import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Download } from 'lucide-react';
import {
  RESUME_EDUCATION,
  RESUME_LEADERSHIP,
  RESUME_EXPERIENCE,
  RESUME_ACHIEVEMENTS_LEADERSHIP,
  RESUME_ACHIEVEMENTS_ROVER,
  RESUME_TECHNICAL_SKILLS,
  RESUME_SOFT_SKILLS,
} from '../constants';
import { ResumeItem } from '../types';
import { asset } from '../lib/asset';
import { SectionHeading, Reveal, EASE } from './ui/Reveal';

const tabs = [
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'leadership', label: 'Leadership & ECA' },
  { id: 'achievement', label: 'Achievements' },
  { id: 'skills', label: 'Skills' },
] as const;
type TabId = (typeof tabs)[number]['id'];

const Timeline: React.FC<{ items: ResumeItem[] }> = ({ items }) => (
  <ol className="relative">
    {items.map((item, i) => (
      <motion.li
        key={item.title + item.organization}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
        className="group grid gap-3 border-b border-white/10 py-8 first:pt-0 md:grid-cols-[200px_1fr] md:gap-10"
      >
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-mute md:pt-2">{item.date || '—'}</p>
        <div>
          <h3 className="font-serif text-2xl leading-snug text-ivory transition-colors duration-500 group-hover:text-gold-soft md:text-3xl">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-gold/90">{item.organization}</p>
          {item.points && item.points.length > 0 && (
            <ul className="mt-4 space-y-2">
              {item.points.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-mute">
                  <span className="mt-[0.7em] h-px w-3 shrink-0 bg-white/30" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.li>
    ))}
  </ol>
);

const AchievementList: React.FC<{ title: string; items: { text: string }[] }> = ({ title, items }) => (
  <div>
    <h3 className="eyebrow mb-6">{title}</h3>
    <ul>
      {items.map((a, i) => (
        <motion.li
          key={a.text}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
          className="flex gap-5 border-b border-white/10 py-4 text-ivory/90"
        >
          <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, '0')}</span>
          <span className="leading-relaxed">{a.text}</span>
        </motion.li>
      ))}
    </ul>
  </div>
);

const SkillCloud: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div>
    <h3 className="eyebrow mb-6">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((s, i) => (
        <motion.span
          key={s}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.025 }}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-ivory/85 transition-colors duration-300 hover:border-gold/50 hover:text-gold-soft"
        >
          {s}
        </motion.span>
      ))}
    </div>
  </div>
);

const Resume: React.FC = () => {
  const [tab, setTab] = useState<TabId>('education');

  return (
    <section id="resume" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="03"
          eyebrow="Résumé"
          title="A record of"
          italic="the journey."
          description="Academic grounding, industry exposure and the teams and clubs that shaped how I work."
        >
          <div className="flex flex-wrap gap-3">
            <a href={asset('/Monim_cv.pdf')} download="Monim_cv.pdf" className="btn-primary">
              <Download size={16} /> Download CV
            </a>
            <a
              href="https://drive.google.com/drive/folders/1zN3p_TiNFRB9qu0wiGRoyd3djNbwT7Jx?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Full portfolio <ArrowUpRight size={16} />
            </a>
          </div>
        </SectionHeading>

        <Reveal>
          <div role="tablist" className="mb-14 flex gap-1 overflow-x-auto rounded-full border border-white/10 p-1 [scrollbar-width:none] md:inline-flex">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${tab === t.id ? 'text-ink' : 'text-mute hover:text-ivory'}`}
              >
                {tab === t.id && (
                  <motion.span layoutId="resume-tab" className="absolute inset-0 rounded-full bg-ivory" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3 }}
            >
              {tab === 'education' && <Timeline items={RESUME_EDUCATION} />}
              {tab === 'experience' && <Timeline items={RESUME_EXPERIENCE} />}
              {tab === 'leadership' && <Timeline items={RESUME_LEADERSHIP} />}
              {tab === 'achievement' && (
                <div className="grid gap-16 md:grid-cols-2">
                  <AchievementList title="Entrepreneurship & Leadership" items={RESUME_ACHIEVEMENTS_LEADERSHIP} />
                  <AchievementList title="Rover Challenges — Team Interplanetar" items={RESUME_ACHIEVEMENTS_ROVER} />
                </div>
              )}
              {tab === 'skills' && (
                <div className="grid gap-16 md:grid-cols-[2fr_1fr]">
                  <SkillCloud title="Technical" items={RESUME_TECHNICAL_SKILLS} />
                  <SkillCloud title="Interpersonal" items={RESUME_SOFT_SKILLS} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Resume;
