// Ícones de traço no padrão Lucide (24×24, traço 2, pontas arredondadas).
// Em um projeto com acesso ao npm, podem ser trocados 1:1 pelos componentes do pacote lucide-react.
const Base = ({ children, size = 24, className = '', strokeWidth = 2, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...rest}
  >
    {children}
  </svg>
);

export const Menu = (p) => (
  <Base {...p}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></Base>
);
export const X = (p) => (
  <Base {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Base>
);
export const ArrowRight = (p) => (
  <Base {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Base>
);
export const Sparkles = (p) => (
  <Base {...p}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z" />
    <path d="M19 3v4" /><path d="M21 5h-4" />
  </Base>
);
export const Monitor = (p) => (
  <Base {...p}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></Base>
);
export const Target = (p) => (
  <Base {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Base>
);
export const Building = (p) => (
  <Base {...p}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
  </Base>
);
export const Smartphone = (p) => (
  <Base {...p}><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></Base>
);
export const Gem = (p) => (
  <Base {...p}><path d="M6 3h12l4 6-10 13L2 9Z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" /></Base>
);
export const Zap = (p) => (
  <Base {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></Base>
);
export const Gauge = (p) => (
  <Base {...p}><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></Base>
);
export const Lightbulb = (p) => (
  <Base {...p}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" /><path d="M10 22h4" />
  </Base>
);
export const Cpu = (p) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" />
    <path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
  </Base>
);
export const TrendingUp = (p) => (
  <Base {...p}><path d="M22 7 13.5 15.5 8.5 10.5 2 17" /><path d="M16 7h6v6" /></Base>
);
export const MessageCircle = (p) => (
  <Base {...p}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></Base>
);
export const Mail = (p) => (
  <Base {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Base>
);
export const Instagram = (p) => (
  <Base {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <path d="M17.5 6.5h.01" />
  </Base>
);
export const MapPin = (p) => (
  <Base {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Base>
);
export const Check = (p) => (
  <Base {...p}><path d="M20 6 9 17l-5-5" /></Base>
);
export const ArrowUp = (p) => (
  <Base {...p}><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></Base>
);
