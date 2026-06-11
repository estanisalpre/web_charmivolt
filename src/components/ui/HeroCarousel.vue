<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import type { Slide } from '@models'

const props = defineProps<{ slides: Slide[] }>()

const current = ref(0)
const direction = ref('slide-next')
let intervalId: ReturnType<typeof setInterval> | null = null

function prev(): void {
  direction.value = 'slide-prev'
  current.value = (current.value - 1 + props.slides.length) % props.slides.length
}

function next(): void {
  direction.value = 'slide-next'
  current.value = (current.value + 1) % props.slides.length
}

function goTo(index: number): void {
  direction.value = index > current.value ? 'slide-next' : 'slide-prev'
  current.value = index
}

function startAutoplay(): void {
  intervalId = setInterval(next, 5000)
}

function stopAutoplay(): void {
  if (intervalId !== null) clearInterval(intervalId)
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)
</script>

<template>
  <section
    class="carousel-section relative w-full overflow-hidden"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <Transition :name="direction">
      <div :key="current" class="absolute inset-0">

        <!-- ── SLIDE CON TEXTO: split en desktop ── -->
        <template v-if="!slides[current].noText">
          <!-- Panel imagen (izquierda en lg) -->
          <div class="absolute inset-0 lg:right-[40%]" style="background-color: #0a0a0a;">
            <img
              :src="slides[current].image"
              :alt="slides[current].title"
              class="absolute inset-0 w-full h-full object-cover object-center"
            />
            <!-- Difuminado mobile (ambos lados) -->
            <div class="lg:hidden absolute inset-y-0 left-0 w-2/5 pointer-events-none"
                 style="background: linear-gradient(to right, #0a0a0a 20%, transparent);" />
            <div class="lg:hidden absolute inset-y-0 right-0 w-2/5 pointer-events-none"
                 style="background: linear-gradient(to left, #0a0a0a 20%, transparent);" />
            <!-- Difuminado desktop: borde derecho → funde con panel texto -->
            <div class="hidden lg:block absolute inset-y-0 right-0 w-48 pointer-events-none"
                 style="background: linear-gradient(to right, transparent, #0a0a0a);" />
          </div>

          <!-- Panel texto — solo desktop -->
          <div
            class="absolute top-0 bottom-0 right-0 w-[40%] hidden lg:flex flex-col justify-center px-10 xl:px-16"
            style="background-color: #0a0a0a;"
          >
            <p class="text-xs tracking-widest uppercase mb-4" style="color: var(--color-accent-light);">
              Colección
            </p>
            <h1
              class="text-4xl xl:text-5xl font-semibold mb-5 leading-tight"
              style="font-family: var(--font-gothic); color: var(--color-text-primary);"
            >
              {{ slides[current].title }}
            </h1>
            <p class="text-base xl:text-lg mb-10 leading-relaxed" style="color: var(--color-text-secondary);">
              {{ slides[current].subtitle }}
            </p>
            <RouterLink
              :to="slides[current].link"
              class="cta-link inline-block w-fit px-8 py-3 text-sm font-semibold tracking-widest uppercase border transition-all duration-300"
              style="border-color: var(--color-accent); color: var(--color-text-primary);"
            >
              {{ slides[current].cta }}
            </RouterLink>
          </div>

          <!-- Overlay texto — solo mobile -->
          <div class="lg:hidden absolute inset-0 flex items-center justify-center px-14">
            <div class="text-center">
              <p class="text-xs sm:text-sm tracking-widest uppercase mb-3" style="color: var(--color-accent-light);">Colección</p>
              <h1
                class="text-2xl sm:text-4xl font-semibold mb-3 leading-tight"
                style="font-family: var(--font-gothic); color: var(--color-text-primary);"
              >
                {{ slides[current].title }}
              </h1>
              <p class="text-sm sm:text-lg mb-6 sm:mb-8" style="color: var(--color-text-secondary);">
                {{ slides[current].subtitle }}
              </p>
              <RouterLink
                :to="slides[current].link"
                class="cta-link inline-block px-8 py-3 text-sm font-semibold tracking-widest uppercase border transition-all duration-300"
                style="border-color: var(--color-accent); color: var(--color-text-primary);"
              >
                {{ slides[current].cta }}
              </RouterLink>
            </div>
          </div>
        </template>

        <!-- ── SLIDE SIN TEXTO: full width con difuminado ── -->
        <template v-else>
          <div class="absolute inset-0" style="background-color: #0a0a0a;" />
          <img
            :src="slides[current].image"
            :alt="slides[current].title"
            class="absolute inset-0 w-full h-full object-contain"
          />
          <div class="absolute inset-y-0 left-0 w-2/5 pointer-events-none"
               style="background: linear-gradient(to right, #0a0a0a 20%, transparent);" />
          <div class="absolute inset-y-0 right-0 w-2/5 pointer-events-none"
               style="background: linear-gradient(to left, #0a0a0a 20%, transparent);" />
        </template>

      </div>
    </Transition>

    <!-- Flechas -->
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full border transition-all z-10"
      style="background-color: rgba(0,0,0,0.55); border-color: var(--color-border); color: var(--color-text-primary);"
      @click="prev"
      aria-label="Anterior"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full border transition-all z-10"
      style="background-color: rgba(0,0,0,0.55); border-color: var(--color-border); color: var(--color-text-primary);"
      @click="next"
      aria-label="Siguiente"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goTo(index)"
        class="h-2 rounded-full transition-all duration-300"
        :style="index === current
          ? 'width: 1.5rem; background-color: var(--color-accent);'
          : 'width: 0.5rem; background-color: rgba(255,255,255,0.4);'"
        :aria-label="`Slide ${index + 1}`"
      />
    </div>
  </section>
</template>

<style scoped>
.carousel-section {
  height: clamp(320px, 65vh, 640px);
}

@media (min-width: 1024px) {
  .carousel-section {
    height: clamp(520px, 82vh, 920px);
  }
}

/* Siguiente: nueva slide entra desde la derecha, vieja sale a la izquierda */
.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.55s ease;
  position: absolute;
  inset: 0;
}
.slide-next-enter-from  { transform: translateX(100%); opacity: 0; }
.slide-next-enter-to    { transform: translateX(0);    opacity: 1; }
.slide-next-leave-from  { transform: translateX(0);    opacity: 1; }
.slide-next-leave-to    { transform: translateX(-25%); opacity: 0; }

/* Anterior: nueva slide entra desde la izquierda, vieja sale a la derecha */
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.55s ease;
  position: absolute;
  inset: 0;
}
.slide-prev-enter-from  { transform: translateX(-100%); opacity: 0; }
.slide-prev-enter-to    { transform: translateX(0);     opacity: 1; }
.slide-prev-leave-from  { transform: translateX(0);     opacity: 1; }
.slide-prev-leave-to    { transform: translateX(25%);   opacity: 0; }

.cta-link:hover {
  background-color: var(--color-accent) !important;
}
</style>
