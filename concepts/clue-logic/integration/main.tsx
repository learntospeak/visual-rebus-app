import {useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Button} from '../../../src/components/Button'
import {LogicChapter} from './LogicChapter'
import {playableScenes,sceneTitles} from './model'
import '../../../src/styles.css'
import './prototype.css'
function Prototype(){
 const [scene,setScene]=useState<number|null>(null)
 if(scene!==null)return <LogicChapter initialScene={scene} onExit={()=>setScene(null)}/>
 return <main className="app-shell logic-home"><header className="brand-row"><span className="brand-mark">C</span><strong>clue canvas</strong><span className="logic-preview-label">PLAYTEST</span></header>
 <section className="hero"><p className="kicker">CLUE LOGIC</p><h1>A story.<br/>A clue.<br/>Your move.</h1><p className="hero-copy">Seven connected scenes. Something is always about to go wrong.</p><Button className="hero-button" onClick={()=>setScene(2)}>Play the five new scenes <span>→</span></Button><Button variant="secondary" onClick={()=>setScene(0)}>Start from the beginning</Button></section>
 <section className="logic-scene-list" aria-label="Playtest scenes">{playableScenes.map((entry,index)=><article key={entry.id}><span className="eyebrow">{index>1?'NEW · ':''}SCENE {String(index+1).padStart(2,'0')} · {entry.place.toUpperCase()}</span><h2>{sceneTitles[index]}</h2><p>{entry.lead}</p><Button variant="secondary" onClick={()=>setScene(index)}>Play scene {index+1} →</Button></article>)}</section>
 <p className="trust-note">A separate playtest. Your main-game progress stays safe.</p></main>
}
createRoot(document.getElementById('root')!).render(<Prototype/>);