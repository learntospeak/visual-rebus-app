(function(){
'use strict';

const KEY='cluecanvas.assemblyChapter01.prototype.v4';
const chapterTwo = new URLSearchParams(location.search).get('chapter') === '2';
const chapterLevels=[
  {id:'absence',answer:'Absence Makes the Heart Grow Fonder',accepted:['absence makes the heart grow fonder'],clues:['Notice the departing traveller and the empty chair.','She holds his portrait while a flowering heart grows towards him.','Think of a saying about affection becoming stronger while apart.'],cols:2,rows:3,aspect:2/3,rotate:.45,difficulty:'Medium',difficultyScore:5,par:12,art:'./assets/absence-makes-the-heart-grow-fonder.webp'},
  {"id": "molehill", "answer": "Make a Mountain Out of a Molehill", "accepted": ["make a mountain out of a molehill"], "clues": ["Compare the small mound beside the mole with the enormous peak.", "The person imagines something small becoming much larger.", "The saying describes exaggerating a minor problem."], "cols": 3, "rows": 2, "aspect": 1.5, "rotate": 0.5, "difficulty": "Medium", "difficultyScore": 5, "par": 12, "art": "./assets/molehill.webp"},
  {"id": "ducks", "answer": "Get Your Ducks in a Row", "accepted": ["get your ducks in a row"], "clues": ["Notice how the birds are arranged along the path.", "They are following one another in an orderly line.", "The saying means getting organised before you begin."], "cols": 4, "rows": 3, "aspect": 1.3333333333333333, "rotate": 0.5, "difficulty": "Medium", "difficultyScore": 5, "par": 24, "art": "./assets/ducks.webp"},
  {"id": "pocket", "answer": "Burn a Hole in Your Pocket", "accepted": ["burn a hole in your pocket"], "clues": ["Follow the money from receiving it to spending it.", "Notice what happens to the pocket in the middle.", "The saying describes money you feel eager to spend."], "cols": 3, "rows": 2, "aspect": 1.5, "rotate": 0.5, "difficulty": "Medium", "difficultyScore": 5, "par": 12, "art": "./assets/pocket.webp"},
  {"id": "future", "answer": "Back to the Future", "accepted": ["back to the future"], "clues": ["Compare the old town with the futuristic city.", "The vehicle is travelling through a glowing passage across time.", "Think of a film title about returning to a later time."], "cols": 4, "rows": 3, "aspect": 1.3333333333333333, "rotate": 0.5, "difficulty": "Medium", "difficultyScore": 5, "par": 24, "art": "./assets/future.webp"},
  {"id": "cooks", "answer": "Too Many Cooks Spoil the Broth", "accepted": ["too many cooks spoil the broth"], "clues": ["Compare the calm cooking at the left with the crowded pot.", "Several people add ingredients, and the result becomes a mess.", "The saying warns that too many people interfering can ruin a result."], "cols": 4, "rows": 3, "aspect": 1.3333333333333333, "rotate": 0.5, "difficulty": "Medium", "difficultyScore": 5, "par": 24, "art": "./assets/cooks.webp"},
  {id:'better-late',answer:'Better Late Than Never',accepted:['better late than never'],clues:['Notice the traveller reaching the train after the crucial moment.','The station clock makes the timing important.','Think of the saying that arriving late is still better than not arriving at all.'],cols:2,rows:4,aspect:500/1024,rotate:.45,difficulty:'Medium',difficultyScore:5,par:16,art:'./assets/better-late-than-never.webp'},
  {id:'birds-feather',answer:'Birds of a Feather Flock Together',accepted:['birds of a feather flock together'],clues:['Focus on the birds gathered closely together.','They are clustering with others like themselves.','Think of the proverb about similar kinds naturally staying together.'],cols:2,rows:4,aspect:500/1024,rotate:.45,difficulty:'Medium',difficultyScore:5,par:16,art:'./assets/birds-of-a-feather-flock-together.webp'},
  {id:'spilled-milk',answer:"Don't Cry Over Spilled Milk",accepted:["don't cry over spilled milk",'dont cry over spilled milk'],clues:['Notice the upset child and the milk already spilled on the floor.','The accident has already happened and cannot be undone.','Think of the saying about not staying upset over something already done.'],cols:2,rows:4,aspect:503/1024,rotate:.45,difficulty:'Medium',difficultyScore:5,par:16,art:'./assets/dont-cry-over-spilled-milk.webp'},
  {id:'look-before-leap',answer:'Look Before You Leap',accepted:['look before you leap'],clues:['The hiker has stopped at the edge instead of jumping immediately.','He is carefully checking the gap and where he would land.','Think of the warning about checking first before making a risky move.'],cols:3,rows:4,aspect:1122/1402,rotate:.5,difficulty:'Medium',difficultyScore:5,par:24,art:'./assets/look-before-you-leap.png'},
  {id:'pen-sword',answer:'The Pen Is Mightier Than the Sword',accepted:['the pen is mightier than the sword'],clues:['Compare which object dominates the scene.','The writing instrument is visually overpowering the weapon.','Think of the saying about ideas and words being more powerful than force.'],cols:3,rows:4,aspect:1122/1402,rotate:.55,difficulty:'Medium',difficultyScore:6,par:24,art:'./assets/the-pen-is-mightier-than-the-sword.png'},
  {id:'knowledge-power',answer:'Knowledge Is Power',accepted:['knowledge is power'],clues:['Look at what is providing energy to the room.','The books are literally powering the lights and machinery.','Think of the saying connecting learning with strength or influence.'],cols:3,rows:4,aspect:1122/1402,rotate:.55,difficulty:'Medium',difficultyScore:6,par:24,art:'./assets/knowledge-is-power.png'},
  {id:'practice-perfect',answer:'Practice Makes Perfect',accepted:['practice makes perfect'],clues:['Compare the rough early attempts with the polished final result.','Repeated work is visibly improving the craft.','Think of the saying about repetition leading to mastery.'],cols:3,rows:4,aspect:2/3,rotate:.55,difficulty:'Medium',difficultyScore:6,par:24,art:'./assets/practice-makes-perfect.png'},
  {id:'haste-waste',answer:'Haste Makes Waste',accepted:['haste makes waste'],clues:['The cook is rushing several tasks at the same time.','Her speed has caused spills, broken ingredients and ruined food.','Think of the warning that rushing creates avoidable waste.'],cols:3,rows:4,aspect:2/3,rotate:.55,difficulty:'Medium',difficultyScore:6,par:24,art:'./assets/haste-makes-waste.png'},
  {id:'great-minds',answer:'Great Minds Think Alike',accepted:['great minds think alike'],clues:['Two people have independently arrived at the same idea.','Notice how closely their designs and moments of inspiration match.','Think of the saying used when two people have the same thought.'],cols:3,rows:4,aspect:2/3,rotate:.55,difficulty:'Medium',difficultyScore:6,par:24,art:'./assets/great-minds-think-alike.png'}
];
const levels=chapterLevels;

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
  ['Z','X','C','V','B','N','M']
];

let state=load();
const requestedLevel=levels.findIndex(level=>level.id===new URLSearchParams(location.search).get('puzzle'));
let current=requestedLevel>=0?requestedLevel:Math.max(0,Math.min(state.current||0,levels.length-1));
let pieces=[],selected=null,moves=0,solved=false,clueCount=0,score=100,penalties=0;
let usedLetters=new Set();
let completing=false,completionTimer=null,unlockTimer=null;
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

function setAnswerEnabled(enabled){
  answerInput.disabled=!enabled;
  submitAnswerBtn.disabled=!enabled;
  clueBtn.disabled=!enabled || clueCount>=levels[current].clues.length;
  revealAnswerBtn.disabled=!enabled;
  answerKeyboard.classList.toggle('is-disabled',!enabled);
  answerKeyboard.querySelectorAll('button').forEach(button=>button.disabled=!enabled||usedLetters.has(button.textContent.toLowerCase()));
  answerPanel.classList.toggle('is-locked',!enabled);
}

function renderHeader(){
  const l=levels[current];
  const tints=['rgba(44,177,166,.045)','rgba(255,107,95,.035)','rgba(242,201,76,.04)','rgba(77,150,255,.035)','rgba(155,93,229,.03)'];
  document.documentElement.style.setProperty('--assembly-tint',tints[current%tints.length]);
  document.getElementById('levelHeader').textContent='ASSEMBLY '+(current+1)+' OF '+levels.length;
  document.getElementById('headerProgress').style.width=((current+1)/levels.length*100)+'%';
  const badge=document.getElementById('difficultyBadge');
  badge.textContent=l.difficulty+' · '+l.difficultyScore+'/10';
  badge.className='difficulty difficulty-'+l.difficulty.toLowerCase();
}

function fitBoard(){
  const frame=board.parentElement;
  const width=Math.min(frame.clientWidth,frame.clientHeight*levels[current].aspect);
  if(width>0){board.style.width=width+'px';board.style.height=(width/levels[current].aspect)+'px'}
}
if(typeof ResizeObserver!=='undefined')new ResizeObserver(fitBoard).observe(board.parentElement);
window.addEventListener('resize',fitBoard);

function startLevel(){
  if(completionTimer)clearTimeout(completionTimer);
  if(unlockTimer)clearTimeout(unlockTimer);
  completionTimer=null;unlockTimer=null;completing=false;
  document.querySelector('.assembly-puzzle-card').hidden=false;
  if(tapTimer){clearTimeout(tapTimer);tapTimer=null}
  lastTapPos=null;lastTapAt=0;
  const l=levels[current];
  pieces=newPieces(l);selected=null;moves=0;solved=false;clueCount=0;score=100;penalties=0;

  board.style.gridTemplateColumns='repeat('+l.cols+',1fr)';
  board.style.gridTemplateRows='repeat('+l.rows+',1fr)';
  board.style.aspectRatio=String(l.aspect);
  fitBoard();

  answerPanel.hidden=false;
  completePanel.hidden=true;
  usedLetters=new Set();
  answerInput.value='';
  answerFeedback.innerHTML='&nbsp;';
  cluePanel.hidden=true;
  cluePanel.textContent='';
  revealPanel.hidden=true;
  clueBtn.textContent='Clue 1';

  renderHeader();
  renderPattern(l.answer);
  renderKeyboard();
  updatePatternLetters();
  setAnswerEnabled(false);
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
        piece.rot=(piece.rot+90)%360;
        selected=null;lastTapPos=null;lastTapAt=0;
        moves++;applyMovePenalty(l);
        announce('Piece rotated 90 degrees');
      }else if(selected!==null&&selected!==pos){
        [pieces[selected],pieces[pos]]=[pieces[pos],pieces[selected]];
        selected=null;lastTapPos=null;lastTapAt=0;
        moves++;applyMovePenalty(l);
      }else{
        selected=selected===pos?null:pos;
        lastTapPos=pos;lastTapAt=now;
      }
      renderBoard();checkSolved();
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
  unlockTimer=setTimeout(()=>{
    setAnswerEnabled(true);
    answerFeedback.textContent='Picture complete — solve the phrase.';
    answerPanel.scrollIntoView({behavior:'smooth',block:'nearest'});
  },420);
  announce('Assembly complete. Solve the phrase.');
}

