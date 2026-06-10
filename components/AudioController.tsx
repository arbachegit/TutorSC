'use client'

/**
 * AudioController — dock fixo no canto superior-direito.
 * Controlos: (0) Sair, (1) PDF, (2) idioma BR·PT·EN, (3) «Aa», (4) narração.
 */
import { useEffect, useRef, useState } from 'react'
import { useSlideContext } from '@/components/SlideEngine'
import { getReading, type LangId } from '@/components/readingText'

const LANGS: { id: LangId; label: string }[] = [
  { id: 'pt-BR', label: 'BR' },
  { id: 'pt-PT', label: 'PT' },
  { id: 'en', label: 'EN' },
]

const PREFIX = process.env.NODE_ENV === 'production' ? '/tutor' : ''
const EXIT_HREF = 'https://iconsai.ai/intelligenceHub'

function exitToHub(e?: { preventDefault?: () => void }): void {
  const framed = typeof window !== 'undefined' && window.self !== window.top
  if (framed) {
    e && e.preventDefault && e.preventDefault()
    const top = window.top
    try {
      if (top && top.document && top.document.fullscreenElement && top.document.exitFullscreen) {
        top.document.exitFullscreen().catch(() => {
          top.location.href = EXIT_HREF
        })
      } else if (top) {
        top.location.href = EXIT_HREF
      }
    } catch {
      window.location.href = EXIT_HREF
    }
  } else {
    window.location.href = EXIT_HREF
  }
}

function trackUrl(lang: LangId, slide0: number): string {
  // Narration ids = slide index (id 1 = login at index 1); opening (index 0) has no track.
  const nn = String(slide0).padStart(2, '0')
  return `${PREFIX}/narration/${lang}/slide-${nn}.mp3`
}

export function AudioController({
  lang,
  setLang,
}: {
  lang: LangId
  setLang: (l: LangId) => void
}) {
  const { currentSlide } = useSlideContext()
  const [enabled, setEnabled] = useState(false)
  const [reading, setReading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      exitToHub(e)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    if (!enabled) {
      el.pause()
      return
    }
    el.src = trackUrl(lang, currentSlide)
    el.currentTime = 0
    el.play().catch(() => {})
  }, [enabled, lang, currentSlide])

  return (
    <>
      <div className="audio-dock" role="group" aria-label="Narração e leitura">
        <a className="exit-btn" href={EXIT_HREF} onClick={exitToHub} aria-label="Sair para o hub">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Sair</span>
        </a>

        <button
          type="button"
          className="pdf-btn"
          onClick={() => window.print()}
          aria-label="Exportar PDF"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <polyline points="9 15 12 18 15 15" />
          </svg>
          <span>PDF</span>
        </button>

        <div className="lang-select" role="radiogroup" aria-label="Idioma">
          {LANGS.map((l) => (
            <button
              key={l.id}
              type="button"
              className="lang-btn"
              data-active={lang === l.id}
              role="radio"
              aria-checked={lang === l.id}
              onClick={() => setLang(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="reading-btn"
          data-active={reading}
          onClick={() => setReading((v) => !v)}
          aria-pressed={reading}
          aria-label="Leitura do slide"
        >
          Aa
        </button>

        <button
          type="button"
          className="speaker-btn"
          data-active={enabled}
          onClick={() => setEnabled((v) => !v)}
          aria-pressed={enabled}
          aria-label={enabled ? 'Silenciar narração' : 'Ouvir narração'}
        >
          {enabled ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="3 9 7 9 12 4 12 20 7 15 3 15" />
              <path d="M16 8a4 4 0 0 1 0 8" />
              <path d="M18.5 5.5a8 8 0 0 1 0 13" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="3 9 7 9 12 4 12 20 7 15 3 15" />
              <line x1="16" y1="9" x2="22" y2="15" />
              <line x1="22" y1="9" x2="16" y2="15" />
            </svg>
          )}
        </button>
      </div>

      {reading && (
        <div className="reading-panel" role="dialog" aria-label="Leitura do slide">
          <button
            type="button"
            className="reading-close"
            onClick={() => setReading(false)}
            aria-label="Fechar leitura"
          >
            ×
          </button>
          <p className="reading-text">{getReading(lang, currentSlide)}</p>
        </div>
      )}

      <audio ref={audioRef} preload="none" />
    </>
  )
}
