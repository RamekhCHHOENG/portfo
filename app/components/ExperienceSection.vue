<template>
  <section id="experience" class="pt-16 pb-32 px-6 glass-divider">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="mb-10 fade-up">
        <p class="text-xs text-amber-400 uppercase tracking-widest font-medium mb-3">Resume</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">Experience timeline.</h2>
      </div>



      <!-- Tab toggle -->
      <div class="grid grid-cols-3 gap-1 glass-sm rounded-xl p-1 w-full sm:w-fit mb-12 fade-up fade-up-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="px-2.5 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          :aria-pressed="activeTab === tab.id"
          :class="activeTab === tab.id
            ? 'bg-white text-black shadow-sm'
            : 'text-white/65 hover:text-white'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab: Overview -->
      <div v-if="activeTab === 'overview'" class="space-y-4 fade-up fade-up-1">
        <div class="grid grid-cols-1 lg:grid-cols-[0.9fr_1.35fr] gap-4">
          <div class="glass-card rounded-2xl p-6">
            <h3 class="text-sm font-semibold text-white/90 mb-3">Frontend Engineer</h3>
            <p class="text-sm text-white/68 leading-relaxed mb-5">
              Frontend Engineer with 4.5+ years of experience building production web
              applications across enterprise, education, government, and product teams.
            </p>

            <div class="space-y-3 text-sm">
              <div v-for="item in contactItems" :key="item.label" class="flex justify-between gap-4">
                <span class="text-white/45">{{ item.label }}</span>
                <a
                  v-if="item.href"
                  :href="item.href"
                  target="_blank"
                  rel="noopener"
                  class="text-white/78 hover:text-white transition-colors text-right"
                >
                  {{ item.value }}
                </a>
                <span v-else class="text-white/78 text-right">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="glass-card rounded-2xl p-6">
              <h3 class="text-sm font-semibold text-white/90 mb-4">Core skills</h3>
              <div class="grid gap-4">
                <div v-for="group in skillGroups" :key="group.title">
                  <p class="text-xs text-amber-400 uppercase tracking-widest font-medium mb-2">{{ group.title }}</p>
                  <p class="text-sm text-white/65 leading-relaxed">{{ group.items }}</p>
                </div>
              </div>
            </div>

            <div class="glass-card rounded-2xl p-6">
              <h3 class="text-sm font-semibold text-white/90 mb-4">Languages</h3>
              <p class="text-sm text-white/68 leading-relaxed mb-5">
                Khmer: Native<br>
                English: Working proficiency
              </p>
              <div class="flex flex-wrap gap-2">
                <button
                  class="glass-sm inline-flex items-center gap-2 px-4 py-2 text-sm text-white/85 hover:text-white rounded-lg disabled:opacity-50"
                  :disabled="isGenerating"
                  @click="downloadPDF"
                >
                  {{ isGenerating ? 'Generating...' : resumeActionLabel }}
                </button>
                <button
                  class="glass-sm inline-flex items-center gap-2 px-4 py-2 text-sm text-white/85 hover:text-white rounded-lg"
                  @click="viewResume"
                >
                  {{ resumeViewLabel }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Toolkit Card -->
        <div class="glass-card rounded-2xl p-6">
          <div class="flex items-center gap-2.5 mb-5">
            <span class="text-lg">&#x1F916;</span>
            <h3 class="text-sm font-semibold text-white/90">AI-Assisted Development</h3>
            <span class="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/25">Daily workflow</span>
          </div>
          <p class="text-sm text-white/50 leading-relaxed mb-5">
            Integrate AI coding tools into daily development workflow to accelerate delivery, improve code quality, and streamline architecture decisions.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="tool in aiTools" :key="tool.name" class="glass-sm rounded-xl p-4">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-base">{{ tool.icon }}</span>
                <p class="text-sm font-semibold text-white/85">{{ tool.name }}</p>
              </div>
              <ul class="space-y-1.5">
                <li
                  v-for="use in tool.uses"
                  :key="use"
                  class="flex items-start gap-2 text-[13px] text-white/55 leading-relaxed"
                >
                  <span class="text-amber-400 text-[10px] mt-1 flex-shrink-0">&#x25B8;</span>
                  {{ use }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline: Work -->
      <div v-else-if="activeTab === 'work'" class="relative">
        <!-- Vertical connector line -->
        <div
          class="absolute left-[10px] top-3 bottom-6 w-px pointer-events-none"
          style="background: linear-gradient(to bottom, rgba(245,196,81,0.58), rgba(255,255,255,0.07) 80%, transparent)"
        />

        <div
          v-for="(job, i) in jobs"
          :key="`${job.role}-${job.period}`"
          :class="['relative pl-10 pb-10 last:pb-0 fade-up', `fade-up-${(i % 3) + 1}`]"
        >
          <!-- Dot -->
          <div
            :class="[
              'absolute left-0 top-1.5 w-[21px] h-[21px] rounded-full border-2 flex items-center justify-center',
              job.current
                ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_14px_rgba(245,196,81,0.55)]'
                : 'bg-zinc-900 border-white/20',
            ]"
          >
            <div
              :class="[
                'w-2 h-2 rounded-full',
                job.current ? 'bg-amber-400 animate-pulse' : 'bg-white/25',
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
                <p class="text-sm font-medium text-cyan-300">
                  <span
                    v-if="job.maskedCompany"
                    class="inline-block"
                  >
                    {{ job.company }}
                  </span>
                  <span v-else>{{ job.company }}</span>
                </p>
              </div>
              <div class="sm:text-right flex-shrink-0">
                <p class="text-xs text-white/55 font-medium">{{ job.period }}</p>
                <p class="text-[11px] text-white/40 mt-0.5">{{ job.location }}</p>
              </div>
            </div>

            <p class="text-sm text-white/62 leading-relaxed mb-4">{{ job.description }}</p>

            <ul class="space-y-2 mb-5">
              <li
                v-for="item in job.achievements"
                :key="item"
                class="flex items-start gap-2.5 text-sm text-white/68 leading-relaxed"
              >
                <span class="text-amber-400 text-xs mt-1 flex-shrink-0">▸</span>
                {{ item }}
              </li>
            </ul>

            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tech in job.stack"
                :key="tech"
                class="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-white/60 border border-white/10"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline: Education -->
      <div v-else-if="activeTab === 'education'" class="relative">
        <div
          class="absolute left-[10px] top-3 bottom-6 w-px pointer-events-none"
          style="background: linear-gradient(to bottom, rgba(245,196,81,0.58), rgba(255,255,255,0.07) 80%, transparent)"
        />

        <div
          v-for="(edu, i) in education"
          :key="`${edu.degree}-${edu.period}`"
          :class="['relative pl-10 pb-10 last:pb-0 fade-up', `fade-up-${(i % 3) + 1}`]"
        >
          <div class="absolute left-0 top-1.5 w-[21px] h-[21px] rounded-full border-2 bg-zinc-900 border-white/20 flex items-center justify-center">
            <div class="w-2 h-2 rounded-full bg-white/25" />
          </div>

          <div class="glass-card rounded-2xl p-6">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 class="text-[15px] font-semibold text-white/90 mb-0.5">{{ edu.degree }}</h3>
                <p class="text-sm font-medium text-cyan-300">
                  <span
                    v-if="edu.maskedSchool"
                    class="inline-block"
                  >
                    {{ edu.school }}
                  </span>
                  <span v-else>{{ edu.school }}</span>
                </p>
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
const {
  downloadPDF,
  viewResume,
  isGenerating,
  resumeActionLabel,
  resumeViewLabel,
} = usePdfDownload()

