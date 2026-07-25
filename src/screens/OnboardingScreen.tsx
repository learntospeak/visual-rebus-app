import { Button } from '../components/Button'

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <main className="app-shell onboarding-screen">
      <header className="brand-row">
        <div className="brand-mark" aria-hidden="true">C</div>
        <span className="eyebrow">WELCOME TO CLUE CANVAS</span>
      </header>
      <section className="onboarding-content">
        <p className="kicker">SEE WORDS DIFFERENTLY</p>
        <h1>Every detail<br />is a clue.</h1>
        <div className="tutorial-card" aria-label="Example puzzle showing head over heels">
          <strong>HEAD</strong><span></span><strong>HEELS</strong>
        </div>
        <p>Look at position, size, direction and pictures. Here, <strong>HEAD</strong> is over <strong>HEELS</strong>.</p>
        <div className="tutorial-clue"><span>Clue</span> Stuck? Reveal up to three helpful clues.</div>
        <Button className="full-button" onClick={onComplete}>Start playing <span aria-hidden="true">→</span></Button>
      </section>
    </main>
  )
}
