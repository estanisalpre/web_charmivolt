<script setup>
import BaseModal from '../ui/BaseModal.vue'
import { useProducts } from '../../composables/useProducts.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const { formatPrice } = useProducts()

function discountedPrice(price, percent) {
  return price * (1 - percent / 100)
}
</script>

<template>
  <BaseModal :modelValue="modelValue" title="Medios de pago" @update:modelValue="emit('update:modelValue', $event)">
    <div class="space-y-6 text-sm" style="color: var(--color-text-secondary);">

      <!-- Tarjetas de crédito -->
      <section>
        <h3
          class="text-base font-semibold mb-3 pb-2 border-b flex items-center gap-2"
          style="font-family: var(--font-gothic); color: var(--color-text-primary); border-color: var(--color-border);"
        >
          <span>💳</span> Tarjetas de crédito
        </h3>
        <p class="mb-2">Total en 1 pago: <strong style="color: var(--color-text-primary);">{{ formatPrice(price) }}</strong> con todas las tarjetas.</p>
        <p class="mb-3" style="color: var(--color-text-muted);">O pagá en cuotas:</p>
        <div class="space-y-2">
          <div
            class="flex justify-between items-center py-2 px-3 rounded"
            style="background-color: var(--color-bg-card);"
          >
            <div>
              <p style="color: var(--color-text-primary);">1 cuota de {{ formatPrice(price) }} sin interés</p>
              <p class="text-xs" style="color: var(--color-text-muted);">CFT: 0,00% | TEA: 0,00%</p>
            </div>
            <p class="font-semibold" style="color: var(--color-accent-light);">{{ formatPrice(price) }}</p>
          </div>
        </div>
      </section>

      <!-- Tarjetas de débito -->
      <section>
        <h3
          class="text-base font-semibold mb-3 pb-2 border-b flex items-center gap-2"
          style="font-family: var(--font-gothic); color: var(--color-text-primary); border-color: var(--color-border);"
        >
          <span>🏦</span> Tarjetas de débito
        </h3>
        <p>Total: <strong style="color: var(--color-text-primary);">{{ formatPrice(price) }}</strong></p>
      </section>

      <!-- Transferencia -->
      <section>
        <h3
          class="text-base font-semibold mb-3 pb-2 border-b flex items-center gap-2"
          style="font-family: var(--font-gothic); color: var(--color-text-primary); border-color: var(--color-border);"
        >
          <span>🏛️</span> Transferencia o depósito
        </h3>
        <div
          class="p-3 rounded border"
          style="background-color: color-mix(in srgb, var(--color-accent) 10%, var(--color-bg-card)); border-color: var(--color-accent);"
        >
          <p class="font-semibold mb-1" style="color: var(--color-accent-light);">20% de descuento</p>
          <div class="flex items-center gap-2">
            <span class="line-through text-xs" style="color: var(--color-text-muted);">{{ formatPrice(price) }}</span>
            <span class="font-bold text-base" style="color: var(--color-text-primary);">{{ formatPrice(discountedPrice(price, 20)) }}</span>
          </div>
        </div>
        <p class="text-xs mt-2" style="color: var(--color-text-muted);">
          El descuento se aplica sobre el precio del producto (sin envío) al elegir este medio de pago.
        </p>
      </section>

      <!-- Billetera virtual -->
      <section>
        <h3
          class="text-base font-semibold mb-3 pb-2 border-b flex items-center gap-2"
          style="font-family: var(--font-gothic); color: var(--color-text-primary); border-color: var(--color-border);"
        >
          <span>📱</span> Billetera virtual
        </h3>
        <p>Total: <strong style="color: var(--color-text-primary);">{{ formatPrice(price) }}</strong></p>
      </section>

    </div>
  </BaseModal>
</template>
