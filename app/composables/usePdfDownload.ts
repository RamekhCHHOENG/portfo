export function usePdfDownload() {
  const isGenerating = ref(false)

  async function downloadPDF() {
    if (import.meta.server) return
    if (isGenerating.value) return

    isGenerating.value = true

    try {
      const link = document.createElement('a')
      link.href = '/Ramekhchhoeng_Final.pdf'
      link.download = 'Ramekhchhoeng_Final.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } finally {
      isGenerating.value = false
    }
  }

  return { downloadPDF, isGenerating }
}


