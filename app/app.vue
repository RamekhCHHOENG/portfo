<template>
  <div class="min-h-screen text-zinc-50 antialiased relative isolate bg-[#070806]">
    <div class="site-backdrop fixed inset-0 -z-10 overflow-hidden" aria-hidden="true" />
    <NuxtPage />
    <FilmGrain />
    <ClientOnly><CommandPalette /></ClientOnly>
  </div>
</template>
