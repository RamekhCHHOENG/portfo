<template>
  <section id="skills" class="pt-16 pb-32 px-6 glass-divider">
    <div class="max-w-6xl mx-auto">
      <div class="mb-16 fade-up">
        <p class="text-xs text-violet-400 uppercase tracking-widest font-medium mb-3">Stack</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Tools of the trade.
        </h2>
      </div>

      <!-- Bento grid -->
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4">

        <!-- Frontend — large featured card -->
        <div class="md:col-span-4 glass-card rounded-2xl p-6 fade-up fade-up-1 border-l-2 border-cyan-400/40">
          <div class="flex items-center gap-3 mb-5">
            <span class="text-2xl">🌐</span>
            <div>
              <h3 class="text-sm font-semibold text-white/90">Frontend</h3>
              <p class="text-[11px] text-white/35 mt-0.5">Primary expertise · 4.5+ years</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in bentoGroups.frontend" :key="skill.name"
              :class="['px-2.5 py-1 rounded-full text-xs font-medium border', skill.color]">
              {{ skill.name }}
            </span>
          </div>
        </div>

        <!-- Mobile -->
        <div class="md:col-span-2 glass-card rounded-2xl p-6 fade-up fade-up-2 border-l-2 border-purple-400/40">
          <div class="flex items-center gap-3 mb-5">
            <span class="text-2xl">📱</span>
            <div>
              <h3 class="text-sm font-semibold text-white/90">Mobile</h3>
              <p class="text-[11px] text-white/35 mt-0.5">iOS · Android · Cross-platform</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in bentoGroups.mobile" :key="skill.name"
              :class="['px-2.5 py-1 rounded-full text-xs font-medium border', skill.color]">
              {{ skill.name }}
            </span>
          </div>
        </div>

        <!-- Backend -->
        <div class="md:col-span-3 glass-card rounded-2xl p-6 fade-up fade-up-1 border-l-2 border-emerald-400/40">
          <div class="flex items-center gap-3 mb-5">
            <span class="text-2xl">⚙️</span>
            <div>
              <h3 class="text-sm font-semibold text-white/90">Backend</h3>
              <p class="text-[11px] text-white/35 mt-0.5">APIs · Services · Runtimes</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in bentoGroups.backend" :key="skill.name"
              :class="['px-2.5 py-1 rounded-full text-xs font-medium border', skill.color]">
              {{ skill.name }}
            </span>
          </div>
        </div>

        <!-- DB & Infra -->
        <div class="md:col-span-3 glass-card rounded-2xl p-6 fade-up fade-up-2 border-l-2 border-orange-400/40">
          <div class="flex items-center gap-3 mb-5">
            <span class="text-2xl">🗄️</span>
            <div>
              <h3 class="text-sm font-semibold text-white/90">DB & Infrastructure</h3>
              <p class="text-[11px] text-white/35 mt-0.5">Storage · Cache · Queues</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in bentoGroups.infra" :key="skill.name"
              :class="['px-2.5 py-1 rounded-full text-xs font-medium border', skill.color]">
              {{ skill.name }}
            </span>
          </div>
        </div>

        <!-- Tools — full width -->
        <div class="md:col-span-6 glass-card rounded-2xl p-6 fade-up fade-up-3 border-l-2 border-white/20">
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <div class="flex items-center gap-3 sm:w-48 flex-shrink-0">
              <span class="text-2xl">🛠️</span>
              <div>
                <h3 class="text-sm font-semibold text-white/90">Tools & DevOps</h3>
                <p class="text-[11px] text-white/35 mt-0.5">Workflow · Collaboration</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in bentoGroups.tools" :key="skill.name"
                :class="['px-2.5 py-1 rounded-full text-xs font-medium border', skill.color]">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Skill = { name: string; color: string }

