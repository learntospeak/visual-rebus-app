import { useEffect, useRef } from 'react'

export function GamesScreen({ onHome }: { onHome: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source === frame.current?.contentWindow && event.data?.type === 'cluecanvas-games-home') onHome()
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onHome])
  return <main className="games-screen">
    <div className="games-screen-bar">
      <button className="games-home" onClick={onHome}>← Clue Canvas</button>
      <span>PUZZLE GAMES</span>
    </div>
    <iframe ref={frame} title="Clue Canvas puzzle games" src="./games/index.html" className="games-frame" />
  </main>
}
