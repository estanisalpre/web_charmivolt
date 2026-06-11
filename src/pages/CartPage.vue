<script setup>
import { useCartStore } from '../stores/cart.js'
import { useProducts } from '../composables/useProducts.js'
import QuantityCounter from '../components/ui/QuantityCounter.vue'
import { config } from '../data/config.js'

const cart = useCartStore()
const { getImageUrl, formatPrice } = useProducts()

function whatsappCheckout() {
  const lines = cart.items.map(
    i => `• ${i.product.name} x${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`
  )
  const message = `Hola Charmivolt! Quiero hacer el siguiente pedido:\n\n${lines.join('\n')}\n\nTotal: ${formatPrice(cart.totalPrice)}`
  const url = `https://wa.me/${config.whatsapp.phone}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-10">
      <h1
        class="text-4xl"
        style="font-family: var(--font-gothic); color: var(--color-text-primary);"
      >
        Tu Carrito
      </h1>
      <p class="text-sm mt-1" style="color: var(--color-text-muted);">
        {{ cart.totalItems }} {{ cart.totalItems === 1 ? 'artículo' : 'artículos' }}
      </p>
    </div>

    <!-- Empty state -->
    <div v-if="cart.items.length === 0" class="py-20 text-center">
      <p
        class="text-2xl mb-3"
        style="font-family: var(--font-gothic); color: var(--color-text-muted);"
      >
        Tu carrito está vacío
      </p>
      <p class="text-sm mb-8" style="color: var(--color-text-muted);">
        Explorá nuestra colección y encontrá algo que te enamore.
      </p>
      <RouterLink
        to="/productos"
        class="inline-block px-8 py-3 border text-sm tracking-widest uppercase"
        style="border-color: var(--color-accent); color: var(--color-text-primary);"
      >
        Ver productos
      </RouterLink>
    </div>

    <!-- Cart items -->
    <div v-else class="space-y-4">
      <div
        v-for="item in cart.items"
        :key="item.product.id"
        class="flex gap-4 p-4 rounded-lg border"
        style="background-color: var(--color-bg-card); border-color: var(--color-border);"
      >
        <!-- Image -->
        <RouterLink :to="`/producto/${item.product.id}`" class="flex-shrink-0">
          <img
            :src="getImageUrl(item.product.images[0])"
            :alt="item.product.name"
            class="w-20 h-20 rounded object-cover"
            @error="e => e.target.src = 'https://placehold.co/80x80/1a1a1a/7c3aed?text=✦'"
          />
        </RouterLink>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <RouterLink :to="`/producto/${item.product.id}`">
            <h3
              class="font-semibold truncate mb-1"
              style="font-family: var(--font-gothic); color: var(--color-text-primary);"
            >
              {{ item.product.name }}
            </h3>
          </RouterLink>
          <p class="text-sm mb-3" style="color: var(--color-text-muted);">
            {{ formatPrice(item.product.price) }} c/u
          </p>
          <QuantityCounter
            :modelValue="item.quantity"
            :max="item.product.stock"
            @update:modelValue="cart.updateQuantity(item.product.id, $event)"
          />
        </div>

        <!-- Line total + remove -->
        <div class="flex flex-col items-end justify-between flex-shrink-0">
          <span
            class="font-bold text-lg"
            style="color: var(--color-accent-light);"
          >
            {{ formatPrice(item.product.price * item.quantity) }}
          </span>
          <button
            @click="cart.removeFromCart(item.product.id)"
            class="text-xs tracking-wider uppercase transition-colors"
            style="color: var(--color-text-muted);"
          >
            Eliminar
          </button>
        </div>
      </div>

      <!-- Summary -->
      <div
        class="mt-6 p-6 rounded-lg border"
        style="background-color: var(--color-bg-surface); border-color: var(--color-border);"
      >
        <div class="flex items-center justify-between mb-2">
          <span style="color: var(--color-text-secondary);">Subtotal</span>
          <span class="font-bold text-xl" style="color: var(--color-text-primary);">
            {{ formatPrice(cart.totalPrice) }}
          </span>
        </div>
        <p class="text-xs mb-6" style="color: var(--color-text-muted);">
          Envío a calcular. El precio final se confirma por WhatsApp.
        </p>

        <button
          @click="whatsappCheckout"
          class="w-full py-3 px-6 font-semibold tracking-widest uppercase text-sm rounded flex items-center justify-center gap-2 transition-all"
          style="background-color: #25d366; color: white;"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Finalizar por WhatsApp
        </button>

        <button
          @click="cart.clearCart()"
          class="w-full mt-3 py-2 text-xs tracking-wider uppercase transition-colors"
          style="color: var(--color-text-muted);"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  </div>
</template>
