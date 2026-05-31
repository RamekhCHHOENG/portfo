export default defineNuxtPlugin(() => {
  const { toggle } = useCommandPalette()

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      toggle()
    }
  })
})
