import {makeKitchen} from './cinema-scene.mjs';
import {act,freshRound,normalize} from './engine.mjs';
import {chapter} from './chapter.mjs';
const $=s=>document.querySelector(s),scene=chapter.scenes[0],key='cluecanvas.cinema.v2';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let round=freshRound(),started=false,playing=false,time=0,view='auto',last=performance.now(),kitchen=null,saved=false;
try{const p=JSON.parse(localStorage.getItem(key));if(p?.version===2){for(const action of p.actions||[]){if(['letter','phrase','hint'].includes(action.type))round=act(scene,round,action).round;}var actions=p.actions||[];saved=actions.length>0;}}catch{}
actions=actions||[];
function save(){try{localStorage.setItem(key,JSON.stringify({version:2,actions}));}catch{}}
function drawUI(){
 const won=round.status==='won',lost=round.status==='lost';
 $('#lives').textContent=`${round.lives} lifeline${round.lives===1?'':'s'}${lost?' · attempt over':''}`;
 $('#answer').innerHTML=scene.answer.split(' ').map(w=>`<span class="word" aria-label="${[...w].map(c=>won||round.letters.includes(c)?c:'blank').join(' ')}">${[...w].map(c=>`<span class="slot">${won||round.letters.includes(c)?c.toUpperCase():''}</span>`).join('')}</span>`).join('');
 $('#keyboard').innerHTML=['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'].map(row=>`<div class="keys">${[...row].map(c=>{const hit=round.letters.includes(c.toLowerCase()),miss=round.misses.includes(c.toLowerCase());return `<button class="key ${hit?'correct':miss?'wrong':''}" data-letter="${c}" aria-label="${c}${hit?', revealed':miss?', incorrect':''}" ${!started||won||lost||hit||miss?'disabled':''}>${c}</button>`;}).join('')}</div>`).join('');
 document.querySelectorAll('[data-letter]').forEach(b=>b.onclick=()=>dispatch({type:'letter',letter:b.dataset.letter}));
 $('#phrase-toggle').disabled=!started||won||lost;
 $('#hint').disabled=!started||won||lost||(round.lives<2&&!round.hints.length);
 $('.cost').textContent=round.hints.length?'View again · free':'−1 lifeline';
 $('#result').hidden=!(won||lost);$('.solve').classList.toggle('solved',won);
 if(won){$('#result').innerHTML='<h3>A watched pot never boils.</h3><p>The water stays still under your gaze. Turn away, and it comes to life. Your attention was part of the puzzle.</p><p>This is the rebuilt first scene. The rest of the chapter will follow this direction only if it earns its place.</p><button id="again" class="outline">Play the scene again</button>';$('#again').onclick=reset;}
 if(lost){$('#result').innerHTML='<h3>Out of lifelines.</h3><p>The scene is still here to inspect. Try again when you have a new theory.</p><button id="again" class="primary">Retry this scene</button>';$('#again').onclick=()=>{round=freshRound();actions=[];save();$('#message').textContent='Three fresh lifelines. Looking and replaying are free.';drawUI();};}
 if(won||lost)$('#phrase-form').hidden=true;
}
function dispatch(action){const result=act(scene,round,action);round=result.round;actions.push(action);save();$('#message').textContent=result.message;drawUI();if(round.status==='won'){playing=false;view='watch';$('#subtitle').textContent='One mystery solved. Service can begin.';$('#shot').textContent='SCENE COMPLETE';$('#pause').textContent='Play';}}
function reset(){round=freshRound();actions=[];save();started=false;playing=false;time=0;view='auto';$('#start-panel').hidden=false;$('#hint-detail').hidden=true;$('#subtitle').textContent='';$('#message').textContent='A wrong guess or a hint uses one lifeline.';$('#phrase-form').hidden=true;$('#phrase-toggle').textContent='I know the phrase';$('#look').disabled=true;for(const id of ['pause','replay','step'])$('#'+id).disabled=true;drawUI();kitchen?.draw({time:0,instant:true});}
function start(){started=true;playing=!reduced.matches;view='auto';time=0;$('#start-panel').hidden=true;for(const id of ['pause','replay','step','look'])$('#'+id).disabled=false;$('#pause').textContent=playing?'Pause':'Play';$('#direction-text').textContent='Turning away and looking back are always free.';drawUI();}
$('#start').onclick=start;
$('#pause').onclick=()=>{if(time>=22){time=0;view='auto';}playing=!playing;$('#pause').textContent=playing?'Pause':'Play';};
$('#replay').onclick=()=>{time=0;view='auto';playing=!reduced.matches;$('#pause').textContent=playing?'Pause':'Play';$('#look').textContent='Look towards the door ↗';};
$('#step').onclick=()=>{playing=false;view='auto';time=Math.min(22,time+3);$('#pause').textContent='Play';kitchen?.draw({time,delta:1,instant:true});};
$('#look').onclick=()=>{playing=false;time=22;view=(view==='away'||view==='inspect')?'watch':'away';$('#look').textContent=view==='away'?'Look back at the stove ↙':'Look towards the door ↗';$('#pause').textContent='Replay';$('#subtitle').textContent=view==='away'?'Your attention moves elsewhere.':'You return to the stove.';};
$('#hint').onclick=()=>{if(!round.hints.length)dispatch({type:'hint',id:'eyes'});if(!round.hints.length)return;playing=false;time=22;view='inspect';$('#shot').textContent='A DIFFERENT ANGLE';$('#hint-detail').hidden=false;$('#hint-detail').textContent='From this overhead angle, you can see what happens while your attention is elsewhere. Look back at the stove to compare. A correct letter is placed in the phrase.';$('#subtitle').textContent='An overhead view of what you missed.';$('#look').textContent='Look back at the stove ↙';$('#pause').textContent='Replay';};
$('#phrase-toggle').onclick=()=>{$('#phrase-form').hidden=!$('#phrase-form').hidden;$('#phrase-toggle').textContent=$('#phrase-form').hidden?'I know the phrase':'Close phrase guess';if(!$('#phrase-form').hidden)$('#phrase-input').focus();};
$('#phrase-form').onsubmit=e=>{e.preventDefault();dispatch({type:'phrase',answer:$('#phrase-input').value});};
$('#reset').onclick=()=>{if(actions.length){if(!confirm('Clear this scene’s test progress and start fresh?'))return;}reset();};
$('#help').onclick=()=>$('#help-dialog').showModal();$('#close-help').onclick=()=>$('#help-dialog').close();$('#describe').onclick=()=>{$('#description').hidden=!$('#description').hidden;};
document.addEventListener('keydown',e=>{if(!started||$('#help-dialog').open||round.status!=='playing'||e.ctrlKey||e.altKey||e.metaKey||e.repeat||['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;if(/^[a-z]$/i.test(e.key)){e.preventDefault();dispatch({type:'letter',letter:e.key});}});
reduced.addEventListener('change',()=>{if(reduced.matches){playing=false;$('#pause').textContent='Play';}});
function frame(now){const dt=Math.min((now-last)/1000,.06);last=now;const active=!document.hidden&&!$('#help-dialog').open;
 if(active&&playing&&started){time=Math.min(22,time+dt);if(time>=22){playing=false;$('#pause').textContent='Replay';}}
 if(active&&kitchen)kitchen.draw({time,delta:started&&(playing||view!=='auto')&&!reduced.matches?dt:0,view,running:started,won:round.status==='won',instant:reduced.matches});
 $('#progress').style.width=`${time/22*100}%`;$('#duration').textContent=`00:${String(Math.floor(time)).padStart(2,'0')} / 00:22`;
 if(started&&view==='auto'&&round.status!=='won'){$('#shot').textContent=time>=22?'YOUR TURN TO INVESTIGATE':'ONE CONTINUOUS SCENE';$('#subtitle').textContent=time<4?'The first guests are almost here.':time<7.7?'Still not ready.':time<11?'A sound by the door.':time<16?'Just a moment…':time<20?'Back to the stove.':'What changed when you looked away?';}
 requestAnimationFrame(frame);
}
drawUI();
try{kitchen=makeKitchen($('#canvas'));$('#loading').hidden=true;if(saved){start();time=22;playing=false;view='watch';$('#pause').textContent='Replay';$('#shot').textContent='YOUR TURN TO INVESTIGATE';}requestAnimationFrame(frame);}catch(error){console.error(error);$('#loading').textContent='This scene needs WebGL 2. Try an up-to-date Chrome, Safari or Edge browser with graphics acceleration enabled.';$('#start').disabled=true;}


