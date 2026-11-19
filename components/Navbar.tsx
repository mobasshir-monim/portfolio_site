import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { EASE } from './ui/Reveal';

const sectionIds = NAV_ITEMS.filter((i) => i.href.startsWith('#')).map((i) => i.href.slice(1));

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/' || !location.pathname.startsWith('/youtube');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is in view
  useEffect(() => {
    if (!onHome) {
      setActive('');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    const els = [...sectionIds, 'home'].map((id) => document.getElementById(id)).filter(Boolean) as Element[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome, location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return onHome && (active === 'home' || active === '');
    if (href.startsWith('#')) return onHome && active === href.slice(1);
    return location.pathname === href;
  };

  const go = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      if (onHome) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      else navigate('/', { state: { scrollTo: id } });
    } else if (href === '/' && onHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const linkFor = (item: (typeof NAV_ITEMS)[number], className: string, children: React.ReactNode) =>
    item.href.startsWith('#') ? (
      <a key={item.label} href={item.href} onClick={(e) => go(e, item.href)} className={className}>
        {children}
      </a>
    ) : (
      <Link key={item.label} to={item.href} onClick={(e) => go(e, item.href)} className={className}>
        {children}
      </Link>
    );

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-gold/40 via-gold to-gold-soft"
      />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-700 md:px-6 ${
            scrolled ? 'border border-white/10 bg-ink/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl' : 'border border-transparent'
          }`}
        >
          <Link to="/" onClick={(e) => go(e, '/')} className="group flex items-center gap-3" aria-label="Home">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 font-serif text-lg italic text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
              M
            </span>
            <span className="hidden text-sm font-medium tracking-wide text-ivory sm:block">
              Mobasshir Monim
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) =>
              linkFor(
                item,
                `relative rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${isActive(item.href) ? 'text-ink' : 'text-mute hover:text-ivory'}`,
                <>
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-ivory"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => go(e, '#contact')}
              className="hidden items-center gap-1.5 rounded-full border border-gold/40 px-4 py-2 text-[13px] text-gold-soft transition-colors duration-500 hover:bg-gold hover:text-ink md:inline-flex"
            >
              Let's talk <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"
            >
              <span className={`absolute h-px w-4 bg-ivory transition-transform duration-500 ${open ? 'rotate-45' : '-translate-y-1'}`} />
              <span className={`absolute h-px w-4 bg-ivory transition-transform duration-500 ${open ? '-rotate-45' : 'translate-y-1'}`} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ul className="space-y-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.05 }}
                >
                  {linkFor(
                    item,
                    `flex items-baseline gap-4 font-serif text-5xl ${isActive(item.href) ? 'text-gold-soft italic' : 'text-ivory'}`,
                    <>
                      <span className="font-mono text-xs text-mute">0{i + 1}</span>
                      {item.label}
                    </>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
