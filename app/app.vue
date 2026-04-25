<template>
  <div class="min-h-screen text-zinc-50 antialiased relative">
    <!-- Fixed ambient gradient background (the "wallpaper" for liquid glass) -->
    <div class="orb-container fixed inset-0 -z-10 overflow-hidden" style="background: linear-gradient(145deg, #07001a 0%, #04081c 45%, #010f0a 100%)">
      <!-- Orb 1: Violet — top-left, primary glow -->
      <div
        class="absolute pointer-events-none"
        style="top: -15%; left: -10%; width: 80vw; height: 80vw; border-radius: 50%;
               background: radial-gradient(circle, rgba(109,40,217,0.30) 0%, transparent 65%);
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
      <!-- Orb 4: Rose/pink accent — bottom-right -->
      <div
        class="absolute pointer-events-none"
        style="bottom: 5%; right: 5%; width: 40vw; height: 40vw; border-radius: 50%;
               background: radial-gradient(circle, rgba(190,24,93,0.12) 0%, transparent 65%);
               animation: driftAlt 24s ease-in-out infinite 10s;"
      />
    </div>
    <NuxtPage />
  </div>
</template>
