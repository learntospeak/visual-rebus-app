import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve, relative, isAbsolute } from 'node:path'
import { puzzles } from '../src/data/puzzles'

const root = process.cwd()
const mode = process.argv[2] || 'preflight'
const errors: string[] = []
const fail = (message: string) => errors.push(message)
const norm = (s: string) => s.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g, '')
const nonempty = (s: unknown) => typeof s === 'string' && s.trim().length > 0
function localFile(name: unknown): string | null {
  if (!nonempty(name)) return null
  const full = resolve(root, name as string)
  const rel = relative(root, full)
  return rel.startsWith('..') || isAbsolute(rel) || !existsSync(full) ? null : full
}
const reviewGates = ['inference','meaning','ambiguity','duplicates','format','anatomy','mobile','jigsaw']
const technicalGates = ['mobile320','mobile390','desktop','swap','rotation','contiguous','answerGate','repeatLetters','punctuationSpaces','usedKeys','completion']
function checkGates(gates: any, names: string[], label: string) {
  for (const name of names) if (gates?.[name]?.pass !== true || !nonempty(gates?.[name]?.evidence)) fail(`${label}: missing/failed ${name}`)
}
try {
  if (!['preflight','ready'].includes(mode)) throw new Error('Mode must be preflight or ready')
  const batch = JSON.parse(readFileSync(resolve(root, 'qa/assembly/batch.json'), 'utf8'))
  if (batch.schemaVersion !== 1 || !Array.isArray(batch.queue) || !Array.isArray(batch.approvedAnswers) || !Array.isArray(batch.candidates)) throw new Error('Invalid batch schema')
  if (!Number.isInteger(batch.batchSize) || batch.batchSize<1) fail('batchSize must be a positive integer')
  const catalogueSha256 = createHash('sha256').update(readFileSync(resolve(root, 'src/data/puzzles.ts'))).update(JSON.stringify([...batch.approvedAnswers].sort())).update(JSON.stringify(batch.approvedArtworkInventory || [])).update(JSON.stringify(batch.candidates.map((c:any)=>({phrase:c.phrase,sha256:c.sha256})).sort((a:any,b:any)=>a.phrase.localeCompare(b.phrase)))).digest('hex')
  console.log(`Catalogue fingerprint: ${catalogueSha256}`)
  const excluded = new Set([...puzzles.map(p=>p.answer), ...batch.approvedAnswers].map(norm))
  const queueSeen = new Set<string>()
  for (const phrase of batch.queue) {
    if (!nonempty(phrase)) { fail('Empty queue phrase'); continue }
    const key = norm(phrase)
    if (excluded.has(key) || queueSeen.has(key)) fail(`Duplicate queue phrase: ${phrase}`)
    queueSeen.add(key)
  }
  const seen = new Set<string>(), ids = new Set<string>()
  const ready = batch.candidates.filter((c:any)=>c.status==='ready_for_user')
  for (const c of batch.candidates) {
    if (!nonempty(c.id) || ids.has(c.id)) fail('Missing/duplicate candidate id')
    ids.add(c.id)
    if (!nonempty(c.phrase)) { fail(`${c.id}: missing phrase`); continue }
    if (!['draft','reviewing','needs_revision','parked','ready_for_user','approved'].includes(c.status)) fail(`${c.id}: invalid status`)
    const key = norm(c.phrase)
    if (seen.has(key) || (c.status!=='approved' && excluded.has(key))) fail(`${c.id}: duplicate phrase`)
    seen.add(key)
    if (!['ready_for_user','approved'].includes(c.status)) continue
    const image = localFile(c.imagePath), review = localFile(c.reviewPath)
    if (!image || !review) { fail(`${c.id}: missing source image or review file`); continue }
    const hash = createHash('sha256').update(readFileSync(image)).digest('hex')
    const r = JSON.parse(readFileSync(review, 'utf8'))
    if (r.intendedPhrase !== c.phrase) fail(`${c.id}: review belongs to another phrase`)
    if (c.status==='ready_for_user' && !queueSeen.has(key)) fail(`${c.id}: phrase is not in current queue`)
    if (c.status==='ready_for_user' && (!Array.isArray(batch.approvedArtworkInventory) || batch.approvedAnswers.some((a:string)=>!batch.approvedArtworkInventory.some((i:any)=>norm(i.answer)===norm(a)&&/^[a-f0-9]{64}$/.test(i.sha256))))) fail(`${c.id}: approved artwork inventory hashes must be recorded before review`)
    if (c.status==='ready_for_user' && r.catalogueSha256 !== catalogueSha256) fail(`${c.id}: duplicate review is stale`)
    const cfg=c.renderConfig
    if (!cfg || !Array.isArray(cfg.grids) || cfg.grids.length===0 || !cfg.grids.every((g:any)=>Number.isInteger(g.cols)&&g.cols>0&&Number.isInteger(g.rows)&&g.rows>0) || typeof cfg.aspect!=='number' || cfg.aspect<=0 || !['contain','cover'].includes(cfg.cropPolicy) || !Array.isArray(cfg.viewportWidths) || ![320,390].every(w=>cfg.viewportWidths.includes(w)) || !cfg.viewportWidths.some((w:any)=>typeof w==='number'&&w>=1024)) fail(`${c.id}: incomplete render configuration`)
    if (!c.renderConfig || !r.renderConfig || JSON.stringify(c.renderConfig) !== JSON.stringify(r.renderConfig)) fail(`${c.id}: missing/changed tested render configuration`)
    if (hash !== c.sha256 || hash !== r.candidateSha256) fail(`${c.id}: changed image / stale review`)
    if (!nonempty(c.creatorId) || !nonempty(r.reviewerId) || c.creatorId === r.reviewerId) fail(`${c.id}: independent reviewer required`)
    if (r.blind?.recordedBeforeReveal !== true || !Array.isArray(r.blind?.guesses) || r.blind.guesses.length<1 || r.blind.guesses.length>3 || !r.blind.guesses.every(nonempty) || !nonempty(r.blind?.evidence) || !nonempty(r.blind?.observedMeaning)) fail(`${c.id}: missing blind review`)
    checkGates(r.checks, reviewGates, `${c.id} reviewer`)
    checkGates(c.technicalEvidence, technicalGates, `${c.id} technical`)
    if (c.status==='approved' && (!nonempty(c.userApproval?.text) || !nonempty(c.userApproval?.date))) fail(`${c.id}: explicit user approval required`)
  }
  if (mode==='ready' && ready.length===0) fail('No independently reviewed candidates are ready for user approval')
  if (ready.length > batch.batchSize) fail('Ready batch exceeds configured batch size')
  console.log(`Assembly QA: ${batch.queue.length} queued; ${ready.length} ready. Catalogue: ${puzzles.length} puzzles.`)
  console.log('Semantic/visual duplicates and image correctness require the separate reviewer; this script does not certify them.')
} catch (error) { fail(error instanceof Error ? error.message : String(error)) }
for (const error of errors) console.error(`FAIL: ${error}`)
if (errors.length) process.exit(1)
console.log(`PASS: ${mode} structural checks`)
