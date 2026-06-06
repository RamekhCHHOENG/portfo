<template>
  <section id="about" class="pt-32 pb-8 px-6 glass-divider">
    <div class="max-w-6xl mx-auto">

      <!-- Bento intro grid -->
      <div class="bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20 fade-up">

        <!-- Bio card -->
        <div class="glass-card rounded-2xl p-8 bento-bio sm:col-span-2 flex flex-col justify-between min-h-[220px]">
          <div>
            <p class="text-xs text-amber-400 uppercase tracking-widest font-medium mb-4">About</p>
            <h2 class="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-50 mb-4 leading-tight">
              Developer with a passion for<br class="hidden sm:block">
              crafting great products.
            </h2>
            <p class="text-white/55 text-sm leading-relaxed">
              Started tinkering with websites in 2019, fell down the rabbit hole of full-stack
              engineering, and never came back up. Shipped REST &amp; GraphQL APIs, Vue and Next.js
              frontends, React Native apps, and self-hosted infra for clients across Southeast Asia
              and Europe.
            </p>
          </div>
          <p class="text-white/30 text-xs leading-relaxed mt-5 pt-4 border-t border-white/5">
            Sweet spot: clean service layers, typed contracts, polished UI — code that's readable,
            deployable, and genuinely useful.
          </p>
        </div>

        <!-- Photo card — spans 2 rows on desktop -->
        <div class="glass-card rounded-2xl overflow-hidden bento-photo relative min-h-[260px] sm:col-span-1">
          <img
            src="/ramekhchhoeng.jpg"
            alt="Ramekh Chhoeng"
            class="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent p-5">
            <p class="text-sm font-bold text-white leading-tight">Ramekh Chhoeng</p>
            <p class="text-xs text-white/55">Frontend Engineer</p>
          </div>
        </div>

        <!-- Available card -->
        <div class="glass-card rounded-2xl p-6 bento-avail flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Available</span>
          </div>
          <p class="text-xl font-bold text-white leading-snug flex-1">Open to<br>new work.</p>
          <p class="text-xs text-white/40 leading-relaxed">
            Actively seeking product roles in Southeast Asia and remote-first companies.
          </p>
          <a
            href="#contact"
            class="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors group mt-2"
          >
            Get in touch
            <svg class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <!-- Location card -->
        <div class="glass-card rounded-2xl p-6 bento-loc flex flex-col">
          <div class="text-3xl mb-3">🌏</div>
          <p class="text-xl font-bold text-white">Phnom Penh</p>
          <p class="text-xs text-white/45 mt-0.5 mb-auto">Cambodia · UTC+7</p>
          <div class="flex flex-col gap-1.5 mt-4 pt-3 border-t border-white/5">
            <a
              href="https://ramekhchhoeng.com"
              target="_blank"
              rel="noopener"
              class="text-xs text-white/40 hover:text-white/70 transition-colors"
            >🌐 ramekhchhoeng.com</a>
            <a
              href="mailto:ramekhchhoeng@icloud.com"
              class="text-xs text-white/40 hover:text-white/70 transition-colors"
            >✉️ ramekhchhoeng@icloud.com</a>
          </div>
        </div>

      </div>

      <!-- Profile focus + Stats -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        <!-- Focus areas -->
        <div class="fade-up fade-up-1">
          <h3 class="text-xs font-medium text-white/35 uppercase tracking-widest mb-6">Current focus</h3>
          <div class="grid gap-3">
            <div
              v-for="item in focusAreas"
              :key="item.title"
              class="glass-card rounded-xl p-5"
            >
              <div class="flex items-start gap-4">
                <span class="text-xl leading-none mt-0.5">{{ item.emoji }}</span>
                <div>
                  <p class="text-sm font-semibold text-white/90 mb-1">{{ item.title }}</p>
                  <p class="text-xs text-white/45 leading-relaxed">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats / cards -->
        <div class="fade-up fade-up-2">
          <h3 class="text-xs font-medium text-white/35 uppercase tracking-widest mb-6">At a glance</h3>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="card in cards"
              :key="card.title"
              class="glass-card rounded-xl p-5"
            >
              <span class="text-xl mb-3 block">{{ card.emoji }}</span>
              <p class="text-sm font-semibold text-white/90 mb-1">{{ card.title }}</p>
              <p class="text-xs text-white/45 leading-relaxed">{{ card.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Values / principles row -->
      <div class="fade-up fade-up-3 glass-divider pt-16">
        <h3 class="text-xs font-medium text-white/35 uppercase tracking-widest mb-8">How I work</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div v-for="val in values" :key="val.title" class="group glass-card rounded-xl p-5">
            <p class="text-sm font-semibold text-white/90 mb-2 group-hover:text-amber-300 transition-colors">{{ val.title }}</p>
            <p class="text-xs text-white/45 leading-relaxed">{{ val.desc }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const focusAreas = [
  {
    emoji: '⚙️',
    title: 'Frontend architecture',
    desc: 'Designing Vue/Nuxt foundations, reusable UI systems, and maintainable project structure for production teams.',
  },
  {
    emoji: '🧩',
    title: 'Product implementation',
    desc: 'Turning business requirements into polished interfaces with typed contracts, API integration, and pragmatic delivery.',
  },
  {
    emoji: '🚀',
    title: 'Quality and performance',
    desc: 'Improving reliability through bug fixing, UI refinement, maintainable code paths, and performance-minded reviews.',
  },
]

const cards = [
  {
    emoji: '🎓',
    title: 'Education',
    desc: 'Master degree track plus Bachelor of Computer Science.',
  },
  {
    emoji: '💻',
    title: 'Current Role',
    desc: '4.5+ years as a Frontend Developer & Lead across enterprise and product teams.',
  },
  {
    emoji: '🛠️',
    title: 'Tech Stack',
    desc: 'Specializing in Vue.js, TypeScript, Swift, and modern web frameworks.',
  },
  {
    emoji: '🌏',
    title: 'Location',
    desc: 'Based in Phnom Penh, Cambodia. Open to collaborative success.',
  },
]

const values = [
  {
    title: 'Infrastructure First',
    desc: 'I believe in establishing strong core project foundations from the ground up to ensure long-term scalability.',
  },
  {
    title: 'High-Quality UI/UX',
    desc: 'Committed to delivering polished, high-quality user interfaces that meet both business and user needs.',
  },
  {
    title: 'Collaborative Growth',
    desc: 'I strive to foster collaborative success and contribute significantly to team growth through mentorship and best practices.',
  },
]
</script>

<style scoped>
@media (min-width: 1024px) {
  .bento-grid {
    grid-template-areas:
      "bio bio photo"
      "avail loc photo";
    grid-template-rows: minmax(240px, auto) minmax(160px, auto);
  }
  .bento-bio   { grid-area: bio; }
  .bento-photo { grid-area: photo; }
  .bento-avail { grid-area: avail; }
  .bento-loc   { grid-area: loc; }
}
</style>
