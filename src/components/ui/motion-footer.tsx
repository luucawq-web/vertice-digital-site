"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/magnetic-button";
import { Symbol } from "@/components/Logo.jsx";
import { CONTACT, whatsappLink } from "@/config.js";

// Rodapé cinematográfico adaptado para a Vértice Digital.
// Baseado no componente "motion-footer": efeito de cortina (o rodapé fica fixo por baixo
// do conteúdo e é revelado ao rolar), aurora, grade, texto gigante e marquee diagonal.
// As animações de rolagem foram reescritas sem GSAP (requestAnimationFrame + interpolação),
// mantendo o mesmo comportamento de "scrub" suave.

const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: color-mix(in oklch, var(--foreground) 4%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 9%, transparent);
  --pill-bg-1-hover: color-mix(in oklch, var(--primary) 22%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--secondary) 45%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--primary) 35%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}
@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}
@keyframes footer-scroll-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px color-mix(in oklch, var(--secondary) 45%, transparent)); }
  15%, 45% { transform: scale(1.22); filter: drop-shadow(0 0 10px color-mix(in oklch, var(--secondary) 85%, transparent)); }
  30% { transform: scale(1); }
}
.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }
.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--primary) 9%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--primary) 9%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}
.footer-aurora {
  background: radial-gradient(circle at 50% 50%,
    color-mix(in oklch, var(--primary) 30%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 14%, transparent) 40%,
    transparent 70%);
}
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight), inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s, color 0.4s;
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 0 20px 40px -10px var(--pill-shadow-hover), inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}
.footer-giant-bg-text {
  font-size: 26vw; line-height: 0.75; font-weight: 900; letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--secondary) 12%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 26%, transparent) 0%, transparent 62%);
  -webkit-background-clip: text; background-clip: text;
}
.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 45%, transparent) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  filter: drop-shadow(0 0 22px color-mix(in oklch, var(--primary) 35%, transparent));
}
@media (prefers-reduced-motion: reduce) {
  .animate-footer-breathe, .animate-footer-scroll-marquee, .animate-footer-heartbeat { animation: none; }
}
`;

const MARQUEE = ["Criação de Sites", "Landing Pages", "Sites Institucionais", "Design Responsivo", "Tecnologia que impulsiona negócios"];

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    {MARQUEE.map((t, i) => (
      <React.Fragment key={t}>
        <span>{t}</span>
        <span className={i % 2 ? "text-secondary/70" : "text-primary/80"} aria-hidden="true">✦</span>
      </React.Fragment>
    ))}
  </div>
);

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function CinematicFooter({ id = "contato" }: { id?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apply = (p1: number, p2: number, p3: number) => {
      const g = giantTextRef.current, h = headingRef.current, l = linksRef.current;
      if (g) {
        g.style.transform = `translate(-50%, ${(1 - p1) * 10}vh) scale(${0.8 + 0.2 * p1})`;
        g.style.opacity = String(p1);
      }
      if (h) { h.style.transform = `translateY(${(1 - p2) * 50}px)`; h.style.opacity = String(p2); }
      if (l) { l.style.transform = `translateY(${(1 - p3) * 50}px)`; l.style.opacity = String(p3); }
    };
    if (reduced) { apply(1, 1, 1); return; }

    const cur = { a: 0, b: 0, c: 0 };
    let raf = 0;
    const targets = () => {
      const vh = window.innerHeight;
      const top = wrap.getBoundingClientRect().top;
      // equivalente aos gatilhos "top 80%" e "top 40%" até "bottom bottom"
      const a = clamp((0.8 * vh - top) / (0.8 * vh));
      const b = clamp((0.4 * vh - top) / (0.4 * vh));
      const c = clamp((0.4 * vh - top) / (0.4 * vh) * 1.15 - 0.15);
      return { a, b, c };
    };
    const tick = () => {
      const t = targets();
      cur.a += (t.a - cur.a) * 0.12;
      cur.b += (t.b - cur.b) * 0.12;
      cur.c += (t.c - cur.c) * 0.12;
      apply(cur.a, cur.b, cur.c);
      const settled = Math.abs(t.a - cur.a) + Math.abs(t.b - cur.b) + Math.abs(t.c - cur.c) < 0.002;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  const pill = "footer-glass-pill rounded-full flex items-center gap-3 group";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div id={id} ref={wrapperRef} className="relative h-screen min-h-[640px] w-full" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
        <footer aria-labelledby="footer-title" className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen min-h-[640px] w-full flex-col justify-between overflow-hidden bg-background text-foreground">
          <div className="footer-aurora animate-footer-breathe pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]" />
          <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

          <div ref={giantTextRef} aria-hidden="true" className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 select-none whitespace-nowrap" style={{ transform: "translate(-50%, 10vh) scale(0.8)", opacity: 0 }}>
            VÉRTICE
          </div>

          {/* marquee diagonal */}
          <div className="absolute left-0 top-12 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-border/50 bg-background/60 py-4 shadow-2xl backdrop-blur-md">
            <div className="animate-footer-scroll-marquee flex w-max text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground md:text-sm">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* conteúdo central */}
          <div className="relative z-10 mx-auto mt-24 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
            <div ref={headingRef} className="mb-10 flex flex-col items-center gap-4 text-center" style={{ opacity: 0 }}>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Contato</span>
              <h2 id="footer-title" className="footer-text-glow text-5xl font-black tracking-tighter md:text-8xl">Vamos começar?</h2>
              <p className="max-w-xs text-base text-muted-foreground sm:max-w-lg md:text-lg">Seu próximo nível digital começa com uma conversa.</p>
            </div>

            <div ref={linksRef} className="flex w-full flex-col items-center gap-6" style={{ opacity: 0 }}>
              <div className="grid w-full max-w-sm grid-cols-1 gap-3 md:flex md:max-w-none md:flex-wrap md:justify-center md:gap-4">
                <MagneticButton as="a" href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={cn(pill, "justify-center px-6 py-4 text-sm font-bold text-foreground md:px-10 md:py-5 md:text-base")}>
                  <svg className="h-6 w-6 text-secondary transition-colors group-hover:text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                  WhatsApp {CONTACT.whatsappLabel}
                </MagneticButton>
                {CONTACT.email && (
                  <MagneticButton as="a" href={`mailto:${CONTACT.email}`} className={cn(pill, "justify-center px-6 py-4 text-sm font-bold text-foreground md:px-10 md:py-5 md:text-base")}>
                    <svg className="h-6 w-6 text-secondary transition-colors group-hover:text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    {CONTACT.email}
                  </MagneticButton>
                )}
              </div>

              <div className="mt-1 flex w-full flex-wrap items-center justify-center gap-x-7 gap-y-3 md:mt-2 md:gap-5">
                {CONTACT.instagram && (
                  <MagneticButton as="a" href={CONTACT.instagramUrl ?? "#"} target="_blank" rel="noopener noreferrer" className={"group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:rounded-full md:border md:border-border/50 md:bg-background/40 md:px-6 md:py-3 md:backdrop-blur"}>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><path d="M17.5 6.5h.01" /></svg>
                    {CONTACT.instagram}
                  </MagneticButton>
                )}
                {CONTACT.city && (
                  <MagneticButton as="a" href={CONTACT.cityMapsUrl ?? "#"} target="_blank" rel="noopener noreferrer" className={"group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:rounded-full md:border md:border-border/50 md:bg-background/40 md:px-6 md:py-3 md:backdrop-blur"} aria-label={`Ver ${CONTACT.city} no Google Maps`}>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    {CONTACT.city}
                  </MagneticButton>
                )}
                <MagneticButton as="a" href="#servicos" className={cn("group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:rounded-full md:border md:border-border/50 md:bg-background/40 md:px-6 md:py-3 md:backdrop-blur", "hidden md:inline-flex")}>
                  Nossos serviços
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* barra inferior */}
          <div className="relative z-20 flex w-full flex-row items-center justify-between gap-4 px-6 pb-6 md:grid md:grid-cols-[1fr_auto_1fr] md:px-12 md:pb-8">
            <div className="max-w-[220px] text-[10px] font-semibold uppercase leading-relaxed tracking-widest text-muted-foreground md:max-w-none md:text-xs">
              © {year} Vértice Digital<span className="hidden 2xl:inline">. Todos os direitos reservados</span>
            </div>
            <div className="footer-glass-pill hidden cursor-default items-center gap-2 rounded-full border-border/50 px-6 py-3 md:flex">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground md:text-xs">Conectando ideias</span>
              <span className="animate-footer-heartbeat inline-block"><Symbol className="h-5 w-5" /></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground md:text-xs">à inovação</span>
            </div>
            <MagneticButton as="button" type="button" onClick={scrollToTop} aria-label="Voltar ao topo" className="footer-glass-pill group flex h-12 w-12 shrink-0 md:justify-self-end items-center justify-center rounded-full text-muted-foreground hover:text-foreground">
              <svg className="h-5 w-5 transform transition-transform duration-300 group-hover:-translate-y-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
