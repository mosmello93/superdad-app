import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // WICHTIG: Fügt die PostCSS Konfiguration ein, damit Tailwind erkannt wird.
  css: {
    postcss: './postcss.config.js'
  }
})