// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        
        if (!isOpen) {
            item.classList.add('open');
        }
    });
});

// Floating Particles
const container = document.getElementById('particles-container');
if (container) {
    const colors = ['#D9E3CC', '#C59D5F', '#2D4236'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'leaf-particle';
        const size = Math.random() * 20 + 15;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.opacity = Math.random() * 0.2;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.innerHTML = `<svg viewBox="0 0 100 100" fill="${color}"><path d="M50 0C50 0 80 20 80 50C80 80 50 100 50 100C50 100 20 80 20 50C20 20 50 0 50 0Z"/></svg>`;
        
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
    }

    for(let i=0; i<15; i++) createParticle();
}

// Active Nav Link highlighting
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
        link.style.color = 'var(--tertiary)';
        link.style.fontWeight = '700';
    }
});
