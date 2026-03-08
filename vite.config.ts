import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Vite Configuration
export default defineConfig({
  base: './',
  plugins: [react()],
})
