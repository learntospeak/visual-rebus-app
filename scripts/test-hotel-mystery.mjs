import assert from 'node:assert/strict';
import {freshState,act,evidenceCount,roomFrame,isAnswer} from '../public/hotel-mystery/state.js';
const initial=freshState();assert.equal(roomFrame(initial),0);assert.equal(act(initial,'liftRug').rugLifted,false);assert.equal(act(initial,'readPapers').papersRead,false);
for(const sequence of [['readBook','moveTrolley','liftRug','readPapers'],['moveTrolley','liftRug','readPapers','readBook']]){let state=freshState();for(const action of sequence)state=act(state,action);assert.equal(evidenceCount(state),2);assert.equal(roomFrame(state),2);assert.equal(roomFrame({...state,solved:true}),3)}
assert.equal(initial.trolleyMoved,false);
for(const answer of ['Sweep it under the rug','sweeping under the carpet','Swept the complaints under the rug!'])assert.equal(isAnswer(answer),true);
for(const answer of ['hidden complaints','rug','sweep','the domino effect'])assert.equal(isAnswer(answer),false);
console.log('Hotel state checks passed: prerequisites, both orders, scene frames, immutable updates and answer variants.');
