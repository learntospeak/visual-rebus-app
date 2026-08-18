import { Button } from '../components/Button'
import { supportsDailyReminders } from '../services/reminders'
import type { CloudSyncState } from '../state/GameStore'
import type { GameSettings } from '../types'

interface SettingsScreenProps {
  settings: GameSettings
  onChange: (settings: GameSettings) => void
  onHome: () => void
  onReplayTutorial: () => void
  onResetProgress: () => void
  onAccount: () => void
  accountEmail: string | null
  syncState: CloudSyncState
  onReminderChange: (enabled: boolean) => void
  onReminderTimeChange: (time: string) => void
}

export function SettingsScreen({ settings, onChange, onHome, onReplayTutorial, onResetProgress, onAccount, accountEmail, syncState, onReminderChange, onReminderTimeChange }: SettingsScreenProps) {
  const toggle = (key: keyof GameSettings) => onChange({ ...settings, [key]: !settings[key] })
  return (
    <main className="app-shell settings-screen">
      <header className="chapter-map-header">
        <Button variant="icon" aria-label="Return home" onClick={onHome}>←</Button>
        <div><span className="eyebrow">CLUE CANVAS</span><h1>Settings</h1></div>
      </header>
      <section className="settings-list" aria-label="Game settings">
        <Toggle label="Sound" detail="Puzzle sounds and celebrations" checked={settings.soundEnabled} onChange={() => toggle('soundEnabled')} />
        <Toggle label="Background music" detail="Quiet music while you play" checked={settings.musicEnabled} onChange={() => toggle('musicEnabled')} />
        {supportsDailyReminders() && <>
          <Toggle label="Daily reminder" detail="One reminder when the next puzzle is ready" checked={settings.dailyReminderEnabled} onChange={() => onReminderChange(!settings.dailyReminderEnabled)} />
          {settings.dailyReminderEnabled && <label className="setting-row reminder-time-row">
            <span><strong>Reminder time</strong><small>Uses your device’s local time</small></span>
            <input type="time" value={settings.dailyReminderTime} onChange={(event) => onReminderTimeChange(event.target.value)} aria-label="Daily reminder time" />
          </label>}
        </>}
        <Toggle label="Haptics" detail="Gentle vibration for correct and wrong answers" checked={settings.hapticsEnabled} onChange={() => toggle('hapticsEnabled')} />
        <Toggle label="Reduced celebrations" detail="Use calmer, shorter effects" checked={settings.reducedCelebrations} onChange={() => toggle('reducedCelebrations')} />
        <Toggle label="Larger text" detail="Increase interface text size" checked={settings.largeText} onChange={() => toggle('largeText')} />
        <Toggle label="High contrast" detail="Strengthen text and borders" checked={settings.highContrast} onChange={() => toggle('highContrast')} />
      </section>
      <section className="settings-actions">
        <button className="account-setting" onClick={onAccount}>
          <span className={accountEmail ? 'account-dot is-online' : 'account-dot'} aria-hidden="true" />
          <span>
            <strong>{accountEmail ? 'Progress synced' : 'Save progress online'}</strong>
            <small>{accountEmail ?? (syncState === 'error' ? 'Connection needs attention' : 'Sign in or create a free account')}</small>
          </span>
          <b aria-hidden="true">›</b>
        </button>
        <Button variant="secondary" onClick={onReplayTutorial}>Replay tutorial</Button>
        <Button variant="text" onClick={onResetProgress}>Reset puzzle progress</Button>
        <p><a href="https://cluecanvas.games/privacy/" target="_blank" rel="noreferrer">Privacy policy</a> · <a href="https://cluecanvas.games/delete-account/" target="_blank" rel="noreferrer">Account deletion</a> · <a href="mailto:cluecanvasadmin@gmail.com">Support</a></p>
      </section>
    </main>
  )
}

function Toggle({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="setting-row">
      <span><strong>{label}</strong><small>{detail}</small></span>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </label>
  )
}
