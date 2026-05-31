<template>
  <section id="experience" class="pt-16 pb-32 px-6 glass-divider">
    <div class="max-w-4xl mx-auto">

      <!-- Header -->
      <div class="mb-10 fade-up">
        <p class="text-xs text-violet-400 uppercase tracking-widest font-medium mb-3">Timeline</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">Where I've been.</h2>
      </div>

      <!-- Tab toggle -->
      <div class="flex gap-1 glass-sm rounded-xl p-1 w-fit mb-12 fade-up fade-up-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="px-5 py-2 rounded-lg text-sm font-medium transition-all"
          :class="activeTab === tab.id
            ? 'bg-white/12 text-white shadow-sm'
            : 'text-white/40 hover:text-white/70'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Timeline: Work -->
      <div v-if="activeTab === 'work'" class="relative">
        <!-- Vertical connector line -->
        <div
          class="absolute left-[10px] top-3 bottom-6 w-px pointer-events-none"
          style="background: linear-gradient(to bottom, rgba(139,92,246,0.55), rgba(255,255,255,0.07) 80%, transparent)"
        />

        <div
          v-for="(job, i) in jobs"
          :key="job.company"
          :class="['relative pl-10 pb-10 last:pb-0 fade-up', `fade-up-${(i % 3) + 1}`]"
        >
          <!-- Dot -->
          <div
            :class="[
              'absolute left-0 top-1.5 w-[21px] h-[21px] rounded-full border-2 flex items-center justify-center',
              job.current
                ? 'bg-violet-500/20 border-violet-400 shadow-[0_0_14px_rgba(139,92,246,0.55)]'
                : 'bg-zinc-900 border-white/20',
            ]"
          >
            <div
              :class="[
                'w-2 h-2 rounded-full',
                job.current ? 'bg-violet-400 animate-pulse' : 'bg-white/25',
              ]"
            />
          </div>

          <!-- Card -->
          <div class="glass-card rounded-2xl p-6">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <div class="flex flex-wrap items-center gap-2 mb-0.5">
                  <h3 class="text-[15px] font-semibold text-white/90">{{ job.role }}</h3>
                  <span
                    v-if="job.current"
                    class="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                  >
                    Current
                  </span>
                </div>
                <p :class="['text-sm font-medium', colorMap[job.color]]">{{ job.company }}</p>
              </div>
              <div class="sm:text-right flex-shrink-0">
                <p class="text-xs text-white/40 font-medium">{{ job.period }}</p>
                <p class="text-[11px] text-white/25 mt-0.5">{{ job.location }}</p>
              </div>
            </div>

            <p class="text-sm text-white/40 leading-relaxed mb-4">{{ job.description }}</p>

            <ul class="space-y-2 mb-5">
              <li
                v-for="item in job.achievements"
                :key="item"
                class="flex items-start gap-2.5 text-sm text-white/60 leading-relaxed"
              >
                <span class="text-violet-400 text-xs mt-1 flex-shrink-0">▸</span>
                {{ item }}
              </li>
            </ul>

            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tech in job.stack"
                :key="tech"
                class="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-white/45 border border-white/10"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline: Education -->
      <div v-else class="relative">
        <div
          class="absolute left-[10px] top-3 bottom-6 w-px pointer-events-none"
          style="background: linear-gradient(to bottom, rgba(139,92,246,0.55), rgba(255,255,255,0.07) 80%, transparent)"
        />

        <div
          v-for="(edu, i) in education"
          :key="edu.school"
          :class="['relative pl-10 pb-10 last:pb-0 fade-up', `fade-up-${(i % 3) + 1}`]"
        >
          <div class="absolute left-0 top-1.5 w-[21px] h-[21px] rounded-full border-2 bg-zinc-900 border-white/20 flex items-center justify-center">
            <div class="w-2 h-2 rounded-full bg-white/25" />
          </div>

          <div class="glass-card rounded-2xl p-6">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 class="text-[15px] font-semibold text-white/90 mb-0.5">{{ edu.degree }}</h3>
                <p :class="['text-sm font-medium', colorMap[edu.color]]">{{ edu.school }}</p>
              </div>
              <div class="sm:text-right flex-shrink-0">
                <p class="text-xs text-white/40 font-medium">{{ edu.period }}</p>
                <p class="text-[11px] text-white/25 mt-0.5">{{ edu.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const activeTab = ref('work')

const tabs = [
  { id: 'work',      label: 'Work Experience' },
  { id: 'education', label: 'Education' },
]

const colorMap: Record<string, string> = {
  violet:  'text-violet-400',
  cyan:    'text-cyan-400',
  emerald: 'text-emerald-400',
}

const jobs = [
  {
    company: 'IDEALINK CONSULTING LTD',
    role: 'Frontend Engineer Lead',
    period: 'Dec 2022 – Present',
    location: 'Phnom Penh',
    current: true,
    color: 'violet',
    description: 'Management, professional training and business technology company helping clients transform through IT expertise and market understanding.',
    achievements: [
      'Established core project infrastructure from the ground up',
      'Built and launched web applications using Vue.js and Nuxt',
      'Led UI/UX design and front-end architecture decisions',
      'Drove bug fixing, maintenance, and performance optimization across products',
    ],
    stack: ['Vue.js', 'Nuxt', 'TypeScript', 'TailwindCSS', 'REST APIs'],
  },
  {
    company: 'Soramitsu Khmer Co., Ltd',
    role: 'Software Developer',
    period: 'Jan 2020 – Dec 2022',
    location: 'Phnom Penh',
    current: false,
    color: 'cyan',
    description: 'Product-based software company delivering enterprise, university, and government technology solutions across Cambodia.',
    achievements: [
      'Contributed to and shipped 3 production projects using Vue.js',
      'Collaborated cross-functionally to implement front-end from business requirements',
      'Built reusable custom components aligned with project design systems',
      'Resolved complex bugs and maintained projects for ongoing usability',
      'Enhanced both internal tooling and external customer-facing products',
    ],
    stack: ['Vue.js', 'JavaScript', 'REST APIs', 'CSS3'],
  },
  {
    company: 'iOS Development Role',
    role: 'iOS Developer',
    period: 'Sep 2019 – Jan 2020',
    location: 'Phnom Penh',
    current: false,
    color: 'emerald',
    description: 'Early career mobile development focused on building Swift-based iOS applications using programmatic UIKit.',
    achievements: [
      'Developed product features using Swift (Programmatic UIKit)',
      'Participated in bug fixing activities to improve overall product quality',
      'Conducted ongoing maintenance to ensure feature reliability',
    ],
    stack: ['Swift', 'iOS', 'Xcode', 'UIKit'],
  },
]

const education = [
  {
    school: 'University of Puthisastra (UP)',
    degree: 'Bachelor of Computer Science',
    period: 'Oct 2019 – Nov 2021',
    location: 'Phnom Penh',
    color: 'violet',
  },
  {
    school: 'Passerelles Numeriques Cambodia (PNC)',
    degree: 'Associate Degree',
    period: 'Oct 2017 – Oct 2019',
    location: 'Phnom Penh',
    color: 'cyan',
  },
  {
    school: 'Puok High School',
    degree: 'Baccalaureate II',
    period: 'Oct 2014 – Nov 2017',
    location: 'Siem Reap',
    color: 'emerald',
  },
]
</script>
