<template>
  <section id="projects" class="py-32 px-6 glass-divider">
    <div class="max-w-6xl mx-auto">
      <div class="mb-10 fade-up">
        <p class="text-xs text-amber-400 uppercase tracking-widest font-medium mb-3">Work</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Things I've built.
        </h2>
        <p class="text-white/50 max-w-xl leading-relaxed mb-8">
          A selection of personal and learning projects — backend services, full-stack apps, and experiments.
        </p>

        <!-- Filter Tags -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            :class="[
              'px-4 py-1.5 rounded-full text-xs font-medium transition-colors border',
              activeFilter === filter 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white'
            ]"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Featured showcase — visible when no filter is active -->
      <div v-if="activeFilter === 'All'" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 fade-up fade-up-1">
        <div
          v-for="project in projects.filter(p => p.featured)"
          :key="'feat-' + project.title"
          class="group flex flex-col glass-card rounded-2xl overflow-hidden"
        >
          <div class="relative h-52 flex items-center justify-center overflow-hidden" :style="{ background: project.gradient }">
            <div class="absolute inset-0 opacity-15" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 20px 20px;" />
            <span class="absolute bottom-4 right-5 text-8xl font-black select-none leading-none pointer-events-none" style="color: rgba(255,255,255,0.07)">
              {{ String(projects.indexOf(project) + 1).padStart(2, '0') }}
            </span>
            <div class="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 text-white text-2xl font-bold tracking-tight select-none">
              {{ project.initials }}
            </div>
            <div class="absolute top-3 left-3 z-10">
              <span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-white rounded-full">Featured</span>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <div class="mb-3">
              <h3 class="text-base font-bold text-white/90">{{ project.title }}</h3>
              <p class="text-xs text-white/35 mt-0.5">{{ project.release }}</p>
            </div>
            <p class="text-sm text-white/50 leading-relaxed flex-1 mb-4">{{ project.desc }}</p>
            <div class="flex flex-wrap gap-1.5 mb-5">
              <span v-for="tech in project.tech" :key="tech" class="px-2 py-0.5 text-[11px] font-medium text-white/45 glass-sm rounded-full">{{ tech }}</span>
            </div>
            <div class="flex gap-2 mt-auto">
              <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/55 glass-sm rounded-lg hover:text-white">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                Code
              </a>
              <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/55 glass-sm rounded-lg hover:text-white">
                <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg>
                Live
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Rest of projects -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(project, i) in gridProjects"
          :key="project.title"
          :class="[
            'group flex flex-col glass-card rounded-2xl overflow-hidden tilt-card',
            `fade-up fade-up-${(i % 3) + 1}`,
          ]"
          @mousemove="e => onTiltMove(e, e.currentTarget as HTMLElement)"
          @mouseleave="e => onTiltLeave(e.currentTarget as HTMLElement)"
        >
          <!-- Gradient header -->
          <div class="relative h-36 flex items-center justify-center overflow-hidden" :style="{ background: project.gradient }">
            <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 20px 20px;" />
            <span class="absolute bottom-3 right-4 text-5xl font-black select-none leading-none pointer-events-none" style="color: rgba(255,255,255,0.1)">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <div class="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 text-white text-xl font-bold tracking-tight select-none">
              {{ project.initials }}
            </div>
            <div v-if="project.featured" class="absolute top-3 left-3 z-10">
              <span class="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-amber-500/90 text-white rounded-full">Featured</span>
            </div>
          </div>

          <!-- Card content -->
          <div class="p-6 flex flex-col flex-1">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="text-sm font-semibold text-white/90">{{ project.title }}</h3>
                <p class="text-xs text-white/40 mt-0.5">{{ project.release }}</p>
              </div>
            </div>
            <p class="text-sm text-white/45 leading-relaxed flex-1 mb-4">{{ project.desc }}</p>
            <div class="flex flex-wrap gap-1.5 mb-5">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="px-2 py-0.5 text-[11px] font-medium text-white/45 glass-sm rounded-full"
              >
                {{ tech }}
              </span>
            </div>
            <!-- Action buttons -->
            <div class="flex gap-2 mt-auto">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/55 glass-sm rounded-lg hover:text-white"
              >
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Code
              </a>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/55 glass-sm rounded-lg hover:text-white"
              >
                <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                Live
              </a>
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeFilter = ref('All')
const filters = ['All', 'Next.js', 'Vue.js', 'Kotlin', 'Python', 'Mobile']

