<template>
  <section id="projects" class="px-6 py-28 glass-divider sm:py-32">
    <div class="mx-auto max-w-6xl">
      <div class="mb-12 fade-up">
        <div class="max-w-3xl">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Projects</p>
          <h2 class="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Things I've built.
          </h2>
          <p class="mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">
            A selection of personal, learning, and production-adjacent projects:
            backend services, full-stack apps, mobile flows, and infrastructure experiments.
          </p>
        </div>

        <div
          class="no-print mt-8 flex w-full flex-nowrap gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:justify-end [&::-webkit-scrollbar]:hidden"
          aria-label="Project filters"
        >
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            :aria-pressed="activeFilter === filter"
            :class="[
              'shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors',
              activeFilter === filter
                ? 'border-white bg-white text-black'
                : 'glass-sm text-white/58 hover:text-white',
            ]"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <div v-if="leadProject" class="space-y-4">
        <article class="glass-card overflow-hidden rounded-lg fade-up fade-up-1 lg:grid lg:grid-cols-[1.15fr_0.85fr]">
          <a
            :href="leadProject.demo || leadProject.github || '#projects'"
            :target="leadProject.demo || leadProject.github ? '_blank' : undefined"
            :rel="leadProject.demo || leadProject.github ? 'noopener' : undefined"
            class="group relative block min-h-[280px] overflow-hidden sm:min-h-[420px] lg:min-h-full"
            :style="{ background: leadProject.gradient }"
            :aria-label="leadProject.demo || leadProject.github ? `Open ${leadProject.title}` : undefined"
          >
            <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 22px 22px;" />
            <span class="absolute bottom-6 right-7 text-9xl font-black leading-none text-white/[0.07]">
              {{ projectNumber(leadProject) }}
            </span>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="glass-sm flex h-24 w-24 items-center justify-center rounded-2xl text-4xl font-black tracking-tight text-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                {{ leadProject.initials }}
              </div>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-black/10" />
            <span class="absolute left-5 top-5 rounded-full border border-white/16 bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/78 backdrop-blur-md">
              Featured
            </span>
          </a>

          <div class="flex flex-col p-6 sm:p-8 lg:p-10">
            <div class="mb-6 flex items-center justify-between gap-4">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">{{ leadProject.release }}</p>
              <p class="text-xs text-white/38">{{ leadProject.type }}</p>
            </div>
            <h3 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">{{ leadProject.title }}</h3>
            <p class="mt-4 text-sm leading-7 text-white/62">{{ leadProject.desc }}</p>

            <div class="mt-7 grid grid-cols-2 gap-3">
              <div v-for="proof in leadProject.proof" :key="proof.label" class="glass-sm rounded-lg p-4">
                <p class="text-lg font-bold text-white">{{ proof.value }}</p>
                <p class="mt-1 text-[11px] leading-4 text-white/48">{{ proof.label }}</p>
              </div>
            </div>

            <div class="mt-7 flex flex-wrap gap-2">
              <span
                v-for="tech in leadProject.tech"
                :key="tech"
                class="glass-sm rounded-full px-2.5 py-1 text-[11px] font-medium text-white/58"
              >
                {{ tech }}
              </span>
            </div>

            <div class="mt-8 flex flex-wrap gap-3 no-print">
              <a
                v-if="leadProject.demo"
                :href="leadProject.demo"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-amber-100"
              >
                View live
              </a>
              <a
                v-if="leadProject.github"
                :href="leadProject.github"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center rounded-full border border-white/14 px-4 py-2 text-xs font-semibold text-white/72 transition-colors hover:border-white/28 hover:text-white"
              >
                Source code
              </a>
              <span
                v-if="!leadProject.demo && !leadProject.github"
                class="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/45"
              >
                Private project
              </span>
            </div>
          </div>
        </article>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(project, i) in supportingProjects"
            :key="project.title"
            :class="['glass-card group flex flex-col overflow-hidden rounded-lg', `fade-up fade-up-${(i % 3) + 1}`]"
          >
            <div class="relative aspect-[16/10] overflow-hidden" :style="{ background: project.gradient }">
              <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 20px 20px;" />
              <span class="absolute bottom-3 right-4 text-5xl font-black leading-none text-white/10">
                {{ projectNumber(project) }}
              </span>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="glass-sm flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold tracking-tight text-white transition-transform duration-500 group-hover:scale-105">
                  {{ project.initials }}
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
              <p class="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/66">
                {{ project.type }}
              </p>
            </div>

            <div class="flex flex-1 flex-col p-5">
              <div class="mb-3 flex items-start justify-between gap-3">
                <h3 class="text-base font-bold leading-snug text-white/92">{{ project.title }}</h3>
                <span class="shrink-0 text-xs text-white/34">{{ project.release }}</span>
              </div>
              <p class="text-sm leading-6 text-white/55">{{ project.desc }}</p>

              <div class="mt-5 flex flex-wrap gap-1.5">
                <span
                  v-for="tech in project.tech.slice(0, 4)"
                  :key="tech"
                  class="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium text-white/48"
                >
                  {{ tech }}
                </span>
              </div>

              <div class="mt-6 flex gap-2 no-print">
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-amber-100"
                >
                  Live
                </a>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center rounded-full border border-white/12 px-3 py-1.5 text-xs font-semibold text-white/62 transition-colors hover:text-white"
                >
                  Code
                </a>
                <span v-if="!project.demo && !project.github" class="text-xs text-white/34">Private work</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div v-else class="glass-card rounded-lg p-8 text-center text-sm text-white/52">
        No projects match this filter yet.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type Project = {
  title: string
  type: string
  desc: string
  initials: string
  gradient: string
  release: string
  tech: string[]
  filters: string[]
  proof: { value: string; label: string }[]
  github?: string
  demo?: string
}

