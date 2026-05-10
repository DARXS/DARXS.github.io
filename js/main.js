// ===================================
// INITIALIZATION & GLOBAL VARIABLES
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initStatCounters();
    initGitHubRepos();
    initContactForm();
    initScrollToTop();
    initAOS();
}

// ===================================
// NAVIGATION
// ===================================
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '1rem 0';
        }
    });

    // Active link on scroll (Scroll Spy)
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// DARK MODE TOGGLE
// ===================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===================================
// TYPING EFFECT
// ===================================
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const roles = [
        'Software Engineering Quality Analyst',
        'Embedded Systems Engineer',
        'Automotive Quality Specialist',
        'Data Analysis Expert',
        'CAN/LIN Protocol Specialist'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// SKILL BARS ANIMATION
// ===================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===================================
// STAT COUNTERS ANIMATION
// ===================================
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// ===================================
// GITHUB REPOSITORIES
// ===================================
async function initGitHubRepos() {
    const githubUsername = 'DARXS';
    const reposContainer = document.getElementById('github-repos');
    
    if (!reposContainer) return;

    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();
        
        // Filter out forked repos and sort by stars
        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6); // Show top 6 repos

        displayRepos(filteredRepos, reposContainer);
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        reposContainer.innerHTML = `
            <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem; color: #f59e0b;"></i>
                <p>Não foi possível carregar os repositórios do GitHub.</p>
                <p style="margin-top: 0.5rem;">
                    <a href="https://github.com/${githubUsername}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); font-weight: 600;">
                        Visite meu GitHub <i class="fas fa-external-link-alt"></i>
                    </a>
                </p>
            </div>
        `;
    }
}

