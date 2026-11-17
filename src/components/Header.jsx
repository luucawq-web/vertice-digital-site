import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Logo, Symbol } from './Logo.jsx';
import { ArrowRight, MessageCircle, Mail, Instagram } from './Icons.jsx';
import MagneticButton from '@/components/ui/magnetic-button';
import { CONTACT, NAV_LINKS, whatsappLink } from '../config.js';

const QUOTE_MSG = 'Olá! Quero solicitar um orçamento de site com a Vértice Digital.';

// Seção visível agora (para destacar o item certo no menu).
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      let current = ids[0];
      for (const el of els) {
        if (el.getBoundingClientRect().top <= probe) current = el.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = ids[ids.length - 1];
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids.join('|')]);
  return active;
}

// Cápsula central com indicador que desliza até o item ativo ou sob o cursor.
function Dock({ active }) {
  const wrapRef = useRef(null);
  const itemRefs = useRef({});
  const [hover, setHover] = useState(null);
  const [pill, setPill] = useState({ x: 0, w: 0, ready: false });
  const target = hover || active;

  useLayoutEffect(() => {
    const el = itemRefs.current[target];
    const wrap = wrapRef.current;
    if (!el || !wrap) return;
    setPill({ x: el.offsetLeft, w: el.offsetWidth, ready: true });
  }, [target]);

  useEffect(() => {
    const onResize = () => {
      const el = itemRefs.current[target];
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth, ready: true });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [target]);

  return (
    <nav aria-label="Principal" className="dock relative hidden items-center rounded-full p-1.5 md:flex" ref={wrapRef} onMouseLeave={() => setHover(null)}>
      <span
        aria-hidden="true"
        className="dock-pill absolute top-1.5 bottom-1.5 rounded-full"
        style={{ transform: `translateX(${pill.x - 6}px)`, width: pill.w, opacity: pill.ready ? 1 : 0 }}
      />
      {NAV_LINKS.map((l) => {
        const id = l.href.slice(1);
        const isActive = active === id;
        return (
          <a
            key={l.href}
            href={l.href}
            ref={(n) => (itemRefs.current[id] = n)}
            onMouseEnter={() => setHover(id)}
            onFocus={() => setHover(id)}
            aria-current={isActive ? 'true' : undefined}
            className={`relative z-10 rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors duration-300 ${target === id ? 'text-white' : 'text-mist/65 hover:text-white'}`}
          >
            {l.label}
          </a>
        );
      })}
    </nav>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progressRef = useRef(null);
  const active = useActiveSection(NAV_LINKS.map((l) => l.href.slice(1)));

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        setScrolled(y > 24);
        if (Math.abs(y - lastY) > 6) {
          setHidden(y > lastY && y > 320);
          lastY = y;
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* barra de progresso de leitura */}
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[2px]">
        <div ref={progressRef} className="h-full origin-left bg-gradient-to-r from-royal via-cyan to-royal" style={{ transform: 'scaleX(0)' }} />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${hidden && !open ? '-translate-y-[120%]' : 'translate-y-0'}`}
      >
        <div className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 transition-[padding] duration-500 sm:px-6 md:grid-cols-[1fr_auto_1fr] ${scrolled ? 'pt-3' : 'pt-5'}`}>
          {/* marca */}
          <a href="#inicio" onClick={close} aria-label="Vértice Digital — início" className={`brand-chip justify-self-start rounded-full transition-all duration-500 ${scrolled ? 'is-compact' : ''}`}>
            <span className="flex items-end gap-2.5 px-3 py-2">
              <Symbol className="h-8 w-8 shrink-0 transition-transform duration-500 hover:rotate-[-8deg]" />
              <span className="brand-word inline-flex flex-col gap-[5px] overflow-hidden pb-0.5 pt-[6px]">
                <span className="text-[17px] font-semibold leading-[0.8] tracking-[0.14em] text-white">VÉRTICE</span>
                <span className="flex justify-between text-[6.5px] leading-[0.8] text-royal" aria-hidden="true">
                  {'DIGITAL'.split('').map((c, i) => <span key={i}>{c}</span>)}
                </span>
              </span>
            </span>
          </a>

          <Dock active={active} />

          {/* CTA desktop */}
          <div className="hidden justify-self-end md:block">
            <MagneticButton
              as="a"
              href={whatsappLink(QUOTE_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              strength={0.3}
              className="cta-ring group relative inline-flex whitespace-nowrap items-center gap-3 rounded-full p-1.5 text-sm font-semibold text-white lg:pl-5"
              aria-label="Solicitar orçamento"
            >
              <span className="hidden lg:inline">Solicitar orçamento</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-royal text-white transition-transform duration-500 group-hover:rotate-[-45deg]">
                <ArrowRight size={16} />
              </span>
            </MagneticButton>
          </div>

          {/* botão mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="burger glass-chip relative grid h-12 w-12 place-items-center rounded-full md:hidden"
          >
            <span className={`burger-line ${open ? 'translate-y-0 rotate-45' : '-translate-y-[4px]'}`} />
            <span className={`burger-line ${open ? 'translate-y-0 -rotate-45' : 'translate-y-[4px]'}`} />
          </button>
        </div>
      </header>

      {/* menu mobile em tela cheia, revelado em círculo a partir do botão */}
      <div
        id="menu-mobile"
        aria-hidden={!open}
        className={`mobile-overlay fixed inset-0 z-[55] flex flex-col justify-between bg-navy px-6 pb-10 pt-28 md:hidden ${open ? 'is-open' : ''}`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-royal/25 blur-[100px]" />
          <Symbol className="absolute -bottom-16 -left-16 h-72 w-72 opacity-[0.06]" />
        </div>
        <nav aria-label="Menu mobile" className="relative flex flex-col gap-2">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="mobile-link flex items-baseline gap-4 border-b border-white/[0.06] py-4"
              style={{ transitionDelay: open ? `${180 + i * 70}ms` : '0ms' }}
            >
              <span className="text-sm font-semibold text-cyan">0{i + 1}</span>
              <span className="text-4xl font-extrabold uppercase tracking-tight text-white">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="mobile-link relative flex flex-col gap-4" style={{ transitionDelay: open ? '480ms' : '0ms' }}>
          <a href={whatsappLink(QUOTE_MSG)} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} onClick={close}
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-white">
            Solicitar orçamento <ArrowRight size={18} />
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-mist/70">
            <span className="flex items-center gap-2"><MessageCircle size={16} className="text-cyan" />{CONTACT.whatsappLabel}</span>
            {CONTACT.instagram && <span className="flex items-center gap-2"><Instagram size={16} className="text-cyan" />{CONTACT.instagram}</span>}
            {CONTACT.email && <span className="flex items-center gap-2"><Mail size={16} className="text-cyan" />{CONTACT.email}</span>}
          </div>
        </div>
      </div>
    </>
  );
}
