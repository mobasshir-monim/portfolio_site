import React from 'react';
import { motion } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'span';
};

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 28, className, as = 'div' }) => {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
};

type HeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
  align?: 'left' | 'center';
  children?: React.ReactNode;
};

export const SectionHeading: React.FC<HeadingProps> = ({ index, eyebrow, title, italic, description, align = 'left', children }) => (
  <div className={`mb-14 md:mb-20 flex flex-col gap-6 ${align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
    <div className={align === 'center' ? 'max-w-3xl' : 'max-w-3xl'}>
      <Reveal>
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span>{index}</span>
          <span className="h-px w-8 bg-gold/50" />
          <span>{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-serif text-5xl leading-[0.95] tracking-tight text-ivory md:text-7xl">
          {title} {italic && <em className="text-gold-soft">{italic}</em>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className={`mt-6 max-w-xl text-base leading-relaxed text-mute md:text-lg ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
        </Reveal>
      )}
    </div>
    {children && <Reveal delay={0.2}>{children}</Reveal>}
  </div>
);
