<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart.js'
import { useProducts } from '../composables/useProducts.js'
import QuantityCounter from '../components/ui/QuantityCounter.vue'
import { config } from '../data/config.js'

const cart = useCartStore()
const { getImageUrl, formatPrice } = useProducts()

const selectedShippingIndex = ref<number | null>(null)

const form = reactive({
  name: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
})

const isJunin = computed(() => selectedShippingIndex.value !== null && config.shipping.methods[selectedShippingIndex.value].price === 0)
const shippingSelected = computed(() => selectedShippingIndex.value !== null)
const shippingMethod = computed(() => shippingSelected.value ? config.shipping.methods[selectedShippingIndex.value!] : null)
const shippingCost = computed(() => shippingMethod.value?.price ?? 0)
const total = computed(() => cart.totalPrice + shippingCost.value)

function onImgError(e: Event): void {
  ;(e.target as HTMLImageElement).src = 'https://placehold.co/80x80/1a1a1a/7c3aed?text=✦'
}

function whatsappCheckout(): void {
  if (!shippingSelected.value || !shippingMethod.value) return

  const lines = cart.items.map(
    i => `  • ${i.product.name} x${i.quantity}  —  ${formatPrice(i.product.price * i.quantity)}`
  )

  const shippingLine = `Envio: ${shippingCost.value === 0 ? 'GRATIS' : formatPrice(shippingCost.value)}`

  const deliveryFields = isJunin.value
    ? [
        `Nombre: ${form.name}`,
        `Celular: ${form.phone}`,
        `Direccion: ${form.address}`,
      ]
    : [
        `Nombre: ${form.name}`,
        `Celular: ${form.phone}`,
        `Direccion: ${form.address}`,
        `Localidad: ${form.city}`,
        `Provincia: ${form.province}`,
        `Codigo postal: ${form.postalCode}`,
      ]

  const message = [
    '*NUEVO PEDIDO - CHARMIVOLT*',
    '',
    '*PRODUCTOS*',
    ...lines,
    '',
    '*RESUMEN*',
    `Subtotal: ${formatPrice(cart.totalPrice)}`,
    shippingLine,
    `*TOTAL: ${formatPrice(total.value)}*`,
    '',
    '*DATOS DE ENVIO*',
    ...deliveryFields,
  ].join('\n')

  const url = `https://wa.me/${config.whatsapp.phone}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
  <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-4xl" style="font-family: var(--font-gothic); color: var(--color-text-primary);">
        Tu Carrito
      </h1>
      <p class="text-sm mt-1" style="color: var(--color-text-muted);">
        {{ cart.totalItems }} {{ cart.totalItems === 1 ? 'artículo' : 'artículos' }}
      </p>
    </div>

    <!-- Empty state -->
    <div v-if="cart.items.length === 0" class="py-20 text-center">
      <p class="text-2xl mb-3" style="font-family: var(--font-gothic); color: var(--color-text-muted);">
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

    <div v-else class="space-y-4">

      <!-- Items -->
      <div
        v-for="item in cart.items"
        :key="item.product.id"
        class="flex gap-4 p-4 rounded-lg border"
        style="background-color: var(--color-bg-card); border-color: var(--color-border);"
      >
        <RouterLink :to="`/producto/${item.product.id}`" class="flex-shrink-0">
          <img
            :src="getImageUrl(item.product.images[0])"
            :alt="item.product.name"
            class="w-16 h-16 sm:w-20 sm:h-20 rounded object-cover"
            @error="onImgError"
          />
        </RouterLink>

        <div class="flex-1 min-w-0">
          <RouterLink :to="`/producto/${item.product.id}`">
            <h3 class="font-semibold truncate mb-1" style="font-family: var(--font-gothic); color: var(--color-text-primary);">
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

        <div class="flex flex-col items-end justify-between flex-shrink-0">
          <span class="font-bold text-lg" style="color: var(--color-accent-light);">
            {{ formatPrice(item.product.price * item.quantity) }}
          </span>
          <button
            @click="cart.removeFromCart(item.product.id)"
            class="text-xs tracking-wider uppercase transition-colors"
            style="color: var(--color-crimson);"
          >
            Eliminar
          </button>
        </div>
      </div>

      <!-- Summary panel -->
      <div
        class="mt-6 p-6 rounded-lg border space-y-5"
        style="background-color: var(--color-bg-surface); border-color: var(--color-border);"
      >
        <!-- Subtotal -->
        <div class="flex items-center justify-between text-sm">
          <span style="color: var(--color-text-secondary);">Subtotal</span>
          <span class="font-semibold" style="color: var(--color-text-primary);">
            {{ formatPrice(cart.totalPrice) }}
          </span>
        </div>

        <div style="border-top: 1px solid var(--color-border);" />

        <!-- Shipping methods -->
        <div>
          <p class="text-xs font-semibold tracking-widest uppercase mb-3" style="color: var(--color-accent-light);">
            Método de envío
          </p>
          <div class="space-y-2">
            <label
              v-for="(method, i) in config.shipping.methods"
              :key="i"
              class="flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all"
              :style="selectedShippingIndex === i
                ? 'border-color: var(--color-accent); background-color: color-mix(in srgb, var(--color-accent) 10%, var(--color-bg-card));'
                : 'border-color: var(--color-border); background-color: var(--color-bg-card);'"
            >
              <input
                type="radio"
                :value="i"
                v-model="selectedShippingIndex"
                class="mt-0.5 accent-violet-600"
              />
              <div class="flex-1 text-sm">
                <p style="color: var(--color-text-primary);">{{ method.name }}</p>
                <p class="text-xs mt-0.5" style="color: var(--color-text-muted);">{{ method.description }}</p>
              </div>
              <span
                class="text-sm font-semibold shrink-0"
                :style="method.price === 0 ? 'color: #86efac;' : 'color: var(--color-text-primary);'"
              >
                {{ method.price === 0 ? 'GRATIS' : formatPrice(method.price) }}
              </span>
            </label>
          </div>
        </div>

        <!-- Delivery form — visible only when a method is selected -->
        <Transition name="fade-down">
          <div
            v-if="shippingSelected"
            class="p-4 rounded-lg border space-y-3"
            style="background-color: var(--color-bg-card); border-color: var(--color-border);"
          >
            <p class="text-xs font-semibold tracking-widest uppercase" style="color: var(--color-accent-light);">
              Datos de contacto y envío
            </p>

            <input
              v-model="form.name"
              type="text"
              placeholder="Nombre completo"
              class="w-full bg-transparent border rounded px-3 py-2 text-sm outline-none transition-colors focus:border-violet-500"
              style="border-color: var(--color-border); color: var(--color-text-primary);"
            />
            <input
              v-model="form.phone"
              type="tel"
              placeholder="Celular"
              class="w-full bg-transparent border rounded px-3 py-2 text-sm outline-none transition-colors focus:border-violet-500"
              style="border-color: var(--color-border); color: var(--color-text-primary);"
            />
            <input
              v-model="form.address"
              type="text"
              placeholder="Calle y número"
              class="w-full bg-transparent border rounded px-3 py-2 text-sm outline-none transition-colors focus:border-violet-500"
              style="border-color: var(--color-border); color: var(--color-text-primary);"
            />

            <!-- Solo para envío estándar -->
            <Transition name="fade-down">
              <div v-if="!isJunin" class="space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    v-model="form.city"
                    type="text"
                    placeholder="Localidad"
                    class="w-full bg-transparent border rounded px-3 py-2 text-sm outline-none transition-colors focus:border-violet-500"
                    style="border-color: var(--color-border); color: var(--color-text-primary);"
                  />
                  <input
                    v-model="form.province"
                    type="text"
                    placeholder="Provincia"
                    class="w-full bg-transparent border rounded px-3 py-2 text-sm outline-none transition-colors focus:border-violet-500"
                    style="border-color: var(--color-border); color: var(--color-text-primary);"
                  />
                </div>
                <input
                  v-model="form.postalCode"
                  type="text"
                  placeholder="Código postal"
                  class="w-full bg-transparent border rounded px-3 py-2 text-sm outline-none transition-colors focus:border-violet-500"
                  style="border-color: var(--color-border); color: var(--color-text-primary);"
                />
              </div>
            </Transition>
          </div>
        </Transition>

        <!-- Shipping cost row — visible once selected -->
        <Transition name="fade-down">
          <div v-if="shippingSelected" class="flex items-center justify-between text-sm">
            <span style="color: var(--color-text-secondary);">Envío</span>
            <span
              class="font-semibold"
              :style="shippingCost === 0 ? 'color: #86efac;' : 'color: var(--color-text-primary);'"
            >
              {{ shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost) }}
            </span>
          </div>
        </Transition>

        <div style="border-top: 1px solid var(--color-border);" />

        <!-- Total -->
        <div class="flex items-center justify-between">
          <span class="font-semibold" style="color: var(--color-text-secondary);">Total</span>
          <span class="font-bold text-2xl" style="color: var(--color-text-primary);">
            {{ formatPrice(total) }}
          </span>
        </div>

        <!-- WhatsApp button -->
        <button
          @click="whatsappCheckout"
          :disabled="!shippingSelected"
          class="w-full py-3 px-6 font-semibold tracking-widest uppercase text-sm rounded flex items-center justify-center gap-2 transition-all"
          :style="shippingSelected
            ? 'background-color: #25d366; color: white; cursor: pointer;'
            : 'background-color: #1a1a1a; color: #4b5563; cursor: not-allowed; border: 1px solid #2d2d2d;'"
        >
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          {{ shippingSelected ? 'Realizar pedido' : 'Seleccioná un método de envío' }}
        </button>

        <span style="color: var(--color-text-primary);">
          Al presionar en "Realizar pedido" se te llevará a WhatsApp para finalizar tu compra.
        </span>

        <button
          @click="cart.clearCart()"
          class="w-full py-2 text-xs tracking-wider uppercase transition-colors"
          style="color: var(--color-text-muted);"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-down-enter-active,
.fade-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
