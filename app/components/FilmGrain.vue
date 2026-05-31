<template>
  <canvas ref="el" aria-hidden="true" class="grain-overlay" />
</template>

<script setup lang="ts">
const el = ref<HTMLCanvasElement | null>(null)
let raf = 0
let last = 0

onMounted(() => {
  const canvas = el.value!
  const ctx = canvas.getContext('2d')!

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  function draw(time: number) {
    if (time - last > 55) {
      last = time
      const { width, height } = canvas
      const img = ctx.createImageData(width, height)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0
        d[i] = d[i + 1] = d[i + 2] = v
        d[i + 3] = 22
      }
      ctx.putImageData(img, 0, 0)
    }
    raf = requestAnimationFrame(draw)
  }

  raf = requestAnimationFrame(draw)

  onUnmounted(() => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0.055;
  mix-blend-mode: soft-light;
}
</style>
