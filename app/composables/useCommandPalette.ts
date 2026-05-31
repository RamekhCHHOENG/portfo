// Module-level singleton — shared across all component instances (client-only)
const _isOpen = ref(false)

export const useCommandPalette = () => ({
  isOpen: _isOpen,
  open:   () => { _isOpen.value = true },
  close:  () => { _isOpen.value = false },
  toggle: () => { _isOpen.value = !_isOpen.value },
})
