<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

function decrement() {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

function increment() {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>

<template>
  <div class="flex items-center border rounded-md overflow-hidden" style="border-color: var(--color-border);">
    <button
      @click="decrement"
      :disabled="modelValue <= min"
      class="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      style="color: var(--color-text-secondary);"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
      </svg>
    </button>
    <span
      class="w-12 text-center text-sm font-semibold select-none"
      style="color: var(--color-text-primary);"
    >
      {{ modelValue }}
    </span>
    <button
      @click="increment"
      :disabled="modelValue >= max"
      class="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      style="color: var(--color-text-secondary);"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  </div>
</template>
