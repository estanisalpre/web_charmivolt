<script setup lang="ts">
import BaseModal from '../ui/BaseModal.vue'
import { useProducts } from '../../composables/useProducts.js'

const props = defineProps<{ modelValue: boolean; price: number }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const { formatPrice } = useProducts()

function discountedPrice(price: number, percent: number): number {
  return price * (1 - percent / 100)
}
</script>

<template>
  <BaseModal :modelValue="modelValue" title="Medios de pago y envíos" @update:modelValue="emit('update:modelValue', $event)">
    <div class="space-y-5 text-sm" style="color: var(--color-text-secondary);">

      <!-- Transferencia -->
      <section
        class="p-4 rounded-lg border"
        style="background-color: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg-card)); border-color: var(--color-accent);"
      >
        <div class="flex items-start justify-between gap-4 mb-3">
          <h3
            class="text-base font-semibold flex items-center gap-2"
            style="font-family: var(--font-gothic); color: var(--color-text-primary);"
          >
            <span>📲</span> Transferencia
          </h3>
        </div>

        <ul class="space-y-1.5 text-xs" style="color: var(--color-text-secondary);">
          <li class="flex items-center gap-2">
            <span style="color: var(--color-accent-light);">◆</span>
            Mercado Pago
          </li>
          <li class="flex items-center gap-2">
            <span style="color: var(--color-accent-light);">◆</span>
            Cuenta DNI
          </li>
        </ul>
      </section>

      <!-- Tarjetas -->
      <!-- <section>
        <h3
          class="text-base font-semibold mb-3 pb-2 border-b flex items-center gap-2"
          style="font-family: var(--font-gothic); color: var(--color-text-primary); border-color: var(--color-border);"
        >
          <span>💳</span> Tarjeta de crédito y débito
        </h3>
        <div
          class="flex items-center justify-between px-3 py-2.5 rounded"
          style="background-color: var(--color-bg-card);"
        >
          <p style="color: var(--color-text-primary);">Total en 1 pago</p>
          <p class="font-semibold" style="color: var(--color-text-primary);">{{ formatPrice(price) }}</p>
        </div>
        <p class="text-xs mt-2" style="color: var(--color-text-muted);">
          Todas las tarjetas. Sin recargo.
        </p>
      </section> -->

      <!-- Envíos -->
      <section>
        <h3
          class="text-base font-semibold mb-3 pb-2 border-b flex items-center gap-2"
          style="font-family: var(--font-gothic); color: var(--color-accent-light); border-color: var(--color-border);"
        >
          Efectivo
        </h3>
        <div class="space-y-2">
          <div
            class="flex items-start gap-3 px-3 py-2.5 rounded"
            style="background-color: var(--color-bg-card);"
          >
            <span class="mt-0.5 shrink-0" style="color: var(--color-accent-light);">◆</span>
            <div>
              <p style="color: var(--color-accent-light);">Pago contraentrega al retirar</p>
              <p class="text-xs mt-0.5" style="color: var(--color-text-primary);">
                Si eres de Junín, podés retirar tu pedido en nuestro local y pagar en efectivo al momento de la entrega.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </BaseModal>
</template>
