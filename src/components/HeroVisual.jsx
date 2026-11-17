import { LEFT, RIGHT, GROOVES } from '../symbol.js';
import { HERO_IMAGE } from '../config.js';
import { Gem, Smartphone, Zap } from './Icons.jsx';
import { useRef } from 'react';
import { useParallax } from './Motion.jsx';

// Pontos de luz espalhados ao redor do cérebro digital.
const PARTICLES = [
  [96, 120, 2.2, 0], [520, 90, 1.8, 0.6], [560, 300, 2.4, 1.2], [70, 340, 1.6, 1.8],
  [140, 520, 2, 0.9], [470, 560, 1.8, 1.5], [300, 30, 1.6, 0.3], [40, 220, 1.4, 2.1],
  [585, 190, 1.4, 2.4], [430, 20, 1.2, 1.1], [180, 40, 1.4, 1.9], [520, 440, 1.6, 0.4],
];

// Trilhas de circuito que descem do vértice até o ponto de luz (coordenadas do símbolo).
const TRACES = [
  'M256 456 V600',
  'M256 486 L214 508 V585',
  'M256 498 L298 520 V585',
  'M256 470 L178 500 V552',
  'M256 476 L334 506 V560',
];
const NODES = [[214, 585], [298, 585], [178, 552], [334, 560], [214, 508], [298, 520], [178, 500], [334, 506]];

function CodeArt() {
  return (
    <svg viewBox="0 0 600 680" className="h-full w-full overflow-visible" role="img" aria-label="Cérebro digital luminoso no formato do símbolo da Vértice Digital, conectado a circuitos">
      <defs>
        <radialGradient id="hv-glow" cx="50%" cy="42%" r="50%">
          <stop offset="0" stopColor="#2166F3" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#2166F3" stopOpacity="0.14" />
          <stop offset="1" stopColor="#07132F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hv-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#DCE3EF" stopOpacity="0.28" />
          <stop offset="1" stopColor="#DCE3EF" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="hv-right" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2166F3" stopOpacity="0.65" />
          <stop offset="1" stopColor="#2166F3" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="hv-floor" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#00CFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#00CFFF" stopOpacity="0" />
        </radialGradient>
        <filter id="hv-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <pattern id="hv-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#2166F3" strokeOpacity="0.12" strokeWidth="1" />
        </pattern>
        <radialGradient id="hv-gridfade" cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hv-gridmask">
          <rect width="600" height="680" fill="url(#hv-gridfade)" />
        </mask>
      </defs>

      <rect width="600" height="680" fill="url(#hv-grid)" mask="url(#hv-gridmask)" />
      <ellipse cx="300" cy="280" rx="290" ry="270" fill="url(#hv-glow)" className="pulse-glow" />

      <g transform="translate(31 6) scale(1.05)">
        <g className="float-slow">
          {/* brilho difuso */}
          <g filter="url(#hv-blur)" opacity="0.85">
            <path d={LEFT} fill="none" stroke="#00CFFF" strokeWidth="6" />
            <path d={RIGHT} fill="none" stroke="#2166F3" strokeWidth="6" />
          </g>
          {/* hemisférios */}
          {/* fundo sólido: impede que a grade animada apareça através do V */}
          <path d={LEFT} fill="#07132F" />
          <path d={RIGHT} fill="#07132F" />
          <path d={LEFT} fill="url(#hv-left)" stroke="#DCE3EF" strokeOpacity="0.85" strokeWidth="2.2" />
          <path d={RIGHT} fill="url(#hv-right)" stroke="#00CFFF" strokeWidth="2.2" />
          {/* sulcos como sinapses */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            {GROOVES.map((d, i) => (
              <path key={`b${i}`} d={d} stroke="#00CFFF" strokeOpacity="0.35" strokeWidth="5" />
            ))}
            {GROOVES.map((d, i) => (
              <path key={`s${i}`} d={d} stroke="#BDF3FF" strokeWidth="2.4" className="synapse" style={{ animationDelay: `${(i % 7) * -0.45}s` }} />
            ))}
          </g>
        </g>

        {/* circuitos */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {TRACES.map((d, i) => (
            <path key={`t${i}`} d={d} stroke="#2166F3" strokeOpacity="0.55" strokeWidth="2" />
          ))}
          {TRACES.map((d, i) => (
            <path key={`p${i}`} d={d} pathLength="100" stroke="#00CFFF" strokeWidth="2.6" className="trace" style={{ animationDelay: `${i * -0.5}s` }} />
          ))}
        </g>
        <g fill="#00CFFF">
          {NODES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.6" className="twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </g>
        <ellipse cx="256" cy="606" rx="92" ry="11" fill="url(#hv-floor)" className="pulse-glow" />
        <ellipse cx="256" cy="606" rx="26" ry="4" fill="#E6FBFF" />
      </g>

      <g fill="#7FE6FF">
        {PARTICLES.map(([x, y, r, d], i) => (
          <circle key={i} cx={x} cy={y} r={r} className="twinkle" style={{ animationDelay: `${d}s` }} />
        ))}
      </g>
    </svg>
  );
}

function Chip({ icon: Icon, title, text, className }) {
  return (
    <div className={`glass absolute flex items-center gap-3 rounded-2xl px-4 py-3 ${className}`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-royal/90 text-white shadow-[0_0_24px_rgba(33,102,243,0.55)]">
        <Icon size={20} />
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-white">{title}</span>
        <span className="text-xs text-mist/70">{text}</span>
      </span>
    </div>
  );
}

export default function HeroVisual() {
  const ref = useRef(null);
  useParallax(ref, { mouse: 16, scroll: 0.1 });
  return (
    <div ref={ref} className="relative aspect-[600/680] h-full max-w-full lg:mx-auto lg:h-auto lg:w-full lg:max-w-[480px]">
      <div className="h-full w-full" style={{ transform: 'translate3d(var(--px, 0px), var(--py, 0px), 0)' }}>
        {HERO_IMAGE ? (
          <img
            src={HERO_IMAGE}
            alt="Robô contemplando um cérebro digital luminoso"
            className="h-full w-full rounded-[32px] object-cover [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]"
          />
        ) : (
          <CodeArt />
        )}
      </div>
    </div>
  );
}
