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
      type: 'module',
    },
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Ramekhchhoeng – Full-Stack Developer',
      meta: [
        { name: 'description', content: 'Personal portfolio of Ramekhchhoeng, a Full-Stack Developer specializing in TypeScript, Python, and modern web technologies.' },
        { name: 'theme-color', content: '#6366f1' },
        { property: 'og:title', content: 'Ramekhchhoeng – Full-Stack Developer' },
        { property: 'og:description', content: 'Personal portfolio showcasing projects in TypeScript, Python, React, and more.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
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
      include: ['html2pdf.js'],
    },
  },
})
