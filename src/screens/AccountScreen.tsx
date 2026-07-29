import { useState, type FormEvent } from 'react'
import { Button } from '../components/Button'
import type { CloudSyncState, PlayerAccount } from '../state/GameStore'

interface AccountScreenProps {
  account: PlayerAccount | null
  authReady: boolean
  cloudEnabled: boolean
  syncState: CloudSyncState
  onBack: () => void
  onSignIn: (email: string, password: string) => Promise<string>
  onSignUp: (email: string, password: string) => Promise<string>
  onSignOut: () => Promise<void>
}

const syncLabels: Record<CloudSyncState, string> = {
  offline: 'Progress is saved on this device',
  connecting: 'Connecting to your account…',
  saving: 'Saving progress…',
  synced: 'Progress is synced',
  error: 'Sync needs attention',
}

export function AccountScreen({
  account,
  authReady,
  cloudEnabled,
  syncState,
  onBack,
  onSignIn,
  onSignUp,
  onSignOut,
}: AccountScreenProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    setError('')
    try {
      const result = mode === 'signin'
        ? await onSignIn(email.trim(), password)
        : await onSignUp(email.trim(), password)
      setMessage(result)
      setPassword('')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    setBusy(true)
    setError('')
    try {
      await onSignOut()
      setMessage('Signed out. Your progress remains saved on this device.')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to sign out.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="app-shell account-screen">
      <header className="chapter-map-header">
        <Button variant="icon" aria-label="Return to settings" onClick={onBack}>←</Button>
        <div><span className="eyebrow">CLUE CANVAS</span><h1>Your account</h1></div>
      </header>

      {!cloudEnabled ? (
        <section className="account-card">
          <h2>Cloud saving isn’t configured</h2>
          <p>You can continue playing normally. Progress will remain on this device.</p>
        </section>
      ) : !authReady ? (
        <section className="account-card account-loading" aria-live="polite">
          <span className="account-spinner" aria-hidden="true" />
          <p>Checking your account…</p>
        </section>
      ) : account ? (
        <section className="account-card">
          <div className="account-success" aria-hidden="true">✓</div>
          <span className="eyebrow">SIGNED IN</span>
          <h2>{account.email}</h2>
          <p className={`sync-status sync-${syncState}`}><span aria-hidden="true">●</span>{syncLabels[syncState]}</p>
          <p>Your best puzzle scores and daily progress follow you between devices.</p>
          <Button variant="secondary" className="full-button" disabled={busy} onClick={signOut}>Sign out</Button>
        </section>
      ) : (
        <>
          <div className="account-tabs" role="tablist" aria-label="Account action">
            <button role="tab" aria-selected={mode === 'signin'} onClick={() => setMode('signin')}>Sign in</button>
            <button role="tab" aria-selected={mode === 'signup'} onClick={() => setMode('signup')}>Create account</button>
          </div>
          <form className="account-form" onSubmit={submit}>
            <div>
              <span className="eyebrow">{mode === 'signin' ? 'WELCOME BACK' : 'FREE ACCOUNT'}</span>
              <h2>{mode === 'signin' ? 'Continue your journey' : 'Keep your progress safe'}</h2>
              <p>{mode === 'signin' ? 'Sign in to load your saved progress.' : 'Your current device progress will be added to your account.'}</p>
            </div>
            <label>
              Email
              <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label>
              Password
              <input
                type="password"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
              />
              {mode === 'signup' && <small>Use at least 8 characters.</small>}
            </label>
            {message && <p className="account-message" role="status">{message}</p>}
            {error && <p className="account-error" role="alert">{error}</p>}
            <Button className="full-button" disabled={busy}>
              {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </Button>
          </form>
        </>
      )}
      {message && account && <p className="account-message" role="status">{message}</p>}
      {error && account && <p className="account-error" role="alert">{error}</p>}
      <p className="account-privacy">An account is optional. Your email is used for sign-in, and your game progress is saved to your account.</p>
    </main>
  )
}
