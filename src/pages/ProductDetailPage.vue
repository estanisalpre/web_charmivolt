<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@stores/cart'
import { useProducts } from '@composables/useProducts'
import { useSeo } from '@composables/useSeo'
import QuantityCounter from '@components/ui/QuantityCounter.vue'
import StockBadge from '@components/ui/StockBadge.vue'
import PaymentMethodsModal from '@components/modals/PaymentMethodsModal.vue'
import ShippingModal from '@components/modals/ShippingModal.vue'

const props = defineProps<{ id: string }>()

const { getById, getImageUrl, formatPrice } = useProducts()
const cart = useCartStore()

const product = computed(() => getById(props.id))

useSeo(() => ({
  title: product.value?.name ?? 'Producto',
  description: product.value
    ? product.value.description.slice(0, 155).replace(/\n/g, ' ')
    : undefined,
  image: product.value ? getImageUrl(product.value.images[0]) : undefined,
}))
const activeImageIndex = ref(0)
const quantity = ref(1)
const showPaymentModal = ref(false)
const showShippingModal = ref(false)
const addedToCart = ref(false)

function selectImage(index: number): void {
  activeImageIndex.value = index
}

function addToCart(): void {
  if (!product.value || product.value.stock === 0) return
  cart.addToCart(product.value, quantity.value)
  addedToCart.value = true
  setTimeout(() => { addedToCart.value = false }, 2000)
}

function onThumbError(e: Event): void {
  ;(e.target as HTMLImageElement).src = 'https://placehold.co/80x80/1a1a1a/7c3aed?text=✦'
}

