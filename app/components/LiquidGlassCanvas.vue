<script setup lang="ts">
import { useLiquidGlass } from '~/composables/useLiquidGlass'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { init, resize, setMouse, clearMouse, destroy } = useLiquidGlass(canvasRef)

let ro: ResizeObserver | null = null

onMounted(() => {
  if (!init()) return

  const parent = canvasRef.value?.parentElement
  if (parent) {
    // Track dimensions to skip the initial ResizeObserver fire (same size → no-op in resize())
    ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      if (width > 0 && height > 0) resize(width, height)
    })
    ro.observe(parent)
  }
})

onUnmounted(() => {
  ro?.disconnect()
  destroy()
})

defineExpose({ setMouse, clearMouse })
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none"
    aria-hidden="true"
  />
</template>
