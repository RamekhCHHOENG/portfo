<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-8"
  >
    <button
      v-show="isVisible"
      @click="scrollToTop"
      class="no-print fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full glass-card hover:bg-white/10 text-white/80 hover:text-white transition-all shadow-[0_4px_24px_rgba(0,0,0,0.5)] group"
      aria-label="Back to top"
    >
      <svg class="w-5 h-5 transform group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
const isVisible = ref(false)

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

function checkScroll() {
  isVisible.value = window.scrollY > 500
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
