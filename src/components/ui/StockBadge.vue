<script setup lang="ts">
const props = defineProps({
  stock: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div>
    <span
      v-if="stock === 0"
      class="inline-flex items-center gap-1.5 text-sm font-semibold"
      style="color: var(--color-crimson-light);"
    >
      <span class="w-2 h-2 rounded-full" style="background-color: var(--color-crimson);" />
      Sin stock
    </span>
    <span
      v-else-if="stock <= 3"
      class="inline-flex items-center gap-1.5 text-sm font-medium"
      style="color: #fbbf24;"
    >
      <span class="w-2 h-2 rounded-full" style="background-color: #fbbf24;" />
      {{ stock === 1 ? '¡Última unidad!' : `¡Últimas ${stock} unidades!` }}
    </span>
    <span
      v-else
      class="inline-flex items-center gap-1.5 text-sm"
      style="color: #86efac;"
    >
      <span class="w-2 h-2 rounded-full" style="background-color: #22c55e;" />
      {{ stock }} unidades disponibles
    </span>
  </div>
</template>
