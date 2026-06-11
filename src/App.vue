<script setup lang="ts">
import AppNav from './components/layout/AppNav.vue'
import AppFooter from './components/layout/AppFooter.vue'
import WhatsAppButton from './components/ui/WhatsAppButton.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background-color: var(--color-bg-base); color: var(--color-text-primary);">
    <AppNav />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
    <WhatsAppButton />
  </div>
</template>
