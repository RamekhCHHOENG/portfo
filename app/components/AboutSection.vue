<template>
  <section id="about" class="pt-32 pb-8 px-6 glass-divider">
    <div class="max-w-6xl mx-auto">

      <!-- Bento intro grid -->
      <div class="bento-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20 fade-up">

        <!-- Bio card -->
        <div class="glass-card rounded-2xl p-8 bento-bio sm:col-span-2 flex flex-col justify-between min-h-[220px]">
          <div>
            <p class="text-xs text-violet-400 uppercase tracking-widest font-medium mb-4">About</p>
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
            <p class="text-xs text-white/55">Frontend Engineer Lead</p>
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
            class="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors group mt-2"
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
              href="https://ramekhchhoeng.online"
              target="_blank"
              rel="noopener"
              class="text-xs text-white/40 hover:text-white/70 transition-colors"
            >🌐 ramekhchhoeng.online</a>
            <a
              href="mailto:ramekhchhoeng@icloud.com"
              class="text-xs text-white/40 hover:text-white/70 transition-colors"
            >✉️ ramekhchhoeng@icloud.com</a>
          </div>
        </div>

      </div>

      <!-- Experience timeline + Stats -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        <!-- Experience -->
        <div class="fade-up fade-up-1">
          <h3 class="text-xs font-medium text-white/35 uppercase tracking-widest mb-6">Experience</h3>
          <div class="space-y-0">
            <div
              v-for="(exp, i) in experience"
              :key="exp.title"
              class="flex gap-4"
            >
              <div class="flex flex-col items-center">
                <div class="w-2 h-2 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                <div v-if="i < experience.length - 1" class="w-px flex-1 bg-white/10 mt-2" />
              </div>
              <div class="pb-8">
                <div class="flex items-baseline gap-2 mb-1">
                  <span class="text-sm font-semibold text-white/90">{{ exp.title }}</span>
                  <span class="text-white/30 text-xs">·</span>
                  <span class="text-xs text-white/45">{{ exp.company }}</span>
                </div>
                <span class="text-xs text-white/28 block mb-3">{{ exp.date }}</span>
                <ul class="space-y-1.5 mb-3">
                  <li
                    v-for="point in exp.points"
                    :key="point"
                    class="flex gap-2 text-xs text-white/50 leading-relaxed"
                  >
                    <span class="text-violet-400 flex-shrink-0 mt-0.5">▪</span>
                    <span>{{ point }}</span>
                  </li>
                </ul>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in exp.tags"
                    :key="tag"
                    class="text-[10px] px-2 py-0.5 rounded-full glass-sm text-white/50"
                  >{{ tag }}</span>
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
            <p class="text-sm font-semibold text-white/90 mb-2 group-hover:text-violet-300 transition-colors">{{ val.title }}</p>
            <p class="text-xs text-white/45 leading-relaxed">{{ val.desc }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const experience = [
  {
    title: 'Software Developer (Frontend Lead)',
    company: 'IDEALINK CONSULTING LTD',
    date: 'Dec 2022 – Present',
    points: [
      'Established the core project infrastructure from the ground up for major enterprise initiatives.',
      'Successfully built and launched a suite of web applications using Vue.js and modern frontend tooling.',
      'Contributed to the design of web application user interfaces, ensuring high usability and aesthetic appeal.',
      'Led bug fixing and maintenance tasks, optimizing web functionality and performance across production apps.',
    ],
    tags: ['Vue.js', 'TypeScript', 'Project Lead', 'Infrastructure'],
  },
  {
    title: 'Software Developer',
    company: 'Soramitsu Khmer Co., Ltd',
    date: 'Jan 2020 – Dec 2022',
    points: [
      'Contributed to and completed 3 major projects utilizing Vue.js for enterprise and government solutions.',
      'Collaborated with cross-functional teams to implement front-end features based on complex business requirements.',
      'Developed and maintained custom component libraries to ensure consistency across multiple project surfaces.',
      'Addressed and resolved complex architectural bugs to ensure smooth system functionality.',
    ],
    tags: ['Vue.js', 'Enterprise Solutions', 'Component Library', 'Collaboration'],
  },
  {
    title: 'iOS Developer (Internship)',
    company: 'Self-Directed / Startup Project',
    date: 'Sep 2019 – Jan 2020',
    points: [
      'Played a key role in developing a product using Swift (Programmatically) based on specific business needs.',
      'Participated in end-to-end product development, from initial feature implementation to bug fixing and maintenance.',
      'Ensured continuous functionality and quality through rigorous testing and iterative updates.',
    ],
    tags: ['Swift', 'iOS Development', 'Programmatic UI'],
  },
]

const cards = [
  {
    emoji: '🎓',
    title: 'Education',
    desc: 'Bachelor of Computer Science from University of Puthisastra (UP).',
  },
  {
    emoji: '💻',
    title: 'Experience',
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
