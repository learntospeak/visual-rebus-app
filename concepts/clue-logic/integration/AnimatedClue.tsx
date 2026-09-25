import {useEffect,useRef,useState} from 'react'
import {Button} from '../../../src/components/Button'

export interface AnimatedClueProps {hintRevision:number;hintOpened:boolean;onStarted:()=>void;onError?:(message:string)=>void}
type View='auto'|'watch'|'away'|'inspect'
// No puzzle answers, saves, purchases or account access inside the renderer.
export function AnimatedClue({hintRevision,hintOpened,onStarted,onError}:AnimatedClueProps){
 const canvas=useRef<HTMLCanvasElement>(null),stage=useRef<HTMLDivElement>(null)
 const controls=useRef({time:0,view:'auto' as View,playing:false,started:false,instant:true})
 const [ready,setReady]=useState(false),[error,setError]=useState(''),[started,setStarted]=useState(false),[playing,setPlaying]=useState(false),[away,setAway]=useState(false),[time,setTime]=useState(0),[expanded,setExpanded]=useState(false),[description,setDescription]=useState(false)
 const onErrorRef=useRef(onError);onErrorRef.current=onError
 const reduced=useRef(matchMedia('(prefers-reduced-motion: reduce)').matches)
 const previousFocus=useRef<HTMLElement|null>(null)
 useEffect(()=>{
  let cancelled=false,frame=0,last=performance.now(),lastUi=0
  let kitchen:Awaited<ReturnType<typeof import('../cinema-scene.mjs')['makeKitchen']>>|null=null
  const mq=matchMedia('(prefers-reduced-motion: reduce)')
  const motion=()=>{reduced.current=mq.matches;if(mq.matches){controls.current.playing=false;controls.current.instant=true;setPlaying(false)}}
  mq.addEventListener('change',motion)
  const visibility=()=>{last=performance.now()}
  document.addEventListener('visibilitychange',visibility)
  function fit(){if(!canvas.current||!stage.current)return;const {width:w,height:h}=stage.current.getBoundingClientRect();const ratio=matchMedia('(max-width:700px)').matches?1/1.06:16/11;const width=Math.min(w,h*ratio);canvas.current.style.width=`${width}px`;canvas.current.style.height=`${width/ratio}px`}
  const observer=new ResizeObserver(fit);if(stage.current)observer.observe(stage.current)
  window.addEventListener('resize',fit);fit()
  import('../cinema-scene.mjs').then(({makeKitchen})=>{
   if(cancelled||!canvas.current)return;kitchen=makeKitchen(canvas.current);setReady(true)
   const tick=(now:number)=>{if(cancelled)return;const dt=Math.min((now-last)/1000,.06);last=now;const c=controls.current
    if(!document.hidden){if(c.playing){c.time=Math.min(22,c.time+dt);if(c.time===22){c.playing=false;setPlaying(false)}}
     kitchen?.draw({time:c.time,delta:c.started&&(c.playing||c.view!=='auto')&&!reduced.current?dt:0,view:c.view,running:c.started,won:false,instant:c.instant||reduced.current});c.instant=false
     if(now-lastUi>200){setTime(c.time);lastUi=now}}
    frame=requestAnimationFrame(tick)
   };frame=requestAnimationFrame(tick)
  }).catch(()=>{if(cancelled)return;const message='The animation could not load. Try reloading or use the scene description below.';setError(message);onErrorRef.current?.(message)})
  return()=>{cancelled=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('resize',fit);document.removeEventListener('visibilitychange',visibility);mq.removeEventListener('change',motion);kitchen?.dispose()}
 },[])
 function begin(){const c=controls.current;c.started=true;c.time=0;c.view='auto';c.playing=!reduced.current;c.instant=reduced.current;setStarted(true);setPlaying(c.playing);setAway(false);setTime(0);onStarted()}
 function inspect(){const c=controls.current;c.started=true;c.time=22;c.view='inspect';c.playing=false;c.instant=reduced.current;setStarted(true);setPlaying(false);setAway(true);setTime(22)}
 useEffect(()=>{if(hintRevision>0)inspect()},[hintRevision])
 useEffect(()=>{if(!expanded)return;previousFocus.current=document.activeElement as HTMLElement;const old=document.body.style.overflow;document.body.style.overflow='hidden';const close=stage.current?.parentElement?.querySelector<HTMLButtonElement>('.logic-close');close?.focus()
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setExpanded(false);return}if(e.key==='Tab'){const nodes=[...(stage.current?.parentElement?.querySelectorAll<HTMLElement>('button:not(:disabled), summary')||[])];const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}};document.addEventListener('keydown',key)
  return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',key);previousFocus.current?.focus()}
 },[expanded])
 const caption=controls.current.view==='inspect'?'A different angle: see what you missed.':controls.current.view==='away'?'Your attention moves elsewhere.':controls.current.view==='watch'?'You return to the stove.':time<4?'The first guests are almost here.':time<7.7?'Still not ready.':time<11?'A sound by the door.':time<16?'Just a moment…':time<20?'Back to the stove.':'What changed when you looked away?'
 return <div className={`logic-animation${expanded?' is-expanded':''}`} role={expanded?'dialog':undefined} aria-modal={expanded||undefined} aria-label="Before Service animated clue">
  {expanded&&<Button variant="secondary" className="logic-close" onClick={()=>setExpanded(false)}>Close enlarged view</Button>}
  <div ref={stage} className="logic-stage"><canvas ref={canvas} role="img" aria-label="The original kitchen scene. Watch how the pot changes as your gaze moves."/>
   {!started&&!error&&<div className="logic-play-overlay"><Button onClick={begin} disabled={!ready}>{ready?'Play animation':'Loading scene…'}</Button></div>}
   {error&&<div className="logic-play-overlay"><p role="alert">{error}</p></div>}
   {started&&<span className="logic-caption" aria-live="off">{caption}</span>}
  </div>
  <div className="logic-film-progress" aria-label={`${Math.floor(time)} of 22 seconds`}><span style={{width:`${time/22*100}%`}}/></div>
  <div className="logic-film-controls"><button disabled={!ready} onClick={()=>{if(!started||controls.current.time===22){begin();return}controls.current.playing=!controls.current.playing;setPlaying(controls.current.playing)}}>{playing?'Pause':time===22?'Replay':'Play'}</button>
   <button disabled={!ready||!started} onClick={()=>{const c=controls.current;c.playing=false;c.view='auto';c.time=Math.min(22,c.time+3);c.instant=true;setTime(c.time);setPlaying(false)}}>Next moment</button>
   <button disabled={!ready||!started} onClick={()=>{const c=controls.current;c.playing=false;c.time=22;c.view=c.view==='away'||c.view==='inspect'?'watch':'away';c.instant=reduced.current;setTime(22);setPlaying(false);setAway(c.view==='away')}}>{away?'Look back':'Look away'}</button>
   {!expanded&&<button onClick={()=>setExpanded(true)} aria-label="Enlarge animation">⛶</button>}
  </div>
  {hintOpened&&<button className="logic-review-hint" onClick={inspect}>Review opened clue · free</button>}
  <details className="logic-description" onToggle={e=>setDescription(e.currentTarget.open)}><summary>Scene description</summary>{description&&<p>The burner is lit. Water stays still while you watch the pot. When you turn away, it bubbles; when you return, it settles. This description is a free accessibility alternative.</p>}</details>
 </div>
}

