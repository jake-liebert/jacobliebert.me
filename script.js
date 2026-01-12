// ========================================
// Premium Website Animations with GSAP
// ========================================

// Remove no-js class for graceful degradation
document.documentElement.classList.remove('no-js');

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========================================
// Hero Entrance Animation (Orchestrated)
// ========================================

if (!prefersReducedMotion) {
    // Set initial hidden states for hero elements only
    gsap.set('.hero-image, .hero-greeting, .hero-name, .hero-title, .hero-subtitle, .hero-cta, .hero-scroll', {
        opacity: 0,
        y: 20
    });

    // Create entrance timeline
    const heroTl = gsap.timeline({ delay: 0.3 });

    heroTl
        .to('.hero-image', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        .to('.hero-greeting', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('.hero-name', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.hero-title', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('.hero-scroll', { opacity: 1, y: 0, duration: 0.8 }, '-=0.2');
}

// ========================================
// Smooth Scroll for Navigation Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Navbar Background on Scroll
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ========================================
// Scroll Progress Indicator
// ========================================

gsap.to('.scroll-progress', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
    }
});

// ========================================
// Animated Stat Counters
// ========================================

function animateCounter(element, target, prefix = '', suffix = '') {
    gsap.to({ val: 0 }, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
            element.textContent = prefix + Math.floor(this.targets()[0].val) + suffix;
        }
    });
}

function animateArrowCounter(element) {
    const tl = gsap.timeline();
    tl.to({ val: 0 }, {
        val: 4,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: function() {
            element.textContent = Math.floor(this.targets()[0].val) + '→10';
        }
    })
    .to({ val: 4 }, {
        val: 10,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: function() {
            element.textContent = '4→' + Math.floor(this.targets()[0].val);
        }
    });
}

ScrollTrigger.create({
    trigger: '.stats',
    start: 'top 70%',
    onEnter: () => {
        document.querySelectorAll('.stat-number[data-count]').forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const prefix = stat.dataset.prefix || '';
            const suffix = stat.dataset.suffix || '';
            animateCounter(stat, target, prefix, suffix);
        });

        const specialStat = document.querySelector('[data-count-special]');
        if (specialStat) animateArrowCounter(specialStat);
    },
    once: true
});

// ========================================
// Cursor Glow Effect (Desktop Only)
// ========================================

const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow && window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();

    document.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
}

// ========================================
// 3D Card Tilt Effect
// ========================================

if (typeof VanillaTilt !== 'undefined' && window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
    VanillaTilt.init(document.querySelectorAll('.highlight-card, .scale-card, .skill-card, .education-card'), {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.15,
        scale: 1.02,
        perspective: 1000,
    });
}

// ========================================
// Simple Fade-In on Scroll (Reliable)
// ========================================

// Only animate elements that enter viewport, no stagger issues
if (!prefersReducedMotion) {
    // Section titles with blur
    gsap.utils.toArray('.section-title').forEach(el => {
        gsap.fromTo(el,
            {
                opacity: 0,
                filter: 'blur(10px)',
                y: 30
            },
            {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                }
            }
        );
    });

    // Cards with simple fade up (no stagger to avoid progressive fade issue)
    const cardSelectors = [
        '.stat-card',
        '.highlight-card',
        '.scale-card',
        '.education-card',
        '.skill-card',
        '.win-card',
        '.timeline-item'
    ];

    cardSelectors.forEach(selector => {
        gsap.utils.toArray(selector).forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 40
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                }
            );
        });
    });
}

// ========================================
// Timeline Draw-On Animation
// ========================================

const timelineLine = document.querySelector('.timeline-line');
if (timelineLine) {
    gsap.to('.timeline-line', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1
        }
    });
}

// ========================================
// Hero Floating Shapes Parallax
// ========================================

if (!prefersReducedMotion) {
    const shapes = [
        { selector: '.hero-shape-1', distance: -100, scrub: 1 },
        { selector: '.hero-shape-2', distance: -150, scrub: 1.5 },
        { selector: '.hero-shape-3', distance: -80, scrub: 0.8 }
    ];

    shapes.forEach(shape => {
        gsap.to(shape.selector, {
            y: shape.distance,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: shape.scrub
            }
        });
    });
}

// ========================================
// Mobile Navigation Menu
// ========================================

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileOverlay = document.querySelector('.mobile-nav-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

function toggleMobileNav() {
    navToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');

    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);

    mobileNav.setAttribute('aria-hidden', isExpanded);
    mobileOverlay.setAttribute('aria-hidden', isExpanded);

    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', toggleMobileNav);
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileNav();
    });
});

// ========================================
// Active Nav Link Highlighting
// ========================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = '#e8e8ed';
            } else {
                navLink.style.color = '#9898a8';
            }
        }
    });
});
