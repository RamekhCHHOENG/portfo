<template>
  <Teleport to="body">
    <Transition name="palette">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9990] flex items-start justify-center pt-[18vh] px-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/55 backdrop-blur-md"
          @click="close"
        />

        <!-- Panel -->
        <div
          class="relative w-full max-w-xl glass rounded-2xl overflow-hidden shadow-[0_32px_100px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.06)]"
          @click.stop
        >
          <!-- Search row -->
          <div class="palette-search flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
            <svg class="w-4 h-4 text-white/35 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="Type a command or search…"
              class="palette-input flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
              @keydown.down.prevent="moveDown"
              @keydown.up.prevent="moveUp"
              @keydown.enter.prevent="executeActive"
              @keydown.esc="close"
            />
            <kbd class="px-1.5 py-0.5 text-[10px] text-white/30 border border-white/15 rounded font-mono">esc</kbd>
          </div>

          <!-- Results -->
          <div class="palette-results max-h-[340px] overflow-y-auto py-2">
            <template v-if="flatItems.length > 0">
              <template v-for="group in filteredGroups" :key="group.label">
                <p class="px-4 pt-3 pb-1 text-[10px] uppercase tracking-[0.12em] text-white/25 font-semibold select-none">
                  {{ group.label }}
                </p>
                <button
                  v-for="cmd in group.items"
                  :key="cmd.id"
                  :class="[
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                    activeId === cmd.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:bg-white/6 hover:text-white/90',
                  ]"
                  @mouseenter="activeId = cmd.id"
                  @click="execute(cmd)"
                >
                  <!-- Icon -->
                  <span
                    class="glass-sm w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 text-white/50"
                    v-html="cmd.icon"
                  />
                  <span class="flex-1 text-sm">{{ cmd.label }}</span>
                  <kbd
                    v-if="cmd.shortcut"
                    class="px-1.5 py-0.5 text-[10px] text-white/25 border border-white/12 rounded font-mono"
                  >
                    {{ cmd.shortcut }}
                  </kbd>
                </button>
              </template>
            </template>
            <p v-else class="px-4 py-10 text-center text-sm text-white/30">
              No results for "{{ query }}"
            </p>
          </div>

          <!-- Footer -->
          <div class="flex items-center gap-4 px-4 py-2.5 border-t border-white/8 text-[11px] text-white/25 select-none">
            <span class="flex items-center gap-1">
              <kbd class="px-1 border border-white/15 rounded text-[10px] font-mono">↑↓</kbd> navigate
            </span>
            <span class="flex items-center gap-1">
              <kbd class="px-1 border border-white/15 rounded text-[10px] font-mono">↵</kbd> select
            </span>
            <span class="flex items-center gap-1">
              <kbd class="px-1 border border-white/15 rounded text-[10px] font-mono">esc</kbd> close
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Command {
  id: string
  label: string
  icon: string
  shortcut?: string
  action: () => void
}
interface Group {
  label: string
  items: Command[]
}

const { isOpen, close } = useCommandPalette()
const { downloadPDF, viewResume, resumeActionLabel, resumeViewLabel } = usePdfDownload()

const query = ref('')
const activeId = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

// ─── Icons (inline SVG strings) ──────────────────────────────────────────────
const iconHome = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`
const iconUser = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`
const iconBriefcase = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>`
const iconCode = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>`
const iconFolder = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>`
const iconMail = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>`
const iconDownload = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>`
const iconEye = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>`
const iconClipboard = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>`
const iconGithub = `<svg fill="currentColor" viewBox="0 0 16 16" class="w-4 h-4"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`
const iconLinkedin = `<svg fill="currentColor" viewBox="0 0 16 16" class="w-4 h-4"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>`
const iconTwitter = `<svg fill="currentColor" viewBox="0 0 16 16" class="w-4 h-4"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0016 3.542a6.658 6.658 0 01-1.889.518 3.301 3.301 0 001.447-1.817 6.533 6.533 0 01-2.087.793A3.286 3.286 0 007.875 6.03a9.325 9.325 0 01-6.767-3.429 3.289 3.289 0 001.018 4.382A3.323 3.323 0 01.64 6.575v.045a3.288 3.288 0 002.632 3.218 3.203 3.203 0 01-.865.115 3.23 3.23 0 01-.614-.057 3.283 3.283 0 003.067 2.277A6.588 6.588 0 01.78 13.58a6.32 6.32 0 01-.78-.045A9.344 9.344 0 005.026 15z"/></svg>`
const iconWrench = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" /></svg>`

