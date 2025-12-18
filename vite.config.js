import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'papa',
        short_name: 'papa',
        description: 'Der Begleiter für werdende Väter',
        theme_color: '#FDFCF8',
        background_color: '#FDFCF8',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/images/papa_icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/papa_icon.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/images/papa_icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: "screenshots/screen_home.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Home Screen"
          },
          {
            src: "screenshots/screen_team.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Team Features"
          },
          {
            src: "screenshots/screen_tools.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Useful Tools"
          }
        ]
      }
    })
  ],
  server: { host: true },
  // WICHTIG: Fügt die PostCSS Konfiguration ein, damit Tailwind erkannt wird.
  css: {
    postcss: './postcss.config.js'
  }
})