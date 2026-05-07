/** Catálogo de certificados (paths relativos a `public/`). Migração do HTML legado. */

export type CertLeaf = { title: string; imagePath: string };

export type CertGroup = {
  title: string;
  items: CertLeaf[];
};

export type CertCategory = {
  title: string;
  groups: CertGroup[];
};

export const CERTIFICATE_CATEGORIES: CertCategory[] = [
  {
    title: "Tecnologia e Programação",
    groups: [
      {
        title: "Python",
        items: [
          {
            title: "Introdução à Linguagem Python",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO INTRODUÇÃO À LINGUAGEM PYTHON/CERTIFICADO INTRODUÇÃO À LINGUAGEM PYTHON-page-00001.png",
          },
          {
            title: "Estruturas de Dados em Python",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO ESTRUTURAS DE DADOS EM PYTHON/CERTIFICADO ESTRUTURAS DE DADOS EM PYTHON-page-00001.png",
          },
          {
            title: "Estruturas de Dados em Python (Certificado)",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO CERTIFICADO ESTRUTURAS DE DADOS EM PYTHON/CERTIFICADO CERTIFICADO ESTRUTURAS DE DADOS EM PYTHON-page-00001.png",
          },
          {
            title: "Introdução à Análise de Dados com Python",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO INTRODUÇÃO À ANÁLISE DE DADOS COM PYTHON/CERTIFICADO INTRODUÇÃO À ANÁLISE DE DADOS COM PYTHON-page-00001.png",
          },
        ],
      },
      {
        title: "Tecnologias Digitais",
        items: [
          {
            title: "Tecnologias de Informação Aplicadas ao Direito",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO TECNOLOGIAS DE INFORMAÇÃO APLICADAS AO DIREITO/CERTIFICADO TECNOLOGIAS DE INFORMAÇÃO APLICADAS AO DIREITO-page-00001.png",
          },
          {
            title: "Tecnologia, Direito Digital e Propriedade Intelectual",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO   TECNOLOGIA    DIREITO DIGITAL  E   PROPRIEDADE INRETERLECTUAL/CERTIFICADO   TECNOLOGIA    DIREITO DIGITAL  E   PROPRIEDADE INRETERLECTUAL-page-00001.png",
          },
        ],
      },
    ],
  },
  {
    title: "Negócios e Gestão",
    groups: [
      {
        title: "Gestão Empresarial",
        items: [
          {
            title: "Modelos de Gestão",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO Modelos de Gestão/CERTIFICADO Modelos de Gestão-page-00001.png",
          },
          {
            title: "Planejamento Estratégico",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO PLANEJAMENTO ESTRATÉGICO/CERTIFICADO PLANEJAMENTO ESTRATÉGICO-page-00001.png",
          },
          {
            title: "Empreendedorismo e Inovação",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO EMPREENDEDORISMO E INOVÇÃO/CERTIFICADO EMPREENDEDORISMO E INOVÇÃO-page-00001.png",
          },
        ],
      },
      {
        title: "Negócios Internacionais",
        items: [
          {
            title: "Planejamento e Desenvolvimento de Negócios Internacionais",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO PLANEJAMENTO E DESENVOLVIMENTO DE NEGÓCIOS INTERNACIONAIS/CERTIFICADO PLANEJAMENTO E DESENVOLVIMENTO DE NEGÓCIOS INTERNACIONAIS-page-00001.png",
          },
          {
            title: "Economia Política Mundial",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO      ECONOMIA PILÍTICA MUNDIA     GEOGRAFIA PILÍTICA/CERTIFICADO      ECONOMIA PILÍTICA MUNDIA     GEOGRAFIA PILÍTICA-page-00001.png",
          },
          {
            title: "Direito Internacional",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO DIREITO INTERNACIONAL/CERTIFICADO DIREITO INTERNACIONAL-page-00001.png",
          },
          {
            title: "Negócios Internacionais",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO NEGÓCIOS INTERNACIONAIS/CERTIFICADO NEGÓCIOS INTERNACIONAIS-page-00001.png",
          },
        ],
      },
    ],
  },
  {
    title: "Finanças e Investimentos",
    groups: [
      {
        title: "Análise Financeira",
        items: [
          {
            title: "Análise de Investimentos e Fontes de Financiamento",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO ANALISE DE INVESTIMENTOS E FONTES DE FINANCIAMENTO/CERTIFICADO ANALISE DE INVESTIMENTOS E FONTES DE FINANCIAMENTO-page-00001.png",
          },
          {
            title: "Capital de Giro e Análise Financeira",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO CAPITAL DE GIRO E ANALISE FINANCEIRA/CERTIFICADO CAPITAL DE GIRO E ANALISE FINANCEIRA-page-00001.png",
          },
          {
            title: "Mercado de Capitais",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO MERCADO DE CAPITAIS/CERTIFICADO MERCADO DE CAPITAIS-page-00001.png",
          },
        ],
      },
    ],
  },
  {
    title: "Idiomas",
    groups: [
      {
        title: "Certificações de Idiomas",
        items: [
          {
            title: "Língua Inglesa",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO LÍNGUA INGLESA 1/CERTIFICADO LÍNGUA INGLESA 1-page-00001. (1).png",
          },
          {
            title: "Língua Espanhola",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO LÍNGIA ESPANHOLA/CERTIFICADO LÍNGIA ESPANHOLA-page-00001.png",
          },
        ],
      },
    ],
  },
  {
    title: "Direito e Compliance",
    groups: [
      {
        title: "Especialização Jurídica",
        items: [
          {
            title: "Direito Eletrônico",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO DIREITO ELETRÔNICO/CERTIFICADO DIREITO ELETRÔNICO-page-00001.png",
          },
          {
            title: "Compliance e Governança Corporativa",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO DIREITO INTERNACIONAL/CERTIFICADO DIREITO INTERNACIONAL-page-00001.png",
          },
        ],
      },
    ],
  },
  {
    title: "Serviço Social",
    groups: [
      {
        title: "Gestão Social",
        items: [
          {
            title: "Administração e Planejamento de Serviço Social",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO ADMINISTRAÇÃO E PLANEJAMENTO DE SERVIÇO SOCIAL/CERTIFICADO ADMINISTRAÇÃO E PLANEJAMENTO DE SERVIÇO SOCIAL-page-00001.png",
          },
          {
            title: "Serviço Social e Terceiro Setor",
            imagePath:
              "certificados/Todos PNGs/CERTIFICADO SERVIÇO SOCIAL E TERCEIRO SETOR/CERTIFICADO SERVIÇO SOCIAL E TERCEIRO SETOR-page-00001.png",
          },
        ],
      },
    ],
  },
];
