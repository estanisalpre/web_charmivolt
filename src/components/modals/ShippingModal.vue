<script setup lang="ts">
import BaseModal from '@components/ui/BaseModal.vue'
import { useProducts } from '@composables/useProducts'
import { config } from '@data/config'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const { formatPrice } = useProducts()
const { shipping } = config
</script>

<template>
  <BaseModal :modelValue="modelValue" title="Opciones de envío" @update:modelValue="emit('update:modelValue', $event)">
    <div class="space-y-4 text-sm" style="color: var(--color-text-secondary);">
      <div
        v-for="method in shipping.methods"
        :key="method.name"
        class="flex items-start justify-between p-4 rounded border"
        style="background-color: var(--color-bg-card); border-color: var(--color-border);"
      >
        <div>
          <p class="font-semibold mb-0.5" style="color: var(--color-accent-light);">{{ method.name }}</p>
          <p class="text-xs" style="color: var(--color-text-primary);">{{ method.description }}</p>
        </div>
        <span
          class="ml-4 font-bold whitespace-nowrap"
          :style="method.price === 0 ? 'color: #86efac;' : 'color: var(--color-accent-light);'"
        >
          {{ method.price === 0 ? 'Gratis' : formatPrice(method.price) }}
        </span>
      </div>

      <p class="text-xs pt-2" style="color: var(--color-text-primary);">
        Los envíos y/o retiros se coordinan vía WhatsApp.
      </p>
    </div>
  </BaseModal>
</template>
