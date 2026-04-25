<template>
  <section id="projects" class="py-32 px-6 glass-divider">
    <div class="max-w-6xl mx-auto">
      <div class="mb-16 fade-up">
        <p class="text-xs text-violet-400 uppercase tracking-widest font-medium mb-3">Work</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Things I've built.
        </h2>
        <p class="text-white/50 max-w-xl leading-relaxed">
          A selection of personal and learning projects — backend services, full-stack apps, and experiments.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(project, i) in projects"
          :key="project.title"
          :class="[
            'group flex flex-col glass-card rounded-2xl overflow-hidden',
            `fade-up fade-up-${(i % 3) + 1}`,
          ]"
        >
          <!-- Gradient header -->
          <div class="relative h-36 flex items-center justify-center overflow-hidden" :style="{ background: project.gradient }">
            <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle, #fff 1px, transparent 1px); background-size: 20px 20px;" />
            <div class="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 text-white text-xl font-bold tracking-tight select-none">
              {{ project.initials }}
            </div>
            <div v-if="project.featured" class="absolute top-3 left-3 z-10">
              <span class="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-indigo-600/90 text-white rounded-full">Featured</span>
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
const projects = [
  {
    title: 'Mini Bank API',
    initials: 'MB',
    desc: 'Banking REST API built with Kotlin and Spring Boot. Includes JWT authentication, account management, and transaction endpoints — containerized with Docker and backed by PostgreSQL.',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    github: 'https://github.com/RamekhCHHOENG/kotlin-spring-mini-bank',
    demo: null,
    release: '2024',
    featured: true,
    tech: ['Kotlin', 'Spring Boot', 'JWT', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Todo App',
    initials: 'TA',
    desc: 'Full-stack task manager with a Next.js 13 frontend and TypeScript REST API backend. Features CRUD, real-time updates, deployed on Vercel.',
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 50%, #2d1b69 100%)',
    github: 'https://github.com/RamekhCHHOENG/todo-nextjs-typescript',
    demo: 'https://todo-nextjs-typescript.vercel.app/',
    release: '2023',
    featured: true,
    tech: ['Next.js', 'TypeScript', 'REST API', 'Vercel'],
  },
  {
    title: 'Todo API',
    initials: 'T/',
    desc: 'Standalone TypeScript REST API backend. Clean architecture with typed request/response handling and full CRUD support.',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0a3d62 100%)',
    github: 'https://github.com/RamekhCHHOENG/todo-api-typescript',
    demo: null,
    release: '2023',
    featured: false,
    tech: ['TypeScript', 'Node.js', 'REST API', 'Express'],
  },
  {
    title: 'Learning Service',
    initials: 'LS',
    desc: 'Java Spring Boot microservice exploring backend patterns. Integrates PostgreSQL with JPA and demonstrates clean service-layer architecture.',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #5c2020 100%)',
    github: 'https://github.com/RamekhCHHOENG/learning-service',
    demo: null,
    release: '2026',
    featured: false,
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'JPA', 'Gradle'],
  },
  {
    title: 'Portfolio',
    initials: 'RC',
    desc: 'This site — dark-themed developer portfolio built with Nuxt 4, TailwindCSS v4, and NuxtUI. PWA-ready, fully responsive, self-hosted via Coolify.',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)',
    github: 'https://github.com/RamekhCHHOENG/portfolio',
    demo: 'https://ramekhchhoeng.online/',
    release: '2026',
    featured: false,
    tech: ['Nuxt 4', 'Vue 3', 'TailwindCSS', 'NuxtUI', 'TypeScript'],
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
