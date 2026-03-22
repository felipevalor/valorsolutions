# CRO Improvements — Valor Solutions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply all conversion rate optimization changes identified in the UX/CRO analysis to index.html, style.css, and main.js.

**Architecture:** Pure HTML/CSS/JS site hosted on Cloudflare Pages. No build system. All changes are direct file edits.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, Cloudflare Pages

---

## Files Modified
- `public/index.html` — structure, copy, sections
- `public/css/style.css` — logo size, new sections (testimonials, FAQ, WhatsApp button)
- `public/js/main.js` — counter targets, WhatsApp init

---

### Task 1: H1 fallback + logo size reduction

**Files:**
- Modify: `public/index.html`
- Modify: `public/css/style.css`

- [ ] Set default text inside `#scramble-headline` so H1 shows before JS fires
- [ ] Reduce inline logo height from 180px → 60px, remove margin-left
- [ ] Reduce CSS `.logo img` height from 90px → 48px
- [ ] Commit: `fix: add H1 fallback text and reduce logo size`

---

### Task 2: Update hero metrics (remove jargon)

**Files:**
- Modify: `public/index.html`

- [ ] Change metric 1: target 3 → 5, label "proyectos lanzados" → "proyectos entregados"
- [ ] Change metric 2: target 100, suffix "%" → target 30, suffix " días", label "edge, sin servidores" → "de idea a producto"
- [ ] Keep metric 3: 24hs unchanged
- [ ] Commit: `copy: update hero metrics to reduce jargon`

---

### Task 3: Update hero subtitle + form CTA copy

**Files:**
- Modify: `public/index.html`

- [ ] Replace subtitle with outcome-focused copy
- [ ] Replace form submit button text: "Quiero empezar" → "Contanos tu proyecto"
- [ ] Commit: `copy: update hero subtitle and form CTA`

---

### Task 4: Reorder sections — Services before About

**Files:**
- Modify: `public/index.html`

- [ ] Move `#servicios` section before `#sobre-mi` in HTML
- [ ] Update nav links order accordingly
- [ ] Commit: `ux: move services section before about for better flow`

---

### Task 5: Add results to project cards

**Files:**
- Modify: `public/index.html`

- [ ] Add result line to Turnos Psico card
- [ ] Add result line to Gebyanos card
- [ ] Commit: `copy: add outcome results to project cards`

---

### Task 6: Add testimonials section

**Files:**
- Modify: `public/index.html`
- Modify: `public/css/style.css`

- [ ] Add `#testimonios` section after `#proyectos`
- [ ] Add CSS for testimonials grid
- [ ] Commit: `feat: add testimonials section`

---

### Task 7: Add FAQ section

**Files:**
- Modify: `public/index.html`
- Modify: `public/css/style.css`

- [ ] Add `#faq` section before `#contacto` with 4 common objections answered
- [ ] Add CSS for FAQ accordion-style layout
- [ ] Commit: `feat: add FAQ section with pricing and process transparency`

---

### Task 8: Add floating WhatsApp button

**Files:**
- Modify: `public/index.html`
- Modify: `public/css/style.css`
- Modify: `public/js/main.js`

- [ ] Add WhatsApp floating button HTML (with placeholder phone number)
- [ ] Add CSS: fixed position bottom-right, WhatsApp green, mobile-prominent
- [ ] Commit: `feat: add floating WhatsApp contact button`

---

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | — |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | — | — |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 0 | — | — |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | CLEAN (FULL) | score: 5/10 → 8/10, 2 decisions |

**UNRESOLVED:** 2 (testimonios reales, proyecto "Valor Solutions" como proyecto propio)
**VERDICT:** Design Review CLEARED — eng review recomendado antes de hacer push
