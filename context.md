# context.md — Clon de interfaz tipo Airbnb

## 🎯 Visión del proyecto

Construir una app web **mobile-first** de alquiler de alojamientos inspirada en Airbnb, con tres pantallas:

1. **Home**: buscador, categorías y tarjetas de alojamientos.
2. **Catálogo** (`/search`): lista de resultados ordenable y un mapa (placeholder).
3. **Detalle** (`/rooms/[id]`): galería, información, anfitrión, servicios y reserva con contador de huéspedes.

El objetivo es practicar **React + Next.js**: componentes reutilizables con props, `useState`, `useEffect`, rutas dinámicas y navegación con `<Link>`.

## 🛠️ Stack y reglas

- **Next.js 16** (App Router), **TypeScript** y **Tailwind CSS v4**.
- **Mobile-first**: se diseña a **375px**. Después se amplía con `md:` y `lg:`.
- Componentes **funcionales con `const`**, de **máximo 80 líneas** cada uno.
- Navegación interna **solo con `<Link>`** de Next.js. Nunca `<a href>`.
- **Sin librerías de componentes** y **sin `style={{}}`**: todo con clases de Tailwind.
- Datos mock en una **única fuente**: `/data/listings.ts`.

## 🗂️ Estructura de carpetas

```
app/
  page.tsx              → Home
  search/page.tsx       → Catálogo
  rooms/[id]/page.tsx   → Detalle
components/             → piezas de UI reutilizables
types/                  → interfaces TypeScript (Listing, Category, Host)
data/listings.ts        → datos mock
docs/screenshots/       → mockups de referencia (home, catalogo, detalle)
```

## 🔄 Flujo visión → spec

### Referencias visuales

Se usan **3 mockups** de una app de viajes estilo Airbnb, guardados en `docs/screenshots/`:

| Archivo | Pantalla |
|---|---|
| `home.png` | Home |
| `catalogo.png` | Catálogo (mapa + búsqueda) |
| `detalle.png` | Detalle |

