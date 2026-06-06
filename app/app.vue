<template>
  <div class="min-h-screen text-zinc-50 antialiased relative isolate bg-[#0b0903]">
    <!-- Fixed ambient gradient background (the "wallpaper" for liquid glass) -->
    <div class="orb-container fixed inset-0 -z-10 overflow-hidden" style="background: linear-gradient(145deg, #0b0903 0%, #10130a 45%, #020f0b 100%)">
      <!-- Orb 1: Gold — top-left, primary glow -->
      <div
        class="absolute pointer-events-none"
        style="top: -15%; left: -10%; width: 80vw; height: 80vw; border-radius: 50%;
               background: radial-gradient(circle, rgba(245,196,81,0.22) 0%, transparent 65%);
               animation: drift 20s ease-in-out infinite;"
      />
      <!-- Orb 2: Blue — right-center -->
      <div
        class="absolute pointer-events-none"
        style="top: 5%; right: -18%; width: 70vw; height: 70vw; border-radius: 50%;
               background: radial-gradient(circle, rgba(29,78,216,0.24) 0%, transparent 65%);
               animation: driftAlt 26s ease-in-out infinite;"
      />
      <!-- Orb 3: Teal — bottom-left -->
      <div
        class="absolute pointer-events-none"
        style="bottom: -18%; left: 15%; width: 65vw; height: 65vw; border-radius: 50%;
               background: radial-gradient(circle, rgba(5,150,105,0.18) 0%, transparent 65%);
               animation: drift 32s ease-in-out infinite 6s;"
      />
      <!-- Orb 4: Warm amber accent — bottom-right -->
      <div
        class="absolute pointer-events-none"
        style="bottom: 5%; right: 5%; width: 40vw; height: 40vw; border-radius: 50%;
               background: radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 65%);
               animation: driftAlt 24s ease-in-out infinite 10s;"
      />
    </div>
    <NuxtPage />
    <FilmGrain />
    <LoadingScreen />
    <ClientOnly><CustomCursor /></ClientOnly>
    <ClientOnly><CommandPalette /></ClientOnly>
  </div>
</template>
