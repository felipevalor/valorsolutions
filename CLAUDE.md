# Valor Solutions — CLAUDE.md

## Proyecto

Sitio web institucional de **Valor Solutions**, consultora de tecnología con sede en Rosario, Argentina. Apunta a PyMEs, emprendedores y pequeños negocios de barrio (barberías, cafeterías, profesionales independientes).

## Equipo

- **Felipe Valor** — Lic. en Negocios Digitales. Visión de producto y relación con clientes.
- **Lisandro Blasco** — Lic. en Negocios Digitales. Estrategia comercial y digital.
- **Agustín Báez** — Ing. en Sistemas. Arquitectura técnica y desarrollo.

## Stack

- Frontend: HTML/CSS/JS vanilla (sin frameworks)
- Hosting: Cloudflare Pages
- Backend: Cloudflare Workers
- DB: Cloudflare D1
- Deploy: `wrangler pages deploy public --project-name valor-solutions --commit-dirty=true`
- Git remote: https://github.com/felipevalor/valorsolutions.git

## Estructura

```
public/
  index.html          — único archivo HTML
  css/style.css       — todos los estilos
  js/main.js          — toda la lógica JS
  img/
    valor-solutions-logo/   — valorsolutions-negra.svg, logo-v.svg (favicon)
    gebyanos-logo/          — Gebyanos logo.png
    logo-kettu/             — logo-kettu.svg
    turnos-psico-logos/     — logo-turnos-psico-negro.svg, logo-turnos-psico-blanco.svg
```

## Convenciones

- Siempre verificar localmente (`python3 -m http.server 8080 --directory public`) antes de deployar
- Hard refresh con Cmd+Shift+R para ver cambios en SVG/JS cacheados
- No hay build step — los archivos en `public/` se sirven directo
- Los logos están en subcarpetas dentro de `public/img/` — actualizar los `src` en HTML si se mueven archivos

## Proyectos en el portfolio

| Proyecto | URL | Stack destacado |
|---|---|---|
| Turnos Psico | https://turnospsi-frontend.pages.dev/ | Workers, D1 |
| Barbería Gebyanos | https://barberia-d8q.pages.dev/ | Workers, WhatsApp API |
| Kettu Café | https://kettu-cafe.pages.dev/ | Pages, Workers, D1 |

## Decisiones de diseño

- Magnetic buttons: desactivado (efecto removido del JS)
- Hero headline: fade transition entre frases (no scramble)
- Favicon: `logo-v.svg` con viewBox recortado al contenido
- Open Graph tags: configurados para valorsolutions.com.ar
- FAQ de precios: eliminado intencionalmente
