# Charmivolt — Web Frontend

Tienda virtual gótica para accesorios de carteras. Corre en Netlify.

## Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite + `@tailwindcss/vite`
- Tailwind CSS v4 — **sin** `tailwind.config.js`, config en `src/assets/main.css` con bloque `@theme`
- Vue Router 4 (history mode, rutas lazy-loaded)
- Pinia — store del carrito en `src/stores/cart.js`

## Estructura

```
src/
  assets/
    main.css          ← Tailwind v4 entry + @theme gótico (paleta, fuentes)
    products/         ← imágenes: product001.jpg, product002.png, etc.
  data/
    products.js       ← array de productos — ÚNICA fuente de verdad
    config.js         ← WhatsApp phone/message, info tienda, métodos de envío
    slides.js         ← slides del carousel hero
  stores/
    cart.js           ← Pinia store: items, totalItems, totalPrice, addToCart, etc.
  composables/
    useProducts.js    ← all, featured, getById, getImageUrl, formatPrice
  components/
    layout/           ← AppNav.vue, AppFooter.vue
    ui/               ← BaseModal, HeroCarousel, ProductCard, QuantityCounter, StockBadge, WhatsAppButton
    modals/           ← PaymentMethodsModal.vue, ShippingModal.vue
  pages/
    HomePage.vue
    ProductsPage.vue
    ProductDetailPage.vue
    CartPage.vue
    ContactPage.vue
  router/index.js
```

## Convenciones

### Agregar un producto

1. Copiar imagen(es) a `src/assets/products/` — nombrar `productXXX.ext` en secuencia
2. Agregar entrada al array en `src/data/products.js`
3. Nada más — todas las páginas derivan de ese array reactivamente

### Resolución de imágenes (Vite-safe)

```js
new URL(`../assets/products/${filename}`, import.meta.url).href
```

Nunca importar imágenes hardcodeadas. Siempre pasar el filename como string y usar `getImageUrl()` del composable.

### Formato de precios (ARS)

```js
new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
}).format(amount)
```

Usar siempre `formatPrice()` del composable. Nunca formatear precios inline.

### WhatsApp

Configurar en un solo lugar: `src/data/config.js` → `config.whatsapp.phone` y `config.whatsapp.message`.  
El número va en formato internacional sin `+`: `5491112345678`.

### Colores y design system

La paleta gótica vive en el bloque `@theme` de `src/assets/main.css`.  
Usar variables CSS (`var(--color-accent)`, `var(--color-bg-card)`, etc.) — **no** valores hexadecimales hardcodeados en los componentes.

Variables principales:
- `--color-bg-base` — fondo principal (`#0a0a0a`)
- `--color-bg-card` — fondo de cards
- `--color-accent` — violeta principal (`#7c3aed`)
- `--color-accent-light` — violeta claro para texto
- `--color-crimson` — rojo oscuro para SIN STOCK
- `--font-gothic` — Cormorant Garamond (títulos)
- `--font-body` — Raleway (cuerpo)

## Rutas

| Path | Componente | Nota |
|------|-----------|------|
| `/` | HomePage | Carousel + productos destacados |
| `/productos` | ProductsPage | Grid con filtro por categoría |
| `/producto/:id` | ProductDetailPage | `props: true` — recibe `id` como prop |
| `/carrito` | CartPage | Visual only, checkout por WhatsApp |
| `/contacto` | ContactPage | Sin formulario |

## Deploy

Netlify. Configurado en `netlify.toml`.  
El bloque `[[redirects]]` es crítico para que el SPA funcione en URLs directas.

```bash
npm run build   # genera dist/
npm run preview # preview local del build
```

## Schema de producto

```js
{
  id: 'CHV-001',          // string único — usado en la URL /producto/:id
  name: 'Nombre',
  price: 32000,           // ARS, entero
  compareAtPrice: null,   // precio tachado (opcional)
  category: 'carteras',   // para filtro en ProductsPage
  description: `...`,     // multilinea, se preservan los saltos
  images: ['product001.jpg'],  // primer elemento = hero
  stock: 5,               // 0 = SIN STOCK
  featured: true,         // aparece en home
  tags: [],               // opcional
}
```
