import assert from 'node:assert/strict'
import {test} from 'node:test'
import {restoreActions} from './state'
import {SAVE_KEY} from './model'
const restore=(actions:unknown[],extra={})=>restoreActions(JSON.stringify({version:1,actions,...extra}))
test('saved hints and guesses restore exactly, duplicates cost nothing',()=>{
 const {round}=restore([{type:'hint',id:'eyes'},{type:'hint',id:'eyes'},{type:'letter',letter:'z'},{type:'letter',letter:'z'},{type:'letter',letter:'a'}])
 assert.equal(round.lives,1);assert.deepEqual(round.hints,['eyes']);assert.deepEqual(round.misses,['z']);assert.ok(round.letters.includes('a'));assert.equal(round.status,'playing')
})
test('third incorrect guess ends the scene and later answers cannot bypass failure',()=>{
 const {round}=restore([{type:'letter',letter:'z'},{type:'letter',letter:'x'},{type:'letter',letter:'q'},{type:'phrase',answer:'a watched pot never boils'}])
 assert.equal(round.status,'lost');assert.equal(round.lives,0)
})
test('a correct phrase restores a win without replaying completion callbacks',()=>{
 const {round}=restore([{type:'phrase',answer:'A watched pot never boils!'}]);assert.equal(round.status,'won');assert.equal(round.lives,3)
})
test('corrupt saves cannot supply fabricated lives or completion',()=>{
 assert.equal(restoreActions('{broken').round.status,'playing')
 const {round,feedback}=restore([null,{type:'hint',id:'unknown'},{type:'letter',letter:7}],{round:{lives:100,status:'won'},feedback:'invalid'})
 assert.equal(round.lives,3);assert.equal(round.status,'playing');assert.equal(feedback,undefined)
 assert.match(SAVE_KEY,/^cluecanvas\.clueLogic\.integration\./)
})
