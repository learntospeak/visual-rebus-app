import {modes,bands,isCorrect,dateKey,emptySave,normalizeSave,recordResult,nextUnplayed,dailyRounds,shuffle,rng} from './engine.mjs';
import {esc,symbol,describe} from './render.mjs';
const app=document.querySelector('#app'),catalog=await fetch('./catalog.json').then(r=>{if(!r.ok)throw Error('Content unavailable');return r.json()});
const embedded=window.parent!==window;document.body.classList.toggle('embedded',embedded);
const key='cluecanvas-games-progress-v1';let saved=emptySave(),storageWarning=false;try{saved=normalizeSave(JSON.parse(localStorage.getItem(key)||'{}'),Object.values(catalog).flat().map(q=>q.id))}catch{storageWarning=true}
let run=null,timer=null,studyEnd=0,hidden=false,hinted=false,answered=false,activeMap=null;
const difficulty=q=>bands[q.band];
function scrollTop(){window.scrollTo(0,0)}
function clearTimer(){clearInterval(timer);timer=null}
function persist(){try{localStorage.setItem(key,JSON.stringify(saved));storageWarning=false}catch{storageWarning=true}}
// Keep navigation separate from the existing progress schema and puzzle definitions.
function route(mode='',number=0){
 if(embedded)window.parent.postMessage({type:'cluecanvas-games-route',mode,round:number},location.origin==='null'?'*':location.origin);
 else{const url=new URL(location.href);for(const key of ['gameMode','gameRound'])url.searchParams.delete(key);if(mode)url.searchParams.set('gameMode',mode);if(number)url.searchParams.set('gameRound',number);if(url.href!==location.href)history.pushState({},'',url)}
}
function restoreRoute(mode,number){
 const valid=modes.some(m=>m.id===mode),limit=mode==='daily'?4:100;
 if(!Number.isInteger(number)||number<0||number>limit||(!valid&&mode!=='daily')){home();return}
 if(mode==='daily')startDaily(Math.max(0,number-1));
 else if(number)start(mode,number-1);else map(mode);
}
window.addEventListener('message',event=>{if(event.source===window.parent&&event.origin===location.origin&&event.data?.type==='cluecanvas-games-navigate')restoreRoute(event.data.mode,event.data.round)});
window.addEventListener('popstate',()=>{const params=new URLSearchParams(location.search);restoreRoute(params.get('gameMode')||'',Number(params.get('gameRound')||0))});
function modeStats(mode){const q=catalog[mode];return{solved:q.filter(x=>saved.results[x.id]?.status==='solved').length,played:q.filter(x=>saved.results[x.id]).length}}
function home(){
 clearTimer();run=null;activeMap=null;
 route();
 app.innerHTML='<p class="kicker">A LITTLE SOMETHING FOR EVERY MIND</p><h1>Your puzzle<br>corner.</h1><p class="intro muted">Notice something. Remember something. Work something out. Pick your next little challenge.</p><section class="daily"><span class="eyebrow">TODAY’S FOUR</span><h2>A fresh little mix.</h2><p>One round of each game. No rush. A different mix tomorrow.</p><button class="primary wide" data-daily>Play today’s mix →</button>'+(saved.daily[dateKey()]?'<p>Today: '+saved.daily[dateKey()].score+' of 4 solved. Replay whenever you like.</p>':'')+'</section><p class="eyebrow muted">FOUR GAMES · 400 PUZZLES</p><div class="shelf">'+modes.map(m=>'<button class="game-card" data-mode="'+m.id+'"><span class="art-icon" aria-hidden="true">'+m.icon+'</span><span><h3>'+m.title+'</h3><p>'+m.desc+'</p><span class="tag">'+modeStats(m.id).solved+' / 100 solved · '+m.skill+'</span></span><span aria-hidden="true">›</span></button>').join('')+'</div><p class="footer">Game progress is saved on this device.<br>It is separate from your rebus progress and account sync.</p>'+(storageWarning?'<p role="alert" class="hint">This device couldn’t save your game progress. You can still play.</p>':'');
 app.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>map(b.dataset.mode));app.querySelector('[data-daily]').onclick=()=>startDaily();scrollTop();
}
function map(mode){
 clearTimer();activeMap=mode;run=null;const m=modes.find(x=>x.id===mode),stats=modeStats(mode),idx=nextUnplayed(catalog[mode],saved);
 route(mode);
 app.innerHTML='<div class="topline"><button class="back" id="back">← Games</button><span class="small muted">'+stats.solved+' / 100 solved</span></div><p class="kicker">'+m.skill.toUpperCase()+'</p><h1>'+m.title+'</h1><p class="muted">100 puzzles. Five levels. Start gently and work your way up—or pick any number to try.</p><button class="primary wide" id="continue">'+(idx<0?'Replay puzzle 1':'Continue at puzzle '+(idx+1))+' →</button>'+(mode==='memory'?'<label class="relax"><input type="checkbox" id="relaxed" '+(saved.relaxed?'checked':'')+'> Relaxed memory: hide the board when you’re ready</label>':'')+'<div class="levels">'+bands.map((b,i)=>'<section><p class="level-title"><span>'+(i+1)+'. '+b+'</span><span class="small muted">'+(i*20+1)+'–'+((i+1)*20)+'</span></p><div class="numbers">'+catalog[mode].slice(i*20,i*20+20).map(q=>{const result=saved.results[q.id];return'<button data-number="'+q.number+'" class="number '+(result?.status||'')+'" aria-label="Puzzle '+q.number+', '+(result?.status||'not played')+'">'+q.number+(result?.status==='solved'?'<span aria-hidden="true">✓</span>':result?'<span aria-hidden="true">·</span>':'')+'</button>'}).join('')+'</div></section>').join('')+'</div><p class="footer">✓ Solved · Dot: tried or revealed<br>You can replay any puzzle.</p>';
 document.querySelector('#back').onclick=home;document.querySelector('#continue').onclick=()=>start(mode,idx<0?0:idx);
 app.querySelectorAll('[data-number]').forEach(b=>b.onclick=()=>start(mode,Number(b.dataset.number)-1));
 if(mode==='memory')document.querySelector('#relaxed').onchange=e=>{saved.relaxed=e.target.checked;persist()};scrollTop();
}
function start(mode,index){run={mode,rounds:catalog[mode],index,score:0,hints:0,results:[],daily:false};round()}
function startDaily(index=0){run={mode:'daily',rounds:dailyRounds(catalog),index,score:0,hints:0,results:[],daily:true};round()}
function choices(q){return'<div class="choices">'+shuffle(q.options,rng(q.number*91)).map(v=>'<button class="choice" data-answer="'+esc(v)+'" aria-label="'+esc(v)+'">'+symbol(v)+'</button>').join('')+'</div>'}
function round(){
 clearTimer();hinted=false;answered=false;hidden=false;
 const q=run.rounds[run.index],m=modes.find(x=>x.id===q.mode);
 route(run.daily?'daily':q.mode,run.daily?run.index+1:q.number);
 app.innerHTML='<div class="topline"><button class="back" id="back">← '+(run.daily?'Games':'Puzzles')+'</button><span class="small muted">'+(run.daily?'Daily '+(run.index+1)+' / 4':'Puzzle '+q.number+' / 100')+'</span></div><div class="progress"><span style="width:'+(run.daily?run.index/4*100:(q.number-1))+'%"></span></div><p class="kicker">'+difficulty(q)+'</p><h2>'+m.title+'</h2><p class="instruction" id="instruction">'+esc(q.mode==='memory'?'Study the board. A question follows when you hide it.':q.question)+'</p><div id="playarea"></div><div id="response" aria-live="polite"></div><div id="tools"></div><p class="save-warning small" role="status"></p>';
 document.querySelector('#back').onclick=()=>run.daily?home():map(q.mode);
 if(q.mode==='memory'){
  document.querySelector('#playarea').innerHTML=memoryBoard(q)+'<button class="secondary wide" id="hide">I’m ready — hide the board</button>';
  document.querySelector('#hide').onclick=hideMemory;if(saved.relaxed)document.querySelector('#timer').textContent='Take as long as you need.';else{studyEnd=Date.now()+q.studySeconds*1000;tick();timer=setInterval(tick,200)}
 }else{
  if(q.mode==='odd')document.querySelector('#playarea').innerHTML='<div class="stage"><div class="grid" style="grid-template-columns:repeat('+Math.sqrt(q.size)+',minmax(0,1fr))">'+q.board.map((v,i)=>'<button class="tile" data-answer="'+i+'" aria-label="Tile row '+(Math.floor(i/Math.sqrt(q.size))+1)+' column '+(i%Math.sqrt(q.size)+1)+', '+esc(describe(v))+'"><span class="coord">'+(i+1)+'</span>'+symbol(v)+'</button>').join('')+'</div></div>';
  else document.querySelector('#playarea').innerHTML=(q.sequence?'<div class="stage"><div class="sequence">'+[...q.sequence,...(q.missing?[]:['?'])].map(v=>'<div role="img" aria-label="'+esc(v)+'" class="tile '+(v==='?'?'gap':'')+'">'+symbol(v)+'</div>').join('')+'</div></div>':'')+choices(q);
  attach();tools();
 }scrollTop();
}
function memoryBoard(q,reveal=false){return'<div class="stage"><div class="grid memory" style="grid-template-columns:repeat('+q.cols+',minmax(0,1fr))">'+q.board.map((v,i)=>'<div class="tile '+(reveal&&(i===q.highlight||(q.band===4&&i===(q.highlight+q.cols)%q.board.length))?'correct':'')+'" aria-label="'+esc(v.shape+', '+v.dots+' dots, row '+(Math.floor(i/q.cols)+1)+', column '+(i%q.cols+1))+'">'+symbol(v)+'</div>').join('')+'</div><div class="timer" id="timer">'+(reveal?'The original board.':'')+'</div></div>'}
function tick(){if(!run||hidden)return;const t=Math.max(0,Math.ceil((studyEnd-Date.now())/1000));const el=document.querySelector('#timer');if(el)el.textContent=t+' seconds to look';if(!t)hideMemory()}
function hideMemory(){if(hidden||!run)return;clearTimer();hidden=true;const q=run.rounds[run.index];document.querySelector('#instruction').textContent=q.question;document.querySelector('#playarea').innerHTML='<div class="stage blank"><div><span style="font-size:42px;color:#147f79">◈</span><p>Picture the board in your mind.<br>Rows go down. Columns go across.</p></div></div>'+choices(q);attach();tools()}
function attach(){app.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answer(b.dataset.answer,b))}
function tools(){document.querySelector('#tools').innerHTML='<button class="quiet" id="hint">A little hint</button><button class="quiet" id="skip" style="float:right">Show me this one</button>';document.querySelector('#hint').onclick=()=>{if(hinted)return;hinted=true;run.hints++;const p=document.createElement('p');p.className='hint';p.textContent=run.rounds[run.index].hint;document.querySelector('#tools').prepend(p);document.querySelector('#hint').disabled=true};document.querySelector('#skip').onclick=()=>answer(null,null)}
function answer(value,button){
 if(answered)return;answered=true;clearTimer();const q=run.rounds[run.index],correct=value!==null&&isCorrect(q,value);if(correct)run.score++;
 const result={id:q.id,mode:q.mode,correct,hinted};run.results.push(result);
 recordResult(saved,q.id,correct?'solved':value===null?'revealed':'missed',hinted);persist();
 app.querySelectorAll('[data-answer]').forEach(b=>{b.disabled=true;if(isCorrect(q,b.dataset.answer))b.classList.add('correct')});if(!correct&&button)button.classList.add('wrong');
 if(q.mode==='memory')document.querySelector('#playarea .stage').outerHTML=memoryBoard(q,true);
 document.querySelector('#tools').innerHTML='';
 document.querySelector('#response').innerHTML='<section class="feedback '+(correct?'':'miss')+'"><strong>'+(correct?(hinted?'Nice work.':'Spotted it!'):value===null?'Here’s the connection.':'Now you can see it.')+'</strong><p>'+esc(q.explanation)+'</p><button class="primary wide" id="next">'+(run.daily?(run.index===3?'See how you did':'Next game →'):q.number===100?'Finish this collection':'Next puzzle →')+'</button>'+(!correct&&!run.daily?'<button class="quiet wide" id="retry">Try this puzzle again</button>':'')+'</section>';
 if(storageWarning)document.querySelector('.save-warning').textContent='Progress could not be saved on this device.';
 document.querySelector('#next').onclick=()=>{run.index++;run.index===run.rounds.length?finish():round()};
 const retry=document.querySelector('#retry');if(retry)retry.onclick=()=>{run.results.pop();round()};
}
function finish(){
 clearTimer();const daily=run.daily;if(daily){saved.daily[dateKey()]={score:Math.max(saved.daily[dateKey()]?.score||0,run.score)};persist()}
 const solved=daily?run.score:modeStats(run.mode).solved,total=daily?4:100;
 app.innerHTML='<div class="result-mark" aria-hidden="true">✦</div><p class="kicker">NICELY PLAYED</p><h1>'+(daily?'Your daily mix, complete.':'You reached puzzle 100.')+'</h1><div class="score">'+solved+'<span style="font-size:1.5rem;color:#657586"> / '+total+'</span></div><p class="muted">Solved'+(daily?' in this daily mix.':' in this collection. Replay any puzzle you’d like to master.')+'</p><div class="actions"><button class="primary wide" id="again">'+(daily?'Try a different game':'See your puzzle collection')+'</button><button class="secondary wide" id="home">Back to the games</button></div>'+(storageWarning?'<p role="alert">Your device could not save this result.</p>':'')+'<p class="footer">'+(daily?'Tomorrow brings a different mix.':'Different skills. Same curious mind.')+'</p>';
 document.querySelector('#again').onclick=()=>daily?home():map(run.mode);document.querySelector('#home').onclick=home;scrollTop();
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&run&&run.rounds[run.index]?.mode==='memory'&&!hidden&&!saved.relaxed)tick()});
window.addEventListener('pagehide',clearTimer);
const initialParams=new URLSearchParams(location.search);
restoreRoute(initialParams.get('gameMode')||'',Number(initialParams.get('gameRound')||0));
if(embedded)window.parent.postMessage({type:'cluecanvas-games-ready'},location.origin==='null'?'*':location.origin);



