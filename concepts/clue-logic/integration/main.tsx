import {useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Button} from '../../../src/components/Button'
import {LogicChapter} from './LogicChapter'
import '../../../src/styles.css'
import './prototype.css'
function Prototype(){const [screen,setScreen]=useState<'home'|'puzzle'>('home');return screen==='puzzle'?<LogicChapter onExit={()=>setScreen('home')}/>:<main className="app-shell logic-home"><header className="brand-row"><span className="brand-mark">C</span><strong>clue canvas</strong><span className="logic-preview-label">PLAYTEST</span></header><section className="hero"><p className="kicker">CLUE LOGIC</p><h1>A story.<br/>A clue.<br/>Your move.</h1><p className="hero-copy">The familiar puzzle game, with a scene that comes to life.</p><Button className="hero-button" onClick={()=>setScreen('puzzle')}>Play Before Service <span>→</span></Button></section><section className="progress-card"><div><span className="eyebrow">THE GRAND OPENING</span><strong>Before Service</strong><p>One animated puzzle · three lifelines</p></div></section><p className="trust-note">A separate playtest. Your main-game progress stays safe.</p></main>}
createRoot(document.getElementById('root')!).render(<Prototype/>);