const gridProjects = computed(() => {
  if (activeFilter.value === 'All') return projects.filter(p => !p.featured)
  return projects.filter(p => p.tech.some(t => t.includes(activeFilter.value)))
})

const canTilt = import.meta.client
  ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
  : false

function onTiltMove(e: MouseEvent, el: HTMLElement) {
  if (!canTilt) return
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const rotX = ((y - rect.height / 2) / rect.height) * -10
  const rotY = ((x - rect.width / 2) / rect.width) * 10
  el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`
  el.style.transition = 'transform 0.1s ease-out'
}

function onTiltLeave(el: HTMLElement) {
  el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
}

const projects = [
  {
    title: 'Enterprise Management System',
    initials: 'EM',
    desc: 'Led the development of a complex management platform using Vue.js and Vuetify. Featured advanced data visualization, professional training modules, and business technology integration.',
    gradient: 'linear-gradient(135deg, #2f2611 0%, #7a5b13 50%, #d6a72d 100%)',
    github: null,
    demo: null,
    release: '2023',
    featured: true,
    tech: ['Vue.js', 'Vuetify', 'TypeScript', 'Lead'],
  },
  {
    title: 'EV Station KH',
    initials: 'EV',
    desc: 'Cambodia EV charging station locator with interactive maps, real-time station status, and mobile companion app. Built with Next.js, NestJS and PostGIS.',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #10b981 100%)',
    github: null,
    demo: null,
    release: '2024',
    featured: true,
    tech: ['Next.js', 'NestJS', 'React Native', 'Mobile', 'PostGIS'],
  },
  {
    title: 'Mini Bank API',
    initials: 'MB',
    desc: 'Banking REST API built with Kotlin and Spring Boot. Includes JWT authentication, account management, and transaction endpoints.',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    github: 'https://github.com/RamekhCHHOENG/kotlin-spring-mini-bank',
    demo: null,
    release: '2024',
    featured: false,
    tech: ['Kotlin', 'Spring Boot', 'PostgreSQL'],
  },
  {
    title: 'AGI Assistant Monorepo',
    initials: 'AI',
    desc: 'A 25+ project monorepo spanning web, mobile, microservices, AI agents, and self-hosted infra. Deployed on Coolify with shared Docker services.',
    gradient: 'linear-gradient(135deg, #172033 0%, #5f4b16 50%, #d6a72d 100%)',
    github: null,
    demo: null,
    release: '2025',
    featured: false,
    tech: ['Python', 'TypeScript', 'Docker', 'Next.js'],
  },
  {
    title: 'Portfolio 2026',
    initials: 'RC',
    desc: 'A premium developer portfolio built with Nuxt 4, TailwindCSS, and high-end animations. Optimized for performance, PWA delivery, and a reliable resume flow.',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)',
    github: 'https://github.com/RamekhCHHOENG/portfolio',
    demo: 'https://ramekhchhoeng.github.io',
    release: '2026',
    featured: false,
    tech: ['Next.js', 'TypeScript', 'Nuxt', 'Animations'],
  },
  {
    title: 'More on GitHub',
    initials: '→',
    desc: 'Explore more experiments, forks, and works-in-progress — from AI tools to self-hosted infrastructure setups.',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #1a1a1a 100%)',
    github: 'https://github.com/RamekhCHHOENG',
    demo: null,
    release: 'Always',
    featured: false,
    tech: ['Open Source', 'Various'],
  },
]
</script>
