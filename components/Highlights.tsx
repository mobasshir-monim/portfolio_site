import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { HIGHLIGHTS } from '../constants';
import { HighlightItem } from '../types';
import { asset } from '../lib/asset';
import { EASE } from './ui/Reveal';
import Modal from './ui/Modal';

const pad = (n: number) => String(n).padStart(2, '0');

// Gallery rhythm: height, aspect ratio and vertical alignment repeat every 4 cards
const LAYOUT = [
  'h-[62vh] aspect-[4/5] self-center',
  'h-[46vh] aspect-[3/4] self-end',
  'h-[52vh] aspect-square self-start',
  'h-[48vh] aspect-[4/5] self-end',
];

const useIsDesktop = () => {
  const query = '(min-width: 1024px)';
  const [is, setIs] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setIs(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return is;
};

/* ---------- Card ---------- */

const Card: React.FC<{
  item: HighlightItem;
  index: number;
  onOpen: () => void;
  progress?: MotionValue<number>;
  className?: string;
}> = ({ item, index, onOpen, progress, className = '' }) => {
  const zero = useMotionValue(0);
  // Inner parallax: the photo drifts against the direction of travel
  const imgX = useTransform(progress ?? zero, [0, 1], ['6%', '-6%']);

  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 1, ease: EASE, delay: (index % 4) * 0.05 }}
      className={`group relative shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-ink-3 text-left ${className}`}
      aria-label={`Open highlight: ${item.title}`}
    >
      <motion.img
        src={asset(item.image)}
        alt={item.title}
        loading="lazy"
        draggable={false}
        style={progress ? { x: imgX, scale: 1.15 } : undefined}
        className="absolute inset-0 h-full w-full object-cover grayscale-[40%] transition-[filter] duration-700 group-hover:grayscale-0"
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
    </motion.button>
  );
};

const Intro: React.FC = () => (
  <>
    <p className="eyebrow mb-5 flex items-center gap-3">
      <span>01</span>
      <span className="h-px w-8 bg-gold/50" />
      <span>Moments</span>
    </p>
    <h2 className="font-serif text-5xl leading-[0.92] tracking-tight md:text-6xl xl:text-7xl">
      Highlights &amp; <em className="text-gold-soft">milestones.</em>
    </h2>
    <p className="mt-6 max-w-sm leading-relaxed text-mute">
      Stages, awards and rooms I've been lucky to stand in — pitching, presenting, performing and building.
    </p>
  </>
);

/* ---------- Desktop: vertical scroll drives a pinned horizontal gallery ---------- */

const PinnedGallery: React.FC<{ onOpen: (i: number) => void }> = ({ onOpen }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (t) setDistance(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const x = useTransform(smooth, (p) => -p * distance);
  const introX = useTransform(smooth, [0, 0.25], ['0%', '-25%']);
  const introOpacity = useTransform(smooth, [0, 0.18], [1, 0.2]);
  const backdropX = useTransform(smooth, [0, 1], ['8%', '-45%']);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(HIGHLIGHTS.length - 1, Math.max(0, Math.round(p * (HIGHLIGHTS.length - 1)))));
  });

  const jump = (dir: 1 | -1) => {
    const el = sectionRef.current;
    if (!el) return;
    const step = (el.offsetHeight - window.innerHeight) / (HIGHLIGHTS.length - 1);
    window.scrollBy({ top: dir * step, behavior: 'smooth' });
  };

  return (
    <section
      id="highlights"
      ref={sectionRef}
      style={{ height: `calc(100vh + ${distance}px)` }}
      className="relative border-t border-white/10 bg-ink-2"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <motion.p
          aria-hidden
          style={{ x: backdropX }}
          className="pointer-events-none absolute bottom-[-5vh] left-0 select-none whitespace-nowrap font-serif text-[30vh] italic leading-none text-white/[0.03]"
        >
          Highlights &amp; milestones
        </motion.p>

        <div className="relative flex flex-1 items-center pt-24">
          <motion.div
            ref={trackRef}
            style={{ x, paddingLeft: 'max(2.5rem, calc((100vw - 80rem) / 2 + 2.5rem))' }}
            className="flex h-[66vh] items-stretch gap-8 pr-[10vw]"
          >
            <motion.div style={{ x: introX, opacity: introOpacity }} className="flex w-[34vw] max-w-[500px] shrink-0 flex-col justify-center pr-6">
              <Intro />
              <p className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-mute">
                Scroll to explore
                <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                  <ArrowRight size={14} className="text-gold" />
                </motion.span>
              </p>
            </motion.div>

            {HIGHLIGHTS.map((item, i) => (
              <Card key={item.id} item={item} index={i} onOpen={() => onOpen(i)} progress={smooth} className={LAYOUT[i % LAYOUT.length]} />
            ))}
          </motion.div>
        </div>

        {/* Rail: counter, progress, controls */}
        <div className="relative mx-auto flex w-full max-w-7xl items-center gap-8 px-10 pb-8">
          <div className="flex items-baseline gap-2 font-serif">
            <span className="relative inline-block h-[1.15em] w-[1.25em] overflow-hidden text-4xl text-ivory">
              <AnimatePresence initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0"
                >
                  {pad(active + 1)}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-lg text-mute">/ {pad(HIGHLIGHTS.length)}</span>
          </div>
          <div className="relative h-px flex-1 bg-white/10">
            <motion.div style={{ scaleX: smooth }} className="absolute inset-0 origin-left bg-gold" />
          </div>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => jump(d)}
                aria-label={d === -1 ? 'Previous highlight' : 'Next highlight'}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 transition-all duration-500 hover:border-gold hover:bg-gold hover:text-ink"
              >
                {d === -1 ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Mobile / tablet: swipeable snap carousel ---------- */

const SwipeGallery: React.FC<{ onOpen: (i: number) => void }> = ({ onOpen }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: trackRef });
  const bar = useSpring(scrollXProgress, { stiffness: 140, damping: 30 });

  return (
    <section id="highlights" className="relative overflow-hidden border-t border-white/10 bg-ink-2 py-24">
      <div className="px-6 md:px-10">
        <Intro />
      </div>
      <div
        ref={trackRef}
        className="mt-12 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-6 pb-4 [scroll-padding-inline:1.5rem] [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {HIGHLIGHTS.map((item, i) => (
          <Card
            key={item.id}
            item={item}
            index={i}
            onOpen={() => onOpen(i)}
            className={`snap-start ${i % 2 === 0 ? 'h-[460px] w-[78vw] md:w-[380px]' : 'h-[400px] w-[66vw] md:w-[320px]'}`}
          />
        ))}
      </div>
      <div className="mx-6 mt-6 h-px bg-white/10 md:mx-10">
        <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-gold" />
      </div>
    </section>
  );
};

/* ---------- Section ---------- */

const Highlights: React.FC = () => {
  const isDesktop = useIsDesktop();
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
      {isDesktop ? <PinnedGallery onOpen={setOpen} /> : <SwipeGallery onOpen={setOpen} />}

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
