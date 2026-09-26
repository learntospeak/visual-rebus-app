import './mystery.css'
import {MysteryChapter} from './MysteryChapter'
import {useLayoutEffect,useState} from 'react'
import {createRoot} from 'react-dom/client'
import {Button} from '../../../src/components/Button'
import {LogicChapter} from './LogicChapter'
import {playableScenes,sceneTitles} from './model'
import {categories} from './categories'
import '../../../src/styles.css'
import './prototype.css'
function Prototype(){
 const [mystery,setMystery]=useState(false),[scene,setScene]=useState<number|null>(null),[category,setCategory]=useState<string|null>(null)
 const group=categories.find(c=>c.id===category)
 useLayoutEffect(()=>{window.scrollTo({top:0,left:0,behavior:'instant'})},[category,scene,mystery])
 if(mystery)return <MysteryChapter onExit={()=>setMystery(false)}/>
 if(scene!==null)return <LogicChapter initialScene={scene} sceneOrder={group?.scenes} onExit={()=>setScene(null)}/>
 const caseCard=<section className="case-home-card"><p className="kicker">FIVE CONNECTED PUZZLES · CASE 01</p><h2>The opening-night mix-up</h2><p>Solve five phrases. Each scene reveals one discovery. Put them together to solve the case.</p><Button onClick={()=>setMystery(true)}>Open the case →</Button></section>
 return <main className="app-shell logic-home"><header className="brand-row"><span className="brand-mark">C</span><strong>clue canvas</strong><span className="logic-preview-label">PLAYTEST</span></header>
 {category?<><button className="text-button" onClick={()=>setCategory(null)}>← All categories</button><h1>{category==='mysteries'?'Restaurant mysteries':group?.title}</h1><p>{group?.description}</p>{category==='mysteries'?caseCard:<section className="logic-scene-list" aria-label={group?.title}>{group?.scenes.map((index,i)=><article key={playableScenes[index].id}><span className="eyebrow">PUZZLE {i+1} · {playableScenes[index].place.toUpperCase()}</span><h2>{sceneTitles[index]}</h2><p>{playableScenes[index].lead}</p><Button variant="secondary" onClick={()=>setScene(index)}>Play puzzle →</Button></article>)}</section>}</>:<><section className="hero"><p className="kicker">CLUE LOGIC</p><h1>A story.<br/>A clue.<br/>Your move.</h1><p className="hero-copy">Choose a category. Solve a phrase—or follow a whole mystery.</p></section><section className="logic-scene-list" aria-label="Puzzle categories"><article><span className="eyebrow">1 CASE · 5 CONNECTED PUZZLES</span><h2>Restaurant mysteries</h2><p>Collect evidence one scene at a time, then make your deduction.</p><Button onClick={()=>setCategory('mysteries')}>Explore mysteries →</Button></article>{categories.map(c=><article key={c.id}><span className="eyebrow">{c.scenes.length} {c.scenes.length===1?'PUZZLE':'PUZZLES'}</span><h2>{c.title}</h2><p>{c.description}</p><Button variant="secondary" onClick={()=>setCategory(c.id)}>Explore category →</Button></article>)}</section></>}
 <p className="trust-note">A separate playtest. Your main-game progress stays safe.</p></main>
}
createRoot(document.getElementById('root')!).render(<Prototype/>);
