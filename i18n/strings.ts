/** Conteudo de tela do deck tutor — 3 idiomas. */
export type LangId = 'pt-BR' | 'pt-PT' | 'en'

interface SlideStrings {
  kicker?: string
  title?: string
  body?: string
  [key: string]: string | undefined
}

type DeckStrings = Record<string, SlideStrings>

export const STRINGS: Record<LangId, DeckStrings> = {
  'pt-BR': {
    chrome: {
      kicker: 'SHOWCASE',
      name: 'tutor',
      legal: '(c) 2026 IconsAI * Kendall Square * CIC * Cambridge, MA * MIT * Harvard',
    },
    s0: {
      kicker: 'AI.TUTOR * CONSTRUTOR DE APPS DE IA POR VOZ',
      q1: 'Ja gastou RIOS DE DINHEIRO em treinamentos que nao mudam um centavo da produtividade?',
      q2: 'Notou que servem so pra 5-10% do publico - e o turnover continua alto?',
      q3: 'Quer que o ai.tutor crie a sua aplicacao em IA e publique?',
      q4: 'Cada funcionario sai com IA PERSONALIZADA pra si e pra empresa. Storytelling + Simulacao + Publicacao.',
      closer: 'Conta sua historia. A IA cria o script, o prompt, a ferramenta - e publica.',
      closerStrong: 'Nao e magica. E tecnologia.',
    },
    s12: {
      title: 'Obrigado.',
      body: 'Apresentacao disponivel em',
      url: 'iconsai.ai/tutor',
    },
  },
  'pt-PT': {
    chrome: {
      kicker: 'SHOWCASE',
      name: 'tutor',
      legal: '(c) 2026 IconsAI * Kendall Square * CIC * Cambridge, MA * MIT * Harvard',
    },
    s0: {
      kicker: 'AI.TUTOR * CONSTRUTOR DE APPS DE IA POR VOZ',
      q1: 'Ja gastou rios de dinheiro em formacoes que nao mudam um centimo da produtividade?',
      q2: 'Reparou que servem so para 5-10% do publico - e o turnover continua elevado?',
      q3: 'Quer que o ai.tutor crie a sua aplicacao em IA e publique?',
      q4: 'Cada colaborador sai com IA PERSONALIZADA para si e para a empresa. Storytelling + Simulacao + Publicacao.',
      closer: 'Conte a sua historia. A IA cria o guiao, o prompt, a ferramenta - e publica.',
      closerStrong: 'Nao e magia. E tecnologia.',
    },
    s12: {
      title: 'Obrigado.',
      body: 'Apresentacao disponivel em',
      url: 'iconsai.ai/tutor',
    },
  },
  en: {
    chrome: {
      kicker: 'SHOWCASE',
      name: 'tutor',
      legal: '(c) 2026 IconsAI * Kendall Square * CIC * Cambridge, MA * MIT * Harvard',
    },
    s0: {
      kicker: 'AI.TUTOR * AI APP BUILDER BY VOICE',
      q1: 'Already spent a FORTUNE on training that does not move the productivity needle one cent?',
      q2: 'Noticed it only works for 5-10% of the audience - and turnover stays high?',
      q3: 'Want ai.tutor to build your AI application and publish it?',
      q4: 'Every employee walks out with PERSONALIZED AI for themselves and the company. Storytelling + Simulation + Publishing.',
      closer: 'Tell your story. The AI builds the script, the prompt, the tool - and publishes.',
      closerStrong: 'It is not magic. It is technology.',
    },
    s12: {
      title: 'Thank you.',
      body: 'Presentation available at',
      url: 'iconsai.ai/tutor',
    },
  },
}
