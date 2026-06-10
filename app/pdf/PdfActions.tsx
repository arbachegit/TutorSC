'use client'

export function PdfActions({ lang }: { lang: string }) {
  const labels = lang === 'en'
    ? { print: 'Print', share: 'Share', pdf: 'PDF' }
    : { print: 'Imprimir', share: 'Partilhar', pdf: 'PDF' }

  function handlePrint() { window.print() }

  async function handleShare() {
    const url = window.location.href
    const title = 'ai.tutor — Showcase Summary'
    if (navigator.share) {
      try { await navigator.share({ title, url }) } catch { /* user cancelled */ }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      alert(lang === 'en' ? 'Link copied!' : 'Link copiado!')
    }
  }

  return (
    <div className="pdfr-toolbar-actions">
      <button type="button" className="pdfr-action-btn" onClick={handlePrint}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
        </svg>
        {labels.print}
      </button>
      <button type="button" className="pdfr-action-btn" onClick={handleShare}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        {labels.share}
      </button>
      <button type="button" className="pdfr-action-btn" onClick={handlePrint}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><polyline points="9 15 12 18 15 15" />
        </svg>
        {labels.pdf}
      </button>
    </div>
  )
}
