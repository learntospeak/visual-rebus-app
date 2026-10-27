import {RESCUES} from '../plates-motion.mjs'
import type {SoundState} from './scene-sound'
const url=new URL('./audio/plate-clink.wav',import.meta.url).href
export function createPlateSound(onError:()=>void){
 let context:AudioContext|null=null,buffer:AudioBuffer|null=null,loading=false,disposed=false,previous=0
 const sources=new Set<AudioBufferSourceNode>(),played=new Set<number>()
 function stop(){for(const s of sources){try{s.stop()}catch{}s.disconnect()}sources.clear()}
 return {
  unlock(){if(disposed)return;try{context??=new AudioContext();void context.resume().catch(()=>{if(!disposed)onError()});if(loading)return;loading=true;const ctx=context;void fetch(url).then(r=>{if(!r.ok)throw Error('Sound unavailable');return r.arrayBuffer()}).then(b=>ctx.decodeAudioData(b)).then(b=>{if(!disposed)buffer=b}).catch(()=>{if(!disposed)onError()})}catch{onError()}},
  update(s:SoundState){if(!s.active)stop();if(context&&buffer&&s.active&&s.playing&&s.view==='auto')RESCUES.forEach((event,i)=>{if(!played.has(i)&&previous<event.time&&s.time>=event.time&&s.time-event.time<.25){played.add(i);const source=context!.createBufferSource(),gain=context!.createGain();gain.gain.value=.32;source.buffer=buffer;source.connect(gain);gain.connect(context!.destination);sources.add(source);source.onended=()=>{sources.delete(source);source.disconnect();gain.disconnect()};source.start()}});previous=s.time},
  reset(){previous=0;played.clear();stop()},stop,
  dispose(){disposed=true;stop();if(context)void context.close().catch(()=>{});context=null}
 }
}
