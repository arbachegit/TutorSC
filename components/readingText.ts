/**
 * Fonte única de leitura — partilha os guiões da narração.
 * O painel «Aa» e o TTS leem exatamente o mesmo texto, no mesmo idioma.
 */
import { NARRATION as EN } from '@/narration/script.en'
import { NARRATION as BR } from '@/narration/script.pt-BR'
import { NARRATION as PT } from '@/narration/script.pt-PT'

export type LangId = 'pt-BR' | 'pt-PT' | 'en'

const MAP: Record<LangId, Record<number, string>> = {
  en: EN,
  'pt-BR': BR,
  'pt-PT': PT,
}

export function getReading(lang: LangId, slide0: number): string {
  // Narration ids = slide index (id 1 = login at index 1); opening (index 0) has no narration.
  const raw = MAP[lang]?.[slide0] ?? ''
  return raw
    .replace(/iconsai\.ai barra tutor/gi, 'iconsai.ai/tutor')
    .replace(/iconsai\.ai slash tutor/gi, 'iconsai.ai/tutor')
}
