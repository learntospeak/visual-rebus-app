import {chapter} from '../chapter.mjs'
import type {Puzzle} from '../../../src/types'
export const puzzle: Puzzle={id:10001,contentVersion:'clue-logic-test-1',chapterId:'clue-logic-test',chapterOrder:1,answer:'a watched pot never boils',acceptedAnswers:['watched pot never boils','the watched pot never boils'],wordPattern:'1 7 3 5 5',difficulty:'Medium',difficultyScore:4,estimatedSolveSeconds:90,format:'motion',visualTemplate:'freeform',mechanics:['sequence'],prompt:'Watch the scene. Can you picture the phrase?',elements:[],clues:['Compare the water while you watch the pot with what happens when you turn away. A correct letter is now in place.','',''],region:'Global',unlock:{requiresPuzzleIds:[]},artwork:{version:2,creator:'Clue Canvas',source:'Original Before Service scene',licence:'Original scene; Three.js MIT',kind:'project-asset'},qa:{status:'Draft',testerResults:[]}}
export type Action={type:'letter';letter:string}|{type:'phrase';answer:string}|{type:'hint';id:string}
export type Round={lives:number;letters:string[];misses:string[];hints:string[];wrongPhrases:string[];status:'playing'|'won'|'lost'}
export const SAVE_KEY='cluecanvas.clueLogic.integration.v1'

export const sceneTitles=['Before Service','A Balancing Problem','A Growing Concern','Nothing to See Here','An Expensive Shortcut','Making Matters Worse','The Little Spill']
export const playableScenes=chapter.scenes.slice(0,7)
export const puzzles: Puzzle[]=playableScenes.map((scene,index)=>({...puzzle,id:10001+index,chapterOrder:index+1,answer:scene.answer,acceptedAnswers:scene.aliases,wordPattern:scene.answer.split(' ').map(word=>word.replace(/[^a-z]/gi,'').length).join(' '),difficultyScore:[4,5,5,4,4,6,5][index],clues:[scene.hints[0].text+' A correct letter is now in place.','',''],artwork:{...puzzle.artwork,source:'Original '+sceneTitles[index]+' scene'}}))
export const sceneSaveKey=(index:number,base=SAVE_KEY)=>index===0?base:base+'.'+playableScenes[index].id
export const sceneDescriptions=[
 'The burner is lit. Water stays still while you watch the pot. When you turn away, it bubbles; when you return, it settles.',
 'Three plates rotate on thin stems. One slows and begins to wobble. A gloved hand gives it another turn, then moves to the next wobbling plate.',
 'A small mole with a pointed snout and broad digging paws scurries out of its mound twice and returns. A wizard arrives and waves a wand. A puff of smoke transforms the mound into a huge armoured knight with a three-peak crest.',
 'A broom pushes crumbs beneath the lifted edge of a woven carpet. The floor becomes tidy, but a conspicuous lump grows under the carpet.',
 'A purse tips over a sink. Gold coins tumble into the basin, circle the drain and disappear. The purse is left empty.',
 'A gardener uses a shovel at their own feet. The earth piles up around them as they sink deeper into the hole, until their hat is all that remains visible.',
 'A bottle tips over on the prep table, spilling a white puddle. The cook bows their head, raises their hands to their face and sheds tears over it. A spare full bottle stands nearby.'
]