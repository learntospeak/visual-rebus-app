import {test} from 'node:test'
import assert from 'node:assert/strict'
import {storybookMotion} from '../storybook-motion.mjs'
test('painted scene has two mole excursions before the spell and knight reveal',()=>{
 assert.ok(storybookMotion(3.5).excursion>.9)
 assert.equal(storybookMotion(6).excursion,0)
 assert.ok(storybookMotion(8.5).excursion>.9)
 assert.equal(storybookMotion(12).moleVisible,false)
 assert.equal(storybookMotion(12).reveal,0)
 assert.equal(storybookMotion(22).reveal,1)
 assert.equal(storybookMotion(22).moundOpacity,0)
})
test('hint does not name the answer and replay restores initial composition',()=>{
 assert.equal(storybookMotion(26).nameplate,false)
 assert.equal(storybookMotion(26,true).nameplate,false)
 assert.equal(storybookMotion(0).moleVisible,true)
 assert.equal(storybookMotion(0).reveal,0)
 for(let t=0;t<=26;t+=.1)assert.ok(Object.values(storybookMotion(t)).every(v=>typeof v!=='number'||Number.isFinite(v)))
})
