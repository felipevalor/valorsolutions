# TODO — UI Component Architect: Valor Solutions

## Context

- **Framework**: Vanilla HTML/CSS/JS (no framework)
- **Deploy**: Cloudflare Pages + Workers + D1
- **Design system**: CSS custom properties parcialmente definidas en `style.css`
- **Token source**: `:root` en `public/css/style.css`
- **Theming**: Solo light mode. Sin dark mode implementado.
- **Estado actual**: Site de portfolio/agencia de una sola página (`index.html`)

---

## Design Token Audit

### Tokens existentes (`:root`)
```css
--bg: #f5f5f5
--surface: #ffffff
--border: #e0e0e0
--accent: #0a0a0a
--text: #0a0a0a
--muted: #888888
--red: #f45151
--container-width: 1100px
--transition-base: 280ms cubic-bezier(0.16, 1, 0.3, 1)
```

### Tokens faltantes (hardcodeados en el código)
- `font-size` de H1: `clamp(2.5rem, 8vw, 4.5rem)` — no token
- `font-family`: `"Segoe UI", system-ui, -apple-system` — no token
- `line-height`: `1.6`, `1.7`, `1.2` — no tokens
- `padding` de section: `100px 0` — no token
- `gap` entre cards: `2rem` — no token
- Color hover de btn: `#d93e3e` — no es `--red` oscurecido como token
- Nav height: `120px` — hardcodeado en 3 lugares

---

## Component Inventory (estado actual)

### Atoms (primitivos)
- [x] **Button** — `.btn` + `.btn.magnetic`
- [x] **Badge** — `.badge` + `.badge.live`
- [x] **Input** — `input[type=text]`, `input[type=email]`, `textarea`
- [x] **Label** — `.form-group label`
- [ ] **Icon** — Sin sistema de iconos (solo SVG inline en WhatsApp float)
- [ ] **Spinner** — Sin estado de loading visual (form usa texto "Enviando...")

### Molecules
- [x] **Card** — `.card` con header, body, stack-badges, project-link
- [x] **Metric** — `.metric` con value + label + animación de contador
- [x] **Step** — `.step` con número + título + descripción
- [x] **FormGroup** — `.form-group` con label + input + validación
- [x] **Testimonial** — layout editorial cite + blockquote
- [x] **FAQItem** — `.faq-item` con accordion button + answer
- [ ] **Toast/Notification** — form-status existe pero no es reutilizable
- [ ] **ProjectCard** — card especializada (no separada como componente)

### Organisms
- [x] **Nav** — fixed header con logo + links + mobile toggle
- [x] **Hero** — sección con scramble headline + métricas + CTA
- [x] **ServicesGrid** — grid de 6 cards de servicios
- [x] **ProcessSteps** — 5-step horizontal
- [x] **ProjectsGrid** — 2-col grid de project cards
- [x] **TestimonialsSection** — lista editorial de testimonios
- [x] **FAQSection** — accordion de preguntas frecuentes
- [x] **ContactForm** — formulario con submit a `/api/contact`
- [x] **WhatsAppFloat** — botón flotante fixed

---

## Component Plan

