import {test} from 'node:test'
import assert from 'node:assert/strict'
import {evidence,suspects,ingredients,restoreCase,submitDeduction,newCase} from './mystery-model'
const ready=()=>({...newCase(),earned:evidence.map(e=>e.id)})
test('evidence gate blocks guesses before all five discoveries',()=>{assert.equal(submitDeduction(newCase(),'iris','sugar').state.solved,false)})
test('exactly one complete person/ingredient theory solves the case',()=>{const wins=suspects.flatMap(s=>ingredients.filter(i=>submitDeduction(ready(),s.id,i.id).state.solved).map(i=>s.id+':'+i.id));assert.deepEqual(wins,['iris:sugar'])})
test('three different failed theories lock deduction; duplicates are free',()=>{
 let state=submitDeduction(ready(),'mara','salt').state
 state=submitDeduction(state,'mara','salt').state;assert.equal(state.attempts.length,1)
 state=submitDeduction(state,'theo','salt').state;state=submitDeduction(state,'iris','salt').state
 assert.equal(state.attempts.length,3);assert.equal(submitDeduction(state,'iris','sugar').state.solved,false);assert.equal(state.earned.length,5)
})
test('case restoration validates discoveries, duplicate attempts and impossible completion',()=>{
 assert.deepEqual(restoreCase('{bad'),newCase())
 const state=restoreCase(JSON.stringify({version:1,earned:['pot','pot','bogus'],attempts:['mara:salt','mara:salt','bad'],solved:true}));assert.deepEqual(state.earned,['pot']);assert.deepEqual(state.attempts,['mara:salt']);assert.equal(state.solved,false)
 const win=submitDeduction(ready(),'iris','sugar').state;assert.deepEqual(restoreCase(JSON.stringify({version:1,...win})),win)
})
