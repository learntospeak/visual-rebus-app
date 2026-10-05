export const normalize = s => String(s).toLowerCase().normalize('NFKD').replace(/[^a-z]/g,'');
export const freshRound = () => ({lives:3,letters:[],misses:[],hints:[],wrongPhrases:[],status:'playing'});
export const freshProgress = () => ({version:1,index:0,started:false,completed:false,rounds:{},results:{},retries:{}});
export const isCorrect = (scene,answer) => [scene.answer,...scene.aliases].some(a=>normalize(a)===normalize(answer));
export function allLettersKnown(scene,round){return [...new Set(normalize(scene.answer))].every(c=>round.letters.includes(c));}
function lose(round){round.lives=Math.max(0,round.lives-1);if(!round.lives)round.status='lost';}
export function act(scene,previous,action){
 const round=structuredClone(previous);
 if(round.status!=='playing')return {round,message:'This scene is finished.'};
 let message='';
 if(action.type==='letter'){
  const letter=normalize(action.letter);
  if(letter.length!==1)return {round,message:'Choose one letter.'};
  if(round.letters.includes(letter)||round.misses.includes(letter))return {round,message:'That letter has already been tried.'};
  if(normalize(scene.answer).includes(letter)){round.letters.push(letter);message=`${letter.toUpperCase()} belongs in the phrase.`;}
  else{round.misses.push(letter);lose(round);message=`No ${letter.toUpperCase()} in this phrase. One lifeline used.`;}
 }else if(action.type==='phrase'){
  const guess=normalize(action.answer);
  if(!guess)return {round,message:'Enter a phrase first.'};
  if(isCorrect(scene,guess)){round.status='won';message='You found the phrase.';}
  else if(round.wrongPhrases.includes(guess))message='You already tried that phrase. No extra lifeline used.';
  else{round.wrongPhrases.push(guess);lose(round);message='That phrase does not fit. One lifeline used.';}
 }else if(action.type==='hint'){
  const hint=scene.hints.find(h=>h.id===action.id);
  if(!hint)return {round,message:'Unknown clue.'};
  if(round.hints.includes(hint.id))return {round,message:hint.text,hint};
  if(round.lives<=1)return {round,message:'One lifeline left. Make your final guesses; hints are closed.'};
  round.hints.push(hint.id);lose(round);
  const requested=hint.letter.toLowerCase();
  const letter=!round.letters.includes(requested)?requested:[...normalize(scene.answer)].find(c=>!round.letters.includes(c));
  if(letter)round.letters.push(letter);
  message=`${hint.text} One lifeline used${letter?`; ${letter.toUpperCase()} revealed`:''}.`;
 }
 if(round.status==='playing'&&allLettersKnown(scene,round))round.status='won';
 if(round.status==='lost')message='Three lifelines used. This scene is over.';
 return {round,message};
}
export function restoreProgress(raw,chapter){
 const out=freshProgress();
 try{
  const v=JSON.parse(raw);if(v?.version!==1)return out;
  out.started=v.started===true;
  for(const scene of chapter.scenes){
   const r=v.rounds?.[scene.id];
   if(!r||!Number.isInteger(r.lives)||r.lives<0||r.lives>3||!['playing','won','lost'].includes(r.status))continue;
   const letters=Array.isArray(r.letters)?[...new Set(r.letters.filter(c=>/^[a-z]$/.test(c)&&normalize(scene.answer).includes(c)))]:[];
   const misses=Array.isArray(r.misses)?[...new Set(r.misses.filter(c=>/^[a-z]$/.test(c)&&!normalize(scene.answer).includes(c)))]:[];
   const hints=Array.isArray(r.hints)?[...new Set(r.hints.filter(id=>scene.hints.some(h=>h.id===id)))]:[];
   const wrongPhrases=Array.isArray(r.wrongPhrases)?[...new Set(r.wrongPhrases.filter(p=>typeof p==='string'&&normalize(p)&&!isCorrect(scene,p)))]:[];
   const lives=Math.max(0,3-misses.length-hints.length-wrongPhrases.length);
   const status=lives===0?'lost':r.status==='won'||allLettersKnown(scene,{letters})?'won':'playing';
   out.rounds[scene.id]={lives,letters,misses,hints,wrongPhrases,status};
   if(status==='won')out.results[scene.id]={lives,hints:hints.length};
   if(Number.isInteger(v.retries?.[scene.id]))out.retries[scene.id]=Math.max(0,v.retries[scene.id]);
  }
  // A saved index can never bypass an unsolved scene or unlock the finale.
  const firstUnsolved=chapter.scenes.findIndex(s=>!out.results[s.id]);
  const maximum=firstUnsolved<0?chapter.scenes.length-1:firstUnsolved;
  out.index=Number.isInteger(v.index)?Math.max(0,Math.min(maximum,v.index)):0;
  out.completed=firstUnsolved<0;
 }catch{}
 return out;
}
