document.addEventListener('DOMContentLoaded', () => {

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
    
    // Função para posicionar os logos aleatoriamente
    function repositionLogos() {
        techLogos.forEach(logo => {
            // Verifica se o logo já tem uma posição, se não, atribui uma posição aleatória
            if (!logo.style.top || !logo.style.left) {
                logo.style.top = Math.floor(Math.random() * 80) + 5 + '%';
                logo.style.left = Math.floor(Math.random() * 80) + 5 + '%';
            }
            
            // Adiciona evento de hover para destacar logo
            logo.addEventListener('mouseenter', () => {
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1.3)';
                logo.style.zIndex = '10';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.opacity = '0.8';
                logo.style.transform = 'scale(1)';
                logo.style.zIndex = '3';
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
                    const isCenterHorizontal = newLeft > 30 && newLeft < 70;
                    const isCenterVertical = newTop > 25 && newTop < 75;
                    
                    if (isCenterHorizontal && isCenterVertical) {
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
                    
                    // Ajusta a velocidade de animação baseada no tamanho da tela
                    let animationDuration = '4s';
                    if (window.innerWidth <= 768) {
                        animationDuration = '3s'; // Mais rápido em telas menores
                    }
                    
                    // Anima a transição
                    logo.style.transition = `top ${animationDuration} ease-in-out, left ${animationDuration} ease-in-out`;
                    logo.style.top = newTop + '%';
                    logo.style.left = newLeft + '%';
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
            liveLink: '#'
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
            liveLink: '#'
        }
        // Add data for other projects...
    };

    // --- Modal Elements ---
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalStack = document.getElementById('modal-stack');
    const modalHighlights = document.getElementById('modal-highlights');
    const modalRepoLink = document.getElementById('modal-repo-link');
    const modalLiveLink = document.getElementById('modal-live-link');
    const closeModalButton = document.querySelector('.close-button');
    const projectCards = document.querySelectorAll('.project-card');

    // --- Function to Open Modal ---
    function openModal(projectKey) {
        const data = projectData[projectKey];
        if (!data) return; // Exit if data not found

        modalTitle.textContent = data.title;
        modalImage.src = data.image || 'images/placeholder.png'; // Use placeholder if no image
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

        // Update links (hide if no link provided)
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


        modal.style.display = 'block';
    }

    // --- Function to Close Modal ---
    function closeModal() {
        modal.style.display = 'none';
    }

    // --- Event Listeners ---
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-project');
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
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href'); // Get #home, #about, etc.
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                 // Calculate position considering sticky header height if necessary
                 const headerOffset = document.querySelector('header').offsetHeight;
                 const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                 const offsetPosition = elementPosition - headerOffset - 10; // Adjust -10 for padding

                 window.scrollTo({
                     top: offsetPosition,
                     behavior: 'smooth'
                 });

                 // Optional: Close mobile menu if open
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
    
    // Fecha o menu após clicar em um link em telas menores
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobile()) {
                // Se tiver um menu mobile com toggle, fechá-lo aqui
                // Por exemplo: mobileMenuToggle.classList.remove('active');
                
                // Suaviza a transição de scroll em dispositivos móveis
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
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

}); // End DOMContentLoaded
    // --- Certificate Group Modal ---
    const certificateGroupModal = document.getElementById('certificate-group-modal');
    const closeCertificateModalButton = document.getElementById('close-certificate-modal');
    const certificateModalTitle = document.getElementById('certificate-modal-title');
    const modalCertificateList = document.getElementById('modal-certificate-list');
    const certificateGroupCards = document.querySelectorAll('.certificate-card[data-modal-group]');

    // Dados dos grupos de certificados
    const certificateGroups = {
        'python-group': {
            title: 'Certificados Python',
            certificates: [
                { name: 'Estruturas de Dados em Python', path: 'certificados/CERTIFICADO PYTHON 2024.1/ESTRUTURAS DE DADOS EM PYTHON.pdf' },
                { name: 'Introdução à Análise de Dados com Python', path: 'certificados/CERTIFICADO PYTHON 2024.1/INTRODUÇÃO À ANÁLISE DE DADOS COM PYTHON.pdf' },
                { name: 'Introdução à Linguagem Python', path: 'certificados/CERTIFICADO PYTHON 2024.1/INTRODUÇÃO À LINGUAGEM PYTHON.pdf' }
                // Adicione aqui os paths da pasta duplicada se forem diferentes, mas parece que são os mesmos
            ]
        },
        'negocios-group': {
            title: 'Certificados Negócios Internacionais',
            certificates: [
                { name: 'Negócios Internacionais', path: 'certificados/NEGOCÍOS INTERNACIONAIS 2024.1/CERTIFICADO NEGÓCIOS INTERNACIONAIS.pdf' },
                { name: 'Planejamento e Desenvolvimento de Negócios Internacionais', path: 'certificados/NEGOCÍOS INTERNACIONAIS 2024.1/CERTIFICADO PLANEJAMENTO E DESENVOLVIMENTO DE NEGÓCIOS INTERNACIONAIS.pdf' },
                { name: 'Planejamento Estratégico (em Neg. Internacionais)', path: 'certificados/NEGOCÍOS INTERNACIONAIS 2024.1/CERTIFICADO PLANEJAMENTO ESTRATEGICO.pdf' }
            ]
        }
        // Adicione mais grupos aqui se necessário
    };

    // Função para abrir o modal do grupo de certificados
    function openCertificateGroupModal(groupKey) {
        const groupData = certificateGroups[groupKey];
        if (!groupData || !certificateGroupModal) return; // Sai se não encontrar dados ou o modal

        certificateModalTitle.textContent = groupData.title;
        modalCertificateList.innerHTML = ''; // Limpa a lista anterior

        groupData.certificates.forEach(cert => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = cert.path;
            a.target = '_blank'; // Abrir em nova aba
            a.innerHTML = `<i class="fas fa-file-pdf"></i> ${cert.name}`; // Adiciona ícone e nome
            li.appendChild(a);
            modalCertificateList.appendChild(li);
        });

        certificateGroupModal.style.display = 'block';
    }

    // Função para fechar o modal do grupo de certificados
    function closeCertificateGroupModal() {
        if (certificateGroupModal) {
            certificateGroupModal.style.display = 'none';
        }
    }

    // Adiciona evento de clique aos cards de grupo
    certificateGroupCards.forEach(card => {
        card.addEventListener('click', () => {
            const groupKey = card.getAttribute('data-modal-group');
            openCertificateGroupModal(groupKey);
        });
    });

    // Adiciona evento de clique ao botão de fechar do modal de certificados
    if (closeCertificateModalButton) {
        closeCertificateModalButton.addEventListener('click', closeCertificateGroupModal);
    }

    // Fecha o modal de certificados se clicar fora dele (reutiliza a lógica do modal de projetos)
    window.addEventListener('click', (event) => {
        if (event.target == certificateGroupModal) {
            closeCertificateGroupModal();
        }
        // Mantém a lógica para fechar outros modais se necessário
        if (event.target == modal) { // 'modal' é a variável do modal de projetos
             closeModal(); // 'closeModal' é a função do modal de projetos
        }
         if (event.target == emailModal) { // 'emailModal' é a variável do modal de email
             emailModal.style.display = 'none';
             // Limpa mensagens de status ao fechar
             emailStatus.textContent = '';
             emailStatus.className = '';
         }
    });

     // Opcional: Fechar modal de certificados com a tecla 'Escape'
     window.addEventListener('keydown', (event) => {
         if (event.key === 'Escape') {
             if (certificateGroupModal && certificateGroupModal.style.display === 'block') {
                 closeCertificateGroupModal();
             }
             // Mantém a lógica para fechar outros modais
             if (modal && modal.style.display === 'block') { // 'modal' é a variável do modal de projetos
                 closeModal(); // 'closeModal' é a função do modal de projetos
             }
         }
     });

    // --- FIM Certificate Group Modal ---