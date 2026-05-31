# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Jake Liebert, hosted on GitHub Pages at jacobliebert.me. Single-page static site — **vanilla HTML/CSS/JS, no frameworks, no build step, no CDN libraries** — optimized primarily for **executive-recruiter inbound** (secondary: CPOs, startup founders). A recruiter scans the fold in 10–15 seconds, so the page is intentionally tight (~400 words) and leads with realized proof and one clear CTA. Current design: **"Executive Luxe"** — a light editorial one-pager.

## Development Workflow

### Testing Changes Locally
```bash
open index.html
```
**ALWAYS test changes locally before committing.** Do not ask permission — just open the file and verify.

### Deployment
**CRITICAL: ALWAYS ASK before pushing to GitHub.** This is a live production site visible to recruiters and executives. Workflow:
1. Make changes
2. Test locally with `open index.html`
3. Commit with a descriptive message
4. **Ask before pushing** — never push without explicit permission

### Git Commands
```bash
# Stage explicitly — never `git add .` (the untracked resume/ dir and local
# scratch must not be swept in).
git add index.html styles.css script.js
git commit -m "$(cat <<'EOF'
Descriptive message here

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
EOF
)"
# Only push after user approval
git push origin main
```
Commits are authored as `Jake Liebert <67597931+jake-liebert@users.noreply.github.com>` (repo-local git config) so GitHub credits them to the account.

## Site Architecture

### Core Files
- **index.html** — single-page structure (semantic sections, OG/Twitter meta, JSON-LD Person)
- **styles.css** — all styling; design tokens in `:root` (top of file)
- **script.js** — minimal vanilla interaction layer (one IIFE, no frameworks, no CDN)
- **headshot.jpeg** — profile photo (800×800; displayed ~240px)
- **Liebert_Jake_Resume.pdf** — downloadable résumé
- **favicon.svg** — site icon (JL monogram)
- **og-card.png** — 1200×630 social share card
- **apple-touch-icon.png** — 180×180 iOS icon
- **CNAME** — custom domain (jacobliebert.me)

### Design System — "Executive Luxe"
Light editorial aesthetic; restraint is the point: warm paper background, near-black ink, one restrained oxblood accent (<5% of the page), generous whitespace.

