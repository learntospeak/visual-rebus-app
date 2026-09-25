import {useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Button} from '../../../src/components/Button'
import {LogicChapter} from './LogicChapter'
import '../../../src/styles.css'
import './prototype.css'
function Prototype(){
 const [scene,setScene]=useState<number|null>(null)
 if(scene!==null)return <LogicChapter initialScene={scene} onExit={()=>setScene(null)}/>
 return <main className="app-shell logic-home"><header className="brand-row"><span className="brand-mark">C</span><strong>clue canvas</strong><span className="logic-preview-label">PLAYTEST</span></header>
 <section className="hero"><p className="kicker">CLUE LOGIC</p><h1>A story.<br/>A clue.<br/>Your move.</h1><p className="hero-copy">Two connected scenes. Something is always about to go wrong.</p><Button className="hero-button" onClick={()=>setScene(0)}>Start the chapter <span>→</span></Button></section>
 <section className="logic-scene-list" aria-label="Playtest scenes"><article><span className="eyebrow">SCENE 01 · THE STOVE</span><h2>Before Service</h2><p>Dinner starts with a little patience.</p><Button variant="secondary" onClick={()=>setScene(0)}>Play first scene</Button></article><article><span className="eyebrow">NEW · SCENE 02 · THE SERVICE COUNTER</span><h2>A Balancing Problem</h2><p>Through the doorway, keeping service moving takes more than one pair of hands.</p><Button onClick={()=>setScene(1)}>Try the new scene →</Button></article></section>
 <p className="trust-note">A separate playtest. Your main-game progress stays safe.</p></main>
}
createRoot(document.getElementById('root')!).render(<Prototype/>);
