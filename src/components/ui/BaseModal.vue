<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), { title: '' })
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function close(): void {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        style="background-color: rgba(0,0,0,0.75);"
        @click.self="close"
      >
        <div
          class="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-lg border overflow-hidden"
          style="background-color: var(--color-bg-surface); border-color: var(--color-border);"
        >
          <!-- Header — fijo, no scrollea -->
          <div
            class="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b"
            style="border-color: var(--color-border);"
          >
            <h2
              class="text-xl"
              style="font-family: var(--font-gothic); color: var(--color-accent-light);"
            >
              {{ title }}
            </h2>
            <button
              @click="close"
              class="p-1 rounded transition-colors"
              style="color: var(--color-text-muted);"
              aria-label="Cerrar"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content — scrolleable -->
          <div class="flex-1 overflow-y-auto px-6 py-5">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
