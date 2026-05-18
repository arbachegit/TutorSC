'use client'

/**
 * Showcase — Icons.ai · ai.tutor v4 (2026-05-17)
 *
 * Refatorado para usar shell canônico <ShowcaseShell>.
 * Loop infinito 130s.
 *   PART 1 — OPENING (0–22s): wordmark + 4 quotes typewriter + closer.
 *   PART 2 — 11 CENAS (22–130s).
 */

import { useState, type CSSProperties } from 'react'
import { ShowcaseShell, type ShowcaseScene } from './showcase-shell'
import './showcase.css'

const AIT_CYCLE_MS = 130_000

interface AitNavScene {
  startMs: number
  step: string
  label: string
}

const AIT_NAV: AitNavScene[] = [
  { startMs:       0, step: '00', label: 'Abertura' },
  { startMs:  21_190, step: '01', label: 'Login único SSO' },
  { startMs:  30_940, step: '02', label: 'Dashboard 8 áreas' },
  { startMs:  40_820, step: '03', label: 'Storytelling voz' },
  { startMs:  50_570, step: '04', label: 'IA gera SCRIPT' },
  { startMs:  60_320, step: '05', label: 'IA gera PROMPT' },
  { startMs:  70_200, step: '06', label: 'Simulação live' },
  { startMs:  79_950, step: '07', label: 'Tool Builder' },
  { startMs:  89_830, step: '08', label: 'Karaokê + depth' },
  { startMs:  99_580, step: '09', label: 'Exercício Python' },
  { startMs: 109_330, step: '10', label: 'App publicada' },
  { startMs: 119_210, step: '11', label: 'Dashboard RH' },
]

/* ═════════════════════════════════════════════════════════════════════
   HELPERS
   ═════════════════════════════════════════════════════════════════════ */

function AitTw({
  html, startMs, endMs, entryDelayMs, perWordMs, uid, className,
}: {
  html: string; startMs: number; endMs: number; entryDelayMs: number; perWordMs: number; uid: string; className: string
}) {
  const tokens: { kind: 'word' | 'space' | 'html'; v: string }[] = []
  let i = 0
  while (i < html.length) {
    const ch = html[i]
    if (ch === '<') {
      const tagEnd = html.indexOf('>', i)
      if (tagEnd === -1) { tokens.push({ kind: 'word', v: html.slice(i) }); break }
      const tagFull = html.slice(i, tagEnd + 1)
      const m = tagFull.match(/<\s*([a-zA-Z][a-zA-Z0-9]*)/)
      const name = m ? m[1].toLowerCase() : ''
      const selfClosing = /\/\s*>$/.test(tagFull) || ['br', 'img', 'hr'].includes(name)
      if (selfClosing) { tokens.push({ kind: 'html', v: tagFull }); i = tagEnd + 1; continue }
      const closeIdx = html.indexOf(`</${name}>`, tagEnd + 1)
      if (closeIdx === -1) { tokens.push({ kind: 'html', v: tagFull }); i = tagEnd + 1; continue }
      const closeEnd = closeIdx + name.length + 3
      tokens.push({ kind: 'html', v: html.slice(i, closeEnd) })
      i = closeEnd; continue
    }
    if (/\s/.test(ch)) {
      let j = i
      while (j < html.length && /\s/.test(html[j])) j++
      tokens.push({ kind: 'space', v: html.slice(i, j) }); i = j; continue
    }
    let j = i
    while (j < html.length && !/\s/.test(html[j]) && html[j] !== '<') j++
    tokens.push({ kind: 'word', v: html.slice(i, j) }); i = j
  }
  const css: string[] = []
  const spans: React.ReactNode[] = []
  let visibleIdx = 0
  tokens.forEach((tok, k) => {
    if (tok.kind === 'space') { spans.push(<span key={k}>{tok.v}</span>); return }
    const wordOnMs = startMs + entryDelayMs + visibleIdx * perWordMs
    const onPct = (wordOnMs / AIT_CYCLE_MS) * 100
    const onFullPct = Math.min(100, onPct + 0.05)
    const offPct = (endMs / AIT_CYCLE_MS) * 100
    const offFullPct = Math.min(100, offPct + 0.3)
    const prePct = Math.max(0, onPct - 0.001)
    const kfName = `ait-tw-${uid}-${visibleIdx}`
    css.push(`@keyframes ${kfName} {
      0% { opacity: 0; }
      ${prePct.toFixed(4)}% { opacity: 0; }
      ${onPct.toFixed(4)}% { opacity: 0; }
      ${onFullPct.toFixed(4)}% { opacity: 1; }
      ${offPct.toFixed(4)}% { opacity: 1; }
      ${offFullPct.toFixed(4)}% { opacity: 0; }
      100% { opacity: 0; }
    }`)
    spans.push(
      <span key={k} className="ait-tw-word"
        style={{
          animationName: kfName, animationDuration: `${AIT_CYCLE_MS}ms`,
          animationIterationCount: 'infinite', animationTimingFunction: 'linear', animationFillMode: 'both',
        }}
        dangerouslySetInnerHTML={{ __html: tok.v }} />
    )
    visibleIdx++
  })
  const caretOnPct = ((startMs + entryDelayMs) / AIT_CYCLE_MS) * 100
  const caretOffPct = (endMs / AIT_CYCLE_MS) * 100
  const caretKf = `ait-tw-caret-${uid}`
  css.push(`@keyframes ${caretKf} {
    0%, ${Math.max(0, caretOnPct - 0.001).toFixed(4)}% { opacity: 0; }
    ${caretOnPct.toFixed(4)}% { opacity: 1; }
    ${caretOffPct.toFixed(4)}% { opacity: 1; }
    ${Math.min(100, caretOffPct + 0.05).toFixed(4)}%, 100% { opacity: 0; }
  }`)
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css.join('\n') }} />
      <span className={className}>
        {spans}
        <span className="ait-tw-caret" aria-hidden="true"
          style={{
            animationName: caretKf, animationDuration: `${AIT_CYCLE_MS}ms`,
            animationIterationCount: 'infinite', animationTimingFunction: 'linear', animationFillMode: 'both',
          }}>▌</span>
      </span>
    </>
  )
}

