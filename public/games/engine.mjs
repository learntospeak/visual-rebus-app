export const modes=[{id:'odd',title:'Odd One Out',desc:'One small detail breaks the pattern.',icon:'△ ▽',skill:'Observation'},{id:'memory',title:'Visual Memory',desc:'Take a look. Hide it. What do you remember?',icon:'◈',skill:'Memory'},{id:'next',title:'What Comes Next?',desc:'Find the rhythm. Complete the sequence.',icon:'●→',skill:'Patterns'},{id:'belong',title:'Which Doesn’t Belong?',desc:'Four choices. One breaks the rule.',icon:'≠',skill:'Connections'}];
export const bands=['Getting started','Finding your rhythm','Looking closer','Making connections','The final challenge'];
export function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
export function shuffle(a,r){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function isCorrect(q,v){return String(q.answer).toLowerCase()===String(v).toLowerCase()}
export function dateKey(d=new Date()){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
export function dayIndex(d=new Date()){return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000)}
export function emptySave(){return {version:1,results:{},daily:{},relaxed:false}}
export function normalizeSave(s,ids){const out=emptySave(),valid=new Set(ids);if(!s||typeof s!=='object')return out;out.relaxed=s.relaxed===true;for(const [id,v] of Object.entries(s.results||{})){if(valid.has(id)&&v&&['solved','revealed','missed'].includes(v.status))out.results[id]={status:v.status,hinted:!!v.hinted}};for(const [date,v] of Object.entries(s.daily||{}))if(/^\d{4}-\d{2}-\d{2}$/.test(date)&&v&&typeof v==='object'&&Number.isInteger(v.score)&&v.score>=0&&v.score<=4)out.daily[date]={score:v.score};return out}
export function recordResult(save,id,status,hinted){const old=save.results[id];save.results[id]=old?.status==='solved'?(status==='solved'&&!hinted?{status,hinted:false}:old):{status,hinted};return save}
export function nextUnplayed(deck,save){return deck.findIndex(q=>!save.results[q.id])}
export function dailyRounds(catalog,d=new Date()){const day=((dayIndex(d)%100)+100)%100;return modes.map((m,i)=>catalog[m.id][(day+i*23)%100])}

