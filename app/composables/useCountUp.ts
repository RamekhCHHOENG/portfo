export function useCountUp(targets: number[], duration = 1800) {
  const counts = ref<number[]>(targets.map(() => 0))
  let observer: IntersectionObserver | null = null
  let animated = false

  function run() {
    if (animated) return
    animated = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counts.value = [...targets]
      return
    }

    const start = performance.now()
    function frame(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      counts.value = targets.map(n => Math.round(n * ease))
      if (t < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }

  function observe(el: Element | null) {
    if (!el || !import.meta.client) return
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run()
          observer?.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
  }

  onUnmounted(() => observer?.disconnect())
  return { counts, observe }
}
