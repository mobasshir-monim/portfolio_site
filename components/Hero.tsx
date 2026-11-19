import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { HERO_TEXT, SOCIAL_LINKS, CERTIFICATES, PROJECTS, RESUME_ACHIEVEMENTS_ROVER, RESUME_ACHIEVEMENTS_LEADERSHIP } from '../constants';
import { asset } from '../lib/asset';
import { EASE } from './ui/Reveal';

// "An Engineer, A Youtuber & A Learner" -> ["Engineer", "Youtuber", "Learner"]
const roles = HERO_TEXT.headline
  .split(/,|&/)
  .map((r) => r.trim().replace(/^an?\s+/i, ''))
  .filter(Boolean);

const stats = [
  { value: PROJECTS.length, label: 'Featured projects' },
  { value: CERTIFICATES.length, label: 'Certifications' },
  { value: RESUME_ACHIEVEMENTS_ROVER.length, label: 'Rover challenge placings' },
  { value: RESUME_ACHIEVEMENTS_LEADERSHIP.length, label: 'Startup & leadership honours' },
];

const Counter: React.FC<{ to: number; delay?: number }> = ({ to, delay = 0 }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now() + delay * 1000;
      const tick = (t: number) => {
        const p = Math.min(1, Math.max(0, (t - start) / 1400));
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, delay]);
  return <span ref={ref}>{String(n).padStart(2, '0')}</span>;
};

const word = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 1.1, ease: EASE, delay: 0.15 + i * 0.12 } }),
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveRole((r) => (r + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Pointer spotlight + portrait tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 80, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x);
    my.set(y);
    e.currentTarget.style.setProperty('--x', `${x * 100}%`);
    e.currentTarget.style.setProperty('--y', `${y * 100}%`);
  };

  const ringText = `${roles.join(' • ')} • `.toUpperCase().repeat(2);

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-32 [--x:70%] [--y:30%]"
    >
      {/* Ambient layers */}
      <div className="hairline-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{ background: 'radial-gradient(650px circle at var(--x) var(--y), rgba(201,169,110,0.10), transparent 60%)' }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-[1.25fr_1fr]">
        {/* Copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-mute backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            {HERO_TEXT.subBio}
          </motion.p>

          <h1 className="font-serif text-[clamp(3.6rem,10vw,9rem)] leading-[0.88] tracking-[-0.02em]">
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" variants={word} initial="hidden" animate="show" custom={0}>
                {HERO_TEXT.greeting.replace(/!$/, '')} — I'm
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.em className="block text-gold-soft" variants={word} initial="hidden" animate="show" custom={1}>
                Monim.
              </motion.em>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-serif text-2xl md:text-3xl"
          >
            {roles.map((r, i) => (
              <React.Fragment key={r}>
                {i > 0 && <span className="h-1 w-1 rounded-full bg-white/25" />}
                <span className="relative">
                  <span className={`transition-colors duration-700 ${i === activeRole ? 'text-ivory' : 'text-white/25'}`}>{r}</span>
                  {i === activeRole && (
                    <motion.span layoutId="role-underline" className="absolute -bottom-1 left-0 right-0 h-px bg-gold" transition={{ duration: 0.7, ease: EASE }} />
                  )}
                </span>
              </React.Fragment>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.85 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-mute md:text-lg"
          >
            {HERO_TEXT.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a href="#projects" className="btn-primary group">
              View selected work
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
            </a>
            <a href={asset('/Monim_cv.pdf')} download="Monim_cv.pdf" className="btn-ghost">
              <Download size={16} /> Résumé
            </a>
            <div className="ml-1 flex items-center gap-1">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="grid h-10 w-10 place-items-center rounded-full text-mute transition-colors duration-300 hover:bg-white/5 hover:text-gold-soft"
                >
                  <link.icon size={17} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="relative mx-auto mt-8 w-full max-w-[440px] [perspective:1200px] lg:mt-24"
        >
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative">
            <div className="absolute -inset-6 rounded-t-full border border-white/[0.06]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl border border-white/10 bg-ink-3">
              <motion.img
                style={{ y: imgY, scale: 1.12, transformOrigin: '50% 0%' }}
                src={asset('/monim.webp')}
                alt="Portrait of Mobasshir Monim"
                className="h-full w-full object-cover object-[60%_0%] saturate-[0.85] transition-[filter] duration-700 hover:saturate-100"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            </div>

            {/* Rotating ring */}
            <div className="absolute -left-8 -top-4 hidden h-32 w-32 sm:block">
              <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
                <defs>
                  <path id="ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-gold font-mono" fontSize="7.2" letterSpacing="1.6">
                  <textPath href="#ring">{ringText.slice(0, 64)}</textPath>
                </text>
              </svg>
              <span className="absolute inset-0 grid place-items-center font-serif text-3xl italic text-gold">✦</span>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.2 }}
              className="absolute -bottom-5 -left-4 rounded-2xl border border-white/10 bg-ink/80 px-5 py-4 backdrop-blur-xl md:-left-10"
            >
              <p className="eyebrow !text-[10px]">Mechanical Engineering</p>
              <p className="mt-1 font-serif text-xl">BUET, Dhaka</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto mt-24 w-full max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.1 + i * 0.08 }}
              className={`py-6 pr-6 ${i > 0 ? 'md:border-l md:border-white/10 md:pl-6' : ''} ${i % 2 === 1 ? 'border-l border-white/10 pl-6 md:pl-6' : ''}`}
            >
              <p className="font-serif text-5xl text-ivory md:text-6xl">
                <Counter to={s.value} delay={1.2 + i * 0.1} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-mute">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.a
        href="#skills"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-mute md:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
};

export default Hero;