function Topbar({ role, name, pillText, pillKind }: {
  role: 'student' | 'corp'; name: string; pillText: string; pillKind: 'cy' | 'or' | 'gn' | 'pr'
}) {
  const pillClass = pillKind === 'or' ? 'ait-pill--corp'
                  : pillKind === 'gn' ? 'ait-pill--gn'
                  : pillKind === 'pr' ? 'ait-pill--pr' : ''
  const markClass = role === 'corp' ? 'ait-brand-mark--corp' : ''
  return (
    <div className="ait-topbar">
      <div className="ait-brand">
        <span className={`ait-brand-mark ${markClass}`}>{role === 'corp' ? 'RH' : 'i.ai'}</span>
        <span className="ait-brand-sep" />
        <span className="ait-brand-name" dangerouslySetInnerHTML={{ __html: name }} />
      </div>
      <span className={`ait-pill ${pillClass}`} dangerouslySetInnerHTML={{ __html: pillText }} />
    </div>
  )
}

function Icon({ name }: { name: 'book' | 'settings' }) {
  if (name === 'book') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  }
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

/* Chrome de browser fake — usado por cada cena product. */
function MiniChrome({ host, path }: { host: string; path: string }) {
  return (
    <div className="ait-chrome ait-chrome--mini">
      <div className="ait-chrome-dots"><span /><span /><span /></div>
      <div className="ait-url-wrap">
        <div className="u-scene is-visible">
          <span className="u-lock">🔒</span>
          <span className="u-host">{host}</span>
          <span className="u-path">{path}</span>
        </div>
      </div>
    </div>
  )
}

/* ═════════════════════════════════════════════════════════════════════
   DATA
   ═════════════════════════════════════════════════════════════════════ */

const URLS: { host: string; path: string }[] = [
  { host: 'learn.iconsai.ai', path: '/login' },
  { host: 'learn.iconsai.ai', path: '/dashboard' },
  { host: 'learn.iconsai.ai', path: '/build/story' },
  { host: 'learn.iconsai.ai', path: '/build/script' },
  { host: 'learn.iconsai.ai', path: '/build/prompt' },
  { host: 'learn.iconsai.ai', path: '/build/simulate' },
  { host: 'learn.iconsai.ai', path: '/build/flow' },
  { host: 'learn.iconsai.ai', path: '/training/lead-reading' },
  { host: 'learn.iconsai.ai', path: '/training/lead-reading/exercise' },
  { host: 'apps.iconsai.ai',  path: '/qualificador-leads-magisatech' },
  { host: 'learn.iconsai.ai', path: '/company/magisatech/lgpd' },
]

const STUDENT_CARDS: { id: string; title: string; desc: string; accent: string; glyph: string; pct: number; highlight?: boolean }[] = [
  { id: 'stats',   title: 'Estatística', desc: '73 modelos com aulas interativas.', accent: '#22d3ee', glyph: 'σ',  pct: 67 },
  { id: 'python',  title: 'Python',      desc: 'Notebooks e tutoriais.',            accent: '#b88d06', glyph: '>_', pct: 73 },
  { id: 'finance', title: 'Finanças',    desc: 'Modelos, projeções, análise.',      accent: '#14b8a6', glyph: '$',  pct: 38 },
  { id: 'esg',     title: 'ESG',         desc: 'Indicadores e sustentabilidade.',   accent: '#1daa51', glyph: '◐',  pct: 55 },
  { id: 'comp',    title: 'Compliance',  desc: 'LGPD, SOX, ISO · trilhas.',         accent: '#3b82f6', glyph: '§',  pct: 49 },
  { id: 'ia',      title: 'IA · Construir minha aplicação', desc: 'Conte sua história. A IA cria a app.', accent: '#a855f7', glyph: '✦', pct: 0, highlight: true },
  { id: 'bi',      title: 'BI',          desc: 'Dashboards e exploração.',          accent: '#ec4899', glyph: '▦',  pct: 22 },
  { id: 'ops',     title: 'Operações',   desc: 'Processos e SOPs internas.',        accent: '#fb923c', glyph: '⚙',  pct: 41 },
]

type StudentCardId = (typeof STUDENT_CARDS)[number]['id']

const STUDENT_CARD_DETAILS: Record<StudentCardId, {
  stage: string
  owner: string
  headline: string
  outputs: string[]
  flow: string[]
  metrics: [string, string][]
}> = {
  stats: {
    stage: 'trilha ativa · estatística',
    owner: 'laboratório quantitativo',
    headline: 'Modelos guiados, variáveis explicadas e exercícios graduais com feedback automático.',
    outputs: ['aulas interativas', 'simulações', 'datasets'],
    flow: ['Escolhe modelo', 'Assiste visualização', 'Resolve exercício'],
    metrics: [['módulos', '73'], ['exercícios', '214'], ['retenção', '82%']],
  },
  python: {
    stage: 'trilha ativa · python',
    owner: 'ambiente prático',
    headline: 'Notebooks curtos com inputs reais, validação por teste e comparação entre solução humana e agent.',
    outputs: ['notebooks', 'grader', 'snippets'],
    flow: ['Lê problema', 'Executa código', 'Recebe veredito'],
    metrics: [['notebooks', '18'], ['tests', '96'], ['latência', '14ms']],
  },
  finance: {
    stage: 'trilha ativa · finanças',
    owner: 'squad financeiro',
    headline: 'Projeções, cenários e agentes que explicam impacto de caixa para usuário não técnico.',
    outputs: ['cenários', 'dashboards', 'planos'],
    flow: ['Seleciona cenário', 'Ajusta premissas', 'Publica visão executiva'],
    metrics: [['cenários', '12'], ['premissas', '48'], ['cobertura', '91%']],
  },
  esg: {
    stage: 'trilha ativa · esg',
    owner: 'governança',
    headline: 'Indicadores ambientais e sociais cruzados com storytelling para apresentação a conselho.',
    outputs: ['indicadores', 'narrativas', 'planos de ação'],
    flow: ['Importa indicador', 'Analisa risco', 'Compartilha plano'],
    metrics: [['indicadores', '64'], ['ações', '23'], ['engajamento', '76%']],
  },
  comp: {
    stage: 'trilha ativa · compliance',
    owner: 'jurídico + risco',
    headline: 'Trilhas de LGPD, SOX e ISO com evidência versionada e app final por colaborador.',
    outputs: ['checklists', 'políticas', 'apps internas'],
    flow: ['Escolhe norma', 'Conta processo', 'Publica agente'],
    metrics: [['normas', '9'], ['artefatos', '38'], ['aderência', '88%']],
  },
  ia: {
    stage: 'trilha ativa · construir minha aplicação',
    owner: 'builder workspace',
    headline: 'Fluxo completo de história → script → prompt → simulação → app publicada, sem sair da plataforma.',
    outputs: ['script', 'prompt', 'app publicada'],
    flow: ['Conta a história', 'Refina o agent', 'Publica o app'],
    metrics: [['passos', '4'], ['tempo médio', '7 min'], ['conversão', '63%']],
  },
  bi: {
    stage: 'trilha ativa · BI',
    owner: 'analytics studio',
    headline: 'Dashboards navegáveis com explicação em linguagem natural para cada insight crítico.',
    outputs: ['dashboards', 'insights', 'alertas'],
    flow: ['Escolhe base', 'Explora insight', 'Compartilha painel'],
    metrics: [['dashboards', '11'], ['insights', '57'], ['alertas', '19']],
  },
  ops: {
    stage: 'trilha ativa · operações',
    owner: 'time de processos',
    headline: 'SOPs, fluxos e simulações de gargalo para times de fábrica, logística e atendimento.',
    outputs: ['SOPs', 'playbooks', 'simulações'],
    flow: ['Mapeia gargalo', 'Prioriza ação', 'Roda simulação'],
    metrics: [['processos', '31'], ['playbooks', '17'], ['gargalos', '8']],
  },
}

