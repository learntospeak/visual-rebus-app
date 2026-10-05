import { Button } from '../components/Button'
import './HomeScreen.css'

interface Props { onHome: () => void; onResume: () => void; onBrowse: () => void; onDaily: () => void }

export function PicturePuzzlesMenuScreen({ onHome, onResume, onBrowse, onDaily }: Props) {
  return (
    <main className="app-shell pp-screen">
      <header>
        <h1>Picture Puzzles</h1>
        <Button variant="secondary" onClick={onHome}>Return home</Button>
      </header>
      <Button onClick={onResume}>Back to puzzle</Button>
      <Button variant="secondary" onClick={onBrowse}>Browse puzzles</Button>
      <section className="pp-card" aria-labelledby="pp-daily-h">
        <h2 id="pp-daily-h">Daily picture puzzle</h2>
        <p>One original daily rebus. The four-game mix is separate, under Today’s Challenge on Home.</p>
        <Button variant="secondary" onClick={onDaily}>Daily picture puzzle</Button>
      </section>
    </main>
  )
}
