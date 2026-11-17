import Header from './components/Header.jsx';
import { Hero, About, Services, Differentials, CallToAction } from './components/Sections.jsx';
import { MarqueeBand } from './components/Motion.jsx';
import Portfolio from './components/Portfolio.jsx';
import CinematicFooter from '@/components/ui/motion-footer';

export default function App() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="relative z-10 bg-navy">
        <Hero />
        <About />
        <Services />
        <MarqueeBand items={['Criação de sites', 'Landing pages', 'Sites institucionais', 'Design responsivo', 'Estratégia digital']} />
        <Portfolio />
        <Differentials />
        <CallToAction />
      </main>
      <CinematicFooter />
    </>
  );
}
