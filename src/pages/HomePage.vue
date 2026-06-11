<script setup lang="ts">
import HeroCarousel from '@components/ui/HeroCarousel.vue'
import ProductCard from '@components/ui/ProductCard.vue'
import { useProducts } from '@composables/useProducts'
import { useSeo } from '@composables/useSeo'
import { slides } from '@data/slides'

const { featured } = useProducts()

useSeo({
  title: 'Charmivolt | Mini Bags, Bags & Charms',
  description: 'Mini Bags, Bags y Charms únicos con estilo gótico y y2k. Envíos a toda Argentina por Correo Argentino.',
  noSuffix: true,
})
</script>

<template>
  <div>
    <!-- Hero carousel -->
    <HeroCarousel :slides="slides" />

    <!-- Featured products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex items-center justify-between mb-10">
        <div>
          <p
            class="text-xs tracking-widest uppercase mb-2"
            style="color: var(--color-accent-light);"
          >
            Selección especial
          </p>
          <h2
            class="text-3xl sm:text-4xl"
            style="font-family: var(--font-gothic); color: var(--color-text-primary);"
          >
            Productos Destacados
          </h2>
        </div>
        <RouterLink
          to="/productos"
          class="hidden sm:inline-flex items-center gap-2 text-sm tracking-wider uppercase transition-colors"
          style="color: var(--color-accent-light);"
        >
          Ver todos
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          v-for="product in featured"
          :key="product.id"
          :product="product"
        />
      </div>

      <div class="mt-10 text-center sm:hidden">
        <RouterLink
          to="/productos"
          class="inline-block px-8 py-3 border text-sm tracking-widest uppercase transition-all"
          style="border-color: var(--color-accent); color: var(--color-text-primary);"
        >
          Ver todos los productos
        </RouterLink>
      </div>
    </section>
  </div>
</template>
