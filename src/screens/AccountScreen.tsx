import { useState, type FormEvent } from 'react'
import { Button } from '../components/Button'
import type { CloudSyncState, PlayerAccount } from '../state/GameStore'

interface AccountScreenProps {
  account: PlayerAccount | null
  authReady: boolean
  passwordRecovery: boolean
  cloudEnabled: boolean
  syncState: CloudSyncState
  onBack: () => void
  onSignIn: (email: string, password: string) => Promise<string>
  onSignUp: (email: string, password: string) => Promise<string>
  onRequestPasswordReset: (email: string) => Promise<string>
  onUpdatePassword: (password: string) => Promise<string>
  onSignOut: () => Promise<void>
  onDeleteAccount: () => Promise<void>
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
  passwordRecovery,
  cloudEnabled,
  syncState,
  onBack,
  onSignIn,
  onSignUp,
  onRequestPasswordReset,
  onUpdatePassword,
  onSignOut,
  onDeleteAccount,
}: AccountScreenProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [confirmingDeletion, setConfirmingDeletion] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    setError('')
    try {
      const result = mode === 'signin'
        ? await onSignIn(email.trim(), password)
        : mode === 'signup'
          ? await onSignUp(email.trim(), password)
          : await onRequestPasswordReset(email.trim())
      setMessage(result)
      setPassword('')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function setNewPassword(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    setError('')
    try {
      setMessage(await onUpdatePassword(password))
      setPassword('')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to update your password.')
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

  async function deleteAccount() {
    setBusy(true)
    setMessage('')
    setError('')
    try {
      await onDeleteAccount()
      setConfirmingDeletion(false)
      setMessage('Your account and its cloud progress were permanently deleted. Progress on this device was also erased.')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to delete your account. Please try again.')
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
      ) : passwordRecovery ? (
        <form className="account-form" onSubmit={setNewPassword}>
          <div>
            <span className="eyebrow">ACCOUNT RECOVERY</span>
            <h2>Choose a new password</h2>
            <p>Enter a new password for your Clue Canvas account.</p>
          </div>
          <label>
            New password
            <input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} required autoFocus />
            <small>Use at least 8 characters.</small>
          </label>
          {message && <p className="account-message" role="status">{message}</p>}
          {error && <p className="account-error" role="alert">{error}</p>}
          <Button className="full-button" disabled={busy}>{busy ? 'Updating…' : 'Update password'}</Button>
        </form>
      ) : account ? (
        <section className="account-card">
          <div className="account-success" aria-hidden="true">✓</div>
          <span className="eyebrow">SIGNED IN</span>
          <h2>{account.email}</h2>
          <p className={`sync-status sync-${syncState}`}><span aria-hidden="true">●</span>{syncLabels[syncState]}</p>
          <p>Your best puzzle scores and daily progress follow you between devices.</p>
          <Button variant="secondary" className="full-button" disabled={busy} onClick={signOut}>Sign out</Button>
          {!confirmingDeletion ? (
            <button className="delete-account-link" disabled={busy} onClick={() => setConfirmingDeletion(true)}>Delete account and data</button>
          ) : (
            <div className="delete-account-panel" role="alert">
              <strong>Permanently delete this account?</strong>
              <p>Your account, cloud progress and progress on this device will be erased. This cannot be undone.</p>
              <div>
                <button disabled={busy} onClick={() => setConfirmingDeletion(false)}>Cancel</button>
                <button className="delete-account-confirm" disabled={busy} onClick={deleteAccount}>{busy ? 'Deleting…' : 'Permanently delete'}</button>
              </div>
            </div>
          )}
        </section>
      ) : (
        <>
          <div className="account-tabs" role="tablist" aria-label="Account action">
            <button role="tab" aria-selected={mode === 'signin'} onClick={() => setMode('signin')}>Sign in</button>
            <button role="tab" aria-selected={mode === 'signup'} onClick={() => setMode('signup')}>Create account</button>
          </div>
          <form className="account-form" onSubmit={submit}>
            <div>
              <span className="eyebrow">{mode === 'signin' ? 'WELCOME BACK' : mode === 'signup' ? 'FREE ACCOUNT' : 'ACCOUNT RECOVERY'}</span>
              <h2>{mode === 'signin' ? 'Continue your journey' : mode === 'signup' ? 'Keep your progress safe' : 'Reset your password'}</h2>
              <p>{mode === 'signin' ? 'Sign in to load your saved progress.' : mode === 'signup' ? 'Your current device progress will be added to your account.' : 'We’ll email you a secure link to choose a new password.'}</p>
            </div>
            <label>
              Email
              <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            {mode === 'signin' && <button type="button" className="forgot-password-link" disabled={busy} onClick={() => { setMode('forgot'); setMessage(''); setError('') }}>Forgot password?</button>}
            {mode !== 'forgot' && <label>
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
            </label>}
            {message && <p className="account-message" role="status">{message}</p>}
            {error && <p className="account-error" role="alert">{error}</p>}
            {mode === 'signup' && <p className="account-provider-notice">Cloud accounts are provided by Supabase, which securely processes your email, sign-in and synchronized progress. <a href="https://cluecanvas.games/privacy/" target="_blank" rel="noreferrer">Read the privacy policy</a>.</p>}
            <Button className="full-button" disabled={busy}>
              {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
            </Button>
            {mode === 'forgot' && <button type="button" className="forgot-password-link" disabled={busy} onClick={() => { setMode('signin'); setMessage(''); setError('') }}>Back to sign in</button>}
          </form>
        </>
      )}
      {message && account && <p className="account-message" role="status">{message}</p>}
      {error && account && <p className="account-error" role="alert">{error}</p>}
      <p className="account-privacy">An account is optional. Your email is used for sign-in, and your game progress is saved to your account. <a href="https://cluecanvas.games/privacy/" target="_blank" rel="noreferrer">Privacy policy</a> · <a href="https://cluecanvas.games/delete-account/" target="_blank" rel="noreferrer">Deletion help</a></p>
    </main>
  )
}
