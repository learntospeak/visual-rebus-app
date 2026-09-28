(function(){
'use strict';

const KEY='cluecanvas.assemblyChapter01.prototype.v3';
const levels=[
  {id:'watched',answer:'A Watched Pot Never Boils',accepted:['a watched pot never boils'],clues:['Focus on the pot and the prominent timepiece.','The phrase is a proverb about waiting for something to happen.','The final word describes what the pot is not doing.'],cols:3,rows:2,aspect:1.5,rotate:.35,difficulty:'Medium',difficultyScore:4,par:8,art:'./assets/watched-pot.jpg'},
  {id:'hoops',answer:'Jump Through Hoops',accepted:['jump through hoops'],clues:['Look at what the subject is physically passing through.','There is more than one circular obstacle.','The phrase means enduring unnecessary requirements.'],cols:3,rows:3,aspect:1,rotate:.45,difficulty:'Medium',difficultyScore:5,par:13,art:'./assets/jump-hoops.jpg'},
  {id:'midnight',answer:'Burn the Midnight Oil',accepted:['burn the midnight oil'],clues:['The scene is clearly taking place very late at night.','The main light source is an old-fashioned oil lamp.','The phrase means working late into the night.'],cols:4,rows:3,aspect:4/3,rotate:.6,difficulty:'Medium',difficultyScore:6,par:18,art:'./assets/midnight-oil.jpg'},
  {id:'pours',answer:'When It Rains It Pours',accepted:['when it rains it pours'],clues:['The weather is more extreme than ordinary rain.','Think about the difference between rain falling and liquid pouring.','The phrase means problems often arrive all at once.'],cols:4,rows:4,aspect:1,rotate:.75,difficulty:'Hard',difficultyScore:7,par:25,art:'./assets/rains-pours.jpg'},
  {id:'rome',answer:'All Roads Lead to Rome',accepted:['all roads lead to rome'],clues:['Follow the roads and notice where they converge.','The central landmark is the Colosseum.','The phrase says different routes can reach the same result.'],cols:5,rows:4,aspect:1.5,rotate:1,difficulty:'Hard',difficultyScore:8,par:32,art:'./assets/roads-rome.jpg'}
];

const board=document.getElementById('board');
const live=document.getElementById('live');
const answerPanel=document.getElementById('answerPanel');
const answerPattern=document.getElementById('answerPattern');
const answerInput=document.getElementById('answerInput');
const answerKeyboard=document.getElementById('answerKeyboard');
const answerFeedback=document.getElementById('answerFeedback');
const clueBtn=document.getElementById('clueBtn');
const cluePanel=document.getElementById('cluePanel');
const revealPanel=document.getElementById('revealPanel');
const revealAnswerBtn=document.getElementById('revealAnswerBtn');
const submitAnswerBtn=document.getElementById('submitAnswerBtn');
const completePanel=document.getElementById('completePanel');

const keyRows=[
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M','BACKSPACE'],
  ['SPACE']
];

let state=load();
let current=Math.max(0,Math.min(state.current||0,levels.length-1));
let pieces=[],selected=null,moves=0,solved=false,clueCount=0,score=100,penalties=0;
let lastTapPos=null,lastTapAt=0,tapTimer=null;

function defaultState(){return{current:0,completed:{}}}
function load(){try{return Object.assign(defaultState(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch{return defaultState()}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function announce(text){live.textContent='';setTimeout(()=>live.textContent=text,20)}
function shuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}
function rotationFor(level){if(Math.random()>level.rotate)return 0;return [90,180,270][Math.floor(Math.random()*3)]}
function newPieces(level){const arr=Array.from({length:level.cols*level.rows},(_,id)=>({id,rot:rotationFor(level)}));do{shuffle(arr)}while(arr.every((p,i)=>p.id===i&&p.rot===0));return arr}
function placedCount(){return pieces.filter((p,i)=>p.id===i&&p.rot%360===0).length}
function isSolved(){return placedCount()===pieces.length}
function normalise(value){return value.toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()}
function updateScore(){score=Math.max(0,100-penalties)}
function applyMovePenalty(level){if(moves>level.par){penalties+=1;updateScore()}}

function renderHeader(){
  const l=levels[current];
  document.getElementById('levelHeader').textContent='ASSEMBLY '+(current+1)+' OF '+levels.length;
  document.getElementById('headerProgress').style.width=((current+1)/levels.length*100)+'%';
  const badge=document.getElementById('difficultyBadge');
  badge.textContent=l.difficulty+' · '+l.difficultyScore+'/10';
  badge.className='difficulty difficulty-'+l.difficulty.toLowerCase();
}

function startLevel(){
  if(tapTimer){clearTimeout(tapTimer);tapTimer=null}
  lastTapPos=null;lastTapAt=0;
  const l=levels[current];
  pieces=newPieces(l);selected=null;moves=0;solved=false;clueCount=0;score=100;penalties=0;

  board.style.gridTemplateColumns='repeat('+l.cols+',1fr)';
  board.style.aspectRatio=String(l.aspect);

  answerPanel.hidden=true;
  completePanel.hidden=true;
  answerInput.value='';
  answerFeedback.innerHTML='&nbsp;';
  cluePanel.hidden=true;
  cluePanel.textContent='';
  revealPanel.hidden=true;
  clueBtn.disabled=false;
  clueBtn.textContent='Clue 1';

  renderHeader();
  renderBoard();
}

function renderBoard(){
  const l=levels[current];
  board.innerHTML='';
  const pieceAspect=l.aspect*l.rows/l.cols;

  pieces.forEach((piece,pos)=>{
    const x=piece.id%l.cols;
    const y=Math.floor(piece.id/l.cols);
    const tile=document.createElement('button');
    tile.type='button';
    tile.className='ac-piece';
    tile.style.aspectRatio=String(pieceAspect);
    if(selected===pos)tile.classList.add('is-selected');
    if(piece.id===pos&&piece.rot%360===0)tile.classList.add('is-correct');
    tile.setAttribute('aria-label','Puzzle piece '+(pos+1));

    const art=document.createElement('span');
    art.className='ac-piece-art';
    art.style.backgroundImage='url("'+l.art+'")';
    art.style.backgroundSize=(l.cols*100)+'% '+(l.rows*100)+'%';
    art.style.backgroundPosition=(l.cols===1?0:(x/(l.cols-1)*100))+'% '+(l.rows===1?0:(y/(l.rows-1)*100))+'%';
    art.style.transform='rotate('+piece.rot+'deg)';
    tile.appendChild(art);

    tile.addEventListener('click',()=>{
      if(solved)return;
      const now=Date.now();
      const isDouble=lastTapPos===pos&&(now-lastTapAt)<340;

      if(isDouble){
        if(tapTimer){clearTimeout(tapTimer);tapTimer=null}
        lastTapPos=null;lastTapAt=0;
        piece.rot=(piece.rot+90)%360;
        selected=null;
        moves++;
        applyMovePenalty(l);
        renderBoard();
        checkSolved();
        announce('Piece rotated 90 degrees');
        return;
      }

      lastTapPos=pos;lastTapAt=now;
      if(tapTimer)clearTimeout(tapTimer);
      tapTimer=setTimeout(()=>{
        tapTimer=null;
        if(solved)return;
        if(selected===null)selected=pos;
        else if(selected===pos)selected=null;
        else{
          [pieces[selected],pieces[pos]]=[pieces[pos],pieces[selected]];
          selected=null;
          moves++;
          applyMovePenalty(l);
        }
        lastTapPos=null;lastTapAt=0;
        renderBoard();
        checkSolved();
      },280);
    });

    board.appendChild(tile);
  });
}

function checkSolved(){
  if(!isSolved()||solved)return;
  solved=true;
  selected=null;
  renderBoard();
  const glow=document.getElementById('solvedGlow');
  glow.classList.remove('run');void glow.offsetWidth;glow.classList.add('run');
  setTimeout(showAnswer,420);
  announce('Assembly complete. Solve the phrase.');
}

function renderPattern(answer){
  answerPattern.innerHTML='';
  answer.split(/\s+/).forEach(word=>{
    const clean=word.replace(/[^a-zA-Z0-9]/g,'');
    const wordEl=document.createElement('span');
    wordEl.className='answer-word';
    for(let i=0;i<clean.length;i++){
      const slot=document.createElement('span');
      slot.className='letter-slot';
      wordEl.appendChild(slot);
    }
    answerPattern.appendChild(wordEl);
  });
}

function handleAnswerKey(key){
  if(key==='BACKSPACE')answerInput.value=answerInput.value.slice(0,-1);
  else if(key==='SPACE'){if(answerInput.value&&!answerInput.value.endsWith(' '))answerInput.value+=' '}
  else answerInput.value+=key.toLowerCase();
  answerFeedback.innerHTML='&nbsp;';
}

function renderKeyboard(){
  answerKeyboard.innerHTML='';
  keyRows.forEach((row,rowIndex)=>{
    const rowEl=document.createElement('div');
    rowEl.className='compact-key-row compact-key-row-'+(rowIndex+1);
    row.forEach(key=>{
      const b=document.createElement('button');
      b.type='button';
      b.className='compact-key compact-key-'+key.toLowerCase();
      b.textContent=key==='BACKSPACE'?'⌫':key==='SPACE'?'space':key;
      b.setAttribute('aria-label',key==='BACKSPACE'?'Delete previous character':key==='SPACE'?'Space':key);
      b.addEventListener('pointerdown',e=>{if(key!=='BACKSPACE')e.preventDefault()});
      b.addEventListener('click',()=>handleAnswerKey(key));
      rowEl.appendChild(b);
    });
    answerKeyboard.appendChild(rowEl);
  });
}

function showAnswer(){
  const l=levels[current];
  renderPattern(l.answer);
  renderKeyboard();
  answerPanel.hidden=false;
  answerInput.value='';
  answerFeedback.innerHTML='&nbsp;';
  answerPanel.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function submitAnswer(){
  const l=levels[current];
  const guess=normalise(answerInput.value);
  if(!guess){answerFeedback.textContent='Enter a phrase first.';return}
  const accepted=[normalise(l.answer),...(l.accepted||[]).map(normalise)];
  if(accepted.includes(guess)){
    answerFeedback.textContent='Correct!';
    state.completed[l.id]={score,moves};
    save();
    setTimeout(()=>showSolved(l),500);
  }else{
    penalties+=8;updateScore();
    answerFeedback.textContent='Not quite. Try again.';
  }
}

function showClue(){
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

function revealAnswer(){
  const l=levels[current];
  penalties+=20;updateScore();
  answerInput.value=l.answer;
  answerFeedback.textContent='Answer revealed.';
}

function showSolved(l){
  answerPanel.hidden=true;
  document.querySelector('.assembly-puzzle-card').hidden=true;
  completePanel.hidden=false;
  document.getElementById('completePhrase').textContent=l.answer;
  document.getElementById('completeCopy').textContent='Completed in '+moves+' moves.';
  document.getElementById('finalScore').textContent=score+'/100';
  document.getElementById('nextBtn').innerHTML=current===levels.length-1?'Replay chapter <span>↻</span>':'Next assembly <span>→</span>';
  completePanel.scrollIntoView({behavior:'smooth',block:'start'});
}

submitAnswerBtn.addEventListener('click',submitAnswer);
clueBtn.addEventListener('click',showClue);
revealAnswerBtn.addEventListener('click',revealAnswer);
document.getElementById('nextBtn').addEventListener('click',()=>{
  document.querySelector('.assembly-puzzle-card').hidden=false;
  if(current<levels.length-1)current++;else current=0;
  state.current=current;save();startLevel();window.scrollTo({top:0,behavior:'smooth'});
});
document.getElementById('backBtn').addEventListener('click',()=>{
  if(current>0){current--;state.current=current;save();startLevel();window.scrollTo({top:0,behavior:'smooth'})}
});

startLevel();
})();