const STAFF: { name: string; role: string; pct: number; app: string }[] = [
  { name: 'Ana Ribeiro',    role: 'Gestor RH',  pct: 100, app: 'Triagem de candidatos' },
  { name: 'Bruno Castanho', role: 'Fiscal',     pct: 85,  app: 'Triagem de NF fiscal' },
  { name: 'Camila Duarte',  role: 'Compras',    pct: 100, app: 'Cotação automática' },
  { name: 'Diego Marques',  role: 'TI',         pct: 60,  app: 'Help-desk N1' },
  { name: 'Elisa Andrade',  role: 'Jurídico',   pct: 72,  app: 'Revisor de contratos' },
  { name: 'Felipe Souza',   role: 'Op. fábrica', pct: 32, app: 'Checklist NR-12' },
]

/* Captions por cena pro typewriter no rodapé */
const CAPTIONS: { role: 'student' | 'corp' | 'climax'; tag: string; title: string; caption: string }[] = [
  { role: 'student', tag: 'login único · SSO', title: 'Login único no Identity Hub', caption: 'CPF + SMS via Infobip. Uma conta entra em todos os apps do ecossistema iconsai.' },
  { role: 'student', tag: 'dashboard · 8 áreas', title: 'Escolha sua área', caption: '8 trilhas disponíveis. <strong>IA · Construir minha aplicação</strong> destacada em roxo.' },
  { role: 'student', tag: 'storytelling', title: 'Conte sua história em voz alta', caption: '<strong>PROTAGONISTA #1.</strong> Você fala, a IA escuta e transcreve em tempo real.' },
  { role: 'student', tag: 'IA gera SCRIPT', title: 'Da história sai o script', caption: 'Story → agent name → tools → flow → guardrails. Estrutura completa.' },
  { role: 'student', tag: 'IA gera PROMPT', title: 'System prompt do agent', caption: '1.247 tokens, claude-sonnet-4-6. Prompt natural-language com role, tone, tools e flow.' },
  { role: 'student', tag: 'simulação', title: 'Testa antes de publicar', caption: '<strong>PROTAGONISTA #2.</strong> Seu agent conversa com lead simulado. Score 8.7/10.' },
  { role: 'student', tag: 'tool builder', title: 'Fluxo visual no-code', caption: 'Drag-drop dos blocos: input, CRM, Claude, score Python, output. Deploy ready.' },
  { role: 'student', tag: 'karaokê + depth', title: 'Modo treinamento', caption: 'Karaokê word-by-word com TTS OpenAI. Pills Simples/Técnico/Exercício.' },
  { role: 'student', tag: 'exercício Python', title: 'Veredito por Python', caption: 'Cálculo de score do lead. Python no back devolve PASS/FAIL com erro numérico.' },
  { role: 'climax', tag: '🚀 APP PUBLICADA', title: 'Aplicação publicada em produção', caption: '<strong>CLIMAX.</strong> URL real apps.iconsai.ai. 23 conversas, 7 qualificados, 91%.' },
  { role: 'corp', tag: 'empresa · MagisaTech', title: 'RH MagisaTech · apps por colaborador', caption: 'Trilha LGPD com 6 colaboradores. Cada um saiu com sua própria app de IA.' },
]

function CapFor({ index }: { index: number }) {
  const i = index - 1
  const c = CAPTIONS[i]
  if (!c) return null
  const startMs = AIT_NAV[index].startMs
  const endMs = (index + 1 < AIT_NAV.length ? AIT_NAV[index + 1].startMs : AIT_CYCLE_MS) - 100
  const TITLE_ENTRY = 600
  const TITLE_TW = 1600
  const DESC_ENTRY = TITLE_ENTRY + TITLE_TW + 200
  const titleWordCount = c.title.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length
  const descWordCount = c.caption.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length
  const titlePerWord = Math.min(140, TITLE_TW / Math.max(1, titleWordCount))
  const descPerWord = Math.min(110, 2600 / Math.max(1, descWordCount))
  return (
    <footer className="ait-caption">
      <div className="ait-cap is-active">
        <span className={`ait-cap-role ait-cap-role--${c.role}`}>
          {c.role === 'student' ? 'Aluno' : c.role === 'corp' ? 'Empresa' : 'Climax'}
        </span>
        <span className="ait-cap-num">{String(index).padStart(2, '0')} / 11</span>
        <AitTw html={c.title} startMs={startMs} endMs={endMs} entryDelayMs={TITLE_ENTRY} perWordMs={titlePerWord} uid={`t${index}`} className="ait-cap-title" />
        <AitTw html={c.caption} startMs={startMs} endMs={endMs} entryDelayMs={DESC_ENTRY} perWordMs={descPerWord} uid={`d${index}`} className="ait-cap-text" />
      </div>
    </footer>
  )
}

/* ═════════════════════════════════════════════════════════════════════
   SCENE RENDERERS
   ═════════════════════════════════════════════════════════════════════ */