function renderPattern(answer){
  answerPattern.innerHTML='';
  answer.split(/\s+/).forEach(word=>{
    const wordEl=document.createElement('span');
    wordEl.className='answer-word';
    for(const character of word){
      const slot=document.createElement('span');
      if(/[a-z]/i.test(character)){
        slot.className='letter-slot';
        slot.dataset.letter=character.toLowerCase();
        const letter=document.createElement('span');
        letter.className='locked-letter';
        slot.appendChild(letter);
      }else{slot.className='answer-punctuation';slot.textContent=character}
      wordEl.appendChild(slot);
    }
    answerPattern.appendChild(wordEl);
  });
  updatePatternLetters();
}

function updatePatternLetters(){
  answerPattern.querySelectorAll('.letter-slot').forEach(slot=>{
    const matched=usedLetters.has(slot.dataset.letter);
    slot.querySelector('.locked-letter').textContent=matched?slot.dataset.letter.toUpperCase():'';
    slot.classList.toggle('is-locked',matched);
  });
  answerInput.value=Array.from(levels[current].answer).map(c=>!/[a-z]/i.test(c)?c:usedLetters.has(c.toLowerCase())?c.toUpperCase():' ').join('');
  answerKeyboard.querySelectorAll('button').forEach(b=>b.disabled=!solved||usedLetters.has(b.textContent.toLowerCase()));
}

