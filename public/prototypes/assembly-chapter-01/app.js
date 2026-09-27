(function(){
'use strict';

const KEY='cluecanvas.assemblyChapter01.v1';
const board=document.getElementById('board');
const guide=document.getElementById('guide');
const live=document.getElementById('live');
const levelStrip=document.getElementById('levelStrip');
const answerPanel=document.getElementById('answerPanel');
const answerGrid=document.getElementById('answerGrid');
const answerFeedback=document.getElementById('answerFeedback');
const completePanel=document.getElementById('completePanel');

function svgUrl(svg){return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg)}
function announce(t){live.textContent='';setTimeout(()=>live.textContent=t,20)}

const art={
stranded:svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
<defs>
 <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#98c7dd"/><stop offset=".7" stop-color="#e8d2ad"/></linearGradient>
 <linearGradient id="sea" x2="0" y2="1"><stop stop-color="#3f879a"/><stop offset="1" stop-color="#174b61"/></linearGradient>
 <linearGradient id="sand" x2="1" y2="1"><stop stop-color="#e6cc91"/><stop offset="1" stop-color="#c49b5f"/></linearGradient>
 <filter id="shadow"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-opacity=".25"/></filter>
</defs>
<rect width="900" height="600" fill="url(#sky)"/>
<circle cx="735" cy="105" r="62" fill="#fff1bd" opacity=".95"/>
<path d="M0 320 C170 290 290 335 440 312 C580 292 720 270 900 305 V600 H0Z" fill="url(#sea)"/>
<path d="M450 332 C580 313 690 330 900 286 V600 H520 C545 520 520 430 450 332Z" fill="url(#sand)"/>
<path d="M0 390 Q140 355 280 390 T560 390" fill="none" stroke="#d5f0ee" stroke-width="13" opacity=".7"/>
<path d="M535 390 C610 335 710 343 770 396 C704 449 609 447 535 390Z" fill="#e45c47" filter="url(#shadow)"/>
<circle cx="700" cy="376" r="8" fill="#172d39"/>
<path d="M535 390 L482 348 L492 432Z" fill="#b84236"/>
<path d="M645 350 Q670 320 697 348" fill="none" stroke="#f2ad6b" stroke-width="12" stroke-linecap="round"/>
<ellipse cx="642" cy="465" rx="112" ry="22" fill="#7a654a" opacity=".2"/>
<path d="M315 330 C350 275 414 260 470 292" fill="none" stroke="#f6ead0" stroke-width="8" stroke-linecap="round"/>
<path d="M333 318 C345 250 398 215 444 210 C435 260 399 304 333 318Z" fill="#5ea5b6"/>
<circle cx="405" cy="235" r="6" fill="#17394a"/>
</svg>`),
tempest:svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
<defs>
 <radialGradient id="bg" cx=".5" cy=".3"><stop stop-color="#31485a"/><stop offset="1" stop-color="#111e29"/></radialGradient>
 <linearGradient id="cup" x2="0" y2="1"><stop stop-color="#f8efe0"/><stop offset="1" stop-color="#cdbb9e"/></linearGradient>
 <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="900" height="900" fill="url(#bg)"/>
<circle cx="130" cy="120" r="2" fill="#d9e5ea"/><circle cx="790" cy="180" r="3" fill="#d9e5ea"/><circle cx="720" cy="90" r="2" fill="#d9e5ea"/>
<ellipse cx="450" cy="670" rx="270" ry="72" fill="#09131b" opacity=".55"/>
<path d="M265 445 Q450 390 635 445 L590 690 Q450 755 310 690Z" fill="url(#cup)" stroke="#a89575" stroke-width="10"/>
<path d="M625 480 C785 450 808 630 660 650 C720 595 718 520 625 532Z" fill="none" stroke="#d4c3a5" stroke-width="28"/>
<ellipse cx="450" cy="448" rx="188" ry="54" fill="#8b5638"/><ellipse cx="450" cy="442" rx="168" ry="42" fill="#392118"/>
<g filter="url(#glow)">
 <path d="M320 330 C328 258 395 236 446 268 C480 205 590 220 598 302 C670 304 690 393 627 425 H318 C257 403 260 339 320 330Z" fill="#6e7f88"/>
 <path d="M345 415 l-34 82 56-34 -18 92 90-123 -58 28 21-45Z" fill="#f5d25f"/>
 <path d="M525 414 l-26 62 43-25 -12 71 66-102 -42 23 13-29Z" fill="#e9f5ff"/>
</g>
<path d="M285 385 C248 415 240 445 260 482" fill="none" stroke="#8fd0df" stroke-width="7" stroke-linecap="round"/>
<path d="M620 380 C672 412 690 445 674 486" fill="none" stroke="#8fd0df" stroke-width="7" stroke-linecap="round"/>
</svg>`),
needle:svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="750" viewBox="0 0 1000 750">
<defs>
 <linearGradient id="sun" x2="0" y2="1"><stop stop-color="#f1dca4"/><stop offset="1" stop-color="#b96f42"/></linearGradient>
 <linearGradient id="hay" x2="1" y2="1"><stop stop-color="#e1b84c"/><stop offset=".55" stop-color="#b97b24"/><stop offset="1" stop-color="#78481c"/></linearGradient>
 <linearGradient id="steel" x2="1"><stop stop-color="#89959d"/><stop offset=".5" stop-color="#f3f6f7"/><stop offset="1" stop-color="#657079"/></linearGradient>
 <filter id="s"><feDropShadow dx="0" dy="7" stdDeviation="6" flood-opacity=".28"/></filter>
</defs>
<rect width="1000" height="750" fill="url(#sun)"/>
<rect x="55" y="205" width="255" height="260" rx="8" fill="#7d332d"/><polygon points="35,220 182,105 330,220" fill="#4a2626"/><rect x="130" y="325" width="105" height="140" fill="#241b1a"/>
<path d="M0 520 C195 410 410 438 578 500 C735 560 850 473 1000 455 V750 H0Z" fill="url(#hay)"/>
<g stroke="#e7c65f" stroke-width="6" stroke-linecap="round" opacity=".75">
<path d="M90 700 l110-160"/><path d="M180 735 l50-190"/><path d="M275 730 l-20-220"/><path d="M360 720 l75-210"/><path d="M450 735 l-35-180"/><path d="M545 715 l80-175"/><path d="M655 730 l-10-205"/><path d="M760 720 l75-180"/><path d="M855 735 l-5-210"/>
</g>
<g transform="rotate(-18 635 540)" filter="url(#s)">
 <rect x="505" y="530" width="260" height="14" rx="7" fill="url(#steel)"/>
 <path d="M765 530 l36 7 -36 7Z" fill="#e9eef0"/>
 <ellipse cx="515" cy="537" rx="14" ry="9" fill="none" stroke="#5f6a72" stroke-width="6"/>
</g>
<circle cx="628" cy="537" r="48" fill="none" stroke="#fff7d9" stroke-width="4" opacity=".2"/>
</svg>`),
castle:svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
<defs>
 <linearGradient id="sky" x2="0" y2="1"><stop stop-color="#88b7d3"/><stop offset=".55" stop-color="#d2dce2"/><stop offset="1" stop-color="#f1cda1"/></linearGradient>
 <linearGradient id="stone" x2="0" y2="1"><stop stop-color="#e5dbca"/><stop offset="1" stop-color="#9e8f7d"/></linearGradient>
 <filter id="ds"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-opacity=".28"/></filter>
</defs>
<rect width="800" height="800" fill="url(#sky)"/>
<g fill="#fff" opacity=".82"><ellipse cx="170" cy="215" rx="130" ry="55"/><ellipse cx="625" cy="180" rx="150" ry="62"/><ellipse cx="390" cy="615" rx="235" ry="82"/></g>
<g filter="url(#ds)">
<path d="M220 520 L575 520 L535 635 L270 635Z" fill="#67564d"/>
<rect x="270" y="302" width="260" height="230" fill="url(#stone)"/>
<rect x="225" y="260" width="105" height="270" fill="#cbbdab"/><rect x="470" y="260" width="105" height="270" fill="#cbbdab"/>
<g fill="#8e7c6c"><rect x="215" y="240" width="125" height="38"/><rect x="460" y="240" width="125" height="38"/><rect x="260" y="288" width="280" height="35"/></g>
<g fill="#674b47"><polygon points="210,240 278,155 345,240"/><polygon points="455,240 522,145 590,240"/><polygon points="280,288 400,182 520,288"/></g>
<rect x="365" y="410" width="70" height="122" rx="35" fill="#273b46"/><g fill="#304d59"><rect x="290" y="335" width="32" height="48" rx="16"/><rect x="478" y="335" width="32" height="48" rx="16"/></g>
</g>
<path d="M385 645 C370 692 345 725 305 770" fill="none" stroke="#897968" stroke-width="12" stroke-linecap="round" opacity=".5"/>
<path d="M420 645 C438 690 470 726 520 765" fill="none" stroke="#897968" stroke-width="12" stroke-linecap="round" opacity=".5"/>
</svg>`),
tunnel:svgUrl(`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="800" viewBox="0 0 1000 800">
<defs>
 <radialGradient id="light" cx=".5" cy=".48" r=".68"><stop stop-color="#fffbd2"/><stop offset=".18" stop-color="#f2d77b"/><stop offset=".36" stop-color="#738e86"/><stop offset=".7" stop-color="#27333a"/><stop offset="1" stop-color="#0a1117"/></radialGradient>
 <linearGradient id="road" x2="0" y2="1"><stop stop-color="#596168"/><stop offset="1" stop-color="#151d22"/></linearGradient>
</defs>
<rect width="1000" height="800" fill="#081017"/>
<ellipse cx="500" cy="390" rx="435" ry="330" fill="url(#light)"/>
<ellipse cx="500" cy="390" rx="235" ry="185" fill="#d9d59d" opacity=".55"/>
<ellipse cx="500" cy="390" rx="118" ry="88" fill="#fffbd0"/>
<path d="M420 800 L474 475 L526 475 L595 800Z" fill="url(#road)"/>
<path d="M500 800 L500 680" stroke="#e7d98d" stroke-width="8" stroke-dasharray="28 24" opacity=".75"/>
<path d="M0 0 H1000 V800 H0 Z M500 390 m-435 0 a435 330 0 1 0 870 0 a435 330 0 1 0 -870 0" fill="#050a0e" opacity=".72" fill-rule="evenodd"/>
<path d="M150 95 Q500 -20 850 95" fill="none" stroke="#263139" stroke-width="65" opacity=".8"/>
<path d="M85 540 Q500 705 915 540" fill="none" stroke="#1a252c" stroke-width="90" opacity=".9"/>
</svg>`)
};

