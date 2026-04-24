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

// FAQ Accordion Accessibility & Logic
document.querySelectorAll('.faq-question').forEach((btn, index) => {
    const answer = btn.nextElementSibling;
    const isExpanded = btn.parentElement.classList.contains('open');
    
    btn.setAttribute('aria-expanded', isExpanded);
    btn.setAttribute('aria-controls', `faq-answer-${index}`);
    btn.id = `faq-question-${index}`;
    if (answer) {
        answer.id = `faq-answer-${index}`;
        answer.setAttribute('aria-labelledby', btn.id);
        answer.setAttribute('role', 'region');
    }

    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        if (!isOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

// Active Nav Link highlighting
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
        link.style.color = 'var(--tertiary)';
        link.style.fontWeight = '700';
    }
});

// Decorative Leaves Scattering
function initLeaves() {
    const leafColors = ['#2D4236', '#4A6741', '#8FAF7E', '#C59D5F', '#A0522D', '#D9E3CC'];
    const leafPaths = [
        "M10,90 Q40,90 90,10 Q60,40 10,90", // Simple leaf
        "M10,90 C10,90 20,40 80,10 C80,10 100,30 90,90 C90,90 50,100 10,90", // Broader leaf
        "M50,95 Q40,60 10,50 Q40,40 50,5 Q60,40 90,50 Q60,60 50,95" // Symmetrical leaf
    ];
    
    // 20-30 individual leaves as requested
    const leafCount = 20 + Math.floor(Math.random() * 11); 
    const bodyHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        const size = 40 + Math.random() * 140; // 40px to 180px
        const rotation = -60 + Math.random() * 120; // -60deg to 60deg
        const color = leafColors[Math.floor(Math.random() * leafColors.length)];
        const opacity = 0.15 + Math.random() * 0.35; // 0.15 to 0.5
        
        // Horizontal position between 5% and 95% to avoid overflow
        const posX = 5 + Math.random() * 90; 
        const posY = Math.random() * bodyHeight; 
        
        leaf.setAttribute("viewBox", "0 0 100 100");
        leaf.setAttribute("class", "leaf-decoration");
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;
        leaf.style.left = `${posX}%`;
        leaf.style.top = `${posY}px`;
        leaf.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        leaf.style.opacity = opacity;
        leaf.style.fill = color;
        
        path.setAttribute("d", leafPaths[Math.floor(Math.random() * leafPaths.length)]);
        leaf.appendChild(path);
        
        document.body.appendChild(leaf);
    }
}

// Initialize leaves on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeaves);
} else {
    initLeaves();
}
