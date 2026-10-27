export const freshState=()=>({trolleyMoved:false,rugLifted:false,papersRead:false,bookRead:false,solved:false});
export function act(state,action){
 const next={...state};
 if(action==='moveTrolley')next.trolleyMoved=true;
 if(action==='liftRug'&&state.trolleyMoved)next.rugLifted=true;
 if(action==='readPapers'&&state.rugLifted)next.papersRead=true;
 if(action==='readBook')next.bookRead=true;
 return next;
}
export const evidenceCount=s=>Number(s.papersRead)+Number(s.bookRead);
export const roomFrame=s=>s.solved?3:s.rugLifted?2:s.trolleyMoved?1:0;
export function isAnswer(text){
 const clean=text.toLowerCase().replace(/[^a-z ]/g,' ').replace(/\s+/g,' ').trim();
 return /^(?:sweep|sweeping|swept)(?: (?:it|things|something|the complaints|complaints|them))? under (?:the|a) (?:rug|carpet)$/.test(clean);
}
