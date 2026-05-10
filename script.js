// ===================================
// VARIÁVEIS GLOBAIS
// ===================================
let currentLanguage = 'en'; // English as default language
let darkMode = false;

// ===================================
// PARTICLE SYSTEM
// ===================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = darkMode 
                ? `rgba(96, 165, 250, ${this.opacity})` 
                : `rgba(59, 130, 246, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.strokeStyle = darkMode 
                        ? `rgba(96, 165, 250, ${0.15 * (1 - distance / 120)})` 
                        : `rgba(59, 130, 246, ${0.15 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();

        animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    // Re-initialize on dark mode toggle
    window.reinitParticles = function() {
        cancelAnimationFrame(animationFrameId);
        init();
        animate();
    };
}

// ===================================
// NAVEGAÇÃO
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            scrollToSection(section);
            
            // Close mobile menu
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// ===================================
// SMOOTH SCROLL
// ===================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Make scrollToSection global for onclick attributes
window.scrollToSection = scrollToSection;

// ===================================
// THEME TOGGLE
// ===================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        darkMode = !darkMode;
        body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.setAttribute('data-lucide', darkMode ? 'sun' : 'moon');
        lucide.createIcons();
        
        // Reinitialize particles
        if (window.reinitParticles) {
            window.reinitParticles();
        }
        
        // Save preference
        localStorage.setItem('darkMode', darkMode);
    });

    // Load saved preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        darkMode = true;
        body.classList.add('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'sun');
        lucide.createIcons();
    }
}

// ===================================
// LANGUAGE TOGGLE
// ===================================
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    
    if (!langToggle) {
        console.error('Language toggle button not found!');
        return;
    }

    langToggle.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
        updateLanguage();
        updateLanguageButton();
        localStorage.setItem('language', currentLanguage);
    });

    // Load saved preference or use default
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    
    // Always update UI on init
    updateLanguage();
    updateLanguageButton();
}

function updateLanguage() {
    // Toggle PT elements
    document.querySelectorAll('.lang-pt').forEach(el => {
        el.style.display = currentLanguage === 'pt' ? 'block' : 'none';
    });

    // Toggle EN elements
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = currentLanguage === 'en' ? 'block' : 'none';
    });

    // Update nav menu items
    document.querySelectorAll('.nav-text-pt').forEach(el => {
        el.style.display = currentLanguage === 'pt' ? 'inline' : 'none';
    });
    document.querySelectorAll('.nav-text-en').forEach(el => {
        el.style.display = currentLanguage === 'en' ? 'inline' : 'none';
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'en';
}

function updateLanguageButton() {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;
    
    const flagIcon = langToggle.querySelector('.flag-icon');
    const langText = langToggle.querySelector('.lang-text');
    
    if (currentLanguage === 'en') {
        flagIcon.textContent = '🇧🇷';
        langText.textContent = 'PT';
    } else {
        flagIcon.textContent = '🇺🇸';
        langText.textContent = 'EN';
    }
}

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

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
// COUNTER ANIMATION
// ===================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / speed;
        let count = 0;

        const updateCounter = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.ceil(count) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };

        updateCounter();
    };

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ===================================
// TYPING EFFECT (OPTIONAL)
// ===================================
function initTypingEffect() {
    const roleElement = document.querySelector('.hero-role');
    if (!roleElement) return;

    const text = roleElement.textContent;
    roleElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            roleElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing after a delay
    setTimeout(typeWriter, 500);
}

// ===================================
// SKILL BARS ANIMATION
// ===================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initThemeToggle();
    initLanguageToggle();
    initScrollToTop();
    initCounters();
    initSkillBars();
    // initTypingEffect(); // Uncomment if you want the typing effect
    
    // Initialize Lucide icons
    lucide.createIcons();
});

// ===================================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ===================================
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
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
// LAZY LOADING IMAGES (IF NEEDED)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('🚀 Portfólio Danilo Adryel carregado com sucesso!');
console.log('💼 Software Engineering Quality Analyst | Stellantis');
console.log('🎨 Desenvolvido com tema automotivo e partículas dinâmicas');