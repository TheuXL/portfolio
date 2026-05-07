export type ProjectDetail = {
  key: string;
  title: string;
  excerpt: string;
  image: string;
  description: string;
  stack: string;
  highlights: string[];
  repoLink?: string;
  liveLink?: string;
  projectLink?: string;
};

export const PROJECTS: ProjectDetail[] = [
  {
    key: "kingpay",
    title: "KingPay – Plataforma de Pagamentos e Antecipações",
    excerpt:
      "Sistema financeiro completo com processamento de pagamentos, antecipações de recebíveis, integrações com múltiplas adquirentes e proteção antifraude com IA.",
    image: "imagens/kingpay.png",
    description:
      "Sistema financeiro completo desenvolvido com Supabase Functions (Deno/TypeScript), oferecendo processamento de pagamentos, antecipações de recebíveis, gestão de carteira digital e integrações com múltiplas adquirentes. A solução implementa um ecossistema financeiro completo com alta segurança e performance para processamento transacional em tempo real, especializado em soluções para e-commerces e lojas de dropshipping. Destaque para a Proteção KingPay: Antifraude Avançado com Inteligência Artificial.",
    stack:
      "Deno, TypeScript, Supabase, PostgreSQL, Serverless Functions, JWT Authentication, Redis Cache, WebHooks, BaaS Integration, Next.js (Frontend)",
    highlights: [
      "Proteção KingPay: Sistema antifraude avançado com inteligência artificial para detecção proativa de transações suspeitas em tempo real",
      "Arquitetura serverless escalável baseada em funções independentes por domínio, permitindo manutenção e evolução isolada de componentes",
      "Sistema avançado de antecipação de recebíveis com cálculos automáticos de taxas, juros e prazos personalizados por empresa",
      "Integração com mais de 20 gateways de pagamento diferentes, com tratamento unificado de callbacks e normalização de status",
      "Implementação de mecanismos de segurança como locks distribuídos e cache para evitar processamento duplicado de transações",
      "Sistema de permissões granular baseado em perfis e funções com autenticação JWT e validação de senhas financeiras para operações críticas",
      "Módulo completo de saques via PIX com múltiplas integrações BaaS (Banking as a Service) e validação anti-fraude",
      "Gestão financeira com cálculos automáticos de reserva financeira, divisão de valores (split payments) e controle de movimentações",
      "Webhook inteligente para notificação em tempo real de clientes sobre mudanças de status em transações e processamentos financeiros",
    ],
    projectLink: "https://kingpaybr.com.br/",
  },
  {
    key: "hello-app",
    title: "Hello – Assistente Virtual com IA (Android)",
    excerpt:
      "Assistente Android (Flutter) com comandos de voz para interagir com outros apps.",
    image: "imagens/Logo Hello.jpg",
    description:
      "Assistente virtual inovador desenvolvido para Android utilizando Flutter e serviços de IA avançados. O aplicativo opera em segundo plano e permite que os usuários interajam por voz com outros aplicativos instalados, como WhatsApp e Instagram, criando uma experiência de uso fluida e natural através do dispositivo.",
    stack:
      "Flutter, Node.js, Python, IA (NLP Models, OpenAI), AWS, DynamoDB, PostgreSQL, Background Services",
    highlights: [
      "Arquitetura híbrida combinando Flutter com código nativo para otimização de performance em serviços em segundo plano",
      "Implementação de sistema de processamento de linguagem natural com modelos de IA personalizados para comando de voz em português",
      "Desenvolvimento de middleware para comunicação segura entre aplicativos de terceiros sem comprometer dados do usuário",
      "Integração com AWS para processamento de IA distribuído, reduzindo o consumo de bateria em dispositivos de baixo desempenho",
      "Sistema de aprendizado contínuo que melhora o reconhecimento de comandos baseado em interações do usuário",
      "Uso combinado de bancos NoSQL (DynamoDB) para dados voláteis e SQL (PostgreSQL) para informações estruturadas e relacionais",
    ],
  },
  {
    key: "boralaa",
    title: "Boralaa – Caronas Compartilhadas",
    excerpt: "App inspirado no BlaBlaCar com +10k downloads.",
    image: "imagens/boralaa.png",
    description:
      "Aplicativo mobile (+10 mil downloads) inspirado no BlaBlaCar para compartilhamento de caronas, com foco em localização e comunicação em tempo real.",
    stack: "React Native, Node.js, Python, Oracle Cloud, API REST, Jest",
    highlights: [
      "Funcionalidade de localização em tempo real.",
      "API RESTful robusta para comunicação frontend-backend.",
      "Testes automatizados com Jest para garantir estabilidade.",
      "Experiência de usuário intuitiva e mais de 10.000 downloads.",
    ],
    projectLink:
      "https://play.google.com/store/apps/details?id=com.boralaa&hl=pt_BR",
  },
  {
    key: "slot-machine",
    title: "Slot Machine Online",
    excerpt: "Jogo web responsivo com backend e transações.",
    image: "imagens/SlotMachine.jpg",
    description:
      "Plataforma web completa de jogo de caça-níqueis com frontend responsivo e backend robusto para gerenciamento de estados, transações e lógica de premiação. O sistema oferece uma experiência de jogo fluida com animações dinâmicas, mantendo a integridade das transações e a segurança dos usuários.",
    stack: "Node.js, JavaScript, HTML, CSS, PostgreSQL, WebSockets",
    highlights: [
      "Implementação de sistema criptograficamente seguro de geração de números pseudoaleatórios no backend para garantir resultados justos",
      "Arquitetura transacional com controle de concorrência para garantir consistência em operações de saldo mesmo com alto volume de usuários",
      "Sistema avançado de comunicação assíncrona via WebSockets para atualização em tempo real dos resultados sem refreshes de página",
      "Mecanismo de freespins e bônus com tabelas de probabilidade configuráveis e sistema de paylines dinâmico",
      "Interface responsiva com animações fluidas que se adapta de desktop a mobile mantendo a qualidade visual",
      "Painel administrativo para configuração de RTP (Return to Player), tabelas de pagamento e monitoramento de métricas de jogo",
    ],
  },
  {
    key: "hello-clips",
    title: "Hello Clips – Gerador de Vídeos Virais com IA",
    excerpt:
      "Plataforma que usa IA para criar clipes curtos e virais de vídeos longos.",
    image: "imagens/logo hello clips.jpg",
    description:
      "Plataforma Web/Mobile inovadora que utiliza inteligência artificial para transformar automaticamente vídeos longos em clips curtos de alto potencial viral. A aplicação analisa conteúdo, identifica momentos-chave e gera clipes legendados prontos para distribuição em redes sociais, similar ao Opus Clip mas com recursos avançados de análise semântica.",
    stack:
      "React, React Native, Node.js, Python (FastAPI/Flask), Celery, Redis, OpenCV, IA (GPT, Whisper), MongoDB, PostgreSQL, AWS",
    highlights: [
      "Implementação de sistema distribuído de processamento assíncrono capaz de analisar vídeos de até 3 horas em menos de 30 minutos",
      "Algoritmo proprietário de detecção de momentos virais combinando análise de áudio (Whisper), texto (GPT) e vídeo (OpenCV)",
      "Arquitetura de microserviços com balanceamento dinâmico de carga para otimizar recursos computacionais durante picos de uso",
      "Sistema inteligente de pontuação de viralidade baseado em análise de milhares de vídeos de sucesso em diferentes plataformas",
      "Editor de legendas com suporte a estilos visuais customizados e posicionamento inteligente para evitar elementos importantes na tela",
      "Capacidade de aprendizado progressivo que refina a detecção de momentos virais baseado no feedback de usuários e métricas de compartilhamento",
    ],
  },
  {
    key: "feedback-analyzer",
    title: "Feedback Analyzer – Análise Preditiva com IA",
    excerpt:
      "Sistema que transforma feedbacks de clientes em previsões de vendas usando IA.",
    image: "imagens/CRM.png",
    description:
      "Sistema de análise avançada de feedback de clientes para um grupo empresarial, utilizando processamento de linguagem natural para transformar dados qualitativos em insights quantitativos e previsões de tendências de vendas.",
    stack:
      "Python, Pandas, Matplotlib, OpenAI API (ChatGPT), Scikit-learn, FastAPI, PostgreSQL, Power BI",
    highlights: [
      "Integração com APIs de CRM para coleta e processamento automatizado de feedbacks de clientes.",
      "Utilização de modelos GPT da OpenAI para análise semântica profunda de sentimentos e opiniões.",
      "Algoritmos de machine learning para correlacionar padrões em feedbacks com desempenho de vendas.",
      "Dashboard interativo com visualizações de dados e projeções de crescimento por produto/segmento.",
      "Sistema de alertas para identificação precoce de problemas recorrentes em produtos específicos.",
      "Relatórios automáticos com recomendações acionáveis para equipes de produto e marketing.",
    ],
  },
  {
    key: "ina-project",
    title: "Inã – Sistema de Fiscalização Ambiental",
    excerpt:
      "Sistema para o Governo de Goiás de proteção ambiental e monitoramento.",
    image: "imagens/ina.png",
    description:
      "Aplicação completa desenvolvida para o Governo de Goiás focada na proteção ambiental, incluindo fiscalização de desmatamento, monitoramento de maus-tratos a animais e preservação de espécies ameaçadas. Como Engenheiro de Software Back-end no Grupo Youx, liderei a implementação de funcionalidades críticas do sistema.",
    stack:
      "React Native, Node.js, Vue.js, Java, Spring Boot, Spring Security, PostgreSQL, REST APIs, Testes Automatizados (Jest)",
    highlights: [
      "Desenvolvimento e otimização de APIs RESTful de alta performance para integração entre sistemas de campo e bases de dados governamentais",
      "Implementação de sistema de geolocalização avançado com recursos de roteirização inteligente para fiscalização em áreas remotas",
      "Arquitetura de microserviços com Spring Boot para garantir escalabilidade e permitir aumento significativo de usuários simultâneos",
      "Implementação de testes automatizados com Jest, alcançando cobertura de código superior a 85%",
      "Sistema de sincronização offline/online para operações em áreas sem conectividade, garantindo integridade dos dados",
      "Coordenação de aprimoramentos de performance que reduziram o tempo de resposta em 40%, melhorando a experiência de agentes em campo",
    ],
    projectLink: "https://youxgroup.com.br/ina/",
  },
  {
    key: "bernoulli-project",
    title: "Bernoulli – Aplicativo Mobile Institucional",
    excerpt:
      "Desenvolvimento mobile com integrações Azure, autenticação Azure AD B2C e design system próprio.",
    image: "imagens/bernoulli.png",
    description:
      "Engenheiro de Software Full-Stack atuando no desenvolvimento do aplicativo mobile da instituição. Responsável pelo desenvolvimento mobile, integrações com serviços Azure, autenticação com Azure AD B2C, design system próprio baseado em Gluestack, e documentação de componentes com Storybook, garantindo consistência visual e escalabilidade do produto.",
    stack:
      "React Native, Node.js, MongoDB, Azure DevOps, Azure AD B2C, Gluestack, Storybook, Design System, JavaScript, TypeScript",
    highlights: [
      "Desenvolvimento de aplicativo mobile institucional com React Native, garantindo performance e experiência de usuário otimizada",
      "Implementação de autenticação segura com Azure AD B2C, incluindo SSO e gerenciamento de identidades corporativas",
      "Criação de design system próprio baseado em Gluestack, assegurando consistência visual em toda a aplicação",
      "Documentação completa de componentes utilizando Storybook, facilitando manutenção e colaboração da equipe",
      "Integração com serviços Azure para infraestrutura cloud escalável e confiável",
      "Utilização de Azure DevOps para CI/CD, garantindo entregas contínuas e qualidade do código",
      "Desenvolvimento backend com Node.js e integração com MongoDB para persistência de dados",
      "Implementação de arquitetura escalável que suporta crescimento da base de usuários da instituição",
    ],
    projectLink: "https://www.bernoulli.com.br/",
  },
];
