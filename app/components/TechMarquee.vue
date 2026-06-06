<template>
  <div class="no-print relative overflow-hidden py-7 border-y border-white/[0.06]" aria-hidden="true">
    <!-- Edge fades -->
    <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
         style="background: linear-gradient(to right, #080703, transparent);" />
    <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
         style="background: linear-gradient(to left, #080703, transparent);" />

    <div class="marquee-track flex w-max">
      <span
        v-for="(tech, i) in [...techs, ...techs]"
        :key="i"
        class="inline-flex items-center gap-2 text-[10px] text-white/28 uppercase tracking-[0.14em] font-medium mx-6 whitespace-nowrap"
      >
        <span class="w-[3px] h-[3px] rounded-full bg-amber-400/50 flex-shrink-0" />
        {{ tech }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const techs = [
  'Vue.js', 'Nuxt', 'React', 'Next.js', 'TypeScript',
  'React Native', 'Expo', 'Python', 'FastAPI', 'NestJS',
  'PostgreSQL', 'Redis', 'Docker', 'Rust', 'Kotlin',
  'Prisma', 'Tailwind CSS', 'Bun', 'RabbitMQ', 'MinIO',
]
</script>
