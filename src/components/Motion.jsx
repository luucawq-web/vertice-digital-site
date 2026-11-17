import { useEffect, useRef, useState, Fragment } from 'react';
import { Symbol } from './Logo.jsx';

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useInView(ref, options = { threshold: 0.2 }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return setInView(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return inView;
}

/**
 * Texto que surge palavra por palavra, subindo de dentro de uma máscara.
 * segments: [{ t: 'texto', className?: 'classe aplicada às palavras' }]
 */
export function WordReveal({ as: Tag = 'span', segments, className = '', delay = 0, stagger = 55, id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  let i = 0;
  return (
    <Tag ref={ref} id={id} className={`${className} ${inView ? 'words-in' : ''}`}>
      <span className="sr-only">{segments.map((s) => s.t).join('')}</span>
      <span aria-hidden="true">
        {segments.map((seg, si) => (
          <Fragment key={si}>
            {seg.t.split(/(\s+)/).map((w, wi) => {
              if (!w) return null;
              if (/^\s+$/.test(w)) return ' ';
              const d = delay + i++ * stagger;
              return (
                <span key={`${si}-${wi}`} className="word-mask">
                  <span className={`word ${seg.className || ''}`} style={{ transitionDelay: `${d}ms` }}>{w}</span>
                </span>
              );
            })}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

/** Palavra que troca sozinha, deslizando de baixo para cima. */
export function WordRotator({ words, interval = 2400, className = '' }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (prefersReduced()) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className={`rotator ${className}`} aria-live="polite">
      {words.map((w, i) => (
        <span key={w} className={`rotator-word ${i === idx ? 'is-active' : i === (idx - 1 + words.length) % words.length ? 'is-leaving' : ''}`} aria-hidden={i !== idx}>
          {w}
        </span>
      ))}
      <span className="invisible">{words.reduce((a, b) => (b.length > a.length ? b : a), '')}</span>
    </span>
  );
}

/** Card com inclinação 3D e luz que segue o cursor. */
export function TiltCard({ children, className = '', max = 8 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || prefersReduced()) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateY(-4px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      <span aria-hidden="true" className="tilt-spot" />
      {children}
    </div>
  );
}

/** Faixa infinita com os serviços, em duas linhas que correm em sentidos opostos. */
export function MarqueeBand({ items }) {
  const Row = ({ reverse, outline }) => (
    <div className={`flex w-max ${reverse ? 'marquee-rev' : 'marquee'}`}>
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={k === 1}>
          {items.map((t) => (
            <span key={`${k}-${t}`} className="flex items-center gap-10">
              <span className={`whitespace-nowrap text-4xl font-extrabold uppercase tracking-tight sm:text-6xl ${outline ? 'text-outline' : 'text-white'}`}>{t}</span>
              <Symbol className="h-8 w-8 shrink-0 sm:h-10 sm:w-10" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
  return (
    <section aria-label="Nossas especialidades" className="relative overflow-hidden py-14 sm:py-20">
      <div className="-rotate-2 scale-105 border-y border-white/[0.06] bg-white/[0.02] py-6 sm:py-8">
        <Row />
      </div>
      <div className="mt-6 rotate-1 scale-105 py-2 opacity-70">
        <Row reverse outline />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent sm:w-48" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent sm:w-48" />
    </section>
  );
}

/** Desloca levemente o conteúdo conforme o mouse e a rolagem (efeito de profundidade). */
export function useParallax(ref, { mouse = 14, scroll = 0.12 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0, s: 0 };
    let raf = 0;
    const tick = () => {
      const s = Math.min(window.scrollY, window.innerHeight) * scroll;
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      cur.s += (s - cur.s) * 0.15;
      el.style.setProperty('--px', `${cur.x}px`);
      el.style.setProperty('--py', `${cur.y + cur.s}px`);
      el.style.setProperty('--pxr', `${-cur.x * 1.6}px`);
      el.style.setProperty('--pyr', `${-cur.y * 1.6}px`);
      const moving = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) + Math.abs(s - cur.s) > 0.1;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * mouse;
      target.y = (e.clientY / window.innerHeight - 0.5) * mouse;
      kick();
    };
    if (fine) window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', kick, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', kick);
      cancelAnimationFrame(raf);
    };
  }, []);
}
