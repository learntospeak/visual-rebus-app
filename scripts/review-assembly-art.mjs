#!/usr/bin/env node
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { extname, resolve, dirname } from 'node:path'
import { createHash } from 'node:crypto'

const ROOT = process.cwd()
const DEFAULT_BLIND_MODEL = process.env.ASSEMBLY_BLIND_MODEL || 'gpt-6-luna'
const DEFAULT_JUDGE_MODEL = process.env.ASSEMBLY_JUDGE_MODEL || 'gpt-6-sol'

function usage(exitCode = 0) {
  console.log(`\nAssembly artwork AI gate\n\nUsage:\n  node scripts/review-assembly-art.mjs --image <path> --phrase <answer> [options]\n\nOptions:\n  --text-mode no_text|subtle_text   Default: no_text\n  --components "subject; action; context; consequence"\n  --out <review.json>               Save full machine-readable review\n  --blind-model <model>             Default: ${DEFAULT_BLIND_MODEL}\n  --judge-model <model>             Default: ${DEFAULT_JUDGE_MODEL}\n  --min-match <0-100>               Default: 78\n  --max-giveaway <0-100>            Default: 82\n  --help\n\nExit codes:\n  0 = PASS\n  2 = REGENERATE\n  3 = configuration/API/error\n`)
  process.exit(exitCode)
}

function parseArgs(argv) {
  const out = {}
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--help' || arg === '-h') usage(0)
    if (!arg.startsWith('--')) continue
    const key = arg.slice(2)
    const value = argv[i + 1]
    if (!value || value.startsWith('--')) throw new Error(`Missing value for --${key}`)
    out[key] = value
    i++
  }
  return out
}

function normalize(value) {
  return String(value || '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ')
}

function extractKnownAnswers() {
  const answers = []
  const files = [
    resolve(ROOT, 'src/data/puzzles.ts'),
    resolve(ROOT, 'public/prototypes/assembly-chapter-01/app.js'),
  ]
  for (const file of files) {
    if (!existsSync(file)) continue
    const text = readFileSync(file, 'utf8')
    for (const m of text.matchAll(/candidate\(\s*\d+\s*,\s*'([^']+)'/g)) answers.push(m[1])
    for (const m of text.matchAll(/\banswer\s*:\s*'([^']+)'/g)) answers.push(m[1])
    for (const m of text.matchAll(/\banswer\s*:\s*"([^"]+)"/g)) answers.push(m[1])
    for (const m of text.matchAll(/"answer"\s*:\s*"([^"]+)"/g)) answers.push(m[1])
  }
  return [...new Set(answers.map(x => x.trim()).filter(Boolean))]
}

function mimeFor(path) {
  const ext = extname(path).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.webp') return 'image/webp'
  throw new Error(`Unsupported image type: ${ext || '(none)'}`)
}

function dataUrl(path) {
  const bytes = readFileSync(path)
  return `data:${mimeFor(path)};base64,${bytes.toString('base64')}`
}

function imageSha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex')
}

function extractResponseText(json) {
  if (typeof json.output_text === 'string' && json.output_text.trim()) return json.output_text.trim()
  const chunks = []
  for (const item of json.output || []) {
    for (const part of item.content || []) {
      if ((part.type === 'output_text' || part.type === 'text') && typeof part.text === 'string') chunks.push(part.text)
    }
  }
  return chunks.join('\n').trim()
}

function parseJsonLoose(text) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
  try { return JSON.parse(cleaned) } catch {}
  const first = cleaned.indexOf('{')
  const last = cleaned.lastIndexOf('}')
  if (first >= 0 && last > first) return JSON.parse(cleaned.slice(first, last + 1))
  throw new Error(`Reviewer returned non-JSON output: ${text.slice(0, 300)}`)
}

async function responseApi({ model, prompt, image }) {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('OPENAI_API_KEY is not set')
  const body = {
    model,
    input: [{
      role: 'user',
      content: [
        { type: 'input_text', text: prompt },
        { type: 'input_image', image_url: image, detail: 'high' },
      ],
    }],
    max_output_tokens: 1800,
  }
  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`OpenAI API ${res.status}: ${JSON.stringify(json).slice(0, 1000)}`)
  return { raw: json, text: extractResponseText(json) }
}

