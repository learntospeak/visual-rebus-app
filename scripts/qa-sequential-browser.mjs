import assert from 'node:assert/strict'

const endpoint = process.argv[2] ?? 'http://127.0.0.1:9222'
const pages = await fetch(`${endpoint}/json`).then((response) => response.json())
const page = pages.find((candidate) => candidate.type === 'page')
assert.ok(page?.webSocketDebuggerUrl, 'A debuggable browser page is required.')

const socket = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

let requestId = 0
const pending = new Map()
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  const handler = pending.get(message.id)
  if (!handler) return
  pending.delete(message.id)
  if (message.error) handler.reject(new Error(message.error.message))
  else handler.resolve(message.result)
})

function call(method, params = {}) {
  const id = ++requestId
  socket.send(JSON.stringify({ id, method, params }))
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function evaluate(expression) {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true })
  return result.result.value
}

async function targetRect(attribute, targetId) {
  return evaluate(`(() => {
    const rect=document.querySelector('[${attribute}="${targetId}"]').getBoundingClientRect();
    return {left:rect.left,top:rect.top,width:rect.width,height:rect.height,right:rect.right,bottom:rect.bottom};
  })()`)
}

async function mousePath(points) {
  await call('Input.dispatchMouseEvent', { type: 'mousePressed', x: points[0].x, y: points[0].y, button: 'left', buttons: 1, clickCount: 1 })
  for (const point of points.slice(1)) {
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: point.x, y: point.y, button: 'left', buttons: 1 })
    await wait(35)
  }
  const last = points.at(-1)
  await call('Input.dispatchMouseEvent', { type: 'mouseReleased', x: last.x, y: last.y, button: 'left', buttons: 0, clickCount: 1 })
  await wait(220)
}

async function assertStep(expectedStep) {
  assert.equal(await evaluate("document.querySelector('[data-sequential-key]')?.dataset.sequentialStep"), expectedStep)
}

async function runGestureFlow252() {
  await call('Page.navigate', { url: 'http://localhost:5173/?puzzle=252' })
  await wait(700)
  const timeline = await targetRect('data-seq-target', 'timeline')
  await mousePath([
    { x: timeline.left + timeline.width * .34, y: timeline.top + timeline.height / 2 },
    { x: timeline.left + timeline.width * .61, y: timeline.top + timeline.height / 2 },
  ])
  await assertStep('rewind-timeline')
  assert.equal((await evaluate("document.querySelector('.escape-room-feedback')?.textContent.toLowerCase()"))?.includes('year dot') ?? false, false)
  await mousePath([
    { x: timeline.left + timeline.width * .61, y: timeline.top + timeline.height / 2 },
    { x: timeline.left + timeline.width * .34, y: timeline.top + timeline.height / 2 },
  ])
  await assertStep('align-origin')

  const wheel = await targetRect('data-seq-target', 'origin-wheel')
  const wheelCenter = { x: wheel.left + wheel.width / 2, y: wheel.top + wheel.height / 2 }
  const radius = wheel.width * .37
  await mousePath([
    { x: wheelCenter.x + radius, y: wheelCenter.y },
    { x: wheelCenter.x + radius * .7, y: wheelCenter.y - radius * .7 },
    { x: wheelCenter.x, y: wheelCenter.y - radius },
    { x: wheelCenter.x - radius * .7, y: wheelCenter.y - radius * .7 },
    { x: wheelCenter.x - radius, y: wheelCenter.y },
  ])
  await assertStep('compress-year')

  const medallion = await targetRect('data-seq-target', 'year-medallion')
  const centreX = medallion.left + medallion.width / 2
  const centreY = medallion.top + medallion.height / 2
  await call('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: centreX - 28, y: centreY, id: 1 }, { x: centreX + 28, y: centreY, id: 2 }],
  })
  await wait(60)
  await call('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: centreX - 19, y: centreY, id: 1 }, { x: centreX + 19, y: centreY, id: 2 }],
  })
  await wait(60)
  await call('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: centreX - 10, y: centreY, id: 1 }, { x: centreX + 10, y: centreY, id: 2 }],
  })
  await wait(120)
  await call('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await wait(250)
  await assertStep('solved')
}

async function runGestureFlow253() {
  await call('Page.navigate', { url: 'http://localhost:5173/?puzzle=253' })
  await wait(700)
  const page = await targetRect('data-seq-target', 'storybook-page')
  await mousePath([
    { x: page.left + 10, y: page.top + page.height / 2 },
    { x: page.right - 10, y: page.top + page.height / 2 },
  ])
  await assertStep('turn-page')
  assert.equal((await evaluate("document.querySelector('.escape-room-feedback')?.textContent.toLowerCase()"))?.includes('once upon a time') ?? false, false)
  await mousePath([
    { x: page.right - 10, y: page.top + page.height / 2 },
    { x: page.left + 10, y: page.top + page.height / 2 },
  ])
  await assertStep('wind-clock')

  const wheel = await targetRect('data-seq-target', 'clock-wheel')
  const wheelCenter = { x: wheel.left + wheel.width / 2, y: wheel.top + wheel.height / 2 }
  const radius = wheel.width * .37
  await mousePath([
    { x: wheelCenter.x + radius, y: wheelCenter.y },
    { x: wheelCenter.x + radius * .7, y: wheelCenter.y + radius * .7 },
    { x: wheelCenter.x, y: wheelCenter.y + radius },
    { x: wheelCenter.x - radius * .7, y: wheelCenter.y + radius * .7 },
    { x: wheelCenter.x - radius, y: wheelCenter.y },
  ])
  await assertStep('place-once')

  const wordplate = await targetRect('data-seq-target', 'once-wordplate')
  const drop = await targetRect('data-seq-drop', 'clock-crown')
  await mousePath([
    { x: wordplate.left + wordplate.width / 2, y: wordplate.top + wordplate.height / 2 },
    { x: drop.left + drop.width / 2, y: drop.top + drop.height / 2 },
  ])
  await assertStep('solved')
}

async function runFlow(puzzleId, key, expectedSteps) {
  await call('Page.navigate', { url: `http://localhost:5173/?puzzle=${puzzleId}` })
  await wait(700)
  assert.equal(await evaluate("document.querySelector('[data-sequential-key]')?.dataset.sequentialKey"), key)
  assert.equal(await evaluate("document.querySelector('[data-sequential-key]')?.dataset.sequentialStep"), expectedSteps[0])

  for (const expectedStep of expectedSteps.slice(1)) {
    assert.equal(await evaluate("Boolean(document.querySelector('.sequential-access-action')?.click() ?? true)"), true)
    await wait(180)
    assert.equal(await evaluate("document.querySelector('[data-sequential-key]')?.dataset.sequentialStep"), expectedStep)
  }

  assert.equal(await evaluate("document.querySelector('[data-sequential-key]')?.classList.contains('is-solved')"), true)
  await wait(850)
  assert.equal(await evaluate("Boolean(document.querySelector('.solve-celebration'))"), true)
}

await call('Runtime.enable')
await call('Page.enable')
await runFlow(252, 'year-dot', ['rewind-timeline', 'align-origin', 'compress-year', 'solved'])
await runFlow(253, 'once-upon-time', ['turn-page', 'wind-clock', 'place-once', 'solved'])
await runGestureFlow252()
await runGestureFlow253()
socket.close()

console.log('Browser QA passed both three-lock flows with accessible controls and real swipe, rotate, pinch and drag gestures.')
