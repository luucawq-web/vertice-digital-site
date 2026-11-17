// Informações de contato e links da Vértice Digital.
// Campos com null aparecem como espaço reservado no site até serem preenchidos.
export const CONTACT = {
  whatsappNumber: '5583993097670',
  whatsappLabel: '(83) 99309-7670',
  email: 'verticetech586@gmail.com',
  instagram: '@vertice.techbr',
  instagramUrl: 'https://instagram.com/vertice.techbr',
  city: 'João Pessoa, PB',
  cityMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('João Pessoa, PB'),
};

const DEFAULT_MESSAGE = 'Olá! Vim pelo site da Vértice Digital e quero conversar sobre um projeto.';

export const whatsappLink = (message = DEFAULT_MESSAGE) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

// Para usar uma imagem licenciada no destaque da primeira dobra (ex.: robô e cérebro digital),
// coloque o caminho aqui, ex.: '/assets/hero-robo-cerebro.jpg'. Com null, a arte própria em código é usada.
export const HERO_IMAGE = null;

export const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
];
