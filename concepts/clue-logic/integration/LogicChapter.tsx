import {useEffect,useRef,useState,type FormEvent} from 'react'
import {PuzzleScreen} from './PuzzleScreen'
import {SolvedScreen} from '../../../src/screens/SolvedScreen'
import {AnimatedClue} from './AnimatedClue'
import {puzzle,SAVE_KEY,type Action,type Round} from './model'
import {act,freshRound,normalize} from '../engine.mjs'
import {chapter} from '../chapter.mjs'
import {restoreActions} from './state'

export interface Completion {puzzleId:string;lifelines:number;hintsUsed:number}
export interface LogicChapterProps {onExit:()=>void;onComplete?:(result:Completion)=>void;storageKey?:string}
const scene=chapter.scenes[0]
export function LogicChapter({onExit,onComplete,storageKey=SAVE_KEY}:LogicChapterProps){
 const [state,setState]=useState(()=>{try{return restoreActions(localStorage.getItem(storageKey))}catch{return restoreActions(null)}})
 const [guess,setGuess]=useState(''),[message,setMessage]=useState('Play the scene, then submit a letter or a phrase.'),[started,setStarted]=useState(false),[hintRevision,setHintRevision]=useState(0),[attempt,setAttempt]=useState(0),[solved,setSolved]=useState(false),[celebrating,setCelebrating]=useState(false),[storageFailed,setStorageFailed]=useState(false)
 const transition=useRef<ReturnType<typeof setTimeout>|null>(null),began=useRef(Date.now()),busy=useRef(false)
 useEffect(()=>()=>{if(transition.current)clearTimeout(transition.current)},[])
 useEffect(()=>{try{localStorage.setItem(storageKey,JSON.stringify({version:1,actions:state.actions,feedback:state.feedback}))}catch{setStorageFailed(true)}},[state,storageKey])
 const round=state.round
 function apply(action:Action){if(busy.current||round.status!=='playing')return
  const outcome=act(scene,round,action);const next=outcome.round as Round;setState(s=>({...s,round:next,actions:[...s.actions,action]}));setMessage(outcome.message);setGuess('')
  if(next.status==='won'){busy.current=true;setCelebrating(true);onComplete?.({puzzleId:'clue-logic-before-service',lifelines:next.lives,hintsUsed:next.hints.length});transition.current=setTimeout(()=>{setCelebrating(false);setSolved(true);busy.current=false},matchMedia('(prefers-reduced-motion: reduce)').matches?0:650)}
 }
 function submit(e:FormEvent){e.preventDefault();const clean=normalize(guess);if(!clean){setMessage('Enter one letter or the whole phrase first.');return}apply(clean.length===1?{type:'letter',letter:guess}:{type:'phrase',answer:guess})}
 function hint(){if(!started||round.lives<=1||round.hints.length||round.status!=='playing')return;apply({type:'hint',id:'eyes'});setHintRevision(x=>x+1)}
 function retry(){if(transition.current)clearTimeout(transition.current);busy.current=false;setState({actions:[],round:freshRound() as Round,feedback:state.feedback});setGuess('');setMessage('Three fresh lifelines. Play when you are ready.');setStarted(false);setHintRevision(0);setAttempt(x=>x+1);setSolved(false);setCelebrating(false);began.current=Date.now()}
 const locked=[...normalize(puzzle.answer)].map(c=>round.letters.includes(c)||round.status==='won')
 if(solved)return <SolvedScreen puzzle={puzzle} outcome={{revealed:false,stars:round.lives,cluesUsed:round.hints.length,seconds:Math.round((Date.now()-began.current)/1000),daily:false}} isLastPuzzle onHome={onExit} onNext={onExit} showReminderOffer={false} onEnableReminder={async()=>false} onDismissReminder={()=>{}} difficultyFeedback={state.feedback} onDifficultyFeedback={feedback=>setState(s=>({...s,feedback}))}/>
 return <><PuzzleScreen puzzle={puzzle} puzzleNumber={1} puzzleCount={1} guess={guess} clueCount={round.hints.length} message={storageFailed?'Progress cannot be saved in this browser. '+message:round.status==='won'?'Previously solved. Replay the animation or return home.':message} lockedLetters={locked} celebrating={celebrating} onHome={onExit} onGuessChange={setGuess} onSubmit={submit} onClue={hint} onReveal={()=>{}} onInteractionSolved={()=>{}} lives={round.lives} blocked={round.status==='lost'} completed={round.status==='won'} misses={round.misses} clueDisabled={!started||round.lives<=1||round.hints.length>0||round.status!=='playing'} onRetry={retry} visual={<AnimatedClue key={attempt} hintRevision={hintRevision} hintOpened={round.hints.length>0} onStarted={()=>setStarted(true)} onError={setMessage}/>}/>
 {round.status==='won'&&!celebrating&&<div className="logic-replay-solved"><button className="secondary-button" onClick={()=>setSolved(true)}>View result</button><button className="text-button" onClick={retry}>New attempt</button></div>}</>
}
