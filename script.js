// ========================================
// jacobliebert.me — minimal animation layer
// ========================================

document.documentElement.classList.remove('no-js');

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========================================
// Hero Entrance
// ========================================

if (!prefersReducedMotion) {
    gsap.set('.hero-image, .hero-name, .hero-thesis, .hero-credentials, .hero-cta', {
        opacity: 0,
        y: 16
    });

    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
        .to('.hero-image',       { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
        .to('.hero-name',        { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .to('.hero-thesis',      { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .to('.hero-credentials', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('.hero-cta',         { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// Navbar Background on Scroll
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
        navbar.style.background = 'rgba(10, 22, 40, 0.95)';
        navbar.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.35)';
    } else {
        navbar.style.background = 'rgba(10, 22, 40, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// ========================================
// Scroll Progress Bar
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
// Stat Counters
// ========================================

function animateCounter(element, target, prefix = '', suffix = '') {
    gsap.to({ val: 0 }, {
        val: target,
        duration: 1.8,
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
        duration: 0.7,
        ease: 'power2.out',
        onUpdate: function() {
            element.textContent = Math.floor(this.targets()[0].val) + '→15';
        }
    })
    .to({ val: 4 }, {
        val: 15,
        duration: 1.1,
        ease: 'power2.inOut',
        onUpdate: function() {
            element.textContent = '4→' + Math.floor(this.targets()[0].val);
        }
    });
}

ScrollTrigger.create({
    trigger: '.stats',
    start: 'top 80%',
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
// Cursor Glow (Desktop Only)
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
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();

    document.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
}

// ========================================
// Section Title Reveal
// ========================================

if (!prefersReducedMotion) {
    gsap.utils.toArray('.section-title').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                    once: true
                }
            }
        );
    });

    // Cards fade up individually (no stagger to avoid progressive fade issues)
    const cardSelectors = [
        '.stat-card',
        '.case-study',
        '.principle',
        '.education-card',
        '.timeline-item'
    ];

    cardSelectors.forEach(selector => {
        gsap.utils.toArray(selector).forEach(card => {
            gsap.fromTo(card,
                { opacity: 0, y: 32 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 92%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                }
            );
        });
    });
}

// ========================================
// Timeline Line Draw-On
// ========================================

const timelineLine = document.querySelector('.timeline-line');
if (timelineLine && !prefersReducedMotion) {
    gsap.to('.timeline-line', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 65%',
            end: 'bottom 80%',
            scrub: 1
        }
    });
}

// ========================================
// Mobile Navigation
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
        if (mobileNav.classList.contains('active')) toggleMobileNav();
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
                navLink.style.color = 'var(--color-text)';
            } else {
                navLink.style.color = '';
            }
        }
    });
});