- [ ] **UI-PLAN-1.1 — Design Token System (completar)**
  - **Prioridad**: P0 — base de todo lo demás
  - **Acción**: Mover todos los valores hardcodeados a tokens en `:root`
  - **Tokens a agregar**:
    - `--font-family-base`, `--font-family-display`
    - `--font-size-xs` (0.75rem) → `--font-size-2xl` (2rem+)
    - `--line-height-tight` (1.2), `--line-height-base` (1.6), `--line-height-relaxed` (1.7)
    - `--spacing-1` (0.25rem) → `--spacing-16` (4rem) en escala 4px
    - `--nav-height` (120px)
    - `--section-padding` (100px)
    - `--red-hover` (#d93e3e)
    - `--shadow-sm`, `--shadow-md`

- [ ] **UI-PLAN-1.2 — Icon System**
  - **Atomic Level**: Atom
  - **Variantes**: size (sm 16px, md 24px, lg 32px), color (inherit / --red / --muted)
  - **Propuesta**: SVG sprite en `/img/icons.svg` + uso con `<use href="#icon-name">`
  - **Iconos necesarios**: check, arrow-right, whatsapp, close, plus/minus (FAQ), external-link
  - **Accesibilidad**: `aria-hidden="true"` en decorativos, `aria-label` en funcionales

- [ ] **UI-PLAN-1.3 — Button Component (mejorar)**
  - **Atomic Level**: Atom
  - **Variantes actuales**: `.btn` (primary rojo), `.btn.magnetic` (con efecto hover)
  - **Variantes faltantes**:
    - `btn--secondary`: border rojo, fondo transparente
    - `btn--ghost`: solo texto, sin borde
    - `btn--sm` / `btn--lg`: tamaños
  - **Estados faltantes**: loading (spinner), disabled (opacity + pointer-events)
  - **Accesibilidad**: `aria-busy="true"` en loading, `aria-disabled` en disabled

- [ ] **UI-PLAN-1.4 — Form Feedback (Toast)**
  - **Atomic Level**: Molecule
  - **Problema actual**: `#form-status` es un div con clase `.success`/`.error` — no reutilizable
  - **Propuesta**: componente `.alert` con variantes `success`, `error`, `warning`, `info`
  - **Estados**: aparece con transición, desaparece después de N segundos (opcional)
  - **Accesibilidad**: `role="alert"` + `aria-live="polite"` para screen readers

- [ ] **UI-PLAN-1.5 — Card Variants**
  - **Atomic Level**: Molecule
  - **Variantes a estandarizar**:
    - `card--service`: sin header especial, solo h3 + p
    - `card--project`: con card-header (title + badge), logo opcional, stack-badges, project-link
    - `card--testimonial`: layout editorial (cite | quote)
  - **Consistencia**: `card--project` y `card--service` usan el mismo wrapper pero diferente inner markup — documentar la diferencia

- [ ] **UI-PLAN-1.6 — Responsive Nav (mejorar)**
  - **Problema**: nav height `120px` en mobile es demasiado alto
  - **Propuesta**: `--nav-height-mobile: 64px` con logo reducido a `72px` en mobile
  - **Accesibilidad**: focus trap en mobile menu abierto, `aria-expanded` en toggle (ya existe), `Escape` para cerrar
  - **Adicional**: `aria-label="Navegación principal"` en `<nav>`

- [ ] **UI-PLAN-1.7 — Scramble Headline: Accesibilidad**
  - **Problema**: El efecto scramble inyecta `<span class="scramble">` con caracteres aleatorios — un screen reader los lee todos
  - **Solución**: Agregar `aria-label` fijo al H1 con el texto final, y `aria-hidden` al contenido del scramble
  - **Implementación**:
    ```js
    el.setAttribute('aria-label', phrases[counter]);
    // El span interior ya tiene aria-hidden implícito
    ```

- [ ] **UI-PLAN-1.8 — Dark Mode (opcional, futuro)**
  - **Propuesta**: `@media (prefers-color-scheme: dark)` con override de tokens
  - **Tokens que cambian**: `--bg`, `--surface`, `--border`, `--text`, `--muted`
  - **Tokens que NO cambian**: `--red`, `--red-hover`, `--accent` (negro se vuelve blanco)
  - **Toggle manual**: opcional, localStorage + clase `.dark` en `<html>`

---

## Component Items

- [ ] **UI-ITEM-1.1 — Completar tokens en `:root`**
  - **Archivo**: `public/css/style.css`
  - **Acción**: Agregar los 14 tokens faltantes listados en UI-PLAN-1.1
  - **Tests**: Visual — verificar que nada cambia visualmente al reemplazar valores hardcodeados

- [ ] **UI-ITEM-1.2 — SVG sprite de iconos**
  - **Archivo**: `public/img/icons.svg` (crear)
  - **Contenido**: check, arrow-right, close, plus, minus, external-link, whatsapp
  - **Uso en HTML**: `<svg aria-hidden="true"><use href="/img/icons.svg#check"></svg>`
  - **Reemplazar**: SVG inline del WhatsApp float por referencia al sprite

- [ ] **UI-ITEM-1.3 — Estados de Button**
  - **Archivo**: `public/css/style.css` + `public/js/main.js`
  - **CSS**: Agregar `.btn[disabled]` y `.btn--loading` con spinner CSS
  - **JS**: En `initContactForm`, agregar `aria-busy="true"` al btn durante submit

- [ ] **UI-ITEM-1.4 — Alert component (reemplaza form-status)**
  - **Archivo**: `public/css/style.css`
  - **CSS**:
    ```css
    .alert { padding: 0.75rem 1rem; font-size: 0.9rem; border-left: 3px solid; }
    .alert--success { color: #16a34a; border-color: #16a34a; background: #f0fdf4; }
    .alert--error   { color: #dc2626; border-color: #dc2626; background: #fef2f2; }
    ```
  - **HTML**: Agregar `role="alert"` al `#form-status`

- [ ] **UI-ITEM-1.5 — Nav mobile: reducir altura**
  - **Archivo**: `public/css/style.css`
  - **Cambio**: En `@media (max-width: 768px)`, `nav { height: 64px; }` + logo `48px`
  - **Adicional**: `aria-label="Navegación principal"` en `<nav id="header-nav">`

- [ ] **UI-ITEM-1.6 — Scramble: aria-label fijo**
  - **Archivo**: `public/js/main.js`
  - **Cambio**: En `next()`, antes de `fx.scramble()`:
    ```js
    el.setAttribute('aria-label', phrases[counter]);
    ```

- [ ] **UI-ITEM-1.7 — FAQ: Escape key para cerrar**
  - **Archivo**: `public/js/main.js`
  - **Cambio**: En `initFaq()`, agregar listener:
    ```js
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            questions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.classList.remove('open');
                q.nextElementSibling.setAttribute('hidden', '');
            });
        }
    });
    ```

---

## Proposed Code Changes

### UI-ITEM-1.1 — Tokens faltantes (diff parcial)

```css
/* Agregar a :root en style.css */
:root {
    /* ... tokens existentes ... */

    /* Typography */
    --font-family-base: "Segoe UI", system-ui, -apple-system, sans-serif;
    --line-height-tight: 1.2;
    --line-height-base: 1.6;
    --line-height-relaxed: 1.7;

    /* Spacing (base 4px) */
    --sp-1: 0.25rem;   /* 4px  */
    --sp-2: 0.5rem;    /* 8px  */
    --sp-3: 0.75rem;   /* 12px */
    --sp-4: 1rem;      /* 16px */
    --sp-6: 1.5rem;    /* 24px */
    --sp-8: 2rem;      /* 32px */
    --sp-10: 2.5rem;   /* 40px */
    --sp-12: 3rem;     /* 48px */
    --sp-16: 4rem;     /* 64px */
    --sp-24: 6rem;     /* 96px */
    --sp-25: 6.25rem;  /* 100px */

    /* Layout */
    --nav-height: 120px;
    --nav-height-mobile: 64px;
    --section-padding: 100px;

    /* Color — red scale */
    --red-hover: #d93e3e;

    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(10,10,10,0.08);
    --shadow-md: 0 4px 16px rgba(10,10,10,0.14);
    --shadow-red: 0 4px 16px rgba(244,81,81,0.3);
}
```

### UI-ITEM-1.3 — Button loading state

```css
/* Agregar a .btn */
.btn[disabled],
.btn--loading {
    opacity: 0.6;
    pointer-events: none;
    cursor: not-allowed;
}

.btn--loading::after {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: btn-spin 0.6s linear infinite;
    margin-left: 0.5rem;
    vertical-align: middle;
}

@keyframes btn-spin {
    to { transform: rotate(360deg); }
}
```

---

## Quality Assurance Checklist

- [ ] Todos los tokens hardcodeados reemplazados por variables CSS
- [ ] Nav accesible con `aria-label` y focus trap en mobile
- [ ] Scramble headline no interfiere con screen readers
- [ ] FAQ cierra con `Escape`
- [ ] Form: `aria-busy` + spinner visual durante submit
- [ ] Button: estados disabled/loading con accesibilidad correcta
- [ ] Contraste `--red` (#f45151) sobre blanco: ratio 3.07:1 — **pasa AA para UI, no para texto** → usar solo en elementos grandes (botones, iconos grandes), nunca en body text
- [ ] Mobile nav: altura reducida a 64px

---

## Prioridad de Ejecución

| ID | Item | Impacto | Esfuerzo | Prioridad |
|----|------|---------|----------|-----------|
| UI-ITEM-1.6 | Scramble aria-label | Alto (a11y) | Mínimo | P0 |
| UI-ITEM-1.5 | Nav mobile altura | Alto (UX) | Mínimo | P0 |
| UI-ITEM-1.7 | FAQ Escape key | Medio (a11y) | Mínimo | P1 |
| UI-ITEM-1.4 | Alert component | Medio (UX) | Bajo | P1 |
| UI-ITEM-1.3 | Button loading | Medio (UX) | Bajo | P1 |
| UI-ITEM-1.1 | Completar tokens | Alto (DX) | Medio | P2 |
| UI-ITEM-1.2 | Icon sprite | Bajo (DX) | Medio | P3 |
| UI-PLAN-1.8 | Dark mode | Bajo | Alto | P4 |
