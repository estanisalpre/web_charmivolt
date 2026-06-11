import { computed } from 'vue'
import { products, productById } from '../data/products.js'
import type { Product } from '../types/index.js'

export function useProducts() {
  const all = computed(() => products)
  const featured = computed(() => products.filter(p => p.featured))

  function getById(id: string): Product | null {
    return productById[id] ?? null
  }

  function getImageUrl(filename: string): string {
    return new URL(`../assets/products/${filename}`, import.meta.url).href
  }

  function formatPrice(amount: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return { all, featured, getById, getImageUrl, formatPrice }
}
