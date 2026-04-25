export function usePdfDownload() {
  const isGenerating = ref(false)

  async function downloadPDF() {
    if (import.meta.server) return
    if (isGenerating.value) return

    isGenerating.value = true
    document.body.classList.add('pdf-generating')
    const originalTitle = document.title
    document.title = 'Ramekhchhoeng_Final'

    // Let CSS settle before opening print dialog
    await new Promise(resolve => setTimeout(resolve, 150))

    window.print()

    // Restore state after print dialog closes
    document.title = originalTitle
    document.body.classList.remove('pdf-generating')
    isGenerating.value = false
  }

  return { downloadPDF, isGenerating }
}

