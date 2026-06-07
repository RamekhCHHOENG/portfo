<template>
  <section
    id="hero"
    class="relative min-h-screen overflow-hidden px-5 pt-28 pb-20 text-white sm:px-6 lg:flex lg:items-center"
  >
    <div class="absolute inset-0" aria-hidden="true">
      <img
        src="/ramekhchhoeng.jpg"
        alt=""
        class="absolute inset-y-0 right-0 h-full w-full object-cover object-top opacity-[0.14] sm:opacity-[0.18] lg:w-[58%] lg:opacity-[0.28]"
      />
      <div class="absolute inset-0 bg-[linear-gradient(90deg,#070806_0%,rgba(7,8,6,0.94)_34%,rgba(7,8,6,0.66)_70%,#070806_100%)]" />
      <div class="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#070806] to-transparent" />
    </div>

    <div class="relative z-10 mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
      <div class="max-w-4xl">
        <div class="fade-up mb-8 glass-sm inline-flex items-center gap-3 rounded-full px-3 py-1.5 text-xs text-white/72">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Available for frontend, Nuxt, and product engineering roles
        </div>

        <p class="fade-up fade-up-1 mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
          Frontend Engineer
        </p>
        <h1 class="fade-up fade-up-1 max-w-5xl text-[44px] font-bold leading-[0.95] tracking-[-0.04em] text-white sm:text-[76px] lg:text-[104px]">
          Ramekh CHHOENG
        </h1>
        <p class="fade-up fade-up-2 mt-7 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
          I build fast, reliable Vue and Nuxt products with clean component systems,
          practical API integration, and the polish teams need before launch.
        </p>

        <div class="fade-up fade-up-3 mt-9 flex w-full max-w-sm flex-col gap-3 no-print sm:max-w-none sm:flex-row">
          <a
            href="#projects"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_14px_40px_rgba(255,255,255,0.12)] transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070806]"
          >
            View projects
            <svg class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <button
            class="no-print glass-sm inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white/82 transition-colors hover:text-white disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070806]"
            :disabled="isGenerating"
            @click="downloadPDF"
          >
            <svg v-if="!isGenerating" class="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <svg v-else class="h-3.5 w-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ isGenerating ? 'Preparing...' : resumeActionLabel }}
          </button>
          <button
            class="no-print inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-white/62 transition-colors hover:text-white sm:px-2"
            @click="scrollToContact"
          >
            Contact
          </button>
        </div>
      </div>

      <aside class="fade-up fade-up-3 glass-card rounded-2xl p-5">
        <p class="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/38">Proof points</p>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="stat in stats" :key="stat.label" class="glass-sm rounded-xl p-4">
            <p class="text-2xl font-bold tracking-tight text-white">{{ stat.value }}</p>
            <p class="mt-1 text-[11px] leading-4 text-white/52">{{ stat.label }}</p>
          </div>
        </div>
        <p class="mt-5 border-t border-white/8 pt-4 text-xs leading-5 text-white/52">
          Based in Phnom Penh, working with teams across Southeast Asia and remote-first companies.
        </p>
      </aside>
    </div>

    <a
      href="#projects"
      class="no-print absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/34 transition-colors hover:text-white/62 sm:flex"
      aria-label="Scroll to projects"
    >
      Projects
      <span class="h-px w-10 bg-white/22" />
    </a>
  </section>
</template>

<script setup lang="ts">
const { downloadPDF, isGenerating, resumeActionLabel } = usePdfDownload()

const stats = [
  { value: '4.5+', label: 'Years shipping production UI' },
  { value: '25+', label: 'Projects and internal tools' },
  { value: '15+', label: 'Technologies used in delivery' },
  { value: '2', label: 'Open source repositories' },
]

function scrollToContact() {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
