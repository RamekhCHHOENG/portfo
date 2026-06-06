<template>
  <div v-if="show" class="intro" :class="{ 'intro--out': leaving }" aria-hidden="true">
    <div class="intro__body">
      <p class="intro__logo">RC.</p>
      <div class="intro__bar">
        <div class="intro__fill" :class="{ 'intro__fill--go': go }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const show    = ref(true)
const leaving = ref(false)
const go      = ref(false)

onMounted(() => {
  if (sessionStorage.getItem('rc-intro')) {
    show.value = false
    return
  }

  nextTick(() => { go.value = true })

  setTimeout(() => {
    leaving.value = true
    setTimeout(() => {
      show.value = false
      sessionStorage.setItem('rc-intro', '1')
    }, 700)
  }, 1900)
})
</script>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #0b0903 0%, #10130a 45%, #020f0b 100%);
  transition: opacity 0.65s ease, transform 0.65s cubic-bezier(0.76, 0, 0.24, 1);
}

.intro--out {
  opacity: 0;
  transform: scale(1.05);
  pointer-events: none;
}

.intro__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  animation: logoReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
}

@keyframes logoReveal {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.intro__logo {
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #fff;
  line-height: 1;
}

.intro__bar {
  width: 100px;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.10);
  border-radius: 999px;
  overflow: hidden;
}

.intro__fill {
  height: 100%;
  width: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(245, 196, 81, 0.72),
    rgba(255, 255, 255, 0.95),
    rgba(20, 184, 166, 0.58),
    transparent
  );
  border-radius: inherit;
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.intro__fill--go {
  width: 100%;
}
</style>
