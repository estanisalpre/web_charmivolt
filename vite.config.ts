import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

const src = (p: string) => resolve(__dirname, 'src', p)

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
  ],
  resolve: {
    alias: {
      '@assets':     src('assets'),
      '@router':     src('router'),
      '@stores':     src('stores'),
      '@types':      src('types'),
      '@pages':      src('pages'),
      '@composables': src('composables'),
      '@data':       src('data'),
      '@components': src('components'),
    },
  },
})