const bentoGroups: Record<string, Skill[]> = {
  frontend: [
    { name: 'Next.js', color: 'border-white/30 text-white/80 bg-white/5' },
    { name: 'Vue.js', color: 'border-emerald-400/40 text-emerald-300 bg-emerald-400/5' },
    { name: 'React', color: 'border-cyan-400/40 text-cyan-300 bg-cyan-400/5' },
    { name: 'TypeScript', color: 'border-blue-400/40 text-blue-300 bg-blue-400/5' },
    { name: 'JavaScript', color: 'border-yellow-400/40 text-yellow-300 bg-yellow-400/5' },
    { name: 'Tailwind CSS', color: 'border-sky-400/40 text-sky-300 bg-sky-400/5' },
    { name: 'Nuxt', color: 'border-emerald-400/40 text-emerald-300 bg-emerald-400/5' },
    { name: 'shadcn/ui', color: 'border-white/20 text-white/60 bg-white/5' },
    { name: 'HTML / CSS', color: 'border-orange-400/40 text-orange-300 bg-orange-400/5' },
    { name: 'GraphQL', color: 'border-pink-400/40 text-pink-300 bg-pink-400/5' },
  ],
  mobile: [
    { name: 'React Native', color: 'border-cyan-400/40 text-cyan-300 bg-cyan-400/5' },
    { name: 'Expo', color: 'border-white/30 text-white/80 bg-white/5' },
    { name: 'Swift', color: 'border-orange-400/40 text-orange-300 bg-orange-400/5' },
    { name: 'Kotlin', color: 'border-purple-400/40 text-purple-300 bg-purple-400/5' },
  ],
  backend: [
    { name: 'Python', color: 'border-yellow-400/40 text-yellow-300 bg-yellow-400/5' },
    { name: 'FastAPI', color: 'border-teal-400/40 text-teal-300 bg-teal-400/5' },
    { name: 'NestJS', color: 'border-red-400/40 text-red-400 bg-red-400/5' },
    { name: 'Hono', color: 'border-orange-400/40 text-orange-300 bg-orange-400/5' },
    { name: 'Spring Boot', color: 'border-green-400/40 text-green-300 bg-green-400/5' },
    { name: 'Rust', color: 'border-orange-400/30 text-orange-400 bg-orange-400/5' },
    { name: 'Bun', color: 'border-pink-400/40 text-pink-300 bg-pink-400/5' },
    { name: 'Node.js', color: 'border-green-400/40 text-green-300 bg-green-400/5' },
  ],
  infra: [
    { name: 'PostgreSQL', color: 'border-blue-400/40 text-blue-300 bg-blue-400/5' },
    { name: 'Redis', color: 'border-red-400/40 text-red-400 bg-red-400/5' },
    { name: 'Docker', color: 'border-blue-400/40 text-blue-400 bg-blue-400/5' },
    { name: 'MinIO', color: 'border-pink-400/40 text-pink-300 bg-pink-400/5' },
    { name: 'RabbitMQ', color: 'border-orange-400/40 text-orange-300 bg-orange-400/5' },
    { name: 'Prisma', color: 'border-white/25 text-white/65 bg-white/5' },
    { name: 'SQLAlchemy', color: 'border-red-400/30 text-red-300 bg-red-400/5' },
  ],
  tools: [
    { name: 'Git', color: 'border-orange-400/40 text-orange-300 bg-orange-400/5' },
    { name: 'GitHub Actions', color: 'border-white/30 text-white/80 bg-white/5' },
    { name: 'Docker Compose', color: 'border-blue-400/40 text-blue-400 bg-blue-400/5' },
    { name: 'Figma', color: 'border-purple-400/40 text-purple-300 bg-purple-400/5' },
    { name: 'Jira', color: 'border-blue-400/40 text-blue-300 bg-blue-400/5' },
    { name: 'Linux', color: 'border-yellow-400/40 text-yellow-300 bg-yellow-400/5' },
    { name: 'VS Code', color: 'border-blue-400/30 text-blue-300 bg-blue-400/5' },
    { name: 'Coolify', color: 'border-violet-400/40 text-violet-300 bg-violet-400/5' },
    { name: 'Postman', color: 'border-orange-400/40 text-orange-300 bg-orange-400/5' },
  ],
}
</script>
