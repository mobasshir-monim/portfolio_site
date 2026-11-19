import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectItem } from '../types';
import { asset } from '../lib/asset';
import { SectionHeading, Reveal } from './ui/Reveal';
import Modal from './ui/Modal';

const ProjectRow: React.FC<{ project: ProjectItem; index: number; onOpen: () => void }> = ({ project, index, onOpen }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const flip = index % 2 === 1;
  const hasDetails = project.details.trim().length > 0;

  return (
    <article ref={ref} className="grid items-center gap-10 border-t border-white/10 py-16 md:grid-cols-12 md:gap-14 md:py-24">
      <Reveal className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
        <button
          onClick={hasDetails ? onOpen : undefined}
          className={`group relative block aspect-[16/11] w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-3 ${hasDetails ? 'cursor-pointer' : 'cursor-default'}`}
          aria-label={hasDetails ? `Open case study: ${project.title}` : project.title}
        >
          <motion.img
            style={{ y, scale: 1.18 }}
            src={asset(project.image)}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          {hasDetails && (
            <span className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-xs font-medium text-ink opacity-0 transition-all duration-500 group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0">
              Case study <ArrowUpRight size={14} />
            </span>
          )}
        </button>
      </Reveal>

      <div className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">Project {String(index + 1).padStart(2, '0')}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h3 className="mt-4 font-serif text-3xl leading-[1.05] text-ivory md:text-[2.6rem]">{project.title}</h3>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 line-clamp-5 leading-relaxed text-mute">{project.bio}</p>
        </Reveal>
        <Reveal delay={0.18}>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        {(hasDetails || project.link) && (
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              {hasDetails && (
                <button onClick={onOpen} className="btn-ghost group">
                  Read the case study
                  <Plus size={16} className="transition-transform duration-500 group-hover:rotate-90" />
                </button>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Visit <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </article>
  );
};

/** Turns the plain-text details into headings + bullet lists. */
const Details: React.FC<{ text: string }> = ({ text }) => {
  const blocks = text.split(/\n\s*\n/);
  return (
    <div className="space-y-8">
      {blocks.map((block, bi) => {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
        return (
          <div key={bi} className="space-y-3">
            {lines.map((line, li) => {
              if (/^[–-]\s*/.test(line))
                return (
                  <p key={li} className="flex gap-3 leading-relaxed text-mute">
                    <span className="mt-[0.75em] h-px w-3 shrink-0 bg-gold/60" />
                    {line.replace(/^[–-]\s*/, '')}
                  </p>
                );
              if (/:$/.test(line) || /^\d+\.\s/.test(line))
                return (
                  <h4 key={li} className="pt-2 font-serif text-2xl text-ivory">
                    {line.replace(/:$/, '')}
                  </h4>
                );
              return (
                <p key={li} className="leading-relaxed text-ivory/80">
                  {line}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const Projects: React.FC = () => {
  const [open, setOpen] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative border-t border-white/10 bg-ink-2 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          title="Projects built"
          italic="with intent."
          description="Robotics, machine learning and simulation — engineering problems approached end-to-end, from hardware to model."
        />
        <div className="border-b border-white/10">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} label={open?.title ?? 'Project'}>
        {open && (
          <>
            <div className="relative aspect-[16/8] overflow-hidden">
              <img src={asset(open.image)} alt={open.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/40 to-transparent" />
            </div>
            <div className="-mt-20 relative p-8 md:p-12">
              <p className="eyebrow">Case study</p>
              <h3 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">{open.title}</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {open.tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-lg leading-relaxed text-ivory/90">{open.bio}</p>
              <div className="my-10 h-px bg-white/10" />
              <Details text={open.details} />
            </div>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Projects;
