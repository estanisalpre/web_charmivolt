import { computed } from 'vue'
import { products, productById } from '../data/products.js'

export function useProducts() {
  const all = computed(() => products)
  const featured = computed(() => products.filter(p => p.featured))

  function getById(id) {
    return productById[id] ?? null
  }

  function getImageUrl(filename) {
    return new URL(`../assets/products/${filename}`, import.meta.url).href
  }

  function formatPrice(amount) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return { all, featured, getById, getImageUrl, formatPrice }
}
