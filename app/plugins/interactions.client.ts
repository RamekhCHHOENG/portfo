export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const tiltDone = new WeakSet<Element>()
  const magDone = new WeakSet<Element>()

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

  // ─── Scan & attach ────────────────────────────────────────────────────────
  function init() {
    document.querySelectorAll<HTMLElement>('.glass-card').forEach(attachTilt)
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(attachMagnetic)
  }

  window.addEventListener('load', () => requestAnimationFrame(() => setTimeout(init, 80)))
})
