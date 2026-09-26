import {sceneTitles,sceneDescriptions,playableScenes} from './model'

import {useEffect,useRef,useState} from 'react'
import {createSceneSound} from './scene-sound'
import {createPlateSound} from './plate-sound'
import {Button} from '../../../src/components/Button'

export interface AnimatedClueProps {sceneIndex?:number;hintRevision:number;hintOpened:boolean;onStarted:()=>void;onError?:(message:string)=>void}
type View='auto'|'watch'|'away'|'inspect'
// No puzzle answers, saves, purchases or account access inside the renderer.
export function AnimatedClue({sceneIndex=0,hintRevision,hintOpened,onStarted,onError}:AnimatedClueProps){
 const illustrated=[3,4,6].includes(sceneIndex),isPlates=sceneIndex===1,duration=sceneIndex===0?22:26
 const canvas=useRef<HTMLCanvasElement>(null),stage=useRef<HTMLDivElement>(null)
 const controls=useRef({time:0,view:'auto' as View,playing:false,audioActive:false,started:false,instant:true})
 const [ready,setReady]=useState(false),[error,setError]=useState(''),[started,setStarted]=useState(false),[playing,setPlaying]=useState(false),[away,setAway]=useState(false),[time,setTime]=useState(0),[expanded,setExpanded]=useState(false),[description,setDescription]=useState(false)
 const [soundError,setSoundError]=useState(false)
 const sound=useRef<ReturnType<typeof createSceneSound>|null>(null)
 useEffect(()=>{sound.current=sceneIndex>1?null:(isPlates?createPlateSound:createSceneSound)(()=>setSoundError(true));return()=>{sound.current?.dispose();sound.current=null}},[])
 function syncSound(){const c=controls.current;sound.current?.update({time:c.time,view:c.view,active:c.started&&c.audioActive&&!document.hidden,playing:c.playing})}
 const onErrorRef=useRef(onError);onErrorRef.current=onError
 const reduced=useRef(matchMedia('(prefers-reduced-motion: reduce)').matches)
 const previousFocus=useRef<HTMLElement|null>(null)
 useEffect(()=>{
  let cancelled=false,frame=0,last=performance.now(),lastUi=0
  let kitchen:Awaited<ReturnType<typeof import('../cinema-scene.mjs')['makeKitchen']>>|null=null
  const mq=matchMedia('(prefers-reduced-motion: reduce)')
  const motion=()=>{reduced.current=mq.matches;if(mq.matches){controls.current.playing=false;controls.current.instant=true;setPlaying(false);controls.current.audioActive=false;sound.current?.stop()}}
  mq.addEventListener('change',motion)
  const visibility=()=>{last=performance.now();if(document.hidden){sound.current?.stop()}else syncSound()}
  document.addEventListener('visibilitychange',visibility)
  function fit(){if(!canvas.current||!stage.current)return;const {width:w,height:h}=stage.current.getBoundingClientRect();const ratio=matchMedia('(max-width:700px)').matches?1/1.06:16/11;const width=Math.min(w,h*ratio);canvas.current.style.width=`${width}px`;canvas.current.style.height=`${width/ratio}px`}
  const observer=new ResizeObserver(fit);if(stage.current)observer.observe(stage.current)
  window.addEventListener('resize',fit);fit()
  ;(illustrated?import('../restaurant-scene.mjs'):sceneIndex===2?import('../storybook-scene.mjs'):sceneIndex>1?import('../story-scene.mjs'):isPlates?import('../plates-scene.mjs'):import('../cinema-scene.mjs')).then(async({makeKitchen})=>{
   if(cancelled||!canvas.current)return;const renderer=await makeKitchen(canvas.current,playableScenes[sceneIndex].id);if(cancelled){renderer.dispose();return}kitchen=renderer;setReady(true)
   const tick=(now:number)=>{if(cancelled)return;const dt=Math.min((now-last)/1000,.06);last=now;const c=controls.current
    if(!document.hidden){if(c.playing){c.time=Math.min(duration,c.time+dt);if(c.time===duration){if(illustrated&&!reduced.current){c.time=0}else{c.playing=false;c.audioActive=false;setPlaying(false)}}}
     syncSound();kitchen?.draw({time:c.time,delta:c.started&&(c.playing||c.audioActive)&&!reduced.current?dt:0,view:c.view,running:c.started,won:false,instant:c.instant||reduced.current});c.instant=false
     if(now-lastUi>200){setTime(c.time);lastUi=now}}
    frame=requestAnimationFrame(tick)
   };frame=requestAnimationFrame(tick)
  }).catch(()=>{if(cancelled)return;const message='The animation could not load. Try reloading or use the scene description below.';setError(message);onErrorRef.current?.(message)})
  return()=>{cancelled=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('resize',fit);document.removeEventListener('visibilitychange',visibility);mq.removeEventListener('change',motion);kitchen?.dispose()}
 },[])
 function begin(){sound.current?.reset();sound.current?.unlock();const c=controls.current;c.started=true;c.time=0;c.view='auto';c.playing=!reduced.current;c.audioActive=c.playing;c.instant=reduced.current;setStarted(true);setPlaying(c.playing);setAway(false);setTime(0);onStarted();syncSound()}
 function inspect(){sound.current?.unlock();const c=controls.current;c.started=true;c.time=duration;c.view='inspect';c.playing=false;c.audioActive=true;c.instant=reduced.current;setStarted(true);setPlaying(!illustrated);setAway(true);setTime(duration);syncSound()}
 useEffect(()=>{if(hintRevision>0)inspect()},[hintRevision])
 useEffect(()=>{if(!expanded)return;previousFocus.current=document.activeElement as HTMLElement;const old=document.body.style.overflow;document.body.style.overflow='hidden';const close=stage.current?.parentElement?.querySelector<HTMLButtonElement>('.logic-close');close?.focus()
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setExpanded(false);return}if(e.key==='Tab'){const nodes=[...(stage.current?.parentElement?.querySelectorAll<HTMLElement>('button:not(:disabled), summary')||[])];const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};document.addEventListener('keydown',key)
  return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',key);previousFocus.current?.focus()}
 },[expanded])
 return <div className={`logic-animation${expanded?' is-expanded':''}`} role={expanded?'dialog':undefined} aria-modal={expanded||undefined} aria-label={sceneTitles[sceneIndex]+' animated clue'}>
  {expanded&&<Button variant="secondary" className="logic-close" onClick={()=>setExpanded(false)}>Close enlarged view</Button>}
  <div ref={stage} className="logic-stage"><canvas ref={canvas} role="img" aria-label={sceneDescriptions[sceneIndex]}/>
   {!started&&!error&&<div className="logic-play-overlay"><Button onClick={begin} disabled={!ready}>{ready?(illustrated?'Play scene':'Play animation'):'Loading scene…'}</Button></div>}
   {error&&<div className="logic-play-overlay"><p role="alert">{error}</p></div>}
  </div>
  <div className="logic-film-progress" aria-label={`${Math.floor(time)} of ${duration} seconds`}><span style={{width:`${time/duration*100}%`}}/></div>
  <div className="logic-film-controls"><button disabled={!ready} onClick={()=>{const c=controls.current;if(!started||c.time===duration&&c.view==='auto'){begin();return}if(illustrated&&c.view!=='auto'){begin();return}if(c.view==='auto')c.audioActive=c.playing=!c.playing;else c.audioActive=!c.audioActive;if(c.audioActive)sound.current?.unlock();setPlaying(c.audioActive);syncSound()}}>{playing?'Pause':time===duration&&controls.current.view==='auto'?'Replay':'Play'}</button>
   <button disabled={!ready||!started} onClick={()=>{const c=controls.current;c.playing=false;c.audioActive=false;c.view='auto';c.time=Math.min(duration,c.time+3);c.instant=true;setTime(c.time);setPlaying(false);setAway(false);syncSound()}}>Next moment</button>
   <button disabled={!ready||!started} onClick={()=>{const c=controls.current;sound.current?.unlock();c.playing=false;c.audioActive=true;c.time=duration;c.view=c.view==='away'||c.view==='inspect'?'watch':'away';c.instant=reduced.current;setTime(duration);setPlaying(!illustrated);setAway(c.view==='away');syncSound()}}>{sceneIndex>1?'Other angle':isPlates?(away?'Watch left':'Watch right'):(away?'Look back':'Look away')}</button>
   {!expanded&&<button onClick={()=>setExpanded(true)} aria-label="Enlarge animation">⛶</button>}
  </div>
  {soundError&&<p className="logic-sound-notice" role="status">Scene sounds could not load. Reload to try again.</p>}
  {hintOpened&&<button className="logic-review-hint" onClick={inspect}>Review opened clue · free</button>}
  <details className="logic-description" onToggle={e=>setDescription(e.currentTarget.open)}><summary>Scene description</summary>{description&&<p>{sceneDescriptions[sceneIndex]} This description is a free accessibility alternative.</p>}</details>
 </div>
}


