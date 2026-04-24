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
        "M50,0 C70,20 90,50 90,75 C90,95 72,100 50,100 C28,100 10,95 10,75 C10,50 30,20 50,0 Z", // Classic Leaf
        "M50,2 C50,2 90,30 90,60 C90,80 70,100 50,100 C30,100 10,80 10,60 C10,30 50,2 50,2 Z", // Tear-drop Leaf
        "M50,0 C80,10 100,40 100,70 C100,90 80,100 50,100 C20,100 0,90 0,70 C0,40 20,10 50,0 Z", // Wide Leaf
        "M50,5 C65,20 85,45 85,70 C85,90 70,100 50,100 C30,100 15,90 15,70 C15,45 35,20 50,5 Z" // Oval Pointy Leaf
    ];
    
    // 40-60 individual leaves (doubled from previous 20-30)
    const leafCount = 40 + Math.floor(Math.random() * 21); 
    const bodyHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        const size = 40 + Math.random() * 140; // 40px to 180px
        const rotation = -60 + Math.random() * 120; // -60deg to 60deg
        const color = leafColors[Math.floor(Math.random() * leafColors.length)];
        const opacity = 0.1 + Math.random() * 0.3; // Slightly lower opacity (0.1 - 0.4) for more leaves
        
        // Horizontal position between 2% and 98% to allow more spread
        const posX = 2 + Math.random() * 96; 
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
