<script setup lang="ts">
// Spring-physics mouse follower — works on every page
let tx = 0, ty = 0
let cx = 0, cy = 0
let vx = 0, vy = 0
let raf = 0
let inited = false

const posX = ref(0)
const posY = ref(0)
const visible = ref(false)

function step() {
  vx += (tx - cx) * 0.062
  vy += (ty - cy) * 0.062
  vx *= 0.78
  vy *= 0.78
  cx += vx
  cy += vy
  posX.value = cx
  posY.value = cy
  raf = requestAnimationFrame(step)
}

function onMove(e: MouseEvent) {
  tx = e.clientX
  ty = e.clientY
  if (!inited) { cx = tx; cy = ty; inited = true }
  if (!visible.value) visible.value = true
}

function onLeave() {
  visible.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', onLeave)
  raf = requestAnimationFrame(step)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  document.documentElement.removeEventListener('mouseleave', onLeave)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div
    class="glass-cursor"
    :style="{
      transform: `translate(calc(${posX}px - 50%), calc(${posY}px - 50%))`,
      opacity: visible ? 1 : 0,
    }"
    aria-hidden="true"
  >
    <!-- Top-right specular glare highlight -->
    <div class="glass-cursor-glare" />
    <!-- Bottom-left soft shadow interior -->
    <div class="glass-cursor-inner" />
  </div>
</template>

<style scoped>
.glass-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  pointer-events: none;
  width: 280px;
  height: 90px;
  border-radius: 45px;
  will-change: transform;
  transition: opacity 0.38s cubic-bezier(0.4, 0, 0.2, 1);

  /* Blur the real page content — the frosting effect */
  backdrop-filter: blur(16px) brightness(3.5) saturate(110%);
  -webkit-backdrop-filter: blur(16px) brightness(3.5) saturate(110%);

  /* Strong white frost: without this, brightness on the dark gold base is still very dark */
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.44) 0%,
    rgba(255, 255, 255, 0.22) 50%,
    rgba(255, 255, 255, 0.10) 100%
  );

  /* Bright rim — top edge catches the "light source" */
  border-top: 1.5px solid rgba(255, 255, 255, 0.75);
  border-left: 1.5px solid rgba(255, 255, 255, 0.48);
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  box-shadow:
    /* Outer ambient drop shadow */
    0 14px 55px rgba(0, 0, 0, 0.32),
    0 5px 16px rgba(0, 0, 0, 0.22),
    /* Inner top rim glow */
    inset 0 1.5px 0 rgba(255, 255, 255, 0.65);
}

/* Specular highlight — light source from top-right */
.glass-cursor-glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 55% 50% at 68% 18%,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.15) 45%,
    transparent 75%
  );
}

/* Subtle gold depth tint in the lower-left interior */
.glass-cursor-inner {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    ellipse 55% 45% at 28% 85%,
    rgba(245, 196, 81, 0.14) 0%,
    transparent 65%
  );
}

/* Hide on touch-only devices (no mouse) */
@media (hover: none) {
  .glass-cursor {
    display: none;
  }
}
</style>
