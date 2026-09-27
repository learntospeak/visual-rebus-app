(function(){
'use strict';
const root=document.querySelector('.lab-shell');
const live=document.getElementById('live');
function announce(msg){live.textContent='';setTimeout(()=>live.textContent=msg,20)}

document.querySelectorAll('.mode-tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const mode=btn.dataset.mode;
    document.querySelectorAll('.mode-tab').forEach(b=>b.classList.toggle('is-active',b===btn));
    document.querySelectorAll('.mode-panel').forEach(p=>p.classList.toggle('is-active',p.dataset.panel===mode));
  });
});

/* ---------- Picture Assembly ---------- */
const pictureSvg=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#9dc7dc"/><stop offset="1" stop-color="#f0cf9e"/></linearGradient></defs>
<rect width="900" height="600" fill="url(#sky)"/>
<circle cx="705" cy="112" r="58" fill="#fff6d0"/>
<rect y="370" width="900" height="230" fill="#7ca6ad"/>
<path d="M0 420 Q160 365 300 420 T600 420 T900 420 V600 H0Z" fill="#5d8792"/>
<path d="M0 485 Q165 430 320 485 T640 485 T900 485" fill="none" stroke="#d7eef2" stroke-width="16" opacity=".8"/>
<path d="M365 165 L515 165 L570 375 L310 375 Z" fill="#f4ead6" stroke="#6a5948" stroke-width="10"/>
<rect x="410" y="238" width="60" height="137" fill="#29404b"/>
<polygon points="300,170 580,170 445,68" fill="#8d473c"/>
<circle cx="445" cy="92" r="24" fill="#ead7ad"/>
<path d="M160 460 C255 390 315 385 370 390" fill="none" stroke="#ddc08a" stroke-width="26" stroke-linecap="round"/>
<path d="M520 390 C610 385 685 408 785 474" fill="none" stroke="#ddc08a" stroke-width="26" stroke-linecap="round"/>
<path d="M440 375 C440 450 440 500 440 585" stroke="#e8d89f" stroke-width="22"/>
</svg>`;
const pictureUrl='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(pictureSvg);
const correctPieces=[
 {id:0,x:0,y:0,rot:0},{id:1,x:1,y:0,rot:0},{id:2,x:2,y:0,rot:0},
 {id:3,x:0,y:1,rot:0},{id:4,x:1,y:1,rot:0},{id:5,x:2,y:1,rot:0}
];
let assemblyState=[];
let assemblySelected=null;
let assemblyMoves=0;
function initAssembly(){
  const scrambled=[3,0,5,2,1,4];
  const rotations=[90,180,270,90,0,180];
  assemblyState=scrambled.map((id,i)=>({id,rot:rotations[i]}));
  assemblySelected=null;assemblyMoves=0;renderAssembly();
}
function renderAssembly(){
  const board=document.getElementById('assemblyBoard');
  board.innerHTML='';
  assemblyState.forEach((piece,pos)=>{
    const tile=document.createElement('button');
    tile.type='button';tile.className='assembly-tile'+(assemblySelected===pos?' is-selected':'');
    tile.setAttribute('aria-label','Picture tile '+(pos+1));
    const art=document.createElement('div');art.className='tile-art';
    const def=correctPieces[piece.id];
    art.style.backgroundImage='url("'+pictureUrl+'")';
    art.style.backgroundPosition=(def.x*50)+'% '+(def.y*100)+'%';
    art.style.transform='rotate('+piece.rot+'deg)';
    tile.appendChild(art);
    const rot=document.createElement('button');rot.type='button';rot.className='rotate-btn';rot.textContent='↻';rot.setAttribute('aria-label','Rotate tile');
    rot.addEventListener('click',e=>{e.stopPropagation();piece.rot=(piece.rot+90)%360;assemblyMoves++;renderAssembly();});
    tile.appendChild(rot);
    tile.addEventListener('click',()=>{
      if(assemblySelected===null){assemblySelected=pos;}
      else if(assemblySelected===pos){assemblySelected=null;}
      else{const t=assemblyState[assemblySelected];assemblyState[assemblySelected]=assemblyState[pos];assemblyState[pos]=t;assemblySelected=null;assemblyMoves++;}
      renderAssembly();
    });
    board.appendChild(tile);
  });
  document.getElementById('assemblyMoves').textContent=assemblyMoves+' move'+(assemblyMoves===1?'':'s');
  const solved=assemblyState.every((p,i)=>p.id===i&&p.rot%360===0);
  document.getElementById('assemblyStatus').textContent=solved?'Image restored — that feels better.':'Restore all 6 pieces';
  if(solved)announce('Picture Assembly solved');
}

/* ---------- Word Physics ---------- */
let physics={selected:null,used:new Set(),vine:false,lit:false,key:false,open:false};
function renderPhysics(){
  const stage=document.getElementById('physicsStage');
  stage.classList.toggle('is-lit',physics.lit);
  stage.classList.toggle('key-pulled',physics.key);
  stage.classList.toggle('gate-open',physics.open);
  document.getElementById('physicsVine').style.height=physics.vine?'165px':'0px';
  document.querySelectorAll('.word-tool').forEach(b=>{
    const w=b.dataset.word;
    b.classList.toggle('is-selected',physics.selected===w);
    b.classList.toggle('is-used',physics.used.has(w));
    b.disabled=physics.used.has(w);
  });
  const count=physics.used.size;
  document.getElementById('physicsSteps').textContent=count+' / 3 actions';
  const status=document.getElementById('physicsStatus');
  if(physics.open)status.textContent='Gate open — runner escaped';
  else if(physics.key)status.textContent='The key moved. What can open the gate?';
  else if(physics.lit)status.textContent='The light reveals the key';
  else if(physics.vine)status.textContent='The vine changed the scene';
  else status.textContent='Get the runner through the gate';
}
function resetPhysics(){physics={selected:null,used:new Set(),vine:false,lit:false,key:false,open:false};renderPhysics()}
document.querySelectorAll('.word-tool').forEach(btn=>btn.addEventListener('click',()=>{if(!physics.used.has(btn.dataset.word)){physics.selected=physics.selected===btn.dataset.word?null:btn.dataset.word;renderPhysics();}}));
document.querySelectorAll('[data-target]').forEach(obj=>obj.addEventListener('click',()=>{
  if(!physics.selected)return announce('Choose a word first');
  const w=physics.selected,t=obj.dataset.target;
  let success=false;
  if(w==='GROW'&&t==='seed'&&!physics.vine){physics.vine=true;success=true;}
  else if(w==='LIGHT'&&t==='lamp'&&physics.vine&&!physics.lit){physics.lit=true;success=true;}
  else if(w==='PULL'&&t==='gate'&&physics.lit&&!physics.key){physics.key=true;success=true;setTimeout(()=>{physics.open=true;renderPhysics();announce('Word Physics solved')},650);}
  if(success){physics.used.add(w);physics.selected=null;renderPhysics();}
  else announce(w==='LIGHT'&&t==='lamp'&&!physics.vine?'The lantern is still out of reach. Change the scene first.':'That word does not affect that object yet');
}));

/* ---------- Visual Connections ---------- */
const connectionData=[
 {id:'fall-leaf',group:'FALL',icon:'🍂',label:'leaf',anim:'fall'},
 {id:'fall-water',group:'FALL',icon:'💧',label:'waterfall',anim:'fall'},
 {id:'fall-domino',group:'FALL',icon:'▥',label:'domino',anim:'fall'},
 {id:'fall-chart',group:'FALL',icon:'↘',label:'market drop',anim:'fall'},
 {id:'strike-match',group:'STRIKE',icon:'🔥',label:'match',anim:'strike'},
 {id:'strike-bowl',group:'STRIKE',icon:'🎳',label:'bowling',anim:'strike'},
 {id:'strike-bell',group:'STRIKE',icon:'🔔',label:'clock chime',anim:'strike'},
 {id:'strike-lightning',group:'STRIKE',icon:'⚡',label:'lightning',anim:'strike'},
 {id:'break-glass',group:'BREAK',icon:'◇',label:'cracked glass',anim:'break'},
 {id:'break-chain',group:'BREAK',icon:'⛓',label:'snapped chain',anim:'break'},
 {id:'break-coffee',group:'BREAK',icon:'☕',label:'coffee pause',anim:'break'},
 {id:'break-wave',group:'BREAK',icon:'🌊',label:'breaking wave',anim:'break'}
];
let conn={remaining:[],selected:new Set(),solved:[]};
function resetConnections(){
  const order=[7,0,10,4,2,11,5,8,3,9,1,6];
  conn={remaining:order.map(i=>connectionData[i].id),selected:new Set(),solved:[]};
  renderConnections();
}
function renderConnections(){
  const board=document.getElementById('connectionBoard');board.innerHTML='';
  conn.remaining.forEach(id=>{
    const d=connectionData.find(x=>x.id===id);
    const b=document.createElement('button');b.type='button';b.className='connection-tile'+(conn.selected.has(id)?' is-selected':'');
    b.innerHTML='<span class="scene anim-'+d.anim+'"><span class="symbol">'+d.icon+'</span><small>'+d.label+'</small></span>';
    b.addEventListener('click',()=>{
      if(conn.selected.has(id))conn.selected.delete(id);else if(conn.selected.size<4)conn.selected.add(id);
      renderConnections();
    });
    board.appendChild(b);
  });
  const solved=document.getElementById('solvedGroups');
  solved.innerHTML=conn.solved.map(g=>'<div class="solved-group"><strong>'+g+'</strong>Four scenes connected by the same idea.</div>').join('');
  document.getElementById('connectionCount').textContent=conn.solved.length+' / 3 groups';
  document.getElementById('connectionStatus').textContent=conn.solved.length===3?'Board cleared — all connections found':(conn.selected.size===4?'Ready to submit':'Select four scenes');
}
document.getElementById('submitGroup').addEventListener('click',()=>{
  if(conn.selected.size!==4)return announce('Select exactly four scenes');
  const picks=[...conn.selected].map(id=>connectionData.find(x=>x.id===id));
  const group=picks[0].group;
  if(picks.every(x=>x.group===group)){
    conn.solved.push(group);conn.remaining=conn.remaining.filter(id=>!conn.selected.has(id));conn.selected.clear();renderConnections();
    announce(group+' group solved');
  }else{announce('Not quite. Those four do not share one connection.');document.getElementById('connectionStatus').textContent='Not quite — try a different four';}
});
document.getElementById('clearGroup').addEventListener('click',()=>{conn.selected.clear();renderConnections()});

document.querySelectorAll('[data-reset]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.reset==='assembly')initAssembly();if(b.dataset.reset==='physics')resetPhysics();if(b.dataset.reset==='connections')resetConnections();}));

initAssembly();resetPhysics();resetConnections();
})();