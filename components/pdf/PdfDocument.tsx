'use client'

import React from 'react'
import type { LangId } from '@/i18n/strings'

/* ═══════════════════════════════════════════════════════════════════
   LOCALIZED CONTENT
   ═══════════════════════════════════════════════════════════════════ */

interface Section { t: string; label: string; p: string[]; caption: string }

const SECTIONS: Record<LangId, {
  docType: string
  coverTag: string
  coverMeta: string
  sections: Section[]
  closing: { thanks: string; available: string }
}> = {
  'pt-BR': {
    docType: 'SHOWCASE SUMMARY',
    coverTag: 'Construtor de apps de IA por voz',
    coverMeta: 'Preparado por IconsAI\n2026 \u00B7 Confidencial',
    sections: [
      {
        label: 'SECCAO 01', t: 'Login unico e Dashboard',
        p: [
          'O ai.tutor opera sobre o Identity Hub da iconsai: CPF + SMS OTP via Infobip, sem senha, sem cadastro duplicado. O dashboard apresenta oito areas de conhecimento com progresso individual.',
          'O destaque e a trilha "IA: construir minha aplicacao", onde cada colaborador conta sua historia de trabalho e sai com um app de IA publicado.',
        ],
        caption: 'login unico \u00B7 8 trilhas \u00B7 identity hub',
      },
      {
        label: 'SECCAO 02', t: 'Storytelling por voz e Script IA',
        p: [
          'O colaborador grava um relato natural sobre seu trabalho e o problema que quer resolver. A IA transcreve em tempo real com Claude Sonnet 4.6 e extrai palavras-chave.',
          'Do audio nasce um script estruturado: nome do agente, ferramentas, fluxo de conversa e guardrails. A abordagem por voz reduz a barreira para colaboradores sem experiencia tecnica.',
        ],
        caption: 'gravacao \u00B7 transcricao ao vivo \u00B7 extracao de keywords',
      },
      {
        label: 'SECCAO 03', t: 'System Prompt e Simulacao',
        p: [
          'O script gera um system prompt completo (Claude Sonnet 4.6, temperatura 0.3). O aluno pode editar antes de publicar, mantendo controle total.',
          'A simulacao coloca o agente contra um lead IA com score ao vivo. O ciclo aprovar-ou-refinar garante que nenhum agente vai a producao sem validacao.',
        ],
        caption: 'prompt editavel \u00B7 1.247 tokens \u00B7 score 8.7/10',
      },
      {
        label: 'SECCAO 04', t: 'Tool Builder e Deploy',
        p: [
          'O fluxo visual mostra cinco blocos no-code: input, CRM lookup, Claude, score Python e output. Cada conexao aparece ao vivo.',
          'O deploy gera uma URL real em apps.iconsai.ai em menos de tres segundos, com metricas de uso integradas.',
        ],
        caption: '5 blocos no-code \u00B7 deploy em 2.3s \u00B7 url real',
      },
      {
        label: 'SECCAO 05', t: 'Treinamento e Exercicios',
        p: [
          'Modo karaoke word-by-word com TTS da OpenAI. Tres niveis de profundidade adaptam o conteudo ao perfil do colaborador.',
          'Exercicios com veredito por Python: o grader.py roda os testes e devolve pass/fail com tempo de execucao. LLM nunca avalia.',
        ],
        caption: 'karaoke tts \u00B7 3 niveis \u00B7 grader.py 12ms',
      },
      {
        label: 'SECCAO 06', t: 'Publicacao e Visao RH',
        p: [
          'A aplicacao e publicada com URL real, metricas ao vivo (conversas, leads qualificados, satisfacao) e versao. O colaborador sai com ferramenta funcional.',
          'A visao RH mostra progresso por colaborador, apps publicadas e desempenho individual. A gestao ganha visibilidade sobre o retorno do investimento.',
        ],
        caption: '23 conversas \u00B7 91% satisfacao \u00B7 3 apps publicadas',
      },
    ],
    closing: { thanks: 'Obrigado.', available: 'Apresentacao disponivel em' },
  },
  'pt-PT': {
    docType: 'SHOWCASE SUMMARY',
    coverTag: 'Construtor de apps de IA por voz',
    coverMeta: 'Preparado por IconsAI\n2026 \u00B7 Confidencial',
    sections: [
      {
        label: 'SECCAO 01', t: 'Login unico e Dashboard',
        p: [
          'O ai.tutor opera sobre o Identity Hub da iconsai: CPF + SMS OTP via Infobip, sem palavra-passe, sem registo duplicado. O dashboard apresenta oito areas de conhecimento com progresso individual.',
          'O destaque e a trilha "IA: construir a minha aplicacao", onde cada colaborador conta a sua historia e sai com uma app de IA publicada.',
        ],
        caption: 'login unico \u00B7 8 trilhas \u00B7 identity hub',
      },
      {
        label: 'SECCAO 02', t: 'Storytelling por voz e Script IA',
        p: [
          'O colaborador grava um relato natural sobre o seu trabalho e o problema que pretende resolver. A IA transcreve em tempo real com Claude Sonnet 4.6 e extrai palavras-chave.',
          'Do audio nasce um guiao estruturado: nome do agente, ferramentas, fluxo de conversa e guardrails. A abordagem por voz reduz a barreira para colaboradores sem experiencia tecnica.',
        ],
        caption: 'gravacao \u00B7 transcricao ao vivo \u00B7 extracao de keywords',
      },
      {
        label: 'SECCAO 03', t: 'System Prompt e Simulacao',
        p: [
          'O guiao gera um system prompt completo (Claude Sonnet 4.6, temperatura 0.3). O aluno pode editar antes de publicar, mantendo controlo total.',
          'A simulacao coloca o agente contra um lead IA com score ao vivo. O ciclo aprovar-ou-refinar garante que nenhum agente vai a producao sem validacao.',
        ],
        caption: 'prompt editavel \u00B7 1.247 tokens \u00B7 score 8.7/10',
      },
      {
        label: 'SECCAO 04', t: 'Tool Builder e Deploy',
        p: [
          'O fluxo visual mostra cinco blocos no-code: input, CRM lookup, Claude, score Python e output. Cada ligacao aparece ao vivo.',
          'O deploy gera um URL real em apps.iconsai.ai em menos de tres segundos, com metricas de utilizacao integradas.',
        ],
        caption: '5 blocos no-code \u00B7 deploy em 2.3s \u00B7 url real',
      },
      {
        label: 'SECCAO 05', t: 'Formacao e Exercicios',
        p: [
          'Modo karaoke word-by-word com TTS da OpenAI. Tres niveis de profundidade adaptam o conteudo ao perfil do colaborador.',
          'Exercicios com veredito por Python: o grader.py executa os testes e devolve pass/fail com tempo de execucao. LLM nunca avalia.',
        ],
        caption: 'karaoke tts \u00B7 3 niveis \u00B7 grader.py 12ms',
      },
      {
        label: 'SECCAO 06', t: 'Publicacao e Visao RH',
        p: [
          'A aplicacao e publicada com URL real, metricas ao vivo (conversas, leads qualificados, satisfacao) e versao. O colaborador sai com ferramenta funcional.',
          'A visao RH mostra progresso por colaborador, apps publicadas e desempenho individual. A gestao ganha visibilidade sobre o retorno do investimento.',
        ],
        caption: '23 conversas \u00B7 91% satisfacao \u00B7 3 apps publicadas',
      },
    ],
    closing: { thanks: 'Obrigado.', available: 'Apresentacao disponivel em' },
  },
  en: {
    docType: 'SHOWCASE SUMMARY',
    coverTag: 'AI app builder by voice',
    coverMeta: 'Prepared by IconsAI\n2026 \u00B7 Confidential',
    sections: [
      {
        label: 'SECTION 01', t: 'Single Sign-On and Dashboard',
        p: [
          'ai.tutor runs on the iconsai Identity Hub: CPF + SMS OTP via Infobip, no password, no duplicate registration. The dashboard shows eight knowledge areas with individual progress.',
          'The highlight is the "AI: build my application" track, where each employee tells their work story and walks out with a published AI app.',
        ],
        caption: 'single sign-on \u00B7 8 tracks \u00B7 identity hub',
      },
      {
        label: 'SECTION 02', t: 'Voice Storytelling and AI Script',
        p: [
          'The employee records a natural account of their work and the problem they want to solve. The AI transcribes in real time with Claude Sonnet 4.6 and extracts keywords.',
          'From the audio, a structured script is born: agent name, tools, conversation flow, and guardrails. The voice-first approach lowers the barrier for non-technical employees.',
        ],
        caption: 'recording \u00B7 live transcription \u00B7 keyword extraction',
      },
      {
        label: 'SECTION 03', t: 'System Prompt and Simulation',
        p: [
          'The script generates a complete system prompt (Claude Sonnet 4.6, temperature 0.3). The student can edit before publishing, keeping full control.',
          'The simulation pits the agent against an AI lead with live scoring. The approve-or-refine cycle ensures no agent goes to production without validation.',
        ],
        caption: 'editable prompt \u00B7 1,247 tokens \u00B7 score 8.7/10',
      },
      {
        label: 'SECTION 04', t: 'Tool Builder and Deploy',
        p: [
          'The visual flow shows five no-code blocks: input, CRM lookup, Claude, Python score, and output. Each connection appears live.',
          'Deployment generates a real URL at apps.iconsai.ai in under three seconds, with integrated usage metrics.',
        ],
        caption: '5 no-code blocks \u00B7 deploy in 2.3s \u00B7 real url',
      },
      {
        label: 'SECTION 05', t: 'Training and Exercises',
        p: [
          'Word-by-word karaoke with TTS from OpenAI. Three depth levels adapt content to the employee profile.',
          'Exercises with Python verdicts: grader.py runs the tests and returns pass/fail with execution time. LLM never evaluates.',
        ],
        caption: 'karaoke tts \u00B7 3 levels \u00B7 grader.py 12ms',
      },
      {
        label: 'SECTION 06', t: 'Publishing and HR View',
        p: [
          'The application is published with a real URL, live metrics (conversations, qualified leads, satisfaction), and version. The employee walks out with a working tool.',
          'The HR view shows per-employee progress, published apps, and individual performance. Management gains visibility into training ROI.',
        ],
        caption: '23 conversations \u00B7 91% satisfaction \u00B7 3 published apps',
      },
    ],
    closing: { thanks: 'Thank you.', available: 'Presentation available at' },
  },
}

