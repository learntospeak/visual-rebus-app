// Deterministic choreography: slowing, a near fall, then a fresh spin.
export const PLATE_DURATION=26;
export const RESCUES=[{time:5.2,index:0},{time:9.8,index:1},{time:14.4,index:2},{time:18.8,index:0},{time:22.4,index:1},{time:24.5,index:2}];
export function plateMotion(time,index){
 const relevant=RESCUES.filter(e=>e.index===index&&e.time<=time);
 const last=relevant.at(-1)?.time??(-index*1.15);
 const age=Math.max(0,time-last);
 const next=RESCUES.find(e=>e.index===index&&e.time>time)?.time??(time+5);
 const urgency=Math.max(0,1-(next-time)/3.5);
 const settled=Math.min(1,age/.65);
 const wobble=(.035+urgency*urgency*.48)*settled;
 const boost=relevant.reduce((sum,e)=>sum+8*(1-Math.exp(-(time-e.time)*1.7)),0);
 return {spin:time*(3.5-index*.27)+boost,wobble,urgency};
}
export function activeRescue(time){return RESCUES.find(e=>Math.abs(time-e.time)<.8)}