function handleAnswerKey(key){
  if(!solved||completing||completePanel.hidden===false||!/^[a-z]$/i.test(key))return;
  const letter=key.toLowerCase();
  if(usedLetters.has(letter))return;
  usedLetters.add(letter);
  answerFeedback.textContent=levels[current].answer.toLowerCase().includes(letter)?'':'That letter is not in the phrase.';
  updatePatternLetters();
  if(Array.from(levels[current].answer.toLowerCase()).every(c=>!/[a-z]/.test(c)||usedLetters.has(c)))submitAnswer();
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
  usedLetters=new Set();
  answerInput.value='';
  answerFeedback.innerHTML='&nbsp;';
  setAnswerEnabled(true);
}

function submitAnswer(){
  if(completing)return;
  const l=levels[current];
  const guess=normalise(answerInput.value);
  if(!solved)return;
  if(!Array.from(l.answer.toLowerCase()).every(c=>!/[a-z]/.test(c)||usedLetters.has(c))){answerFeedback.textContent='Keep choosing letters to complete the phrase.';return}
  const accepted=[normalise(l.answer),...(l.accepted||[]).map(normalise)];
  if(accepted.includes(guess)){
    completing=true;
    submitAnswerBtn.disabled=true;
    answerFeedback.textContent='Correct!';
    state.completed[l.id]={score,moves};
    save();
    completionTimer=setTimeout(()=>showSolved(l),500);
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
  usedLetters=new Set(l.answer.toLowerCase().replace(/[^a-z]/g,''));
  updatePatternLetters();
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

document.addEventListener('keydown',event=>{if(!event.ctrlKey&&!event.metaKey&&!event.altKey&&/^[a-z]$/i.test(event.key)){event.preventDefault();handleAnswerKey(event.key)}});

submitAnswerBtn.addEventListener('click',submitAnswer);
clueBtn.addEventListener('click',showClue);
revealAnswerBtn.addEventListener('click',revealAnswer);
document.getElementById('nextBtn').addEventListener('click',()=>{
  document.querySelector('.assembly-puzzle-card').hidden=false;
  if(current<levels.length-1)current++;else current=0;
  state.current=current;save();startLevel();window.scrollTo({top:0,behavior:'smooth'});
});
document.getElementById('backBtn').addEventListener('click',()=>{
  if(chapterTwo){location.href=new URL('../../?chapters=2',location.href).href;return}
  if(current>0){current--;state.current=current;save();startLevel();window.scrollTo({top:0,behavior:'smooth'})}
});

if(chapterTwo)document.getElementById('backBtn').setAttribute('aria-label','Return to Chapter 2');
startLevel();
})();