/* ═══════════════════════════════════════════════════════════════════
   COVER ILLUSTRATION — abstract voice→script→app flow (tutor theme)
   ═══════════════════════════════════════════════════════════════════ */

function CoverIllustration() {
  return (
    <svg viewBox="0 0 210 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="pcg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="plk" x1="0" x2="1" y1="0.5" y2="0.5">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="210" height="150" fill="url(#pcg)" />
      {/* Voice wave — left zone */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={`w${i}`} x1={20 + i * 4} y1={75 - (i % 3 + 1) * 8} x2={20 + i * 4} y2={75 + (i % 3 + 1) * 8}
          stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" opacity={0.3 + (i % 3) * 0.15} />
      ))}
      <circle cx="30" cy="75" r="12" fill="none" stroke="#a855f7" strokeWidth="0.8" opacity="0.2" />
      <circle cx="30" cy="75" r="18" fill="none" stroke="#a855f7" strokeWidth="0.5" opacity="0.1" />
      {/* Flow connections */}
      <path d="M 52 75 C 68 75, 72 55, 88 55" stroke="url(#plk)" strokeWidth="1" fill="none" />
      <path d="M 52 75 C 68 75, 72 95, 88 95" stroke="url(#plk)" strokeWidth="1" fill="none" />
      {/* Script block — center-left */}
      <rect x="88" y="42" width="28" height="26" rx="3" fill="#a855f7" fillOpacity="0.08" stroke="#a855f7" strokeWidth="0.6" opacity="0.5" />
      <line x1="92" y1="50" x2="108" y2="50" stroke="#a855f7" strokeWidth="0.8" opacity="0.4" />
      <line x1="92" y1="55" x2="105" y2="55" stroke="#a855f7" strokeWidth="0.6" opacity="0.3" />
      <line x1="92" y1="60" x2="110" y2="60" stroke="#a855f7" strokeWidth="0.6" opacity="0.3" />
      {/* Prompt block — center */}
      <rect x="88" y="82" width="28" height="26" rx="3" fill="#00d9ff" fillOpacity="0.08" stroke="#00d9ff" strokeWidth="0.6" opacity="0.5" />
      <line x1="92" y1="90" x2="108" y2="90" stroke="#00d9ff" strokeWidth="0.8" opacity="0.4" />
      <line x1="92" y1="95" x2="112" y2="95" stroke="#00d9ff" strokeWidth="0.6" opacity="0.3" />
      <line x1="92" y1="100" x2="106" y2="100" stroke="#00d9ff" strokeWidth="0.6" opacity="0.3" />
      {/* Converge to center hub */}
      <path d="M 116 55 C 128 55, 130 72, 140 72" stroke="url(#plk)" strokeWidth="1" fill="none" />
      <path d="M 116 95 C 128 95, 130 78, 140 78" stroke="url(#plk)" strokeWidth="1" fill="none" />
      {/* Central processing node */}
      <circle cx="145" cy="75" r="8" fill="#00d9ff" fillOpacity="0.1" stroke="#00d9ff" strokeWidth="0.8" opacity="0.5" />
      <circle cx="145" cy="75" r="3" fill="#00d9ff" fillOpacity="0.3" />
      {/* Output connections */}
      <path d="M 153 75 C 162 75, 165 60, 175 60" stroke="url(#plk)" strokeWidth="1" fill="none" />
      <path d="M 153 75 C 162 75, 165 90, 175 90" stroke="url(#plk)" strokeWidth="1" fill="none" />
      {/* App hexagon — right */}
      <polygon points="182,50 192,55 192,65 182,70 172,65 172,55" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="0.8" opacity="0.5" />
      <text x="182" y="63" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="4" fill="#22c55e" fillOpacity="0.6">APP</text>
      {/* Metrics — right bottom */}
      <rect x="168" y="82" width="28" height="18" rx="3" fill="#00d9ff" fillOpacity="0.06" stroke="#00d9ff" strokeWidth="0.5" opacity="0.4" />
      <line x1="172" y1="89" x2="188" y2="89" stroke="#00d9ff" strokeWidth="0.5" opacity="0.3" />
      <line x1="172" y1="94" x2="184" y2="94" stroke="#00d9ff" strokeWidth="0.4" opacity="0.2" />
      {/* Scattered ambient nodes */}
      {[[15,30],[45,120],[70,25],[130,20],[160,130],[195,40],[190,115],[25,110],[110,130],[75,130],[155,18]].map(([cx,cy], i) => (
        <circle key={`n${i}`} cx={cx} cy={cy} r={0.6 + (i % 3) * 0.4} fill="#00d9ff" opacity={0.06 + (i % 4) * 0.03} />
      ))}
      {/* Ambient connection lines */}
      {[[15,30,45,120],[70,25,130,20],[160,130,195,40],[25,110,75,130]].map(([x1,y1,x2,y2], i) => (
        <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00d9ff" strokeWidth="0.2" opacity={0.04 + i * 0.01} />
      ))}
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION VISUALS — abstract SVG per section (redesigned for A4)
   ═══════════════════════════════════════════════════════════════════ */

