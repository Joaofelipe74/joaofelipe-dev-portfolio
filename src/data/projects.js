/**
 * ============================================================================
 * PROJETOS EM DESTAQUE
 * ============================================================================
 * Para adicionar um novo projeto, basta acrescentar um novo objeto neste
 * array. Nenhum outro arquivo precisa ser tocado — a seção de Projetos e o
 * mockup 3D lêem esses dados automaticamente.
 *
 * Campos:
 *   id            -> identificador único (string curta, sem espaços)
 *   title         -> nome do projeto
 *   category      -> categoria exibida no card (ex: "Landing Page")
 *   description   -> descrição curta (1-2 frases)
 *   technologies  -> array de strings com as tecnologias usadas
 *   image         -> caminho da imagem (em /public/assets/projects/)
 *   liveUrl       -> link "Ver projeto" (use "#" se ainda não tiver)
 *   device        -> "desktop" | "mobile"  (define o tipo de mockup 3D)
 * ============================================================================
 */

export const projects = [
  {
    id: 'barbearia-garagem',
    title: 'Barbearia Garagem',
    category: 'Site Institucional',
    description:
      'Site institucional com identidade visual forte, agenda de horários e apresentação dos serviços da barbearia.',
    technologies: ['React', 'CSS', 'JavaScript'],
    // TODO: substitua pela screenshot real do projeto
    image: '/assets/projects/barbearia-garagem.png',
    liveUrl: 'https://joaofelipe74.github.io/barbearia-garagem/', // TODO: link real do projeto
    device: 'desktop',
  },
  {
    id: 'desu-burguer',
    title: 'Desu Burguer',
    category: 'Landing Page',
    description:
      'Landing page para hamburgueria com cardápio digital, destaque de combos e chamada direta para pedidos.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    // TODO: substitua pela screenshot real do projeto
    image: '/assets/projects/desu-burguer.jpg',
    liveUrl: 'https://joaofelipe74.github.io/desu-burgue/', // TODO: link real do projeto
    device: 'desktop',
    imageFit: 'contain',
    screenRatio: '1894 / 917',
  },
  {
    id: 'estudio-fabricio-sardeli',
  title: 'Estúdio Fabrício Sardeli',
  category: 'Site Institucional',
  description:
    'Site institucional desenvolvido para estúdio, com apresentação profissional dos serviços, identidade visual e contato direto com o cliente.',
  technologies: ['HTML', 'CSS', 'JavaScript'],
  image: '/assets/projects/estudio-fabricio-sardeli.jpg',
  liveUrl: 'https://joaofelipe74.github.io/estudio-fabricio-sardeli/',
  device: 'desktop',
  },

  {
    id: 'sistema-agendamento',
    title: 'Sistema de Gestão e Agendamento',
    category: 'Sistema Web Full Stack',
    description:
      'Agendamento online com escolha de serviço, profissional e horário, área do cliente e painel administrativo para organizar a rotina do negócio.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    image: '/assets/projects/sistema-agendamento.svg',
    liveUrl: 'https://jf-dev-system-number-one-two.vercel.app/',
    device: 'desktop',
    imageFit: 'contain',
    screenRatio: '16 / 9',
  },

  // 👇 Exemplo de como adicionar um novo projeto no futuro:S
  // {
  //   id: 'novo-projeto',
  //   title: 'Nome do Projeto',
  //   category: 'Sistema Web',
  //   description: 'Descrição curta do que o projeto faz.',
  //   technologies: ['React', '.NET', 'SQL'],
  //   image: '/assets/projects/novo-projeto.jpg',
  //   liveUrl: 'https://...',
  //   device: 'desktop',
  // },
];
