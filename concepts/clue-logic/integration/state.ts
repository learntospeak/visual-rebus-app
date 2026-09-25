import type {Action,Round} from './model'
import type {DifficultyFeedback} from '../../../src/types'
import {act,freshRound} from '../engine.mjs'
import {chapter} from '../chapter.mjs'
export function restoreActions(raw:string|null,scene=chapter.scenes[0]):{actions:Action[];round:Round;feedback?:DifficultyFeedback}{
 const result={actions:[] as Action[],round:freshRound() as Round,feedback:undefined as DifficultyFeedback|undefined}
 try{const data=JSON.parse(raw||'null');if(data?.version!==1||!Array.isArray(data.actions))return result
  for(const a of data.actions.slice(0,500)){if(!a||!['letter','phrase','hint'].includes(a.type))continue;if(a.type==='letter'&&typeof a.letter!=='string'||a.type==='phrase'&&typeof a.answer!=='string'||a.type==='hint'&&a.id!==scene.hints[0].id)continue;result.round=act(scene,result.round,a).round as Round;result.actions.push(a)}
  if(['too-easy','about-right','too-hard'].includes(data.feedback))result.feedback=data.feedback
 }catch{}return result
}
