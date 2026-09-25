import type {SoundState} from './scene-sound'
// Quiet, unpitched Foley for the new scenes. The approved kitchen audio is separate.
export function createStorySound(kind:string,onError:()=>void){
 let context:AudioContext|null=null,noise:AudioBuffer|null=null,previous=0,disposed=false
 const sources=new Set<AudioBufferSourceNode>(),played=new Set<number>()
 const events=kind==='mountain'||kind==='hole'?[4,6,8,10,12,14,16,18,20]:kind==='rug'?[4,8,12,16]:kind==='drain'?[4,5,6,7,8,9,10,11,12,13,14,15]:[4.5,5.5,9,12,15,18,21]
 function stop(){for(const s of sources){try{s.stop()}catch{}s.disconnect()}sources.clear()}
 return {unlock(){if(disposed)return;try{if(!context){context=new AudioContext();noise=context.createBuffer(1,context.sampleRate,context.sampleRate);const data=noise.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){last=(last+(Math.random()*2-1)*.12)/1.12;data[i]=last}}
  void context.resume().catch(onError)}catch{onError()}},
 update(state:SoundState){if(!state.active)stop();if(context&&noise&&state.active&&state.playing&&state.view==='auto')events.forEach((time,i)=>{if(previous<time&&state.time>=time&&state.time-time<.25&&!played.has(i)){played.add(i);const source=context!.createBufferSource(),filter=context!.createBiquadFilter(),gain=context!.createGain();const now=context!.currentTime;const length=kind==='rug'?.65:kind==='drain'?.13:.34;source.buffer=noise;filter.type='bandpass';filter.frequency.value=kind==='rug'?1100:kind==='drain'?2400:kind==='milk'?700:420;filter.Q.value=.65;gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(kind==='milk'?.13:.28,now+.025);gain.gain.exponentialRampToValueAtTime(.001,now+length);source.connect(filter);filter.connect(gain);gain.connect(context!.destination);sources.add(source);source.onended=()=>{sources.delete(source);source.disconnect();filter.disconnect();gain.disconnect()};source.start();source.stop(now+length)}});previous=state.time},
 reset(){previous=0;played.clear();stop()},stop,dispose(){disposed=true;stop();if(context)void context.close().catch(()=>{});context=null}}
}
