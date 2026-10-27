export const CASE_KEY='cluecanvas.openingNight.case.v1'
export const CASE_ROUNDS=CASE_KEY+'.rounds'
export const caseScenes=[0,1,3,4,6]
export const suspects=[{id:'mara',name:'Mara',role:'Head chef'},{id:'theo',name:'Theo',role:'Waiter'},{id:'iris',name:'Iris',role:'Pastry chef'}]
export const ingredients=[{id:'salt',name:'Salt'},{id:'sugar',name:'Sugar'},{id:'lemon',name:'Lemon juice'}]
export const evidence=[
 {id:'pot',scene:0,title:'The tasting log',kind:'Kitchen record',mark:'19:10 → 19:20',body:'7:10 pm — the soup passed its final taste check. 7:20 pm — an unexpected ingredient had ruined it. The addition happened within those ten minutes.',question:'When could someone have changed the soup?'},
 {id:'plates',scene:1,title:'The dining-room recording',kind:'Witness record',mark:'NO GAPS · TEN MINUTES',body:'The continuous dining-room recording shows Mara and Theo serving guests from 7:10 until 7:20. Neither leaves the room during that interval.',question:'Who still had an opportunity to enter the kitchen?'},
 {id:'rug',scene:3,title:'The hidden wrapper',kind:'Recovered object',mark:'BATCH S17',body:'Beneath the carpet is an empty, torn ingredient sachet. Its name is missing, but “S17” remains legible. The matching torn corner is caught on the soup pot’s rim.',question:'What did that packet contain?'},
 {id:'drain',scene:4,title:'The supplier’s docket',kind:'Delivery receipt',mark:'THREE INGREDIENTS',body:'Today’s delivery: salt — batch K04; caster sugar — batch S17; lemon juice — batch L22. All three were delivered before the 7:10 taste check.',question:'Which delivery matches the recovered wrapper?'},
 {id:'milk',scene:6,title:'A note beside the recipe',kind:'Kitchen instruction',mark:'ONE PINCH',body:'“If the soup tastes too sharp, soften it with ONE PINCH. Never a whole sachet.” The empty packet held enough for twenty portions.',question:'Was someone trying to improve dinner—and overdoing it?'}
]
export interface CaseState {earned:string[];attempts:string[];solved:boolean}
export const newCase=():CaseState=>({earned:[],attempts:[],solved:false})
export const correctDeduction=(person:string,ingredient:string)=>person==='iris'&&ingredient==='sugar'
export function restoreCase(raw:string|null):CaseState {
 try{const saved=JSON.parse(raw||'null');if(saved?.version!==1)return newCase();
  const earned=evidence.filter(e=>Array.isArray(saved.earned)&&saved.earned.includes(e.id)).map(e=>e.id)
  const valid=new Set(suspects.flatMap(s=>ingredients.map(i=>s.id+':'+i.id)).filter(v=>v!=='iris:sugar'))
  const attempts=Array.isArray(saved.attempts)?[...new Set<string>(saved.attempts.filter((v:unknown)=>typeof v==='string'&&valid.has(v)))].slice(0,3):[]
  return {earned,attempts,solved:earned.length===5&&attempts.length<3&&saved.solved===true}
 }catch{return newCase()}
}
export function submitDeduction(state:CaseState,person:string,ingredient:string):{state:CaseState;message:string}{
 if(state.earned.length!==5)return {state,message:'Collect all five pieces of evidence first.'}
 if(state.solved||state.attempts.length===3)return {state,message:'This investigation is already finished.'}
 if(!suspects.some(s=>s.id===person)||!ingredients.some(i=>i.id===ingredient))return {state,message:'Choose a person and an ingredient.'}
 if(correctDeduction(person,ingredient))return {state:{...state,solved:true},message:'Case solved.'}
 const key=person+':'+ingredient;if(state.attempts.includes(key))return {state,message:'You already checked that theory. No attempt used.'}
 const attempts=[...state.attempts,key];return {state:{...state,attempts},message:attempts.length===3?'Three theories ruled out. Review the evidence, then try the deduction again.':'That theory does not fit all the evidence. Review the timeline and batch numbers.'}
}
