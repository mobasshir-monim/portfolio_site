import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';
import { Reveal, EASE } from './ui/Reveal';

const email = SOCIAL_LINKS.find((l) => l.url.startsWith('mailto:'))?.url.replace('mailto:', '') ?? '';

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 pt-28 md:pt-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-3">
            <span>07</span>
            <span className="h-px w-8 bg-gold/50" />
            <span>Contact</span>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-serif text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.9] tracking-tight">
            Let's build something <em className="text-gold-soft">meaningful.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={`mailto:${email}`} className="btn-primary group !px-8 !py-4 !text-base">
              Write to me
              <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
            </a>
            <button onClick={copy} className="btn-ghost relative !py-4 font-mono !text-[13px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'ok' : 'copy'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex items-center gap-2"
                >
                  {copied ? <Check size={15} className="text-gold" /> : <Copy size={15} />}
                  {copied ? 'Copied to clipboard' : email}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </Reveal>

        <div className="mt-28 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {SOCIAL_LINKS.map((link, i) => (
            <Reveal key={link.platform} delay={i * 0.05} className="bg-ink">
              <a
                href={link.url}
                target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 transition-colors duration-500 hover:bg-ink-2"
              >
                <span className="flex items-center gap-3 text-ivory">
                  <link.icon size={18} strokeWidth={1.5} className="text-mute transition-colors duration-500 group-hover:text-gold" />
                  {link.platform}
                </span>
                <ArrowUpRight size={16} className="text-mute transition-all duration-500 group-hover:rotate-45 group-hover:text-gold" />
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 py-10 text-sm text-mute md:flex-row md:items-center">
          <p>Bangladesh University of Engineering &amp; Technology</p>
          <p className="font-mono text-xs">© {new Date().getFullYear()} Mobasshir Monim</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 transition-colors hover:text-ivory"
          >
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold group-hover:text-gold">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>

      {/* Oversized signature */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="translate-y-[22%] whitespace-nowrap text-center font-serif text-[22vw] italic leading-none text-white/[0.035]">Monim</p>
      </div>
    </footer>
  );
};

export default Footer;