// ─── Commands ────────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
}

function copyEmail() {
  navigator.clipboard.writeText('ramekhchhoeng@icloud.com').catch(() => {})
}

function openLink(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const groups = computed<Group[]>(() => [
  {
    label: 'Navigate',
    items: [
      { id: 'nav-home',       label: 'Home',       icon: iconHome,      action: () => scrollTo('hero') },
      { id: 'nav-about',      label: 'About',      icon: iconUser,      action: () => scrollTo('about') },
      { id: 'nav-experience', label: 'Experience', icon: iconBriefcase, action: () => scrollTo('experience') },
      { id: 'nav-skills',     label: 'Skills',     icon: iconWrench,    action: () => scrollTo('skills') },
      { id: 'nav-projects',   label: 'Projects',   icon: iconFolder,    action: () => scrollTo('projects') },
      { id: 'nav-resume',     label: 'Resume',     icon: iconClipboard, action: () => scrollTo('experience') },
      { id: 'nav-contact',    label: 'Contact',    icon: iconMail,      action: () => scrollTo('contact') },
    ],
  },
  {
    label: 'Actions',
    items: [
      { id: 'act-resume', label: resumeActionLabel.value, icon: iconDownload,  shortcut: '⌘R', action: () => downloadPDF() },
      { id: 'act-view',   label: resumeViewLabel.value,   icon: iconEye,                       action: () => viewResume() },
      { id: 'act-copy',   label: 'Copy Email',            icon: iconClipboard, shortcut: '⌘E', action: copyEmail },
      { id: 'act-code',   label: 'View Source Code',      icon: iconCode,                       action: () => openLink('https://github.com/RamekhCHHOENG/portfolio') },
    ],
  },
  {
    label: 'Links',
    items: [
      { id: 'link-github',   label: 'GitHub',   icon: iconGithub,   action: () => openLink('https://github.com/RamekhCHHOENG') },
      { id: 'link-linkedin', label: 'LinkedIn', icon: iconLinkedin, action: () => openLink('https://www.linkedin.com/in/ramekhchhoeng/') },
      { id: 'link-twitter',  label: 'Twitter',  icon: iconTwitter,  action: () => openLink('https://twitter.com/RamekhCHHOENG') },
    ],
  },
])

// ─── Filtering ────────────────────────────────────────────────────────────────
const filteredGroups = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return groups.value
  return groups.value
    .map(g => ({ ...g, items: g.items.filter(c => c.label.toLowerCase().includes(q)) }))
    .filter(g => g.items.length > 0)
})

const flatItems = computed(() => filteredGroups.value.flatMap(g => g.items))

// ─── Keyboard navigation ──────────────────────────────────────────────────────
watch(filteredGroups, () => {
  activeId.value = flatItems.value[0]?.id ?? ''
}, { immediate: true })

function moveDown() {
  const idx = flatItems.value.findIndex(c => c.id === activeId.value)
  activeId.value = flatItems.value[(idx + 1) % flatItems.value.length]?.id ?? ''
}
function moveUp() {
  const idx = flatItems.value.findIndex(c => c.id === activeId.value)
  const prev = idx <= 0 ? flatItems.value.length - 1 : idx - 1
  activeId.value = flatItems.value[prev]?.id ?? ''
}
function execute(cmd: Command) {
  close()
  nextTick(() => cmd.action())
}
function executeActive() {
  const cmd = flatItems.value.find(c => c.id === activeId.value)
  if (cmd) execute(cmd)
}

// ─── Open/close lifecycle ────────────────────────────────────────────────────
watch(isOpen, (v) => {
  if (v) nextTick(() => inputRef.value?.focus())
  else query.value = ''
})

// Global Cmd+K / Ctrl+K is handled by plugins/commandPalette.client.ts
</script>

<style scoped>
.palette-enter-active {
  transition: opacity 0.15s ease, transform 0.18s cubic-bezier(0.34, 1.4, 0.64, 1);
}
.palette-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease-in;
}
.palette-enter-from,
.palette-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(-6px);
}

.palette-search {
  background: rgba(255, 255, 255, 0);
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.palette-search:focus-within {
  border-color: rgba(255, 255, 255, 0.14);
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.04);
}

.palette-input:focus,
.palette-input:focus-visible {
  outline: none;
}

.palette-results {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.16) transparent;
}

.palette-results::-webkit-scrollbar {
  width: 4px;
}

.palette-results::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.16);
  border-radius: 999px;
}
</style>