function RenderOpening() {
  return (
    <section className="ait-opening" aria-label="Opening">
      <div className="ait-op-kicker">
        <span className="ait-op-dot" /> AI.TUTOR · CONSTRUTOR DE APPS DE IA POR VOZ
      </div>
      <h1 className="ait-op-wordmark">ai.tutor</h1>
      <div className="ait-op-quotes" aria-hidden>
        <p className="ait-op-q ait-op-q--1">
          <span className="tw">Já gastou <span className="hl-money">RIOS DE DINHEIRO</span> em treinamentos que não mudam um centavo da produtividade?</span>
        </p>
        <p className="ait-op-q ait-op-q--2">
          <span className="tw">Notou que servem só pra 5–10% do público — e o turnover continua alto?</span>
        </p>
        <p className="ait-op-q ait-op-q--3">
          <span className="tw">Quer que o <span className="hl-key">ai.tutor crie a sua aplicação em IA e publique</span>?</span>
        </p>
        <p className="ait-op-q ait-op-q--4">
          <span className="tw">Cada funcionário sai com IA PERSONALIZADA pra si e pra empresa. Storytelling + Simulação + Publicação.</span>
        </p>
      </div>
      <div className="ait-op-closer" aria-hidden>
        <p>
          Conta sua história. A IA cria o script, o prompt, a ferramenta — e publica.<br />
          <strong>Não é mágica. É tecnologia.</strong>
        </p>
      </div>
    </section>
  )
}

function SceneWrap({ index, children }: { index: number; children: React.ReactNode }) {
  const url = URLS[index - 1]
  return (
    <div className="ait-cinema">
      <MiniChrome host={url.host} path={url.path} />
      <div className="ait-stage-area">
        <article className={`ait-scene ait-scene--s${index} is-static`}>{children}</article>
      </div>
      <CapFor index={index} />
    </div>
  )
}

function RenderS1() {
  return (
    <SceneWrap index={1}>
      <Topbar role="student" name="ai.tutor · Login Único" pillKind="cy" pillText="learn.iconsai.ai" />
      <div className="ait-login">
        <div className="ait-login-card">
          <div className="ait-login-head">
            <span className="ait-login-icon" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <div className="ait-login-title">Entrar no ecossistema</div>
          </div>
          <div className="ait-field"><label className="ait-field-label">CPF</label><div className="ait-field-input">123.456.789-00</div></div>
          <div className="ait-field">
            <label className="ait-field-label">Código SMS</label>
            <div className="ait-field-input ait-field-input--typing">
              <span className="ait-otp"><i>4</i><i>8</i><i>2</i><i>1</i><i>5</i><i className="ait-otp-cur">9</i></span>
            </div>
          </div>
          <button className="ait-login-btn" type="button">Entrar via Identity Hub</button>
          <div className="ait-sso-ring">
            <span className="ait-sso-node ait-sso-node--a">tutor</span>
            <span className="ait-sso-node ait-sso-node--b">stats</span>
            <span className="ait-sso-node ait-sso-node--c">python</span>
            <span className="ait-sso-node ait-sso-node--d">esg</span>
            <span className="ait-sso-line" />
          </div>
          <div className="ait-login-foot">Identity Hub · <strong>MagisaTech</strong> · 1 conta, todos os apps</div>
        </div>
      </div>
    </SceneWrap>
  )
}

