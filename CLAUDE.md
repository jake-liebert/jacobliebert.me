# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Jake Liebert, hosted on GitHub Pages at jacobliebert.me. Single-page static site optimized for executive recruiters, CPOs, and startup founders. Emphasizes AI transformation leadership and enterprise-scale product management.

## Development Workflow

### Testing Changes Locally
```bash
open index.html
```
**ALWAYS test changes locally before committing.** Do not ask permission - just open the file and verify changes.

### Deployment
**CRITICAL: ALWAYS ASK before pushing to GitHub.** This is a live production site visible to recruiters and executives. The deployment workflow is:
1. Make changes
2. Test locally with `open index.html`
3. Commit changes with descriptive message
4. **Ask user before pushing** - Never push without explicit permission

### Git Commands
```bash
# Standard workflow
git add .
git commit -m "$(cat <<'EOF'
Descriptive message here

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
# Only push after user approval
git push origin main
```

## Site Architecture

### Core Files
- **index.html** - Single-page site structure with semantic sections
- **styles.css** - All styling with CSS variables at top (lines 1-23)
- **script.js** - Client-side interactions (scroll behavior, animations, nav highlighting)
- **headshot.jpeg** - Profile photo
- **Liebert_Jake_Resume.pdf** - Downloadable resume
- **favicon.svg** - Site icon
- **CNAME** - Custom domain configuration for GitHub Pages

