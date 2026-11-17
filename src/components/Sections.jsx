import Reveal from './Reveal.jsx';
import KineticGrid from '@/components/ui/kinetic-grid';
import MagneticButton from '@/components/ui/magnetic-button';
import HeroVisual from './HeroVisual.jsx';
import { Symbol } from './Logo.jsx';
import { WordReveal, WordRotator, TiltCard } from './Motion.jsx';
import {
  ArrowRight, Sparkles, Monitor, Target, Building, Smartphone, Gem, Gauge, Lightbulb, Cpu, TrendingUp, Check,
} from './Icons.jsx';
import { whatsappLink } from '../config.js';

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-royal/30 bg-royal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
    {children}
  </span>
);

const SectionTitle = ({ eyebrow, title, center = false, id }) => (
  <div className={`flex flex-col gap-5 ${center ? 'items-center text-center' : 'items-start'}`}>
    {eyebrow && <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>}
    <WordReveal
      as="h2"
      id={id}
      segments={Array.isArray(title) ? title : [{ t: title }]}
      className="max-w-3xl text-balance text-3xl font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[44px]"
    />
  </div>
);

/* ---------------------------------- HERO ---------------------------------- */
export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      <KineticGrid globalColor="vertice">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-royal/15 blur-[120px]" />
          <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-cyan/[0.07] blur-[140px]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy" />
        </div>
        <div className="pt-[80px] lg:pt-[88px]">
          <div className="relative mx-auto flex min-h-[calc(100svh-80px)] max-w-7xl flex-col gap-6 px-5 pb-6 pt-5 [&>*]:min-w-0 sm:px-8 sm:pt-8 lg:grid lg:min-h-[calc(100svh-88px)] lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:py-10">
            <div className="flex flex-col items-start gap-5 sm:gap-7 [@media(max-height:700px)]:gap-4">
              <Reveal>
                <Eyebrow>
                  <Sparkles size={14} /> <span className="hidden sm:inline">Especialistas em</span>
                  <WordRotator words={['criação de sites', 'landing pages', 'sites institucionais', 'design responsivo']} className="text-white" />
                </Eyebrow>
              </Reveal>
              <WordReveal
                as="h1"
                id="hero-title"
                delay={120}
                stagger={70}
                className="text-balance text-[38px] [@media(max-height:700px)]:text-[32px] font-extrabold uppercase leading-[1.04] tracking-tight text-white sm:text-[54px] lg:text-[60px]"
                segments={[{ t: 'Seu negócio merece um ' }, { t: 'próximo nível', className: 'text-gradient' }, { t: ' digital.' }]}
              />
              <Reveal delay={420}>
                <p className="max-w-lg text-lg leading-relaxed text-mist/75 [@media(max-height:700px)]:text-base">
                  Criamos sites modernos, estratégicos e profissionais para posicionar sua empresa no mundo digital.
                </p>
              </Reveal>
              <Reveal delay={520} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <MagneticButton as="a" href={whatsappLink('Olá! Quero meu site com a Vértice Digital.')} target="_blank" rel="noopener noreferrer"
                  className="btn-primary btn-shine group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 [@media(max-height:700px)]:py-3 text-base font-semibold text-white">
                  Quero meu site <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton as="a" href="#servicos" strength={0.25} className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 [@media(max-height:700px)]:py-3 text-base font-semibold text-white">
                  Conheça nossos serviços
                </MagneticButton>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative min-h-[120px] flex-1 [@media(max-height:700px)]:min-h-[96px] lg:min-h-0 lg:flex-none">
              <div className="absolute inset-0 flex justify-center lg:static lg:block">
                <HeroVisual />
              </div>
            </Reveal>
          </div>
        </div>
      </KineticGrid>
    </section>
  );
}

/* ---------------------------------- SOBRE --------------------------------- */
const PILLARS = [
  { icon: Lightbulb, title: 'Criatividade', text: 'Ideias visuais únicas, pensadas para a identidade de cada marca.' },
  { icon: Cpu, title: 'Tecnologia', text: 'Sites rápidos, seguros e construídos com ferramentas modernas.' },
  { icon: TrendingUp, title: 'Estratégia', text: 'Cada página com um objetivo claro: conectar sua empresa a clientes.' },
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative py-16 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7">
          <SectionTitle eyebrow="Sobre a Vértice" id="sobre-title" title={[{ t: 'Mais que um site. ' }, { t: 'Uma experiência digital.', className: 'text-gradient' }]} />
          <Reveal delay={150} className="flex flex-col gap-4 text-lg leading-relaxed text-mist/75">
            <p>Na Vértice Digital, acreditamos que um site vai muito além de uma presença na internet.</p>
            <p>É uma ferramenta estratégica para fortalecer marcas, conquistar clientes e gerar novas oportunidades.</p>
            <p className="text-white">Unimos criatividade, tecnologia e estratégia para desenvolver experiências digitais que conectam empresas às pessoas.</p>
          </Reveal>
        </div>

        <div className="relative">
          <Symbol className="spin-slow pointer-events-none absolute -right-6 -top-16 hidden h-72 w-72 opacity-[0.04] lg:block" />
          <ul className="relative flex flex-col gap-4">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 120} className="reveal-left">
                <TiltCard max={5} className="card flex items-start gap-5 rounded-3xl p-6 sm:p-7">
                  <span className="icon-tile icon-pulse"><Icon size={24} /></span>
                  <span className="flex flex-col gap-1.5">
                    <span className="text-xl font-bold text-white">{title}</span>
                    <span className="leading-relaxed text-mist/70">{text}</span>
                  </span>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- SERVIÇOS -------------------------------- */
