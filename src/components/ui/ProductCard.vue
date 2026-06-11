<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useProducts } from '@composables/useProducts'
import type { Product } from '@models'

const props = defineProps<{ product: Product }>()

const { getImageUrl, formatPrice } = useProducts()

function onImgError(e: Event): void {
  ;(e.target as HTMLImageElement).src = 'https://placehold.co/400x400/1a1a1a/7c3aed?text=Charmivolt'
}
</script>

<template>
  <RouterLink
    :to="`/producto/${product.id}`"
    class="group block rounded-lg border overflow-hidden transition-all duration-300"
    style="background-color: var(--color-bg-card); border-color: var(--color-border);"
    :style="{
      '--tw-shadow': '0 0 0 0 transparent',
    }"
  >
    <!-- Image wrapper -->
    <div class="relative overflow-hidden aspect-square">
      <img
        :src="getImageUrl(product.images[0])"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        @error="onImgError"
      />

      <!-- SIN STOCK overlay -->
      <div
        v-if="product.stock === 0"
        class="absolute inset-0 flex items-center justify-center"
        style="background-color: rgba(0,0,0,0.65);"
      >
        <span
          class="text-lg font-bold tracking-widest uppercase px-4 py-2 border"
          style="font-family: var(--font-gothic); color: var(--color-crimson-light); border-color: var(--color-crimson);"
        >
          Sin Stock
        </span>
      </div>

      <!-- Hover border glow -->
      <div
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style="box-shadow: inset 0 0 0 1px var(--color-accent);"
      />
    </div>

    <!-- Info -->
    <div class="p-4">
      <h3
        class="text-base font-semibold mb-1 truncate"
        style="font-family: var(--font-gothic); color: var(--color-text-primary);"
      >
        {{ product.name }}
      </h3>
      <div class="flex items-center gap-2">
        <span
          v-if="product.compareAtPrice"
          class="text-xs line-through"
          style="color: var(--color-text-muted);"
        >
          {{ formatPrice(product.compareAtPrice) }}
        </span>
        <span
          class="text-lg font-semibold"
          style="color: var(--color-accent-light);"
        >
          {{ formatPrice(product.price) }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>
