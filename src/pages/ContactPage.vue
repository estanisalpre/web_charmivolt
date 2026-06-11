<script setup>
import { computed } from 'vue'
import { config } from '../data/config.js'

const { store, whatsapp } = config

const whatsappHref = computed(() =>
  `https://wa.me/${whatsapp.phone}?text=${encodeURIComponent(whatsapp.message)}`
)

const whatsappDisplay = computed(() => {
  const p = whatsapp.phone
  return `+${p.slice(0, 2)} ${p.slice(2, 5)} ${p.slice(5, 9)}-${p.slice(9)}`
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

    <!-- Header -->
    <div class="mb-12 text-center">
      <p
        class="text-xs tracking-widest uppercase mb-3"
        style="color: var(--color-accent-light);"
      >
        Estamos para ayudarte
      </p>
      <h1
        class="text-5xl font-semibold"
        style="font-family: var(--font-gothic); color: var(--color-text-primary);"
      >
        Contacto
      </h1>
      <div class="mt-4 w-16 h-px mx-auto" style="background-color: var(--color-accent);" />
    </div>

    <!-- Contact cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">

      <!-- WhatsApp -->
      <a
        :href="whatsappHref"
        target="_blank"
        rel="noopener"
        class="flex flex-col items-center text-center p-8 rounded-lg border transition-all duration-300 group"
        style="background-color: var(--color-bg-card); border-color: var(--color-border);"
      >
        <div
          class="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style="background-color: #25d366;"
        >
          <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
        <h2
          class="text-lg font-semibold mb-1"
          style="font-family: var(--font-gothic); color: var(--color-text-primary);"
        >
          WhatsApp
        </h2>
        <p class="text-sm" style="color: var(--color-text-muted);">{{ whatsappDisplay }}</p>
        <p class="text-xs mt-2 tracking-wider uppercase" style="color: var(--color-accent-light);">
          Enviar mensaje →
        </p>
      </a>

      <!-- Email -->
      <a
        :href="`mailto:${store.email}`"
        class="flex flex-col items-center text-center p-8 rounded-lg border transition-all duration-300 group"
        style="background-color: var(--color-bg-card); border-color: var(--color-border);"
      >
        <div
          class="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style="background-color: var(--color-accent);"
        >
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h2
          class="text-lg font-semibold mb-1"
          style="font-family: var(--font-gothic); color: var(--color-text-primary);"
        >
          Email
        </h2>
        <p class="text-sm" style="color: var(--color-text-muted);">{{ store.email }}</p>
        <p class="text-xs mt-2 tracking-wider uppercase" style="color: var(--color-accent-light);">
          Escribirnos →
        </p>
      </a>

    </div>

    <!-- Instagram + Location -->
    <div
      class="p-8 rounded-lg border text-center"
      style="background-color: var(--color-bg-surface); border-color: var(--color-border);"
    >
      <p
        class="text-xl font-semibold mb-2"
        style="font-family: var(--font-gothic); color: var(--color-text-primary);"
      >
        Seguinos en Instagram
      </p>
      <a
        :href="store.instagram"
        target="_blank"
        rel="noopener"
        class="text-sm tracking-wider uppercase transition-colors"
        style="color: var(--color-accent-light);"
      >
        @charmivolt →
      </a>
      <p class="mt-6 text-sm" style="color: var(--color-text-muted);">
        📍 {{ store.city }}
      </p>
    </div>

    <!-- Tagline -->
    <div class="mt-12 text-center">
      <p
        class="text-lg italic"
        style="font-family: var(--font-gothic); color: var(--color-text-muted);"
      >
        "La oscuridad también tiene estilo."
      </p>
      <p class="text-xs mt-2 tracking-widest" style="color: var(--color-text-muted);">— Charmivolt</p>
    </div>

  </div>
</template>
