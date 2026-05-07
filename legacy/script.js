// --- Modal Elements ---
let modal, modalTitle, modalImage, modalDescription, modalStack, modalHighlights, modalRepoLink, modalLiveLink, modalProjectLink, closeModalButton, projectCards;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Initialize modal elements
    modal = document.getElementById('project-modal');
    modalTitle = document.getElementById('modal-title');
    modalImage = document.getElementById('modal-image');
    modalDescription = document.getElementById('modal-description');
    modalStack = document.getElementById('modal-stack');
    modalHighlights = document.getElementById('modal-highlights');
    modalRepoLink = document.getElementById('modal-repo-link');
    modalLiveLink = document.getElementById('modal-live-link');
    modalProjectLink = document.getElementById('modal-project-link');
    closeModalButton = document.querySelector('.close-button');
    projectCards = document.querySelectorAll('.project-card');

    // --- 3D Parallax Effect for Hero Section ---
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const profileBadge = document.querySelector('.profile-badge');
    const badgeContainer = document.querySelector('.badge-container');
    const heroTechLogos = document.querySelectorAll('.tech-logo');
    const heroTitle = document.querySelector('.hero h1');
    const ctaButtons = document.querySelectorAll('.hero .cta-button');
    
    // Parallax effect on mouse move
    if (heroSection && window.innerWidth > 768) { // Only on desktop
        heroSection.addEventListener('mousemove', (e) => {
            // Get mouse position relative to the center of the hero section
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const mouseX = e.clientX - rect.left - centerX;
            const mouseY = e.clientY - rect.top - centerY;
            
            // Calculate movement percentage
            const moveX = mouseX / centerX;
            const moveY = mouseY / centerY;
            
            // Apply 3D transform to hero content (subtle effect)
            if (heroContent) {
                heroContent.style.transform = `translateZ(20px) rotateY(${moveX * 3}deg) rotateX(${-moveY * 2}deg)`;
            }
            
            // Apply 3D transform to profile badge (more pronounced effect)
            if (badgeContainer) {
                badgeContainer.style.transform = `translateZ(30px) rotateY(${moveX * 10}deg) rotateX(${-moveY * 5}deg)`;
            }
            
            // Apply 3D transform to hero title
            if (heroTitle) {
                heroTitle.style.transform = `translateZ(40px) translateX(${moveX * 15}px) translateY(${moveY * 10}px)`;
            }
            
            // Apply effect to CTA buttons
            ctaButtons.forEach(button => {
                button.style.transform = `translateZ(30px) translateX(${moveX * 10}px) translateY(${moveY * 5}px)`;
            });
            
            // Apply different transform to each tech logo for dynamic effect
            heroTechLogos.forEach((logo, index) => {
                const factor = (index % 5) + 1; // Different factor for each logo
                const invertFactor = index % 2 === 0 ? 1 : -1; // Alternate direction
                
                // Get current position
                const currentX = parseFloat(logo.style.left) || 0;
                const currentY = parseFloat(logo.style.top) || 0;
                
                // Add mouse-based movement (very subtle)
                logo.style.transform = `translateZ(${factor * 5}px) rotateY(${moveX * factor * 8 * invertFactor}deg) rotateX(${-moveY * factor * 5 * invertFactor}deg)`;
            });
        });
        
        // Reset transforms when mouse leaves hero section
        heroSection.addEventListener('mouseleave', () => {
            if (heroContent) {
                heroContent.style.transform = 'translateZ(0)';
            }
            
            if (badgeContainer) {
                badgeContainer.style.transform = 'rotate(-2deg) translateZ(0)';
            }
            
            if (heroTitle) {
                heroTitle.style.transform = 'translateZ(30px)';
            }
            
            ctaButtons.forEach(button => {
                button.style.transform = 'translateZ(20px)';
            });
            
            heroTechLogos.forEach(logo => {
                logo.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
            });
        });
    }

    console.log('Modal elements:', {
        modal: modal,
        modalTitle: modalTitle,
        modalImage: modalImage,
        modalDescription: modalDescription,
        modalStack: modalStack,
        modalHighlights: modalHighlights,
        modalRepoLink: modalRepoLink,
        modalLiveLink: modalLiveLink,
        closeModalButton: closeModalButton,
        projectCards: projectCards
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        // Function to toggle menu state
        const toggleMenu = function(e) {
            e.preventDefault(); // Prevent default action
            e.stopPropagation(); // Stop event from bubbling up
            
            document.body.classList.toggle('menu-open'); // Add class to body
            navMenu.classList.toggle('active');
            
            // Show header when menu is toggled on
            if (navMenu.classList.contains('active')) {
                header.classList.remove('header-hidden');
                isHeaderVisible = true;
                
                // Check if menu needs scroll indicator
                setTimeout(() => {
                    if (navMenu.scrollWidth > navMenu.clientWidth) {
                        navMenu.classList.add('scrollable');
                    } else {
                        navMenu.classList.remove('scrollable');
                    }
                }, 100);
            }
            
            // Change icon based on menu state
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    mobileMenuBtn.setAttribute('aria-expanded', 'true');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            }
            
            console.log('Mobile menu toggled, active state:', navMenu.classList.contains('active'));
        };
        
        // Add both click and touchstart event listeners for better mobile experience
        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileMenuBtn.addEventListener('touchstart', toggleMenu, {passive: false});
        
        // Function to close mobile menu
        const closeMenu = () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        };
        
        // Close mobile menu when clicking a link
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            // Skip links that should open in new pages/tabs
            if (link.getAttribute('target') === '_blank' || link.classList.contains('blog-link')) {
                return;
            }
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                closeMenu();
                
                // Scroll to the section after menu closes
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerOffset = document.querySelector('header').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - headerOffset - 10;
                        
                        // Smooth scroll to target
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Handle blog link separately
        const blogLink = navMenu.querySelector('.blog-link');
        if (blogLink) {
            blogLink.addEventListener('click', () => {
                closeMenu();
            });
        }
        
        // Close mobile menu when clicking outside (improved)
        document.addEventListener('click', (e) => {
            // Only act if menu is active and click is outside menu and not on menu button
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                e.target !== mobileMenuBtn && 
                !mobileMenuBtn.contains(e.target)) {
                
                closeMenu();
                console.log('Mobile menu closed by outside click');
            }
        });
    }

    // Header scroll behavior
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let scrollThreshold = 100; // Min scroll before hiding header
    let isHeaderVisible = true;
    
    // Highlight current section in navigation
    const sectionElements = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('header nav ul li a');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;
        
        // Find the current section
        sectionElements.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                document.querySelector(`header nav ul li a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }
    
    // Call on scroll
    window.addEventListener('scroll', highlightNavOnScroll);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Don't hide header when mobile menu is open
        if (navMenu && navMenu.classList.contains('active')) {
            return;
        }
        
        // On mobile, keep the header visible for first 300px of scroll to keep menu accessible
        if (window.innerWidth <= 768 && scrollTop < 300) {
            if (!isHeaderVisible) {
                header.classList.remove('header-hidden');
                isHeaderVisible = true;
            }
            return;
        }
        
        // Only start hiding after scrolling past threshold
        if (scrollTop > scrollThreshold) {
            // Scrolling down
            if (scrollTop > lastScrollTop && isHeaderVisible) {
                header.classList.add('header-hidden');
                isHeaderVisible = false;
            } 
            // Scrolling up
            else if (scrollTop < lastScrollTop && !isHeaderVisible) {
                header.classList.remove('header-hidden');
                isHeaderVisible = true;
            }
        } else {
            // Always show header at the top of the page
            if (!isHeaderVisible) {
                header.classList.remove('header-hidden');
                isHeaderVisible = true;
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // --- Theme Switcher ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeIcon = document.getElementById('theme-icon');
    
    // Verificar se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Função para alternar entre temas
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
    }
    
    // Atualizar o ícone com base no tema
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // Adicionar evento de clique ao botão de alternar tema
    themeSwitcher.addEventListener('click', toggleTheme);

    // --- Tech Logo Animation Enhancement ---
    const techLogos = document.querySelectorAll('.tech-logo');
    
    // Função para verificar se há sobreposição entre logos (baseado em posições percentuais)
    function checkOverlap(logo, allLogos, margin = 8) {
        const logoTop = parseFloat(logo.style.top) || 0;
        const logoLeft = parseFloat(logo.style.left) || 0;
        
        for (let otherLogo of allLogos) {
            if (otherLogo === logo || otherLogo.classList.contains('hidden')) continue;
            
            const otherTop = parseFloat(otherLogo.style.top) || 0;
            const otherLeft = parseFloat(otherLogo.style.left) || 0;
            
            // Verifica sobreposição com margem (considerando que cada logo tem ~50px = ~5% da tela)
            const topDiff = Math.abs(logoTop - otherTop);
            const leftDiff = Math.abs(logoLeft - otherLeft);
            
            // Se a diferença for menor que a margem (em %), há sobreposição
            if (topDiff < margin && leftDiff < margin) {
                return true; // Há sobreposição
            }
        }
        return false;
    }
    
    // Função para verificar se está na área do card central
    function isInCenterArea(left, top) {
        const centerLeft = 30; // 30% da esquerda
        const centerRight = 70; // 70% da esquerda
        const centerTop = 25; // 25% do topo
        const centerBottom = 75; // 75% do topo
        
        return left > centerLeft && left < centerRight && 
               top > centerTop && top < centerBottom;
    }
    
    // Função para obter uma posição válida
    function getValidPosition(logo, allLogos, maxAttempts = 50) {
        let attempts = 0;
        let newTop, newLeft;
        
        do {
            newTop = Math.floor(Math.random() * 80) + 5;
            newLeft = Math.floor(Math.random() * 80) + 5;
            attempts++;
            
            // Evita área central
            if (isInCenterArea(newLeft, newTop)) {
                continue;
            }
            
            // Aplica temporariamente para verificar sobreposição
            const oldTop = logo.style.top;
            const oldLeft = logo.style.left;
            logo.style.top = newTop + '%';
            logo.style.left = newLeft + '%';
            
            const hasOverlap = checkOverlap(logo, allLogos);
            
            if (!hasOverlap) {
                return { top: newTop, left: newLeft };
            }
            
            // Restaura posição anterior se houver sobreposição
            logo.style.top = oldTop;
            logo.style.left = oldLeft;
            
        } while (attempts < maxAttempts);
        
        // Se não encontrou posição válida, retorna posição que evita pelo menos o centro
        if (isInCenterArea(newLeft, newTop)) {
            newLeft = newLeft < 50 ? 20 : 80;
            newTop = newTop < 50 ? 15 : 85;
        }
        
        return { top: newTop, left: newLeft };
    }
    
    // Função para posicionar os logos aleatoriamente
    function repositionLogos() {
        // Primeiro, remove logos vazios
        techLogos.forEach(logo => {
            const hasIcon = logo.querySelector('i');
            const hasText = logo.querySelector('span');
            const textContent = logo.textContent.trim();
            const hasContent = hasIcon || hasText || textContent;
            
            if (!hasContent) {
                logo.classList.add('hidden');
                return;
            } else {
                logo.classList.remove('hidden');
            }
        });
        
        // Filtra apenas logos visíveis
        const visibleLogos = Array.from(techLogos).filter(logo => {
            return !logo.classList.contains('hidden') && 
                   (logo.querySelector('i') || logo.querySelector('span') || logo.textContent.trim());
        });
        
        // Posiciona cada logo evitando sobreposição e área central
        visibleLogos.forEach((logo, index) => {
            // Verifica se o logo já tem uma posição válida
            if (!logo.style.top || !logo.style.left) {
                const position = getValidPosition(logo, visibleLogos);
                logo.style.top = position.top + '%';
                logo.style.left = position.left + '%';
            }
            
            // Define z-index baseado no índice para evitar sobreposição visual
            logo.style.zIndex = 1 + (index % 3); // z-index entre 1 e 3
            
            // Adiciona evento de hover para destacar logo
            logo.addEventListener('mouseenter', () => {
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1.3)';
                logo.style.zIndex = '5'; // Abaixo do hero-content
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.opacity = '0.8';
                logo.style.transform = 'scale(1)';
                logo.style.zIndex = 1 + (index % 3);
            });
            
            // Adiciona um movimento aleatório ocasional
            setInterval(() => {
                if (Math.random() > 0.7) { // 30% de chance de se mover
                    const direction = Math.random() > 0.5 ? 1 : -1;
                    const currentTop = parseFloat(logo.style.top);
                    const currentLeft = parseFloat(logo.style.left);
                    
                    // Pequeno movimento aleatório - evitando o centro
                    let newTop = Math.max(5, Math.min(92, currentTop + direction * Math.random() * 5));
                    let newLeft = Math.max(3, Math.min(95, currentLeft + direction * Math.random() * 5));
                    
                    // Evitar a área central (onde está o conteúdo principal)
                    if (isInCenterArea(newLeft, newTop)) {
                        // Se estiver indo para o centro, inverte direção
                        if (currentLeft < 50) {
                            newLeft = Math.max(3, currentLeft - Math.random() * 8);
                        } else {
                            newLeft = Math.min(95, currentLeft + Math.random() * 8);
                        }
                        
                        if (currentTop < 50) {
                            newTop = Math.max(5, currentTop - Math.random() * 8);
                        } else {
                            newTop = Math.min(92, currentTop + Math.random() * 8);
                        }
                    }
                    
                    // Verifica sobreposição antes de mover
                    const oldTop = logo.style.top;
                    const oldLeft = logo.style.left;
                    logo.style.top = newTop + '%';
                    logo.style.left = newLeft + '%';
                    
                    if (checkOverlap(logo, visibleLogos) || isInCenterArea(newLeft, newTop)) {
                        // Restaura posição se houver sobreposição ou estiver no centro
                        logo.style.top = oldTop;
                        logo.style.left = oldLeft;
                    }
                    
                    // Ajusta a velocidade de animação baseada no tamanho da tela
                    let animationDuration = '4s';
                    if (window.innerWidth <= 768) {
                        animationDuration = '3s'; // Mais rápido em telas menores
                    }
                    
                    // Anima a transição
                    logo.style.transition = `top ${animationDuration} ease-in-out, left ${animationDuration} ease-in-out`;
                }
            }, 6000); // Verifica a cada 6 segundos
        });
    }
    
    // Inicializa o posicionamento dos logos
    repositionLogos();
    
    // Recalcula posições quando a janela for redimensionada
    window.addEventListener('resize', () => {
        techLogos.forEach(logo => {
            const currentTop = parseFloat(logo.style.top);
            const currentLeft = parseFloat(logo.style.left);
            
            // Certifica-se de que os logos ainda estão visíveis após redimensionamento
            if (isNaN(currentTop) || isNaN(currentLeft) || 
                currentTop > 92 || currentLeft > 95 || 
                currentTop < 5 || currentLeft < 3) {
                logo.style.top = Math.floor(Math.random() * 80) + 5 + '%';
                logo.style.left = Math.floor(Math.random() * 80) + 5 + '%';
                logo.style.transition = 'top 0.5s ease-in-out, left 0.5s ease-in-out';
            }
        });
    });

    // --- Project Data (Store details here) ---
    // You can fetch this from a JSON file later for easier management
    const projectData = {
        'kingpay': {
            title: 'KingPay – Plataforma de Pagamentos e Antecipações',
            image: 'imagens/kingpay.png',
            description: 'Sistema financeiro completo desenvolvido com Supabase Functions (Deno/TypeScript), oferecendo processamento de pagamentos, antecipações de recebíveis, gestão de carteira digital e integrações com múltiplas adquirentes. A solução implementa um ecossistema financeiro completo com alta segurança e performance para processamento transacional em tempo real, especializado em soluções para e-commerces e lojas de dropshipping. Destaque para a Proteção KingPay: Antifraude Avançado com Inteligência Artificial.',
            stack: 'Deno, TypeScript, Supabase, PostgreSQL, Serverless Functions, JWT Authentication, Redis Cache, WebHooks, BaaS Integration, Next.js (Frontend)',
            highlights: [
                'Proteção KingPay: Sistema antifraude avançado com inteligência artificial para detecção proativa de transações suspeitas em tempo real',
                'Arquitetura serverless escalável baseada em funções independentes por domínio, permitindo manutenção e evolução isolada de componentes',
                'Sistema avançado de antecipação de recebíveis com cálculos automáticos de taxas, juros e prazos personalizados por empresa',
                'Integração com mais de 20 gateways de pagamento diferentes, com tratamento unificado de callbacks e normalização de status',
                'Implementação de mecanismos de segurança como locks distribuídos e cache para evitar processamento duplicado de transações',
                'Sistema de permissões granular baseado em perfis e funções com autenticação JWT e validação de senhas financeiras para operações críticas',
                'Módulo completo de saques via PIX com múltiplas integrações BaaS (Banking as a Service) e validação anti-fraude',
                'Gestão financeira com cálculos automáticos de reserva financeira, divisão de valores (split payments) e controle de movimentações',
                'Webhook inteligente para notificação em tempo real de clientes sobre mudanças de status em transações e processamentos financeiros'
            ],
            repoLink: '#',
            liveLink: '#',
            projectLink: 'https://kingpaybr.com.br/'
        },
        'hello-app': {
            title: 'Hello – Assistente Virtual com IA (Android)',
            image: 'imagens/Logo Hello.jpg',
            description: 'Assistente virtual inovador desenvolvido para Android utilizando Flutter e serviços de IA avançados. O aplicativo opera em segundo plano e permite que os usuários interajam por voz com outros aplicativos instalados, como WhatsApp e Instagram, criando uma experiência de uso fluida e natural através do dispositivo.',
            stack: 'Flutter, Node.js, Python, IA (NLP Models, OpenAI), AWS, DynamoDB, PostgreSQL, Background Services',
            highlights: [
                'Arquitetura híbrida combinando Flutter com código nativo para otimização de performance em serviços em segundo plano',
                'Implementação de sistema de processamento de linguagem natural com modelos de IA personalizados para comando de voz em português',
                'Desenvolvimento de middleware para comunicação segura entre aplicativos de terceiros sem comprometer dados do usuário',
                'Integração com AWS para processamento de IA distribuído, reduzindo o consumo de bateria em dispositivos de baixo desempenho',
                'Sistema de aprendizado contínuo que melhora o reconhecimento de comandos baseado em interações do usuário',
                'Uso combinado de bancos NoSQL (DynamoDB) para dados voláteis e SQL (PostgreSQL) para informações estruturadas e relacionais'
            ],
            repoLink: '#',
            liveLink: '#'
        },
        'boralaa': {
            title: 'Boralaa – Caronas Compartilhadas',
            image: 'imagens/boralaa.png',
            description: 'Aplicativo mobile (+10 mil downloads) inspirado no BlaBlaCar para compartilhamento de caronas, com foco em localização e comunicação em tempo real.',
            stack: 'React Native, Node.js, Python, Oracle Cloud, API REST, Jest',
            highlights: [
                'Funcionalidade de localização em tempo real.',
                'API RESTful robusta para comunicação frontend-backend.',
                'Testes automatizados com Jest para garantir estabilidade.',
                'Experiência de usuário intuitiva e mais de 10.000 downloads.',
            ],
            repoLink: '#',
            liveLink: '#',
            projectLink: 'https://play.google.com/store/apps/details?id=com.boralaa&hl=pt_BR'
        },
         'slot-machine': {
            title: 'Slot Machine Online',
            image: 'imagens/SlotMachine.jpg',
            description: 'Plataforma web completa de jogo de caça-níqueis com frontend responsivo e backend robusto para gerenciamento de estados, transações e lógica de premiação. O sistema oferece uma experiência de jogo fluida com animações dinâmicas, mantendo a integridade das transações e a segurança dos usuários.',
            stack: 'Node.js, JavaScript, HTML, CSS, PostgreSQL, WebSockets',
            highlights: [
                'Implementação de sistema criptograficamente seguro de geração de números pseudoaleatórios no backend para garantir resultados justos',
                'Arquitetura transacional com controle de concorrência para garantir consistência em operações de saldo mesmo com alto volume de usuários',
                'Sistema avançado de comunicação assíncrona via WebSockets para atualização em tempo real dos resultados sem refreshes de página',
                'Mecanismo de freespins e bônus com tabelas de probabilidade configuráveis e sistema de paylines dinâmico',
                'Interface responsiva com animações fluidas que se adapta de desktop a mobile mantendo a qualidade visual',
                'Painel administrativo para configuração de RTP (Return to Player), tabelas de pagamento e monitoramento de métricas de jogo'
            ],
            repoLink: '#',
            liveLink: '#'
        },
         'hello-clips': {
            title: 'Hello Clips – Gerador de Vídeos Virais com IA',
            image: 'imagens/logo hello clips.jpg',
            description: 'Plataforma Web/Mobile inovadora que utiliza inteligência artificial para transformar automaticamente vídeos longos em clips curtos de alto potencial viral. A aplicação analisa conteúdo, identifica momentos-chave e gera clipes legendados prontos para distribuição em redes sociais, similar ao Opus Clip mas com recursos avançados de análise semântica.',
            stack: 'React, React Native, Node.js, Python (FastAPI/Flask), Celery, Redis, OpenCV, IA (GPT, Whisper), MongoDB, PostgreSQL, AWS',
            highlights: [
                'Implementação de sistema distribuído de processamento assíncrono capaz de analisar vídeos de até 3 horas em menos de 30 minutos',
                'Algoritmo proprietário de detecção de momentos virais combinando análise de áudio (Whisper), texto (GPT) e vídeo (OpenCV)',
                'Arquitetura de microserviços com balanceamento dinâmico de carga para otimizar recursos computacionais durante picos de uso',
                'Sistema inteligente de pontuação de viralidade baseado em análise de milhares de vídeos de sucesso em diferentes plataformas',
                'Editor de legendas com suporte a estilos visuais customizados e posicionamento inteligente para evitar elementos importantes na tela',
                'Capacidade de aprendizado progressivo que refina a detecção de momentos virais baseado no feedback de usuários e métricas de compartilhamento'
            ],
            repoLink: '#',
            liveLink: '#'
        },
        'feedback-analyzer': {
            title: 'Feedback Analyzer – Análise Preditiva de Vendas com IA',
            image: 'imagens/CRM.png',
            description: 'Sistema de análise avançada de feedback de clientes para um grupo empresarial, utilizando processamento de linguagem natural para transformar dados qualitativos em insights quantitativos e previsões de tendências de vendas.',
            stack: 'Python, Pandas, Matplotlib, OpenAI API (ChatGPT), Scikit-learn, FastAPI, PostgreSQL, Power BI',
            highlights: [
                'Integração com APIs de CRM para coleta e processamento automatizado de feedbacks de clientes.',
                'Utilização de modelos GPT da OpenAI para análise semântica profunda de sentimentos e opiniões.',
                'Algoritmos de machine learning para correlacionar padrões em feedbacks com desempenho de vendas.',
                'Dashboard interativo com visualizações de dados e projeções de crescimento por produto/segmento.',
                'Sistema de alertas para identificação precoce de problemas recorrentes em produtos específicos.',
                'Relatórios automáticos com recomendações acionáveis para equipes de produto e marketing.'
            ],
            repoLink: '#',
            liveLink: '#'
        },
        'ina-project': {
            title: 'Inã – Sistema de Alerta, Fiscalização e Gerenciamento Ambiental',
            image: 'imagens/ina.png',
            description: 'Aplicação completa desenvolvida para o Governo de Goiás focada na proteção ambiental, incluindo fiscalização de desmatamento, monitoramento de maus-tratos a animais e preservação de espécies ameaçadas. Como Engenheiro de Software Back-end no Grupo Youx, liderei a implementação de funcionalidades críticas do sistema.',
            stack: 'React Native, Node.js, Vue.js, Java, Spring Boot, Spring Security, PostgreSQL, REST APIs, Testes Automatizados (Jest)',
            highlights: [
                'Desenvolvimento e otimização de APIs RESTful de alta performance para integração entre sistemas de campo e bases de dados governamentais',
                'Implementação de sistema de geolocalização avançado com recursos de roteirização inteligente para fiscalização em áreas remotas',
                'Arquitetura de microserviços com Spring Boot para garantir escalabilidade e permitir aumento significativo de usuários simultâneos',
                'Implementação de testes automatizados com Jest, alcançando cobertura de código superior a 85%',
                'Sistema de sincronização offline/online para operações em áreas sem conectividade, garantindo integridade dos dados',
                'Coordenação de aprimoramentos de performance que reduziram o tempo de resposta em 40%, melhorando a experiência de agentes em campo'
            ],
            repoLink: '#',
            liveLink: '#',
            projectLink: 'https://youxgroup.com.br/ina/'
        },
        'bernoulli-project': {
            title: 'Bernoulli – Aplicativo Mobile Institucional',
            image: 'imagens/bernoulli.png',
            description: 'Engenheiro de Software Full-Stack atuando no desenvolvimento do aplicativo mobile da instituição. Responsável pelo desenvolvimento mobile, integrações com serviços Azure, autenticação com Azure AD B2C, design system próprio baseado em Gluestack, e documentação de componentes com Storybook, garantindo consistência visual e escalabilidade do produto.',
            stack: 'React Native, Node.js, MongoDB, Azure DevOps, Azure AD B2C, Gluestack, Storybook, Design System, JavaScript, TypeScript',
            highlights: [
                'Desenvolvimento de aplicativo mobile institucional com React Native, garantindo performance e experiência de usuário otimizada',
                'Implementação de autenticação segura com Azure AD B2C, incluindo SSO e gerenciamento de identidades corporativas',
                'Criação de design system próprio baseado em Gluestack, assegurando consistência visual em toda a aplicação',
                'Documentação completa de componentes utilizando Storybook, facilitando manutenção e colaboração da equipe',
                'Integração com serviços Azure para infraestrutura cloud escalável e confiável',
                'Utilização de Azure DevOps para CI/CD, garantindo entregas contínuas e qualidade do código',
                'Desenvolvimento backend com Node.js e integração com MongoDB para persistência de dados',
                'Implementação de arquitetura escalável que suporta crescimento da base de usuários da instituição'
            ],
            repoLink: '#',
            liveLink: '#',
            projectLink: 'https://www.bernoulli.com.br/'
        }
        // Add data for other projects...
    };

    // --- Function to Open Modal ---
    function openModal(projectKey) {
        console.log('Opening modal for project:', projectKey);
        const data = projectData[projectKey];
        if (!data) {
            console.error('No data found for project:', projectKey);
            return;
        }

        modalTitle.textContent = data.title;
        modalImage.src = data.image || 'images/placeholder.png';
        modalImage.alt = data.title + " image";
        modalDescription.textContent = data.description;
        modalStack.textContent = data.stack;

        // Clear previous highlights and add new ones
        modalHighlights.innerHTML = '';
        data.highlights.forEach(highlight => {
            const li = document.createElement('li');
            li.textContent = highlight;
            modalHighlights.appendChild(li);
        });

        // Update links
        if (data.repoLink && data.repoLink !== '#') {
            modalRepoLink.href = data.repoLink;
            modalRepoLink.style.display = 'inline-block';
        } else {
            modalRepoLink.style.display = 'none';
        }

        if (data.liveLink && data.liveLink !== '#') {
            modalLiveLink.href = data.liveLink;
            modalLiveLink.style.display = 'inline-block';
        } else {
            modalLiveLink.style.display = 'none';
        }

        if (data.projectLink && data.projectLink !== '#') {
            modalProjectLink.href = data.projectLink;
            modalProjectLink.style.display = 'inline-block';
        } else {
            modalProjectLink.style.display = 'none';
        }

        modal.style.display = 'block';
        console.log('Modal opened successfully');
    }

    // --- Function to Close Modal ---
    function closeModal() {
        modal.style.display = 'none';
    }

    // --- Event Listeners ---
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-project');
            console.log('Project card clicked:', projectKey);
            openModal(projectKey);
        });
    });

    closeModalButton.addEventListener('click', closeModal);

    // Close modal if user clicks outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Optional: Close modal on 'Escape' key press
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // --- Email Modal Functions ---
    const emailLink = document.getElementById('email-link');
    const emailModal = document.getElementById('email-modal');
    const closeEmailModalButton = document.getElementById('close-email-modal');
    const emailForm = document.getElementById('email-form');
    const emailStatus = document.getElementById('email-status');
    
    // Carrega o script do EmailJS
    const emailJsScript = document.createElement('script');
    emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    document.head.appendChild(emailJsScript);
    
    emailJsScript.onload = function() {
        // Inicializa o EmailJS com seu User ID público
        emailjs.init("YOUR_USER_ID"); // Substitua com seu User ID do EmailJS
    };
    
    // Open email modal when clicking email link
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        emailModal.style.display = 'block';
    });
    
    // Close email modal
    closeEmailModalButton.addEventListener('click', () => {
        emailModal.style.display = 'none';
        // Limpa mensagens de status ao fechar
        emailStatus.textContent = '';
        emailStatus.className = '';
    });
    
    // Close modal if user clicks outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target == emailModal) {
            emailModal.style.display = 'none';
            // Limpa mensagens de status ao fechar
            emailStatus.textContent = '';
            emailStatus.className = '';
        }
    });
    
    // Handle form submission
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Mostra mensagem de carregamento
        emailStatus.textContent = 'Enviando mensagem...';
        emailStatus.className = '';
        
        // Obtém os dados do formulário
        const params = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Utiliza um serviço alternativo (FormSubmit) para enviar o email sem precisar de registro
        fetch("https://formsubmit.co/ajax/matheuss.devv@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: params.name,
                email: params.email,
                subject: params.subject,
                message: params.message
            })
        })
        .then(response => response.json())
        .then(data => {
            // Mostra mensagem de sucesso
            emailStatus.textContent = 'Mensagem enviada com sucesso!';
            emailStatus.className = 'success';
            
            // Reseta o formulário
            emailForm.reset();
            
            // Fecha o modal após alguns segundos
            setTimeout(() => {
                emailModal.style.display = 'none';
                emailStatus.textContent = '';
                emailStatus.className = '';
            }, 3000);
        })
        .catch(error => {
            // Mostra mensagem de erro
            console.error('Erro ao enviar email:', error);
            emailStatus.textContent = 'Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente por email.';
            emailStatus.className = 'error';
        });
    });

    // --- Smooth Scrolling for Nav Links ---
    const navDesktopLinks = document.querySelectorAll('header nav ul li a');

    navDesktopLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Skip processing for blog link which should navigate normally
            if (link.getAttribute('href').includes('blog')) {
                return; // Allow normal navigation for blog links
            }
            
            // Skip processing for the mobile menu (already handled elsewhere)
            if (window.innerWidth <= 768) {
                return;
            }
            
            // For regular navigation links on desktop
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 10;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

     // --- Intersection Observer for Scroll Animations (Example) ---
     const sections = document.querySelectorAll('section'); // Select all sections
     const observerOptions = {
         root: null, // relative to the viewport
         rootMargin: '0px',
         threshold: 0.1 // Trigger when 10% of the section is visible
     };

     const observerCallback = (entries, observer) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 entry.target.classList.add('animate-visible'); // Add a class to trigger animation
                 // Optional: unobserve after animation to improve performance
                 // observer.unobserve(entry.target);
             } else {
                  // Optional: remove class if you want animation to replay on scroll up
                 // entry.target.classList.remove('animate-visible');
             }
         });
     };

     const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

     sections.forEach(section => {
         section.classList.add('animate-hidden'); // Initially hide for animation
         sectionObserver.observe(section);
     });

    // --- Mobile Navigation Enhancements ---
    const isMobile = () => window.innerWidth <= 768;
    
    // Ajusta automaticamente a UI quando o dispositivo é girado
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Ajustar elementos que precisam ser reposicionados após mudança de orientação
            const techLogos = document.querySelectorAll('.tech-logo');
            techLogos.forEach(logo => {
                // Redefine posições que podem estar fora da tela após girar o dispositivo
                const currentTop = parseFloat(logo.style.top);
                const currentLeft = parseFloat(logo.style.left);
                
                if (isNaN(currentTop) || isNaN(currentLeft) || 
                    currentTop > 90 || currentLeft > 90) {
                    logo.style.top = Math.floor(Math.random() * 80) + 5 + '%';
                    logo.style.left = Math.floor(Math.random() * 80) + 5 + '%';
                }
            });
        }, 300);
    });

    // Blog preview video hover effect
    const previewVideos = document.querySelectorAll('.preview-media video');
    
    previewVideos.forEach(video => {
        const parent = video.closest('.preview-media');
        
        parent.addEventListener('mouseenter', () => {
            video.play().catch(err => console.log('Auto-play prevented:', err));
        });
        
        parent.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // Add scroll event to auto-close mobile menu after scrolling a bit
    let lastScrollPosition = 0;
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Auto-close mobile menu immediately when scrolling starts
        if (navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
        
        lastScrollPosition = currentScrollPosition;
    });

    // --- Project Cards 3D Tilt Effect ---
    function addTiltEffect(elements) {
        elements.forEach(element => {
            // Only apply tilt effect on desktop
            if (window.innerWidth <= 768) return;
            
            element.addEventListener('mousemove', e => {
                const card = element;
                const cardRect = card.getBoundingClientRect();
                
                // Calculate mouse position relative to the card
                const cardX = e.clientX - cardRect.left;
                const cardY = e.clientY - cardRect.top;
                
                // Calculate rotation angles based on mouse position
                // The card will tilt towards the mouse pointer
                const angleY = ((cardX / cardRect.width) - 0.5) * 20; // -10 to 10 degrees
                const angleX = ((cardY / cardRect.height) - 0.5) * -20; // 10 to -10 degrees
                
                // Apply the 3D transformation
                card.style.transform = `translateY(-10px) translateZ(20px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
                
                // Enhance inner elements
                const cardImg = card.querySelector('img');
                const cardTitle = card.querySelector('h3');
                const cardText = card.querySelector('p');
                const viewDetails = card.querySelector('.view-details');
                
                if (cardImg) cardImg.style.transform = `scale(1.08) translateZ(${30 + Math.abs(angleY)}px)`;
                if (cardTitle) cardTitle.style.transform = `translateZ(${40 + Math.abs(angleX)}px)`;
                if (cardText) cardText.style.transform = `translateZ(${25 + Math.abs(angleY/2)}px)`;
                if (viewDetails) viewDetails.style.transform = `translateZ(${35 + Math.abs(angleX/2)}px)`;
            });
            
            // Reset transformations when mouse leaves the card
            element.addEventListener('mouseleave', e => {
                const card = element;
                card.style.transform = 'translateZ(0)';
                
                // Reset inner elements
                const cardImg = card.querySelector('img');
                const cardTitle = card.querySelector('h3');
                const cardText = card.querySelector('p');
                const viewDetails = card.querySelector('.view-details');
                
                if (cardImg) cardImg.style.transform = 'translateZ(10px)';
                if (cardTitle) cardTitle.style.transform = 'translateZ(15px)';
                if (cardText) cardText.style.transform = 'translateZ(5px)';
                if (viewDetails) viewDetails.style.transform = 'translateZ(5px)';
            });
        });
    }

    // Apply tilt effect to project cards
    addTiltEffect(document.querySelectorAll('.project-card'));

    // Apply tilt effect to resume cards
    addTiltEffect(document.querySelectorAll('.resume-card'));

    // --- Certificate Modal Functions ---
    const certificateModal = document.getElementById('certificate-modal');
    const certificateModalImage = document.getElementById('certificate-modal-image');
    const certificateModalTitle = document.getElementById('certificate-modal-title');
    const certificateModalDescription = document.getElementById('certificate-modal-description');
    const closeCertificateModalButton = document.getElementById('close-certificate-modal');
    const certificateThumbnails = document.querySelectorAll('.certificate-thumbnail');
    
    // Descrições dos certificados
    const certificateDescriptions = {
        'Introdução à Linguagem Python': 'Aprendi os fundamentos da programação em Python, incluindo sintaxe básica, tipos de dados, estruturas de controle, funções e manipulação de arquivos. Desenvolvi habilidades para criar scripts e programas básicos, compreendendo a filosofia Python de código limpo e legível.',
        'Estruturas de Dados em Python': 'Adquiri conhecimento profundo sobre estruturas de dados essenciais em Python: listas, tuplas, dicionários, sets e suas operações. Aprendi a escolher a estrutura adequada para cada situação, otimizando performance e legibilidade do código.',
        'Estruturas de Dados em Python (Certificado)': 'Aprofundei meus conhecimentos em estruturas de dados avançadas, incluindo implementação de algoritmos de ordenação, busca e manipulação eficiente de dados complexos em Python.',
        'Introdução à Análise de Dados com Python': 'Desenvolvi habilidades em análise de dados utilizando bibliotecas como Pandas e NumPy. Aprendi a importar, limpar, transformar e visualizar dados, criando insights valiosos a partir de datasets reais.',
        'Tecnologias de Informação Aplicadas ao Direito': 'Explorei a interseção entre tecnologia e direito, aprendendo sobre sistemas jurídicos digitais, automação de processos legais e como a tecnologia pode otimizar a prática jurídica moderna.',
        'Tecnologia, Direito Digital e Propriedade Intelectual': 'Adquiri conhecimento sobre propriedade intelectual no ambiente digital, direitos autorais, patentes de software e questões legais relacionadas ao desenvolvimento tecnológico e inovação.',
        'Modelos de Gestão': 'Estudei diferentes modelos e teorias de gestão organizacional, aprendendo sobre liderança, planejamento estratégico, tomada de decisões e como aplicar esses conceitos em ambientes corporativos modernos.',
        'Planejamento Estratégico': 'Desenvolvi habilidades em planejamento estratégico, aprendendo a criar visões de longo prazo, definir objetivos, analisar ambientes competitivos e implementar estratégias eficazes para o crescimento organizacional.',
        'Empreendedorismo e Inovação': 'Aprendi sobre o processo empreendedor, desde a identificação de oportunidades até a criação e gestão de negócios inovadores. Desenvolvi habilidades em inovação, criatividade e resolução de problemas empresariais.',
        'Planejamento e Desenvolvimento de Negócios Internacionais': 'Aprofundei meus conhecimentos em planejamento estratégico para negócios internacionais, aprendendo sobre análise de mercados globais, adaptação cultural, logística internacional e gestão de operações multinacionais.',
        'Economia Política Mundial': 'Estudei as relações entre política e economia no contexto global, compreendendo como fatores políticos influenciam mercados, comércio internacional e desenvolvimento econômico de nações.',
        'Direito Internacional': 'Adquiri conhecimento sobre normas e princípios do direito internacional, tratados, organizações internacionais e como o direito regula relações entre estados e entidades transnacionais.',
        'Negócios Internacionais': 'Desenvolvi compreensão abrangente sobre negócios internacionais, aprendendo sobre estratégias de internacionalização, gestão de operações globais, análise de mercados internacionais e como empresas podem expandir e competir em escala global.',
        'Análise de Investimentos e Fontes de Financiamento': 'Desenvolvi habilidades em análise financeira de investimentos, aprendendo a avaliar viabilidade de projetos, calcular retornos, analisar riscos e identificar as melhores fontes de financiamento.',
        'Capital de Giro e Análise Financeira': 'Aprendi sobre gestão de capital de giro, análise de fluxo de caixa, indicadores financeiros e como manter a saúde financeira de uma organização através de análises precisas e estratégicas.',
        'Mercado de Capitais': 'Adquiri conhecimento sobre funcionamento dos mercados financeiros, instrumentos de investimento, análise de ações, títulos e como empresas podem acessar o mercado de capitais para financiamento.',
        'Língua Inglesa': 'Desenvolvi proficiência em inglês, melhorando habilidades de comunicação escrita e oral, essenciais para colaboração em projetos internacionais e acesso a recursos técnicos globais.',
        'Língua Espanhola': 'Adquiri competência em espanhol, ampliando minha capacidade de comunicação em um dos idiomas mais falados no mundo, facilitando colaborações e oportunidades em mercados hispânicos.',
        'Direito Eletrônico': 'Estudei aspectos legais do ambiente digital, incluindo contratos eletrônicos, assinatura digital, proteção de dados, crimes cibernéticos e regulamentações que governam transações e atividades online.',
        'Compliance e Governança Corporativa': 'Aprendi sobre práticas de compliance, governança corporativa, gestão de riscos regulatórios e como organizações podem garantir conformidade com leis e regulamentos, mantendo transparência e ética.',
        'Administração e Planejamento de Serviço Social': 'Adquiri conhecimento sobre gestão de serviços sociais, planejamento de políticas públicas, gestão de projetos sociais e como administrar organizações do terceiro setor de forma eficiente.',
        'Serviço Social e Terceiro Setor': 'Desenvolvi compreensão sobre o papel do terceiro setor na sociedade, aprendendo sobre gestão de ONGs, captação de recursos, impacto social e como organizações sem fins lucrativos podem maximizar seu impacto positivo.'
    };
    
    // Open certificate modal when clicking on a thumbnail
    certificateThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const certSrc = thumbnail.getAttribute('data-cert-src');
            const certTitle = thumbnail.getAttribute('data-cert-title');
            
            certificateModalImage.src = certSrc;
            certificateModalImage.alt = certTitle;
            certificateModalTitle.textContent = certTitle;
            
            // Exibir descrição do certificado
            const description = certificateDescriptions[certTitle] || 'Certificado de conclusão de curso que demonstra conhecimento e habilidades adquiridas na área.';
            certificateModalDescription.textContent = description;
            
            // Limpar todas as classes de rotação primeiro
            certificateModalImage.classList.remove('certificate-rotate', 'certificate-rotate-180', 'certificate-portrait');
            
            // Aplicar rotação se a miniatura tiver classe de rotação
            if (thumbnail.classList.contains('certificate-rotate-180')) {
                certificateModalImage.classList.add('certificate-rotate-180');
            } else if (thumbnail.classList.contains('certificate-rotate')) {
                certificateModalImage.classList.add('certificate-rotate');
            } else if (thumbnail.classList.contains('certificate-portrait')) {
                certificateModalImage.classList.add('certificate-portrait');
            }
            
            certificateModal.style.display = 'block';
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close certificate modal
    closeCertificateModalButton.addEventListener('click', () => {
        certificateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal if user clicks outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target == certificateModal) {
            certificateModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal on 'Escape' key press
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && certificateModal.style.display === 'block') {
            certificateModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

}); // End DOMContentLoaded