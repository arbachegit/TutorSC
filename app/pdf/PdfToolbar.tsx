'use client'

import { useEffect, useRef, useState } from 'react'
import { PdfActions } from './PdfActions'

export function PdfToolbar({
  lang,
  totalPages,
  sectionLabels,
}: {
  lang: string
  totalPages: number
  sectionLabels: string[]
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentLabel, setCurrentLabel] = useState('')
  const rafRef = useRef(0)

  useEffect(() => {
    function onScroll() {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const pages = document.querySelectorAll('.pdfr-page')
        let best = 0
        const mid = window.innerHeight / 2
        let minDist = Infinity
        pages.forEach((el, i) => {
          const r = el.getBoundingClientRect()
          const d = Math.abs(r.top + r.height / 2 - mid)
          if (d < minDist) { minDist = d; best = i }
        })
        setCurrentPage(best + 1)
        // offset: 0=cover, 1=index, 2..7=sections, 8=closing
        const sectionIdx = best - 2
        if (sectionIdx >= 0 && sectionIdx < sectionLabels.length) {
          setCurrentLabel(sectionLabels[sectionIdx])
        } else if (best === 0) {
          setCurrentLabel('')
        } else if (best === 1) {
          setCurrentLabel(lang === 'en' ? 'Contents' : 'Índice')
        } else {
          setCurrentLabel('')
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafRef.current) }
  }, [lang, sectionLabels])

  return (
    <nav className="pdfr-toolbar" aria-label="Document toolbar">
      <span className="pdfr-toolbar-brand">
        <span className="pdfr-toolbar-brand-i">i</span>
        <span>cons</span>
        <span className="pdfr-toolbar-brand-ai">.ai</span>
        <span className="pdfr-toolbar-brand-sep">&middot;</span>
        <span className="pdfr-toolbar-brand-product">tutor</span>
      </span>

      <span className="pdfr-toolbar-center">
        <span className="pdfr-toolbar-page">
          {String(currentPage).padStart(2, '0')}
        </span>
        {' / '}
        {String(totalPages).padStart(2, '0')}
        {currentLabel && (
          <>
            <span style={{ opacity: 0.3 }}>&middot;</span>
            <span className="pdfr-toolbar-label">{currentLabel}</span>
          </>
        )}
      </span>

      <PdfActions lang={lang} />
    </nav>
  )
}
