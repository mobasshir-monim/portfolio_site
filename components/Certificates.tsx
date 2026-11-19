import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Expand } from 'lucide-react';
import { CERTIFICATES } from '../constants';
import { CertificateCategory, CertificateItem } from '../types';
import { asset } from '../lib/asset';
import { SectionHeading, Reveal, EASE } from './ui/Reveal';
import Modal from './ui/Modal';

const categories: CertificateCategory[] = ['Awards', 'Machine Learning', 'Data Science', 'Matlab', 'Programming', 'Entrepreneurship', 'Leadership', 'Other'];
const catsOf = (c: CertificateItem) => (Array.isArray(c.category) ? c.category : [c.category]);
const PAGE = 9;

const Certificates: React.FC = () => {
  const [selected, setSelected] = useState<CertificateCategory[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<CertificateItem | null>(null);

  const counts = useMemo(() => {
    const m = new Map<CertificateCategory, number>();
    CERTIFICATES.forEach((c) => catsOf(c).forEach((k) => m.set(k, (m.get(k) ?? 0) + 1)));
    return m;
  }, []);

  const toggle = (c: CertificateCategory) => {
    setShowAll(false);
    setSelected((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const filtered = selected.length === 0 ? CERTIFICATES : CERTIFICATES.filter((c) => catsOf(c).some((k) => selected.includes(k)));
  const visible = showAll ? filtered : filtered.slice(0, PAGE);

  const pill = (active: boolean) =>
    `rounded-full border px-4 py-2 text-[13px] transition-all duration-300 ${
      active ? 'border-ivory bg-ivory text-ink' : 'border-white/10 text-mute hover:border-white/30 hover:text-ivory'
    }`;

  return (
    <section id="certificates" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="05"
          eyebrow="Credentials"
          title="Certifications &"
          italic="honours."
          description="Formal recognition along the way — from startup competitions to machine learning specialisations."
        />

        <Reveal>
          <div className="mb-12 flex flex-wrap gap-2">
            <button onClick={() => { setSelected([]); setShowAll(false); }} className={pill(selected.length === 0)}>
              All <span className="ml-1 opacity-50">{CERTIFICATES.length}</span>
            </button>
            {categories
              .filter((c) => counts.get(c))
              .map((c) => (
                <button key={c} onClick={() => toggle(c)} className={pill(selected.includes(c))} aria-pressed={selected.includes(c)}>
                  {c} <span className="ml-1 opacity-50">{counts.get(c)}</span>
                </button>
              ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((cert) => (
              <motion.article
                layout
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-2 transition-colors duration-500 hover:border-gold/30"
              >
                <button onClick={() => setOpen(cert)} className="relative aspect-[16/10] overflow-hidden bg-ink-3" aria-label={`View ${cert.title}`}>
                  <img
                    src={asset(cert.image)}
                    alt={cert.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 transition-all duration-[1.2s] ease-out-expo group-hover:scale-105 group-hover:opacity-100"
                  />
                  <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ink/60 text-ivory opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                    <Expand size={14} />
                  </span>
                </button>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{catsOf(cert).join(' · ')}</p>
                  <h3 className="mt-3 font-serif text-2xl leading-snug text-ivory">{cert.title}</h3>
                  <div className="mt-auto flex items-center justify-between pt-6 text-sm">
                    <span className="text-mute">{cert.issuer}</span>
                    <span className="font-mono text-xs text-mute">{cert.date}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length > PAGE && (
          <div className="mt-14 flex justify-center">
            <button onClick={() => setShowAll((s) => !s)} className="btn-ghost">
              {showAll ? 'Show fewer' : `Show all ${filtered.length}`}
            </button>
          </div>
        )}
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} label={open?.title ?? 'Certificate'} wide>
        {open && (
          <div>
            <div className="bg-black">
              <img src={asset(open.image)} alt={open.title} className="max-h-[70vh] w-full object-contain" />
            </div>
            <div className="flex flex-wrap items-end justify-between gap-6 p-8">
              <div>
                <p className="eyebrow">{catsOf(open).join(' · ')}</p>
                <h3 className="mt-3 font-serif text-3xl">{open.title}</h3>
                <p className="mt-2 text-mute">
                  {open.issuer} · {open.date}
                </p>
              </div>
              {open.credentialUrl && open.credentialUrl !== '#' && (
                <a href={open.credentialUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Verify credential <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Certificates;
