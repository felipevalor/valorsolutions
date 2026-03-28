# Reposicionamiento Consultora de Tecnología — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Actualizar `public/index.html` para reflejar el reposicionamiento de Valor Solutions como Consultora de Tecnología e incorporar los tres socios del equipo.

**Architecture:** Un solo archivo HTML modificado. Se cambian textos en `<head>` y en dos lugares del `<body>`: el hero y la sección equipo. La sección equipo se reestructura de un bloque texto+stats a un grid de tres cards usando clases CSS existentes (`grid cols-3`, `card card--service`).

**Tech Stack:** HTML estático, CSS existente (sin cambios).

---

## Archivos afectados

- Modify: `public/index.html`

---

### Task 1: Actualizar metadatos y copy del hero

**Files:**
- Modify: `public/index.html:4-9, 45-47`

- [ ] **Step 1: Actualizar `<title>` y `<meta description>`**

En `public/index.html`, reemplazar líneas 7-9:

```html
<title>Valor Solutions | Consultora de Tecnología</title>
<meta name="description"
    content="Tecnología que tiene sentido para tu negocio. Consultoría, sistemas y automatización para PyMEs y emprendedores.">
```

- [ ] **Step 2: Actualizar eyebrow y h1 del hero**

Reemplazar línea 45:
```html
<p class="hero-eyebrow">Consultora de Tecnología · Rosario, Argentina</p>
```

Reemplazar línea 46:
```html
<h1 id="scramble-headline">Tecnología que tiene sentido para tu negocio.</h1>
```

- [ ] **Step 3: Verificar en browser**

Abrir `public/index.html` en el browser. Confirmar:
- Tab del browser muestra "Valor Solutions | Consultora de Tecnología"
- Hero eyebrow dice "Consultora de Tecnología · Rosario, Argentina"
- Título principal dice "Tecnología que tiene sentido para tu negocio."

- [ ] **Step 4: Commit**

```bash
git add public/index.html
git commit -m "feat: reposicionamiento hero — Consultora de Tecnología"
```

---

### Task 2: Reestructurar sección equipo con tres cards

**Files:**
- Modify: `public/index.html:137-165`

- [ ] **Step 1: Reemplazar el contenido de la sección `#sobre-mi`**

Localizar la sección que empieza en la línea 137:
```html
<section id="sobre-mi">
```

Reemplazar todo el interior del `<div class="container">` (el `h2` + el `div.about-grid`) con:

```html
<section id="sobre-mi">
    <div class="container">
        <h2 class="section-title reveal">El equipo</h2>
        <div class="grid cols-3">
            <div class="card card--service reveal">
                <h3>Felipe Valor</h3>
                <p class="muted">Lic. en Negocios Digitales (UCA)</p>
                <p>Lidera la visión de producto y la relación con clientes. Traduce problemas reales en soluciones tecnológicas que tienen sentido.</p>
            </div>
            <div class="card card--service reveal">
                <h3>Lisandro Blasco</h3>
                <p class="muted">Lic. en Negocios Digitales</p>
                <p>Estrategia comercial y digital. Asegura que cada proyecto tenga sentido para el negocio del cliente.</p>
            </div>
            <div class="card card--service reveal">
                <h3>Agustín Báez</h3>
                <p class="muted">Ing. en Sistemas</p>
                <p>Arquitectura técnica y desarrollo. Construye los sistemas que hacen funcionar todo.</p>
            </div>
        </div>
    </div>
</section>
```

Nota: la clase `muted` aplica `color: var(--muted)` — verificar que esta clase exista en `style.css`. Si no existe, usar `style="color: var(--muted)"` como inline style temporal.

- [ ] **Step 2: Verificar clase `.muted` en CSS**

```bash
grep -n "\.muted" public/css/style.css
```

Si no aparece resultado, agregar al final de `public/css/style.css`:
```css
.muted {
    color: var(--muted);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}
```

- [ ] **Step 3: Verificar en browser**

Abrir `public/index.html` y navegar a la sección "El equipo". Confirmar:
- Tres cards en fila con nombre, título en gris y descripción
- Layout consistente con la sección de servicios
- En mobile las cards se apilan verticalmente (comportamiento heredado del grid existente)

- [ ] **Step 4: Commit**

```bash
git add public/index.html public/css/style.css
git commit -m "feat: sección equipo con tres socios — Felipe, Lisandro, Agustín"
```

---

### Task 3: Actualizar nav link "Nosotros"

**Files:**
- Modify: `public/index.html:34`

- [ ] **Step 1: Actualizar el texto del link en la nav**

El link actual apunta a `#sobre-mi` con el texto "Nosotros". El texto sigue siendo correcto — solo verificar que el anchor coincida con el id de la sección.

Confirmar que la línea 34 dice:
```html
<a href="#sobre-mi">Nosotros</a>
```

No requiere cambio. Si el id de la sección cambió, actualizarlo para que coincida.

- [ ] **Step 2: Verificar scroll suave al hacer click en "Nosotros"**

En el browser, hacer click en "Nosotros" en la nav. Confirmar que scrollea a la sección del equipo.

- [ ] **Step 3: Commit solo si hubo cambio**

Si no hubo cambio, no hacer commit. Si se corrigió el anchor:
```bash
git add public/index.html
git commit -m "fix: nav link Nosotros apunta a sección equipo"
```