const levels=[
 {id:'stranded',name:'Stranded',answer:'Fish Out of Water',choices:['Fish Out of Water','Plenty of Fish','Cold Fish','Big Fish'],cols:3,rows:2,rotate:0,guide:'strong',difficulty:'Easy',copy:'The shore, waterline and stranded fish form the phrase.',art:art.stranded},
 {id:'tempest',name:'Tempest',answer:'A Storm in a Teacup',choices:['A Storm in a Teacup','Cloud Nine','Tempest in a Bottle','Rain Check'],cols:3,rows:3,rotate:0,guide:'faint',difficulty:'Easy+',copy:'The entire storm is contained inside one teacup.',art:art.tempest},
 {id:'needle',name:'Hidden Point',answer:'Needle in a Haystack',choices:['Needle in a Haystack','Make Hay','Sharp as a Tack','Straw Man'],cols:4,rows:3,rotate:.34,guide:'faint',difficulty:'Medium',copy:'The small silver needle disappears into a field of hay.',art:art.needle},
 {id:'castle',name:'Sky Keep',answer:'Castle in the Air',choices:['Castle in the Air','King of the Hill','Cloud Castle','High and Mighty'],cols:4,rows:4,rotate:.5,guide:'none',difficulty:'Medium+',copy:'The castle has no ground beneath it — it is literally in the air.',art:art.castle},
 {id:'tunnel',name:'Last Glow',answer:'Light at the End of the Tunnel',choices:['Light at the End of the Tunnel','A Long Road Ahead','Tunnel Vision','Bright Side'],cols:5,rows:4,rotate:1,guide:'none',difficulty:'Hard',copy:'The only bright point sits beyond the dark tunnel.',art:art.tunnel}
];