function RenderS2() {
  const [selected, setSelected] = useState<StudentCardId>('ia')
  const card = STUDENT_CARDS.find((item) => item.id === selected) ?? STUDENT_CARDS[0]
  const detail = STUDENT_CARD_DETAILS[selected]
  return (
    <SceneWrap index={2}>
      <Topbar role="student" name="ai.tutor · Minhas trilhas" pillKind="cy" pillText="ana.ribeiro · MagisaTech" />
      <div className="ait-tabs">
        <span className="ait-tab ait-tab--on"><Icon name="book" /> Áreas disponíveis</span>
        <span className="ait-tab"><Icon name="settings" /> Minhas apps publicadas</span>
      </div>
      <div className="ait-cards-shell">
        <div className="ait-cards ait-cards-grid">
          {STUDENT_CARDS.map((c) => {
            const isSelected = c.id === selected
            return (
              <button
                key={c.id}
                type="button"
                className={`ait-card ait-card-button ${c.highlight ? 'ait-card--hl' : ''}${isSelected ? ' ait-card--selected' : ''}`}
                style={{ ['--accent' as string]: c.accent, ['--pct' as string]: `${c.pct}%` } as CSSProperties}
                onClick={() => setSelected(c.id)}
                aria-pressed={isSelected}
              >
                <div className="ait-card-glow" />
                <div className="ait-card-ic" aria-hidden>{c.glyph}</div>
                <div className="ait-card-title">{c.title}</div>
                <div className="ait-card-desc">{c.desc}</div>
                <div className="ait-card-foot">
                  <div className="ait-bar"><div className="ait-bar-fill" /></div>
                  <span className="ait-card-pct">{c.pct}%</span>
                </div>
                {c.highlight && <div className="ait-card-cursor" aria-hidden />}
              </button>
            )
          })}
        </div>

        <aside className="ait-track-preview" style={{ ['--accent' as string]: card.accent } as CSSProperties}>
          <div className="ait-track-preview-head">
            <span className="ait-track-preview-kicker">{detail.stage}</span>
            <span className="ait-track-preview-owner">{detail.owner}</span>
          </div>
          <div className="ait-track-preview-title">{card.title}</div>
          <p className="ait-track-preview-copy">{detail.headline}</p>

          <div className="ait-track-preview-stats">
            {detail.metrics.map(([label, value]) => (
              <div key={label} className="ait-track-stat">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="ait-track-preview-block">
            <div className="ait-track-preview-label">outputs esperados</div>
            <div className="ait-track-preview-chips">
              {detail.outputs.map((item) => (
                <span key={item} className="ait-track-chip">{item}</span>
              ))}
            </div>
          </div>

          <div className="ait-track-preview-block">
            <div className="ait-track-preview-label">microfluxo da trilha</div>
            <div className="ait-track-flow">
              {detail.flow.map((item, idx) => (
                <div key={item} className="ait-track-flow-row">
                  <span className="ait-track-flow-step">{idx + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ait-track-preview-foot">
            <span className="ait-track-preview-live-dot" />
            clique em outra área para simular a troca de contexto do aluno
          </div>
        </aside>
      </div>
    </SceneWrap>
  )
}

function RenderS3() {
  return (
    <SceneWrap index={3}>
      <Topbar role="student" name="ai.tutor · Conte sua história" pillKind="pr" pillText="passo 1 / 4 · gravando" />
      <div className="ait-story">
        <div className="ait-story-left">
          <div className="ait-story-mic-wrap">
            <div className="ait-story-mic-halo" />
            <div className="ait-story-mic-halo ait-story-mic-halo--2" />
            <div className="ait-story-mic-halo ait-story-mic-halo--3" />
            <div className="ait-story-mic">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </div>
          </div>
          <div className="ait-story-wave" aria-hidden>
            {Array.from({ length: 20 }).map((_, i) => <i key={i} />)}
          </div>
          <div className="ait-story-rec"><span className="ait-story-rec-dot" /> REC · 00:14</div>
        </div>
        <div className="ait-story-right">
          <div className="ait-story-h">
            <span className="ait-story-h-k">transcrição ao vivo</span>
            <span className="ait-story-h-tag">claude-sonnet-4-6 · pt-BR</span>
          </div>
          <div className="ait-story-transcript">
            <span className="st w1">Eu</span>{' '}<span className="st w2">trabalho</span>{' '}<span className="st w3">com</span>{' '}
            <span className="st w4 st--em">vendas B2B</span>{' '}<span className="st w5">no setor</span>{' '}
            <span className="st w6 st--em">industrial</span>.{' '}<span className="st w7">Cada cliente</span>{' '}
            <span className="st w8">me faz</span>{' '}<span className="st w9">as mesmas</span>{' '}
            <span className="st w10 st--em">5 perguntas</span>{' '}<span className="st w11">no início do funil.</span>{' '}
            <span className="st w12">Queria</span>{' '}<span className="st w13 st--em">automatizar isso</span>{' '}
            <span className="st w14">pra</span>{' '}<span className="st w15 st--em">qualificar leads</span>{' '}
            <span className="st w16">mais rápido</span>...<span className="st-cursor" />
          </div>
          <div className="ait-story-chips">
            <span className="ait-story-chip ait-story-chip--c1">vendas B2B</span>
            <span className="ait-story-chip ait-story-chip--c2">industrial</span>
            <span className="ait-story-chip ait-story-chip--c3">qualificação</span>
            <span className="ait-story-chip ait-story-chip--c4">leads</span>
            <span className="ait-story-chip ait-story-chip--c5">automação</span>
          </div>
        </div>
      </div>
    </SceneWrap>
  )
}

function RenderS4() {
  return (
    <SceneWrap index={4}>
      <Topbar role="student" name="ai.tutor · Gerando script" pillKind="pr" pillText="passo 2 / 4 · estruturando" />
      <div className="ait-script">
        <div className="ait-script-left">
          <div className="ait-script-h"><span className="ait-script-h-k">sua história</span></div>
          <div className="ait-script-quote">
            &ldquo;Eu trabalho com <em>vendas B2B</em> no setor <em>industrial</em>. Cada cliente me faz as mesmas <em>5 perguntas</em> no início do funil. Queria <em>automatizar</em> isso pra <em>qualificar leads</em> mais rápido...&rdquo;
          </div>
        </div>
        <div className="ait-script-right">
          <div className="ait-script-h">
            <span className="ait-script-h-k">script estruturado</span>
            <span className="ait-script-h-stat"><span className="ait-script-h-dot" /> Generating script...</span>
          </div>
          <div className="ait-script-doc">
            <div className="ait-script-line ait-script-l--1"><span className="sk">STORY</span><span className="sv">→ Vendas B2B industrial</span></div>
            <div className="ait-script-line ait-script-l--2"><span className="sk">AGENT NAME</span><span className="sv">→ Qualificador de Leads</span></div>
            <div className="ait-script-line ait-script-l--3"><span className="sk">TOOLS</span><span className="sv">→ CRM lookup · CNPJ enrichment · Email</span></div>
            <div className="ait-script-line ait-script-l--4">
              <span className="sk">FLOW</span>
              <span className="sv">
                <span className="sf">1. Saúda</span><span className="sf">2. Pergunta pain points</span>
                <span className="sf">3. Calcula score</span><span className="sf">4. Roteia</span>
              </span>
            </div>
            <div className="ait-script-line ait-script-l--5"><span className="sk">GUARDRAILS</span><span className="sv">→ Não promete prazo · Não cita preço</span></div>
            <div className="ait-script-line ait-script-l--6 ait-script-line--ok"><span className="sk">STATUS</span><span className="sv">→ Script gerado <span className="sok">✓</span></span></div>
          </div>
        </div>
      </div>
    </SceneWrap>
  )
}

function RenderS5() {
  return (
    <SceneWrap index={5}>
      <Topbar role="student" name="ai.tutor · System prompt" pillKind="pr" pillText="passo 3 / 4 · promptando" />
      <div className="ait-prompt">
        <div className="ait-prompt-h">
          <div>
            <div className="ait-prompt-h-t">System prompt do agent</div>
            <div className="ait-prompt-h-sub">Gerado a partir do script · revisável antes de publicar</div>
          </div>
          <div className="ait-prompt-stats">
            <div className="ait-prompt-stat"><span className="ait-prompt-stat-k">tokens</span><span className="ait-prompt-stat-v">1.247</span></div>
            <div className="ait-prompt-stat"><span className="ait-prompt-stat-k">model</span><span className="ait-prompt-stat-v ait-prompt-stat-v--cy">claude-sonnet-4-6</span></div>
            <div className="ait-prompt-stat"><span className="ait-prompt-stat-k">temp</span><span className="ait-prompt-stat-v ait-prompt-stat-v--or">0.3</span></div>
          </div>
        </div>
        <div className="ait-prompt-doc">
          <p className="pp pp--1"><span className="pp-tag">/* role */</span> Você é <em>Qualificador de Leads</em> da MagisaTech, especialista em vendas B2B industriais. Seu trabalho é conversar com leads, entender porte da empresa, dor e orçamento, e atribuir score 0–10.</p>
          <p className="pp pp--2"><span className="pp-tag">/* tone */</span> Formal mas direto. Sem jargões. Faz uma pergunta por vez. Não promete prazo. Não cita preço — isso vai pra equipe comercial humana.</p>
          <p className="pp pp--3"><span className="pp-tag">/* tools */</span> Tem acesso a: <code>crm.lookup(cnpj)</code>, <code>cnpj.enrich(cnpj)</code>, <code>email.send(to, body)</code>.</p>
          <p className="pp pp--4"><span className="pp-tag">/* flow */</span> Sempre: 1) saudação, 2) pergunta CNPJ, 3) enriquece, 4) pergunta dor, 5) calcula score, 6) se score ≥ 7 marca reunião, senão envia material.</p>
          <p className="pp pp--5 pp--ok"><span className="pp-tag">/* status */</span> <span className="pok">✓ Prompt gerado</span> · revisão do usuário liberada.</p>
        </div>
      </div>
    </SceneWrap>
  )
}

function RenderS6() {
  return (
    <SceneWrap index={6}>
      <Topbar role="student" name="ai.tutor · Simulação" pillKind="pr" pillText="passo 4 / 4 · testando antes de publicar" />
      <div className="ait-sim2">
        <div className="ait-sim2-chat">
          <div className="ait-sim2-chat-h">
            <span className="ait-sim2-chat-h-t">Simulação · lead NPC vs seu agent</span>
            <span className="ait-sim2-chat-h-score">score: <span className="ait-sim2-score">8.7</span> / 10</span>
          </div>
          <div className="ait-sim2-msgs">
            <div className="ait-sim2-msg ait-sim2-msg--lead ait-sim2-m--1">
              <span className="ait-sim2-msg-who">lead simulado</span>
              <span className="ait-sim2-msg-body">Tenho uma indústria de embalagens, 80 funcionários em Guarulhos.</span>
            </div>
            <div className="ait-sim2-msg ait-sim2-msg--agent ait-sim2-m--2">
              <span className="ait-sim2-msg-who">seu agent</span>
              <span className="ait-sim2-msg-body">Entendo. Vocês exportam ou só mercado interno? Qual o volume mensal?</span>
            </div>
            <div className="ait-sim2-msg ait-sim2-msg--lead ait-sim2-m--3">
              <span className="ait-sim2-msg-who">lead simulado</span>
              <span className="ait-sim2-msg-body">90% interno. Cerca de 1.200 pedidos/mês. Queríamos automatizar a triagem inicial.</span>
            </div>
            <div className="ait-sim2-msg ait-sim2-msg--agent ait-sim2-m--4">
              <span className="ait-sim2-msg-who">seu agent</span>
              <span className="ait-sim2-msg-body">Volume relevante. <em className="ait-sim2-rewrite">Qual a maior dor hoje:</em> tempo de resposta, perda de pedido, ou qualificação?</span>
            </div>
          </div>
        </div>
        <div className="ait-sim2-side">
          <div className="ait-sim2-side-h">controles ao vivo</div>
          <div className="ait-sim2-slider">
            <div className="ait-sim2-slider-h"><span className="ait-sim2-slider-k">temperatura</span><span className="ait-sim2-slider-v ait-sim2-slider-v--cy">0.42</span></div>
            <div className="ait-sim2-track"><div className="ait-sim2-track-fill ait-sim2-track-fill--a" /><span className="ait-sim2-thumb ait-sim2-thumb--a" /></div>
          </div>
          <div className="ait-sim2-slider">
            <div className="ait-sim2-slider-h"><span className="ait-sim2-slider-k">persona</span><span className="ait-sim2-slider-v ait-sim2-slider-v--pr">formal</span></div>
            <div className="ait-sim2-track"><div className="ait-sim2-track-fill ait-sim2-track-fill--b" /><span className="ait-sim2-thumb ait-sim2-thumb--b" /></div>
          </div>
          <div className="ait-sim2-slider">
            <div className="ait-sim2-slider-h"><span className="ait-sim2-slider-k">profundidade técnica</span><span className="ait-sim2-slider-v ait-sim2-slider-v--or">média</span></div>
            <div className="ait-sim2-track"><div className="ait-sim2-track-fill ait-sim2-track-fill--c" /><span className="ait-sim2-thumb ait-sim2-thumb--c" /></div>
          </div>
          <div className="ait-sim2-out">
            <div className="ait-sim2-out-row"><span className="ait-sim2-out-k">outcome</span><span className="ait-sim2-out-v ait-sim2-out-v--gn">Qualificado</span></div>
            <div className="ait-sim2-out-row"><span className="ait-sim2-out-k">próxima ação</span><span className="ait-sim2-out-v">marcar reunião</span></div>
          </div>
          <div className="ait-sim2-actions">
            <button className="ait-sim2-btn ait-sim2-btn--ghost" type="button">Refinar</button>
            <button className="ait-sim2-btn ait-sim2-btn--primary" type="button">Aprovar →</button>
          </div>
        </div>
      </div>
    </SceneWrap>
  )
}

function RenderS7() {
  return (
    <SceneWrap index={7}>
      <Topbar role="student" name="ai.tutor · Tool builder" pillKind="cy" pillText="no-code · drag-drop" />
      <div className="ait-tool-wrap">
        <div className="ait-tool-side">
          <div className="ait-tool-side-h">Blocos</div>
          <span className="ait-tool-block ait-tool-block--i">📥 Input</span>
          <span className="ait-tool-block ait-tool-block--r">🔍 CRM lookup</span>
          <span className="ait-tool-block ait-tool-block--l">🧠 Claude</span>
          <span className="ait-tool-block ait-tool-block--v">✅ Score Python</span>
          <span className="ait-tool-block ait-tool-block--o">📤 Output</span>
        </div>
        <div className="ait-tool-canvas">
          <div className="ait-tool-canvas-h">
            <span className="ait-tool-canvas-h-t">Fluxo: Qualificador de Leads</span>
            <span className="ait-tool-canvas-h-tag">snap-to-grid · conexões ao vivo</span>
          </div>
          <div className="ait-tool-flow">
            <div className="ait-node ait-node--i" style={{ left: '5%', top: '32%' }}><span className="ait-node-k">input</span><span className="ait-node-t">CNPJ + dor</span></div>
            <div className="ait-node ait-node--r" style={{ left: '28%', top: '14%' }}><span className="ait-node-k">tool</span><span className="ait-node-t">CRM lookup</span></div>
            <div className="ait-node ait-node--l" style={{ left: '50%', top: '32%' }}><span className="ait-node-k">llm</span><span className="ait-node-t">claude-sonnet-4-6</span></div>
            <div className="ait-node ait-node--v" style={{ left: '28%', top: '60%' }}><span className="ait-node-k">python</span><span className="ait-node-t">score 0–10</span></div>
            <div className="ait-node ait-node--o" style={{ left: '74%', top: '42%' }}><span className="ait-node-k">output</span><span className="ait-node-t">roteia comercial</span></div>
            <svg className="ait-tool-svg" viewBox="0 0 1000 460" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="lk1" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path className="ait-tool-link l1" d="M 110 175 C 240 90, 290 90, 320 90" stroke="url(#lk1)" strokeWidth="2" fill="none" />
              <path className="ait-tool-link l2" d="M 460 110 C 530 110, 540 160, 540 175" stroke="url(#lk1)" strokeWidth="2" fill="none" />
              <path className="ait-tool-link l3" d="M 110 190 C 200 260, 240 280, 290 290" stroke="url(#lk1)" strokeWidth="2" fill="none" />
              <path className="ait-tool-link l4" d="M 430 290 C 480 260, 520 220, 540 200" stroke="url(#lk1)" strokeWidth="2" fill="none" />
              <path className="ait-tool-link l5" d="M 660 195 C 700 200, 720 215, 760 220" stroke="url(#lk1)" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="ait-tool-foot">
            <span className="ait-tool-foot-k">deploy ready</span>
            <span className="ait-tool-foot-v">/apps/qualificador-leads-magisatech</span>
            <span className="ait-tool-foot-tag">válida pra empresa</span>
          </div>
        </div>
      </div>
    </SceneWrap>
  )
}

function RenderS8() {
  return (
    <SceneWrap index={8}>
      <Topbar role="student" name="modo treinamento · karaokê" pillKind="pr" pillText="Tutor ai.t lendo em voz" />
      <div className="ait-lesson-view">
        <div className="ait-lesson-head">
          <div>
            <div className="ait-lesson-h-title">Como ler bem um lead industrial</div>
            <div className="ait-lesson-h-sub">karaokê word-by-word · gpt-4o-mini-tts</div>
          </div>
          <div className="ait-tts-bar">
            <span className="ait-tts-btn ait-tts-btn--pulse" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <div className="ait-tts-wave" aria-hidden>
              {Array.from({ length: 12 }).map((_, i) => <i key={i} />)}
            </div>
            <span className="ait-tts-label"><span className="ait-tts-rec-dot" aria-hidden /> Lendo em voz alta…</span>
          </div>
        </div>
        <div className="ait-karaoke">
          <span className="k k1">Um lead industrial bom</span>{' '}
          <span className="k k2">tem CNPJ ativo,</span>{' '}
          <span className="k k3">CNAE coerente,</span>{' '}
          <span className="k k4">QSA estável</span>{' '}
          <span className="k k5">e dor mensurável.</span>{' '}
          <span className="k k6">Se faltar um,</span>{' '}
          <span className="k k7">o score cai</span>{' '}
          <span className="k k8">e o agent</span>{' '}
          <span className="k k9">pede mais contexto</span>{' '}
          <span className="k k10">antes de roteirizar</span>
          <span className="k-cite">Fonte 3, item 2.1</span>
          <span className="k k11">. Exemplo:</span>{' '}
          <span className="k k12">embalagem com 80 func é médio porte.</span>
        </div>
        <div className="ait-depth-pills">
          <span className="ait-depth-pill ait-depth-pill--d1">Simples</span>
          <span className="ait-depth-pill ait-depth-pill--d2">Técnico</span>
          <span className="ait-depth-pill ait-depth-pill--d3">Exercício</span>
        </div>
      </div>
    </SceneWrap>
  )
}

function RenderS9() {
  return (
    <SceneWrap index={9}>
      <Topbar role="student" name="exercício · score do lead" pillKind="cy" pillText="Veredito por Python" />
      <div className="ait-ex">
        <div className="ait-ex-panel">
          <div className="ait-ex-h"><span className="ait-ex-h-tag">Exercício</span><span className="ait-ex-h-t">Calculando o score</span></div>
          <div className="ait-ex-q">
            Lead com <strong>CNPJ ativo</strong> (+2), <strong>80 func</strong> (+3), <strong>dor clara</strong> (+3) e <strong>orçamento aprovado</strong> (+1). Qual o score final?
          </div>
          <div className="ait-ex-input">9<span className="ait-cursor" /></div>
          <div className="ait-ex-actions">
            <button className="ait-ex-btn ait-ex-btn--primary" type="button">Conferir</button>
            <button className="ait-ex-btn ait-ex-btn--ghost" type="button">Mais fácil</button>
          </div>
        </div>
        <div className="ait-ex-result">
          <div className="ait-ex-console">
            <span className="ait-ex-console-h"><span className="ait-ex-console-dot" /> python · grader.py</span>
            <span className="ait-ex-console-l ait-ex-console-l--p ait-ex-l ait-ex-l--1">&gt;&gt;&gt; grade(answer=9)</span>
            <span className="ait-ex-console-l ait-ex-l ait-ex-l--2">Running tests…</span>
            <span className="ait-ex-console-l ait-ex-l ait-ex-l--3">expected = 2 + 3 + 3 + 1 = 9</span>
            <span className="ait-ex-console-l ait-ex-l ait-ex-l--4">Test 1: ✓ signature OK</span>
            <span className="ait-ex-console-l ait-ex-l ait-ex-l--5">Test 2: ✓ numeric match</span>
            <span className="ait-ex-console-l ait-ex-l ait-ex-l--6">Test 3: ✓ bounds (0–10)</span>
            <span className="ait-ex-console-l ait-ex-console-l--ok ait-ex-l ait-ex-l--7">PASS · |error|=0 · 12ms</span>
          </div>
          <div className="ait-ex-result-h">
            <span className="ait-ex-result-check" aria-hidden>✓</span>
            <span className="ait-ex-result-t">Correto · Score: 9.2/10</span>
            <span className="ait-ex-result-q">Python · 12ms</span>
          </div>
          <div className="ait-ex-result-tutor">Bom: você somou os pesos certos. Python entrega veredito; LLM só humaniza, não avalia.</div>
        </div>
      </div>
    </SceneWrap>
  )
}

function RenderS10() {
  return (
    <SceneWrap index={10}>
      <Topbar role="student" name="ai.tutor · aplicação publicada" pillKind="gn" pillText="ao vivo · em produção" />
      <div className="ait-pub">
        <div className="ait-pub-confetti" aria-hidden>
          <i className="cf cf-1" /><i className="cf cf-2" /><i className="cf cf-3" />
          <i className="cf cf-4" /><i className="cf cf-5" /><i className="cf cf-6" />
          <i className="cf cf-7" /><i className="cf cf-8" /><i className="cf cf-9" />
        </div>
        <div className="ait-pub-card">
          <div className="ait-pub-badge"><span className="ait-pub-badge-check" aria-hidden>✓</span> PUBLICADO</div>
          <div className="ait-pub-app-head">
            <div className="ait-pub-app-ic" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 L 4 7 v 10 l 8 5 8 -5 V 7 z" />
                <path d="M12 22 V 12" />
                <path d="M4 7 L 12 12 L 20 7" />
              </svg>
            </div>
            <div>
              <div className="ait-pub-app-name">Qualificador de Leads</div>
              <div className="ait-pub-app-org">MagisaTech · Vendas B2B</div>
            </div>
          </div>
          <div className="ait-pub-url">
            <span className="ait-pub-url-lock">🔒</span>
            <span className="ait-pub-url-host">apps.iconsai.ai</span>
            <span className="ait-pub-url-path">/qualificador-leads-magisatech</span>
            <span className="ait-pub-url-copy">copiar</span>
          </div>
          <div className="ait-pub-desc">
            Agent que conversa com leads industriais, enriquece CNPJ, faz 5 perguntas de qualificação e roteia pra comercial humano se score ≥ 7.
          </div>
          <div className="ait-pub-stats">
            <div className="ait-pub-stat"><span className="ait-pub-stat-v">23</span><span className="ait-pub-stat-k">conversas hoje</span></div>
            <div className="ait-pub-stat"><span className="ait-pub-stat-v ait-pub-stat-v--gn">7</span><span className="ait-pub-stat-k">leads qualificados</span></div>
            <div className="ait-pub-stat"><span className="ait-pub-stat-v ait-pub-stat-v--cy">91%</span><span className="ait-pub-stat-k">satisfação</span></div>
          </div>
          <div className="ait-pub-actions">
            <button className="ait-pub-btn ait-pub-btn--primary" type="button">Acessar app →</button>
            <button className="ait-pub-btn" type="button">Compartilhar</button>
            <button className="ait-pub-btn ait-pub-btn--ghost" type="button">Editar</button>
          </div>
          <div className="ait-pub-foot"><span className="ait-pub-foot-bolt" aria-hidden>⚡</span> Publicado em <strong>2.3s</strong> · v1 · standalone</div>
        </div>
      </div>
    </SceneWrap>
  )
}

function RenderS11() {
  return (
    <SceneWrap index={11}>
      <Topbar role="corp" name="MagisaTech · RH" pillKind="or" pillText="6 colaboradores · apps personalizadas" />
      <div className="ait-rh-wrap">
        <div className="ait-rh-head">
          <div>
            <div className="ait-rh-h-t">Trilha Compliance LGPD · MagisaTech</div>
            <div className="ait-rh-h-sub">cada colaborador sai com sua própria app de IA</div>
          </div>
          <div className="ait-rh-kpis">
            <div className="ait-kpi" style={{ ['--accent' as string]: '#22c55e' } as CSSProperties}>
              <span className="ait-kpi-v">3</span><span className="ait-kpi-k">apps publicadas</span>
            </div>
            <div className="ait-kpi" style={{ ['--accent' as string]: '#22d3ee' } as CSSProperties}>
              <span className="ait-kpi-v">79%</span><span className="ait-kpi-k">média trilha</span>
            </div>
            <div className="ait-kpi" style={{ ['--accent' as string]: '#a855f7' } as CSSProperties}>
              <span className="ait-kpi-v">6</span><span className="ait-kpi-k">histórias gravadas</span>
            </div>
          </div>
        </div>
        <div className="ait-rh-staff">
          {STAFF.map((p, i) => (
            <div key={p.name} className="ait-staff-row"
              style={{
                ['--accent' as string]: p.pct >= 100 ? '#22c55e' : p.pct >= 70 ? '#22d3ee' : p.pct >= 40 ? '#fb923c' : '#ef4444',
                ['--pct' as string]: `${p.pct}%`,
                ['--idx' as string]: i,
              } as CSSProperties}>
              <span className="ait-staff-av" aria-hidden>{p.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>
              <div className="ait-staff-id">
                <span className="ait-staff-name">{p.name}</span>
                <span className="ait-staff-role">{p.role}</span>
              </div>
              <span className="ait-staff-app" title={p.app}>
                <span className="ait-staff-app-ic" aria-hidden>✨</span>
                <span className="ait-staff-app-name">{p.app}</span>
              </span>
              <div className="ait-staff-bar"><div className="ait-staff-bar-fill" /></div>
              <span className="ait-staff-pct">{p.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </SceneWrap>
  )
}

/* ═════════════════════════════════════════════════════════════════════
   SCENES — composição pro shell
   ═════════════════════════════════════════════════════════════════════ */

const RENDERERS: Array<() => React.ReactNode> = [
  RenderOpening,
  RenderS1, RenderS2, RenderS3, RenderS4, RenderS5, RenderS6,
  RenderS7, RenderS8, RenderS9, RenderS10, RenderS11,
]

const AIT_SCENES_NEW: ShowcaseScene[] = AIT_NAV.map((sc, i) => {
  const next = i + 1 < AIT_NAV.length ? AIT_NAV[i + 1].startMs : AIT_CYCLE_MS
  const Renderer = RENDERERS[i]
  return {
    id: sc.step,
    startMs: sc.startMs,
    durationMs: next - sc.startMs,
    label: sc.label,
    render: () => <Renderer />,
  }
})

export default function Showcase() {
  return (
    <ShowcaseShell
      scenes={AIT_SCENES_NEW}
      accentColor="#a855f7"
      productEyebrow="AI.TUTOR · CONSTRUTOR DE APPS DE IA"
      productName="ai.tutor"
    />
  )
}
