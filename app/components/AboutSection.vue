<template>
  <section id="about" class="py-32 px-6 glass-divider">
    <div class="max-w-6xl mx-auto">

      <!-- Top: photo + intro -->
      <div class="flex flex-col md:flex-row gap-12 md:gap-20 mb-20 fade-up">
        <div class="flex-shrink-0">
          <img
            src="/ramekhchhoeng.jpg"
            alt="Ramekhchhoeng"
            class="w-32 h-32 rounded-2xl object-cover border border-zinc-800 shadow-xl"
          />
        </div>
        <div class="max-w-2xl">
          <p class="text-xs text-violet-400 uppercase tracking-widest font-medium mb-3">About</p>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-5">
            Developer with a passion for crafting great products.
          </h2>
          <p class="text-white/55 leading-relaxed mb-4">
            I started tinkering with websites in 2019, quickly fell down the rabbit hole of
            full-stack engineering, and never came back up. Since then I've shipped REST and
            GraphQL APIs, Vue and Next.js frontends, React Native apps, and self-hosted infra
            for clients across Southeast Asia and Europe.
          </p>
          <p class="text-white/55 leading-relaxed mb-6">
            My sweet spot is the backend — clean service layers, typed contracts, well-designed
            databases — but I'm just as comfortable building the UI that sits in front of it.
            I care deeply about code that is readable, deployable, and genuinely useful to
            the people using it.
          </p>
          <!-- Quick facts row -->
          <div class="flex flex-wrap gap-3 text-xs text-white/40">
            <span class="glass-sm inline-flex items-center gap-1.5 rounded-full px-3 py-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Available for new work
            </span>
            <span class="glass-sm inline-flex items-center gap-1.5 rounded-full px-3 py-1">📍 Cambodia</span>
            <span class="glass-sm inline-flex items-center gap-1.5 rounded-full px-3 py-1">🌐 ramekhchhoeng.online</span>
            <span class="glass-sm inline-flex items-center gap-1.5 rounded-full px-3 py-1">✉️ ramekhchhoeng@icloud.com</span>
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
    title: 'Full-Stack Developer',
    company: 'Self-employed',
    date: '2021 – Present',
    points: [
      'Built and shipped production-grade web apps and REST/GraphQL APIs for clients across Southeast Asia and Europe.',
      'Architected microservices with Docker, RabbitMQ, and PostgreSQL — deployed and managed via Coolify on self-hosted infra.',
      'Developed cross-platform mobile apps with React Native & Expo, publishing to both App Store and Google Play.',
      'Mentored junior developers and led code reviews to maintain quality and consistency across projects.',
    ],
    tags: ['TypeScript', 'Nuxt', 'React Native', 'Docker', 'PostgreSQL'],
  },
  {
    title: 'Web Developer',
    company: 'Freelance',
    date: '2019 – 2021',
    points: [
      'Delivered responsive marketing sites and landing pages for local businesses in Cambodia.',
      'Grew from static HTML/CSS to full-stack Vue + Node.js applications over two years.',
      'Integrated third-party APIs (payments, maps, CMS) into client projects.',
    ],
    tags: ['Vue', 'JavaScript', 'Tailwind CSS', 'Node.js'],
  },
]

const cards = [
  {
    emoji: '📍',
    title: 'Location',
    desc: 'Based in Cambodia. Self-hosted infra via Coolify.',
  },
  {
    emoji: '🚀',
    title: '25+ Projects',
    desc: 'Web, mobile, microservices, and AI agents.',
  },
  {
    emoji: '🛠️',
    title: 'Full-Stack',
    desc: 'TypeScript, Python, React, Vue, Node, and more.',
  },
  {
    emoji: '📱',
    title: 'Mobile',
    desc: 'React Native & Expo cross-platform apps.',
  },
]

const values = [
  {
    title: 'Quality over speed',
    desc: 'Thoughtful architecture and clean code always win over rushing to ship. I take the time to do things right.',
  },
  {
    title: 'User-first thinking',
    desc: 'Every technical decision is weighed against its impact on the end user. Performance and accessibility are non-negotiable.',
  },
  {
    title: 'Continuous learning',
    desc: 'The web moves fast. I stay current through open-source contributions, personal projects, and community involvement.',
  },
]
</script>
