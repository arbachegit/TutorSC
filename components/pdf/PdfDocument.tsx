'use client'

import type { LangId } from '@/i18n/strings'
import { SECTIONS, CoverIllustration, SectionVisual } from './pdfContent'


/* ═══════════════════════════════════════════════════════════════════
   PDF DOCUMENT
   ═══════════════════════════════════════════════════════════════════ */

export function PdfDocument({ lang }: { lang: LangId }) {
  const s = SECTIONS[lang]

  return (
    <div className="pdf-doc">
      {/* Cover page — dark with abstract illustration (§3 + §3.1) */}
      <div className="pdf-page pdf-cover">
        <div className="pdf-cover-content">
          <span className="pdf-cover-type">{s.docType}</span>
          <h1 className="pdf-cover-title">
            <span className="pdf-cover-i">i</span>
            <span className="pdf-cover-cons">cons</span>
            <span className="pdf-cover-ai">.ai</span>
          </h1>
          <div className="pdf-cover-accent" />
          <h2 className="pdf-cover-product">ai.tutor</h2>
          <p className="pdf-cover-tag">{s.coverTag}</p>
        </div>
        <div className="pdf-cover-illust">
          <CoverIllustration />
        </div>
        <div className="pdf-cover-meta" style={{ whiteSpace: 'pre-line' }}>{s.coverMeta}</div>
        <span className="pdf-cover-url">iconsai.ai/tutor</span>
      </div>

      {/* Section pages — visual-dominant layout (§5.2) */}
      {s.sections.map((sec, i) => (
        <div key={i} className="pdf-page pdf-body">
          <div className="pdf-head">
            <span className="pdf-head-brand">
              <span style={{ color: '#f97316' }}>i</span>cons<span style={{ color: '#ef4444' }}>.ai</span>
              {' '}<span style={{ opacity: 0.4 }}>{'\u00B7'}</span>{' '}tutor
            </span>
            <span className="pdf-head-num">{String(i + 2).padStart(2, '0')}</span>
          </div>
          <div className="pdf-section-label">
            <span className="pdf-section-label-bar" />
            {sec.label}
          </div>
          <h2 className="pdf-section-title">{sec.t}</h2>
          {sec.p.map((paragraph, j) => (
            <p key={j} className="pdf-section-body">{paragraph}</p>
          ))}
          <div className="pdf-section-sep" />
          <div className="pdf-visual-lg">
            <SectionVisual index={i} />
            <div className="pdf-visual-cap">{sec.caption}</div>
          </div>
        </div>
      ))}

      {/* Closing page */}
      <div className="pdf-page pdf-closing">
        <div className="pdf-closing-inner">
          <h2 className="pdf-closing-thanks">{s.closing.thanks}</h2>
          <p className="pdf-closing-brand">
            <span style={{ color: '#f97316' }}>i</span>
            <span>cons</span>
            <span style={{ color: '#ef4444' }}>.ai</span>
          </p>
          <p className="pdf-closing-avail">{s.closing.available}</p>
          <p className="pdf-closing-url">iconsai.ai/tutor</p>
          <p className="pdf-closing-legal">&copy; 2026 IconsAI &middot; Kendall Square &middot; CIC &middot; Cambridge, MA &middot; MIT &middot; Harvard</p>
        </div>
      </div>
    </div>
  )
}
