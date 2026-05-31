<template>
  <div class="fixed top-0 left-0 w-full h-1 z-[100] no-print">
    <div
      class="h-full bg-gradient-to-r from-violet-500 via-emerald-400 to-blue-500 transition-all duration-150 ease-out origin-left"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>

<script setup lang="ts">
const progress = ref(0)

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})

function updateProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (height === 0) {
    progress.value = 0
    return
  }
  progress.value = winScroll / height
}
</script>
