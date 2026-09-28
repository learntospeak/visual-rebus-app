import assert from 'node:assert/strict';
import {chapter} from './chapter.mjs';
import {act,freshRound,freshProgress,normalize,isCorrect,restoreProgress} from './engine.mjs';
import {sceneSVG} from './scenes.mjs';

assert.equal(chapter.scenes.length,10);
assert.equal(new Set(chapter.scenes.map(s=>normalize(s.answer))).size,10);
for(const scene of chapter.scenes){
 let r=freshRound();
 for(const letter of new Set(normalize(scene.answer)))r=act(scene,r,{type:'letter',letter}).round;
 assert.equal(r.status,'won');assert.equal(r.lives,3);
 for(const answer of [scene.answer,...scene.aliases])assert.ok(isCorrect(scene,answer));
 r=freshRound();
 for(const h of scene.hints){
  assert.ok(normalize(scene.answer).includes(h.letter.toLowerCase()));
  const prior=r;r=act(scene,r,{type:'hint',id:h.id}).round;
  assert.equal(r.lives,prior.lives-1);assert.equal(r.letters.length,prior.letters.length+1);
  assert.deepEqual(act(scene,r,{type:'hint',id:h.id}).round,r);
 }
 assert.equal(r.lives,1);
 assert.equal(act(scene,r,{type:'phrase',answer:'a deliberately wrong answer'}).round.status,'lost');
 r=freshRound();
 const wrong=[...'abcdefghijklmnopqrstuvwxyz'].filter(c=>!normalize(scene.answer).includes(c));
 for(const letter of wrong.slice(0,3))r=act(scene,r,{type:'letter',letter}).round;
 assert.equal(r.lives,0);assert.equal(r.status,'lost');
 assert.deepEqual(act(scene,r,{type:'phrase',answer:scene.answer}).round,r);
 for(const t of [0,3,6,9,11.9])assert.ok(!/NaN|undefined/.test(sceneSVG(scene.id,t)));
}
const s=chapter.scenes[0];let r=freshRound();
r=act(s,r,{type:'letter',letter:'z'}).round;
assert.deepEqual(act(s,r,{type:'letter',letter:'Z'}).round,r);
r=act(s,r,{type:'phrase',answer:'wrong'}).round;
assert.deepEqual(act(s,r,{type:'phrase',answer:'wrong!'}).round,r);
assert.deepEqual(act(s,r,{type:'hint',id:s.hints[0].id}).round,r);
assert.deepEqual(act(s,r,{type:'phrase',answer:' '}).round,r);
const p=freshProgress();p.started=true;p.index=9;
assert.equal(restoreProgress(JSON.stringify(p),chapter).index,0);
for(const scene of chapter.scenes)p.rounds[scene.id]=act(scene,freshRound(),{type:'phrase',answer:scene.answer}).round;
assert.equal(restoreProgress(JSON.stringify(p),chapter).completed,true);
assert.deepEqual(restoreProgress('invalid',chapter),freshProgress());
console.log('PASS: all ten scenes, hints, letters, failure, aliases, persistence, finale gating and SVG frames.');
