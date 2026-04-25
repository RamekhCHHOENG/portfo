export function usePdfDownload() {
  const isGenerating = ref(false)

  async function downloadPDF() {
    if (import.meta.server) return
    if (isGenerating.value) return

    isGenerating.value = true
    document.body.classList.add('pdf-generating')

    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('portfolio')
      if (!element) return

      const opt = {
        margin: [12, 14, 12, 14],
        filename: 'Ramekhchhoeng_Final.pdf',
        image: { type: 'jpeg', quality: 0.97 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: '#09090b',
          logging: false,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      }

      await html2pdf().set(opt).from(element).save()
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      document.body.classList.remove('pdf-generating')
      isGenerating.value = false
    }
  }

  return { downloadPDF, isGenerating }
}
