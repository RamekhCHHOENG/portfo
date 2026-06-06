<template>
  <section
    id="hero"
    class="relative min-h-screen flex flex-col items-center justify-center text-white pt-20 pb-20 px-5 sm:px-6 text-center overflow-hidden"
  >

    <!-- Page content (above the canvas) -->
    <div class="relative z-10 w-full max-w-4xl mx-auto">
      <!-- Profile + badge row -->
      <div class="flex flex-col items-center gap-4 mb-10 fade-up">
        <div class="relative">
          <div class="absolute inset-0 rounded-full scale-150 blur-2xl opacity-50"
               style="background: radial-gradient(circle, rgba(245,196,81,0.65) 0%, transparent 70%);" />
          <img
            src="/ramekhchhoeng.jpg"
            alt="Ramekhchhoeng"
            class="relative w-16 h-16 rounded-full object-cover shadow-[0_0_0_2px_rgba(245,196,81,0.5),0_0_0_5px_rgba(245,196,81,0.12),0_8px_32px_rgba(0,0,0,0.6)]"
          />
        </div>
        <div class="glass-sm inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-white/70">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          Available for new opportunities
        </div>
      </div>

      <!-- Main headline -->
      <h1 class="max-w-full mx-auto text-[34px] sm:text-[64px] lg:text-[82px] font-bold tracking-[-0.025em] sm:tracking-[-0.035em] leading-[1.05] mb-6 fade-up fade-up-1 break-words">
        Ramekh Chhoeng
      </h1>

      <!-- Subtitle -->
      <p
        class="text-lg sm:text-2xl text-white/90 max-w-3xl mx-auto leading-snug mb-4 fade-up fade-up-2"
      >
        Frontend Engineer building production Vue, Nuxt, and full-stack products.
      </p>
      <p class="text-sm sm:text-base text-white/68 max-w-2xl mx-auto leading-relaxed mb-10 fade-up fade-up-2">
        4.5+ years shipping enterprise interfaces, mobile companion apps, and reliable internal tools across Southeast Asia and remote teams.
      </p>

      <!-- CTAs -->
      <div class="flex w-full max-w-xs flex-col items-stretch justify-center gap-3 mx-auto no-print fade-up fade-up-3 sm:max-w-none sm:flex-row sm:items-center">
        <a
          href="#projects"
          class="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors shadow-[0_2px_20px_rgba(255,255,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0903]"
        >
          View Work
          <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
        <button
          class="no-print glass-sm inline-flex items-center justify-center gap-2 px-6 py-2.5 text-white/85 text-sm font-medium rounded-full hover:text-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0903]"
          :disabled="isGenerating"
          @click="downloadPDF"
        >
          <svg v-if="!isGenerating" class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <svg v-else class="w-3.5 h-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {{ isGenerating ? 'Generating…' : resumeActionLabel }}
        </button>
        <button
          class="no-print glass-sm inline-flex items-center justify-center gap-2 px-6 py-2.5 text-white/85 text-sm font-medium rounded-full hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0903]"
          @click="scrollToContact"
        >
          <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0l-9.75 6-9.75-6" />
          </svg>
          Contact
        </button>
      </div>

      <!-- Stats row with count-up animation -->
      <div ref="statsRef" class="mt-14 fade-up fade-up-3">
        <div class="glass-sm grid w-full max-w-xl mx-auto grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden divide-x divide-y sm:divide-y-0 divide-white/10">
          <div v-for="(stat, i) in stats" :key="stat.label" class="px-4 py-4 text-center">
            <p class="text-xl font-bold text-white tracking-tight">{{ stat.display ?? (counts[i] + stat.suffix) }}</p>
            <p class="text-[11px] text-white/60 mt-0.5">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Currently building -->
      <div class="mt-8 fade-up fade-up-3">
        <p class="text-xs text-white/55 max-w-2xl mx-auto leading-relaxed">
          Currently building
          <a href="https://github.com/RamekhCHHOENG" target="_blank" rel="noopener" class="text-white/75 hover:text-white transition-colors underline underline-offset-2">
            new projects
          </a>
          · deepening expertise in microservices &amp; distributed systems.
        </p>
      </div>
    </div>

    <!-- Scroll cue -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 no-print">
      <a
        href="#about"
        class="flex flex-col items-center gap-1.5 text-white/28 hover:text-white/55 transition-colors"
        aria-label="Scroll to About"
      >
        <span class="text-[10px] uppercase tracking-widest">Scroll</span>
        <svg class="w-4 h-4 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const { downloadPDF, isGenerating, resumeActionLabel } = usePdfDownload()

const stats = [
  { num: 4, suffix: '+', label: 'Years of experience', display: '4.5+' },
  { num: 25, suffix: '+', label: 'Projects delivered', display: '25+' },
  { num: 15, suffix: '+', label: 'Technologies', display: '15+' },
  { num: 2, suffix: '', label: 'Open source repos', display: '2' },
]

const { counts, observe } = useCountUp(stats.map(s => s.num))
const statsRef = ref<HTMLElement | null>(null)
onMounted(() => { if (statsRef.value) observe(statsRef.value) })

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
