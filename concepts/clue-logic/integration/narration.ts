export const MEDIA_KEY='cluecanvas.clueLogic.media.v1'
export type SceneView='auto'|'watch'|'away'|'inspect'
export function sceneCaption(time:number,view:SceneView){
 if(view==='inspect')return 'A different angle: see what you missed.'
 if(view==='away')return 'Your attention moves elsewhere.'
 if(view==='watch')return 'You return to the stove.'
 return time<4?'The first guests are almost here.':time<7.7?'Still not ready.':time<11?'A sound by the door.':time<16?'Just a moment…':time<20?'Back to the stove.':'What changed when you looked away?'
}
export function readMediaPreferences(raw:string|null){
 try{const p=JSON.parse(raw||'null');return {voice:p?.voice===true,subtitles:p?.subtitles!==false}}catch{return {voice:false,subtitles:true}}
}
// Injected browser service makes cancellation, replay and failures testable without audio hardware.
export function createNarrator(synth:Pick<SpeechSynthesis,'cancel'|'speak'|'getVoices'|'resume'>,Utterance:typeof SpeechSynthesisUtterance,onError:()=>void){
 let current:SpeechSynthesisUtterance|null=null,last=''
 function stop(){last='';if(current){current.onerror=null;current.onend=null;current=null;synth.cancel()}}
 return {stop,say(text:string){
  if(text===last)return
  stop();last=text
  try{
   const utterance=new Utterance(text);current=utterance
   const voices=synth.getVoices().filter(v=>/^en(?:-|_)/i.test(v.lang))
   const voice=voices.find(v=>v.lang.toLowerCase()==='en-au')||voices.find(v=>v.default)||voices.find(v=>v.lang.toLowerCase()==='en-gb')||voices[0]
   if(voice)utterance.voice=voice
   utterance.lang=voice?.lang||'en-AU';utterance.rate=1;utterance.pitch=1
   utterance.onend=()=>{if(current===utterance)current=null}
   utterance.onerror=e=>{if(current!==utterance)return;current=null;if(e.error!=='canceled'&&e.error!=='interrupted'){last='';onError()}}
   synth.resume();synth.speak(utterance)
  }catch{current=null;last='';onError()}
 }}
}