let state=load();
let current=Math.min(state.current,levels.length-1);
let pieces=[],selected=null,moves=0,guideVisible=false,solved=false;

function defaultState(){return{current:0,completed:{}}}
function load(){try{return Object.assign(defaultState(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return defaultState()}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function randShuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}

function rotationFor(level,index){
  if(!level.rotate)return 0;
  if(level.rotate<1 && Math.random()>level.rotate)return 0;
  const options=[90,180,270];
  return options[Math.floor(Math.random()*options.length)];
}
function newPieces(level){
  const arr=Array.from({length:level.cols*level.rows},(_,id)=>({id,rot:rotationFor(level,id)}));
  do{randShuffle(arr)}while(arr.every((p,i)=>p.id===i&&p.rot===0));
  return arr;
}
function placedCount(){return pieces.filter((p,i)=>p.id===i&&p.rot%360===0).length}
function isSolved(){return placedCount()===pieces.length}

function renderLevelStrip(){
  levelStrip.innerHTML='';
  levels.forEach((lvl,i)=>{
    const b=document.createElement('button');b.type='button';b.className='ac-level-dot';
    const done=!!state.completed[lvl.id], unlocked=i===0||!!state.completed[levels[i-1].id]||done;
    if(i===current)b.classList.add('is-current');
    if(done)b.classList.add('is-done');
    if(!unlocked)b.classList.add('is-locked');
    b.disabled=!unlocked;
    b.innerHTML='<b>'+(done?'✓':i+1)+'</b><small>'+lvl.cols+'×'+lvl.rows+'</small>';
    b.addEventListener('click',()=>{if(unlocked){current=i;state.current=i;save();startLevel()}});
    levelStrip.appendChild(b);
  });
}
function startLevel(){
  const l=levels[current];
  pieces=newPieces(l);selected=null;moves=0;solved=false;guideVisible=l.guide==='strong';
  document.getElementById('levelMeta').textContent='Level '+(current+1)+' · '+pieces.length+' pieces';
  document.getElementById('levelTitle').textContent=l.name;
  document.getElementById('difficultyBadge').textContent=l.difficulty;
  answerPanel.hidden=true;completePanel.hidden=true;answerFeedback.textContent='';
  board.style.gridTemplateColumns='repeat('+l.cols+',1fr)';
  board.style.aspectRatio=l.cols+' / '+l.rows;
  guide.style.backgroundImage='url("'+l.art+'")';
  guide.classList.toggle('is-hidden',!guideVisible);
  document.getElementById('hintBtn').textContent=guideVisible?'Hide guide':'Show guide';
  document.getElementById('rotateHint').hidden=!l.rotate;
  renderBoard();renderLevelStrip();renderMaster();
}
function renderBoard(){
  const l=levels[current];
  board.innerHTML='';
  pieces.forEach((piece,pos)=>{
    const x=piece.id%l.cols,y=Math.floor(piece.id/l.cols);
    const tile=document.createElement('button');
    tile.type='button';tile.className='ac-piece';
    if(selected===pos)tile.classList.add('is-selected');
    if(piece.id===pos&&piece.rot%360===0)tile.classList.add('is-correct');
    tile.setAttribute('aria-label','Piece '+(pos+1));
    const artDiv=document.createElement('span');artDiv.className='ac-piece-art';
    artDiv.style.backgroundImage='url("'+l.art+'")';
    artDiv.style.backgroundSize=(l.cols*100)+'% '+(l.rows*100)+'%';
    artDiv.style.backgroundPosition=(l.cols===1?0:(x/(l.cols-1)*100))+'% '+(l.rows===1?0:(y/(l.rows-1)*100))+'%';
    artDiv.style.transform='rotate('+piece.rot+'deg)';
    tile.appendChild(artDiv);
    tile.addEventListener('click',()=>{
      if(solved)return;
      if(selected===null){
        selected=pos;
      }else if(selected===pos){
        if(l.rotate){
          piece.rot=(piece.rot+90)%360;
          moves++;
        }else{
          selected=null;
        }
      }else{
        [pieces[selected],pieces[pos]]=[pieces[pos],pieces[selected]];
        selected=null;
        moves++;
      }
      renderBoard();checkSolved();
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
  setTimeout(showAnswers,450);announce('Picture complete. Now solve the phrase.');
}
function showAnswers(){
  const l=levels[current];answerGrid.innerHTML='';answerPanel.hidden=false;
  l.choices.slice().sort(()=>Math.random()-.5).forEach(choice=>{
    const b=document.createElement('button');b.type='button';b.className='ac-answer';b.textContent=choice;
    b.addEventListener('click',()=>{
      if(choice===l.answer){
        b.classList.add('is-right');answerFeedback.textContent='Correct.';
        setTimeout(()=>completeLevel(l),350);
      }else{
        b.classList.remove('is-wrong');void b.offsetWidth;b.classList.add('is-wrong');
        answerFeedback.textContent='Not quite. Read the finished picture as a phrase.';
      }
    });
    answerGrid.appendChild(b);
  });
}
function completeLevel(l){
  state.completed[l.id]=true;save();
  answerPanel.hidden=true;completePanel.hidden=false;
  document.getElementById('completePhrase').textContent=l.answer;
  document.getElementById('completeCopy').textContent=l.copy;
  document.getElementById('nextBtn').textContent=current===levels.length-1?'View chapter board':'Next puzzle';
  renderLevelStrip();renderMaster();
}
function renderMaster(){
  const grid=document.getElementById('masterGrid');grid.innerHTML='';
  let count=0;
  levels.forEach((l,i)=>{
    const slot=document.createElement('div');slot.className='ac-master-slot';slot.dataset.n=i+1;
    if(state.completed[l.id]){count++;slot.classList.add('is-earned');const img=document.createElement('img');img.src=l.art;img.alt='Completed fragment '+(i+1);slot.appendChild(img)}
    grid.appendChild(slot);
  });
  document.getElementById('masterCount').textContent=count+' / 5';
  const note=document.getElementById('masterNote');
  note.textContent=count===5?'Chapter board complete. Next iteration: these five earned panels become the pieces of a larger master assembly.':'Complete the five assemblies to reveal the full chapter board.';
}
document.getElementById('hintBtn').addEventListener('click',()=>{guideVisible=!guideVisible;guide.classList.toggle('is-hidden',!guideVisible);document.getElementById('hintBtn').textContent=guideVisible?'Hide guide':'Show guide'});
document.getElementById('shuffleBtn').addEventListener('click',()=>{if(solved)return;pieces=newPieces(levels[current]);selected=null;moves++;renderBoard()});
document.getElementById('nextBtn').addEventListener('click',()=>{if(current<levels.length-1){current++;state.current=current;save();startLevel()}else{document.querySelector('.ac-master').scrollIntoView({behavior:'smooth',block:'start'})}});
document.getElementById('resetAll').addEventListener('click',()=>{if(confirm('Reset all Assembly Chapter progress?')){localStorage.removeItem(KEY);state=defaultState();current=0;startLevel()}});

startLevel();
})();