import './pdf.css'
import { SECTIONS, CoverIllustration, SectionVisual } from '@/components/pdf/pdfContent'
import { NARRATION as NARR_BR } from '@/narration/script.pt-BR'
import { NARRATION as NARR_PT } from '@/narration/script.pt-PT'
import { NARRATION as NARR_EN } from '@/narration/script.en'
import { PdfToolbar } from './PdfToolbar'
import type { LangId } from '@/i18n/strings'

const NARR: Record<string, Record<number, string>> = {
  'pt-BR': NARR_BR,
  'pt-PT': NARR_PT,
  en: NARR_EN,
}

const INDEX_TITLE: Record<string, string> = {
  'pt-BR': 'Índice',
  'pt-PT': 'Índice',
  en: 'Contents',
}

const NARRATION_LABEL: Record<string, string> = {
  'pt-BR': 'Narração',
  'pt-PT': 'Narração',
  en: 'Narration',
}

const VALID_LANGS = new Set<string>(['pt-BR', 'pt-PT', 'en'])

export default async function PdfPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: rawLang } = await searchParams
  const lang: LangId = VALID_LANGS.has(rawLang ?? '') ? (rawLang as LangId) : 'pt-BR'
  const s = SECTIONS[lang]
  const narr = NARR[lang] ?? {}
  const totalPages = 2 + s.sections.length + 1 // cover + index + N sections + closing
  const sectionLabels = s.sections.map((sec) => sec.t)

  return (
    <>
      <PdfToolbar lang={lang} totalPages={totalPages} sectionLabels={sectionLabels} />

      <div className="pdfr">
        {/* ── Cover ── */}
        <div className="pdfr-page pdfr-cover">
          <div className="pdfr-cover-content">
            <span className="pdfr-cover-type">{s.docType}</span>
            <h1 className="pdfr-cover-title">
              <span className="pdfr-cover-i">i</span>
              <span className="pdfr-cover-cons">cons</span>
              <span className="pdfr-cover-ai">.ai</span>
            </h1>
            <div className="pdfr-cover-accent" />
            <h2 className="pdfr-cover-product">ai.tutor</h2>
            <p className="pdfr-cover-tag">{s.coverTag}</p>
          </div>
          <div className="pdfr-cover-illust">
            <CoverIllustration />
          </div>
          <div className="pdfr-cover-meta" style={{ whiteSpace: 'pre-line' }}>{s.coverMeta}</div>
          <span className="pdfr-cover-url">iconsai.ai/tutor</span>
        </div>

        {/* ── Index ── */}
        <div className="pdfr-page pdfr-index">
          <div className="pdfr-index-head">
            <span className="pdfr-index-brand">
              <span style={{ color: '#f97316' }}>i</span>cons
              <span style={{ color: '#ef4444' }}>.ai</span>
              {' '}<span style={{ opacity: 0.4 }}>&middot;</span>{' '}tutor
            </span>
            <span className="pdfr-index-num">01</span>
          </div>
          <h2 className="pdfr-index-title">{INDEX_TITLE[lang]}</h2>
          <div className="pdfr-index-bar" />
          <ul className="pdfr-index-list">
            {s.sections.map((sec, i) => (
              <li key={i} className="pdfr-index-item">
                <span className="pdfr-index-item-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pdfr-index-item-title">{sec.t}</span>
                <span className="pdfr-index-item-page">{String(i + 3).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Sections ── */}
        {s.sections.map((sec, i) => {
          const n1 = narr[2 * i + 1] ?? ''
          const n2 = narr[2 * i + 2] ?? ''
          return (
            <div key={i} className="pdfr-page pdfr-section">
              <div className="pdfr-section-head">
                <span className="pdfr-section-brand">
                  <span className="pdfr-section-brand-i">i</span>cons
                  <span className="pdfr-section-brand-ai">.ai</span>
                  {' '}<span style={{ opacity: 0.4 }}>&middot;</span>{' '}tutor
                </span>
                <span className="pdfr-section-num">{String(i + 2).padStart(2, '0')}</span>
              </div>
              <div className="pdfr-section-label">
                <span className="pdfr-section-label-bar" />
                {sec.label}
              </div>
              <h2 className="pdfr-section-title">{sec.t}</h2>
              {sec.p.map((paragraph, j) => (
                <p key={j} className="pdfr-section-body">{paragraph}</p>
              ))}
              <div className="pdfr-section-sep" />
              <div className="pdfr-visual">
                <SectionVisual index={i} />
                <div className="pdfr-visual-cap">{sec.caption}</div>
              </div>
              {(n1 || n2) && (
                <blockquote className="pdfr-narration">
                  <span className="pdfr-narration-label">{NARRATION_LABEL[lang]}</span>
                  {n1}{n1 && n2 ? ' ' : ''}{n2}
                </blockquote>
              )}
            </div>
          )
        })}

        {/* ── Closing ── */}
        <div className="pdfr-page pdfr-closing">
          <div className="pdfr-closing-inner">
            <h2 className="pdfr-closing-thanks">{s.closing.thanks}</h2>
            <p className="pdfr-closing-brand">
              <span style={{ color: '#f97316' }}>i</span>
              <span>cons</span>
              <span style={{ color: '#ef4444' }}>.ai</span>
            </p>
            <p className="pdfr-closing-avail">{s.closing.available}</p>
            <p className="pdfr-closing-url">iconsai.ai/tutor</p>
            <p className="pdfr-closing-legal">
              &copy; 2026 IconsAI &middot; Kendall Square &middot; CIC &middot; Cambridge, MA &middot; MIT &middot; Harvard
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