### Design System
The site uses a dark theme with premium gold/copper accents:
- **Color Variables** (styles.css:1-23):
  - Primary gold: `--color-gold` (#d4a574)
  - Copper accent: `--color-copper` (#b87333)
  - Dark backgrounds: `--color-bg` (#0a1628), `--color-bg-alt` (#0d1e36)
  - Surface: `--color-surface` (#132742)
  - Text: `--color-text` (#f0f4f8), `--color-text-muted` (#8ba3bc)
- **Typography**:
  - Headings: Sora font (loaded from Google Fonts)
  - Body: Inter font (loaded from Google Fonts)
- **Card-Based Design**: Sections use consistent card patterns with hover effects and borders

### Page Structure (Sections in Order)
1. **Navigation** (fixed navbar) - Logo, links to About/Impact/Experience/Contact
2. **Hero** - Name, tagline, photo, CTAs
3. **Stats** - 4-stat grid highlighting key metrics ($600M impact, 4→10 PM scaling, etc.)
4. **How I Operate** - Leadership philosophy with highlight cards
5. **Operating at Enterprise Scale** - 3-card grid explaining cross-functional work
6. **Marquee Wins** - Detailed impact stories (3 major wins)
7. **Experience** - Timeline of roles
8. **Education** - 3-card grid (Duke MBA, Stanford, Naval Academy)
9. **Skills** - 4-card grid of capabilities
10. **What I'm Building Toward** - Future aspirations
11. **Contact** - LinkedIn and email links
12. **Footer**

### JavaScript Features (script.js)

**Premium Animation Library**: GSAP 3.12.5 + ScrollTrigger (loaded via CDN)

**Core Features**:
- **Orchestrated hero entrance** - Cascading reveal: photo → greeting → name → title → CTAs
- **Animated stat counters** - Numbers count up when stats section enters viewport ($600M, 4→10, etc.)
- **Cursor glow effect** - Subtle gold gradient follows cursor (desktop only, disabled on touch devices)
- **Scroll progress indicator** - Gold line at top tracks scroll position
- **3D card tilt effects** - Cards respond to mouse position with perspective tilt (via vanilla-tilt.js)
- **Gradient border animations** - Animated gradient borders on card hover
- **Blur-to-focus reveals** - Section titles blur into focus as they enter viewport
- **Timeline draw-on animation** - Experience timeline line draws itself on scroll
- **Card fade-in animations** - Individual cards animate in when visible
- **Mobile hamburger menu** - Slide-in navigation panel with staggered link reveals
- **Hero floating shapes** - Decorative shapes with scroll-linked parallax
- **Active nav link highlighting** - Highlights current section in navigation

**External Libraries** (CDN):
- GSAP 3.12.5 (`gsap.min.js`)
- GSAP ScrollTrigger (`ScrollTrigger.min.js`)
- vanilla-tilt.js 1.8.1 (`vanilla-tilt.min.js`)

**Accessibility Features**:
- `prefers-reduced-motion` support - disables animations for users who prefer reduced motion
- Graceful degradation - site works without JavaScript (`.no-js` class fallback)
- Touch device detection - cursor glow and tilt effects disabled on mobile

## Content Strategy & Positioning

**Target Audience**: Executive recruiters, CPOs, startup founders looking for VP Product or founding product executives.

**Core Positioning**:
- Transform enterprises through AI platforms that executives bet hundreds of millions on
- NOT "I build ML products" but "I drive organizational transformation at $650B scale"
- Emphasize: AI transformation, change management, operating at enterprise scale

**Key Differentiators**:
- Navy Nuclear Officer background (leadership in zero-error environments)
- $600M+ business impact target
- Scaled product org from 4 to 10 PMs
- Cross-functional coordination of 60+ technical personnel
- Secured multi-year platform investments

**Tone**: Professional but approachable. Direct and achievement-oriented. Specific metrics over vague claims.

## Editing Guidelines

### Responsive Design Requirements
**ALL CSS changes MUST include responsive breakpoints**:
- Desktop: Default styles
- Tablet: `@media (max-width: 900px)` - handles about/scale/education/skills grid layouts
- Mobile: `@media (max-width: 768px)` - nav, section padding, timeline adjustments
- Small Mobile: `@media (max-width: 480px)` - stats grid, text sizes, contact links

### Design Consistency
- New sections should follow card-based patterns (`.card` with `background: var(--color-surface)`, `border: 1px solid var(--color-border)`)
- Use CSS variables exclusively for colors - never hardcode color values
- Maintain hover effects: `translateY(-4px)` or `translateX(8px)` with border color change to `var(--color-primary)`
- All animations use defined transitions: `var(--transition-fast)` (0.2s) or `var(--transition-medium)` (0.3s)

### Content Standards
- Every metric must be specific and credible
- No generic corporate language or buzzwords
- Maintain consistent voice throughout
- Premium aesthetics - avoid stock photography patterns

### Font Loading
Fonts are loaded from Google Fonts (index.html:10-12). Any new text must use either:
- `font-family: var(--font-heading)` for headings (Sora)
- `font-family: var(--font-main)` for body text (Inter)
- Or inherit from parent (default body text uses Inter)

## Common Patterns

### Adding a New Section
```html
<section id="section-id" class="section section-name">
    <div class="container">
        <h2 class="section-title">Section Title</h2>
        <!-- Content grid or cards -->
    </div>
</section>
```

### Card Pattern
```html
<div class="card-name">
    <h3>Card Title</h3>
    <p>Card content</p>
</div>
```

With CSS:
```css
.card-name {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 32px;
    transition: var(--transition-medium);
}

.card-name:hover {
    border-color: var(--color-primary);
    transform: translateY(-4px);
}
```

### Adding New GSAP Animations

**CRITICAL: Use `gsap.fromTo()` not `gsap.from()`**
- Explicitly sets both start state (hidden) and end state (visible)
- More reliable - prevents elements getting stuck in hidden states

**Pattern for scroll-triggered animations:**
```javascript
gsap.fromTo('.element',
    {
        // Start state (hidden)
        opacity: 0,
        y: 40
    },
    {
        // End state (visible)
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.element',
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true
        }
    }
);
```

**Avoid staggered animations on cards** - They can cause progressive fade issues where first card is fully visible, second partially visible, third more faded. Instead, use individual triggers per card.

**Common ScrollTrigger settings:**
- `start: 'top 90%'` - Animation starts when element is 90% down viewport
- `toggleActions: 'play none none none'` - Only play forward, no reverse
- `once: true` - Animation fires only once
- `scrub: 1` - For scroll-linked animations (like parallax)

## Animation Performance

**GPU-Accelerated Properties** (use these):
- `transform` (translateX, translateY, scale, rotate)
- `opacity`
- `filter` (sparingly)

**Avoid Animating** (causes layout reflow):
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

**Mobile Optimization**:
- Hero shapes have reduced opacity and less blur on mobile
- Cursor glow and 3D tilt disabled on touch devices
- Staggered animations avoided to reduce complexity

## GitHub Pages Deployment

Site is deployed via GitHub Pages to custom domain `jacobliebert.me` (configured in CNAME file). Any push to `main` branch automatically deploys the site. This is why push approval is critical.
