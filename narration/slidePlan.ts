/**
 * Slide plans for the tutor showcase deck — canonical §6.0 schema (skill showcase).
 * Planning artifact — NOT imported by page.tsx at runtime.
 * One entry per slide; layout drives the §6.3 horizontal redistribution.
 */

export type SlidePlan = {
  id: number
  temaChave: string
  focalSVG: string
  explanation: string
  dataKeys: string[]
  didatica: string
  layout: 'side-by-side' | 'visual-top' | 'visual-left' | 'grid'
  priority: 1 | 2 | 3 | 4 | 5
}

export const SLIDE_PLANS: SlidePlan[] = [
  {
    id: 0,
    temaChave: 'Treinamento tradicional não move produtividade — o ai.tutor publica IA personalizada por funcionário.',
    focalSVG: 'Wordmark ai.tutor full-bleed com perguntas provocativas em cascata',
    explanation: 'Abertura: gancho comercial em 4 perguntas + closer "Não é mágica. É tecnologia."',
    dataKeys: ['5-10% do público aproveitam treinamentos (premissa comercial declarada como provocação)'],
    didatica: 'Provocar a dor (dinheiro gasto, turnover) antes de mostrar a solução.',
    layout: 'visual-top',
    priority: 5,
  },
  {
    id: 1,
    temaChave: 'Uma conta abre todos os apps do ecossistema.',
    focalSVG: 'Card de login CPF/NIF + OTP com anel SSO ligando os apps',
    explanation: 'Sem senha, sem cadastro duplicado — Identity Hub conecta tutor, stats, python, ESG.',
    dataKeys: ['CPF/NIF + SMS via Infobip (mockup ilustrativo, §8.5 tipo 2)'],
    didatica: 'Mostrar que o acesso é a primeira fricção eliminada: entra uma vez, navega tudo.',
    layout: 'side-by-side',
    priority: 4,
  },
  {
    id: 2,
    temaChave: '8 áreas de conhecimento num único dashboard.',
    focalSVG: 'Grid de 8 cards de trilha com destaque roxo "construir minha aplicação"',
    explanation: 'O colaborador vê o progresso de cada trilha; o destaque é onde a história vira app.',
    dataKeys: ['8 trilhas (Estatística, Python, Finanças, ESG, Compliance, IA, BI, Operações)'],
    didatica: 'Orientar o olhar para o card roxo: é ali que começa a jornada do app próprio.',
    layout: 'grid',
    priority: 4,
  },
  {
    id: 3,
    temaChave: 'O aluno fala; a IA transcreve e extrai o que importa.',
    focalSVG: 'Microfone com halos pulsantes + transcript ao vivo + chips de palavras-chave',
    explanation: 'Passo 1: storytelling por voz baixa a barreira de entrada — ninguém precisa saber programar.',
    dataKeys: ['Transcrição em tempo real (claude sonnet 4.6)', 'chips: vendas B2B, industrial, qualificação, leads, automação'],
    didatica: 'Enfatizar que contar uma história de trabalho é o único input exigido.',
    layout: 'side-by-side',
    priority: 5,
  },
  {
    id: 4,
    temaChave: 'A história vira script estruturado, revisável.',
    focalSVG: 'Split: citação original à esquerda, documento de script estruturado à direita',
    explanation: 'Passo 2: nome do agente, ferramentas, fluxo e guardrails — tudo visível antes de avançar.',
    dataKeys: ['4 blocos do script: agente, ferramentas, fluxo, guardrails'],
    didatica: 'Mostrar a transformação voz → estrutura como o "antes e depois" lado a lado.',
    layout: 'side-by-side',
    priority: 4,
  },
  {
    id: 5,
    temaChave: 'Do script nasce o system prompt completo — editável.',
    focalSVG: 'Documento de prompt com seções papel/tom/ferramentas/fluxo + stats de token/modelo/temp',
    explanation: 'Passo 3: o aluno revisa o prompt em linguagem natural antes de publicar.',
    dataKeys: ['1.247 tokens', 'temp 0.3', 'modelo claude sonnet 4.6 (mockup ilustrativo)'],
    didatica: 'Desmistificar o prompt: é texto legível, não código — o aluno tem controle.',
    layout: 'side-by-side',
    priority: 4,
  },
  {
    id: 6,
    temaChave: 'Testar antes de publicar: simulação com score ao vivo.',
    focalSVG: 'Chat agente × lead simulado + painel lateral com controles e score',
    explanation: 'Passo 4: aprova ou refina — nenhum agente vai ao ar sem teste.',
    dataKeys: ['score 8.7/10 (mockup ilustrativo)', 'controles: temperatura, persona, profundidade'],
    didatica: 'Comparar com ensaio geral: o agente enfrenta um cliente fictício antes do real.',
    layout: 'side-by-side',
    priority: 5,
  },
  {
    id: 7,
    temaChave: 'Fluxo visual no-code: 5 blocos conectados ao vivo.',
    focalSVG: 'Canvas com 5 nós ligados: input, CRM lookup, Claude, score Python, output',
    explanation: 'O tool builder mostra como o agente funciona por dentro — sem escrever código.',
    dataKeys: ['5 blocos', 'deploy ready com caminho de URL definido'],
    didatica: 'Ler o fluxo da esquerda para a direita como uma linha de produção.',
    layout: 'visual-top',
    priority: 4,
  },
  {
    id: 8,
    temaChave: 'Leitura guiada: karaokê word-by-word com TTS.',
    focalSVG: 'Texto com palavra acesa em sequência + onda TTS + 3 pills de profundidade',
    explanation: 'Modo treino: cada palavra acende no ritmo da leitura; 3 níveis reescrevem o conteúdo.',
    dataKeys: ['3 níveis: simples, técnico, exercício', 'TTS OpenAI'],
    didatica: 'Mostrar que o conteúdo se adapta ao perfil — não é o aluno que se adapta ao conteúdo.',
    layout: 'side-by-side',
    priority: 3,
  },
  {
    id: 9,
    temaChave: 'Veredito por Python: o LLM nunca avalia.',
    focalSVG: 'Painel de exercício + console Python com grader.py devolvendo pass em 12ms',
    explanation: 'O grader.py roda os testes e devolve pass/fail determinístico com tempo.',
    dataKeys: ['12ms de latência (mockup ilustrativo)', 'pass/fail por código, não por LLM'],
    didatica: 'Diferenciar: IA explica e humaniza; quem corrige é código determinístico.',
    layout: 'side-by-side',
    priority: 4,
  },
  {
    id: 10,
    temaChave: 'Clímax: app publicada em segundos, com URL real.',
    focalSVG: 'Card de publicação com confetti, URL real e métricas ao vivo',
    explanation: 'O colaborador sai com ferramenta funcional — não com certificado de presença.',
    dataKeys: ['23 conversas', '7 leads qualificados', '91% satisfação', '2.3s publicação (mockup ilustrativo)'],
    didatica: 'Contrastar com treinamento tradicional: aqui o resultado é uma app no ar.',
    layout: 'side-by-side',
    priority: 5,
  },
  {
    id: 11,
    temaChave: 'A empresa enxerga o progresso de cada colaborador.',
    focalSVG: 'Tabela de equipe com barras de progresso + KPIs de apps publicadas',
    explanation: 'Visão RH: trilha, apps publicadas e desempenho por pessoa, em tempo real.',
    dataKeys: ['3 apps publicadas', '79% média na trilha', '6 colaboradores (mockup IconsAI, §8.5 tipo 2)'],
    didatica: 'Fechar o loop: o investimento em treinamento vira métrica auditável de produção.',
    layout: 'side-by-side',
    priority: 4,
  },
  {
    id: 12,
    temaChave: 'Obrigado — apresentação disponível em iconsai.ai/tutor.',
    focalSVG: 'Texto "Obrigado." centrado + wordmark icons.ai + URL',
    explanation: 'Fecho canónico §6.12: silêncio elegante, sem CTA agressivo.',
    dataKeys: [],
    didatica: 'Encerrar com a URL para o cliente revisitar o deck.',
    layout: 'visual-top',
    priority: 3,
  },
]
