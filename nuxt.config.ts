// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/ui',
    '@vite-pwa/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Ramekhchhoeng – Portfolio',
      short_name: 'RC Portfolio',
      description: 'Personal portfolio of Ramekhchhoeng, a Full-Stack Developer.',
      theme_color: '#6366f1',
      background_color: '#09090b',
      display: 'standalone',
      start_url: '/',
      scope: '/',
      orientation: 'any',
      lang: 'en',
      icons: [
        {
          src: 'icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: 'icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
          },
        },
      ],
    },
    devOptions: {
      enabled: false,
    },
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Ramekh Chhoeng – Frontend Engineer Lead',
      meta: [
        { name: 'description', content: 'Professional portfolio of Ramekh Chhoeng, a Frontend Engineer Lead specializing in Vue.js, TypeScript, and Mobile Development.' },
        { name: 'theme-color', content: '#6366f1' },
        { property: 'og:title', content: 'Ramekh Chhoeng – Frontend Engineer Lead' },
        { property: 'og:description', content: 'Professional portfolio of Ramekh Chhoeng, a Frontend Engineer Lead specializing in Vue.js, TypeScript, and Mobile Development.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        // Manifest is handled by @vite-pwa/nuxt automatically
        { rel: 'apple-touch-icon', href: '/icons/icon-192.png' },
        { rel: 'icon', type: 'image/png', href: '/icons/icon-192.png' },
      ],
    },
  },

  nitro: {
    preset: 'static',
  },

  vite: {
    optimizeDeps: {
      include: ['html2pdf.js', 'workbox-window'],
    },
  },
})