const activeTab = ref('overview')

const tabs = [
  { id: 'overview',  label: 'Overview' },
  { id: 'work',      label: 'Work' },
  { id: 'education', label: 'Education' },
]

const contactItems = [
  { label: 'Location', value: 'Phnom Penh, Cambodia' },
  { label: 'Phone', value: '+855 97 818 818 3', href: 'tel:+855978188183' },
  { label: 'Email', value: 'ramekhchhoeng@icloud.com', href: 'mailto:ramekhchhoeng@icloud.com' },
  { label: 'Website', value: 'ramekhchhoeng.com', href: 'https://ramekhchhoeng.com' },
  { label: 'GitHub', value: 'github.com/RamekhCHHOENG', href: 'https://github.com/RamekhCHHOENG' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ramekhchhoeng', href: 'https://www.linkedin.com/in/ramekhchhoeng/' },
]

const skillGroups = [
  {
    title: 'Frontend',
    items: 'Vue.js, Nuxt, React.js, TypeScript, JavaScript, TailwindCSS, Vuetify, Bootstrap',
  },
  {
    title: 'UI engineering',
    items: 'Component architecture, design systems, responsive interfaces, accessibility basics',
  },
  {
    title: 'API and apps',
    items: 'Node.js, REST APIs, GraphQL, Swift, UIKit, Java, Kotlin, PHP/Laravel basics',
  },
  {
    title: 'Delivery',
    items: 'Git, GitHub, Jira, Linux basics, debugging, maintenance, code review',
  },
]

const aiTools = [
  {
    name: 'GitHub Copilot / Codex',
    icon: '\u26A1',
    uses: [
      'Code autocompletion and boilerplate generation',
      'Accelerating repetitive patterns and test writing',
      'Inline suggestions for faster feature development',
    ],
  },
  {
    name: 'Claude',
    icon: '\u{1F9E0}',
    uses: [
      'Code review, refactoring, and architecture planning',
      'Debugging complex logic and edge cases',
      'Technical documentation and code explanation',
    ],
  },
  {
    name: 'Gemini',
    icon: '\u2726',
    uses: [
      'Codebase-aware multi-file refactoring',
      'Rapid prototyping and pair programming',
      'System design and component architecture',
    ],
  },
]

const jobs = [
  {
    company: 'Private company',
    maskedCompany: true,
    role: 'Frontend Developer',
    period: '2024 – Present',
    location: 'Phnom Penh',
    current: true,
    color: 'gold',
    description: 'Frontend development across Nuxt, React.js, and Node.js applications.',
    achievements: [
      'Build production interfaces with Nuxt and React.js',
      'Integrate frontend features with Node.js services and APIs',
      'Maintain reusable UI patterns and application performance',
    ],
    stack: ['Nuxt', 'React.js', 'Node.js', 'TypeScript', 'REST APIs'],
  },
  {
    company: 'Private company',
    maskedCompany: true,
    role: 'Frontend Engineer',
    period: 'Dec 2022 – 2024',
    location: 'Phnom Penh',
    current: false,
    color: 'cyan',
    description: 'Business technology role focused on production Vue.js and Nuxt application delivery.',
    achievements: [
      'Established core project infrastructure from the ground up',
      'Built and launched web applications using Vue.js and Nuxt',
      'Led UI/UX design and front-end architecture decisions',
      'Drove bug fixing, maintenance, and performance optimization across products',
    ],
    stack: ['Vue.js', 'Nuxt', 'TypeScript', 'TailwindCSS', 'REST APIs'],
  },
  {
    company: 'Private company',
    maskedCompany: true,
    role: 'Software Developer',
    period: 'Jan 2020 – Dec 2022',
    location: 'Phnom Penh',
    current: false,
    color: 'emerald',
    description: 'Product-based software role delivering enterprise, education, and public-sector interfaces.',
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
    company: 'Private company',
    maskedCompany: true,
    role: 'iOS Developer',
    period: 'Sep 2019 – Jan 2020',
    location: 'Phnom Penh',
    current: false,
    color: 'cyan',
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
    school: 'Private school',
    maskedSchool: true,
    degree: 'Master Degree',
    period: '2026 – 2027',
    location: 'Phnom Penh',
    color: 'gold',
  },
  {
    school: 'Private school',
    maskedSchool: true,
    degree: 'Bachelor of Computer Science',
    period: 'Oct 2019 – Nov 2021',
    location: 'Phnom Penh',
    color: 'cyan',
  },
  {
    school: 'Private school',
    maskedSchool: true,
    degree: 'Associate Degree',
    period: 'Oct 2017 – Oct 2019',
    location: 'Phnom Penh',
    color: 'emerald',
  },
  {
    school: 'Private school',
    maskedSchool: true,
    degree: 'Baccalaureate II',
    period: 'Oct 2014 – Nov 2017',
    location: 'Siem Reap',
    color: 'cyan',
  },
]
</script>
