import Reveal from './Reveal.jsx';
import { WordReveal, TiltCard } from './Motion.jsx';
import { ArrowRight } from './Icons.jsx';
import { whatsappLink } from '../config.js';

import jacDesktop from '../assets/portfolio/jac-desktop.webp';
import jacMobile from '../assets/portfolio/jac-mobile.webp';
import jfDesktop from '../assets/portfolio/jf-desktop.webp';
import jfMobile from '../assets/portfolio/jf-mobile.webp';
import litDesktop from '../assets/portfolio/lit-desktop.webp';
import litMobile from '../assets/portfolio/lit-mobile.webp';

// Projetos reais desenvolvidos pela Vértice. Logos e rostos dos clientes
// aparecem borrados nas imagens; os nomes ficam de fora de propósito.
const PROJECTS = [
  {
    sector: 'Corretora de imóveis',
    title: 'Site imobiliário com busca de imóveis',
    text: 'Busca por tipo, bairro, faixa de preço e quartos, páginas para comprar e alugar, orientação sobre Minha Casa, Minha Vida e contato direto pelo WhatsApp.',
    tags: ['Site imobiliário', 'Busca de imóveis', 'WhatsApp'],
    desktop: jacDesktop,
    mobile: jacMobile,
    light: true,
  },
  {
    sector: 'Loja de moda masculina',
    title: 'Catálogo multimarcas com pedido pelo WhatsApp',
    text: 'Novidades, categorias, marcas, favoritos e sacola. O cliente escolhe as peças no site e finaliza o pedido com a equipe da loja.',
    tags: ['Loja virtual', 'Catálogo', 'Pedidos'],
    desktop: jfDesktop,
    mobile: jfMobile,
  },
  {
    sector: 'Confeitaria',
    title: 'Cardápio digital com pedidos online',
    text: 'Cardápio com fotos, combos, carrinho e acompanhamento de pedidos, com horário de funcionamento, entrega e retirada.',
    tags: ['Cardápio digital', 'Carrinho', 'Delivery'],
    desktop: litDesktop,
    mobile: litMobile,
    light: true,
  },
];

function Browser({ src, alt }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1426] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] sm:rounded-2xl">
      <div className="flex h-6 items-center gap-1.5 bg-[#111a30] px-3 sm:h-8 sm:gap-2 sm:px-4" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/15 sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-white/15 sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-white/15 sm:h-2.5 sm:w-2.5" />
        <span className="ml-3 hidden h-4 flex-1 rounded-full bg-white/[0.06] sm:block sm:max-w-[45%]" />
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="project-shot h-full w-full object-cover object-top" />
      </div>
    </div>
  );
}

function Phone({ src, alt, light }) {
  return (
    <div className="rounded-[22px] bg-gradient-to-b from-[#3a3f4b] via-[#12151c] to-[#2a2e38] p-[5px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/20 sm:rounded-[30px] sm:p-[7px]">
      <div className={`relative overflow-hidden rounded-[17px] pt-3 sm:rounded-[24px] sm:pt-5 ${light ? 'bg-white' : 'bg-black'}`}>
        <span aria-hidden="true" className="absolute left-1/2 top-1 h-2 w-8 -translate-x-1/2 rounded-full bg-black sm:top-1.5 sm:h-3 sm:w-12" />
        <img src={src} alt={alt} loading="lazy" decoding="async" className="block aspect-[390/800] w-full object-cover object-top" />
      </div>
    </div>
  );
}

function Mockup({ p, phoneClass }) {
  return (
    <div className="relative pb-8 pr-8 sm:pb-12 sm:pr-12">
      <Browser src={p.desktop} alt={`Site de ${p.sector.toLowerCase()} desenvolvido pela Vértice, versão para computador`} />
      <div className={`absolute bottom-0 right-0 ${phoneClass}`}>
        <Phone src={p.mobile} alt={`O mesmo site no celular`} light={p.light} />
      </div>
    </div>
  );
}

function Info({ p, index, big }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
        <span className="text-mist/40">0{index + 1}</span>
        <span className="h-px w-8 bg-cyan/40" />
        {p.sector}
      </span>
      <h3 className={`font-bold leading-tight text-white ${big ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>{p.title}</h3>
      <p className="max-w-xl leading-relaxed text-mist/70">{p.text}</p>
      <ul className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-mist/80">{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Portfolio() {
  const [featured, ...rest] = PROJECTS;
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="relative py-16 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-40 h-[480px] w-[80%] -translate-x-1/2 rounded-full bg-royal/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col items-start gap-5">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-royal/30 bg-royal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Projetos</span>
            </Reveal>
            <WordReveal
              as="h2"
              id="projetos-title"
              className="max-w-3xl text-balance text-3xl font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[44px]"
              segments={[{ t: 'Sites que já ' }, { t: 'desenvolvemos.', className: 'text-gradient' }]}
            />
          </div>
          <Reveal delay={150}>
            <p className="max-w-md text-lg leading-relaxed text-mist/70">
              Cada projeto nasce da identidade do cliente, sem modelo pronto, e funciona tanto no computador quanto no celular.
            </p>
          </Reveal>
        </div>

        {/* destaque */}
        <Reveal className="reveal-scale mt-12 sm:mt-16">
          <article className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
            <TiltCard max={4} className="project group">
              <Mockup p={featured} phoneClass="w-[26%] max-w-[170px]" />
            </TiltCard>
            <Info p={featured} index={0} big />
          </article>
        </Reveal>

        {/* demais projetos */}
        <div className="mt-16 grid gap-14 sm:mt-24 md:grid-cols-2 md:gap-10 lg:gap-14">
          {rest.map((p, i) => (
            <Reveal as="article" key={p.sector} delay={i * 140} className="reveal-scale flex flex-col gap-8">
              <TiltCard max={5} className="project group">
                <Mockup p={p} phoneClass="w-[27%] max-w-[140px]" />
              </TiltCard>
              <Info p={p} index={i + 1} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-4 text-center sm:mt-20">
          <p className="text-mist/70">Quer o próximo projeto da lista com a cara da sua empresa?</p>
          <a href={whatsappLink('Olá! Vi os projetos no site da Vértice e quero um site para a minha empresa.')} target="_blank" rel="noopener noreferrer"
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold text-white">
            Quero um site assim <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
