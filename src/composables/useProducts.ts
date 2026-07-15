import { computed } from 'vue'
import { products, productById } from '../data/products'
import type { Product } from '../types/index'

const FEATURED_COUNT = 3

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function useProducts() {
  const all = computed(() => products)

  const featured = computed(() => {
    const inStock = shuffle(products.filter(p => p.stock > 0))
    const outOfStock = products.filter(p => p.stock === 0)

    if (inStock.length >= FEATURED_COUNT) {
      return inStock.slice(0, FEATURED_COUNT)
    }

    const remaining = FEATURED_COUNT - inStock.length
    return [...inStock, ...shuffle(outOfStock).slice(0, remaining)]
  })

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
