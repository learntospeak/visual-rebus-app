import assert from 'node:assert/strict';
import { trace, acceptPhrase } from '../public/build-the-clue/engine.js';
const correct={A:{type:'straight',rotation:0},B:{type:'bridge',rotation:1},C:{type:'corner',rotation:2}};
assert.equal(trace(correct).won,true);
assert.equal(trace({}).reason,'gap');
for(const key of ['A','B','C']){const wrong=structuredClone(correct);delete wrong[key];assert.equal(trace(wrong).won,false)}
for(const [key,type,rotation,reason] of [['A','straight',1,'direction'],['B','straight',1,'water'],['C','corner',0,'direction']]){const wrong=structuredClone(correct);wrong[key]={type,rotation};assert.equal(trace(wrong).reason,reason)}
const permutations=[['straight','bridge','corner'],['straight','corner','bridge'],['bridge','straight','corner'],['bridge','corner','straight'],['corner','straight','bridge'],['corner','bridge','straight']];
let wins=0;
for(const [a,b,c] of permutations)for(let x=0;x<4;x++)for(let y=0;y<4;y++)for(let z=0;z<4;z++){
 const result=trace({A:{type:a,rotation:x},B:{type:b,rotation:y},C:{type:c,rotation:z}});
 assert.ok(result.steps.length<=30);
 if(result.won){wins++;assert.equal(a,'straight');assert.equal(b,'bridge');assert.equal(c,'corner')}
}
assert.equal(wins,4); // Same solution under straight/bridge half-turn symmetry.
assert.equal(acceptPhrase(' The DOMINO effect! '),true);
assert.equal(acceptPhrase('a domino effect'),true);
assert.equal(acceptPhrase('chain reaction'),false);
console.log('Build the Clue: 384 arrangements verified, 4 symmetric solutions; failure types and phrase acceptance passed.');
