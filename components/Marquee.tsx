import React from 'react';
import { RESUME_ACHIEVEMENTS_LEADERSHIP, RESUME_ACHIEVEMENTS_ROVER } from '../constants';

const items = [...RESUME_ACHIEVEMENTS_LEADERSHIP, ...RESUME_ACHIEVEMENTS_ROVER].map((a) => a.text.replace(/\.$/, ''));

const Marquee: React.FC = () => (
  <section aria-label="Selected honours" className="relative border-y border-white/10 bg-ink-2 py-6">
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max shrink-0 animate-marquee items-center hover:[animation-play-state:paused]">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center whitespace-nowrap font-serif text-2xl italic text-ivory/80 md:text-3xl" aria-hidden={i >= items.length}>
            {t}
            <span className="mx-8 text-base not-italic text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Marquee;
