// A short wooden double knock, synthesised locally; no download or audio permission needed.
export function createKnock(){
 let context:AudioContext|null=null
 const active=new Set<AudioBufferSourceNode>()
 function stop(){for(const source of active){try{source.stop()}catch{}source.disconnect()}active.clear()}
 return {
  unlock(){try{context??=new AudioContext();void context.resume().catch(()=>{})}catch{}},
  play(){if(!context||context.state!=='running')return;stop();const rate=context.sampleRate;const buffer=context.createBuffer(1,Math.ceil(rate*.46),rate);const data=buffer.getChannelData(0)
   for(const onset of [0,.22])for(let n=0;n<rate*.18;n++){const t=n/rate;const envelope=Math.exp(-t*35)*(1-Math.exp(-t*1800));const wood=Math.sin(2*Math.PI*170*t)*.5+Math.sin(2*Math.PI*410*t)*.22+(Math.random()*2-1)*Math.exp(-t*120)*.2;data[Math.floor(onset*rate)+n]+=wood*envelope*.65}
   const source=context.createBufferSource();source.buffer=buffer;source.connect(context.destination);active.add(source);source.onended=()=>{active.delete(source);source.disconnect()};source.start()
  },
  stop,
  dispose(){stop();if(context)void context.close().catch(()=>{});context=null}
 }
}
