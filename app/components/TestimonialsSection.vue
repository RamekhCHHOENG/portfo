<template>
  <section id="testimonials" class="py-32 px-6 glass-divider">
    <div class="max-w-6xl mx-auto">
      <div class="mb-16 fade-up">
        <p class="text-xs text-amber-400 uppercase tracking-widest font-medium mb-3">Recommendations</p>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          What people say.
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(testimonial, i) in testimonials"
          :key="testimonial.name"
          :class="[
            'glass-card rounded-2xl p-8 relative overflow-hidden group',
            `fade-up fade-up-${i + 1}`
          ]"
        >
          <!-- Quote icon decoration -->
          <div class="absolute -top-4 -right-4 text-white/5 transform rotate-12 transition-transform group-hover:rotate-6">
            <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div class="relative z-10">
            <div class="flex items-center gap-1 mb-6 text-emerald-400">
              <svg v-for="star in 5" :key="star" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            
            <p class="text-white/80 text-base leading-relaxed mb-8 font-medium italic">
              "{{ testimonial.text }}"
            </p>

            <div class="flex items-center gap-4 mt-auto">
              <div class="w-12 h-12 rounded-full glass-sm flex items-center justify-center text-white/50 font-bold bg-white/5 border border-white/10">
                {{ testimonial.name.charAt(0) }}
              </div>
              <div>
                <h4 class="text-white/90 text-sm font-semibold">{{ testimonial.name }}</h4>
                <p class="text-white/40 text-xs mt-0.5">{{ testimonial.role }}</p>
                <p class="text-cyan-300/60 text-[10px] mt-0.5">
                  <span class="inline-block blur-[3px] select-none">{{ testimonial.company }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'Sophea Sok',
    role: 'Senior Frontend Developer',
    company: 'Company name',
    text: 'Ramekh is an exceptional developer who consistently delivers high-quality Vue.js components and solutions. His ability to tackle complex architectural bugs and collaborate across teams makes him an invaluable asset to any enterprise project.',
  },
  {
    name: 'Project Manager',
    role: 'Product Management',
    company: 'Company name',
    text: 'Working with Ramekh has been fantastic. He established our core project infrastructure from scratch and led the frontend development with great expertise. He is a fast learner, communicates well, and handles pressure excellently.',
  }
]
</script>
