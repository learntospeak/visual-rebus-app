import fs from 'node:fs';
import assert from 'node:assert/strict';
import {bands,modes,emptySave,normalizeSave,recordResult,nextUnplayed,dailyRounds} from '../public/games/engine.mjs';
import {symbol,describe} from '../public/games/render.mjs';
const catalog=JSON.parse(fs.readFileSync(new URL('../public/games/catalog.json',import.meta.url),'utf8'));
const ids=[];
for(const mode of modes){
 const deck=catalog[mode.id];assert.equal(deck.length,100);const fingerprints=new Set();
 for(const [i,q] of deck.entries()){
  ids.push(q.id);assert.equal(q.number,i+1);assert.equal(q.band,Math.floor(i/20));assert.ok(bands[q.band]);assert.ok(q.question&&q.explanation&&q.hint);
  assert.ok(!fingerprints.has(q.signature),'Duplicate content '+q.id);fingerprints.add(q.signature);
  if(q.options){assert.equal(new Set(q.options).size,4===q.options.length?4:q.options.length);assert.equal(q.options.filter(v=>String(v)===String(q.answer)).length,1)}
  if(q.mode==='odd'){assert.equal(q.board.length,q.size);const normal=JSON.stringify(q.board[(q.answer+1)%q.size]);assert.equal(q.board.filter(x=>JSON.stringify(x)!==normal).length,1);assert.notEqual(symbol(q.board[q.answer]),symbol(q.board[(q.answer+1)%q.size]))}
  if(q.mode==='memory'){assert.equal(q.board.length,q.rows*q.cols);assert.ok(q.studySeconds>=7);if(q.highlight>=0){const v=q.board[q.highlight];if(q.band<=2)assert.equal(q.answer,v.shape);if(q.band===3)assert.equal(q.answer,String(v.dots));if(q.band===4)assert.equal(q.answer,v.shape+' + '+q.board[(q.highlight+q.cols)%q.board.length].shape)}}
  if(q.mode==='next')assert.ok(q.sequence.length>=4);
 }
}
for(const q of catalog.next){
 const a=q.sequence.map(x=>Number(x));
 if(q.band===0&&q.sequence.every(x=>Number.isFinite(Number(x)))){const d=a[1]-a[0];assert.ok(a.every((v,i)=>!i||v-a[i-1]===d));assert.equal(Number(q.answer),a.at(-1)+d)}
 if(q.band===0&&q.sequence.some(x=>!Number.isFinite(Number(x))))assert.equal(q.answer,q.sequence[1]);
 if(q.band===1&&q.question.startsWith('Multiply')){const ratio=a[1]/a[0];assert.ok(a.every((v,i)=>!i||v/a[i-1]===ratio));assert.equal(Number(q.answer),a.at(-1)*ratio)}
 if(q.band===1&&q.question.startsWith('A three'))assert.equal(q.answer,q.sequence[2]);
 if(q.band===1&&q.question.startsWith('Each arrow')){const dirs=['↑','→','↓','←'];assert.equal(q.answer,dirs[(dirs.indexOf(q.sequence.at(-1))+1)%4])}
 if(q.band===2&&q.question.startsWith('The amount')){const dif=a.slice(1).map((v,i)=>v-a[i]);assert.ok(dif.every((v,i)=>!i||v-dif[i-1]===1));assert.equal(Number(q.answer),a.at(-1)+dif.at(-1)+1)}
 if(q.band===2&&q.question.startsWith('Odd'))assert.equal(Number(q.answer),a[3]+a[3]-a[1]);
 if(q.band===3){const nums=q.sequence.map(x=>Number(x.split(' · ')[1])),ds=nums[1]-nums[0];assert.equal(Number(q.answer.split(' · ')[1]),nums.at(-1)+ds)}
 if(q.band===4){
  const gap=q.sequence.indexOf('?'),full=q.sequence.map((v,i)=>i===gap?q.answer:v);
  if(q.question.includes('Two different increases')){const nums=full.map(Number),ds=nums.slice(1).map((v,i)=>v-nums[i]);assert.ok(ds.every((v,i)=>i<2||v===ds[i-2]));assert.notEqual(ds[0],ds[1])}
  if(q.question.includes('doubles')){const nums=full.map(Number),offset=nums[1]-2*nums[0];assert.ok(nums.every((v,i)=>!i||v===2*nums[i-1]+offset))}
  if(q.question.includes('Odd and even')){const nums=full.map(Number);for(const parity of [0,1]){const vals=nums.filter((_,i)=>i%2===parity),d=vals[1]-vals[0];assert.ok(vals.every((v,i)=>!i||v-vals[i-1]===d))}}
  if(q.question.includes('Shapes cycle')){const nums=full.map(x=>Number(x.split(' · ')[1])),dif=nums.slice(1).map((v,i)=>v-nums[i]);assert.ok(dif.every((v,i)=>!i||v-dif[i-1]===1))}
 }
 if(q.band>=3&&q.question.includes('Shapes cycle')){const shapes=['star','circle','square','triangle','diamond','arrow'],full=q.sequence.map(x=>x==='?'?q.answer:x),ss=full.map(x=>x.split(' · ')[0]);assert.ok(ss.every((x,i)=>!i||x===shapes[(shapes.indexOf(ss[i-1])+1)%6]));if(!q.missing)assert.equal(q.answer.split(' · ')[0],shapes[(shapes.indexOf(ss.at(-1))+1)%6])}
}
for(const q of catalog.odd.filter(q=>q.band===3||q.band===4&&(q.number-81)%4<2)){
 const normal=q.board[(q.answer+1)%q.size],odd=q.board[q.answer],direction=v=>((v.rot+(v.shape==='triangle'?-90:0))%360+360)%360,inside=v=>((v.innerRot%360)+360)%360;
 assert.equal(inside(normal),direction(normal),'Normal tile misaligned '+q.id);
 assert.notEqual(inside(odd),direction(odd),'Odd tile unexpectedly aligned '+q.id);
}
assert.match(describe({shape:'arrow',rot:0}),/points right/);
assert.match(describe({shape:'arrow',rot:90}),/points down/);
assert.match(describe({shape:'triangle',rot:0}),/points up/);
assert.equal(new Set(ids).size,400);
const save=emptySave();recordResult(save,ids[0],'solved',false);recordResult(save,ids[0],'revealed',true);assert.equal(save.results[ids[0]].status,'solved');assert.equal(save.results[ids[0]].hinted,false);
recordResult(save,ids[1],'missed',true);assert.equal(nextUnplayed(catalog.odd,save),2);assert.equal(normalizeSave({results:{bad:{status:'solved'},[ids[0]]:{status:'solved'}},daily:{bad:{score:99},'2026-01-01':null}},ids).results.bad,undefined);
for(let i=0;i<100;i++){const date=new Date(2026,0,1+i);const daily=dailyRounds(catalog,date);assert.equal(daily.length,4);assert.equal(new Set(daily.map(x=>x.mode)).size,4);assert.deepEqual(daily,dailyRounds(catalog,date));if(i)assert.notDeepEqual(daily,dailyRounds(catalog,new Date(2026,0,i)))}
assert.equal(new Set(Array.from({length:100},(_,i)=>dailyRounds(catalog,new Date(2026,0,1+i))[0].id)).size,100);
console.log('PASS: 400 IDs, 100 unique definitions per mode, 5 bands; visual differences, memory answers, option uniqueness, save merging, malformed saves, 100-day daily rotation.');



