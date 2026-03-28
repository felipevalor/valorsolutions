# Cosmetóloga Analía Velazco — Landing + Panel Admin

**Fecha:** 2026-03-28
**Cliente:** Analía Velazco — Cosmetóloga
**Stack:** HTML/CSS/JS vanilla + Cloudflare Pages + Workers + D1

---

## Contexto

Landing institucional para Analía Velazco, cosmetóloga con local en San Lorenzo 865, Rosario Centro. Atiende de lunes a sábado solo con turno previo. No tiene sistema de turnos online — el contacto es vía WhatsApp e Instagram. Lanza 3 promociones por mes que cambian periódicamente.

El sitio incluye un panel admin protegido para que Analía pueda actualizar servicios, precios y promociones sin depender del desarrollador.

---

## Estructura de la Landing (página única)

Scroll vertical, 7 secciones:

1. **Hero** — Nombre completo + tagline + botón "Reservar turno" (abre WhatsApp)
2. **Promociones del mes** — 3 cards destacadas (título, descripción, precio promo vs. precio normal)
3. **Servicios** — Grid agrupado por categoría, con nombre, descripción corta y precio
4. **Sobre mí** — Foto de Analía + bio corta
5. **Ubicación** — San Lorenzo 865, Rosario + mapa embed Google Maps
6. **Contacto** — Botón WhatsApp + link Instagram + texto "Lunes a sábado, solo con turno previo"
7. **Footer** — Logo + redes sociales

### Estética
- Paleta: rosa palo + blanco + negro
- Tipografía: serif para títulos (consistente con branding de Instagram), sans-serif para cuerpo
- Minimalista, mucho espacio en blanco
- Referencia visual: posts de @cosmetologaanaliavelazco en Instagram

---

## Base de Datos (D1)

### Tabla `services`
| campo | tipo | descripción |
|-------|------|-------------|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | |
| name | TEXT NOT NULL | ej: "Lifting de Pestañas" |
| description | TEXT | descripción corta del servicio |
| price | INTEGER NOT NULL | precio en pesos |
| category | TEXT NOT NULL | "facial" / "corporal" / "servicios" |
| active | INTEGER DEFAULT 1 | 1 = visible, 0 = oculto |

### Tabla `promotions`
| campo | tipo | descripción |
|-------|------|-------------|
| id | INTEGER PRIMARY KEY AUTOINCREMENT | |
| title | TEXT NOT NULL | título de la promoción |
| description | TEXT | descripción de la promo |
| original_price | INTEGER | precio normal |
| promo_price | INTEGER NOT NULL | precio con descuento |
| active | INTEGER DEFAULT 1 | 1 = activa (máx. 3 simultáneas) |

### Catálogo inicial de servicios

**Tratamientos Faciales:** Peeling Químico, Microneedling, Dermaplaning, Porcelanización Facial, Limpieza de Cutis Profunda, Tratamiento de Crioradiofrecuencia

**Tratamientos Corporales:** Tratamientos Corporales (celulitis y flacidez)

**Servicios:** Diseño Personalizado de Cejas, Bronceado Orgánico, Makeup Profesional, Lifting de Pestañas, Estética de Manos y Pies

---

## API (Cloudflare Workers)

### Endpoints públicos
- `GET /api/services` — devuelve todos los servicios activos, agrupados por categoría
- `GET /api/promotions` — devuelve las promociones activas (máx. 3)

### Endpoints admin (requieren JWT)
- `POST /api/auth/login` — valida credenciales, devuelve token JWT
- `POST /api/services` — crear servicio
- `PUT /api/services/:id` — editar servicio
- `DELETE /api/services/:id` — eliminar servicio
- `PATCH /api/services/:id/toggle` — activar/desactivar servicio
- `POST /api/promotions` — crear promoción
- `PUT /api/promotions/:id` — editar promoción
- `DELETE /api/promotions/:id` — eliminar promoción
- `PATCH /api/promotions/:id/toggle` — activar/desactivar promoción

### Autenticación
- 1 usuario fijo (Analía). Credenciales almacenadas como variables de entorno en Cloudflare (no en código).
- JWT con expiración de 24hs.
- Sin registro de usuarios ni recupero de contraseña.

---

## Panel Admin (`/admin`)

- Ruta protegida: redirige a `/admin/login` si no hay JWT válido
- Login: formulario usuario + contraseña
- Una vez autenticada: interfaz con dos tabs
  - **Servicios:** tabla con todos los servicios, filtro por categoría, botones editar / ocultar / eliminar, formulario para agregar nuevo
  - **Promociones:** tabla con promos, botones editar / desactivar / eliminar, formulario para agregar nueva (se indica visualmente si hay 3 activas)
- Estética: simple y funcional, no necesita seguir el diseño de la landing

---

## Datos estáticos (hardcodeados en HTML)

- Nombre: Cosmetóloga Analía Velazco
- Instagram: @cosmetologaanaliavelazco
- Dirección: San Lorenzo 865, Rosario Centro
- Horario: Lunes a sábado, solo con turno previo
- WhatsApp: (a confirmar con la cliente)

---

## Deploy

- Landing: Cloudflare Pages (`public/` de este repositorio o repo separado)
- Worker: Cloudflare Workers
- DB: Cloudflare D1
- Comando deploy: `wrangler pages deploy public --project-name cosmetologa-analia-velazco --commit-dirty=true`

---

## Fuera de scope

- Sistema de turnos online
- Galería de fotos (se agrega en una iteración futura cuando ella provea las fotos)
- Múltiples usuarios admin
- Recupero de contraseña
