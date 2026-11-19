import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';
import { HIGHLIGHTS } from '../constants';
import { asset } from '../lib/asset';
import { Reveal, SectionHeading, EASE } from './ui/Reveal';
import Modal from './ui/Modal';

const Highlights: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const { scrollXProgress } = useScroll({ container: trackRef });
  const bar = useSpring(scrollXProgress, { stiffness: 140, damping: 30 });

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: 'smooth' });
  };

  // Click-and-drag to scroll on desktop
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return;
    drag.current = { down: true, x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
    trackRef.current.style.scrollSnapType = 'none';
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down || !trackRef.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    trackRef.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    if (trackRef.current) trackRef.current.style.scrollSnapType = '';
  };

  const step = useCallback(
    (dir: 1 | -1) => setOpen((o) => (o === null ? o : (o + dir + HIGHLIGHTS.length) % HIGHLIGHTS.length)),
    []
  );
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    },
    [step]
  );

  const current = open !== null ? HIGHLIGHTS[open] : null;

  return (
    <section id="highlights" className="relative overflow-hidden border-t border-white/10 bg-ink-2 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="02"
          eyebrow="Moments"
          title="Highlights &"
          italic="milestones."
          description="Stages, awards and rooms I've been lucky to stand in — pitching, presenting, performing and building."
        >
          <div className="flex gap-2">
            {[-1, 1].map((d) => (
              <button
                key={d}
                onClick={() => scroll(d as 1 | -1)}
                disabled={d === -1 ? !canPrev : !canNext}
                aria-label={d === -1 ? 'Previous highlights' : 'Next highlights'}
                className="grid h-14 w-14 place-items-center rounded-full border border-white/15 text-ivory transition-all duration-500 hover:border-gold hover:bg-gold hover:text-ink disabled:pointer-events-none disabled:opacity-30"
              >
                {d === -1 ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </button>
            ))}
          </div>
        </SectionHeading>
      </div>

      <Reveal>
        <div
          ref={trackRef}
          onScroll={updateArrows}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          style={{ '--gutter': 'max(1.5rem, calc((100vw - 80rem) / 2 + 2.5rem))' } as React.CSSProperties}
          className="flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [padding-inline:var(--gutter)] [scroll-padding-inline:var(--gutter)] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          {HIGHLIGHTS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => !drag.current.moved && setOpen(i)}
              className={`group relative block h-[440px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-ink-3 text-left md:h-[560px] ${
                i % 3 === 0 ? 'w-[82vw] md:w-[460px]' : 'w-[68vw] md:w-[340px]'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={asset(item.image)}
                  alt={item.title}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover grayscale-[35%] transition-all duration-[1.2s] ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 line-clamp-3 font-serif text-2xl leading-tight text-ivory md:text-[1.7rem]">{item.title}</h3>
              </div>
              <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-ink/60 text-ivory opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                <Expand size={15} />
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-6 max-w-7xl px-6 md:px-10">
        <div className="h-px w-full bg-white/10">
          <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-gold" />
        </div>
      </div>

      <Modal open={open !== null} onClose={() => setOpen(null)} label="Highlight" wide onKey={onKey}>
        {current && (
          <div className="grid md:grid-cols-[1.3fr_1fr]">
            <div className="relative bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image + open}
                  src={asset(current.image)}
                  alt={current.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-h-[70vh] w-full object-contain md:max-h-[85vh]"
                />
              </AnimatePresence>
            </div>
            <div className="flex flex-col justify-between gap-8 p-8 md:p-10">
              <div>
                <p className="eyebrow">
                  Highlight {String((open ?? 0) + 1).padStart(2, '0')} / {String(HIGHLIGHTS.length).padStart(2, '0')}
                </p>
                <motion.h3
                  key={current.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="mt-4 font-serif text-3xl leading-tight md:text-4xl"
                >
                  {current.title}
                </motion.h3>
                <p className="mt-4 leading-relaxed text-mute">{current.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => step(-1)} aria-label="Previous" className="btn-ghost !px-4">
                  <ArrowLeft size={16} />
                </button>
                <button onClick={() => step(1)} aria-label="Next" className="btn-ghost !px-4">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Highlights;
