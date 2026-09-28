import {test} from 'node:test'
import assert from 'node:assert/strict'
import {categories} from './categories'
import {playableScenes} from './model'
import {restaurantFrame} from '../restaurant-motion.mjs'
test('categories cover each standalone puzzle once without mixing unfinished scenes into restaurant play',()=>{
 const all=categories.flatMap(c=>c.scenes)
 assert.equal(new Set(all).size,all.length)
 assert.deepEqual([...all].sort(),playableScenes.map((_,i)=>i))
 assert.deepEqual(categories[0].scenes,[0,1,3,4,6])
 assert.deepEqual(categories.find(c=>c.id==='concepts')?.scenes,[5])
})
test('illustrated sequence visits every beat and returns to opening without losing final reaction',()=>{
 assert.deepEqual([0,6,12,20].map(t=>restaurantFrame(t).shot),[0,1,2,3])
 assert.equal(restaurantFrame(24).mix,0)
 assert.equal(restaurantFrame(26).next,0)
 assert.equal(restaurantFrame(26).mix,1)
 for(const t of [-1,NaN,0,4.9,10.9,17.9,25.9,100]){
  const f=restaurantFrame(t);assert.ok(f.shot>=0&&f.shot<=3);assert.ok(f.mix>=0&&f.mix<=1)
 }
 assert.equal(restaurantFrame(0,'inspect').shot,2)
 assert.equal(restaurantFrame(0,'watch').shot,3)
})
