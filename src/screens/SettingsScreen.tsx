import { Button } from '../components/Button'
import type { GameSettings } from '../types'

interface SettingsScreenProps {
  settings: GameSettings
  onChange: (settings: GameSettings) => void
  onHome: () => void
  onReplayTutorial: () => void
  onResetProgress: () => void
}

export function SettingsScreen({ settings, onChange, onHome, onReplayTutorial, onResetProgress }: SettingsScreenProps) {
  const toggle = (key: keyof GameSettings) => onChange({ ...settings, [key]: !settings[key] })
  return (
    <main className="app-shell settings-screen">
      <header className="chapter-map-header">
        <Button variant="icon" aria-label="Return home" onClick={onHome}>←</Button>
        <div><span className="eyebrow">CLUE CANVAS</span><h1>Settings</h1></div>
      </header>
      <section className="settings-list" aria-label="Game settings">
        <Toggle label="Sound" detail="Puzzle sounds and celebrations" checked={settings.soundEnabled} onChange={() => toggle('soundEnabled')} />
        <Toggle label="Reduced celebrations" detail="Use calmer, shorter effects" checked={settings.reducedCelebrations} onChange={() => toggle('reducedCelebrations')} />
        <Toggle label="Larger text" detail="Increase interface text size" checked={settings.largeText} onChange={() => toggle('largeText')} />
        <Toggle label="High contrast" detail="Strengthen text and borders" checked={settings.highContrast} onChange={() => toggle('highContrast')} />
      </section>
      <section className="settings-actions">
        <Button variant="secondary" onClick={onReplayTutorial}>Replay tutorial</Button>
        <Button variant="text" onClick={onResetProgress}>Reset puzzle progress</Button>
        <p>Privacy and support links will be connected before release.</p>
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
