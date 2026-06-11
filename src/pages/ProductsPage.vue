<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ui/ProductCard.vue'
import { useProducts } from '../composables/useProducts.js'

const { all } = useProducts()

const categories = computed(() => {
  const cats = ['todas', ...new Set(all.value.map(p => p.category))]
  return cats
})

const activeCategory = ref('todas')

const filtered = computed(() => {
  if (activeCategory.value === 'todas') return all.value
  return all.value.filter(p => p.category === activeCategory.value)
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-10">
      <p
        class="text-xs tracking-widest uppercase mb-2"
        style="color: var(--color-accent-light);"
      >
        Catálogo completo
      </p>
      <h1
        class="text-4xl sm:text-5xl"
        style="font-family: var(--font-gothic); color: var(--color-text-primary);"
      >
        Todos los Productos
      </h1>
    </div>

    <!-- Category filter -->
    <div class="flex flex-wrap gap-2 mb-10">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        class="px-4 py-1.5 text-xs tracking-widest uppercase border rounded-full transition-all"
        :style="activeCategory === cat
          ? 'background-color: var(--color-accent); border-color: var(--color-accent); color: white;'
          : 'border-color: var(--color-border); color: var(--color-text-muted);'"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Grid -->
    <div v-if="filtered.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in filtered"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-else class="py-20 text-center" style="color: var(--color-text-muted);">
      <p class="text-xl" style="font-family: var(--font-gothic);">No hay productos en esta categoría.</p>
    </div>
  </div>
</template>