function onMainImgError(e: Event): void {
  ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x600/1a1a1a/7c3aed?text=Charmivolt'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

    <!-- Not found -->
    <div v-if="!product" class="py-20 text-center">
      <p
        class="text-3xl mb-4"
        style="font-family: var(--font-gothic); color: var(--color-text-primary);"
      >
        Producto no encontrado
      </p>
      <RouterLink
        to="/productos"
        class="text-sm tracking-wider uppercase"
        style="color: var(--color-accent-light);"
      >
        ← Volver a productos
      </RouterLink>
    </div>

    <template v-else>
      <!-- Breadcrumb -->
      <nav class="text-xs mb-8 flex items-center gap-2" style="color: var(--color-text-muted);">
        <RouterLink to="/">Inicio</RouterLink>
        <span>/</span>
        <RouterLink to="/productos">Productos</RouterLink>
        <span>/</span>
        <span style="color: var(--color-text-secondary);">{{ product.name }}</span>
      </nav>

      <!-- Main layout -->
      <div class="grid grid-cols-1 lg:grid-cols-[80px_1fr_380px] gap-6 lg:gap-8 items-start">

        <!-- Thumbnail strip (desktop: vertical, mobile: horizontal scroll) -->
        <div class="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
          <button
            v-for="(img, index) in product.images"
            :key="index"
            @click="selectImage(index)"
            class="flex-shrink-0 w-16 h-16 lg:w-full lg:h-20 rounded overflow-hidden border-2 transition-all"
            :style="activeImageIndex === index
              ? 'border-color: var(--color-accent);'
              : 'border-color: var(--color-border);'"
          >
            <img
              :src="getImageUrl(img)"
              :alt="`${product.name} - imagen ${index + 1}`"
              class="w-full h-full object-cover"
              @error="onThumbError"
            />
          </button>
        </div>

        <!-- Main image -->
        <div class="order-1 lg:order-2 relative rounded-lg overflow-hidden" style="aspect-ratio: 1;">
          <img
            :src="getImageUrl(product.images[activeImageIndex])"
            :alt="product.name"
            class="w-full h-full object-cover transition-all duration-300"
            @error="onMainImgError"
          />
          <!-- SIN STOCK overlay -->
          <div
            v-if="product.stock === 0"
            class="absolute inset-0 flex items-center justify-center"
            style="background-color: rgba(0,0,0,0.6);"
          >
            <span
              class="text-2xl font-bold tracking-widest uppercase px-6 py-3 border-2"
              style="font-family: var(--font-gothic); color: var(--color-crimson-light); border-color: var(--color-crimson);"
            >
              Sin Stock
            </span>
          </div>
        </div>

        <!-- Info panel -->
        <div class="order-3 flex flex-col gap-5">

          <!-- Category tag -->
          <span
            class="text-xs tracking-widest uppercase"
            style="color: var(--color-accent-light);"
          >
            {{ product.category }}
          </span>

          <!-- Title -->
          <h1
            class="text-3xl lg:text-4xl font-semibold leading-tight"
            style="font-family: var(--font-gothic); color: var(--color-text-primary);"
          >
            {{ product.name }}
          </h1>

          <!-- Price -->
          <div class="flex items-center gap-3">
            <span
              v-if="product.compareAtPrice"
              class="text-sm line-through"
              style="color: var(--color-text-muted);"
            >
              {{ formatPrice(product.compareAtPrice) }}
            </span>
            <span
              class="text-3xl font-bold"
              style="color: var(--color-text-primary);"
            >
              {{ formatPrice(product.price) }}
            </span>
          </div>

          <!-- Payment methods -->
          <div class="py-3 border-t border-b" style="border-color: var(--color-border);">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-sm" style="color: var(--color-text-secondary);">
                Medios de pago
              </span>
              <button
                @click="showPaymentModal = true"
                class="text-xs tracking-wider uppercase transition-colors"
                style="color: var(--color-accent-light);"
              >
                Ver →
              </button>
            </div>
          </div>

          <!-- Shipping -->
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-sm" style="color: var(--color-text-secondary);">
                Envío a todo el país
              </span>
              <button
                @click="showShippingModal = true"
                class="text-xs tracking-wider uppercase transition-colors"
                style="color: var(--color-accent-light);"
              >
                Ver →
              </button>
            </div>
          </div>

          <!-- Stock badge -->
          <StockBadge :stock="product.stock" />

          <!-- Quantity + Add to cart -->
          <div v-if="product.stock > 0" class="flex flex-col gap-3">
            <div class="flex items-center gap-4">
              <span class="text-sm" style="color: var(--color-text-muted);">Cantidad:</span>
              <QuantityCounter v-model="quantity" :max="product.stock" />
            </div>
            <button
              @click="addToCart"
              class="w-full py-3 px-6 font-semibold tracking-widest uppercase text-sm border-2 transition-all duration-200 rounded"
              :style="addedToCart
                ? 'border-color: #22c55e; color: #86efac; background-color: color-mix(in srgb, #22c55e 15%, transparent);'
                : 'border-color: var(--color-accent); color: var(--color-text-primary); background-color: var(--color-accent);'"
            >
              {{ addedToCart ? '✓ Agregado al carrito' : 'Agregar al carrito' }}
            </button>
          </div>
          <div v-else>
            <button
              disabled
              class="w-full py-3 px-6 font-semibold tracking-widest uppercase text-sm border-2 rounded opacity-40 cursor-not-allowed"
              style="border-color: var(--color-crimson); color: var(--color-crimson-light);"
            >
              Sin stock
            </button>
          </div>

          <!-- Description -->
          <div class="mt-2 pt-5 border-t" style="border-color: var(--color-border);">
            <h2
              class="text-lg font-semibold mb-3"
              style="font-family: var(--font-gothic); color: var(--color-text-primary);"
            >
              Descripción
            </h2>
            <p
              class="text-sm leading-relaxed whitespace-pre-line"
              style="color: var(--color-text-secondary);"
            >
              {{ product.description }}
            </p>
          </div>

        </div>
      </div>
    </template>

    <!-- Modals -->
    <PaymentMethodsModal
      v-if="product"
      v-model="showPaymentModal"
      :price="product.price"
    />
    <ShippingModal v-model="showShippingModal" />
  </div>
</template>
