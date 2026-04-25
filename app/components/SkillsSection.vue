<template>
  <section id="skills" class="py-32 px-6 glass-divider">
    <div class="max-w-6xl mx-auto">
      <div class="mb-16 fade-up">
        <p class="text-xs text-violet-400 uppercase tracking-widest font-medium mb-3">Stack</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Tools of the trade.
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div
          v-for="(group, i) in skillGroups"
          :key="group.title"
          :class="`fade-up fade-up-${i + 1}`"
        >
          <h3 class="text-xs font-medium text-white/35 uppercase tracking-widest mb-4">
            {{ group.title }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in group.skills"
              :key="skill"
              class="glass-sm px-3 py-1.5 text-xs font-medium text-white/65 rounded-full hover:text-white cursor-default"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skillGroups = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Rust', 'SQL'],
  },
  {
    title: 'Backend',
    skills: ['Hono', 'NestJS', 'FastAPI', 'Express', 'Spring Boot', 'Prisma ORM', 'SQLAlchemy', 'Bun'],
  },
  {
    title: 'Frontend & Mobile',
    skills: ['Next.js', 'Nuxt', 'React', 'Vue', 'React Native', 'Expo', 'Tailwind CSS', 'shadcn/ui', 'NuxtUI'],
  },
  {
    title: 'Infrastructure & DevOps',
    skills: ['Docker', 'PostgreSQL', 'Redis', 'RabbitMQ', 'MinIO (S3)', 'Coolify', 'GitHub Actions', 'GitLab CI/CD'],
  },
  {
    title: 'Design & Tooling',
    skills: ['Figma', 'Vuetify', 'Photoshop', 'VS Code', 'Raycast', 'Postman'],
  },
]
</script>
