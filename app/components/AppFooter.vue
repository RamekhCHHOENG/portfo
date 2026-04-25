<template>
  <footer class="no-print glass-divider" style="background: rgba(6,2,14,0.6); backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px);">
    <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-xs text-white/30">
        © {{ year }} Ramekhchhoeng. Built with Nuxt 4 &amp; Tailwind CSS.
      </p>
      <div class="flex gap-6">
          <a href="mailto:ramekhchhoeng@icloud.com" class="text-xs text-white/30 hover:text-white/70 transition-colors">Email</a>
          <a href="https://github.com/RamekhCHHOENG" target="_blank" rel="noopener" class="text-xs text-white/30 hover:text-white/70 transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/ramekhchhoeng/" target="_blank" rel="noopener" class="text-xs text-white/30 hover:text-white/70 transition-colors">LinkedIn</a>
          <a href="https://twitter.com/RamekhCHHOENG" target="_blank" rel="noopener" class="text-xs text-white/30 hover:text-white/70 transition-colors">Twitter</a>
          <a href="https://www.instagram.com/ramekhchhoeng/" target="_blank" rel="noopener" class="text-xs text-white/30 hover:text-white/70 transition-colors">Instagram</a>
        </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
