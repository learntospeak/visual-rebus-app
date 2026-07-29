import { Button } from '../components/Button'

interface AccountPromptScreenProps {
  signedIn: boolean
  onSaveProgress: () => void
  onContinue: () => void
}

export function AccountPromptScreen({ signedIn, onSaveProgress, onContinue }: AccountPromptScreenProps) {
  return (
    <main className="app-shell account-prompt-screen">
      <header className="brand-row">
        <div className="brand-mark" aria-hidden="true">C</div>
        <span className="eyebrow">ONE LAST THING</span>
      </header>
      <section className="account-prompt-content">
        <div className="account-prompt-art" aria-hidden="true">
          <span>★</span><strong>✓</strong><span>★</span>
        </div>
        <p className="kicker">{signedIn ? 'YOU’RE ALL SET' : 'YOUR PROGRESS, YOUR CHOICE'}</p>
        <h1>{signedIn ? 'Progress safely synced.' : 'Keep your puzzle journey safe?'}</h1>
        <p>
          {signedIn
            ? 'Your solved puzzles, stars and daily streak can follow you between devices.'
            : 'Create a free account to keep solved puzzles, stars and streaks across devices. You can also play without one.'}
        </p>
        {!signedIn && <Button className="full-button" onClick={onSaveProgress}>Save my progress</Button>}
        <Button variant={signedIn ? 'primary' : 'secondary'} className="full-button" onClick={onContinue}>
          {signedIn ? 'Start playing' : 'Play without an account'} <span aria-hidden="true">→</span>
        </Button>
        <small>You can change this later from the profile button or Settings.</small>
      </section>
    </main>
  )
}
