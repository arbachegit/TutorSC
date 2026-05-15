import type { CanopyScene } from './CanopyIntro'

export const PRODUCT_NAME = 'Icons.ai · ai.tutor'
export const PRODUCT_TAGLINE = 'Tutor educacional dentro do Login Único.'
export const PRODUCT_ACCENT = '#a855f7'
export const CONTINUE_HREF = 'https://learn.iconsai.ai/login'

const HOLD = 14000

export const SCENES: CanopyScene[] = [
  { bg: '#e0d4eb', hero: 'O tutor que aprende com você', mockup: 'prompt', promptText: 'Me explique regra de três com exemplo do dia a dia', hold: HOLD },
  { bg: '#f3ecdc', hero: 'Aulas que se ajustam',          mockup: 'prompt', promptText: 'Quero algo mais difícil — sou de engenharia', hold: HOLD },
  { bg: '#13101a', caption: 'RAG · ABNT · KARAOKÊ · TTS NATIVO', mockup: 'dialog', browserUrl: 'learn.iconsai.ai/aula/regra-de-tres', promptText: 'E se eu errar? Pode reformular o exercício?', hold: HOLD },
  { bg: '#ddd4ec', mockup: 'gallery', browserUrl: 'learn.iconsai.ai/biblioteca', hold: HOLD },
  { bg: '#e0d5ea', mockup: 'deck-export', browserUrl: 'learn.iconsai.ai/certificado', hold: HOLD },
]
