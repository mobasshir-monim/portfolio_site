import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { HIGHLIGHTS } from '../constants';
import { HighlightItem } from '../types';
import { asset } from '../lib/asset';
import { EASE, Reveal } from './ui/Reveal';
import Modal from './ui/Modal';

const pad = (n: number) => String(n).padStart(2, '0');

// Gallery rhythm: height, aspect ratio and vertical alignment repeat every 4 cards
const LAYOUT = [
  'h-full aspect-[4/5] self-center',
  'h-[78%] aspect-[3/4] self-end',
  'h-[86%] aspect-square self-start',
  'h-[80%] aspect-[4/5] self-end',
];

/* ---------- Card ---------- */

const Card: React.FC<{ item: HighlightItem; index: number; onOpen: () => void; className?: string }> = ({ item, index, onOpen, className = '' }) => (
  <button
    onClick={onOpen}
    className={`group relative shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-ink-3 text-left ${className}`}
    aria-label={`Open highlight: ${item.title}`}
  >
    <img
      src={asset(item.image)}
      alt={item.title}
      loading="lazy"
      draggable={false}
      className="absolute inset-0 h-full w-full object-cover grayscale-[40%] transition-all duration-[1.2s] ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/10" />
    <span className="pointer-events-none absolute inset-3 rounded-[20px] border border-transparent transition-colors duration-700 group-hover:border-gold/50" />

    <span className="absolute left-6 top-5 font-serif text-5xl italic leading-none text-ivory/90 drop-shadow md:text-6xl">{pad(index + 1)}</span>
    <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-ink/40 text-ivory backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
      <ArrowUpRight size={16} />
    </span>

    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
      <h3 className="line-clamp-3 font-serif text-2xl leading-[1.1] text-ivory md:text-[1.75rem]">{item.title}</h3>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-out-expo group-hover:grid-rows-[1fr]">
        <p className="overflow-hidden text-sm leading-relaxed text-ivory/70">
          <span className="block pt-3">{item.description}</span>
        </p>
      </div>
    </div>
  </button>
);

const Intro: React.FC = () => (
  <div>
    <p className="eyebrow mb-5 flex items-center gap-3">
      <span>01</span>
      <span className="h-px w-8 bg-gold/50" />
      <span>Moments</span>
    </p>
    <h2 className="font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">
      Highlights &amp; <em className="text-gold-soft">milestones.</em>
    </h2>
    <p className="mt-6 max-w-md leading-relaxed text-mute md:text-lg">
      Stages, awards and rooms I've been lucky to stand in — pitching, presenting, performing and building.
    </p>
  </div>
);

/* ---------- Gallery: slow auto-drift, pauses on hover, draggable, never hijacks page scroll ---------- */

const SPEED = 14; // px per second — deliberately slow
const GAP = 24;

