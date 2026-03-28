# Reposicionamiento: Valor Solutions como Consultora de Tecnología

**Fecha:** 2026-03-28
**Alcance:** Cambios de copy y rediseño de sección equipo en `public/index.html`

---

## Contexto

Valor Solutions pasa de "Agencia de producto" a "Consultora de Tecnología". El cambio es de posicionamiento y rol estratégico, no de mercado objetivo. El público sigue siendo PyMEs, emprendedores y pequeños negocios de barrio (barberías, cafeterías, profesionales independientes).

Se incorporan dos nuevos socios: Lisandro Blasco y Agustín Báez.

---

## Enfoque elegido

**B — Cambio de copy + estructura de equipo.** Actualizar textos clave y reorganizar la sección "Quiénes somos" con tres cards individuales. Sin tocar servicios, proceso, proyectos ni otras secciones.

---

## Cambios de copy globales

| Elemento | Actual | Nuevo |
|---|---|---|
| `<title>` | Valor Solutions \| Portfolio & Infrastructure | Valor Solutions \| Consultora de Tecnología |
| `<meta description>` | Automatizamos lo que hoy te come tiempo... | Tecnología que tiene sentido para tu negocio. Consultoría, sistemas y automatización para PyMEs y emprendedores. |
| Hero eyebrow | Agencia de producto · Rosario, Argentina | Consultora de Tecnología · Rosario, Argentina |
| Hero tagline (h1) | Del problema al producto. | Tecnología que tiene sentido para tu negocio. |
| Hero subtitle | sin cambios | sin cambios |

---

## Sección Equipo — rediseño

La sección `#sobre-mi` pasa de un bloque de texto + stats a un grid de 3 cards.

**Estructura de cada card:**
- `h3`: Nombre completo
- Párrafo en `--muted`: Título profesional
- Párrafo: Descripción de rol (2-3 líneas)

**Contenido:**

### Felipe Valor
- Título: Lic. en Negocios Digitales (UCA)
- Rol: Lidera la visión de producto y la relación con clientes. Traduce problemas reales en soluciones tecnológicas que tienen sentido.

### Lisandro Blasco
- Título: Lic. en Negocios Digitales
- Rol: Estrategia comercial y digital. Asegura que cada proyecto tenga sentido para el negocio del cliente.

### Agustín Báez
- Título: Ing. en Sistemas
- Rol: Arquitectura técnica y desarrollo. Construye los sistemas que hacen funcionar todo.

**Layout:** Grid de 3 columnas (misma clase `grid cols-3` usada en servicios). Sin fotos ni íconos por ahora.

---

## Archivos afectados

- `public/index.html` — todos los cambios

## Fuera de alcance

- Sección servicios
- Sección proceso
- Sección proyectos
- CSS / estilos (se reusan clases existentes)
