export function useTypewriter(
  roles: string[],
  options?: { typingSpeed?: number; deletingSpeed?: number; pauseMs?: number },
) {
  const { typingSpeed = 80, deletingSpeed = 40, pauseMs = 2000 } = options ?? {}
  const displayed = ref(roles[0] ?? '')
  const roleIndex = ref(0)
  const isDeleting = ref(false)
  let timeout: ReturnType<typeof setTimeout> | null = null

  function tick() {
    const role = roles[roleIndex.value]
    if (isDeleting.value) {
      displayed.value = role.substring(0, displayed.value.length - 1)
      if (displayed.value === '') {
        isDeleting.value = false
        roleIndex.value = (roleIndex.value + 1) % roles.length
        timeout = setTimeout(tick, 400)
      }
      else {
        timeout = setTimeout(tick, deletingSpeed)
      }
    }
    else {
      displayed.value = role.substring(0, displayed.value.length + 1)
      if (displayed.value === role) {
        timeout = setTimeout(() => { isDeleting.value = true; tick() }, pauseMs)
      }
      else {
        timeout = setTimeout(tick, typingSpeed)
      }
    }
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      displayed.value = roles[0]
      return
    }
    displayed.value = ''
    tick()
  })

  onUnmounted(() => { if (timeout) clearTimeout(timeout) })

  return { displayed }
}
