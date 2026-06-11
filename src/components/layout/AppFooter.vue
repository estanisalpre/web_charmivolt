<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { config } from '@data/config'
import { LogoBlackBg } from '@assets/logo';

const { store } = config
</script>

<template>
  <footer
    class="bg-black border-t mt-16"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div>
          <img :src="LogoBlackBg" alt="Charmivolt Logo" class="w-12 h-auto object-contain mb-3" />
          <p class="text-sm leading-relaxed" style="color: var(--color-text-muted);">
            Para chicas que aman destacar ⭐️🪩⛓️
          </p>
          <p class="text-xs mt-3" style="color: var(--color-text-muted);">
            {{ store.city }}
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h3
            class="text-xs font-semibold tracking-widest uppercase mb-4"
            style="color: var(--color-accent-light);"
          >
            Navegación
          </h3>
          <ul class="space-y-2 text-sm" style="color: var(--color-text-secondary);">
            <li><RouterLink to="/" class="hover:text-white transition-colors">Inicio</RouterLink></li>
            <li><RouterLink to="/productos" class="hover:text-white transition-colors">Productos</RouterLink></li>
            <li><RouterLink to="/contacto" class="hover:text-white transition-colors">Contacto</RouterLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3
            class="text-xs font-semibold tracking-widest uppercase mb-4"
            style="color: var(--color-accent-light);"
          >
            Contacto
          </h3>
          <ul class="space-y-2 text-sm" style="color: var(--color-text-secondary);">
            <li>
              <a :href="`mailto:${store.email}`" class="hover:text-white transition-colors">
                {{ store.email }}
              </a>
            </li>
            <li>
              <a :href="store.instagram" target="_blank" rel="noopener" class="flex items-center gap-2 hover:text-white transition-colors">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
        style="border-color: var(--color-border); color: var(--color-text-muted);"
      >
        <p>© {{ new Date().getFullYear() }} Charmivolt. Todos los derechos reservados.</p>
        <p>Hecho con 🤍</p>
      </div>
    </div>
  </footer>
</template>
