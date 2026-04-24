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

// Subtle Decorative Leaves Scattering
function initLeaves() {
    // Using the primary color as requested, with very low opacity for subtlety
    const leafColor = 'var(--primary)'; 
    const leafPaths = [
        "M50,0 C70,20 90,50 90,75 C90,95 72,100 50,100 C28,100 10,95 10,75 C10,50 30,20 50,0 Z", // Classic Leaf
        "M50,2 C50,2 90,30 90,60 C90,80 70,100 50,100 C30,100 10,80 10,60 C10,30 50,2 50,2 Z", // Tear-drop Leaf
        "M50,0 C80,10 100,40 100,70 C100,90 80,100 50,100 C20,100 0,90 0,70 C0,40 20,10 50,0 Z" // Wide Leaf
    ];
    
    // Create 30-40 leaves for a scattered look across the whole page
    const leafCount = 30 + Math.floor(Math.random() * 11); 
    const bodyHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        const size = 60 + Math.random() * 100; // 60px to 160px for elegant look
        const rotation = Math.random() * 360; 
        const opacity = 0.03 + Math.random() * 0.05; // Extremely subtle (3% to 8%) as in reference
        
        const posX = Math.random() * 100; 
        const posY = Math.random() * bodyHeight; 
        
        leaf.setAttribute("viewBox", "0 0 100 100");
        leaf.setAttribute("class", "leaf-decoration");
        leaf.setAttribute("aria-hidden", "true");
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;
        leaf.style.left = `${posX}%`;
        leaf.style.top = `${posY}px`;
        leaf.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        leaf.style.opacity = opacity;
        leaf.style.fill = leafColor;
        
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
