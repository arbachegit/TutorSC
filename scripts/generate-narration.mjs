// generate-narration.mjs — pre-generates narration mp3s (showcase skill §8.4)
// Usage: node scripts/generate-narration.mjs <pt-BR|pt-PT|en|all> [slideN]
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

function loadEnv() {
  const p = join(ROOT, '.env.local')
  if (!existsSync(p)) return
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}
loadEnv()

const API_KEY = process.env.OPENAI_API_KEY
if (!API_KEY) {
  console.error('OPENAI_API_KEY missing (set it in .env.local)')
  process.exit(1)
}

const VOICE = process.env.TTS_VOICE || 'coral'

const LANGS = {
  'pt-BR': {
    file: 'script.pt-BR.ts',
    voice: VOICE,
    instructions:
      'Voz: português do Brasil, jovem-adulta, calorosa e próxima. Personalidade: apresentador humano entusiasmado mas natural, como quem conversa com um amigo — nunca locutor de telejornal. Ritmo variável: acelera no entusiasmo, respira na ideia-chave. Entoação rica; sobe na pergunta, desce na afirmação. Ênfase nas palavras-chave, pausas naturais. Sorriso na voz nos pontos positivos, gravidade nos dados duros. "ai.tutor" lê-se "ai ponto tutor" em inglês: "ei-ai tutor". "iconsai" lê-se "áicons-ei-ai". Não soar robótico nem comercial agressivo.',
  },
  'pt-PT': {
    file: 'script.pt-PT.ts',
    voice: VOICE,
    instructions:
      'Voz: português europeu (Portugal), jovem-adulta, calorosa e próxima. Personalidade: apresentador humano entusiasmado mas natural, como quem conversa com um amigo — nunca locutor de telejornal. Sotaque de Lisboa, vogais fechadas. Ritmo variável: acelera no entusiasmo, respira na ideia-chave. Entoação rica; sobe na pergunta, desce na afirmação. Ênfase nas palavras-chave, pausas naturais. "ai.tutor" lê-se à inglesa: "ei-ai tutor". "iconsai" lê-se "áicons-ei-ai". Não soar robótico nem comercial agressivo.',
  },
  en: {
    file: 'script.en.ts',
    voice: VOICE,
    instructions:
      'Voice: American English, young-adult, warm and close. Personality: enthusiastic but natural human presenter, like talking to a friend — never a news anchor. Variable pace: speeds up with excitement, breathes on the key idea. Rich intonation; rises on questions, falls on statements. Emphasis on keywords, natural pauses. Smile in the voice on positives, gravity on hard data. "ai.tutor" reads "A-I dot tutor". "iconsai" reads "icons-A-I". Never robotic or aggressively commercial.',
  },
}

function loadNarration(file) {
  const src = readFileSync(join(ROOT, 'narration', file), 'utf8')
  const m = src.match(/NARRATION[^=]*=\s*({[\s\S]*?\n})/)
  if (!m) throw new Error(`NARRATION object not found in ${file}`)
  return eval(`(${m[1]})`) // eslint-disable-line no-eval
}

async function synth(text, voice, instructions) {
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o-mini-tts',
      voice,
      input: text,
      instructions,
      response_format: 'mp3',
    }),
  })
  if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

async function genLang(lang, onlySlide) {
  const cfg = LANGS[lang]
  const narration = loadNarration(cfg.file)
  const outDir = join(ROOT, 'public', 'narration', lang)
  mkdirSync(outDir, { recursive: true })
  for (const [id, text] of Object.entries(narration)) {
    if (onlySlide && Number(id) !== onlySlide) continue
    const out = join(outDir, `slide-${String(id).padStart(2, '0')}.mp3`)
    process.stdout.write(`[${lang}] slide ${id}… `)
    const mp3 = await synth(text, cfg.voice, cfg.instructions)
    writeFileSync(out, mp3)
    console.log(`${(mp3.length / 1024).toFixed(0)} KB`)
  }
}

const arg = process.argv[2]
const onlySlide = process.argv[3] ? Number(process.argv[3]) : undefined
if (!arg || (arg !== 'all' && !LANGS[arg])) {
  console.error('Usage: node scripts/generate-narration.mjs <pt-BR|pt-PT|en|all> [slideN]')
  process.exit(1)
}
const langs = arg === 'all' ? Object.keys(LANGS) : [arg]
for (const lang of langs) await genLang(lang, onlySlide)
console.log('done.')