- **Design tokens** (`styles.css` `:root`):
  - Background `--bone` (#FAF8F4); surfaces `--surface` (#FFFFFF), `--surface-2` (#F1ECE3, alt sections)
  - Text `--ink` (#16181D), `--muted` (#5A5750)
  - Lines/borders `--hairline` (#E4DDD1)
  - Accent `--oxblood` (#6E2A2A), `--oxblood-deep` (#571F1F) — CTAs, kickers, the proof arrow, the contact email only
  - Type `--serif` ('Fraunces') for the name/headings/numbers, `--sans` ('Inter') for body
  - Rhythm `--shell-max` (1120px), `--shell-pad` (48px), `--section-y` (120px), `--ease` (cubic-bezier(0.22,0.61,0.36,1))
- **Typography**: Fraunces (editorial serif) + Inter, loaded from Google Fonts in the head.
- **Layout**: a centered `.shell` (max 1120px) wraps each section; hairline rules separate sections; cards are light with thin borders and a subtle hover lift.

### Page Structure (in order)
1. **Masthead** (sticky) — JL monogram, nav (Work / Career / Contact), persistent "Email" button
2. **Hero** — availability eyebrow chip, headshot, name, italic value proposition, role line, three realized proof chips (150+ users · 4→15 · 60+), primary CTA "Get in touch" + quiet "Download resume"
3. **Proof band** — four stats with tabular figures and honest labels ("Enterprise impact target", "Operating scale · Walmart US")
4. **Selected Work** — three compact, result-first cards
5. **Career** — compressed timeline, five roles (one outcome line each)
6. **Background + Education** — a short bio statement merged with a three-credential row
7. **Contact** — one line + the email (primary) + LinkedIn / Résumé
8. **Footer** — monogram + copyright

### JavaScript (script.js)
Minimal, near-still, **no frameworks and no CDN dependencies** — a single IIFE:
- **Reveal on scroll** — `.reveal` → `.is-in` via IntersectionObserver. Failsafe: under `.no-js` OR `prefers-reduced-motion`, everything renders at final state (nothing stays hidden).
- **Proof-band count-up** — snappy tabular tick-up for the four numbers (motion-gated; the HTML already holds the final literal values as the reduced-motion / no-JS fallback).
- **Sticky masthead hairline** — appears on scroll.
- **Active-section nav highlighting** — via IntersectionObserver.

**Removed from the previous build — do NOT reintroduce:** GSAP, ScrollTrigger, vanilla-tilt.js, cursor-glow, floating hero shapes, scroll-progress bar.

### Accessibility
- WCAG-AA contrast (muted text ≈ 6.8:1, oxblood ≈ 9.7:1 on bone)
- Visible `:focus-visible` rings; skip-link to contact
- `prefers-reduced-motion` and `.no-js` both render the full final page
- Semantic HTML, alt text, aria labels on nav/sections

### SEO / Social
Open Graph + Twitter `summary_large_image` (image: og-card.png), `<link rel=canonical>`, JSON-LD `Person` (name, jobTitle, worksFor Walmart, alumniOf Duke + Naval Academy, sameAs the LinkedIn URL only), apple-touch-icon, favicon.

## Content Strategy & Positioning

**Target audience**: executive recruiters (primary), CPOs, founders — hiring VP Product / CPO / founding product executives.

**Core positioning**:
- "I build the AI platforms that Fortune 1 leaders bet hundreds of millions on" — transformation, not feature-shipping.
- Emphasize AI transformation, organizational change management, operating at $650B scale.

**Honesty rules (non-negotiable)**:
- **Realized** (state plainly): 150+ Finance users on a shipped AI agent; PM org scaled 4→15; 60+ technical personnel coordinated; 2% sales lift; 30% ML accuracy gain; Navy (USS Nevada SSBN-733, 5 strategic deterrent patrols, OOD + EOOW, led 19 technicians); Duke MBA Decision Sciences GPA 3.86; Naval Academy BS Computer Science.
- **Target / scale** (label as such, never "delivered"): $600M is an impact **target** ($200M margin + $400M sales); $650B is Walmart US **operating scale**, not personal P&L; $1B+ is **potential** revenue from the 2% lift.

**Tone**: professional but approachable; specific metrics over buzzwords; less is more (keep the page ~400 words).

## Editing Guidelines

### Responsive
ALL CSS changes must cover the breakpoints in use:
- `@media (max-width: 1040px)` — shell padding / hero gap
- `@media (max-width: 900px)` — hero stacks to one column (body before portrait), proof band → 2-up, work cards → 1-up
- `@media (max-width: 768px)` — nav hidden, section padding, career rows stack
- `@media (max-width: 480px)` — smaller portrait, full-width CTA, proof band → 1-up

### Design Consistency
- Use the design tokens exclusively for color/type — never hardcode values.
- Keep the single-accent discipline: oxblood on <5% of the page (CTA, kickers, arrow, email). Do not introduce a second accent.
- Cards: `background: var(--surface)`, `border: 1px solid var(--hairline)`, ~14px radius, subtle hover lift (`translateY(-5px)` + softened border).
- Transitions use `var(--ease)`.

### Content Standards
- Every metric specific, credible, and honestly framed (target vs realized).
- No generic corporate language; maintain the editorial, confident voice.

### Fonts
Loaded from Google Fonts in the head. Use `var(--serif)` (Fraunces) for display/headings/numbers, `var(--sans)` (Inter) for body, or inherit.

## Common Patterns

### Adding a Section
```html
<section id="section-id" class="section" aria-labelledby="x-title">
    <div class="shell">
        <div class="section-head reveal">
            <span class="kicker">0X — Label</span>
            <h2 id="x-title" class="section-title">Title</h2>
        </div>
        <!-- content -->
    </div>
</section>
```
Use `.section-alt` for an alternate (surface-2) background. Add `.reveal` to elements that should fade up.

### Reveal-on-scroll Pattern (replaces GSAP)
Add the `reveal` class in HTML; the IIFE in script.js observes it and adds `is-in`. CSS:
```css
.reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s var(--ease), transform .7s var(--ease); }
.reveal.is-in { opacity: 1; transform: none; }
.no-js .reveal { opacity: 1; transform: none; }            /* failsafe */
@media (prefers-reduced-motion: reduce) { .reveal { opacity: 1 !important; transform: none !important; } }
```
**Always provide the visible failsafe** — never let content depend solely on JS/motion to appear (this is how the headless screenshots and no-JS users still see the full page).

### Animation Performance
- Animate only `transform` / `opacity` (GPU-friendly). Avoid `width`/`height`/`top`/`left`/`margin`.
- Keep motion minimal and near-still — it signals seniority and keeps the first paint fast.

## GitHub Pages Deployment
Deployed via GitHub Pages (legacy build) to the custom domain `jacobliebert.me` (CNAME file). Any push to `main` auto-deploys (~1 min). This is why push approval is critical.
