import { useState } from 'react'
import { Button } from '../components/Button'

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)

  return (
    <main className="app-shell onboarding-screen">
      <header className="brand-row onboarding-header">
        <div className="brand-mark" aria-hidden="true">C</div>
        <span className="eyebrow">WELCOME TO CLUE CANVAS</span>
        {step < 2 && <button className="onboarding-skip" onClick={onComplete}>Skip</button>}
      </header>

      <section className="onboarding-content" aria-live="polite">
        <div className="onboarding-stage" key={step}>
          {step === 0 && (
            <>
              <p className="kicker">SEE WORDS DIFFERENTLY</p>
              <h1>Every detail<br />is a clue.</h1>
              <div className="tutorial-card tutorial-position" aria-label="Example puzzle showing head over heels">
                <strong>HEAD</strong><span></span><strong>HEELS</strong>
              </div>
              <p>Look at position, size, direction and pictures. Here, <strong>HEAD</strong> is over <strong>HEELS</strong>.</p>
            </>
          )}

          {step === 1 && (
            <>
              <p className="kicker">CLUES WHEN YOU NEED THEM</p>
              <h1>Earn up to<br />three stars.</h1>
              <div className="tutorial-card tutorial-stars" aria-label="Three star scoring guide">
                <div><span>★★★</span><strong>No clues</strong></div>
                <div><span>★★☆</span><strong>One clue</strong></div>
                <div><span>★☆☆</span><strong>More help</strong></div>
              </div>
              <p>Clues lower the score, but there is no penalty for learning. Revealing the answer earns no stars.</p>
            </>
          )}

          {step === 2 && (
            <>
              <p className="kicker">PLAY YOUR WAY</p>
              <h1>A fresh little<br />aha moment.</h1>
              <div className="tutorial-card tutorial-modes" aria-label="Journey, daily puzzle and optional cloud saving">
                <div><span aria-hidden="true">↗</span><strong>Journey</strong><small>Work through the full collection</small></div>
                <div><span aria-hidden="true">☀</span><strong>Daily</strong><small>One new challenge each day</small></div>
                <div><span aria-hidden="true">☁</span><strong>Cloud save</strong><small>Optional progress across devices</small></div>
              </div>
              <p>Create an account only if you want cloud saving. You can always play as a guest.</p>
            </>
          )}
        </div>

        <div className="onboarding-progress" aria-label={`Introduction step ${step + 1} of 3`}>
          {[0, 1, 2].map((index) => <span key={index} className={index === step ? 'is-current' : ''} />)}
        </div>
        <div className="onboarding-actions">
          {step > 0 && <Button variant="secondary" onClick={() => setStep((current) => current - 1)}>Back</Button>}
          <Button className={step === 0 ? 'full-button' : ''} onClick={() => step === 2 ? onComplete() : setStep((current) => current + 1)}>
            {step === 2 ? 'Start playing' : 'Next'} <span aria-hidden="true">→</span>
          </Button>
        </div>
      </section>
    </main>
  )
}
