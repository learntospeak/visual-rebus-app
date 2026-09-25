export const MEDIA_KEY='cluecanvas.clueLogic.media.v1'
export type SceneView='auto'|'watch'|'away'|'inspect'
// Sparse in-scene dialogue; empty intervals intentionally leave room for the action.
export function sceneCaption(time:number,view:SceneView){
 if(view==='inspect')return 'Let me see…'
 if(view!=='auto')return ''
 if(time<3)return 'Come on…'
 if(time>=7.7&&time<10.5)return 'One second.'
 if(time>=17&&time<20)return 'Still waiting?'
 return ''
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
  if(!text.trim())return
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
