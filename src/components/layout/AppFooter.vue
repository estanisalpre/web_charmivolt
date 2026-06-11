<script setup>
import { RouterLink } from 'vue-router'
import { config } from '../../data/config.js'

const { store } = config
</script>

<template>
  <footer
    class="border-t mt-16"
    style="background-color: var(--color-bg-surface); border-color: var(--color-border);"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div>
          <p
            class="text-2xl tracking-widest uppercase mb-3"
            style="font-family: var(--font-gothic); color: var(--color-text-primary);"
          >
            ✦ Charmivolt
          </p>
          <p class="text-sm leading-relaxed" style="color: var(--color-text-muted);">
            Accesorios únicos para carteras.<br />La oscuridad también tiene estilo.
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
            <li><RouterLink to="/carrito" class="hover:text-white transition-colors">Carrito</RouterLink></li>
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
              <a :href="store.instagram" target="_blank" rel="noopener" class="hover:text-white transition-colors">
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
        <p>Hecho con 🖤 en Buenos Aires</p>
      </div>
    </div>
  </footer>
</template>
