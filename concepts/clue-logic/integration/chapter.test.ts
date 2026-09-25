import assert from 'node:assert/strict'
import {test} from 'node:test'
import {chapter} from '../chapter.mjs'
import {plateMotion,RESCUES,PLATE_DURATION} from '../plates-motion.mjs'
import {restoreActions} from './state'
import {sceneSaveKey,SAVE_KEY,puzzles} from './model'
test('next scene preserves the first save and isolates plate progress',()=>{assert.equal(sceneSaveKey(0),SAVE_KEY);assert.notEqual(sceneSaveKey(1),SAVE_KEY);assert.equal(sceneSaveKey(1,'custom'),'custom.plates')})
test('plate clue charges a life and reveals a correct letter; kitchen hint cannot leak in',()=>{const r=restoreActions(JSON.stringify({version:1,actions:[{type:'hint',id:'eyes'},{type:'hint',id:'plates'}]}),chapter.scenes[1]);assert.equal(r.round.lives,2);assert.deepEqual(r.round.hints,['plates']);assert.ok(r.round.letters.includes('p'))})
test('second scene accepts its aliases but rejects the previous answer',()=>{const win=restoreActions(JSON.stringify({version:1,actions:[{type:'phrase',answer:'spinning plates'}]}),chapter.scenes[1]);assert.equal(win.round.status,'won');const wrong=restoreActions(JSON.stringify({version:1,actions:[{type:'phrase',answer:puzzles[0].answer}]}),chapter.scenes[1]);assert.equal(wrong.round.status,'playing');assert.equal(wrong.round.lives,2)})
test('every plate approaches a near fall then steadies, with deterministic replay',()=>{for(const e of RESCUES){const before=plateMotion(e.time-.1,e.index),after=plateMotion(e.time+.1,e.index);assert.ok(before.wobble>after.wobble);assert.ok(after.spin>before.spin);assert.deepEqual(plateMotion(e.time,e.index),plateMotion(e.time,e.index));assert.ok(e.time<PLATE_DURATION)}})
