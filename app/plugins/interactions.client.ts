export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const tiltDone = new WeakSet<Element>()
  const magDone = new WeakSet<Element>()

  // ─── Card cursor spotlight ────────────────────────────────────────────────
  function attachSpotlight(el: HTMLElement) {
    if (tiltDone.has(el)) return   // reuse tiltDone guard (spotlight runs with tilt)
    el.addEventListener('mousemove', (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--sx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`)
      el.style.setProperty('--sy', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`)
    })
  }

  // ─── 3-D card tilt ────────────────────────────────────────────────────────
  function attachTilt(el: HTMLElement) {
    if (tiltDone.has(el)) return
    tiltDone.add(el)

    el.style.willChange = 'transform'
    el.style.transformStyle = 'preserve-3d'

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width   // 0 → 1
      const y = (e.clientY - r.top) / r.height    // 0 → 1
      const rx = (y - 0.5) * -14                  // -7 → 7 deg
      const ry = (x - 0.5) * 14
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.018,1.018,1.018)`
      el.style.transition = 'transform 0.08s ease-out'
    })

    el.addEventListener('mouseleave', () => {
      el.style.transform = ''
      el.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1)'
    })
  }

  // ─── Magnetic button ──────────────────────────────────────────────────────
  function attachMagnetic(el: HTMLElement) {
    if (magDone.has(el)) return
    magDone.add(el)

    el.style.willChange = 'transform'
    const RADIUS = Math.max(el.offsetWidth, el.offsetHeight) * 1.4

    function onMove(e: MouseEvent) {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < RADIUS) {
        const pull = (1 - dist / RADIUS) * 0.38
        el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`
        el.style.transition = 'transform 0.18s ease-out'
      } else {
        el.style.transform = ''
        el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)'
      }
    }

    document.addEventListener('mousemove', onMove)
  }

  // ─── Scroll reveal (below-fold only) ────────────────────────────────────
  function initReveal() {
    const vh = window.innerHeight
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const delay = el.classList.contains('fade-up-4') ? 550
                    : el.classList.contains('fade-up-3') ? 400
                    : el.classList.contains('fade-up-2') ? 250
                    : el.classList.contains('fade-up-1') ? 100
                    : 0
        setTimeout(() => el.classList.add('is-visible'), delay)
        obs.unobserve(el)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

    document.querySelectorAll('.fade-up').forEach(el => {
      const rect = el.getBoundingClientRect()
      if (rect.top > vh - 20) {
        // Below the fold — hide and watch
        el.classList.add('scroll-wait')
        obs.observe(el)
      }
      // In viewport — let the CSS animation play naturally
    })
  }

  // ─── Orb parallax ─────────────────────────────────────────────────────────
  function initOrbParallax() {
    if (prefersReducedMotion) return
    const container = document.querySelector<HTMLElement>('.orb-container')
    if (!container) return
    let tx = 0, ty = 0, cx = 0, cy = 0
    document.addEventListener('mousemove', (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth  - 0.5) * -24
      ty = (e.clientY / window.innerHeight - 0.5) * -24
    }, { passive: true })
    ;(function tick() {
      cx += (tx - cx) * 0.04
      cy += (ty - cy) * 0.04
      container.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`
      requestAnimationFrame(tick)
    })()
  }

  // ─── Scan & attach ────────────────────────────────────────────────────────
  function init() {
    if (prefersReducedMotion) return
    document.querySelectorAll<HTMLElement>('.glass-card').forEach(el => {
      attachSpotlight(el)
      attachTilt(el)
    })
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(attachMagnetic)
  }

  window.addEventListener('load', () => {
    initReveal()       // immediately — no delay, prevents blank hero flash
    initOrbParallax()  // immediately — mouse listener, no DOM dependency
    requestAnimationFrame(() => setTimeout(init, 80))  // tilt/spotlight/magnetic
  })
})
