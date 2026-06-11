<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../../stores/cart.js'

const cart = useCartStore()
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-md border-b"
    style="background-color: color-mix(in srgb, var(--color-bg-base) 90%, transparent); border-color: var(--color-border);"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2" @click="closeMenu">
        <span
          class="text-2xl tracking-widest uppercase"
          style="font-family: var(--font-gothic); color: var(--color-text-primary);"
        >
          ✦ Charmivolt
        </span>
      </RouterLink>

      <!-- Desktop nav -->
      <ul class="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider uppercase">
        <li>
          <RouterLink
            to="/"
            class="transition-colors"
            style="color: var(--color-text-secondary);"
            active-class="!text-[var(--color-accent-light)]"
          >
            Inicio
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/productos"
            class="transition-colors"
            style="color: var(--color-text-secondary);"
            active-class="!text-[var(--color-accent-light)]"
          >
            Productos
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/contacto"
            class="transition-colors"
            style="color: var(--color-text-secondary);"
            active-class="!text-[var(--color-accent-light)]"
          >
            Contacto
          </RouterLink>
        </li>
      </ul>

      <!-- Cart + hamburger -->
      <div class="flex items-center gap-4">
        <!-- Cart icon -->
        <RouterLink to="/carrito" class="relative" @click="closeMenu">
          <svg class="w-6 h-6" style="color: var(--color-text-secondary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <span
            v-if="cart.totalItems > 0"
            class="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
            style="background-color: var(--color-accent);"
          >
            {{ cart.totalItems > 99 ? '99+' : cart.totalItems }}
          </span>
        </RouterLink>

        <!-- Hamburger -->
        <button
          class="md:hidden p-1"
          style="color: var(--color-text-secondary);"
          @click="toggleMenu"
          :aria-expanded="menuOpen"
          aria-label="Menú"
        >
          <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div
      v-if="menuOpen"
      class="md:hidden border-t"
      style="background-color: var(--color-bg-surface); border-color: var(--color-border);"
    >
      <ul class="flex flex-col py-4 px-6 gap-4 text-sm font-medium tracking-wider uppercase">
        <li>
          <RouterLink to="/" style="color: var(--color-text-secondary);" @click="closeMenu">Inicio</RouterLink>
        </li>
        <li>
          <RouterLink to="/productos" style="color: var(--color-text-secondary);" @click="closeMenu">Productos</RouterLink>
        </li>
        <li>
          <RouterLink to="/contacto" style="color: var(--color-text-secondary);" @click="closeMenu">Contacto</RouterLink>
        </li>
        <li>
          <RouterLink to="/carrito" style="color: var(--color-text-secondary);" @click="closeMenu">Carrito ({{ cart.totalItems }})</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>
