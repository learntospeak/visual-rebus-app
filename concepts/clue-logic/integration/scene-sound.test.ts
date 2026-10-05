import {test} from 'node:test'
import assert from 'node:assert/strict'
import {soundMix,shouldKnock,type SoundState} from './scene-sound'
const state=(time:number,view:SoundState['view']='auto',active=true):SoundState=>({time,view,active,playing:true})
test('boiling follows the same look-away window as the visual water',()=>{assert.equal(soundMix(state(9)).boil,0);assert.ok(soundMix(state(9.01)).boil>0);assert.ok(soundMix(state(18.19)).boil>0);assert.equal(soundMix(state(18.2)).boil,0)})
test('manual views build and settle the boiling while the stove continues',()=>{assert.ok(soundMix(state(22,'away')).boil>0);assert.ok(soundMix(state(22,'inspect')).boil>0);assert.equal(soundMix(state(22,'watch')).boil,0);assert.ok(soundMix(state(22,'watch')).flame>0)})
test('pause, hidden tab and exit mute both continuous layers',()=>{assert.deepEqual(soundMix(state(12,'away',false)),{flame:0,boil:0})})
test('knock triggers once at the doorway cue and never on a seek or paused view',()=>{assert.equal(shouldKnock(7.69,state(7.72),false),true);assert.equal(shouldKnock(7.69,state(7.72),true),false);assert.equal(shouldKnock(0,state(12),false),false);assert.equal(shouldKnock(7.69,{...state(7.72),playing:false},false),false);assert.equal(shouldKnock(7.69,state(7.72,'away'),false),false)})
