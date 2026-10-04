import { useEffect, useRef, useState } from 'react'

export function GamesScreen({ onHome }: { onHome: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const homeCallback = useRef(onHome)
  useEffect(() => { homeCallback.current = onHome }, [onHome])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  function gamesSrc() {
    const url = new URL('./games/index.html', window.location.href)
    const params = new URLSearchParams(window.location.search)
    for (const key of ['gameMode', 'gameRound']) {
      const value = params.get(key)
      if (value) url.searchParams.set(key, value)
    }
    return url.href
  }
  const [src, setSrc] = useState(gamesSrc)
  useEffect(() => {
    document.body.classList.add('games-open')
    const timeout = window.setTimeout(() => setStatus('error'), 15000)
    const origin = window.location.origin === 'null' ? '*' : window.location.origin
    const restoreRoute = () => frame.current?.contentWindow?.postMessage({
      type: 'cluecanvas-games-navigate',
      mode: new URLSearchParams(window.location.search).get('gameMode') || '',
      round: Number(new URLSearchParams(window.location.search).get('gameRound') || 0),
    }, origin)
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow || event.origin !== window.location.origin) return
      if (event.data?.type === 'cluecanvas-games-home') homeCallback.current()
      if (event.data?.type === 'cluecanvas-games-ready') {
        window.clearTimeout(timeout)
        setStatus('ready')
        restoreRoute()
      }
      if (event.data?.type === 'cluecanvas-games-error') {
        window.clearTimeout(timeout)
        setStatus('error')
      }
      if (event.data?.type === 'cluecanvas-games-route') {
        const { mode, round } = event.data
        if (!['', 'odd', 'memory', 'next', 'belong', 'daily'].includes(mode) ||
          !Number.isInteger(round) || round < 0 || round > (mode === 'daily' ? 4 : 100)) return
        const url = new URL(window.location.href)
        for (const key of ['gameMode', 'gameRound']) url.searchParams.delete(key)
        if (mode) url.searchParams.set('gameMode', mode)
        if (round) url.searchParams.set('gameRound', String(round))
        if (url.href !== window.location.href) window.history.pushState({}, '', url)
      }
    }
    const handleNativeBack = () => {
      const url = new URL(window.location.href)
      const mode = url.searchParams.get('gameMode')
      if (!mode) { homeCallback.current(); return }
      if (mode === 'daily' || !url.searchParams.has('gameRound')) url.searchParams.delete('gameMode')
      url.searchParams.delete('gameRound')
      window.history.pushState({}, '', url)
      restoreRoute()
    }
    window.addEventListener('cluecanvas-games-back', handleNativeBack)
    window.addEventListener('message', handleMessage)
    window.addEventListener('popstate', restoreRoute)
    return () => {
      window.clearTimeout(timeout)
      document.body.classList.remove('games-open')
      window.removeEventListener('cluecanvas-games-back', handleNativeBack)
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('popstate', restoreRoute)
    }
  }, [attempt])
  return <main className="games-screen">
    <div className="games-screen-bar">
      <button className="games-home" onClick={onHome}>← Clue Canvas</button>
      <span>PUZZLE GAMES</span>
    </div>
    <div className="games-frame-container">
      <iframe key={attempt} ref={frame} title="Clue Canvas puzzle games" src={src} className="games-frame" />
      {status !== 'ready' && <div className="games-load-status" role={status === 'error' ? 'alert' : 'status'}>
        <p>{status === 'loading' ? 'Getting your games ready…' : 'The games couldn’t load. Your saved progress is still on this device.'}</p>
        {status === 'error' && <button className="games-home" onClick={() => { setStatus('loading'); setSrc(gamesSrc()); setAttempt((value) => value + 1) }}>Try loading again</button>}
      </div>}
    </div>
  </main>
}
