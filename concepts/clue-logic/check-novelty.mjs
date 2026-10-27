// Run with: npx tsx concepts/clue-logic/check-novelty.mjs
import assert from 'node:assert/strict';
import {puzzles} from '../../src/data/puzzles.ts';
import {chapter} from './chapter.mjs';
import {normalize} from './engine.mjs';
const existing=new Map(puzzles.flatMap(p=>[p.answer,...p.acceptedAnswers].map(a=>[normalize(a),p.id])));
const collisions=chapter.scenes.flatMap(s=>[s.answer,...s.aliases].filter(a=>existing.has(normalize(a))).map(answer=>({scene:s.id,answer,existing:existing.get(normalize(answer))})));
assert.deepEqual(collisions,[],'New phrases must not duplicate the existing bank or accepted answers.');
console.log(`PASS: ${chapter.scenes.length} new phrases and their aliases checked against ${puzzles.length} existing puzzles and accepted answers.`);
