<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
})

const current = ref(0)
let intervalId = null

function prev() {
  current.value = (current.value - 1 + props.slides.length) % props.slides.length
}

function next() {
  current.value = (current.value + 1) % props.slides.length
}

function goTo(index) {
  current.value = index
}

function startAutoplay() {
  intervalId = setInterval(next, 5000)
}

function stopAutoplay() {
  clearInterval(intervalId)
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)
</script>

<template>
  <section
    class="relative w-full overflow-hidden"
    style="height: clamp(320px, 60vh, 600px);"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <!-- Slides -->
    <TransitionGroup name="slide" tag="div" class="relative w-full h-full">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        v-show="index === current"
        class="absolute inset-0"
      >
        <!-- Background image -->
        <img
          :src="slide.image"
          :alt="slide.title"
          class="w-full h-full object-cover"
        />
        <!-- Dark overlay -->
        <div class="absolute inset-0" style="background: linear-gradient(to right, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.2));" />

        <!-- Content -->
        <div class="absolute inset-0 flex items-center">
          <div class="max-w-7xl mx-auto px-8 sm:px-12">
            <p
              class="text-sm tracking-widest uppercase mb-3"
              style="color: var(--color-accent-light);"
            >
              Colección
            </p>
            <h1
              class="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 max-w-xl leading-tight"
              style="font-family: var(--font-gothic); color: var(--color-text-primary);"
            >
              {{ slide.title }}
            </h1>
            <p
              class="text-lg mb-8 max-w-md"
              style="color: var(--color-text-secondary);"
            >
              {{ slide.subtitle }}
            </p>
            <RouterLink
              :to="slide.link"
              class="inline-block px-8 py-3 text-sm font-semibold tracking-widest uppercase border transition-all duration-200"
              style="border-color: var(--color-accent); color: var(--color-text-primary); background-color: transparent;"
              @mouseover="e => e.target.style.backgroundColor = 'var(--color-accent)'"
              @mouseleave="e => e.target.style.backgroundColor = 'transparent'"
            >
              {{ slide.cta }}
            </RouterLink>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- Arrows -->
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full border transition-all"
      style="background-color: rgba(0,0,0,0.5); border-color: var(--color-border); color: var(--color-text-primary);"
      @click="prev"
      aria-label="Anterior"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full border transition-all"
      style="background-color: rgba(0,0,0,0.5); border-color: var(--color-border); color: var(--color-text-primary);"
      @click="next"
      aria-label="Siguiente"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goTo(index)"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :style="index === current
          ? 'background-color: var(--color-accent); width: 1.5rem;'
          : 'background-color: rgba(255,255,255,0.4);'"
        :aria-label="`Slide ${index + 1}`"
      />
    </div>
  </section>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
  inset: 0;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