const SERVICES = [
  { icon: Monitor, title: 'Criação de Sites', text: 'Sites profissionais, modernos e personalizados para destacar sua empresa na internet.' },
  { icon: Target, title: 'Landing Pages', text: 'Páginas estratégicas desenvolvidas para atrair visitantes e transformar acessos em oportunidades.' },
  { icon: Building, title: 'Sites Institucionais', text: 'Apresente sua empresa, seus serviços e seus diferenciais com profissionalismo e credibilidade.' },
  { icon: Smartphone, title: 'Design Responsivo', text: 'Experiências adaptadas para computadores, tablets e smartphones.' },
];

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative py-16 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[420px] max-w-4xl rounded-full bg-royal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle eyebrow="Nossos serviços" center id="servicos-title" title={[{ t: 'Soluções digitais para ' }, { t: 'impulsionar seu negócio.', className: 'text-gradient' }]} />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 110} className="reveal-scale h-full">
              <TiltCard className="service-card group relative flex h-full flex-col gap-5 rounded-3xl p-7">
                <span className="icon-tile transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]"><Icon size={26} /></span>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="leading-relaxed text-mist/70">{text}</p>
                <span className="mt-auto flex items-center justify-between pt-2 text-sm font-semibold text-cyan">
                  <span className="opacity-80 transition-opacity group-hover:opacity-100">0{i + 1}</span>
                  <ArrowRight size={18} className="-translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------- DIFERENCIAIS ------------------------------ */
const DIFFS = [
  { icon: Gem, title: 'Design exclusivo e profissional', text: 'Nada de modelo pronto: cada layout nasce da sua marca.' },
  { icon: Smartphone, title: 'Otimizado para celular', text: 'Experiência impecável em qualquer tamanho de tela.' },
  { icon: Gauge, title: 'Navegação rápida e intuitiva', text: 'Páginas leves, fáceis de usar e de encontrar.' },
  { icon: Target, title: 'Foco nos seus objetivos', text: 'Desenvolvimento guiado pelo que o seu negócio precisa alcançar.' },
];

export function Differentials() {
  return (
    <section id="diferenciais" aria-labelledby="dif-title" className="relative py-16 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="reveal-left">
          <div className="diff-hero relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-[32px] p-8 sm:p-10">
            <Symbol className="float-slow pointer-events-none absolute -right-12 -top-12 h-64 w-64 opacity-20" left="#DCE3EF" right="#00CFFF" />
            <div aria-hidden="true" className="diff-scan pointer-events-none absolute inset-0" />
            <span className="relative text-xs font-semibold uppercase tracking-[0.22em] text-cyan">Diferenciais</span>
            <WordReveal
              as="h2"
              id="dif-title"
              className="relative max-w-md text-3xl font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-4xl"
              segments={[{ t: 'Tecnologia com propósito. ' }, { t: 'Resultados com estratégia.', className: 'text-gradient' }]}
            />
          </div>
        </Reveal>
        <ul className="grid gap-5 sm:grid-cols-2">
          {DIFFS.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 110} className="reveal-scale h-full">
              <TiltCard max={6} className="card group flex h-full flex-col gap-4 rounded-3xl p-7">
                <div className="flex items-center justify-between">
                  <span className="icon-tile"><Icon size={24} /></span>
                  <span className="text-4xl font-extrabold text-white/[0.07] transition-colors duration-500 group-hover:text-royal/40">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="leading-relaxed text-mist/70">{text}</p>
                <span aria-hidden="true" className="mt-auto h-[2px] w-full origin-left scale-x-0 rounded bg-gradient-to-r from-royal to-cyan transition-transform duration-700 group-hover:scale-x-100" />
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------- CTA ---------------------------------- */
export function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="relative px-5 py-16 sm:px-8 sm:py-24">
      <Reveal className="reveal-scale">
        <div className="cta-box relative mx-auto max-w-6xl overflow-hidden rounded-[36px] px-7 py-16 text-center sm:px-14 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="cta-orb absolute -left-20 -top-24 h-72 w-72 rounded-full bg-cyan/30 blur-[100px]" />
            <div className="cta-orb-alt absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-white/20 blur-[110px]" />
            <div className="cta-grid absolute inset-0 opacity-40" />
          </div>
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
            <WordReveal
              as="h2"
              id="cta-title"
              className="text-balance text-3xl font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-[44px]"
              segments={[{ t: 'Sua próxima grande ideia começa com uma presença digital forte.' }]}
            />
            <p className="max-w-2xl text-lg leading-relaxed text-white/85">
              Vamos transformar sua ideia em um projeto digital que represente o verdadeiro potencial da sua empresa.
            </p>
            <MagneticButton as="a" href={whatsappLink('Olá! Quero começar meu projeto com a Vértice Digital.')} target="_blank" rel="noopener noreferrer"
              className="btn-shine group mt-3 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold tracking-wide text-navy shadow-[0_18px_40px_rgba(4,10,28,0.35)]">
              COMECE SEU PROJETO <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