function displayRepos(repos, container) {
    if (repos.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p style="color: var(--text-secondary);">Nenhum repositório público encontrado.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = repos.map(repo => `
        <div class="repo-card" data-aos="fade-up">
            <div class="repo-header">
                <i class="fab fa-github repo-icon"></i>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name">
                    ${repo.name}
                </a>
            </div>
            <p class="repo-description">
                ${repo.description || 'Sem descrição disponível'}
            </p>
            <div class="repo-stats">
                ${repo.language ? `
                    <div class="repo-stat">
                        <span class="language-dot" style="background: ${getLanguageColor(repo.language)}"></span>
                        <span>${repo.language}</span>
                    </div>
                ` : ''}
                <div class="repo-stat">
                    <i class="fas fa-star"></i>
                    <span>${repo.stargazers_count}</span>
                </div>
                <div class="repo-stat">
                    <i class="fas fa-code-branch"></i>
                    <span>${repo.forks_count}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C': '#555555',
        'TypeScript': '#2b7489',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Shell': '#89e051',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Arduino': '#bd79d1',
        'MATLAB': '#e16737',
        'Jupyter Notebook': '#DA5B0B'
    };
    
    return colors[language] || '#8b949e';
}

// ===================================
// CONTACT FORM
// ===================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Create mailto link
        const mailtoLink = `mailto:danilo.adryel.r.x.s@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`
        )}`;

        // Open mail client
        window.location.href = mailtoLink;

        // Show success message
        showNotification('Email aberto! Complete o envio no seu cliente de email.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// DOWNLOAD CV BUTTON
// ===================================
document.getElementById('download-cv')?.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple text CV
    const cvContent = generateCVContent();
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Danilo_Adryel_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('CV baixado com sucesso!', 'success');
});

function generateCVContent() {
    return `
DANILO ADRYEL RODRIGUES XAVIER SILVA
Software Engineering Quality Analyst | Embedded Systems Engineer
================================================================================

CONTATO
Email: danilo.adryel.r.x.s@gmail.com
Telefone: +55 87 99634-4807
LinkedIn: linkedin.com/in/daniloadryel
GitHub: github.com/DARXS
Localização: Recife - PE, Brasil

================================================================================
RESUMO PROFISSIONAL
================================================================================

Engenheiro Eletrônico e profissional de Qualidade Automotiva com experiência 
em sistemas embarcados e análise de falhas orientada à qualidade. Especialista 
em diagnóstico de sistemas de infotainment, protocolos CAN/LIN, e análise de 
dados com Power BI.

================================================================================
EXPERIÊNCIA PROFISSIONAL
================================================================================

SOFTWARE ENGINEERING QUALITY ANALYST - INFOTAINMENT & CONNECTIVITY
Stellantis South America | Dezembro 2025 - Atual
- Análises avançadas e root-cause analysis em sistemas de infotainment
- Resolução de problemas via protocolos CAN/LIN
- Uso de ferramentas Vector: CANalyzer, CANcase, Diaglyser
- Suporte técnico a concessionárias
- Gerenciamento completo do ciclo de vida de problemas E/E

PRODUCT ANALYST
act digital | Dezembro 2025 - Atual
- Análise de produto e desenvolvimento de soluções digitais

ESTAGIÁRIO EM CONFIABILIDADE E QUALIDADE DE MANUTENÇÃO
Stellantis South America | Junho 2025 - Novembro 2025
- Desenvolvimento de dashboards em Power BI integrados ao SAP PM
- Aplicação de metodologias: 5 Whys, RCA, FMEA

ESTAGIÁRIO DE PLANEJAMENTO E CONTROLE DE MANUTENÇÃO
Stellantis South America | Novembro 2024 - Maio 2025
- Análise de KPIs: MTTR, MTBF, Disponibilidade
- Operação do SAP PM para gestão de ordens de serviço

COORDENADOR DE ELETRÔNICA
Mangue Baja SAE UFPE | Abril 2024 - Abril 2025
- Liderança técnica da equipe de eletrônica automotiva
- Desenvolvimento de sistemas embarcados completos

DESENVOLVEDOR DE SISTEMAS EMBARCADOS
Mangue Baja SAE UFPE | Maio 2023 - Abril 2024
- Projeto de PCBs no KiCad
- Programação de firmware para ESP32 e STM32

================================================================================
FORMAÇÃO ACADÊMICA
================================================================================

Bacharelado em Engenharia Eletrônica
Universidade Federal de Pernambuco (UFPE) | 2022 - Em curso

FAST - Aceleração de Carreiras
CESAR School | 2025
Especialização: Engenharia de Qualidade de Software

Técnico em Meio Ambiente
Instituto Federal de Pernambuco (IFPE) | Concluído

================================================================================
HABILIDADES TÉCNICAS
================================================================================

Qualidade Automotiva:
- Infotainment & E/E Systems
- Root Cause Analysis (RCA)
- FMEA, 8D, 5 Whys, Ishikawa
- SWAT & Post-Production Support

Protocolos & Diagnóstico:
- CAN / LIN
- Vector Tools (CANalyzer, CANcase, Diaglyser, Dianalyser, CDA)

Programação:
- C / C++
- Python
- MATLAB / Simulink

Análise de Dados:
- Microsoft Power BI
- DAX & ETL
- KPIs & Performance Metrics

Sistemas Embarcados:
- ESP32 / STM32
- FreeRTOS / RTOS
- PCB Design (KiCad)

Metodologias:
- SAP PM
- Agile / SCRUM
- V-Model Development

================================================================================
CERTIFICAÇÕES
================================================================================

- Introduction to Advanced Automotive Batteries
- HIL Specialist 2.0 Specialization
- MATLAB Desktop Tools and Troubleshooting Scripts
- Foundations of Base Engine Calibration Methodology
- Simscape Onramp
- Especialista em Microsoft Power BI
- Machine Learning Specialization (DeepLearning.AI)
- C, C++, Python Programming (Pluralsight)

================================================================================
PRÊMIOS E CONQUISTAS
================================================================================

- 🥉 3º Lugar - Apresentação Eletrônica | 29ª Baja SAE Brasil
- 🏅 5º Lugar Geral | 29ª Baja SAE Brasil
- 🥇 1º Lugar Geral | 16ª Baja SAE Brasil - Etapa Nordeste
- 🥇 1º Lugar - Apresentação | 16ª Baja SAE Brasil - Etapa Nordeste
- 🥇 1º Lugar - Apresentação | 17ª Baja SAE Brasil - Etapa Nordeste

================================================================================
`;
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===================================
// AOS (Animate On Scroll) INITIALIZATION
// ===================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
}

// ===================================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ===================================
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/smooth-scroll@16.1.3/dist/smooth-scroll.polyfills.min.js';
    document.head.appendChild(script);
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log('%c🚀 Portfólio de Danilo Adryel', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%c👨‍💻 Software Engineering Quality Analyst @ Stellantis', 'color: #6b7280; font-size: 14px;');
console.log('%c📧 danilo.adryel.r.x.s@gmail.com', 'color: #6b7280; font-size: 12px;');
console.log('%c🔗 github.com/DARXS', 'color: #6b7280; font-size: 12px;');
console.log('%c💼 linkedin.com/in/daniloadryel', 'color: #6b7280; font-size: 12px;');
console.log('%c\n🛠️ Desenvolvido com HTML5, CSS3 e JavaScript', 'color: #10b981; font-size: 12px; font-weight: bold;');

// ===================================
// SERVICE WORKER REGISTRATION (PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Commented out for now - uncomment when you want to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ===================================
// ANALYTICS (Optional - Add your tracking code)
// ===================================
// Add Google Analytics or other analytics code here
// Example:
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'YOUR-GA-ID');

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open contact
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('active');
    }
});

// ===================================
// EASTER EGG
// ===================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    showNotification('🎉 Você descobriu o easter egg! Código Konami ativado!', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
