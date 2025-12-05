import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ registerType: 'autoUpdate', manifest: false })
  ],
  server: { host: true },
  // WICHTIG: Fügt die PostCSS Konfiguration ein, damit Tailwind erkannt wird.
  css: {
    postcss: './postcss.config.js'
  }
})