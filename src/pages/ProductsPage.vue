<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ui/ProductCard.vue'
import { useProducts } from '../composables/useProducts.js'
import { useSeo } from '../composables/useSeo.js'

const route = useRoute()
const router = useRouter()
const { all } = useProducts()

useSeo(() => {
  const cat = typeof route.query.categoria === 'string' ? route.query.categoria : null
  const labels: Record<string, string> = { minibags: 'Mini Bags', bags: 'Bags', charms: 'Charms' }
  return {
    title: cat ? `${labels[cat] ?? cat}` : 'Productos',
    description: 'Explorá nuestra colección de Mini Bags, Bags y Charms con estilo gótico y y2k.',
  }
})

const CATEGORY_LABELS: Record<string, string> = {
  minibags: 'Mini Bags',
  bags: 'Bags',
  charms: 'Charms',
}

const activeCategory = computed(() => {
  const param = route.query.categoria
  return typeof param === 'string' ? param : 'todas'
})

const pageTitle = computed(() => {
  if (activeCategory.value === 'todas') return 'Todos los Productos'
  return CATEGORY_LABELS[activeCategory.value] ?? activeCategory.value
})

const filtered = computed(() => {
  if (activeCategory.value === 'todas') return all.value
  return all.value.filter(p => p.category === activeCategory.value)
})

function setCategory(cat: string): void {
  if (cat === 'todas') {
    router.replace({ path: '/productos' })
  } else {
    router.replace({ path: '/productos', query: { categoria: cat } })
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-10">
      <p
        class="text-xs tracking-widest uppercase mb-2"
        style="color: var(--color-accent-light);"
      >
        {{ activeCategory === 'todas' ? 'Catálogo completo' : 'Colección' }}
      </p>
      <h1
        class="text-4xl sm:text-5xl"
        style="font-family: var(--font-gothic); color: var(--color-text-primary);"
      >
        {{ pageTitle }}
      </h1>
    </div>

    <!-- Category filter tabs -->
    <div class="flex flex-wrap gap-2 mb-10">
      <button
        @click="setCategory('todas')"
        class="px-4 py-1.5 text-xs tracking-widest uppercase border rounded-full transition-all"
        :style="activeCategory === 'todas'
          ? 'background-color: var(--color-accent); border-color: var(--color-accent); color: white;'
          : 'border-color: var(--color-border); color: var(--color-text-muted);'"
      >
        Todas
      </button>
      <button
        @click="setCategory('minibags')"
        class="px-4 py-1.5 text-xs tracking-widest uppercase border rounded-full transition-all"
        :style="activeCategory === 'minibags'
          ? 'background-color: var(--color-accent); border-color: var(--color-accent); color: white;'
          : 'border-color: var(--color-border); color: var(--color-text-muted);'"
      >
        Mini Bags
      </button>
      <button
        @click="setCategory('bags')"
        class="px-4 py-1.5 text-xs tracking-widest uppercase border rounded-full transition-all"
        :style="activeCategory === 'bags'
          ? 'background-color: var(--color-accent); border-color: var(--color-accent); color: white;'
          : 'border-color: var(--color-border); color: var(--color-text-muted);'"
      >
        Bags
      </button>
      <button
        @click="setCategory('charms')"
        class="px-4 py-1.5 text-xs tracking-widest uppercase border rounded-full transition-all"
        :style="activeCategory === 'charms'
          ? 'background-color: var(--color-accent); border-color: var(--color-accent); color: white;'
          : 'border-color: var(--color-border); color: var(--color-text-muted);'"
      >
        Charms
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
      <button
        @click="setCategory('todas')"
        class="mt-6 text-sm tracking-wider uppercase"
        style="color: var(--color-accent-light);"
      >
        Ver todos →
      </button>
    </div>
  </div>
</template>