function targetContentWords(phrase) {
  const stop = new Set(['a','an','the','and','or','of','to','in','on','at','by','for','with','is','it','its','your','you','my','me'])
  return normalize(phrase).split(' ').filter(w => w && !stop.has(w))
}

function visibleTargetWordRatio(phrase, visibleText) {
  const target = targetContentWords(phrase)
  if (!target.length) return 0
  const visible = normalize((visibleText || []).join(' '))
  let hits = 0
  for (const w of target) if (new RegExp(`(^|\\s)${w}(\\s|$)`).test(visible)) hits++
  return hits / target.length
}

function num(v, fallback = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

function bool(v) { return v === true }

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const phrase = args.phrase?.trim()
  const imagePath = args.image ? resolve(ROOT, args.image) : null
  if (!phrase || !imagePath) usage(3)
  if (!existsSync(imagePath)) throw new Error(`Image not found: ${imagePath}`)

  const textMode = args['text-mode'] || 'no_text'
  if (!['no_text','subtle_text'].includes(textMode)) throw new Error('--text-mode must be no_text or subtle_text')
  const minMatch = num(args['min-match'], 78)
  const maxGiveaway = num(args['max-giveaway'], 82)
  const components = (args.components || '').split(';').map(s => s.trim()).filter(Boolean)
  const blindModel = args['blind-model'] || DEFAULT_BLIND_MODEL
  const judgeModel = args['judge-model'] || DEFAULT_JUDGE_MODEL

  const knownAnswers = extractKnownAnswers()
  const normalizedPhrase = normalize(phrase)
  const exactDuplicate = knownAnswers.find(a => normalize(a) === normalizedPhrase)
  if (exactDuplicate) {
    const result = { version: 1, verdict: 'REGENERATE', reason: `Exact duplicate already exists: ${exactDuplicate}`, phrase, duplicate: true }
    console.log(JSON.stringify(result, null, 2))
    if (args.out) { mkdirSync(dirname(resolve(ROOT,args.out)), {recursive:true}); writeFileSync(resolve(ROOT,args.out), JSON.stringify(result,null,2)) }
    process.exit(2)
  }

  const img = dataUrl(imagePath)
  const sha256 = imageSha256(imagePath)
  const blindPrompt = `You are the BLIND independent reviewer for a mobile rebus/visual-idiom puzzle. You are deliberately NOT told the intended answer. Inspect ONLY the pixels in the supplied image. Do not infer from filename or prior context.\n\nReturn JSON only, with exactly these fields:\n{\n  "scene_summary": "...",\n  "likely_phrases": ["up to 3 idioms/sayings/titles, ranked"],\n  "visible_text": ["every readable word/phrase you can see, verbatim where possible"],\n  "strongest_alternative": "...",\n  "confidence": 0,\n  "triptych_or_contact_sheet": false,\n  "app_ui_or_mockup": false,\n  "caption_or_title_present": false,\n  "multiple_unrelated_scenes": false,\n  "obvious_answer_giveaway": false,\n  "jigsaw_landmarks_score": 0,\n  "anatomy_or_object_errors": ["..."]\n}\n\nScoring: confidence and jigsaw_landmarks_score are 0-100. Be strict. A contact sheet, numbered gallery, answer caption, puzzle UI, or several unrelated panels is a failure signal.`

  const blindCall = await responseApi({ model: blindModel, prompt: blindPrompt, image: img })
  const blind = parseJsonLoose(blindCall.text)
  const judgePrompt = `You are the INFORMED second-stage QA judge for a mobile rebus/visual-idiom puzzle.\n\nINTENDED PHRASE: ${phrase}\nTEXT POLICY: ${textMode === 'no_text' ? 'No readable text should be part of the source artwork except tiny incidental environmental text.' : 'Subtle supporting text is allowed, but the full answer must not appear and phrase words must not make the answer trivial.'}\n${components.length ? `REQUIRED MEANING COMPONENTS: ${components.join(' | ')}\n` : ''}\nBLIND REVIEW (locked before target reveal):\n${JSON.stringify(blind)}\n\nInspect the actual image too. Judge whether the image genuinely communicates the intended phrase, not merely whether it is attractive. Reject stale/recycled concepts, wrong phrases, answer captions, contact sheets/triptychs, UI, or text that gives the answer away. The intended phrase should be inferable but not insultingly obvious.\n\nReturn JSON only, with exactly these fields:\n{\n  "blind_supports_target": false,\n  "semantic_match_score": 0,\n  "inference_fairness_score": 0,\n  "giveaway_score": 0,\n  "meaning_components_visible": false,\n  "intended_stronger_than_alternatives": false,\n  "format_pass": false,\n  "anatomy_pass": false,\n  "mobile_readability_score": 0,\n  "jigsaw_score": 0,\n  "target_phrase_visible": false,\n  "direct_answer_leak": false,\n  "target_words_visible": ["..."],\n  "wrong_or_recycled_concept": false,\n  "reasons": ["specific evidence"],\n  "verdict": "PASS or REGENERATE"\n}\n\nScores are 0-100. giveaway_score means how trivially the answer is exposed; higher is worse.`

  const judgeCall = await responseApi({ model: judgeModel, prompt: judgePrompt, image: img })
  const judge = parseJsonLoose(judgeCall.text)
  const visibleRatio = visibleTargetWordRatio(phrase, blind.visible_text)
  const failures = []
  if (bool(blind.triptych_or_contact_sheet)) failures.push('contact sheet/triptych detected')
  if (bool(blind.app_ui_or_mockup)) failures.push('app UI/mockup detected')
  if (bool(blind.multiple_unrelated_scenes)) failures.push('multiple unrelated scenes detected')
  if (!bool(judge.blind_supports_target)) failures.push('blind review does not support intended phrase')
  if (num(judge.semantic_match_score) < minMatch) failures.push(`semantic match ${num(judge.semantic_match_score)} < ${minMatch}`)
  if (num(judge.inference_fairness_score) < 58) failures.push('inference is not fair enough')
  if (!bool(judge.meaning_components_visible)) failures.push('meaning components are incomplete')
  if (!bool(judge.intended_stronger_than_alternatives)) failures.push('alternative interpretation is stronger')
  if (!bool(judge.format_pass)) failures.push('format rules failed')
  if (!bool(judge.anatomy_pass)) failures.push('anatomy/object quality failed')
  if (num(judge.mobile_readability_score) < 60) failures.push('mobile readability too weak')
  if (num(judge.jigsaw_score) < 55 || num(blind.jigsaw_landmarks_score) < 50) failures.push('jigsaw landmarks too weak')
  if (bool(judge.wrong_or_recycled_concept)) failures.push('wrong or recycled concept detected')
  if (bool(judge.target_phrase_visible)) failures.push('full target phrase is visible')
  if (bool(judge.direct_answer_leak)) failures.push('direct answer leak detected')
  if (textMode === 'no_text' && bool(blind.caption_or_title_present)) failures.push('caption/title detected in no-text mode')
  if (textMode === 'subtle_text' && num(judge.giveaway_score) > maxGiveaway) failures.push(`giveaway score ${num(judge.giveaway_score)} > ${maxGiveaway}`)
  if (textMode === 'subtle_text' && visibleRatio >= 0.6) failures.push(`too many target content words are visibly printed (${Math.round(visibleRatio*100)}%)`)

  const verdict = failures.length === 0 && String(judge.verdict).toUpperCase() === 'PASS' ? 'PASS' : 'REGENERATE'
  const record = { version: 1, phrase, imagePath: args.image, candidateSha256: sha256, createdAt: new Date().toISOString(), models: { blind: blindModel, informed: judgeModel }, settings: { textMode, minMatch, maxGiveaway, components }, duplicateCheck: { exactDuplicate: false, knownAnswerCount: knownAnswers.length }, blind, informed: judge, deterministic: { visibleTargetWordRatio: visibleRatio, failures }, verdict }

  console.log(JSON.stringify(record, null, 2))
  if (args.out) {
    const outPath = resolve(ROOT, args.out)
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, JSON.stringify(record, null, 2) + '\n')
    console.error(`Saved review: ${outPath}`)
  }
  process.exit(verdict === 'PASS' ? 0 : 2)
}

main().catch(error => { console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`); process.exit(3) })
