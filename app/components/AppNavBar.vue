<template>
  <nav
    class="no-print fixed top-0 inset-x-0 z-50 h-14 glass-nav"
    @keydown.esc.window="menuOpen = false"
  >
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between h-full">
      <!-- Logo -->
      <a href="#hero" class="text-sm font-bold text-zinc-50 tracking-tight hover:text-white transition-colors select-none">
        RC.
      </a>

      <!-- Desktop nav links -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            :class="[
              'relative text-sm transition-colors pb-0.5',
              activeSection === link.href.slice(1)
                ? 'text-zinc-50'
                : 'text-zinc-400 hover:text-zinc-200',
            ]"
          >
            {{ link.label }}
            <span
              v-if="activeSection === link.href.slice(1)"
              class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400"
            />
          </a>
        </li>
      </ul>

      <!-- Right side -->
      <div class="flex items-center gap-3">
        <!-- ⌘K hint -->
        <button
          class="no-print hidden lg:flex items-center gap-1 text-[11px] text-white/50 hover:text-white/80 transition-colors px-2 py-1 rounded-md border border-white/20 hover:border-white/35 font-mono"
          @click="togglePalette"
          aria-label="Open command palette"
        >
          <span>⌘</span><span>K</span>
        </button>
        <button
          data-magnetic
          class="no-print hidden md:inline-flex items-center gap-1.5 text-sm px-4 py-1.5 bg-white/92 text-black rounded-full font-semibold hover:bg-white disabled:opacity-50 transition-colors shadow-sm"
          :disabled="isGenerating"
          @click="downloadPDF"
        >
          {{ isGenerating ? 'Generating…' : resumeActionLabel }}
        </button>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden no-print p-1.5 text-zinc-400 hover:text-zinc-50 transition-colors"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <svg v-if="!menuOpen" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="no-print md:hidden fixed inset-x-0 top-14 bottom-0"
      >
        <button
          type="button"
          class="absolute inset-0 bg-black/35"
          aria-label="Close menu"
          @click="menuOpen = false"
        />
        <div class="absolute inset-x-0 top-0 glass-nav px-6 pb-6">
          <ul class="flex flex-col gap-1 pt-4">
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                class="block py-2.5 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
                @click="menuOpen = false"
              >
                {{ link.label }}
              </a>
            </li>
            <li class="pt-3">
              <button
                class="no-print w-full inline-flex items-center justify-center gap-1.5 text-sm px-4 py-2 bg-white text-black rounded-full font-semibold hover:bg-white/90 disabled:opacity-50 transition-colors"
                :disabled="isGenerating"
                @click="downloadPDF(); menuOpen = false"
              >
                {{ isGenerating ? 'Generating...' : resumeActionLabel }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const { downloadPDF, isGenerating, resumeActionLabel } = usePdfDownload()

const navLinks = [
  { href: '#about',      label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills',     label: 'Skills' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
]

const { toggle: togglePalette } = useCommandPalette()

const menuOpen = ref(false)
const activeSection = ref('')

onMounted(() => {
  setupIntersectionObserver()
})

function setupIntersectionObserver() {
  const sections = document.querySelectorAll('section[id]')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )
  sections.forEach((s) => observer.observe(s))
}
</script>
