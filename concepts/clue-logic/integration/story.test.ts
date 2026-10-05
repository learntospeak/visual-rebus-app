import {test} from 'node:test'
import assert from 'node:assert/strict'
import * as THREE from '../vendor/three.module.js'
import {populateStory} from '../story-objects.mjs'
import {playableScenes,puzzles,sceneSaveKey} from './model'
import {restoreActions} from './state'
test('seven scenes have isolated saves and consistent answer patterns',()=>{
 assert.equal(puzzles.length,7);assert.equal(new Set(puzzles.map((_,i)=>sceneSaveKey(i))).size,7)
 puzzles.forEach(p=>assert.equal(p.wordPattern.split(' ').map(Number).reduce((a,b)=>a+b,0),p.answer.replace(/[^a-z]/gi,'').length))
})
test('each new scene restores its own clue, aliases and failure state',()=>{
 for(const scene of playableScenes.slice(2)){
  const hint=scene.hints[0];const saved=(actions:unknown[])=>restoreActions(JSON.stringify({version:1,actions}),scene).round
  const r=saved([{type:'hint',id:hint.id}]);assert.equal(r.lives,2);assert.ok(r.letters.includes(hint.letter.toLowerCase()))
  for(const answer of [scene.answer,...scene.aliases])assert.equal(saved([{type:'phrase',answer}]).status,'won')
  assert.equal(saved(['z','q','x'].map(letter=>({type:'letter',letter}))).status,'lost')
 }
})
test('all five animated scenes build and remain finite through playback, alternate view and clue view',()=>{
 for(const kind of ['mountain','rug','drain','hole','milk']){
  const scene=new THREE.Scene(),mat=(c:string)=>new THREE.MeshStandardMaterial({color:c})
  const mesh=(g:any,m:any,x:number,y:number,z:number,parent:any=scene)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);parent.add(o);return o}
  const box=(w:number,h:number,d:number,m:any,x:number,y:number,z:number,p:any)=>mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,p)
  const cyl=(a:number,b:number,h:number,m:any,x:number,y:number,z:number,p:any)=>mesh(new THREE.CylinderGeometry(a,b,h,16),m,x,y,z,p)
  const tube=(points:number[][],r:number,m:any,p:any)=>mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(v=>new THREE.Vector3(...v))),20,r,8,false),m,0,0,0,p)
  const story=populateStory({scene,mesh,box,cyl,tube,mat},kind)
  if(kind==='mountain'){
   story.update(2,'auto');assert.equal(scene.getObjectByName('mole').visible,true);assert.equal(scene.getObjectByName('armoured-knight').visible,false)
   story.update(22,'auto');assert.equal(scene.getObjectByName('molehill').visible,false);assert.equal(scene.getObjectByName('armoured-knight').visible,true);assert.equal(scene.getObjectByName('paid-nameplate').visible,false)
   story.update(26,'inspect');assert.equal(scene.getObjectByName('paid-nameplate').visible,true)
   story.update(0,'auto');assert.equal(scene.getObjectByName('molehill').visible,true);assert.equal(scene.getObjectByName('paid-nameplate').visible,false)
  }
  for(const view of ['auto','away','inspect'])for(let t=0;t<=26;t+=.5){story.update(t,view);scene.traverse((o:any)=>{assert.ok([...o.position.toArray(),...o.scale.toArray(),o.rotation.x,o.rotation.y,o.rotation.z].every(Number.isFinite),kind)})}
  scene.traverse((o:any)=>{o.geometry?.dispose();o.material?.dispose()})
 }
})
