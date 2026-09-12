import assert from 'node:assert/strict'
import { puzzles } from '../src/data/puzzles'
import { chapterRewards, newlyEarnedChapter } from '../src/services/rewards'
const ids = puzzles.map(p => p.id)
assert.equal(chapterRewards([]).filter(c => c.earned).length, 0)
assert.equal(chapterRewards(ids).filter(c => c.earned).length, 10)
for (const chapter of chapterRewards(ids)) {
 const members = puzzles.filter(p => p.chapterId === chapter.id).map(p => p.id)
 const before = members.slice(0, -1)
 assert.equal(chapterRewards(before).find(c => c.id === chapter.id)?.earned, false)
 assert.equal(newlyEarnedChapter(before, members), chapter.id)
 assert.equal(newlyEarnedChapter(members, [...members, members[0]]), null)
}
assert.equal(chapterRewards([565]).some(c => c.earned), false)
assert.equal(chapterRewards(Array(565).fill(1)).some(c => c.earned), false)
assert.equal(chapterRewards([...ids, 99999]).filter(c => c.earned).length, 10)
assert.equal(newlyEarnedChapter(ids.slice(0,-1), ids), 'chapter-10')
assert.equal(newlyEarnedChapter(ids, ids), null)
console.log('Rewards: ten chapter boundaries, legacy progress, final completion, duplicate/unknown IDs and replay checks passed.')
