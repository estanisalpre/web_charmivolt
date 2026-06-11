import { defineStore } from 'pinia'
import type { Product, CartItem } from '@models'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalItems: (state): number =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state): number =>
      state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  },

  actions: {
    addToCart(product: Product, quantity: number = 1): void {
      const existing = this.items.find(i => i.product.id === product.id)
      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, product.stock)
      } else {
        this.items.push({ product, quantity: Math.min(quantity, product.stock) })
      }
    },

    removeFromCart(productId: string): void {
      this.items = this.items.filter(i => i.product.id !== productId)
    },

    updateQuantity(productId: string, quantity: number): void {
      const item = this.items.find(i => i.product.id === productId)
      if (!item) return
      if (quantity <= 0) {
        this.removeFromCart(productId)
        return
      }
      item.quantity = Math.min(quantity, item.product.stock)
    },

    clearCart(): void {
      this.items = []
    },
  },
})
