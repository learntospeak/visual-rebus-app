(function(){
'use strict';

const KEY='cluecanvas.assemblyChapter01.premium.v2';
const board=document.getElementById('board');
const guide=document.getElementById('guide');
const live=document.getElementById('live');
const levelStrip=document.getElementById('levelStrip');
const answerPanel=document.getElementById('answerPanel');
const answerPattern=document.getElementById('answerPattern');
const answerInput=document.getElementById('answerInput');
const answerFeedback=document.getElementById('answerFeedback');
const clueBtn=document.getElementById('clueBtn');
const cluePanel=document.getElementById('cluePanel');
const revealPanel=document.getElementById('revealPanel');
const revealAnswerBtn=document.getElementById('revealAnswerBtn');
const submitAnswerBtn=document.getElementById('submitAnswerBtn');
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
 {id:'watched',name:'The Waiting Kitchen',answer:'A Watched Pot Never Boils',accepted:['a watched pot never boils'],clues:['Focus on the pot and the prominent timepiece.','The phrase is a proverb about waiting for something to happen.','The final word describes what the pot is not doing.'],cols:3,rows:2,aspect:1.5,rotate:.35,guide:'faint',difficulty:'Beginner',par:8,copy:'The watched pot and prominent timepiece point to the familiar proverb.',art:art.watched},
 {id:'hoops',name:'The Trial',answer:'Jump Through Hoops',accepted:['jump through hoops'],clues:['Look at what the subject is physically passing through.','There is more than one circular obstacle.','The phrase means enduring unnecessary requirements.'],cols:3,rows:3,aspect:1,rotate:.45,guide:'faint',difficulty:'Beginner+',par:13,copy:'The subject is literally jumping through a sequence of hoops.',art:art.hoops},
 {id:'midnight',name:'After Hours',answer:'Burn the Midnight Oil',accepted:['burn the midnight oil'],clues:['The scene is clearly taking place very late at night.','The main light source is an old-fashioned oil lamp.','The phrase means working late into the night.'],cols:4,rows:3,aspect:4/3,rotate:.6,guide:'faint',difficulty:'Intermediate',par:18,copy:'The late-night study and glowing oil lamp create the phrase.',art:art.midnight},
 {id:'pours',name:'The Downpour',answer:'When It Rains It Pours',accepted:['when it rains it pours'],clues:['The weather is more extreme than ordinary rain.','Think about the difference between rain falling and liquid pouring.','The phrase means problems often arrive all at once.'],cols:4,rows:4,aspect:1,rotate:.75,guide:'none',difficulty:'Challenging',par:25,copy:'The rain is not merely falling — it is visibly pouring into the scene.',art:art.pours},
 {id:'rome',name:'The Convergence',answer:'All Roads Lead to Rome',accepted:['all roads lead to rome'],clues:['Follow the roads and notice where they converge.','The central landmark is the Colosseum.','The phrase says different routes can reach the same result.'],cols:5,rows:4,aspect:1.5,rotate:1,guide:'none',difficulty:'Advanced',par:32,copy:'Multiple continuous roads converge on the dominant Colosseum at the centre of Rome.',art:art.rome}
];

let state=load();
let current=Math.min(state.current,levels.length-1);
let pieces=[],selected=null,moves=0,guideVisible=false,solved=false;
let clueCount=0,score=100,penalties=0;
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
  pieces=newPieces(l);selected=null;moves=0;solved=false;guideVisible=l.guide==='strong';clueCount=0;score=100;penalties=0;
  answerInput.value='';answerFeedback.textContent='';cluePanel.hidden=true;cluePanel.textContent='';revealPanel.hidden=true;
  clueBtn.disabled=false;clueBtn.textContent='Clue 1';
  document.getElementById('levelMeta').textContent='Level '+(current+1)+' · '+pieces.length+' pieces';
  document.getElementById('levelTitle').textContent=l.name;
  document.getElementById('difficultyBadge').textContent=l.difficulty;
  document.getElementById('scoreValue').textContent=score;
  answerPanel.hidden=true;completePanel.hidden=true;answerFeedback.textContent='';
  board.style.gridTemplateColumns='repeat('+l.cols+',1fr)';
  board.style.aspectRatio=String(l.aspect);
  guide.style.backgroundImage='url("'+l.art+'")';
  guide.style.aspectRatio=String(l.aspect);
  guide.classList.toggle('is-hidden',!guideVisible);
  document.getElementById('hintBtn').textContent=guideVisible?'Hide guide':'Reveal guide';
  const rotationHint=document.getElementById('rotateHint');
  rotationHint.hidden=false;
  rotationHint.textContent='Single tap selects/swaps · double-tap rotates 90°';
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
    const a=document.createElement('span');a.className='ac-piece-art';
    a.style.backgroundImage='url("'+l.art+'")';
    a.style.backgroundSize=(l.cols*100)+'% '+(l.rows*100)+'%';
    a.style.backgroundPosition=(l.cols===1?0:(x/(l.cols-1)*100))+'% '+(l.rows===1?0:(y/(l.rows-1)*100))+'%';
    a.style.transform='rotate('+piece.rot+'deg)';tile.appendChild(a);
    tile.addEventListener('click',()=>{
      if(solved)return;
      const now=Date.now();
      const isDouble=lastTapPos===pos && (now-lastTapAt)<340;

      if(isDouble){
        if(tapTimer){clearTimeout(tapTimer);tapTimer=null;}
        lastTapPos=null;lastTapAt=0;

        if(l.rotate){
          piece.rot=(piece.rot+90)%360;
          selected=null;
          moves++;
          applyMovePenalty(l);
          renderBoard();checkSolved();
          announce('Piece rotated 90 degrees');
        }else{
          selected=null;
          renderBoard();
          announce('Rotation is not used on this level');
        }
        return;
      }

      lastTapPos=pos;lastTapAt=now;

      if(tapTimer)clearTimeout(tapTimer);
      tapTimer=setTimeout(()=>{
        tapTimer=null;
        if(solved)return;
        if(selected===null)selected=pos;
        else if(selected===pos)selected=null;
        else{[pieces[selected],pieces[pos]]=[pieces[pos],pieces[selected]];selected=null;moves++;applyMovePenalty(l);}
        lastTapPos=null;lastTapAt=0;
        renderBoard();checkSolved();
      },280);
    });
    board.appendChild(tile);
  });
  document.getElementById('moveCount').textContent=moves+' move'+(moves===1?'':'s');
  document.getElementById('pieceStatus').textContent=placedCount()+' / '+pieces.length+' placed';
}
function updateScore(){
  score=Math.max(0,100-penalties);
  document.getElementById('scoreValue').textContent=score;
}
function applyMovePenalty(level){
  if(moves>level.par){penalties+=1;updateScore();}
}
function checkSolved(){
  if(!isSolved()||solved)return;
  solved=true;selected=null;renderBoard();
  const glow=document.getElementById('solvedGlow');glow.classList.remove('run');void glow.offsetWidth;glow.classList.add('run');
  setTimeout(showAnswers,520);announce('Picture complete. Find the hidden meaning.');
}
function normaliseAnswer(value){return value.toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()}
function renderPattern(answer){
  answerPattern.innerHTML='';
  answer.split(/\s+/).forEach(word=>{
    const span=document.createElement('span');
    span.textContent=String(word.replace(/[^a-zA-Z0-9]/g,'').length);
    answerPattern.appendChild(span);
  });
}
function showAnswers(){
  const l=levels[current];
  renderPattern(l.answer);
  answerPanel.hidden=false;
  answerInput.value='';
  answerFeedback.textContent='';
  clueCount=0;
  cluePanel.hidden=true;
  revealPanel.hidden=true;
  clueBtn.disabled=false;
  clueBtn.textContent='Clue 1';
  setTimeout(()=>answerInput.focus({preventScroll:true}),120);
}
function submitTypedAnswer(){
  const l=levels[current];
  const guess=normaliseAnswer(answerInput.value);
  if(!guess){answerFeedback.textContent='Enter a phrase first.';return;}
  const valid=[normaliseAnswer(l.answer),...(l.accepted||[]).map(normaliseAnswer)];
  if(valid.includes(guess)){
    answerFeedback.textContent='Correct.';
    setTimeout(()=>completeLevel(l),350);
  }else{
    penalties+=8;updateScore();
    answerFeedback.textContent='Not quite. 8 points lost.';
  }
}
function showNextClue(){
  const l=levels[current];
  if(clueCount>=l.clues.length)return;
  clueCount++;
  penalties+=5;updateScore();
  cluePanel.hidden=false;
  cluePanel.textContent=l.clues[clueCount-1];
  clueBtn.textContent=clueCount>=l.clues.length?'All clues shown':'Clue '+(clueCount+1);
  clueBtn.disabled=clueCount>=l.clues.length;
  revealPanel.hidden=clueCount<l.clues.length;
}
function revealCurrentAnswer(){
  const l=levels[current];
  penalties+=20;updateScore();
  answerInput.value=l.answer;
  answerFeedback.textContent='Answer revealed. 20 points lost.';
}
function completeLevel(l){
  state.completed[l.id]=true;save();answerPanel.hidden=true;completePanel.hidden=false;
  document.getElementById('completePhrase').textContent=l.answer;
  document.getElementById('completeCopy').textContent=l.copy+' Final score: '+score+'/100.';
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
submitAnswerBtn.addEventListener('click',submitTypedAnswer);
answerInput.addEventListener('keydown',(event)=>{if(event.key==='Enter'){event.preventDefault();submitTypedAnswer();}});
clueBtn.addEventListener('click',showNextClue);
revealAnswerBtn.addEventListener('click',revealCurrentAnswer);
document.getElementById('hintBtn').addEventListener('click',()=>{guideVisible=!guideVisible;guide.classList.toggle('is-hidden',!guideVisible);document.getElementById('hintBtn').textContent=guideVisible?'Hide guide':'Reveal guide'});
document.getElementById('shuffleBtn').addEventListener('click',()=>{if(solved)return;pieces=newPieces(levels[current]);selected=null;moves++;penalties+=10;updateScore();renderBoard();announce('Reshuffle cost 10 points')});
document.getElementById('nextBtn').addEventListener('click',()=>{if(current<levels.length-1){current++;state.current=current;save();startLevel()}else document.querySelector('.ac-master').scrollIntoView({behavior:'smooth',block:'start'})});
document.getElementById('resetAll').addEventListener('click',()=>{if(confirm('Reset Assembly Chapter progress?')){localStorage.removeItem(KEY);state=defaultState();current=0;startLevel()}});
startLevel();
})();