(function(){
'use strict';

const KEY='cluecanvas.assemblyChapter01.premium.v2';
const board=document.getElementById('board');
const guide=document.getElementById('guide');
const live=document.getElementById('live');
const levelStrip=document.getElementById('levelStrip');
const answerPanel=document.getElementById('answerPanel');
const answerGrid=document.getElementById('answerGrid');
const answerFeedback=document.getElementById('answerFeedback');
const completePanel=document.getElementById('completePanel');

function announce(t){live.textContent='';setTimeout(()=>live.textContent=t,20)}
const art={
  watched:'./assets/watched-pot.jpg',
  hoops:'./assets/jump-hoops.jpg',
  midnight:'./assets/midnight-oil.jpg',
  pours:'./assets/rains-pours.jpg',
  rome:'./assets/roads-rome.jpg'
};

const levels=[
 {id:'watched',name:'The Waiting Kitchen',answer:'A Watched Pot Never Boils',choices:['A Watched Pot Never Boils','Too Many Cooks','Out of the Frying Pan','Slow Burn'],cols:3,rows:2,aspect:1.5,rotate:0,guide:'strong',difficulty:'Beginner',copy:'The watched pot and prominent timepiece point to the familiar proverb.',art:art.watched},
 {id:'hoops',name:'The Trial',answer:'Jump Through Hoops',choices:['Jump Through Hoops','Leap of Faith','Run in Circles','Going Round in Circles'],cols:3,rows:3,aspect:1,rotate:0,guide:'faint',difficulty:'Beginner+',copy:'The subject is literally jumping through a sequence of hoops.',art:art.hoops},
 {id:'midnight',name:'After Hours',answer:'Burn the Midnight Oil',choices:['Burn the Midnight Oil','Night Owl','Burning Daylight','Lights Out'],cols:4,rows:3,aspect:4/3,rotate:.34,guide:'faint',difficulty:'Intermediate',copy:'The late-night study and glowing oil lamp create the phrase.',art:art.midnight},
 {id:'pours',name:'The Downpour',answer:'When It Rains It Pours',choices:['When It Rains It Pours','Come Rain or Shine','Save It for a Rainy Day','Weather the Storm'],cols:4,rows:4,aspect:1,rotate:.5,guide:'none',difficulty:'Challenging',copy:'The rain is not merely falling — it is visibly pouring into the scene.',art:art.pours},
 {id:'rome',name:'The Convergence',answer:'All Roads Lead to Rome',choices:['All Roads Lead to Rome','The Road Less Travelled','Crossroads','Long Way Home'],cols:5,rows:4,aspect:1.5,rotate:1,guide:'none',difficulty:'Advanced',copy:'Multiple continuous roads converge on the dominant Colosseum at the centre of Rome.',art:art.rome}
];

let state=load();
let current=Math.min(state.current,levels.length-1);
let pieces=[],selected=null,moves=0,guideVisible=false,solved=false;
let lastTapPos=null,lastTapAt=0,tapTimer=null;

function defaultState(){return{current:0,completed:{}}}
function load(){try{return Object.assign(defaultState(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return defaultState()}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function randShuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}
function rotationFor(level){if(!level.rotate)return 0;if(level.rotate<1&&Math.random()>level.rotate)return 0;return [90,180,270][Math.floor(Math.random()*3)]}
function newPieces(level){const arr=Array.from({length:level.cols*level.rows},(_,id)=>({id,rot:rotationFor(level)}));do{randShuffle(arr)}while(arr.every((p,i)=>p.id===i&&p.rot===0));return arr}
function placedCount(){return pieces.filter((p,i)=>p.id===i&&p.rot%360===0).length}
function isSolved(){return placedCount()===pieces.length}

function renderLevelStrip(){
  levelStrip.innerHTML='';
  levels.forEach((lvl,i)=>{
    const b=document.createElement('button');b.type='button';b.className='ac-level-dot';
    const done=!!state.completed[lvl.id],unlocked=i===0||!!state.completed[levels[i-1].id]||done;
    if(i===current)b.classList.add('is-current');if(done)b.classList.add('is-done');if(!unlocked)b.classList.add('is-locked');
    b.disabled=!unlocked;b.innerHTML='<b>'+(done?'✓':i+1)+'</b><small>'+lvl.cols+'×'+lvl.rows+'</small>';
    b.addEventListener('click',()=>{if(unlocked){current=i;state.current=i;save();startLevel()}});
    levelStrip.appendChild(b);
  });
}
function startLevel(){
  const l=levels[current];
  if(tapTimer){clearTimeout(tapTimer);tapTimer=null;}
  lastTapPos=null;lastTapAt=0;
  pieces=newPieces(l);selected=null;moves=0;solved=false;guideVisible=l.guide==='strong';
  document.getElementById('levelMeta').textContent='Level '+(current+1)+' · '+pieces.length+' pieces';
  document.getElementById('levelTitle').textContent=l.name;
  document.getElementById('difficultyBadge').textContent=l.difficulty;
  answerPanel.hidden=true;completePanel.hidden=true;answerFeedback.textContent='';
  board.style.gridTemplateColumns='repeat('+l.cols+',1fr)';
  board.style.aspectRatio=String(l.aspect);
  guide.style.backgroundImage='url("'+l.art+'")';
  guide.style.aspectRatio=String(l.aspect);
  guide.classList.toggle('is-hidden',!guideVisible);
  document.getElementById('hintBtn').textContent=guideVisible?'Hide guide':'Reveal guide';
  document.getElementById('rotateHint').hidden=!l.rotate;
  renderBoard();renderLevelStrip();renderMaster();
}
function renderBoard(){
  const l=levels[current];board.innerHTML='';
  const pieceAspect=l.aspect*l.rows/l.cols;
  pieces.forEach((piece,pos)=>{
    const x=piece.id%l.cols,y=Math.floor(piece.id/l.cols);
    const tile=document.createElement('button');tile.type='button';tile.className='ac-piece';tile.style.aspectRatio=String(pieceAspect);
    if(selected===pos)tile.classList.add('is-selected');if(piece.id===pos&&piece.rot%360===0)tile.classList.add('is-correct');
    tile.setAttribute('aria-label','Piece '+(pos+1));
    const a=document.createElement('img');a.className='ac-piece-art';a.src=l.art;a.alt='';a.draggable=false;
    a.style.width=(l.cols*100)+'%';a.style.height=(l.rows*100)+'%';
    a.style.left=(-x*100)+'%';a.style.top=(-y*100)+'%';
    a.style.transform='rotate('+piece.rot+'deg)';tile.appendChild(a);
    tile.addEventListener('click',()=>{
      if(solved)return;
      const now=Date.now();
      const isDouble=l.rotate && lastTapPos===pos && (now-lastTapAt)<340;

      if(isDouble){
        if(tapTimer){clearTimeout(tapTimer);tapTimer=null;}
        lastTapPos=null;lastTapAt=0;
        piece.rot=(piece.rot+90)%360;
        moves++;
        renderBoard();checkSolved();
        announce('Piece rotated');
        return;
      }

      lastTapPos=pos;lastTapAt=now;

      if(!l.rotate){
        if(selected===null)selected=pos;
        else if(selected===pos)selected=null;
        else{[pieces[selected],pieces[pos]]=[pieces[pos],pieces[selected]];selected=null;moves++;}
        renderBoard();checkSolved();
        return;
      }

      if(tapTimer)clearTimeout(tapTimer);
      tapTimer=setTimeout(()=>{
        tapTimer=null;
        if(solved)return;
        if(selected===null)selected=pos;
        else if(selected===pos)selected=null;
        else{[pieces[selected],pieces[pos]]=[pieces[pos],pieces[selected]];selected=null;moves++;}
        lastTapPos=null;lastTapAt=0;
        renderBoard();checkSolved();
      },280);
    });
    board.appendChild(tile);
  });
  document.getElementById('moveCount').textContent=moves+' move'+(moves===1?'':'s');
  document.getElementById('pieceStatus').textContent=placedCount()+' / '+pieces.length+' placed';
}
function checkSolved(){
  if(!isSolved()||solved)return;
  solved=true;selected=null;renderBoard();
  const glow=document.getElementById('solvedGlow');glow.classList.remove('run');void glow.offsetWidth;glow.classList.add('run');
  setTimeout(showAnswers,520);announce('Picture complete. Find the hidden meaning.');
}
function showAnswers(){
  const l=levels[current];answerGrid.innerHTML='';answerPanel.hidden=false;
  l.choices.slice().sort(()=>Math.random()-.5).forEach(choice=>{
    const b=document.createElement('button');b.type='button';b.className='ac-answer';b.textContent=choice;
    b.addEventListener('click',()=>{
      if(choice===l.answer){b.classList.add('is-right');answerFeedback.textContent='Meaning uncovered.';setTimeout(()=>completeLevel(l),380);}
      else{b.classList.remove('is-wrong');void b.offsetWidth;b.classList.add('is-wrong');answerFeedback.textContent='Not quite. Look again at the completed scene.';}
    });answerGrid.appendChild(b);
  });
}
function completeLevel(l){
  state.completed[l.id]=true;save();answerPanel.hidden=true;completePanel.hidden=false;
  document.getElementById('completePhrase').textContent=l.answer;document.getElementById('completeCopy').textContent=l.copy;
  document.getElementById('nextBtn').textContent=current===levels.length-1?'View recovered fragments':'Continue deeper';
  renderLevelStrip();renderMaster();
}
function renderMaster(){
  const grid=document.getElementById('masterGrid');grid.innerHTML='';let count=0;
  levels.forEach((l,i)=>{
    const slot=document.createElement('div');slot.className='ac-master-slot';slot.dataset.n=i+1;
    if(state.completed[l.id]){count++;slot.classList.add('is-earned');const img=document.createElement('img');img.src=l.art;img.alt='Recovered fragment '+(i+1);slot.appendChild(img)}
    grid.appendChild(slot);
  });
  document.getElementById('masterCount').textContent=count+' / 5';
  document.getElementById('masterNote').textContent=count===5?'All five fragments recovered. The next prototype pass can turn these into a true master assembly.':'Solve each hidden meaning to recover all five chapter fragments.';
}
document.getElementById('hintBtn').addEventListener('click',()=>{guideVisible=!guideVisible;guide.classList.toggle('is-hidden',!guideVisible);document.getElementById('hintBtn').textContent=guideVisible?'Hide guide':'Reveal guide'});
document.getElementById('shuffleBtn').addEventListener('click',()=>{if(solved)return;pieces=newPieces(levels[current]);selected=null;moves++;renderBoard()});
document.getElementById('nextBtn').addEventListener('click',()=>{if(current<levels.length-1){current++;state.current=current;save();startLevel()}else document.querySelector('.ac-master').scrollIntoView({behavior:'smooth',block:'start'})});
document.getElementById('resetAll').addEventListener('click',()=>{if(confirm('Reset Assembly Chapter progress?')){localStorage.removeItem(KEY);state=defaultState();current=0;startLevel()}});
startLevel();
})();