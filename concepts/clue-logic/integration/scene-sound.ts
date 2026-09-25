export type SoundState={time:number;view:'auto'|'watch'|'away'|'inspect';active:boolean;playing:boolean}
export function soundMix(s:SoundState){return {flame:s.active?.32:0,boil:s.active&&(s.view==='away'||s.view==='inspect'||s.view==='auto'&&s.time>9&&s.time<18.2)?.64:0}}
export function shouldKnock(previous:number,s:SoundState,already:boolean){return !already&&s.active&&s.playing&&s.view==='auto'&&previous<7.7&&s.time>=7.7&&s.time<8.5}
const urls=[new URL('./audio/stove-flame.wav',import.meta.url).href,new URL('./audio/rapid-boiling.wav',import.meta.url).href,new URL('./audio/door-knock.wav',import.meta.url).href]
export function createSceneSound(onError:()=>void){
 let context:AudioContext|null=null,master:GainNode|null=null,flame:GainNode|null=null,boil:GainNode|null=null,knockBuffer:AudioBuffer|null=null,loading=false,disposed=false,knocked=false,previous=0
 let state:SoundState={time:0,view:'auto',active:false,playing:false}
 const sources=new Set<AudioBufferSourceNode>(),knocks=new Set<AudioBufferSourceNode>()
 function stopKnocks(){for(const s of knocks){try{s.stop()}catch{}}knocks.clear()}
 function source(buffer:AudioBuffer,output:AudioNode,loop=false){const s=context!.createBufferSource();s.buffer=buffer;s.loop=loop;s.connect(output);sources.add(s);s.onended=()=>{sources.delete(s);knocks.delete(s);s.disconnect()};s.start();return s}
 function update(next:SoundState){state=next;const hit=shouldKnock(previous,next,knocked);previous=next.time;if(hit)knocked=true
  if(!context||!master||!flame||!boil)return
  const now=context.currentTime,mix=soundMix(next)
  master.gain.setTargetAtTime(next.active?1:0,now,.025)
  flame.gain.setTargetAtTime(mix.flame,now,.15);boil.gain.setTargetAtTime(mix.boil,now,mix.boil?.55:.28)
  if(!next.active)stopKnocks()
  if(hit&&knockBuffer&&context.state==='running')knocks.add(source(knockBuffer,master))
 }
 return {
  unlock(){if(disposed)return;try{
   context??=new AudioContext();void context.resume().catch(()=>{if(!disposed)onError()});if(loading)return;loading=true
   master=context.createGain();master.gain.value=0;master.connect(context.destination);flame=context.createGain();boil=context.createGain();flame.gain.value=0;boil.gain.value=0;flame.connect(master);boil.connect(master)
   const ctx=context;void Promise.all(urls.map(async url=>{const r=await fetch(url);if(!r.ok)throw Error('Audio unavailable');return ctx.decodeAudioData(await r.arrayBuffer())})).then(buffers=>{if(disposed)return;source(buffers[0],flame!,true);source(buffers[1],boil!,true);knockBuffer=buffers[2];update(state)}).catch(()=>{if(!disposed)onError()})
  }catch{onError()}},
  update,
  reset(){knocked=false;previous=0;stopKnocks()},
  stop(){update({...state,active:false,playing:false})},
  dispose(){disposed=true;stopKnocks();for(const s of sources){try{s.stop()}catch{}s.disconnect()}sources.clear();if(context)void context.close().catch(()=>{});context=null}
 }
}