const Gallery: React.FC<{ onOpen: (i: number) => void; paused: boolean }> = ({ onOpen, paused }) => {
  const setRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [setWidth, setSetWidth] = useState(0);
  const [started, setStarted] = useState(false);
  const hover = useRef(false);
  const busy = useRef(false); // dragging or arrow animation
  const resumeAt = useRef(0);
  const drag = useRef({ down: false, startX: 0, startOffset: 0, moved: false });
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const measure = () => setRef.current && setSetWidth(setRef.current.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    if (setRef.current) ro.observe(setRef.current);
    return () => ro.disconnect();
  }, []);

  // Start drifting shortly after the page has loaded
  useEffect(() => {
    const go = () => setTimeout(() => setStarted(true), 1200);
    if (document.readyState === 'complete') {
      const t = go();
      return () => clearTimeout(t);
    }
    let t: ReturnType<typeof setTimeout>;
    const onLoad = () => (t = go());
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
    };
  }, []);

  const wrap = (v: number) => {
    if (!setWidth) return v;
    let r = v % setWidth;
    if (r > 0) r -= setWidth;
    return r;
  };

  useAnimationFrame((_, delta) => {
    if (!started || reduce || paused || hover.current || busy.current || performance.now() < resumeAt.current) return;
    x.set(wrap(x.get() - (SPEED * delta) / 1000));
  });

  const nudge = (dir: 1 | -1) => {
    busy.current = true;
    const step = 380 + GAP;
    animate(x, x.get() - dir * step, {
      duration: 0.9,
      ease: EASE,
      onComplete: () => {
        x.set(wrap(x.get()));
        busy.current = false;
        resumeAt.current = performance.now() + 2500;
      },
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { down: true, startX: e.clientX, startOffset: x.get(), moved: false };
    busy.current = true;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = true;
    if (d.moved) x.set(wrap(d.startOffset + dx));
  };
  const endDrag = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    busy.current = false;
    resumeAt.current = performance.now() + 2500;
  };

  const progress = useTransform(x, (v) => (setWidth ? -v / setWidth : 0));
  const backdropX = useTransform(x, (v) => v * 0.25);

  const renderSet = (copy: number) =>
    HIGHLIGHTS.map((item, i) => (
      <Card
        key={`${copy}-${item.id}`}
        item={item}
        index={i}
        onOpen={() => !drag.current.moved && onOpen(i)}
        className={LAYOUT[i % LAYOUT.length]}
      />
    ));

  return (
    <section id="highlights" className="relative overflow-hidden border-t border-white/10 bg-ink-2 py-28 md:py-36">
      <motion.p
        aria-hidden
        style={{ x: backdropX }}
        className="pointer-events-none absolute bottom-0 left-0 select-none whitespace-nowrap font-serif text-[22vw] italic leading-none text-white/[0.03] md:text-[16vw]"
      >
        Highlights &amp; milestones · Highlights &amp; milestones
      </motion.p>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <Reveal>
          <Intro />
        </Reveal>
        <Reveal delay={0.15}>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => nudge(d)}
                aria-label={d === -1 ? 'Previous highlights' : 'Next highlights'}
                className="grid h-14 w-14 place-items-center rounded-full border border-white/15 transition-all duration-500 hover:border-gold hover:bg-gold hover:text-ink"
              >
                {d === -1 ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div
          className="relative mt-16 cursor-grab touch-pan-y select-none active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          onMouseEnter={() => (hover.current = true)}
          onMouseLeave={() => {
            hover.current = false;
            endDrag();
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <motion.div style={{ x }} className="flex h-[440px] w-max items-stretch md:h-[560px]">
            {[0, 1].map((copy) => (
              <div key={copy} ref={copy === 0 ? setRef : undefined} className="flex h-full items-stretch" style={{ gap: GAP, paddingRight: GAP }} aria-hidden={copy === 1}>
                {renderSet(copy)}
              </div>
            ))}
          </motion.div>
        </div>
      </Reveal>

      <div className="relative mx-auto mt-10 flex max-w-7xl items-center gap-6 px-6 md:px-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute">{pad(HIGHLIGHTS.length)} moments</span>
        <div className="relative h-px flex-1 bg-white/10">
          <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-gold" />
        </div>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-mute md:block">Hover to pause · drag to browse</span>
      </div>
    </section>
  );
};

/* ---------- Section ---------- */

const Highlights: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((dir: 1 | -1) => setOpen((o) => (o === null ? o : (o + dir + HIGHLIGHTS.length) % HIGHLIGHTS.length)), []);
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    },
    [step]
  );
  const current = open !== null ? HIGHLIGHTS[open] : null;

  return (
    <>
      <Gallery onOpen={setOpen} paused={open !== null} />

      <Modal open={open !== null} onClose={() => setOpen(null)} label="Highlight" wide onKey={onKey}>
        {current && (
          <div className="grid md:grid-cols-[1.3fr_1fr]">
            <div className="relative bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image + open}
                  src={asset(current.image)}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="max-h-[70vh] w-full object-contain md:max-h-[85vh]"
                />
              </AnimatePresence>
            </div>
            <div className="flex flex-col justify-between gap-8 p-8 md:p-10">
              <div>
                <p className="eyebrow">
                  Highlight {pad((open ?? 0) + 1)} / {pad(HIGHLIGHTS.length)}
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
    </>
  );
};

export default Highlights;