> Fuente de los mockups: **[ **"Travel App UI Kit" de — https://dribbble.com/...**]**

### Proceso seguido

1. **Intento 1 — Airbnb real + Copilot Chat:**
   - Saqué capturas de airbnb.es en vista móvil (375px) y se las pasé a Copilot Chat con un prompt de visión.
   - Copilot respondió dos veces *"no puedo acceder visualmente al contenido de la imagen"* y generó una spec **genérica e inventada**.
   - ❌ **La descarté** porque no reflejaba la captura.
2. **Intento 2 — mockups + análisis de visión con Claude:**
   - Cambié a mockups de diseño que cubren las 3 pantallas.
   - Claude analizó cada imagen y devolvió una spec basada en **lo que se ve de verdad**.
   - ✅ Revisé la spec y **recorté lo que no pide la tarea**: rutas extra, favoritos persistentes y un `useEffect` para filtrar (antipatrón).

**Lección aprendida:** hay que comprobar siempre que la IA *está viendo* la imagen. Si la spec no menciona detalles concretos de la captura, es inventada.

### Prompt de visión utilizado

```
Analiza la imagen adjunta: es la pantalla [NOMBRE] en vista móvil (375px).
NO escribas código. Genera una SPEC con: 1) Estructura de arriba a abajo,
2) Componentes reutilizables con props tipadas, 3) Datos necesarios,
4) Estado e interacción (useState / useEffect), 5) Estilo Tailwind mobile-first
(375px → md: → lg:), 6) Navegación con <Link>.
Reglas: Next.js 16 App Router, TypeScript, Tailwind, sin librerías de
componentes, sin style={{}}, componentes const de máximo 80 líneas.
```

---

## 🎨 Sistema visual común

- **Color de marca (coral):** `#F8645C`. Se define una sola vez en `app/globals.css`:
  ```css
  @theme {
    --color-brand: #F8645C;
  }
  ```
  Así se puede usar como `bg-brand`, `text-brand` o `border-brand`.
- **Fondo de página:** `bg-gray-50`. **Tarjetas:** `bg-white rounded-2xl shadow-sm`.
- **Texto principal:** `text-gray-900`. **Texto secundario:** `text-sm text-gray-500`.
- **Botones principales:** `bg-brand text-white rounded-full py-4 font-semibold`.
- **Estrella de valoración:** `text-brand`.

---

## 🏠 Spec 1 — Home (`app/page.tsx`)

### 1. Estructura (de arriba a abajo)

1. **Cabecera coral** con esquinas inferiores redondeadas:
   - avatar redondo + "Welcome **[nombre]**" + ubicación con icono 📍;
   - a la derecha, dos botones circulares: buscar 🔍 y notificaciones 🔔.
2. **Barra de categorías**: tarjeta blanca con 6 iconos (casa, avión, tren, barco, coche, yate). El icono activo va sobre un fondo oscuro redondeado.
3. **Interruptor "Display total price"** con el subtexto "Includes all fees, before taxes" y un toggle coral.
4. **Lista de tarjetas de alojamiento**, una debajo de otra.
5. **Botón flotante "Map"** (píldora oscura) centrado sobre la lista. Enlaza al Catálogo.
6. **Barra inferior fija**: botón "Explore" activo (círculo coral + texto) y 4 iconos (❤️, logo, 💬, 👤).

### 2. Componentes reutilizables

| Componente | Muestra | Props | Se usa en |
|---|---|---|---|
| `HomeHeader` | Avatar, saludo, ubicación y botones | `userName: string`, `location: string` | Home |
| `CategoryBar` | Iconos de categoría | `categories: Category[]`, `active: string`, `onSelect: (id: string) => void` | Home, Catálogo |
| `PriceToggle` | Interruptor de precio total | `enabled: boolean`, `onToggle: () => void` | Home |
| `ListingCard` | Foto, ❤️, título, ubicación, detalles, precio y rating | `listing: Listing`, `showTotal?: boolean` | Home, Catálogo |
| `BottomNav` | Navegación inferior | `active: "explore"` | Home, Catálogo |

### 3. Datos necesarios (`types/` + `data/listings.ts`)

- **`Listing`**:
  - `id: string`, `title: string` ("Tiny Home in Reutlingen"), `location: string`
  - `images: string[]`, `rooms: number`, `beds: number`, `guests: number`, `bathrooms: number`
  - `pricePerNight: number`, `rating: number`, `reviews: number`
  - `category: string`, `description: string`, `amenities: string[]`, `host: Host`
- **`Category`**: `id: string`, `label: string`, `icon: string`
- **`Host`**: `name: string`, `avatar: string`, `yearsHosting: number`

### 4. Estado e interacción

- `useState`:
  - **categoría activa**;
  - **precio total** (on/off). Si está activo, la tarjeta muestra el total de 2 noches en vez del precio por noche;
  - **texto de búsqueda**, si se añade el input.
- `useEffect`: **solo para cargar** los alojamientos al montar la página (simula una API).
- **Filtrado sin efecto**: `listings.filter(l => active === "all" || l.category === active)`.

### 5. Estilo (Tailwind, mobile-first)

- **Cabecera:** `bg-brand text-white rounded-b-3xl px-5 pt-6 pb-8`.
- **Botones circulares:** `w-10 h-10 rounded-full border border-white/50 flex items-center justify-center`.
- **`CategoryBar`:** `bg-white rounded-2xl -mt-4 mx-5 p-3 flex justify-between`. Icono activo: `bg-gray-900 text-white rounded-xl p-2`.
- **`ListingCard`:**
  - tarjeta: `bg-white rounded-2xl p-3 shadow-sm`;
  - foto: `rounded-xl aspect-[4/3] object-cover w-full`;
  - ❤️: botón blanco `absolute top-3 right-3 rounded-full`;
  - detalles: `text-sm text-gray-500`;
  - precio: `font-semibold` + "/Night" en `text-gray-500`.
- **Botón "Map":** `fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-full px-4 py-2`.
- **`BottomNav`:** `fixed bottom-0 inset-x-0 bg-white border-t flex justify-around py-3` + `md:hidden`.
- **Lista responsive:**
  - 375px: 1 columna (`grid gap-4`);
  - `md:grid-cols-2`;
  - `lg:grid-cols-3`.

### 6. Navegación

- `ListingCard` → `<Link href={`/rooms/${listing.id}`}>`
- Botón "Map" y botón 🔍 → `<Link href="/search">`
- `BottomNav`: **solo visual**. No se crean rutas extra (/wishlists, /profile…).

---

## 🔍 Spec 2 — Catálogo (`app/search/page.tsx`)

> El mockup muestra la búsqueda y el mapa. La **lista de resultados** se construye reutilizando `ListingCard`, como pide la tarea.

### 1. Estructura

1. **Cabecera coral**:
   - botón ← volver;
   - input "Search…" tipo píldora;
   - botón de filtros a la derecha.
2. **Panel de búsqueda** (tarjeta blanca):
   - "Your location" → destino ("New York City"), unidos por una línea de puntos;
   - debajo, `CategoryBar` (reutilizado).
3. **Selector de orden**: "Precio ↑", "Precio ↓", "Valoración".
4. **Lista de resultados** con `ListingCard`.
5. **Mapa (placeholder)**: caja gris con un patrón de calles o el texto "Mapa", y una tarjeta inferior con "20 min (25.7 km)".
6. `BottomNav` (reutilizado).

### 2. Componentes

| Componente | Props |
|---|---|
| `SearchHeader` | `query: string`, `onChange: (v: string) => void` |
| `SortSelect` | `value: SortOption`, `onChange: (v: SortOption) => void` |
| `MapPlaceholder` | `label?: string` |
| `ListingCard`, `CategoryBar`, `BottomNav` | reutilizados de la Home |

`SortOption = "price-asc" | "price-desc" | "rating"`

### 3. Estado e interacción

- `useState`:
  - **texto de búsqueda**: filtra por `title` / `location`;
  - **orden**: `SortOption`;
  - **categoría activa**.
- `useEffect`: cargar los datos al montar.
- Lista final calculada **sin efecto**: `[...filtered].sort(...)`.

### 4. Estilo

- **Cabecera:** `bg-brand rounded-b-3xl px-5 py-4 flex items-center gap-3`.
- **Input:** `bg-white/90 rounded-full px-4 py-2 flex-1`.
- **Panel:** `bg-white rounded-2xl mx-5 -mt-3 p-4 shadow-sm`.
- **Mapa:** `bg-gray-200 rounded-2xl h-64 lg:h-auto`.
- **Responsive:**
  - en móvil: lista y debajo el mapa;
  - en `lg:` dos columnas: `lg:grid lg:grid-cols-2`, con la lista a la izquierda y el mapa `sticky` a la derecha.

### 5. Navegación

- ← volver → `<Link href="/">`
- `ListingCard` → `<Link href={`/rooms/${id}`}>`

---

## 🛏️ Spec 3 — Detalle (`app/rooms/[id]/page.tsx`)

### 1. Estructura

1. **Cabecera coral**: ← volver (`<Link href="/">`), título centrado y botón de descarga/compartir.
2. **Galería**:
   - foto grande `rounded-2xl` con ❤️ arriba a la derecha;
   - botones ‹ › y contador "1 / N".
3. **Info principal**: título ("Tiny Home in Reutlingen") + descripción corta en gris.
4. **Servicios**: fila de iconos circulares con texto debajo (3 Rooms, Pool, Breakfast, AC, Laundry, Wi-Fi).
5. **Anfitrión** *(no aparece en el mockup; se añade porque lo pide la tarea)*:
   - avatar + "Anfitrión: [nombre]";
   - años como anfitrión;
   - mismo estilo de tarjeta.
6. **Tarjeta de reserva** ("3-Days Trip"), filas con icono:
   - 📅 fechas;
   - 💰 precio total;
   - 📍 ubicación;
   - 👥 **huéspedes con contador − / +**.
7. **Descripción** larga.
8. **Botón fijo "Book Trip"**, coral y ancho completo, abajo.

### 2. Componentes

| Componente | Props |
|---|---|
| `DetailHeader` | `title: string` |
| `Gallery` | `images: string[]` |
| `AmenityList` | `amenities: string[]` |
| `HostCard` | `host: Host` |
| `BookingCard` | `pricePerNight: number`, `location: string`, `maxGuests: number` |
| `GuestCounter` | `value: number`, `min: number`, `max: number`, `onChange: (n: number) => void` |

### 3. Estado e interacción

- `useEffect` con el **`id` de la URL**: busca el alojamiento en `data/listings.ts`. Mientras busca muestra "Cargando…"; si no existe, muestra "Alojamiento no encontrado" y un enlace de vuelta.
- `useState`:
  - **foto actual** de la galería (‹ ›, con vuelta al principio);
  - **número de huéspedes** (entre 1 y `maxGuests`).
- **Precio total** calculado: `pricePerNight × noches`.

### 4. Estilo

- **Cabecera:** `bg-brand text-white rounded-b-3xl px-5 py-4 flex justify-between items-center`.
- **Secciones:** `bg-white rounded-2xl mx-5 p-4 shadow-sm space-y-3`.
- **Icono de servicio:** `w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center`. Texto: `text-xs text-gray-500`.
- **Filas de reserva:** `flex items-center gap-3 text-sm`.
- **Botones del contador:** `w-8 h-8 rounded-full border`.
- **Botón "Book Trip":** `fixed bottom-4 inset-x-5 bg-brand text-white rounded-full py-4 font-semibold`.
- **Responsive (`lg:`):**
  - dos columnas: info a la izquierda y `BookingCard` `sticky top-6` a la derecha;
  - el botón deja de estar fijo y pasa dentro de la tarjeta.

### 5. Navegación

- ← volver → `<Link href="/">`

---

## 🧱 Plan de fases (un commit por fase)

1. ✅ Setup Next.js 16 + TypeScript + Tailwind + App Router.
2. ✅ `context.md` + mockups + specs de visión.
3. ⏭️ Tipos (`types/`) y datos mock (`data/listings.ts`), con 6–8 alojamientos.
4. `ListingCard` + Home: categorías, toggle de precio y carga con `useEffect`.
5. Catálogo: búsqueda, orden y mapa placeholder.
6. Detalle: galería, servicios, anfitrión, reserva y contador.
7. Navegación con `<Link>` en todas las pantallas y botón de volver.
8. Revisión final: 375px, componentes ≤ 80 líneas, sin `<a href>`, sin `style={{}}`.