function SectionVisual({ index }: { index: number }) {
  const visuals: Record<number, React.ReactElement> = {
    0: ( /* Login + Dashboard: hub with connected nodes */
      <svg viewBox="0 0 178 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="89" cy="60" r="16" fill="#00d9ff" fillOpacity="0.08" stroke="#00d9ff" strokeWidth="0.8" />
        <text x="89" y="63" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="#00d9ff" fillOpacity="0.7">HUB</text>
        {[[40,30,'tutor'],[138,30,'stats'],[40,90,'python'],[138,90,'esg'],[20,60,'fin'],[158,60,'ops'],[89,15,'ia'],[89,105,'bi']].map(([cx,cy,label],i) => (
          <g key={i}>
            <line x1={89} y1={60} x2={cx as number} y2={cy as number} stroke="#00d9ff" strokeWidth="0.5" opacity="0.2" />
            <circle cx={cx as number} cy={cy as number} r="10" fill="#a855f7" fillOpacity="0.06" stroke="#a855f7" strokeWidth="0.6" opacity="0.4" />
            <text x={cx as number} y={(cy as number) + 2} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="4.5" fill="#a855f7" fillOpacity="0.6">{label as string}</text>
          </g>
        ))}
      </svg>
    ),
    1: ( /* Voice + Script: wave → document */
      <svg viewBox="0 0 178 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <line key={i} x1={20 + i * 5} y1={60 - (i % 4 + 1) * 10} x2={20 + i * 5} y2={60 + (i % 4 + 1) * 10}
            stroke="#a855f7" strokeWidth="2" strokeLinecap="round" opacity={0.2 + (i % 3) * 0.1} />
        ))}
        <path d="M 75 60 L 100 60" stroke="#00d9ff" strokeWidth="1" markerEnd="none" opacity="0.4" />
        <polygon points="100,56 108,60 100,64" fill="#00d9ff" fillOpacity="0.4" />
        <rect x="115" y="30" width="48" height="60" rx="4" fill="#00d9ff" fillOpacity="0.06" stroke="#00d9ff" strokeWidth="0.8" opacity="0.5" />
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1={122} y1={42 + i * 8} x2={122 + 20 + (i % 3) * 8} y2={42 + i * 8} stroke="#00d9ff" strokeWidth="0.7" opacity={0.25 + (i % 2) * 0.1} />
        ))}
      </svg>
    ),
    2: ( /* Prompt + Simulation: document → chat bubbles with score */
      <svg viewBox="0 0 178 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="20" width="44" height="80" rx="4" fill="#a855f7" fillOpacity="0.06" stroke="#a855f7" strokeWidth="0.7" opacity="0.4" />
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={17} y1={32 + i * 12} x2={17 + 15 + (i % 3) * 6} y2={32 + i * 12} stroke="#a855f7" strokeWidth="0.6" opacity="0.3" />
        ))}
        <path d="M 58 60 L 78 60" stroke="#00d9ff" strokeWidth="0.8" opacity="0.4" />
        <polygon points="78,57 84,60 78,63" fill="#00d9ff" fillOpacity="0.4" />
        <rect x="90" y="25" width="54" height="16" rx="8" fill="#00d9ff" fillOpacity="0.08" stroke="#00d9ff" strokeWidth="0.6" opacity="0.4" />
        <rect x="100" y="48" width="54" height="16" rx="8" fill="#a855f7" fillOpacity="0.08" stroke="#a855f7" strokeWidth="0.6" opacity="0.4" />
        <rect x="90" y="71" width="54" height="16" rx="8" fill="#00d9ff" fillOpacity="0.08" stroke="#00d9ff" strokeWidth="0.6" opacity="0.4" />
        <circle cx="155" cy="100" r="12" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="0.8" opacity="0.5" />
        <text x="155" y="99" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="5" fill="#22c55e" fillOpacity="0.7">8.7</text>
        <text x="155" y="106" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="3" fill="#22c55e" fillOpacity="0.5">/10</text>
      </svg>
    ),
    3: ( /* Tool Builder: 5 connected blocks */
      <svg viewBox="0 0 178 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {[
          [20,55,'input','#22d3ee'], [55,25,'CRM','#a855f7'], [90,55,'Claude','#6366f1'],
          [55,85,'score','#fb923c'], [145,55,'output','#22c55e'],
        ].map(([x,y,label,color], i) => (
          <g key={i}>
            <rect x={(x as number)-14} y={(y as number)-10} width="28" height="20" rx="4"
              fill={color as string} fillOpacity="0.08" stroke={color as string} strokeWidth="0.7" opacity="0.5" />
            <text x={x as number} y={(y as number)+2} textAnchor="middle" fontFamily="JetBrains Mono, monospace"
              fontSize="4" fill={color as string} fillOpacity="0.7">{label as string}</text>
          </g>
        ))}
        {[[34,55,41,37],[69,37,76,50],[69,73,76,60],[104,55,131,55]].map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00d9ff" strokeWidth="0.7" opacity="0.3" />
        ))}
      </svg>
    ),
    4: ( /* Karaoke + Exercise: words lighting up + console */
      <svg viewBox="0 0 178 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {['Um','lead','bom','tem','CNPJ','ativo'].map((w, i) => (
          <g key={i}>
            <rect x={12 + i * 26} y="30" width={22} height="14" rx="3"
              fill={i < 3 ? '#00d9ff' : '#1f2937'} fillOpacity={i < 3 ? 0.15 : 0.06}
              stroke={i < 3 ? '#00d9ff' : '#374151'} strokeWidth="0.5" opacity={i < 3 ? 0.6 : 0.3} />
            <text x={12 + i * 26 + 11} y="40" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize="4.5" fill={i < 3 ? '#00d9ff' : '#9ca3af'} fillOpacity={i < 3 ? 0.8 : 0.4}>{w}</text>
          </g>
        ))}
        <rect x="12" y="60" width="154" height="48" rx="4" fill="#0d1117" stroke="#1f2937" strokeWidth="0.6" />
        {['>>> grade(answer=9)','Running tests...','Test 1: \u2713 OK','Test 2: \u2713 OK','PASS \u00B7 12ms'].map((line, i) => (
          <text key={i} x="18" y={72 + i * 8} fontFamily="JetBrains Mono, monospace" fontSize="3.8"
            fill={i === 4 ? '#22c55e' : '#8b949e'} fillOpacity={i === 0 ? 0.6 : i === 4 ? 0.8 : 0.5}>{line}</text>
        ))}
      </svg>
    ),
    5: ( /* Published app + HR: hexagon + bar chart */
      <svg viewBox="0 0 178 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polygon points="50,20 70,30 70,50 50,60 30,50 30,30" fill="#22c55e" fillOpacity="0.08" stroke="#22c55e" strokeWidth="0.8" opacity="0.5" />
        <text x="50" y="40" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="5" fill="#22c55e" fillOpacity="0.7">APP</text>
        <text x="50" y="48" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="3" fill="#22c55e" fillOpacity="0.4">publicada</text>
        {[['23','conversas',60],['7','leads',42],['91%','satisf.',55]].map(([v,k,h], i) => (
          <g key={i}>
            <rect x={100 + i * 22} y={90 - (h as number)} width="16" height={h as number} rx="2"
              fill="#00d9ff" fillOpacity={0.08 + i * 0.04} stroke="#00d9ff" strokeWidth="0.5" opacity="0.4" />
            <text x={108 + i * 22} y={86 - (h as number)} textAnchor="middle" fontFamily="JetBrains Mono, monospace"
              fontSize="5" fill="#00d9ff" fillOpacity="0.7">{v as string}</text>
            <text x={108 + i * 22} y="98" textAnchor="middle" fontFamily="JetBrains Mono, monospace"
              fontSize="3" fill="#9ca3af" fillOpacity="0.5">{k as string}</text>
          </g>
        ))}
        {[['Ana R.',100],['Bruno C.',85],['Camila D.',100],['Diego M.',60]].map(([name,pct], i) => (
          <g key={i}>
            <text x="12" y={80 + i * 10} fontFamily="Plus Jakarta Sans, sans-serif" fontSize="3.5" fill="#374151" fillOpacity="0.6">{name as string}</text>
            <rect x="42" y={76 + i * 10} width="40" height="5" rx="1" fill="#e5e7eb" fillOpacity="0.3" />
            <rect x="42" y={76 + i * 10} width={(pct as number) * 0.4} height="5" rx="1" fill="#00d9ff" fillOpacity="0.3" />
          </g>
        ))}
      </svg>
    ),
  }
  return visuals[index] ?? null
}

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