const activeFilter = ref('All')
const filters = ['All', 'Vue.js', 'Nuxt', 'Next.js', 'Kotlin', 'Python', 'Mobile', 'Infrastructure']

const visibleProjects = computed(() => {
  if (activeFilter.value === 'All') return projects
  return projects.filter(project => project.filters.includes(activeFilter.value))
})

const leadProject = computed(() => visibleProjects.value[0])
const supportingProjects = computed(() => visibleProjects.value.slice(1))

function projectNumber(project: Project) {
  return String(projects.indexOf(project) + 1).padStart(2, '0')
}

const projects: Project[] = [
  {
    title: 'Enterprise Management System',
    type: 'Production UI',
    desc: 'Led the development of a complex management platform using Vue.js and Vuetify, with reusable components, workflow screens, and business technology integration.',
    initials: 'EM',
    gradient: 'linear-gradient(135deg, #2f2611 0%, #7a5b13 50%, #d6a72d 100%)',
    release: '2023',
    tech: ['Vue.js', 'Vuetify', 'TypeScript', 'Lead UI'],
    filters: ['Vue.js'],
    proof: [
      { value: 'Lead UI', label: 'Frontend structure and delivery' },
      { value: 'Vue.js', label: 'Reusable production components' },
    ],
  },
  {
    title: 'EV Station KH',
    type: 'Map and mobile concept',
    desc: 'Cambodia EV charging station locator with interactive maps, station status, route planning, and a mobile companion app concept.',
    initials: 'EV',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #10b981 100%)',
    release: '2024',
    tech: ['Next.js', 'NestJS', 'React Native', 'PostGIS'],
    filters: ['Next.js', 'Mobile'],
    proof: [
      { value: 'Map-first', label: 'Station search and route flow' },
      { value: 'Mobile', label: 'Companion app experience' },
    ],
  },
  {
    title: 'Mini Bank API',
    type: 'Backend API',
    desc: 'Banking REST API built with Kotlin and Spring Boot, including JWT authentication, account management, and transaction endpoints.',
    initials: 'MB',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    release: '2024',
    tech: ['Kotlin', 'Spring Boot', 'PostgreSQL', 'JWT'],
    filters: ['Kotlin'],
    proof: [
      { value: 'REST API', label: 'Account and transaction flows' },
      { value: 'Auth', label: 'JWT-protected endpoints' },
    ],
    github: 'https://github.com/RamekhCHHOENG/kotlin-spring-mini-bank',
  },
  {
    title: 'AGI Assistant Monorepo',
    type: 'Monorepo and infrastructure',
    desc: 'A multi-project workspace spanning web, mobile, microservices, AI agents, and self-hosted infrastructure with shared Docker services.',
    initials: 'AI',
    gradient: 'linear-gradient(135deg, #172033 0%, #5f4b16 50%, #d6a72d 100%)',
    release: '2025',
    tech: ['Python', 'TypeScript', 'Docker', 'Next.js'],
    filters: ['Python', 'Next.js', 'Infrastructure'],
    proof: [
      { value: '25+', label: 'Projects in one workspace' },
      { value: 'Infra', label: 'Self-hosted service setup' },
    ],
  },
  {
    title: 'Portfolio 2026',
    type: 'Nuxt portfolio',
    desc: 'A developer portfolio built with Nuxt 4, Tailwind CSS, liquid-glass surfaces, PWA delivery, and a reliable resume flow.',
    initials: 'RC',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)',
    release: '2026',
    tech: ['Nuxt', 'TypeScript', 'Tailwind CSS', 'PWA'],
    filters: ['Nuxt', 'Vue.js'],
    proof: [
      { value: 'Nuxt', label: 'Production app structure' },
      { value: 'PWA', label: 'Installable delivery path' },
    ],
    github: 'https://github.com/RamekhCHHOENG/portfolio',
    demo: 'https://ramekhchhoeng.github.io',
  },
  {
    title: 'More on GitHub',
    type: 'Open source and experiments',
    desc: 'More experiments, forks, and works in progress, from AI tools to self-hosted infrastructure setups.',
    initials: 'GH',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)',
    release: 'Always',
    tech: ['Open Source', 'AI tools', 'Infrastructure'],
    filters: ['Python', 'Infrastructure'],
    proof: [
      { value: 'GitHub', label: 'Public experiments and repos' },
      { value: 'Various', label: 'Learning and exploration' },
    ],
    github: 'https://github.com/RamekhCHHOENG',
  },
]
</script>
