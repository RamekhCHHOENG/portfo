<template>
  <section
    id="hero"
    class="relative min-h-screen flex flex-col items-center justify-center text-white pt-14 px-6 text-center overflow-hidden"
  >
    <!-- Subtle dot grid -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.018]"
      style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 36px 36px;"
    />

    <div class="relative z-10 max-w-4xl mx-auto">
      <!-- Profile + badge row -->
      <div class="flex flex-col items-center gap-4 mb-10 fade-up">
        <img
          src="/ramekhchhoeng.jpg"
          alt="Ramekhchhoeng"
          class="w-16 h-16 rounded-full object-cover shadow-[0_0_0_2px_rgba(255,255,255,0.18),0_0_0_5px_rgba(255,255,255,0.06)] shadow-lg"
        />
        <div class="glass-sm inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-white/60">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          Available for new opportunities
        </div>
      </div>

      <!-- Main headline -->
      <h1
        class="text-[48px] sm:text-[68px] lg:text-[84px] font-bold tracking-[-0.04em] leading-[1] mb-6 fade-up fade-up-1"
      >
        Turning Ideas into<br>
        <span class="bg-gradient-to-br from-white via-violet-200 to-blue-300 bg-clip-text text-transparent">
          Reality.
        </span>
      </h1>

      <!-- Subtitle -->
      <p class="text-base sm:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed mb-10 fade-up fade-up-2">
        I'm <span class="text-white/90 font-medium">Ramekhchhoeng</span> — a full-stack developer based in Cambodia with 4+ years of
        experience building production web apps, REST APIs, and mobile apps that ship to real users.
      </p>

      <!-- CTAs -->
      <div class="flex flex-wrap items-center justify-center gap-3 no-print fade-up fade-up-3">
        <a
          href="#projects"
          class="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors shadow-[0_2px_20px_rgba(255,255,255,0.18)]"
        >
          View Projects
          <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
        <button
          class="no-print glass-sm inline-flex items-center gap-2 px-6 py-2.5 text-white/80 text-sm font-medium rounded-full hover:text-white disabled:opacity-50"
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
          {{ isGenerating ? 'Generating…' : 'Download Resume' }}
        </button>
      </div>

      <!-- Stats row (liquid glass pill) -->
      <div class="mt-14 fade-up fade-up-3">
        <div class="glass-sm inline-flex flex-wrap items-center justify-center gap-0 rounded-2xl overflow-hidden divide-x divide-white/10">
          <div v-for="stat in stats" :key="stat.label" class="px-6 py-4 text-center">
            <p class="text-xl font-bold text-white tracking-tight">{{ stat.value }}</p>
            <p class="text-[11px] text-white/45 mt-0.5 whitespace-nowrap">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Currently building -->
      <div class="mt-8 fade-up fade-up-3">
        <p class="text-xs text-white/32">
          Currently building
          <a href="https://github.com/RamekhCHHOENG" target="_blank" rel="noopener" class="text-white/55 hover:text-white/80 transition-colors underline underline-offset-2">
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
const { downloadPDF, isGenerating } = usePdfDownload()

const stats = [
  { value: '4+', label: 'Years of experience' },
  { value: '25+', label: 'Projects delivered' },
  { value: '15+', label: 'Technologies' },
  { value: '2', label: 'Open source repos' },
]
</script>
