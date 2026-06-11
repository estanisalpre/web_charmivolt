import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  },

  actions: {
    addToCart(product, quantity = 1) {
      const existing = this.items.find(i => i.product.id === product.id)
      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, product.stock)
      } else {
        this.items.push({ product, quantity: Math.min(quantity, product.stock) })
      }
    },

    removeFromCart(productId) {
      this.items = this.items.filter(i => i.product.id !== productId)
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(i => i.product.id === productId)
      if (!item) return
      if (quantity <= 0) {
        this.removeFromCart(productId)
        return
      }
      item.quantity = Math.min(quantity, item.product.stock)
    },

    clearCart() {
      this.items = []
    },
  },
})
