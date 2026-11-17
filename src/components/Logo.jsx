import { useId } from 'react';
import { SYMBOL_VIEWBOX, LEFT, RIGHT, GROOVES } from '../symbol.js';

// Símbolo oficial: hemisfério esquerdo cinza-claro, direito azul royal, sulcos vazados.
export function Symbol({ className = '', left = '#DCE3EF', right = '#2166F3', title }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      viewBox={SYMBOL_VIEWBOX}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      <defs>
        <mask id={`m${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="512" height="512">
          <rect width="512" height="512" fill="#fff" />
          {GROOVES.map((d, i) => (
            <path key={i} d={d} stroke="#000" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          ))}
        </mask>
      </defs>
      <g mask={`url(#m${id})`}>
        <path d={LEFT} fill={left} />
        <path d={RIGHT} fill={right} />
      </g>
    </svg>
  );
}

// Logo completo: símbolo + VÉRTICE + DIGITAL justificado.
export function Logo({ size = 'md', className = '' }) {
  const s = {
    sm: { sym: 'h-8 w-8', word: 'text-[17px]', sub: 'text-[6.5px]', gap: 'gap-2.5', inner: 'gap-[5px]' },
    md: { sym: 'h-10 w-10', word: 'text-xl', sub: 'text-[7.5px]', gap: 'gap-3', inner: 'gap-1.5' },
    lg: { sym: 'h-14 w-14', word: 'text-[28px]', sub: 'text-[10.5px]', gap: 'gap-4', inner: 'gap-2' },
  }[size];
  return (
    <span className={`inline-flex items-end ${s.gap} ${className}`}>
      <Symbol className={`${s.sym} shrink-0`} />
      <span className={`inline-flex flex-col ${s.inner} pb-0.5`}>
        <span className={`${s.word} font-semibold leading-[0.8] tracking-[0.14em] -mr-[0.14em] text-white`}>VÉRTICE</span>
        <span className={`flex justify-between ${s.sub} leading-[0.8] text-royal`} aria-hidden="true">
          {'DIGITAL'.split('').map((c, i) => <span key={i}>{c}</span>)}
        </span>
      </span>
      <span className="sr-only">Vértice Digital</span>
    </span>
  );
}
