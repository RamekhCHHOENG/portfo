<script setup lang="ts">
const dotRef = ref<HTMLElement | null>(null)
const ringRef = ref<HTMLElement | null>(null)

let mx = 0, my = 0, rx = 0, ry = 0, rafId = 0

function onMove(e: MouseEvent) {
  mx = e.clientX
  my = e.clientY
  if (dotRef.value) {
    dotRef.value.style.left = mx + 'px'
    dotRef.value.style.top = my + 'px'
  }
}

function onOver(e: MouseEvent) {
  const t = e.target as HTMLElement
  const interactive = t.closest('a, button, [data-magnetic], label, input, textarea, select')
  ringRef.value?.classList.toggle('is-hovering', !!interactive)
}

function tick() {
  rx += (mx - rx) * 0.12
  ry += (my - ry) * 0.12
  if (ringRef.value) {
    ringRef.value.style.left = rx.toFixed(2) + 'px'
    ringRef.value.style.top  = ry.toFixed(2) + 'px'
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(hover: none)').matches) return
  document.body.classList.add('custom-cursor-active')
  document.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseover', onOver, { passive: true })
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  document.body.classList.remove('custom-cursor-active')
  document.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseover', onOver)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div>
    <div ref="dotRef" class="cursor-dot" />
    <div ref="ringRef" class="cursor-ring" />
  </div>
</template>

<style scoped>
.cursor-dot,
.cursor-ring {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  will-change: left, top;
}

.cursor-dot {
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.9);
}

.cursor-ring {
  width: 30px;
  height: 30px;
  border: 1.5px solid rgba(255, 255, 255, 0.32);
  transition:
    width  0.25s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    background   0.25s ease;
}

.cursor-ring.is-hovering {
  width: 46px;
  height: 46px;
  border-color: rgba(245, 196, 81, 0.65);
  background: rgba(245, 196, 81, 0.05);
}

@media (hover: none) {
  .cursor-dot,
  .cursor-ring { display: none; }
}
</style>
