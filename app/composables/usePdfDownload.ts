export function usePdfDownload() {
  const isGenerating = ref(false)

  async function downloadPDF() {
    if (import.meta.server) return
    if (isGenerating.value) return

    isGenerating.value = true
    const originalTitle = document.title
    document.title = 'Ramekhchhoeng_Final'

    // Small delay so button state updates before dialog opens
    await new Promise(resolve => setTimeout(resolve, 80))

    window.print()

    document.title = originalTitle
    isGenerating.value = false
  }

  return { downloadPDF, isGenerating }
}

