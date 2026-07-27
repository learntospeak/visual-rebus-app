import type { MechanicTag, Puzzle } from '../types'

type StarterPuzzleDraft = Omit<
  Puzzle,
  | 'contentVersion'
  | 'chapterId'
  | 'chapterOrder'
  | 'difficultyScore'
  | 'estimatedSolveSeconds'
  | 'mechanics'
  | 'visualTemplate'
  | 'assetKey'
  | 'unlock'
  | 'artwork'
  | 'qa'
>

const difficultyScores: Record<number, number> = {
  1: 1, 2: 2, 3: 1, 4: 2, 5: 3, 6: 1, 7: 4, 8: 3, 9: 5, 10: 2,
  11: 2, 12: 2, 13: 2, 14: 1, 15: 2, 16: 1, 17: 4, 18: 4, 19: 1, 20: 2,
  21: 3, 22: 4, 23: 2, 24: 5, 25: 6,
  26: 3, 27: 2, 28: 2, 29: 2, 30: 2, 31: 3, 32: 2, 33: 3, 34: 3, 35: 3,
  36: 1, 37: 4, 38: 2, 39: 4, 40: 3, 41: 3, 42: 2, 43: 3, 44: 3, 45: 3,
  46: 2, 47: 3, 48: 4, 49: 5, 50: 3, 51: 4, 52: 1, 53: 2, 54: 1, 55: 2,
  56: 3, 57: 3, 58: 2, 59: 3, 60: 4, 61: 4, 62: 5, 63: 4, 64: 5, 65: 3,
}

const mechanicTags: Record<number, MechanicTag[]> = {
  1: ['above-below'],
  2: ['rotation', 'repetition'],
  3: ['split'],
  4: ['inside-outside'],
  5: ['between'],
  6: ['text-image', 'split'],
  7: ['text-image', 'scale'],
  8: ['reversal'],
  9: ['scale', 'missing-letter', 'sound-alike'],
  10: ['above-below', 'sound-alike'],
  11: ['inside-outside', 'colour'],
  12: ['direction'],
  13: ['text-image', 'count', 'direction'],
  14: ['scale'],
  15: ['inside-outside'],
  16: ['rotation'],
  17: ['split', 'inside-outside'],
  18: ['sequence'],
  19: ['above-below'],
  20: ['text-image', 'count'],
  21: ['text-image', 'above-below'],
  22: ['direction', 'sequence'],
  23: ['text-image', 'direction'],
  24: ['split'],
  25: ['inside-outside'],
  26: ['sequence', 'text-image'], 27: ['text-image', 'direction'], 28: ['text-image', 'inside-outside', 'count'],
  29: ['above-below'], 30: ['between'], 31: ['split'], 32: ['repetition', 'count'],
  33: ['above-below', 'repetition'], 34: ['sound-alike', 'sequence'], 35: ['sequence'],
  36: ['repetition', 'direction'], 37: ['inside-outside', 'direction'], 38: ['text-image', 'inside-outside'],
  39: ['inside-outside', 'direction', 'text-image'], 40: ['inside-outside', 'text-image'],
  41: ['inside-outside', 'direction'], 42: ['above-below', 'text-image'], 43: ['direction', 'text-image'],
  44: ['above-below'], 45: ['sequence'], 46: ['split', 'text-image'], 47: ['reversal', 'direction'],
  48: ['rotation', 'direction'], 49: ['sequence', 'direction'], 50: ['text-image', 'missing-letter'],
  51: ['text-image', 'sequence'], 52: ['above-below', 'count'], 53: ['direction'], 54: ['scale'],
  55: ['scale', 'inside-outside'], 56: ['split'], 57: ['repetition', 'direction'],
  58: ['text-image', 'direction', 'count'], 59: ['inside-outside', 'above-below'],
  60: ['inside-outside', 'direction'], 61: ['inside-outside', 'count'], 62: ['inside-outside', 'between'],
  63: ['above-below', 'count', 'text-image'], 64: ['rotation', 'sequence'], 65: ['text-image', 'above-below', 'direction'],
  66: ['above-below'], 67: ['between', 'sequence'], 68: ['inside-outside', 'missing-letter'],
  69: ['split', 'scale'], 70: ['direction', 'scale'], 71: ['count', 'between'], 72: ['sequence'],
  73: ['direction'], 74: ['text-image', 'split'], 75: ['rotation', 'direction'], 76: ['above-below', 'count'],
  77: ['inside-outside'], 78: ['inside-outside'], 79: ['above-below', 'inside-outside'],
  80: ['inside-outside', 'scale'], 81: ['inside-outside', 'text-image'], 82: ['above-below', 'count'],
  83: ['text-image', 'direction'], 84: ['scale', 'above-below'], 85: ['inside-outside'],
  86: ['colour', 'text-image'], 87: ['inside-outside', 'scale'], 88: ['above-below', 'scale'],
  89: ['colour', 'text-image'], 90: ['above-below', 'colour'], 91: ['scale', 'between'],
  92: ['text-image', 'direction'], 93: ['sequence', 'direction'], 94: ['inside-outside', 'text-image'],
  95: ['direction', 'repetition'], 96: ['sequence', 'inside-outside'], 97: ['inside-outside', 'text-image'],
  98: ['direction', 'rotation'], 99: ['rotation', 'between'], 100: ['split', 'text-image'],
  101: ['inside-outside', 'text-image'], 102: ['sequence', 'text-image'], 103: ['inside-outside', 'text-image'],
  104: ['above-below', 'inside-outside'], 105: ['sequence', 'reversal'], 106: ['inside-outside', 'text-image'],
  107: ['scale', 'split'], 108: ['scale'], 109: ['scale', 'text-image'], 110: ['text-image'],
  111: ['direction', 'text-image'], 112: ['inside-outside', 'text-image'], 113: ['text-image', 'direction'],
  114: ['inside-outside', 'above-below'], 115: ['split', 'text-image'],
}

const visualTemplates: Record<number, Puzzle['visualTemplate']> = {
  1: 'stack', 2: 'orbit', 3: 'row', 4: 'overlay', 5: 'stack', 6: 'freeform',
  7: 'row', 8: 'freeform', 9: 'stack', 10: 'stack', 11: 'overlay', 12: 'overlay',
  13: 'custom-vector', 14: 'freeform', 15: 'stack', 16: 'freeform', 17: 'row',
  18: 'row', 19: 'overlay', 20: 'custom-vector', 21: 'stack', 22: 'cascade',
  23: 'stack', 24: 'freeform', 25: 'freeform',
  26: 'row', 27: 'row', 28: 'overlay', 29: 'stack', 30: 'row', 31: 'row', 32: 'row',
  33: 'stack', 34: 'row', 35: 'row', 36: 'row', 37: 'overlay', 38: 'overlay', 39: 'overlay',
  40: 'overlay', 41: 'overlay', 42: 'stack', 43: 'stack', 44: 'stack', 45: 'row', 46: 'row',
  47: 'row', 48: 'freeform', 49: 'row', 50: 'row', 51: 'row', 52: 'freeform', 53: 'freeform',
  54: 'freeform', 55: 'freeform', 56: 'freeform', 57: 'overlay', 58: 'row', 59: 'overlay',
  60: 'overlay', 61: 'overlay', 62: 'overlay', 63: 'stack', 64: 'row', 65: 'stack',
}

const reworkedGeneratedPuzzleIds = [
  123, 126, 127, 128, 129, 130, 131, 132, 133, 134, 137, 139, 140, 141,
  142, 143, 146, 147, 149, 150, 153, 155, 157, 159, 160, 162, 164, 165,
]
const chapterFiveGeneratedPuzzleIds = Array.from({ length: 20 }, (_, index) => index + 191)
const chapterSixGeneratedPuzzleIds = [
  ...Array.from({ length: 10 }, (_, index) => index + 256),
  ...Array.from({ length: 5 }, (_, index) => index + 266),
]
const chapterSevenGeneratedPuzzleIds = [316, 317, 319, 329, 331, 366, 370, 382, 393, 407]
const chapterEightGeneratedPuzzleIds = [416, 417, 418, 419, 420]
const lateMasterGeneratedPuzzleIds = [486, 492, 526, 541, 550, 556]

function migrateStarterPuzzle(draft: StarterPuzzleDraft): Puzzle {
  const score = difficultyScores[draft.id] ?? (draft.id >= 501 ? 10 : draft.id >= 416 ? 9 : draft.id >= 316 ? 8 : ({ Easy: 2, Medium: 4, Hard: 6 } as const)[draft.difficulty])
  const usesInlineSvg = [13, 20].includes(draft.id)
  const usesLicensedFootprint = draft.id === 13
  const usesGeneratedArtwork = reworkedGeneratedPuzzleIds.includes(draft.id) || chapterFiveGeneratedPuzzleIds.includes(draft.id) || chapterSixGeneratedPuzzleIds.includes(draft.id) || chapterSevenGeneratedPuzzleIds.includes(draft.id) || chapterEightGeneratedPuzzleIds.includes(draft.id) || lateMasterGeneratedPuzzleIds.includes(draft.id) || [7, 10, 11, 21, 23, 24, 25, 27, 28, 37, 38, 39, 41, 50, 51, 56, 59, 61, 62, 63, 64, 65, 75, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 109, 110, 111, 112, 114, 115, 116, 117, 118, 119, 120, 121, 122, 124, 125, 135, 138, 151, 156, 163].includes(draft.id)
  const chapterId = draft.id <= 25 ? 'chapter-1' : draft.id <= 75 ? 'chapter-2' : draft.id <= 115 ? 'chapter-3' : draft.id <= 165 ? 'chapter-4' : draft.id <= 215 ? 'chapter-5' : draft.id <= 315 ? 'chapter-6' : draft.id <= 415 ? 'chapter-7' : draft.id <= 500 ? 'chapter-8' : draft.id <= 550 ? 'chapter-9' : 'chapter-10'
  const chapterOrder = draft.id <= 25 ? draft.id : draft.id <= 75 ? draft.id - 25 : draft.id <= 115 ? draft.id - 75 : draft.id <= 165 ? draft.id - 115 : draft.id <= 215 ? draft.id - 165 : draft.id <= 315 ? draft.id - 215 : draft.id <= 415 ? draft.id - 315 : draft.id <= 500 ? draft.id - 415 : draft.id <= 550 ? draft.id - 500 : draft.id - 550

  return {
    ...draft,
    contentVersion: `p${String(draft.id).padStart(3, '0')}-v${[118, 119, 121].includes(draft.id) ? 3 : [13, 122, 124, 125].includes(draft.id) || reworkedGeneratedPuzzleIds.includes(draft.id) ? 2 : 1}`,
    chapterId,
    chapterOrder,
    difficultyScore: score,
    estimatedSolveSeconds: 20 + score * 10,
    mechanics: mechanicTags[draft.id] ?? ['text-image'],
    visualTemplate: visualTemplates[draft.id] ?? 'freeform',
    assetKey: draft.id === 13 ? 'footprints'
      : draft.id === 20 ? 'blind-mice'
      : draft.id === 118 ? 'closet-skeleton'
      : draft.id === 119 ? 'double-ended-candle'
      : draft.id === 121 ? 'apple-eye'
      : draft.id === 122 ? 'chip-shoulder'
      : draft.id === 124 ? 'tongue-tied'
      : draft.id === 125 ? 'foot-mouth'
      : undefined,
    unlock: { requiresPuzzleIds: draft.id === 1 ? [] : [draft.id - 1] },
    artwork: {
      version: [118, 119, 121].includes(draft.id) ? 3 : [13, 122, 124, 125].includes(draft.id) || reworkedGeneratedPuzzleIds.includes(draft.id) ? 2 : 1,
      creator: usesLicensedFootprint ? 'Lorc / Game-icons.net' : usesGeneratedArtwork ? 'Clue Canvas / OpenAI image generation' : 'Visual Rebus project',
      source: usesLicensedFootprint
        ? 'GiFootprint from Game Icons via react-icons'
        : usesInlineSvg ? 'Original in-repository vector artwork' : usesGeneratedArtwork ? 'Project-owned generated artwork stored in-repository' : 'Original text and CSS composition',
      licence: usesLicensedFootprint ? 'CC BY 3.0' : 'Project-owned original',
      kind: usesInlineSvg ? 'inline-svg' : usesGeneratedArtwork ? 'project-asset' : 'text-css',
    },
    qa: {
      status: draft.id <= 25 ? 'Tested' : 'Draft',
      testerResults: draft.id <= 25 ? [{
        testerCode: 'owner-mobile-review',
        result: 'fair',
        testedAt: '2026-07-15',
        notes: 'Completed during initial 25-puzzle mobile review.',
      }] : [],
    },
  }
}

const starterPuzzles: StarterPuzzleDraft[] = [
  {
    id: 1,
    answer: 'head over heels',
    acceptedAnswers: [],
    wordPattern: '4 4 5',
    difficulty: 'Easy',
    format: 'typography',
    prompt: 'Find the hidden phrase',
    elements: [
      { content: 'HEAD', className: 'word word-top' },
      { content: 'HEELS', className: 'word word-bottom' },
    ],
    clues: ['Think about position and order.', 'Where is HEAD compared with HEELS?', 'The middle word is OVER.'],
    explanation: ['The word HEAD is positioned over the word HEELS.', 'HEAD + OVER + HEELS gives “head over heels.”'],
    region: 'Global',
  },
  {
    id: 2,
    answer: 'circle of life',
    acceptedAnswers: ['cycle of life'],
    wordPattern: '6 2 4',
    difficulty: 'Easy',
    format: 'rotation',
    prompt: 'What phrase is going around?',
    elements: [{ content: 'LIFE LIFE LIFE LIFE', className: 'life-cycle', ariaLabel: 'The word life arranged in a circle' }],
    clues: ['Notice the shape made by the word.', 'LIFE repeats in a circular path.', 'Think of a famous phrase ending in “of life.”'],
    explanation: ['LIFE is repeated in a circular arrangement.', 'The shape represents the “circle of life.”'],
    region: 'Global',
  },
  {
    id: 3,
    answer: 'split decision',
    acceptedAnswers: [],
    wordPattern: '5 8',
    difficulty: 'Easy',
    format: 'typography',
    prompt: 'Find the hidden phrase',
    elements: [{ content: 'DECI   SION', className: 'word split-word', ariaLabel: 'The word decision split into two pieces' }],
    clues: ['Look at what has happened to the word.', 'DECISION has been divided.', 'The first word means divided in two.'],
    explanation: ['The word DECISION is visibly split apart.', 'That makes it a “split decision.”'],
    region: 'Global',
  },
  {
    id: 4,
    answer: 'thinking outside the box',
    acceptedAnswers: ['think outside the box'],
    wordPattern: '8 7 3 3',
    difficulty: 'Easy',
    format: 'typography',
    prompt: 'Where is the thought?',
    elements: [
      { content: 'THINK', className: 'outside-word' },
      { content: 'BOX', className: 'boxed-word' },
    ],
    clues: ['Position is the key.', 'THINK is not inside the outlined shape.', 'The phrase begins with THINKING.'],
    explanation: ['THINK appears outside a box.', 'It represents “thinking outside the box.”'],
    region: 'Global',
  },
  {
    id: 5,
    answer: 'reading between the lines',
    acceptedAnswers: ['read between the lines'],
    wordPattern: '7 7 3 5',
    difficulty: 'Medium',
    format: 'typography',
    prompt: 'Find the phrase in the layout',
    elements: [
      { content: '────────────', className: 'line' },
      { content: 'READING', className: 'word between-word' },
      { content: '────────────', className: 'line' },
    ],
    clues: ['Look above and below the main word.', 'READING sits in a particular place relative to two lines.', 'The linking word is BETWEEN.'],
    explanation: ['READING is placed between two lines.', 'The layout says “reading between the lines.”'],
    region: 'Global',
  },
  {
    id: 6,
    answer: 'broken heart',
    acceptedAnswers: ['heart broken'],
    wordPattern: '6 5',
    difficulty: 'Easy',
    format: 'interaction',
    prompt: 'What has happened here?',
    elements: [{ content: '❤️', activatedContent: '💔', className: 'icon', ariaLabel: 'A heart that splits in two when tapped' }],
    clues: ['Name the object and describe its condition.', 'The heart is no longer whole.', 'The first word begins with B.'],
    explanation: ['The icon is a heart split by a crack.', 'It directly represents a “broken heart.”'],
    region: 'Global',
    interaction: {
      type: 'tap', targetId: 'heart', instruction: 'Tap the heart.', completionCondition: 'The whole heart changes into a broken heart.',
    },
  },
  {
    id: 7,
    answer: 'big fish in a small pond',
    acceptedAnswers: ['a big fish in a small pond'],
    wordPattern: '3 4 2 1 5 4',
    difficulty: 'Medium',
    format: 'scale',
    prompt: 'Find the familiar saying',
    elements: [
      { content: '', className: 'small-pond', ariaLabel: 'A clearly bounded small pond' },
      { content: '🐟', className: 'big-fish', ariaLabel: 'An oversized fish filling the small pond' },
    ],
    clues: ['Compare the sizes of the two things.', 'One fish seems oversized for its surroundings.', 'The last word is POND.'],
    explanation: ['An oversized fish fills and overhangs a clearly bounded little pond.', 'It represents a “big fish in a small pond.”'],
    region: 'Global',
  },
  {
    id: 8,
    answer: 'backwards glance',
    acceptedAnswers: ['backward glance'],
    wordPattern: '9 6',
    difficulty: 'Medium',
    format: 'typography',
    prompt: 'Read the unusual clue',
    elements: [{ content: 'ECNALG', className: 'word mirrored', ariaLabel: 'The word glance written backwards' }],
    clues: ['Try reading from the other direction.', 'The displayed word is GLANCE reversed.', 'Describe the direction before naming the word.'],
    explanation: ['ECNALG is GLANCE written backwards.', 'That gives a “backwards glance.”'],
    region: 'Global',
  },
  {
    id: 9,
    answer: 'long time no see',
    acceptedAnswers: [],
    wordPattern: '4 4 2 3',
    difficulty: 'Medium',
    format: 'scale',
    prompt: 'Find the greeting',
    elements: [
      { content: '', className: 'long-time-clock', ariaLabel: 'A tall, elongated clock casting an unusually long shadow' },
      { content: '', className: 'clock-shadow', ariaLabel: 'An unusually long clock shadow' },
      { content: 'NO C', className: 'word no-see', ariaLabel: 'The letters no C' },
    ],
    clues: ['Both size and sound matter.', 'TIME is stretched, and the letter C is missing.', '“No C” sounds like the last two words.'],
    explanation: ['The clock represents TIME, and its shadow is unusually long.', 'NO C sounds like “no see.”', 'Together they form “long time no see.”'],
    region: 'Global',
  },
  {
    id: 10,
    answer: 'man overboard',
    acceptedAnswers: [],
    wordPattern: '3 9',
    difficulty: 'Easy',
    format: 'illustration',
    prompt: 'Sound the alarm',
    elements: [
      { content: '', className: 'man-figure', ariaLabel: 'A man positioned above a board' },
      { content: '', className: 'wood-board', ariaLabel: 'A wooden board beneath the man' },
    ],
    clues: ['Describe the position of the person.', 'The man is above a wooden board.', 'The answer is also a nautical warning.'],
    explanation: ['A man is positioned over a wooden board.', 'Read literally, it becomes “man overboard.”'],
    region: 'Global',
  },
  {
    id: 11,
    answer: 'once in a blue moon',
    acceptedAnswers: [],
    wordPattern: '4 2 1 4 4',
    difficulty: 'Easy',
    format: 'icon',
    prompt: 'Find the rare expression',
    elements: [
      { content: 'ONCE', className: 'word moon-word' },
      { content: '', className: 'blue-moon', ariaLabel: 'The word once inside a detailed blue moon' },
    ],
    clues: ['Colour and position both matter.', 'ONCE appears inside a blue moon.', 'The phrase describes something very rare.'],
    explanation: ['ONCE is placed in a blue moon.', 'That creates “once in a blue moon.”'],
    region: 'Global',
  },
  {
    id: 12,
    answer: 'crossroads',
    acceptedAnswers: ['crossed roads'],
    wordPattern: '10',
    difficulty: 'Easy',
    format: 'typography',
    prompt: 'Where do these roads meet?',
    elements: [
      { content: 'ROAD', className: 'word road-horizontal' },
      { content: 'ROAD', className: 'word road-vertical' },
    ],
    clues: ['Watch how the two words relate.', 'The two ROADs cross each other.', 'The answer is commonly written as one word.'],
    explanation: ['Two ROAD words cross at the centre.', 'Cross + roads gives “crossroads.”'],
    region: 'Global',
  },
  {
    id: 13,
    answer: 'two left feet',
    acceptedAnswers: ['two left foot'],
    wordPattern: '3 4 4',
    difficulty: 'Easy',
    format: 'icon',
    prompt: 'What awkward phrase is this?',
    elements: [
      { content: 'footprint', ariaLabel: 'A footprint pointing left' },
      { content: 'footprint', ariaLabel: 'Another footprint pointing left' },
    ],
    clues: ['Count the body parts and notice their direction.', 'Both feet point left.', 'People say this when someone cannot dance well.'],
    explanation: ['There are two feet.', 'Both are turned to the left, giving “two left feet.”'],
    region: 'Global',
  },
  {
    id: 14,
    answer: 'small talk',
    acceptedAnswers: ['little talk'],
    wordPattern: '5 4',
    difficulty: 'Easy',
    format: 'scale',
    prompt: 'Describe this conversation',
    elements: [{ content: 'TALK', className: 'tiny-talk', ariaLabel: 'The word talk written very small' }],
    clues: ['The size of the word is the clue.', 'TALK is unusually tiny.', 'The phrase means casual conversation.'],
    explanation: ['The word TALK is shown very small.', 'It represents “small talk.”'],
    region: 'Global',
  },
  {
    id: 15,
    answer: 'stand in line',
    acceptedAnswers: ['standing in line'],
    wordPattern: '5 2 4',
    difficulty: 'Easy',
    format: 'typography',
    prompt: 'Follow the instruction',
    elements: [
      { content: '────────', className: 'line stand-line' },
      { content: 'STAND', className: 'word stand-word' },
      { content: '────────', className: 'line stand-line' },
    ],
    clues: ['Look at where STAND has been placed.', 'The word is contained within a line.', 'The last word is LINE.'],
    explanation: ['STAND appears in the middle of a line.', 'It reads as “stand in line.”'],
    region: 'Global',
  },
  {
    id: 16,
    answer: 'upside down',
    acceptedAnswers: [],
    wordPattern: '6 4',
    difficulty: 'Easy',
    format: 'rotation',
    prompt: 'Which way is the word facing?',
    elements: [{ content: 'DOWN', className: 'word upside-down', ariaLabel: 'The word down turned upside down' }],
    clues: ['Orientation carries the meaning.', 'DOWN has been rotated halfway around.', 'The first word begins with UP.'],
    explanation: ['The word DOWN is turned upside down.', 'The visual directly forms “upside down.”'],
    region: 'Global',
  },
  {
    id: 17,
    answer: 'middle of nowhere',
    acceptedAnswers: ['in the middle of nowhere'],
    wordPattern: '6 2 7',
    difficulty: 'Medium',
    format: 'typography',
    prompt: 'Find the hidden location',
    elements: [
      { content: '↓', className: 'nowhere-arrow', ariaLabel: 'An arrow pointing to the middle gap' },
      { content: 'NOW  HERE', className: 'word nowhere-gap', ariaLabel: 'The words now and here separated by a gap' },
    ],
    clues: ['Pay attention to the empty space.', 'There is a middle inside NOWHERE.', 'The phrase describes a remote place.'],
    explanation: ['NOWHERE is split to create a visible middle.', 'The empty centre is the “middle of nowhere.”'],
    region: 'Global',
  },
  {
    id: 18,
    answer: 'life after death',
    acceptedAnswers: [],
    wordPattern: '4 5 5',
    difficulty: 'Medium',
    format: 'typography',
    prompt: 'Read the order carefully',
    elements: [
      { content: 'DEATH', className: 'word death-word' },
      { content: 'LIFE', className: 'word life-word' },
    ],
    clues: ['The sequence matters more than the position.', 'LIFE appears after DEATH.', 'Use the linking word AFTER.'],
    explanation: ['DEATH comes first and LIFE follows it.', 'That order represents “life after death.”'],
    region: 'Global',
  },
  {
    id: 19,
    answer: 'top secret',
    acceptedAnswers: [],
    wordPattern: '3 6',
    difficulty: 'Easy',
    format: 'typography',
    prompt: 'Where is the secret?',
    elements: [{ content: 'SECRET', className: 'word top-secret' }],
    clues: ['Position tells you the missing word.', 'SECRET is at the very top.', 'The phrase describes highly classified information.'],
    explanation: ['SECRET is positioned at the top of the card.', 'That makes it “top secret.”'],
    region: 'Global',
  },
  {
    id: 20,
    answer: 'three blind mice',
    acceptedAnswers: ['3 blind mice'],
    wordPattern: '5 5 4',
    difficulty: 'Easy',
    format: 'icon',
    prompt: 'Name the nursery-rhyme trio',
    elements: [
      { content: '🐭', className: 'blind-mouse', ariaLabel: 'Mouse with a blindfold' },
      { content: '🐭', className: 'blind-mouse', ariaLabel: 'Mouse with a blindfold' },
      { content: '🐭', className: 'blind-mouse', ariaLabel: 'Mouse with a blindfold' },
    ],
    clues: ['Count the animals.', 'Imagine that each mouse cannot see.', 'It is the title of a nursery rhyme.'],
    explanation: ['There are three mouse icons.', 'Each has a dark blindfold, giving “three blind mice.”'],
    region: 'Global',
  },
  {
    id: 21,
    answer: 'water under the bridge',
    acceptedAnswers: [],
    wordPattern: '5 5 3 6',
    difficulty: 'Medium',
    format: 'illustration',
    prompt: 'Find the forgiving expression',
    elements: [{ content: '', className: 'bridge-water-scene', ariaLabel: 'Several bottles of water floating underneath a stone arch bridge' }],
    clues: ['Name both things and compare their positions.', 'The bottles of water are below the bridge.', 'The phrase means a past problem no longer matters.'],
    explanation: ['Bottles of water are shown underneath a bridge.', 'The arrangement gives “water under the bridge.”'],
    region: 'Global',
  },
  {
    id: 22,
    answer: 'falling asleep',
    acceptedAnswers: ['fall asleep'],
    wordPattern: '7 6',
    difficulty: 'Medium',
    format: 'motion',
    prompt: 'What is happening to sleep?',
    elements: [
      { content: 'S', className: 'sleep-letter sleep-1' },
      { content: 'L', className: 'sleep-letter sleep-2' },
      { content: 'E', className: 'sleep-letter sleep-3' },
      { content: 'E', className: 'sleep-letter sleep-4' },
      { content: 'P', className: 'sleep-letter sleep-5' },
    ],
    clues: ['Follow the direction of the letters.', 'SLEEP appears to be dropping.', 'The action word ends in -ING.'],
    explanation: ['The letters of SLEEP descend as though they are falling.', 'This represents “falling asleep.”'],
    region: 'Global',
    motion: {
      type: 'entrance', name: 'falling-letters', durationMs: 900, reducedMotionFallback: 'Show the letters in their final descending positions.',
    },
  },
  {
    id: 23,
    answer: 'rising star',
    acceptedAnswers: ['a rising star'],
    wordPattern: '6 4',
    difficulty: 'Easy',
    format: 'icon',
    prompt: 'What is this star doing?',
    elements: [{ content: '', className: 'rising-star-scene', ariaLabel: 'A golden star growing brighter as it rises upward through three positions' }],
    clues: ['Look at the direction of the trail.', 'The star grows larger and brighter as it moves upward.', 'The phrase can describe a promising new talent.'],
    explanation: ['The fading star positions and golden trail show a star travelling upward.', 'It is a “rising star.”'],
    region: 'Global',
  },
  {
    id: 24,
    answer: 'half baked idea',
    acceptedAnswers: ['a half baked idea'],
    wordPattern: '4 5 4',
    difficulty: 'Medium',
    format: 'illustration',
    prompt: 'This thought is not quite finished',
    elements: [{ content: '', className: 'half-baked-scene', ariaLabel: 'A lightbulb-shaped pastry that is baked on one half and raw on the other' }],
    clues: ['The shape represents a thought.', 'Only one side of the lightbulb pastry has been baked.', 'The phrase describes a poorly developed plan.'],
    explanation: ['A lightbulb represents an idea.', 'The pastry is baked on only one half, creating a “half-baked idea.”'],
    region: 'Global',
  },
  {
    id: 25,
    answer: 'all in a days work',
    acceptedAnswers: ['all in one days work'],
    wordPattern: '3 2 1 4 4',
    difficulty: 'Hard',
    format: 'illustration',
    prompt: 'Finish the whole pack',
    elements: [
      { content: '', className: 'days-work-scene', ariaLabel: 'A daily calendar whose entire nine-to-five schedule is occupied' },
      { content: 'WORK', className: 'days-work-label', ariaLabel: 'Work fills the complete calendar day' },
    ],
    clues: ['Look at how much of the schedule is occupied.', 'The same task fills the day from nine until five.', 'The phrase describes something routine or expected.'],
    explanation: ['WORK occupies the entire working day on the calendar.', 'Everything fits into that day: “all in a day’s work.”'],
    region: 'Global',
  },
]

function candidate(
  id: number,
  answer: string,
  wordPattern: string,
  difficulty: Puzzle['difficulty'],
  format: Puzzle['format'],
  elements: StarterPuzzleDraft['elements'],
  clues: StarterPuzzleDraft['clues'],
  explanation: string[],
  acceptedAnswers: string[] = [],
  interaction?: StarterPuzzleDraft['interaction'],
): StarterPuzzleDraft {
  return { id, answer, acceptedAnswers, wordPattern, difficulty, format, prompt: 'Find the hidden phrase', elements, clues, explanation, region: 'Global', interaction }
}

const candidatePuzzles: StarterPuzzleDraft[] = [
  candidate(26, 'back to square one', '4 2 6 3', 'Medium', 'illustration', [
    { content: 'BACK', className: 'cc-label' }, { content: '↩', className: 'cc-arrow' }, { content: '1', className: 'cc-square', ariaLabel: 'Back returning to a square containing one' },
  ], ['Follow the direction of the arrow.', 'BACK is returning to a numbered shape.', 'The destination is SQUARE ONE.'], ['BACK follows a return arrow toward a square containing 1.', 'It represents “back to square one.”']),
  candidate(27, 'a step in the right direction', '1 4 2 3 5 9', 'Easy', 'illustration', [
    { content: '', className: 'right-step-scene', ariaLabel: 'A single foot stepping along an arrow pointing right' },
  ], ['Focus on the one movement being made.', 'The path has a very particular direction.', 'The phrase describes a small move toward improvement.'], ['One foot takes a step along a right-pointing path.', 'That is “a step in the right direction.”']),
  candidate(28, 'two peas in a pod', '3 4 2 1 3', 'Easy', 'illustration', [
    { content: '', className: 'two-peas-scene', ariaLabel: 'Exactly two peas nestled inside one open pea pod' },
  ], ['Count the small objects.', 'Both objects are enclosed together.', 'They are PEAS sharing a POD.'], ['Two pea shapes sit together inside one pod.', 'They are “two peas in a pod.”']),
  candidate(29, 'under the weather', '5 3 7', 'Easy', 'typography', [
    { content: 'WEATHER', className: 'word cc-wide' }, { content: 'UNDER', className: 'word cc-small' },
  ], ['Position supplies the connecting word.', 'UNDER is below WEATHER.', 'Read the lower word first.'], ['UNDER is positioned beneath WEATHER.', 'It reads “under the weather.”']),
  candidate(30, 'just between you and me', '4 7 3 3 2', 'Easy', 'typography', [
    { content: 'YOU', className: 'cc-label' }, { content: 'JUST', className: 'word cc-accent' }, { content: 'ME', className: 'cc-label' },
  ], ['Look at the middle word.', 'JUST separates two people.', 'It is between YOU and ME.'], ['JUST sits directly between YOU and ME.', 'The layout gives “just between you and me.”']),
  candidate(31, 'split personality', '5 11', 'Medium', 'typography', [
    { content: 'PERSON', className: 'word cc-split-left' }, { content: 'ALITY', className: 'word cc-split-right' },
  ], ['The word has been divided.', 'PERSONALITY appears in two pieces.', 'Another word for divided is SPLIT.'], ['PERSONALITY is visibly split apart.', 'It represents a “split personality.”']),
  candidate(32, 'double take', '6 4', 'Easy', 'typography', [
    { content: 'TAKE', className: 'word' }, { content: 'TAKE', className: 'word' },
  ], ['Count what you see.', 'The same word appears twice.', 'Two of something can be DOUBLE.'], ['TAKE is shown two times.', 'That makes a “double take.”']),
  candidate(33, 'a cut above the rest', '1 3 5 3 4', 'Medium', 'typography', [
    { content: 'CUT', className: 'word cc-accent' }, { content: 'REST  REST  REST', className: 'cc-repeat' },
  ], ['Compare the vertical positions.', 'CUT is higher than every REST.', 'The phrase begins A CUT ABOVE.'], ['CUT is positioned above all of the REST words.', 'It is “a cut above the rest.”']),
  candidate(34, 'forever and a day', '7 3 1 3', 'Medium', 'typography', [
    { content: '4', className: 'word cc-accent' }, { content: 'EVER', className: 'word' }, { content: '+ DAY', className: 'cc-label' },
  ], ['Say the number aloud.', '4 and EVER combine by sound.', 'Then add one DAY.'], ['4 sounds like FOR and sits with EVER, followed by DAY.', 'Together they form “forever and a day.”']),
  candidate(35, 'first aid', '5 3', 'Medium', 'typography', [
    { content: 'AID', className: 'first-aid-podium', ariaLabel: 'Aid standing on the highest first-place podium' },
  ], ['Notice where AID has finished.', 'It occupies the winning position.', 'The highest podium is also called first place.'], ['AID stands on the first-place podium.', 'It represents “first aid.”']),
  candidate(36, 'side by side', '4 2 4', 'Easy', 'typography', [
    { content: 'SIDE', className: 'word' }, { content: 'SIDE', className: 'word' },
  ], ['Notice how the words are arranged.', 'Neither word is above the other.', 'They are next to each other.'], ['The two SIDE words sit directly beside one another.', 'They are “side by side.”']),
  candidate(37, 'a level playing field', '1 5 7 5', 'Medium', 'typography', [
    { content: '', className: 'level-field-scene', ariaLabel: 'A spirit level lying horizontally across a sports playing field' },
  ], ['Identify both the place and the tool.', 'The tool checks whether a surface is perfectly horizontal.', 'It lies across a place where a game is played.'], ['A spirit level stretches across a real playing field.', 'It shows “a level playing field.”']),
  candidate(38, 'man in the moon', '3 2 3 4', 'Easy', 'illustration', [
    { content: '', className: 'man-moon-scene', ariaLabel: 'A human face naturally formed by the shadows and craters of a full moon' },
  ], ['Look closely at the moon’s features.', 'Its craters form something familiar.', 'Whose face seems to appear there?'], ['The moon’s natural markings form a human face.', 'It is the “man in the moon.”']),
  candidate(39, 'life in the fast lane', '4 2 3 4 4', 'Medium', 'illustration', [
    { content: '', className: 'fast-lane-scene', ariaLabel: 'A highway with one lane moving dramatically faster than the others' },
    { content: 'LIFE', className: 'fast-lane-life', ariaLabel: 'Life positioned in the speeding lane' },
  ], ['Compare the traffic in each lane.', 'One lane is moving dramatically faster.', 'Notice what has been placed in that lane.'], ['LIFE sits inside the visibly speeding highway lane.', 'It represents “life in the fast lane.”']),
  candidate(40, 'the inside story', '3 6 5', 'Medium', 'illustration', [
    { content: 'STORY', className: 'word cc-book', ariaLabel: 'Story placed inside an open book outline' },
  ], ['The boundary is meaningful.', 'STORY appears inside a book.', 'The describing word is INSIDE.'], ['STORY is visibly inside a book outline.', 'It is “the inside story.”']),
  candidate(41, 'cornerstone', '11', 'Medium', 'typography', [
    { content: '', className: 'cornerstone-scene', ariaLabel: 'One large foundation stone embedded in the bottom corner of two stone walls' },
  ], ['Look at the building’s foundation.', 'One block is larger and more prominent than the rest.', 'Its exact position supplies the first part of the answer.'], ['A prominent stone is built directly into the wall’s corner.', 'It is a “cornerstone.”']),
  candidate(42, 'on top of the world', '2 3 2 3 5', 'Easy', 'illustration', [
    { content: 'ON TOP', className: 'word cc-accent' }, { content: '🌍', className: 'cc-globe' },
  ], ['Compare the words with the picture.', 'ON TOP sits above a globe.', 'The globe represents the WORLD.'], ['ON TOP is positioned above the world.', 'It reads “on top of the world.”']),
  candidate(43, 'down to earth', '4 2 5', 'Medium', 'illustration', [
    { content: 'DOWN', className: 'word' }, { content: '↓', className: 'cc-arrow' }, { content: '🌍', className: 'cc-globe-small' },
  ], ['Follow the arrow.', 'DOWN travels toward the planet.', 'The planet is EARTH.'], ['DOWN points directly toward Earth.', 'It gives “down to earth.”']),
  candidate(44, 'right on time', '5 2 4', 'Medium', 'typography', [
    { content: 'RIGHT', className: 'word cc-accent' }, { content: 'TIME', className: 'word cc-underlined-base' },
  ], ['The words are vertically connected.', 'RIGHT is directly on TIME.', 'Use the small connecting word ON.'], ['RIGHT rests directly on top of TIME.', 'It reads “right on time.”']),
  candidate(45, 'ahead of time', '5 2 4', 'Medium', 'typography', [
    { content: 'AHEAD', className: 'word cc-accent' }, { content: 'TIME', className: 'word' },
  ], ['Reading order matters.', 'AHEAD comes before TIME.', 'The missing linking word is OF.'], ['AHEAD is positioned before TIME.', 'This represents “ahead of time.”']),
  candidate(46, 'broken record', '6 6', 'Easy', 'illustration', [
    { content: 'REC', className: 'word cc-crack-left' }, { content: 'ORD', className: 'word cc-crack-right' },
  ], ['The displayed word is damaged.', 'RECORD has been cracked apart.', 'Describe its condition first.'], ['RECORD is split into broken pieces.', 'It is a “broken record.”']),
  candidate(47, 'reading backwards', '7 9', 'Medium', 'typography', [
    { content: 'GNIDAER', className: 'word cc-reversed' }, { content: '←', className: 'cc-arrow' },
  ], ['Try changing your reading direction.', 'The letters spell READING in reverse.', 'The action is happening BACKWARDS.'], ['READING is written in reverse order with a left arrow.', 'It shows “reading backwards.”'], ['backwards reading']),
  candidate(48, 'turning point', '7 5', 'Medium', 'rotation', [
    { content: 'POINT', className: 'word cc-turning' }, { content: '↻', className: 'cc-turn-arrow' },
  ], ['The arrow shows movement.', 'POINT is rotating around a centre.', 'Another word for rotating is TURNING.'], ['POINT is shown turning around a pivot.', 'It represents a “turning point.”']),
  candidate(49, 'point of no return', '5 2 2 6', 'Hard', 'typography', [
    { content: 'POINT', className: 'cc-label' }, { content: 'NO', className: 'word cc-accent' }, { content: '↩ RETURN', className: 'cc-blocked' },
  ], ['One possible direction is blocked.', 'There is NO way to RETURN.', 'The phrase begins POINT OF.'], ['POINT is followed by NO and a blocked RETURN arrow.', 'It represents the “point of no return.”']),
  candidate(50, 'missing link', '7 4', 'Medium', 'illustration', [
    { content: '', className: 'missing-link-scene', ariaLabel: 'A metal chain with one central link absent and shown only as a dotted outline' },
  ], ['Look for what should connect the two sides.', 'One part of the chain is absent.', 'The missing object is a LINK.'], ['A chain contains a conspicuous gap where a link should be.', 'It shows the “missing link.”']),
  candidate(51, 'chain reaction', '5 8', 'Medium', 'illustration', [
    { content: '', className: 'chain-reaction-scene', ariaLabel: 'A spark travelling progressively through connected metal chain links' },
  ], ['Follow the glow from one side to the other.', 'One event triggers the next connected piece.', 'Name both the object and the process.'], ['A spark sets off each connected link in sequence.', 'This forms a “chain reaction.”']),
  candidate(52, 'high five', '4 4', 'Easy', 'typography', [
    { content: '5', className: 'cc-high-five' },
  ], ['Position describes the number.', 'The number is unusually high.', 'Say the position before FIVE.'], ['The number 5 appears high on the card.', 'It is a “high five.”']),
  candidate(53, 'low profile', '3 7', 'Easy', 'typography', [
    { content: 'PROFILE', className: 'word cc-low' },
  ], ['Position describes the word.', 'PROFILE is near the bottom.', 'The first word is the opposite of HIGH.'], ['PROFILE sits very low in the frame.', 'It represents a “low profile.”']),
  candidate(54, 'small world', '5 5', 'Easy', 'scale', [
    { content: 'WORLD', className: 'cc-tiny' },
  ], ['Compare the word with the available space.', 'WORLD is much smaller than expected.', 'Describe its size first.'], ['WORLD is displayed extremely small.', 'It is a “small world.”']),
  candidate(55, 'the big picture', '3 3 7', 'Easy', 'scale', [
    { content: 'PICTURE', className: 'cc-huge' },
  ], ['Size is the key.', 'PICTURE fills most of the frame.', 'Describe the picture before naming it.'], ['PICTURE is displayed unusually large.', 'It represents “the big picture.”'], ['big picture']),
  candidate(56, 'half time', '4 4', 'Medium', 'typography', [
    { content: '', className: 'half-time-scene', ariaLabel: 'An analog clock face divided into two equal halves with one half missing' },
  ], ['Look at how much of the clock remains.', 'The face has been divided exactly down the middle.', 'A clock represents what concept?'], ['Only one half of the clock face remains visible.', 'It shows “half time.”']),
  candidate(57, 'double vision', '6 6', 'Medium', 'typography', [
    { content: 'VISION', className: 'word cc-vision-one' }, { content: 'VISION', className: 'word cc-vision-two' },
  ], ['How many copies can you see?', 'VISION appears twice and slightly offset.', 'Two of the same thing can be DOUBLE.'], ['Two overlapping copies of VISION are visible.', 'That creates “double vision.”']),
  candidate(58, 'eye to eye', '3 2 3', 'Easy', 'illustration', [
    { content: '👁', className: 'cc-eye' }, { content: '↔', className: 'cc-small-arrow' }, { content: '👁', className: 'cc-eye cc-face-left' },
  ], ['The two pictures face one another.', 'Both eyes are at the same level.', 'The linking word is TO.'], ['Two eyes face each other at equal height.', 'They are “eye to eye.”'], ['seeing eye to eye']),
  candidate(59, 'up in the air', '2 2 3 3', 'Medium', 'typography', [
    { content: '', className: 'up-air-scene', ariaLabel: 'An upward arrow suspended high among clouds' },
  ], ['Look at both the direction and the surroundings.', 'The arrow points upward while floating above the ground.', 'What is it surrounded by?'], ['An upward arrow is suspended among the clouds.', 'It is “up in the air.”']),
  candidate(60, 'left out in the cold', '4 3 2 3 4', 'Medium', 'typography', [
    { content: 'LEFT', className: 'word cc-outside-cold' }, { content: '❄ COLD ❄', className: 'cc-cold-box' },
  ], ['Compare what is inside and outside.', 'LEFT has been excluded from COLD.', 'The phrase begins LEFT OUT.'], ['LEFT sits outside the cold, icy enclosure.', 'It represents being “left out in the cold.”']),
  candidate(61, 'standing room only', '8 4 4', 'Medium', 'typography', [
    { content: '', className: 'standing-room-scene', ariaLabel: 'A crowded room in which every person is standing and there are no seats' },
  ], ['Look at everyone in the room.', 'There is not a chair or free seat anywhere.', 'What is the only option left?'], ['The room is full and every person must stand.', 'It offers “standing room only.”']),
  candidate(62, 'room for one more', '4 3 3 4', 'Hard', 'typography', [
    { content: '', className: 'room-one-more-scene', ariaLabel: 'A crowded open elevator with exactly one empty person-sized space' },
  ], ['The lift is crowded, but inspect the floor carefully.', 'One person-sized place has deliberately been left open.', 'How many additional passengers could fit?'], ['The crowded lift still has one clear empty place.', 'There is “room for one more.”']),
  candidate(63, 'six feet under', '3 4 5', 'Medium', 'illustration', [
    { content: '', className: 'six-feet-under-scene', ariaLabel: 'A treasure chest buried beneath the ground beside a six-foot depth measurement' },
    { content: '6 FT', className: 'six-feet-marker', ariaLabel: 'The depth is six feet' },
  ], ['The ground line separates two areas.', 'Use the measurement beside the buried object.', 'The object is exactly that far below the surface.'], ['The treasure chest is buried six feet beneath the ground.', 'It is “six feet under.”']),
  candidate(64, 'mixed emotions', '5 8', 'Hard', 'rotation', [
    { content: '', className: 'mixed-emotions-scene', ariaLabel: 'Happy, sad, angry and surprised faces swirling together inside a blender' },
  ], ['Identify what is inside the appliance.', 'Several very different feelings are being combined.', 'Describe what the blender is doing to them.'], ['Different emotional faces swirl together inside a blender.', 'They are “mixed emotions.”']),
  candidate(65, 'walking on air', '7 2 3', 'Medium', 'illustration', [
    { content: '', className: 'walking-air-person', ariaLabel: 'A person walking joyfully with no ground beneath them' },
    { content: 'AIR', className: 'walking-air-word', ariaLabel: 'The person walks directly on the word air' },
  ], ['Notice what is supporting the walker’s feet.', 'There is no road or floor beneath them.', 'Read the surface they are stepping across.'], ['A person walks directly across the top of AIR.', 'It represents “walking on air.”']),
  candidate(66, 'mind over matter', '4 4 6', 'Easy', 'typography', [
    { content: 'MIND', className: 'word next-over' }, { content: 'MATTER', className: 'word next-under' },
  ], ['Compare the two words vertically.', 'One concept sits above the other.', 'Read the upper word first.'], ['MIND is positioned over MATTER.', 'It represents “mind over matter.”']),
  candidate(67, 'second to none', '6 2 4', 'Medium', 'typography', [
    { content: '2', className: 'next-second' }, { content: 'NONE', className: 'word next-none' },
  ], ['Read the symbol as an ordinal number.', 'It sits directly next to the other word.', 'The phrase means unbeatable.'], ['The number 2—second—is immediately next to NONE.', 'It gives “second to none.”']),
  candidate(68, 'one in a million', '3 2 1 7', 'Easy', 'typography', [
    { content: 'MILL1ON', className: 'word one-million', ariaLabel: 'The number one placed inside the word million' },
  ], ['One character is different.', 'A number has replaced a letter inside the word.', 'Read the special number before its container.'], ['The number 1 appears inside MILLION.', 'It is “one in a million.”']),
  candidate(69, 'long distance relationship', '4 8 12', 'Medium', 'typography', [
    { content: 'RELATION', className: 'relationship-left' }, { content: 'SHIP', className: 'relationship-right' },
  ], ['The two parts normally belong together.', 'Notice the unusually large separation.', 'Join the pieces to name what is stretched.'], ['RELATION and SHIP form RELATIONSHIP but are far apart.', 'It is a “long-distance relationship.”']),
  candidate(70, 'growing apart', '7 5', 'Medium', 'illustration', [
    { content: '', className: 'growing-apart-scene', ariaLabel: 'Two matching plants in normal pots with long stems curving and growing away from each other' },
  ], ['Compare the plants and their directions.', 'Both are becoming larger while moving away.', 'The phrase can describe people becoming less close.'], ['Two plants grow while leaning farther away from one another.', 'They are “growing apart.”']),
  candidate(71, 'close quarters', '5 8', 'Medium', 'icon', [
    { content: '¼¼¼¼', className: 'close-quarters', ariaLabel: 'Four quarter symbols squeezed tightly together' },
  ], ['Count the identical fractions.', 'They have almost no space between them.', 'Each symbol represents one quarter.'], ['Four quarters are packed very close together.', 'They are “close quarters.”']),
  candidate(72, 'out of order', '3 2 5', 'Easy', 'typography', [
    { content: '1  2  4  3  5', className: 'number-disorder', ariaLabel: 'Number tiles one two four three five' },
  ], ['Check the sequence carefully.', 'Two neighbouring numbers have swapped places.', 'Describe the condition of the sequence.'], ['The numbers are not in their proper sequence.', 'They are “out of order.”']),
  candidate(73, 'just around the corner', '4 6 3 6', 'Medium', 'typography', [
    { content: 'JU', className: 'just-corner-top' }, { content: 'ST', className: 'just-corner-side', ariaLabel: 'The word just wrapping around a right angled corner' },
  ], ['Follow the shape of the word.', 'Its path changes direction at a right angle.', 'The word itself supplies the beginning.'], ['JUST bends around a visible corner.', 'It is “just around the corner.”']),
  candidate(74, 'cutting corners', '7 7', 'Easy', 'icon', [
    { content: '', className: 'cutting-corner', ariaLabel: 'Scissors cutting a corner from a square' },
  ], ['Watch what the tool is removing.', 'It is not cutting through the centre.', 'The target has four of these.'], ['Scissors cut away the corner of a square.', 'This is “cutting corners.”']),
  candidate(75, 'bend over backwards', '4 4 9', 'Medium', 'illustration', [
    { content: '', className: 'next-scene bend-backwards-scene', ariaLabel: 'A determined person performing an exaggerated backward bend' },
  ], ['Describe the unusual body position.', 'The person bends in the less natural direction.', 'The phrase means making an exceptional effort.'], ['The person is bending their whole body backwards.', 'They “bend over backwards.”']),
  candidate(76, 'under one roof', '5 3 4', 'Easy', 'icon', [
    { content: '', className: 'under-one-roof-scene', ariaLabel: 'A large number one positioned directly above a standalone tiled roof' },
  ], ['There are only two elements.', 'Read the large number, then identify the structure beneath it.', 'The answer is a familiar phrase about sharing a home.'], ['The number one is paired with a single roof.', 'The phrase is “under one roof.”']),
  candidate(77, 'behind closed doors', '6 6 5', 'Medium', 'illustration', [
    { content: '', className: 'next-scene closed-doors-scene', ariaLabel: 'Conversation and silhouettes visible only behind nearly closed doors' },
  ], ['Something is happening privately.', 'The conversation is hidden by an entrance.', 'Describe where it takes place.'], ['The conversation and people are concealed by closed doors.', 'It happens “behind closed doors.”']),
  candidate(78, 'open secret', '4 6', 'Easy', 'typography', [
    { content: '', className: 'next-scene open-secret-scene', ariaLabel: 'Fully open theatre curtains publicly revealing a sealed dossier labelled SECRET in a spotlight' },
  ], ['The curtains have been pulled completely apart.', 'Something confidential is being publicly displayed in the spotlight.', 'Describe the contradiction between the reveal and the dossier.'], ['Open curtains reveal a sealed SECRET dossier to the entire audience.', 'It is an “open secret.”']),
  candidate(79, 'keep it under your hat', '4 2 5 4 3', 'Medium', 'icon', [
    { content: 'IT', className: 'under-hat', ariaLabel: 'The word it hidden beneath a large hat' },
  ], ['The small word is being concealed.', 'Identify the object covering it.', 'This phrase means not telling anyone.'], ['IT is tucked underneath a hat.', 'The picture says “keep it under your hat.”']),
  candidate(80, 'elephant in the room', '8 2 3 4', 'Easy', 'illustration', [
    { content: '', className: 'next-scene elephant-room-scene', ariaLabel: 'An enormous elephant filling a small living room' },
  ], ['Notice the impossible house guest.', 'It fills nearly the entire living space.', 'The phrase describes an obvious issue people avoid.'], ['A huge elephant occupies the room.', 'It is the “elephant in the room.”']),
  candidate(81, 'fish out of water', '4 3 2 5', 'Easy', 'illustration', [
    { content: '', className: 'next-scene fish-out-water-scene', ariaLabel: 'A fish outside water holding an empty bottle upside down as three final drops fall' },
  ], ['The animal is missing something essential.', 'Its bottle is upside down and almost completely empty.', 'Describe the fish’s relationship to what should surround it.'], ['The fish is on dry ground and its water bottle has run empty.', 'It is a “fish out of water.”']),
  candidate(82, 'raining cats and dogs', '7 4 3 4', 'Easy', 'illustration', [
    { content: '', className: 'next-scene raining-cats-dogs-scene', ariaLabel: 'Four large raindrops falling from a storm cloud, each containing a cat or dog' },
  ], ['Look closely inside the falling raindrops.', 'Two familiar household animals alternate inside them.', 'Use the familiar expression for very heavy rain.'], ['Cats and dogs are enclosed inside rain falling from a cloud.', 'It is “raining cats and dogs.”']),
  candidate(83, 'when pigs fly', '4 4 3', 'Easy', 'illustration', [
    { content: '', className: 'next-scene flying-pig-scene', ariaLabel: 'A cheerful winged pig flying through the air' },
  ], ['The animal is doing something impossible.', 'Its wings make the action clear.', 'This phrase means something will never happen.'], ['A pig is genuinely flying.', 'It shows “when pigs fly.”']),
  candidate(84, 'a drop in the ocean', '1 4 2 3 5', 'Medium', 'icon', [
    { content: '', className: 'next-scene drop-ocean-scene', ariaLabel: 'One small water drop falling toward a ripple in a vast ocean' },
  ], ['Compare the tiny falling object with the enormous body of water.', 'There is only one drop.', 'The phrase describes an insignificant contribution.'], ['One small drop is about to disappear into a vast ocean.', 'It is “a drop in the ocean.”']),
  candidate(85, 'head in the clouds', '4 2 3 6', 'Easy', 'illustration', [
    { content: '', className: 'next-scene head-clouds-scene', ariaLabel: 'A thoughtful person whose head is surrounded by clouds' },
  ], ['Notice which body part is obscured.', 'Look at what surrounds it.', 'The phrase describes someone lost in thought.'], ['The person’s head sits among the clouds.', 'They have their “head in the clouds.”']),
  candidate(86, 'silver lining', '6 6', 'Medium', 'illustration', [
    { content: '', className: 'next-scene silver-lining-scene', ariaLabel: 'A dark storm cloud completely surrounded by a thick polished metallic-silver lining' },
  ], ['Focus on the reflective outer edge rather than the dark centre.', 'A polished silver border traces the cloud’s entire perimeter.', 'The phrase means a hopeful part of a bad situation.'], ['A dark cloud is completely outlined by brilliant polished silver.', 'That edge is the “silver lining.”']),
  candidate(87, 'storm in a teacup', '5 2 1 6', 'Medium', 'illustration', [
    { content: '', className: 'next-scene storm-teacup-scene', ariaLabel: 'A miniature thunderstorm swirling inside a porcelain teacup' },
  ], ['A dramatic event is contained somewhere tiny.', 'Identify the weather and its container.', 'The phrase describes excessive fuss over a small matter.'], ['A whole storm swirls inside a teacup.', 'It is a “storm in a teacup.”']),
  candidate(88, 'on thin ice', '2 4 3', 'Easy', 'illustration', [
    { content: '', className: 'next-scene thin-ice-scene', ariaLabel: 'A careful person standing on an extremely thin sheet of ice' },
  ], ['Look beneath the person’s feet.', 'The supporting surface is unusually delicate.', 'The phrase suggests a risky situation.'], ['The person stands on a very thin sheet of ice.', 'They are “on thin ice.”']),
  candidate(89, 'cold feet', '4 4', 'Easy', 'icon', [
    { content: '', className: 'next-scene cold-feet-scene', ariaLabel: 'Two bare feet turned icy blue and covered in frost and ice crystals' },
  ], ['Name the frozen body parts.', 'Their blue colour, frost and icicles show a temperature.', 'The phrase can mean becoming nervous.'], ['Two bare feet are visibly frozen and covered in ice.', 'They are “cold feet.”']),
  candidate(90, 'hot under the collar', '3 5 3 6', 'Medium', 'illustration', [
    { content: '', className: 'next-scene hot-collar-scene', ariaLabel: 'Heat and steam rising specifically from underneath a shirt collar' },
  ], ['Locate the heat carefully.', 'It rises from beneath part of a shirt.', 'The phrase means becoming angry or embarrassed.'], ['Heat rises from directly under the collar.', 'It shows “hot under the collar.”']),
  candidate(91, 'pressed for time', '7 3 4', 'Medium', 'typography', [
    { content: '', className: 'next-scene pressed-time-scene', ariaLabel: 'The word TIME squeezed inward between two flat upright palms' },
  ], ['The word is under physical pressure.', 'Two flat palms are pushing it inward from both sides.', 'The phrase describes being in a hurry.'], ['Two hands physically press and compress TIME.', 'It is “pressed for time.”']),
  candidate(92, 'time flies', '4 5', 'Easy', 'icon', [
    { content: '', className: 'next-scene time-flies-scene', ariaLabel: 'An analogue clock flying with a large feathered wing attached to each side of its casing' },
  ], ['Combine the central object with its new ability.', 'The two wings are physically attached to the clock.', 'The phrase describes how quickly moments pass.'], ['A clock has grown wings and is flying.', 'It shows that “time flies.”']),
  candidate(93, 'race against time', '4 7 4', 'Medium', 'illustration', [
    { content: '', className: 'next-scene race-time-scene', ariaLabel: 'A runner racing side by side against a speeding analogue clock' },
  ], ['Two competitors are moving toward the same finish.', 'One competitor measures seconds and minutes.', 'The phrase describes urgent work.'], ['A runner competes directly against a clock.', 'It is a “race against time.”']),
  candidate(94, 'a waste of time', '1 5 2 4', 'Easy', 'icon', [
    { content: '', className: 'next-scene waste-time-scene', ariaLabel: 'An alarm clock discarded inside a waste-paper bin with its lower half hidden by the bin' },
  ], ['Notice where the clock has been placed.', 'It is physically sitting down inside a container used for rubbish.', 'Combine the container’s purpose with the clock’s meaning.'], ['A clock has been thrown inside a waste bin.', 'It is “a waste of time.”']),
  candidate(95, 'around the clock', '6 3 5', 'Medium', 'icon', [
    { content: '🕰️', className: 'around-clock', ariaLabel: 'Continuous circular arrows travelling around a clock' },
  ], ['Follow the arrows.', 'They circle the object without stopping.', 'The phrase means continuously, day and night.'], ['Arrows travel continuously around a clock.', 'It represents “around the clock.”']),
  candidate(96, 'light at the end of the tunnel', '5 2 3 3 2 3 6', 'Medium', 'illustration', [
    { content: '', className: 'next-scene tunnel-light-scene', ariaLabel: 'A long dark tunnel with one brilliant light at its far end' },
  ], ['Look toward the farthest point.', 'Something hopeful appears beyond the darkness.', 'Name both the bright object and the passage.'], ['A bright light shines at the far end of a dark tunnel.', 'It is the “light at the end of the tunnel.”']),
  candidate(97, 'tunnel vision', '6 6', 'Medium', 'illustration', [
    { content: '', className: 'next-scene tunnel-vision-scene', ariaLabel: 'A large eye looking through a narrow tunnel with a restricted field of view' },
  ], ['The eye can see through only one narrow route.', 'Its field of view is strongly restricted.', 'Combine the passage with the sense being used.'], ['An eye looks through a narrow tunnel.', 'It represents “tunnel vision.”']),
  candidate(98, 'mixed signals', '5 7', 'Medium', 'icon', [
    { content: '', className: 'next-scene mixed-signals-scene', ariaLabel: 'A confused person surrounded by conflicting traffic, pedestrian, phone and radio signals' },
  ], ['Several different systems are communicating at once.', 'Traffic, pedestrian, phone and radio cues conflict around one person.', 'Describe the confusing combination.'], ['Different kinds of conflicting signals are jumbled together.', 'They are “mixed signals.”']),
  candidate(99, 'crossed wires', '7 5', 'Easy', 'illustration', [
    { content: '', className: 'next-scene crossed-wires-scene', ariaLabel: 'Two thick insulated electrical wires with exposed copper ends crossing in a clear X' },
  ], ['Follow each coloured electrical cable.', 'Their exposed copper ends show they are actual wires.', 'The two wires intersect in the middle.'], ['Two insulated electrical wires cross in an X.', 'They are “crossed wires.”']),
  candidate(100, 'loose ends', '5 4', 'Medium', 'illustration', [
    { content: '', className: 'next-scene loose-ends-scene', ariaLabel: 'Two thick natural ropes ending in separate frayed untied tips facing one another' },
  ], ['Notice the thick twisted rope fibres.', 'Both frayed tips are free and remain untied.', 'The phrase describes unresolved details.'], ['Two ropes have free, unravelled and untied ends.', 'They are “loose ends.”']),
  candidate(101, 'strings attached', '7 8', 'Easy', 'icon', [
    { content: '', className: 'next-scene strings-attached-scene', ariaLabel: 'A wrapped gift with four thick twisted strings visibly knotted to its corners' },
  ], ['The object looks like a gift.', 'Four real cords are visibly knotted to its corners.', 'The phrase suggests hidden conditions.'], ['Four twisted strings are physically tied and attached to the gift.', 'It comes with “strings attached.”']),
  candidate(102, 'train of thought', '5 2 7', 'Medium', 'icon', [
    { content: '', className: 'next-scene train-thought-scene', ariaLabel: 'A steam locomotive on rails pulling three thought-bubble carriages with wheels and couplings' },
  ], ['The vehicle is unmistakably travelling on railway tracks.', 'Its three carriages are shaped like symbols for thinking.', 'Combine the vehicle with what its carriages represent.'], ['A real train pulls a sequence of thought-bubble carriages.', 'It forms a “train of thought.”']),
  candidate(103, 'food for thought', '4 3 7', 'Medium', 'illustration', [
    { content: '', className: 'next-scene food-thought-scene', ariaLabel: 'A sculpted brain served neatly on a dinner plate under an open cloche' },
  ], ['The place setting is serving something unexpected.', 'The object on the plate represents thinking.', 'Combine the meal idea with its mental purpose.'], ['A symbol of thought is served as a meal.', 'It is “food for thought.”']),
  candidate(104, 'deep thought', '4 7', 'Medium', 'icon', [
    { content: '', className: 'next-scene deep-thought-scene', ariaLabel: 'A person at the water surface with thought dots descending to a brain inside a thought bubble near the seabed' },
  ], ['Follow the three small thought dots from the person.', 'They descend through very deep water to a bubble containing a brain.', 'Describe the bubble’s depth before naming what it represents.'], ['A clear brain-filled thought bubble sits far beneath its thinker.', 'It represents “deep thought.”']),
  candidate(105, 'second thoughts', '6 8', 'Hard', 'icon', [
    { content: '', className: 'next-scene second-thoughts-scene', ariaLabel: 'A thoughtful person beneath two thought bubbles, with a newer red cross thought replacing a faded green check thought' },
  ], ['The person is clearly thinking rather than speaking.', 'An earlier approving thought is being replaced by a newer contradictory one.', 'The phrase means reconsidering a decision.'], ['A faded positive thought is followed and superseded by a negative one.', 'The person is having “second thoughts.”']),
  candidate(106, 'peace of mind', '5 2 4', 'Easy', 'icon', [
    { content: '', className: 'next-scene peace-mind-scene', ariaLabel: 'A complete human head in side profile with a glowing peace symbol inside the upper skull' },
  ], ['The outer shape is unmistakably a complete human head.', 'A symbol of calm and harmony sits inside the brain area.', 'Combine the inner symbol with what the head represents.'], ['A peace symbol glows inside a person’s mind.', 'It gives “peace of mind.”']),
  candidate(107, 'middle age spread', '6 3 6', 'Hard', 'typography', [
    { content: 'A       G       E', className: 'middle-age-spread', ariaLabel: 'The word age spread extremely wide across the middle' },
  ], ['The letters still make one short word.', 'Their spacing has expanded dramatically.', 'Notice both the word and where the expansion occurs.'], ['AGE is spread widely across the middle of the card.', 'It represents “middle-age spread.”']),
  candidate(108, 'small fortune', '5 7', 'Easy', 'scale', [
    { content: 'FORTUNE', className: 'small-fortune' },
  ], ['Compare the word with the empty space.', 'It is much smaller than expected.', 'Describe its size before reading it.'], ['FORTUNE appears extremely small.', 'It is a “small fortune.”']),
  candidate(109, 'big cheese', '3 6', 'Easy', 'illustration', [
    { content: '', className: 'next-scene big-cheese-scene', ariaLabel: 'A gigantic cheese wheel dwarfing a tiny dining table and chair' },
  ], ['Compare the food with the nearby furniture.', 'Its scale is comically exaggerated.', 'The phrase can describe an important person.'], ['The cheese is enormously oversized.', 'It is the “big cheese.”']),
  candidate(110, 'money talks', '5 5', 'Easy', 'icon', [
    { content: '', className: 'next-scene money-talks-scene', ariaLabel: 'A gold coin with an open speaking mouth producing strong sound waves' },
  ], ['The money itself has a real open mouth.', 'Visible sound waves show that sound is coming from it.', 'Name the object before the action.'], ['A gold coin is visibly speaking aloud.', 'It shows that “money talks.”']),
  candidate(111, 'cash flow', '4 4', 'Medium', 'illustration', [
    { content: '', className: 'next-scene cash-flow-scene', ariaLabel: 'Paper banknotes travelling along the current of a winding river' },
  ], ['Follow the direction of the banknotes.', 'They move along something normally filled with water.', 'Combine the money with the movement.'], ['Cash travels with the current of a flowing river.', 'It represents “cash flow.”']),
  candidate(112, 'nest egg', '4 3', 'Easy', 'icon', [
    { content: '', className: 'next-scene nest-egg-scene', ariaLabel: 'One smooth golden egg naturally cradled inside a coherent woven bird nest' },
  ], ['Identify the single golden object.', 'It is naturally seated inside a woven structure made from twigs.', 'The phrase can mean savings kept for the future.'], ['One golden egg is safely cradled inside a bird’s nest.', 'It is a “nest egg.”']),
  candidate(113, 'break the bank', '5 3 4', 'Easy', 'icon', [
    { content: '🔨', className: 'bank-hammer' }, { content: '🏦', className: 'bank-breaking', ariaLabel: 'A hammer striking and cracking a bank building' },
  ], ['A tool is about to damage a building.', 'Identify the type of building.', 'Read the action before the object.'], ['A hammer breaks a bank building.', 'It represents “break the bank.”']),
  candidate(114, 'pie in the sky', '3 2 3 3', 'Easy', 'illustration', [
    { content: '', className: 'next-scene pie-sky-scene', ariaLabel: 'A complete fruit pie floating high among soft clouds' },
  ], ['The food is nowhere near a kitchen table.', 'Look at the clouds surrounding it.', 'Name the food, then its location.'], ['A pie floats high among the clouds.', 'It is “pie in the sky.”']),
  candidate(115, 'piece of cake', '5 2 4', 'Medium', 'illustration', [
    { content: '', className: 'next-scene piece-cake-scene', ariaLabel: 'A cake built from jigsaw pieces with exactly one piece removed' },
  ], ['The dessert has been constructed unusually.', 'One interlocking part has been removed.', 'Name that part before the dessert.'], ['The cake is made from puzzle pieces, with one piece set aside.', 'It is a “piece of cake.”']),
  candidate(116, 'needle in a haystack', '6 2 1 8', 'Medium', 'illustration', [
    { content: '', className: 'chapter-four-scene needle-haystack-scene', ariaLabel: 'One shiny sewing needle partially hidden in a vast mound of hay' },
  ], ['Search the huge golden mound carefully.', 'One tiny sewing tool is hidden among similar thin shapes.', 'The phrase describes something extremely difficult to find.'], ['A single needle is hidden inside an enormous haystack.', 'It is a “needle in a haystack.”']),
  candidate(117, "wolf in sheep's clothing", '4 2 6 8', 'Easy', 'illustration', [
    { content: '', className: 'chapter-four-scene wolf-sheep-scene', ariaLabel: 'A grey wolf visibly disguising itself in a fluffy sheep fleece' },
  ], ['The animal underneath is not what its coat suggests.', 'Its ears, face, paws and tail betray the disguise.', 'The phrase describes someone dangerous pretending to be harmless.'], ['A wolf is wearing a sheep fleece as a disguise.', 'It is a “wolf in sheep’s clothing.”']),
  candidate(118, 'skeleton in the closet', '8 2 3 6', 'Easy', 'icon', [
    { content: '☠', className: 'draft-closet-skeleton', ariaLabel: 'A skeleton concealed inside a wooden closet' },
  ], ['Tap the piece of furniture to look inside.', 'Something bony is concealed behind its doors.', 'The phrase means a hidden and embarrassing secret.'], ['Opening the closet reveals a complete skeleton inside.', 'It is a “skeleton in the closet.”'], [], {
    type: 'tap',
    targetId: 'closet',
    instruction: 'Tap the closet to open it.',
    completionCondition: 'The closet doors open to reveal a skeleton.',
  }),
  candidate(119, 'burning the candle at both ends', '7 3 6 2 4 4', 'Medium', 'illustration', [
    { content: '', className: 'draft-double-candle', ariaLabel: 'One candle burning with a flame at both its top and bottom ends' },
  ], ['The candle is burning in an impossible way.', 'Count how many ends have flames.', 'The phrase describes exhausting yourself by doing too much.'], ['The same candle burns at both ends.', 'It shows “burning the candle at both ends.”']),
  candidate(120, 'put the cart before the horse', '3 3 4 6 3 5', 'Easy', 'illustration', [
    { content: '', className: 'chapter-four-scene cart-horse-scene', ariaLabel: 'A wooden cart positioned ahead of the horse that should pull it' },
  ], ['The two farm objects are in the wrong order.', 'The vehicle appears ahead of the animal meant to pull it.', 'The phrase warns against doing things backwards.'], ['The cart has been placed before the horse.', 'It shows “put the cart before the horse.”']),
  candidate(121, 'apple of my eye', '5 2 2 3', 'Easy', 'icon', [
    { content: '●', className: 'draft-apple-eye', ariaLabel: 'A bright red apple forming the pupil inside a large eye' },
  ], ['Look inside the eye.', 'Its pupil has been replaced by a familiar fruit.', 'The phrase describes someone greatly cherished.'], ['An apple sits in the centre of an eye.', 'It is the “apple of my eye.”']),
  candidate(122, 'chip on your shoulder', '4 2 4 8', 'Medium', 'icon', [
    { content: '◖', className: 'draft-shoulder-person' }, { content: '●', className: 'draft-shoulder-chip', ariaLabel: 'A crisp balanced directly on a person’s shoulder' },
  ], ['A small snack is resting somewhere on a person.', 'Focus on the upper side of the torso.', 'The phrase describes a lasting grievance.'], ['A chip is balanced on a shoulder.', 'It is a “chip on your shoulder.”']),
  candidate(123, 'heart on your sleeve', '5 2 4 6', 'Easy', 'icon', [
    { content: '', className: 'draft-shirt-sleeve' }, { content: '♥', className: 'draft-sleeve-heart', ariaLabel: 'A red heart displayed on the sleeve of a shirt' },
  ], ['The emotion symbol is worn openly.', 'It appears on one part of a shirt rather than inside the chest.', 'The phrase means showing feelings openly.'], ['A heart is displayed directly on a sleeve.', 'It shows “heart on your sleeve.”']),
  candidate(124, 'tongue tied', '6 4', 'Easy', 'icon', [
    { content: '👅', className: 'draft-tongue' }, { content: '⌘', className: 'draft-tongue-knot', ariaLabel: 'A tongue visibly bound by a tight rope knot' },
  ], ['Identify the body part.', 'A knot prevents it from moving freely.', 'The phrase describes being unable to find the right words.'], ['A tongue is physically tied in a knot.', 'It is “tongue-tied.”']),
  candidate(125, 'foot in your mouth', '4 2 4 5', 'Easy', 'icon', [
    { content: '🦶', className: 'draft-foot-mouth', ariaLabel: 'A bare foot positioned inside a large open mouth' },
  ], ['The body part is somewhere it should never be.', 'Its container is used for speaking and eating.', 'The phrase describes saying something embarrassing.'], ['A foot is literally inside a mouth.', 'It shows “foot in your mouth.”']),
  candidate(126, 'bite the bullet', '4 3 6', 'Medium', 'icon', [
    { content: '🦷', className: 'draft-bite-tooth' }, { content: '━━●', className: 'draft-bullet', ariaLabel: 'A tooth biting down on a metal bullet' },
  ], ['One object is normally used for chewing.', 'It is clamped onto something made of metal.', 'The phrase means facing something difficult bravely.'], ['A tooth is biting a bullet.', 'It represents “bite the bullet.”']),
  candidate(127, 'spill the beans', '5 3 5', 'Easy', 'illustration', [
    { content: '◒', className: 'draft-spill-can' }, { content: '● ● ● ● ●', className: 'draft-spill-beans', ariaLabel: 'A tipped container spilling several beans across the ground' },
  ], ['The container has fallen sideways.', 'Small food items are escaping from it.', 'The phrase means revealing secret information.'], ['A tipped container spills its beans.', 'It shows “spill the beans.”']),
  candidate(128, 'crack a smile', '5 1 5', 'Medium', 'icon', [
    { content: '☺', className: 'draft-cracked-smile', ariaLabel: 'A smiling face split by a visible crack' },
  ], ['The expression is positive.', 'A jagged break runs through it.', 'Read the damage before the expression.'], ['A smile has a literal crack through it.', 'It is “crack a smile.”']),
  candidate(129, 'face the music', '4 3 5', 'Easy', 'icon', [
    { content: '◉', className: 'draft-music-face' }, { content: '♫ ♪ ♬', className: 'draft-music-notes', ariaLabel: 'A face turned directly toward a group of musical notes' },
  ], ['Notice which direction the face is looking.', 'It is confronting a group of notes.', 'The phrase means accepting unpleasant consequences.'], ['A face looks directly toward the music.', 'It must “face the music.”']),
  candidate(130, 'hit the nail on the head', '3 3 4 2 3 4', 'Easy', 'icon', [
    { content: '', className: 'draft-head' }, { content: '│', className: 'draft-head-nail' }, { content: '🔨', className: 'draft-head-hit', ariaLabel: 'A hammer striking a nail directly on top of a head' },
  ], ['A fastener is positioned very precisely.', 'It sits on top of the body part used for thinking.', 'The phrase means getting something exactly right.'], ['A nail is hit directly on the head.', 'It shows “hit the nail on the head.”']),
  candidate(131, 'bury the hatchet', '4 3 7', 'Medium', 'illustration', [
    { content: '🪓', className: 'draft-buried-hatchet', ariaLabel: 'A hatchet buried below a clear line of soil' },
  ], ['Most of the tool is below ground level.', 'Identify the chopping tool.', 'The phrase means ending a disagreement.'], ['A hatchet has been buried in the earth.', 'It represents “bury the hatchet.”']),
  candidate(132, 'hold your horses', '4 4 6', 'Easy', 'icon', [
    { content: '🤲', className: 'draft-hold-hands' }, { content: '🐎', className: 'draft-held-horse', ariaLabel: 'Two hands carefully holding a horse in their palms' },
  ], ['The hands are preventing an animal from moving.', 'The animal is normally ridden.', 'The phrase asks someone to wait.'], ['Two hands are holding a horse.', 'They say “hold your horses.”']),
  candidate(133, 'kick the bucket', '4 3 6', 'Easy', 'icon', [
    { content: '🦵', className: 'draft-kick-leg' }, { content: '🪣', className: 'draft-kick-bucket', ariaLabel: 'A leg kicking a bucket away with motion marks' },
  ], ['A leg is making contact with a container.', 'The container has a handle.', 'Read the action before the object.'], ['A leg kicks a bucket.', 'It shows “kick the bucket.”']),
  candidate(134, 'let the cat out of the bag', '3 3 3 3 2 3 3', 'Easy', 'icon', [
    { content: '🐈', className: 'draft-bag-cat' }, { content: '', className: 'draft-open-bag', ariaLabel: 'A cat climbing out through the open top of a bag' },
  ], ['An animal is escaping from a container.', 'The container is a bag.', 'The phrase means revealing a secret.'], ['A cat is coming out of an open bag.', 'It shows “let the cat out of the bag.”']),
  candidate(135, 'barking up the wrong tree', '7 2 3 5 4', 'Medium', 'illustration', [
    { content: '', className: 'chapter-four-scene wrong-tree-scene', ariaLabel: 'A dog barking up an empty tree while a cat hides in a different tree' },
  ], ['The dog is focused on one tree.', 'The animal it seeks is hiding in the other tree.', 'The phrase means following a mistaken line of thought.'], ['The dog barks at the wrong tree while the cat watches elsewhere.', 'It is “barking up the wrong tree.”']),
  candidate(136, 'beat around the bush', '4 6 3 4', 'Medium', 'typography', [
    { content: 'BEAT  BEAT  BEAT  BEAT', className: 'draft-beat-bush', ariaLabel: 'The word BEAT repeated in a circle around a central bush' },
  ], ['The same action word circles an object.', 'Nothing goes directly through the centre.', 'The phrase means avoiding the main point.'], ['BEAT travels around a bush.', 'It shows “beat around the bush.”']),
  candidate(137, 'add fuel to the fire', '3 4 2 3 4', 'Easy', 'icon', [
    { content: 'FUEL', className: 'draft-fuel' }, { content: '→', className: 'draft-fuel-arrow' }, { content: '🔥', className: 'draft-fire', ariaLabel: 'Fuel being added directly to a burning fire' },
  ], ['One substance is moving toward flames.', 'That substance will make the flames stronger.', 'The phrase means making a bad situation worse.'], ['Fuel is being added to a fire.', 'It shows “add fuel to the fire.”']),
  candidate(138, 'burn your bridges', '4 4 7', 'Medium', 'illustration', [
    { content: '', className: 'chapter-four-scene burn-bridges-scene', ariaLabel: 'A wooden bridge burning fiercely across the middle of a gorge' },
  ], ['The structure connects two sides.', 'Fire is destroying the route back.', 'The phrase means permanently damaging a relationship or option.'], ['A bridge is burning and becoming unusable.', 'It shows “burn your bridges.”']),
  candidate(139, 'jump on the bandwagon', '4 2 3 9', 'Medium', 'icon', [
    { content: '🎺  🥁  🎸', className: 'draft-band' }, { content: '▰◉◉', className: 'draft-bandwagon', ariaLabel: 'A musical band riding together on a wagon' },
  ], ['Several instruments belong to one group.', 'That group is riding on a wheeled vehicle.', 'The phrase means joining something because it is popular.'], ['A band is travelling on a wagon.', 'It forms a “bandwagon.”']),
  candidate(140, 'pull the plug', '4 3 4', 'Easy', 'icon', [
    { content: '🤏', className: 'draft-pull-hand' }, { content: '← 🔌', className: 'draft-pulled-plug', ariaLabel: 'A hand pulling an electrical plug away from its socket' },
  ], ['The hand is removing something electrical.', 'An arrow shows it leaving its connection.', 'The phrase means stopping an activity completely.'], ['A hand pulls a plug from its socket.', 'It shows “pull the plug.”']),
  candidate(141, 'throw in the towel', '5 2 3 5', 'Easy', 'icon', [
    { content: '▱', className: 'draft-thrown-towel' }, { content: '➜', className: 'draft-towel-motion', ariaLabel: 'A towel flying through the air after being thrown' },
  ], ['The rectangular cloth is moving through the air.', 'It has been tossed rather than folded.', 'The phrase means giving up.'], ['A towel has been thrown into the air.', 'It shows “throw in the towel.”']),
  candidate(142, 'black sheep of the family', '5 5 2 3 6', 'Easy', 'icon', [
    { content: '🐑  🐑  🐑', className: 'draft-sheep-family' }, { content: '🐑', className: 'draft-black-sheep', ariaLabel: 'One dark sheep standing apart from three light sheep' },
  ], ['Compare the animals’ colours.', 'One member of the group is visibly different.', 'The phrase describes an unconventional family member.'], ['One black sheep stands apart from the rest of its family.', 'It is the “black sheep of the family.”']),
  candidate(143, 'red herring', '3 7', 'Easy', 'icon', [
    { content: '➟', className: 'draft-red-herring', ariaLabel: 'A single fish silhouette coloured bright red' },
  ], ['Identify the colour.', 'The shape represents a fish.', 'The phrase means a misleading clue.'], ['A herring is coloured bright red.', 'It is a “red herring.”']),
  candidate(144, 'green with envy', '5 4 4', 'Easy', 'typography', [
    { content: 'ENVY', className: 'draft-green-envy', ariaLabel: 'The word ENVY saturated in vivid green' },
  ], ['Read the emotion word.', 'Its colour supplies the missing description.', 'The phrase describes strong jealousy.'], ['ENVY appears completely green.', 'It shows “green with envy.”']),
  candidate(145, 'white lie', '5 3', 'Easy', 'typography', [
    { content: 'LIE', className: 'draft-white-lie', ariaLabel: 'The word LIE printed in white against a dark background' },
  ], ['Read the short word.', 'Its colour is the other half of the answer.', 'The phrase means a harmless untruth.'], ['LIE is written in white.', 'It is a “white lie.”']),
  candidate(146, 'caught red handed', '6 3 6', 'Easy', 'icon', [
    { content: '✋︎  ✋︎', className: 'draft-red-hands', ariaLabel: 'A pair of hands completely coloured bright red and trapped inside a frame' },
  ], ['Look at both the colour and the body parts.', 'A border suggests they have been caught.', 'The phrase means being discovered during wrongdoing.'], ['Two red hands are caught inside a frame.', 'They are “caught red-handed.”']),
  candidate(147, 'blind spot', '5 4', 'Medium', 'icon', [
    { content: '◉', className: 'draft-blind-eye' }, { content: '●', className: 'draft-blind-spot', ariaLabel: 'A blindfolded eye unable to see a nearby black spot' },
  ], ['One symbol represents sight.', 'A dark bar prevents it from seeing the nearby dot.', 'The phrase describes something overlooked.'], ['A blinded eye cannot see the spot.', 'It is a “blind spot.”']),
  candidate(148, 'window of opportunity', '6 2 11', 'Medium', 'typography', [
    { content: 'OPPORTUNITY', className: 'draft-opportunity-window', ariaLabel: 'The word OPPORTUNITY visible through a wide open window' },
  ], ['The long word is visible through an opening.', 'That opening is part of a wall.', 'The phrase means a favourable chance to act.'], ['OPPORTUNITY appears through an open window.', 'It is a “window of opportunity.”']),
  candidate(149, 'key to success', '3 2 7', 'Easy', 'icon', [
    { content: '🔑', className: 'draft-success-key' }, { content: 'SUCCESS', className: 'draft-success-word', ariaLabel: 'A key pointing directly toward the word SUCCESS' },
  ], ['The object can unlock something.', 'Its target is a positive outcome.', 'Combine the object with the target.'], ['A key leads directly to SUCCESS.', 'It is the “key to success.”']),
  candidate(150, 'stepping stone', '8 5', 'Easy', 'illustration', [
    { content: '👣', className: 'draft-stone-steps' }, { content: '●  ●  ●', className: 'draft-stepping-stones', ariaLabel: 'Footprints travelling across a row of rounded stepping stones' },
  ], ['Follow the footprints.', 'They move across separate rocks.', 'Name the action before the object.'], ['Feet are stepping across stones.', 'They form a “stepping stone.”']),
  candidate(151, 'fork in the road', '4 2 3 4', 'Easy', 'illustration', [
    { content: '', className: 'chapter-four-scene fork-road-scene', ariaLabel: 'A giant dining fork embedded exactly where an asphalt road divides' },
  ], ['The road divides into two routes.', 'A piece of cutlery stands at the exact split.', 'The phrase describes a point requiring a choice.'], ['A fork stands in the fork of a road.', 'It is a “fork in the road.”']),
  candidate(152, 'uphill battle', '6 6', 'Medium', 'typography', [
    { content: 'BATTLE', className: 'draft-uphill-battle', ariaLabel: 'The word BATTLE struggling upward along a steep diagonal hill' },
  ], ['The word names a difficult struggle.', 'Its path slopes sharply upward.', 'The phrase describes a very difficult task.'], ['BATTLE climbs a steep hill.', 'It is an “uphill battle.”']),
  candidate(153, 'walking a tightrope', '7 1 9', 'Medium', 'illustration', [
    { content: '👣', className: 'draft-tightrope-feet' }, { content: '', className: 'draft-tightrope', ariaLabel: 'Footprints carefully walking along one extremely thin rope' },
  ], ['The footprints follow a very narrow support.', 'A fall would be dangerous.', 'The phrase describes managing a risky situation.'], ['Footprints walk along a tight rope.', 'It shows “walking a tightrope.”']),
  candidate(154, 'balancing act', '9 3', 'Medium', 'typography', [
    { content: 'ACT', className: 'draft-balance-act', ariaLabel: 'The word ACT balanced precisely on the centre of a seesaw' },
  ], ['The word is resting on a pivot.', 'Both sides are held level.', 'The phrase describes managing competing demands.'], ['ACT is balanced on a seesaw.', 'It is a “balancing act.”']),
  candidate(155, 'tip of the iceberg', '3 2 3 7', 'Medium', 'illustration', [
    { content: '', className: 'draft-iceberg', ariaLabel: 'A tiny iceberg tip above water with an enormous mass hidden below' },
  ], ['Compare what is above the water with what is below.', 'Only a tiny portion can be seen.', 'The phrase describes a small visible part of a much larger problem.'], ['Only the tip of a huge iceberg appears above water.', 'It is the “tip of the iceberg.”']),
  candidate(156, 'calm before the storm', '4 6 3 5', 'Medium', 'illustration', [
    { content: '', className: 'chapter-four-scene calm-storm-scene', ariaLabel: 'A peaceful clear landscape immediately ahead of a huge approaching storm front' },
  ], ['Read the weather from left to right.', 'Peace and stillness come first; violent weather follows.', 'The phrase describes a quiet period before trouble.'], ['A calm landscape sits directly before an approaching storm.', 'It is the “calm before the storm.”']),
  candidate(157, 'eye of the storm', '3 2 3 5', 'Easy', 'icon', [
    { content: '◉', className: 'draft-storm-eye', ariaLabel: 'A large eye sitting in the calm centre of a circular storm' },
  ], ['The centre contains an organ of sight.', 'Everything around it swirls like violent weather.', 'Name the centre before the weather.'], ['An eye occupies the centre of a storm.', 'It is the “eye of the storm.”']),
  candidate(158, 'on cloud nine', '2 5 4', 'Easy', 'icon', [
    { content: '9', className: 'draft-cloud-nine', ariaLabel: 'The number nine sitting on top of a soft white cloud' },
  ], ['Read the number.', 'Notice what it is sitting on.', 'The phrase means feeling extremely happy.'], ['Nine sits on a cloud.', 'It is “on cloud nine.”']),
  candidate(159, 'rain on your parade', '4 2 4 6', 'Medium', 'illustration', [
    { content: '☁', className: 'draft-parade-cloud' }, { content: '☂  ♫  ⚑  ♫', className: 'draft-rained-parade', ariaLabel: 'A raincloud pouring rain directly onto a cheerful parade' },
  ], ['A celebration is moving below.', 'Bad weather is falling directly onto it.', 'The phrase means spoiling someone’s enjoyment.'], ['Rain falls on a parade.', 'It shows “rain on your parade.”']),
  candidate(160, 'out on a limb', '3 2 1 4', 'Medium', 'illustration', [
    { content: '●', className: 'draft-limb-person' }, { content: '', className: 'draft-tree-limb', ariaLabel: 'A person standing precariously at the far outer end of a tree limb' },
  ], ['The figure is far from the trunk.', 'Only a narrow branch supports them.', 'The phrase describes taking a risky position.'], ['A person stands far out on a tree limb.', 'They are “out on a limb.”']),
  candidate(161, 'branching out', '9 3', 'Medium', 'typography', [
    { content: 'OUT', className: 'draft-branching-out', ariaLabel: 'The word OUT splitting into several branching paths' },
  ], ['The word begins as one path.', 'It then divides into several branches.', 'The phrase means expanding into new areas.'], ['OUT grows along multiple branches.', 'It is “branching out.”']),
  candidate(162, 'root of the problem', '4 2 3 7', 'Medium', 'typography', [
    { content: 'PROBLEM', className: 'draft-problem-root', ariaLabel: 'The word PROBLEM positioned at the base of a spreading root system' },
  ], ['The word names a difficulty.', 'It sits where a plant begins underground.', 'The phrase means the fundamental cause of an issue.'], ['PROBLEM sits at the root of a plant.', 'It is the “root of the problem.”']),
  candidate(163, 'family tree', '6 4', 'Easy', 'illustration', [
    { content: '', className: 'chapter-four-scene family-tree-scene', ariaLabel: 'A mature tree holding six framed portraits from three family generations' },
  ], ['The branches hold portraits rather than fruit.', 'The people belong to several generations.', 'Combine the relationship with the plant.'], ['A family’s portraits grow across the branches of a tree.', 'It is a “family tree.”']),
  candidate(164, 'turn over a new leaf', '4 4 1 3 4', 'Medium', 'icon', [
    { content: '🍂', className: 'draft-old-leaf' }, { content: '↻', className: 'draft-leaf-turn' }, { content: '🍃', className: 'draft-new-leaf', ariaLabel: 'An old brown leaf turning over into a fresh green leaf' },
  ], ['The first leaf is old and brown.', 'A turning arrow leads to a fresh green replacement.', 'The phrase means making a positive new start.'], ['An old leaf turns over and becomes a new one.', 'It shows “turn over a new leaf.”']),
  candidate(165, 'over the moon', '4 3 4', 'Easy', 'icon', [
    { content: '●', className: 'draft-moon-jumper' }, { content: '↷', className: 'draft-moon-arc' }, { content: '🌕', className: 'draft-over-moon', ariaLabel: 'A person following a curved path high over a full moon' },
  ], ['The small figure is travelling in a high arc.', 'It passes above a celestial object.', 'The phrase means being delighted.'], ['A person jumps over the moon.', 'They are “over the moon.”']),
]

type ChapterFiveSpec = {
  answer: string
  pattern: string
  visual: string
  description: string
  format?: Puzzle['format']
  difficulty?: Puzzle['difficulty']
}

const chapterFiveSpecs: ChapterFiveSpec[] = [
  { answer: 'fine print', pattern: '4 5', visual: 'PRINT', description: 'PRINT shown in exceptionally fine, compact lettering' },
  { answer: 'cross purposes', pattern: '5 8', visual: 'PURPOSE\n    ×\nPURPOSE', description: 'Two PURPOSE words crossing one another', difficulty: 'Hard' },
  { answer: 'double cross', pattern: '6 5', visual: 'CROSS  CROSS', description: 'CROSS shown twice' },
  { answer: 'toe the line', pattern: '3 3 4', visual: 'TOE\n────────────', description: 'TOE placed precisely against a line' },
  { answer: 'line of duty', pattern: '4 2 4', visual: 'D U T Y\n─────────', description: 'DUTY arranged along a line' },
  { answer: 'under cover', pattern: '5 5', visual: 'COVER\n──────\nUNDER', description: 'UNDER positioned beneath COVER' },
  { answer: 'upper case', pattern: '5 4', visual: 'CASE\n\n\n', description: 'CASE placed at the very top' },
  { answer: 'five star treatment', pattern: '4 4 9', visual: '★ ★ ★ ★ ★\nTREATMENT', description: 'TREATMENT presented beneath five stars' },
  { answer: 'below average', pattern: '5 7', visual: 'AVERAGE\n\n\nBELOW', description: 'BELOW positioned under AVERAGE' },
  { answer: 'back order', pattern: '4 5', visual: 'REDRO', description: 'ORDER written backwards', difficulty: 'Hard' },
  { answer: 'looking back', pattern: '7 4', visual: 'G N I K O O L  ←', description: 'LOOKING reversed and pointing back', difficulty: 'Hard' },
  { answer: 'repeat after me', pattern: '6 5 2', visual: 'ME   ME   ME   ME', description: 'ME followed by repeated copies' },
  { answer: 'above average', pattern: '5 7', visual: 'ABOVE\n\nAVERAGE', description: 'ABOVE positioned over AVERAGE', difficulty: 'Hard' },
  { answer: 'head in the sand', pattern: '4 2 3 4', visual: 'S A N D\n  HEAD\nS A N D', description: 'HEAD buried within SAND' },
  { answer: 'nowhere to be found', pattern: '7 2 2 5', visual: 'NO   WHERE\n\nFOUND?', description: 'FOUND is absent from NO WHERE', difficulty: 'Hard' },
  { answer: 'no turning back', pattern: '2 7 4', visual: 'BACK  ⛔  ↶', description: 'BACK blocked from turning', difficulty: 'Hard' },
  { answer: 'space invader', pattern: '5 7', visual: 'I N V A D E R', description: 'INVADER filled with extra space' },
  { answer: 'falling apart', pattern: '7 5', visual: 'FALLING                       APART', description: 'FALLING and APART widely separated' },
  { answer: 'a step ahead', pattern: '1 4 5', visual: 'STEP  →          AHEAD', description: 'A STEP moving AHEAD' },
  { answer: 'one step behind', pattern: '3 4 6', visual: 'AHEAD          1 STEP', description: 'One STEP behind AHEAD' },
  { answer: 'no strings attached', pattern: '2 7 8', visual: 'STRING               STRING', description: 'Loose strings not attached', difficulty: 'Hard' },
  { answer: 'missing the point', pattern: '7 3 5', visual: 'POIN_', description: 'POINT with its final letter missing' },
  { answer: 'mixed blessing', pattern: '5 8', visual: 'B L E S S I N G\nS S E B L I N G', description: 'The letters of BLESSING mixed up', difficulty: 'Hard' },
  { answer: 'a close call', pattern: '1 5 4', visual: 'CALLCALL', description: 'Two CALL words pressed close together' },
  { answer: 'think outside the box', pattern: '5 7 3 3', visual: 'THINK      ┌──────┐\n           │      │\n           └──────┘', description: 'THINK outside an empty box' },
  { answer: 'bull in a china shop', pattern: '4 2 1 5 4', visual: '', description: 'A realistic bull inside a delicate china shop', format: 'illustration' },
  { answer: 'crocodile tears', pattern: '9 5', visual: '', description: 'A crocodile shedding conspicuous tears', format: 'illustration' },
  { answer: 'snake in the grass', pattern: '5 2 3 5', visual: '', description: 'A snake concealed in dense grass', format: 'illustration' },
  { answer: 'fly on the wall', pattern: '3 2 3 4', visual: '', description: 'A realistic fly perched on a wall', format: 'illustration' },
  { answer: "bird's eye view", pattern: '5 3 4', visual: '', description: 'An eagle eye reflecting an aerial landscape', format: 'illustration', difficulty: 'Hard' },
  { answer: 'cat got your tongue', pattern: '3 3 4 6', visual: '', description: 'A cat physically holding a tongue-shaped speech ribbon', format: 'illustration' },
  { answer: 'butterflies in your stomach', pattern: '11 2 4 7', visual: '', description: 'Butterflies fluttering inside the stomach area', format: 'illustration' },
  { answer: 'ants in your pants', pattern: '4 2 4 5', visual: '', description: 'Ants crawling through a pair of trousers', format: 'illustration' },
  { answer: 'early bird catches the worm', pattern: '5 4 7 3 4', visual: '', description: 'A bird catching a worm at sunrise', format: 'illustration' },
  { answer: 'night owl', pattern: '5 3', visual: '', description: 'An owl perched before a crescent moon', format: 'illustration' },
  { answer: 'busy as a bee', pattern: '4 2 1 3', visual: '', description: 'A bee energetically working across honeycomb', format: 'illustration' },
  { answer: 'like a duck to water', pattern: '4 1 4 2 5', visual: '', description: 'A duck gliding effortlessly into water', format: 'illustration' },
  { answer: 'take the bull by the horns', pattern: '4 3 4 2 3 5', visual: '', description: 'Two hands firmly gripping a bull by both horns', format: 'illustration', difficulty: 'Hard' },
  { answer: 'feather in your cap', pattern: '7 2 4 3', visual: '', description: 'A feather physically tucked into a cap band', format: 'illustration' },
  { answer: 'pull a rabbit out of a hat', pattern: '4 1 6 3 2 1 3', visual: '', description: 'A magician pulling a rabbit from a top hat', format: 'illustration' },
  { answer: 'wild goose chase', pattern: '4 5 5', visual: '', description: 'A person urgently chasing a fleeing wild goose', format: 'illustration' },
  { answer: 'sitting duck', pattern: '7 4', visual: '', description: 'A duck literally seated on a wooden chair', format: 'illustration' },
  { answer: 'monkey on your back', pattern: '6 2 4 4', visual: '', description: 'A monkey clinging to a walking person’s back', format: 'illustration' },
  { answer: "lion's share", pattern: '5 5', visual: '', description: 'A lion beside an enormous share and a tiny remainder', format: 'illustration', difficulty: 'Hard' },
  { answer: 'horse of a different colour', pattern: '5 2 1 9 6', visual: '', description: 'One vivid blue horse among three brown horses', format: 'illustration' },
  { answer: 'first things first', pattern: '5 6 5', visual: 'FIRST\nTHINGS\nFIRST', description: 'FIRST appearing before THINGS' },
  { answer: 'last but not least', pattern: '4 3 3 5', visual: 'LAST   BUT NOT   LEAST', description: 'LEAST placed last and strongly emphasized' },
  { answer: 'zero tolerance', pattern: '4 9', visual: '0  TOLERANCE', description: 'Zero directly beside TOLERANCE' },
  { answer: 'the last straw', pattern: '3 4 5', visual: 'STRAW  STRAW  STRAW                 STRAW', description: 'One final straw isolated at the end' },
  { answer: 'the final countdown', pattern: '3 5 9', visual: '5   4   3   2   1', description: 'A countdown reaching its final number' },
]

const chapterFivePuzzles = chapterFiveSpecs.map((spec, index) => {
  const id = index + 166
  const subject = spec.answer.split(' ').filter((word) => word.length > 2).slice(-1)[0] ?? spec.answer
  return candidate(
    id,
    spec.answer,
    spec.pattern,
    spec.difficulty ?? 'Medium',
    spec.format ?? 'typography',
    [{ content: spec.visual, className: 'chapter-five-rebus', ariaLabel: spec.description }],
    [
      `Study the placement and relationship of every part.`,
      `The key idea is ${subject.toUpperCase()}, but its context changes the meaning.`,
      `Say the literal arrangement aloud as a familiar phrase.`,
    ],
    [spec.description + '.', `Together the elements represent “${spec.answer}.”`],
  )
})

const chapterSixSpecs: ChapterFiveSpec[] = [
  { answer: 'against the clock', pattern: '7 3 5', visual: 'AGAINST  ◷', description: 'AGAINST pressed directly against a clock face', difficulty: 'Hard' },
  { answer: 'in the nick of time', pattern: '2 3 4 2 4', visual: 'TIME\n   ˅\n   NICK', description: 'A tiny nick cut into the word TIME', difficulty: 'Hard' },
  { answer: 'split second', pattern: '5 6', visual: 'SEC   OND', description: 'The word SECOND split cleanly in two', difficulty: 'Hard' },
  { answer: 'the third degree', pattern: '3 5 6', visual: 'DEGREE  DEGREE  DEGREE', description: 'DEGREE shown for the third time', difficulty: 'Hard' },
  { answer: 'the four corners of the earth', pattern: '3 4 7 2 3 5', visual: 'EARTH                         EARTH\n\n\nEARTH                         EARTH', description: 'EARTH placed in all four corners', difficulty: 'Hard' },
  { answer: 'blank cheque', pattern: '5 6', visual: '┌──────────────────┐\n│                  │\n└──────────────────┘', description: 'A completely blank cheque-shaped form', difficulty: 'Hard' },
  { answer: 'paper trail', pattern: '5 5', visual: 'PAPER → PAPER → PAPER →', description: 'PAPER copies forming a trail', difficulty: 'Hard' },
  { answer: 'red tape', pattern: '3 4', visual: 'TAPE  TAPE  TAPE', description: 'The word TAPE presented as a red barrier', difficulty: 'Hard' },
  { answer: 'green light', pattern: '5 5', visual: '●\nLIGHT', description: 'LIGHT beneath a green signal', difficulty: 'Hard' },
  { answer: 'grey area', pattern: '4 4', visual: '░░░  AREA  ░░░', description: 'AREA surrounded by a grey field', difficulty: 'Hard' },
  { answer: 'blue blood', pattern: '4 5', visual: 'B L O O D', description: 'BLOOD rendered in deep blue', difficulty: 'Hard' },
  { answer: 'purple patch', pattern: '6 5', visual: '┌─────────┐\n│  PATCH  │\n└─────────┘', description: 'PATCH contained inside a purple patch', difficulty: 'Hard' },
  { answer: 'an open book', pattern: '2 4 4', visual: 'BOOK   ↔   BOOK', description: 'BOOK opened into two separated halves', difficulty: 'Hard' },
  { answer: 'a closed book', pattern: '1 6 4', visual: '[BOOK]', description: 'BOOK tightly enclosed and shut', difficulty: 'Hard' },
  { answer: 'bookworm', pattern: '8', visual: 'BOO〰K', description: 'A worm winding physically through BOOK', difficulty: 'Hard' },
  { answer: 'page turner', pattern: '4 6', visual: 'PAGE  ↻', description: 'PAGE visibly turning', difficulty: 'Hard' },
  { answer: 'chapter and verse', pattern: '7 3 5', visual: 'CHAPTER\n   &\nVERSE', description: 'CHAPTER joined directly to VERSE', difficulty: 'Hard' },
  { answer: 'read the room', pattern: '4 3 4', visual: '┌────────────┐\n│    READ    │\n└────────────┘', description: 'READ positioned inside a room', difficulty: 'Hard' },
  { answer: 'draw a blank', pattern: '4 1 5', visual: 'DRAW → __________', description: 'DRAW points to an empty blank', difficulty: 'Hard' },
  { answer: 'fill in the blanks', pattern: '4 2 3 6', visual: 'BL__NKS\n  FILL', description: 'FILL inserted into incomplete BLANKS', difficulty: 'Hard' },
  { answer: 'bridge the gap', pattern: '6 3 3', visual: 'GAP ── BRIDGE ── GAP', description: 'BRIDGE spanning the space between two GAP words', difficulty: 'Hard' },
  { answer: 'the road less travelled', pattern: '3 4 4 9', visual: 'ROAD ROAD ROAD ROAD\n          ROAD', description: 'One ROAD travels away from the busy route', difficulty: 'Hard' },
  { answer: 'end of the road', pattern: '3 2 3 4', visual: 'ROAD ROAD ROAD ⛔', description: 'A road stopping at a definite end', difficulty: 'Hard' },
  { answer: 'a bumpy road', pattern: '1 5 4', visual: 'R O\n   A D', description: 'ROAD arranged over uneven bumps', difficulty: 'Hard' },
  { answer: 'the middle of the road', pattern: '3 6 2 3 4', visual: 'RO   MIDDLE   AD', description: 'MIDDLE positioned inside ROAD', difficulty: 'Hard' },
  { answer: 'off the beaten track', pattern: '3 3 6 5', visual: 'TRACK TRACK TRACK\n                 OFF', description: 'OFF separated from a repeatedly beaten TRACK', difficulty: 'Hard' },
  { answer: 'in for the long haul', pattern: '2 3 3 4 4', visual: 'HAUL ─────────────────────────→', description: 'HAUL extended across an unusually long distance', difficulty: 'Hard' },
  { answer: 'take a shortcut', pattern: '4 1 8', visual: 'SHORT\n  CUT', description: 'CUT taking a short route through SHORT', difficulty: 'Hard' },
  { answer: 'dead end', pattern: '4 3', visual: 'END  ✕', description: 'END terminated with a dead stop', difficulty: 'Hard' },
  { answer: 'speak of the devil', pattern: '5 2 3 5', visual: 'SPEAK → DEVIL', description: 'SPEAK directly summons DEVIL', difficulty: 'Hard' },
  { answer: 'at the eleventh hour', pattern: '2 3 8 4', visual: '◷  11', description: 'A clock poised precisely at the eleventh hour', difficulty: 'Hard' },
  { answer: 'behind the times', pattern: '6 3 5', visual: 'TIMES      BEHIND', description: 'BEHIND trailing the word TIMES', difficulty: 'Hard' },
  { answer: 'two timing', pattern: '3 6', visual: 'TIMING     TIMING', description: 'TIMING appearing twice', difficulty: 'Hard' },
  { answer: 'day in day out', pattern: '3 2 3 3', visual: 'DAY [DAY] OUT', description: 'One DAY inside while another is out', difficulty: 'Hard' },
  { answer: 'week in week out', pattern: '4 2 4 3', visual: 'WEEK [WEEK] OUT', description: 'One WEEK inside while another is out', difficulty: 'Hard' },
  { answer: 'a month of sundays', pattern: '1 5 2 7', visual: 'SUN SUN SUN SUN\nSUN SUN SUN SUN', description: 'A whole month represented only by Sundays', difficulty: 'Hard' },
  { answer: 'the year dot', pattern: '3 4 3', visual: 'YEAR  •', description: 'YEAR reduced to a tiny dot', difficulty: 'Hard' },
  { answer: 'once upon a time', pattern: '4 4 1 4', visual: 'ONCE\nTIME', description: 'ONCE positioned upon TIME', difficulty: 'Hard' },
  { answer: 'time on your hands', pattern: '4 2 4 5', visual: 'TIME   🤲', description: 'TIME resting on a pair of hands', difficulty: 'Hard' },
  { answer: 'beat the clock', pattern: '4 3 5', visual: 'BEAT → ◷', description: 'BEAT racing ahead of a clock', difficulty: 'Hard' },
  { answer: 'a cloud on the horizon', pattern: '1 5 2 3 7', visual: '', description: 'A dark cloud sitting directly on a distant horizon', format: 'illustration', difficulty: 'Hard' },
  { answer: 'the writing on the wall', pattern: '3 7 2 3 4', visual: '', description: 'Mysterious writing physically appearing on an old wall', format: 'illustration', difficulty: 'Hard' },
  { answer: 'born with a silver spoon', pattern: '4 4 1 6 5', visual: '', description: 'A newborn baby holding a genuine silver spoon', format: 'illustration', difficulty: 'Hard' },
  { answer: 'golden handshake', pattern: '6 9', visual: '', description: 'Two polished golden hands completing a handshake', format: 'illustration', difficulty: 'Hard' },
  { answer: 'rule with an iron fist', pattern: '4 4 2 4 4', visual: '', description: 'A powerful clenched fist forged entirely from iron', format: 'illustration', difficulty: 'Hard' },
  { answer: 'nerves of steel', pattern: '6 2 5', visual: '', description: 'A human nervous system formed from steel cables', format: 'illustration', difficulty: 'Hard' },
  { answer: 'glass ceiling', pattern: '5 7', visual: '', description: 'A professional physically blocked by a transparent glass ceiling', format: 'illustration', difficulty: 'Hard' },
  { answer: 'burning bridges', pattern: '7 7', visual: '', description: 'A traveller walking away from a bridge burning behind them', format: 'illustration', difficulty: 'Hard' },
  { answer: 'a trip down memory lane', pattern: '1 4 4 6 4', visual: '', description: 'A winding lane paved with glowing personal memories', format: 'illustration', difficulty: 'Hard' },
  { answer: 'pot calling the kettle black', pattern: '3 7 3 6 5', visual: '', description: 'A blackened pot accusing an equally black kettle', format: 'illustration', difficulty: 'Hard' },
  { answer: 'a bird in the hand', pattern: '1 4 2 3 4', visual: '', description: 'A small bird perched securely in an open human palm', format: 'illustration', difficulty: 'Medium' },
  { answer: 'break the ice', pattern: '5 3 3', visual: '', description: 'A pickaxe splitting a solid block of ice apart', format: 'illustration', difficulty: 'Medium' },
  { answer: 'walking on eggshells', pattern: '7 2 9', visual: '', description: 'Careful feet tiptoeing across a fragile path of eggshells', format: 'illustration', difficulty: 'Medium' },
  { answer: 'all your eggs in one basket', pattern: '3 4 4 2 3 6', visual: '', description: 'Every egg packed into one single basket', format: 'illustration', difficulty: 'Medium' },
  { answer: 'couch potato', pattern: '5 6', visual: '', description: 'A relaxed potato lounging on a sofa with a remote control', format: 'illustration', difficulty: 'Medium' },
  { answer: 'cherry on top', pattern: '6 2 3', visual: '  🍒\n  TOP', description: 'A cherry positioned directly on top of TOP', difficulty: 'Medium' },
  { answer: 'go bananas', pattern: '2 7', visual: 'GO  →  🍌 🍌 🍌', description: 'GO heads directly toward a group of bananas', difficulty: 'Medium' },
  { answer: 'hot potato', pattern: '3 6', visual: 'POT🔥ATO', description: 'A flame makes the middle of POTATO visibly hot', difficulty: 'Medium' },
  { answer: 'packed like sardines', pattern: '6 4 8', visual: 'SARDINE\nSARDINE\nSARDINE\nSARDINE', description: 'Four SARDINE words packed tightly together', difficulty: 'Hard' },
  { answer: 'bigger fish to fry', pattern: '6 4 2 3', visual: '      FISH\n   fish  →  FRY', description: 'A small fish is passed over for a much bigger FISH beside FRY', difficulty: 'Hard' },
  { answer: 'bee in your bonnet', pattern: '3 2 4 6', visual: 'BONN  🐝  ET', description: 'A bee sits inside the word BONNET', difficulty: 'Hard' },
  { answer: "straight from the horse's mouth", pattern: '8 4 3 6 5', visual: '🐴  →→→  MOUTH', description: 'A straight arrow runs from a horse directly to MOUTH', difficulty: 'Hard' },
  { answer: 'all over the place', pattern: '3 4 3 5', visual: 'ALL              ALL\n        PLACE\n   ALL        ALL', description: 'ALL appears scattered over every part of the space around PLACE', difficulty: 'Hard' },
  { answer: 'long story short', pattern: '4 5 5', visual: 'STOOOOOOOOORY\n      short', description: 'STORY is stretched unusually long while SHORT is tiny', difficulty: 'Hard' },
  { answer: 'history repeats itself', pattern: '7 7 6', visual: 'HISTORY\n   HISTORY\n      HISTORY', description: 'HISTORY repeatedly follows copies of itself', difficulty: 'Hard' },
  { answer: 'unfinished business', pattern: '10 8', visual: 'BUSINE__', description: 'The word BUSINESS is visibly left unfinished', difficulty: 'Hard' },
  { answer: 'put two and two together', pattern: '3 3 3 3 8', visual: '2        2\n   ↘  ↙\n     22', description: 'Two separate twos are being brought together', difficulty: 'Hard' },
  { answer: 'one thing after another', pattern: '3 5 5 7', visual: 'THING  →  THING  →  THING', description: 'One THING follows directly after another', difficulty: 'Hard' },
  { answer: 'the last laugh', pattern: '3 4 5', visual: 'ha   ha   ha   HA!', description: 'The final laugh in a row is strongly emphasised', difficulty: 'Hard' },
  { answer: 'play on words', pattern: '4 2 5', visual: '   PLAY\nWORDS WORDS', description: 'PLAY rests physically on top of WORDS', difficulty: 'Hard' },
  { answer: 'word for word', pattern: '4 3 4', visual: 'WORD   4   WORD', description: 'WORD appears on either side of the number four', difficulty: 'Hard' },
  { answer: 'lost for words', pattern: '4 3 5', visual: 'WORDS  →  W   R   S  →  ?', description: 'The letters of WORDS become lost and scattered', difficulty: 'Hard' },
  { answer: 'mind the gap', pattern: '4 3 3', visual: 'G    MIND    AP', description: 'MIND occupies a deliberate gap inside the word GAP', difficulty: 'Hard' },
  { answer: 'business before pleasure', pattern: '8 6 8', visual: 'BUSINESS\n   ↓\nPLEASURE', description: 'BUSINESS is placed before and above PLEASURE', difficulty: 'Hard' },
  { answer: 'all in the same boat', pattern: '3 2 3 4 4', visual: '   / ALL ALL ALL \\\n  /_______________\\\n       ~  ~  ~', description: 'Every ALL is contained inside one boat', difficulty: 'Hard' },
  { answer: 'rock the boat', pattern: '4 3 4', visual: '      ROCK\n   ___/BOAT\\___\n  ~~~       ~~~', description: 'A heavy ROCK is unbalancing a boat', difficulty: 'Hard' },
  { answer: 'miss the boat', pattern: '4 3 4', visual: 'MISS  · · ·         ⛵', description: 'MISS has been left far behind a departing boat', difficulty: 'Hard' },
  { answer: 'make waves', pattern: '4 5', visual: 'MAKE  →  ~∿~∿~∿~', description: 'MAKE points to newly formed waves', difficulty: 'Hard' },
  { answer: 'sink or swim', pattern: '4 2 4', visual: 'SWIM  ~~~~~\n       SINK\n        ↓', description: 'SWIM stays on the waterline while SINK drops beneath it', difficulty: 'Hard' },
  { answer: 'test the waters', pattern: '4 3 6', visual: '      TEST\n~~~~ WATERS ~~~~', description: 'TEST cautiously touches the surface of WATERS', difficulty: 'Hard' },
  { answer: 'go with the flow', pattern: '2 4 3 4', visual: 'FLOW → GO → FLOW →', description: 'GO moves in the same direction as the surrounding FLOW', difficulty: 'Hard' },
  { answer: 'keep your head above water', pattern: '4 4 4 5 5', visual: '       HEAD\n~~~~~~~ WATER ~~~~~~~', description: 'HEAD remains just above the waterline', difficulty: 'Hard' },
  { answer: 'in hot water', pattern: '2 3 5', visual: '~~~~~\n~ HOT ~\n~WATER~\n~~~~~', description: 'HOT is submerged inside WATER', difficulty: 'Hard' },
  { answer: 'weather the storm', pattern: '7 3 5', visual: '☀  WEATHER  ⚡\n   ☂  ☁  ☂', description: 'WEATHER holds its position through storm symbols', difficulty: 'Hard' },
  { answer: 'cry me a river', pattern: '3 2 1 5', visual: 'CRY   😢\n      ↓↓↓\n~~~~~~~~~~~~', description: 'A single cry grows into a flowing river of tears', difficulty: 'Hard' },
  { answer: 'dark horse', pattern: '4 5', visual: 'HORSE', description: 'HORSE is shown almost completely dark', difficulty: 'Hard' },
  { answer: 'like a bull at a gate', pattern: '4 1 4 2 1 4', visual: '🐂  →→→  ║GATE║', description: 'A charging bull rushes directly at a closed gate', difficulty: 'Hard' },
  { answer: 'lock horns', pattern: '4 5', visual: '  ) LOCK (\n  )      (', description: 'LOCK is trapped tightly between two interlocking horns', difficulty: 'Hard' },
  { answer: 'king of the jungle', pattern: '4 2 3 6', visual: '    👑\n🌿  🦁  🌿\n  JUNGLE', description: 'A crowned lion rules from the centre of the jungle', difficulty: 'Hard' },
  { answer: 'make a beeline', pattern: '4 1 7', visual: '🐝 ─────────→', description: 'A bee travels along one perfectly straight line', difficulty: 'Hard' },
  { answer: 'no flies on me', pattern: '2 5 2 2', visual: '🪰   🪰       ME       🪰   🪰', description: 'Every fly stays away from ME with none landing on it', difficulty: 'Hard' },
  { answer: 'social butterfly', pattern: '6 9', visual: 'YOU   🦋   ME\n   US   THEM', description: 'A butterfly moves among a social group', difficulty: 'Hard' },
  { answer: 'short end of the stick', pattern: '5 3 2 3 5', visual: '━━━━━━━━━━━━━━┯━━', description: 'One end of a divided stick is much shorter than the other', difficulty: 'Hard' },
  { answer: 'in a nutshell', pattern: '2 1 8', visual: '   / NUT \\\n  ( SHELL )\n   \\_____/', description: 'NUT is enclosed within a shell', difficulty: 'Hard' },
  { answer: "steal someone's thunder", pattern: '5 8 7', visual: 'SOMEONE   ⚡ THUNDER ⚡   ←', description: 'THUNDER is visibly being pulled away from SOMEONE', difficulty: 'Hard' },
  { answer: 'lightning never strikes twice', pattern: '9 5 7 5', visual: '⚡  X\n\n⚡              X', description: 'Two lightning bolts deliberately strike different targets', difficulty: 'Hard' },
  { answer: 'a bolt from the blue', pattern: '1 4 4 3 4', visual: 'BLUE BLUE BLUE\n      ⚡\n       ↓', description: 'A sudden bolt drops directly from a field of BLUE', difficulty: 'Hard' },
  { answer: 'a face like thunder', pattern: '1 4 4 7', visual: '☁  😠  ☁\n   ⚡ ⚡', description: 'An angry face is surrounded by thunderclouds and lightning', difficulty: 'Hard' },
  { answer: 'snowed under', pattern: '6 5', visual: '❄ ❄ ❄ ❄ ❄\n❄  UNDER  ❄\n❄ ❄ ❄ ❄ ❄', description: 'UNDER is buried beneath heavy snow', difficulty: 'Hard' },
  { answer: 'come rain or shine', pattern: '4 4 2 5', visual: '☔  ← COME →  ☀', description: 'COME points equally toward rain and sunshine', difficulty: 'Hard' },
]

const chapterSixPuzzles = chapterSixSpecs.map((spec, index) => candidate(
  index + 216,
  spec.answer,
  spec.pattern,
  spec.difficulty ?? 'Hard',
  spec.format ?? 'typography',
  [{ content: spec.visual, className: 'chapter-five-rebus', ariaLabel: spec.description }],
  [
    'Study both the object or word and its exact placement.',
    'More than one visual relationship contributes to the answer.',
    'Describe the complete arrangement as a familiar expression.',
  ],
  [spec.description + '.', `Together the elements represent “${spec.answer}.”`],
))

const chapterSevenSpecs: ChapterFiveSpec[] = [
  { answer: 'hole in one', pattern: '4 2 3', visual: '', description: 'A golf ball lodged in a circular hole cut through a large numeral one', format: 'illustration', difficulty: 'Hard' },
  { answer: 'ace up your sleeve', pattern: '3 2 4 6', visual: '', description: 'An ace playing card tucked upward inside a jacket sleeve', format: 'illustration', difficulty: 'Hard' },
  { answer: 'cards on the table', pattern: '5 2 3 5', visual: 'CARD  CARD  CARD\n════════ TABLE ════════', description: 'Three CARD words resting directly on a table surface', difficulty: 'Hard' },
  { answer: 'house of cards', pattern: '5 2 5', visual: '', description: 'A complete house carefully constructed from playing cards', format: 'illustration', difficulty: 'Hard' },
  { answer: 'deal breaker', pattern: '4 7', visual: 'DE  /  AL', description: 'The word DEAL is visibly broken through its middle', difficulty: 'Hard' },
  { answer: 'blessing in disguise', pattern: '8 2 8', visual: 'DISG  BLESSING  UISE', description: 'BLESSING is concealed inside the word DISGUISE', difficulty: 'Hard' },
  { answer: 'worth your weight in gold', pattern: '5 4 6 2 4', visual: 'WORTH  ⚖  GOLD\n          GOLD', description: 'WORTH balances against a heavy double stack of GOLD', difficulty: 'Hard' },
  { answer: 'heart of gold', pattern: '5 2 4', visual: 'G O L ♥ D', description: 'A heart forms the glowing centre of GOLD', difficulty: 'Hard' },
  { answer: 'golden opportunity', pattern: '6 11', visual: 'OPPORTUNITY', description: 'OPPORTUNITY is presented in a brilliant golden colour', difficulty: 'Hard' },
  { answer: 'strike gold', pattern: '6 4', visual: 'STRIKE  ⛏  GOLD', description: 'STRIKE drives a pickaxe directly into GOLD', difficulty: 'Hard' },
  { answer: 'roll out the red carpet', pattern: '4 3 3 3 6', visual: 'ROLL  →  ▰▰▰▰▰▰▰', description: 'ROLL unfurls a long red carpet outward', difficulty: 'Hard' },
  { answer: 'paint the town red', pattern: '5 3 4 3', visual: 'T  O  W  N', description: 'Every letter of TOWN has been painted vivid red', difficulty: 'Hard' },
  { answer: 'red letter day', pattern: '3 6 3', visual: 'MON  TUE  WED\nTHU  DAY  SAT', description: 'One DAY in a calendar row is made from bright red letters', difficulty: 'Hard' },
  { answer: 'caught between the devil and the deep blue sea', pattern: '6 7 3 5 3 3 4 4 3', visual: '', description: 'A person trapped precisely between a devil and the edge of a deep blue sea', format: 'illustration', difficulty: 'Hard' },
  { answer: 'out of the frying pan into the fire', pattern: '3 2 3 6 3 4 3 4', visual: 'PAN  →→  🔥\n  OUT      INTO', description: 'OUT leaves a frying pan and moves directly INTO fire', difficulty: 'Hard' },
  { answer: 'open a can of worms', pattern: '4 1 3 2 5', visual: '', description: 'A newly opened can releasing a tangled collection of worms', format: 'illustration', difficulty: 'Hard' },
  { answer: 'bite off more than you can chew', pattern: '4 3 4 4 3 3 4', visual: 'BITE  →  ███████████\n          chew', description: 'A small BITE faces far more food than can be chewed', difficulty: 'Hard' },
  { answer: 'once bitten twice shy', pattern: '4 6 5 3', visual: 'BITE      SHY  SHY', description: 'One BITE is followed by SHY appearing twice', difficulty: 'Hard' },
  { answer: 'fat chance', pattern: '3 6', visual: 'CHANCE', description: 'CHANCE is stretched unusually wide and heavy', difficulty: 'Hard' },
  { answer: 'slim chance', pattern: '4 6', visual: 'CHANCE', description: 'CHANCE is squeezed into an extremely thin form', difficulty: 'Hard' },
  { answer: 'against all odds', pattern: '7 3 4', visual: '1  3  5  AGAINST  7  9', description: 'AGAINST stands in opposition to every odd number', difficulty: 'Hard' },
  { answer: 'odds and ends', pattern: '4 3 4', visual: '1  3  5     END     7  9', description: 'Odd numbers appear on both ends around END', difficulty: 'Hard' },
  { answer: 'at sixes and sevens', pattern: '2 5 3 6', visual: '6  7  6  7\n7  6  7  6', description: 'Sixes and sevens are mixed into a disordered arrangement', difficulty: 'Hard' },
  { answer: 'dressed to the nines', pattern: '7 2 3 5', visual: '9  9  9\n  👔\n9  9  9', description: 'Formal clothing is surrounded and dressed by nines', difficulty: 'Hard' },
  { answer: 'perfect ten', pattern: '7 3', visual: '1  2  3  4  5\n6  7  8  9  ⑩', description: 'The tenth number alone is presented as flawless and complete', difficulty: 'Hard' },
  { answer: 'two sides of the same coin', pattern: '3 5 2 3 4 4', visual: 'HEADS  ◉  TAILS\n       SAME', description: 'HEADS and TAILS occupy opposite sides of the very same coin', difficulty: 'Hard' },
  { answer: 'a penny for your thoughts', pattern: '1 5 3 4 8', visual: 'THOUGHTS  ←  1¢', description: 'A single penny is being offered directly for THOUGHTS', difficulty: 'Hard' },
  { answer: 'cost an arm and a leg', pattern: '4 2 3 3 1 3', visual: 'COST  =  💪  +  🦵', description: 'The COST is shown as equal to one arm plus one leg', difficulty: 'Hard' },
  { answer: 'pull your leg', pattern: '4 4 3', visual: 'PULL  ←────  🦵', description: 'PULL tugs a leg toward itself', difficulty: 'Hard' },
  { answer: 'stand on your own two feet', pattern: '5 2 4 3 3 4', visual: '   STAND\n  🦶  🦶', description: 'STAND is balanced independently on exactly two feet', difficulty: 'Hard' },
  { answer: 'shoulder to shoulder', pattern: '8 2 8', visual: 'SHOULDER▌▐SHOULDER', description: 'Two SHOULDER words press directly against each other', difficulty: 'Hard' },
  { answer: 'lend a hand', pattern: '4 1 4', visual: 'LEND  →  🤝', description: 'LEND passes a helping hand outward', difficulty: 'Hard' },
  { answer: 'hands down', pattern: '5 4', visual: '🤲  🤲\n   ↓  ↓\n   DOWN', description: 'Two hands point and move downward toward DOWN', difficulty: 'Hard' },
  { answer: 'hands are tied', pattern: '5 3 4', visual: '🤜──KNOT──🤛', description: 'Two hands are visibly joined by a tight knot', difficulty: 'Hard' },
  { answer: 'add insult to injury', pattern: '3 6 2 6', visual: 'INSULT\n   +\nINJURY', description: 'INSULT is literally added on top of INJURY', difficulty: 'Hard' },
  { answer: 'rub salt in the wound', pattern: '3 4 2 3 5', visual: 'SALT  ↘\n    WOUND', description: 'SALT is being directed into a WOUND', difficulty: 'Hard' },
  { answer: 'finger on the pulse', pattern: '6 2 3 5', visual: '☝\nPULSE 〰〰〰', description: 'A finger rests directly on a visible pulse line', difficulty: 'Hard' },
  { answer: 'crossed fingers', pattern: '7 7', visual: '🤞     🤞', description: 'Two clearly crossed-finger gestures appear together', difficulty: 'Hard' },
  { answer: 'rule of thumb', pattern: '4 2 5', visual: '📏  👍', description: 'A measuring rule sits directly beside a thumb', difficulty: 'Hard' },
  { answer: 'leave no stone unturned', pattern: '5 2 5 8', visual: 'STONE  ↻  STONE  ↻  STONE', description: 'Every single STONE has been turned around', difficulty: 'Hard' },
  { answer: 'push the envelope', pattern: '4 3 8', visual: 'PUSH  →  ✉  →→', description: 'PUSH drives an envelope beyond its normal boundary', difficulty: 'Hard' },
  { answer: 'back to the drawing board', pattern: '4 2 3 7 5', visual: 'BOARD  ⟲\n✎  DRAW', description: 'DRAW is sent back around to its board', difficulty: 'Hard' },
  { answer: 'off the charts', pattern: '3 3 6', visual: 'CHART  CHART  CHART\n                    OFF', description: 'OFF has travelled beyond the end of the charts', difficulty: 'Hard' },
  { answer: 'go the extra mile', pattern: '2 3 5 4', visual: 'MILE  MILE  MILE  +MILE\n                  GO →', description: 'GO continues beyond the normal miles into one extra mile', difficulty: 'Hard' },
  { answer: 'take a rain check', pattern: '4 1 4 5', visual: 'TAKE  ←  ☔  ✓', description: 'TAKE receives a check marked with rain', difficulty: 'Hard' },
  { answer: 'clear as mud', pattern: '5 2 3', visual: 'CLEAR', description: 'The word CLEAR is obscured by a muddy brown appearance', difficulty: 'Hard' },
  { answer: 'show your true colours', pattern: '4 4 4 7', visual: 'TRUE\nC O L O U R S', description: 'TRUE reveals a full spread of differently coloured letters', difficulty: 'Hard' },
  { answer: 'paper over the cracks', pattern: '5 4 3 6', visual: '      PAPER\n──────╱╲──────', description: 'PAPER is placed directly over a crack in the surface', difficulty: 'Hard' },
  { answer: 'jump the gun', pattern: '4 3 3', visual: '      JUMP\n       ↑\n────── 🔫 ──────', description: 'JUMP has leapt above and ahead of a starting gun', difficulty: 'Hard' },
  { answer: 'a shot in the dark', pattern: '1 4 2 3 4', visual: 'D A R K\n  ✦ SHOT ✦\nD A R K', description: 'SHOT is almost hidden inside a dark field', difficulty: 'Hard' },
  { answer: 'the grass is greener on the other side', pattern: '3 5 2 7 2 3 5 4', visual: '', description: 'A fence separates dull near-side grass from lush green grass on the other side', format: 'illustration', difficulty: 'Hard' },
  { answer: 'sitting on the fence', pattern: '7 2 3 5', visual: '   SITTING\n━━━━ FENCE ━━━━', description: 'SITTING rests directly on top of a fence', difficulty: 'Hard' },
  { answer: 'mend fences', pattern: '4 6', visual: 'FEN  ← MEND →  CES', description: 'MEND pulls the two broken halves of FENCES back together', difficulty: 'Hard' },
  { answer: 'move the goalposts', pattern: '4 3 9', visual: '←  |     GOAL     |  →', description: 'The two goalposts are visibly moving farther apart', difficulty: 'Hard' },
  { answer: 'the ball is in your court', pattern: '3 4 2 2 4 5', visual: '', description: 'A tennis ball positioned clearly inside a marked court', format: 'illustration', difficulty: 'Hard' },
  { answer: 'drop the ball', pattern: '4 3 4', visual: 'DROP\n  ↓\n  ●', description: 'A ball is visibly dropping away from DROP', difficulty: 'Hard' },
  { answer: 'keep your eye on the ball', pattern: '4 4 3 2 3 4', visual: '  👁\n  ↓\n  ●', description: 'An eye remains focused directly on a ball below', difficulty: 'Hard' },
  { answer: 'a whole new ball game', pattern: '1 5 3 4 4', visual: 'OLD GAME  →  ● NEW GAME', description: 'An entirely new ball introduces a different game', difficulty: 'Hard' },
  { answer: 'cover all bases', pattern: '5 3 5', visual: '      COVER\nBASE  BASE  BASE', description: 'COVER stretches across every BASE below it', difficulty: 'Hard' },
  { answer: 'touch base', pattern: '5 4', visual: 'TOUCHBASE', description: 'TOUCH and BASE make direct contact with no gap', difficulty: 'Hard' },
  { answer: 'the home stretch', pattern: '3 4 7', visual: 'H   O   M   E', description: 'HOME is stretched across an unusually wide distance', difficulty: 'Hard' },
  { answer: 'hit home', pattern: '3 4', visual: 'HO  HIT  ME', description: 'HIT lands directly inside HOME', difficulty: 'Hard' },
  { answer: 'home away from home', pattern: '4 4 4 4', visual: 'HOME      AWAY      HOME', description: 'AWAY sits between one HOME and another HOME', difficulty: 'Hard' },
  { answer: 'bring home the bacon', pattern: '5 4 3 5', visual: 'BRING  →  H🥓ME', description: 'BRING carries bacon directly into HOME', difficulty: 'Hard' },
  { answer: 'get your foot in the door', pattern: '3 4 4 2 3 4', visual: 'D  🦶  OOR', description: 'A foot is wedged inside the word DOOR', difficulty: 'Hard' },
  { answer: 'show someone the door', pattern: '4 7 3 4', visual: 'SHOW  SOMEONE  →  🚪', description: 'SHOW directs SOMEONE toward a door', difficulty: 'Hard' },
  { answer: 'when one door closes another opens', pattern: '4 3 4 6 7 5', visual: '', description: 'One door closes as a different neighbouring door opens into light', format: 'illustration', difficulty: 'Hard' },
  { answer: 'open doors', pattern: '4 5', visual: 'DO     ORS', description: 'The word DOORS is opened into two separated halves', difficulty: 'Hard' },
  { answer: 'revolving door', pattern: '9 4', visual: 'DOOR  ↻  DOOR  ↻', description: 'DOOR repeatedly revolves around a circular direction', difficulty: 'Hard' },
  { answer: 'throw caution to the wind', pattern: '5 7 2 3 4', visual: 'THROW  CAUTION  →→→  〰', description: 'THROW sends CAUTION away into a strong wind', difficulty: 'Hard' },
  { answer: 'wind in your sails', pattern: '4 2 4 5', visual: 'SA  WIND  ILS', description: 'WIND sits inside the word SAILS', difficulty: 'Hard' },
  { answer: 'take the wind out of your sails', pattern: '4 3 4 3 2 4 5', visual: 'WIND  ← TAKE      SAILS', description: 'TAKE pulls WIND completely out and away from SAILS', difficulty: 'Hard' },
  { answer: 'change of heart', pattern: '6 2 5', visual: 'HE  CHANGE  ART', description: 'CHANGE has replaced the centre of HEART', difficulty: 'Hard' },
  { answer: 'heart in your mouth', pattern: '5 2 4 5', visual: '(   ♥   )', description: 'A heart is enclosed inside a mouth-shaped outline', difficulty: 'Hard' },
  { answer: 'heart skips a beat', pattern: '5 5 1 4', visual: '♥  ♫  ♥     ♥  ♫  ♥', description: 'One heart sequence visibly skips a beat in its rhythm', difficulty: 'Hard' },
  { answer: 'from the bottom of your heart', pattern: '4 3 6 2 4 5', visual: '   ♥\n   ♥\nBOTTOM', description: 'The source of the hearts begins at the word BOTTOM', difficulty: 'Hard' },
  { answer: 'heavy heart', pattern: '5 5', visual: '  ███\n  ███\n   ♥\n  ↓↓↓', description: 'A large heavy weight presses down on a heart', difficulty: 'Hard' },
  { answer: 'blood is thicker than water', pattern: '5 2 7 4 5', visual: '', description: 'Dense thick red liquid contrasted against freely flowing clear water', format: 'illustration', difficulty: 'Hard' },
  { answer: 'blood sweat and tears', pattern: '5 5 3 5', visual: '🩸  BLOOD\n💧  SWEAT\n💧  TEARS', description: 'BLOOD, SWEAT and TEARS each appear as physical drops', difficulty: 'Hard' },
  { answer: 'blue in the face', pattern: '4 2 3 4', visual: 'F A C E', description: 'The entire FACE is rendered in an intense blue colour', difficulty: 'Hard' },
  { answer: 'tickled pink', pattern: '7 4', visual: '〰  PINK  〰', description: 'PINK is surrounded by light tickling marks', difficulty: 'Hard' },
  { answer: 'black and white', pattern: '5 3 5', visual: 'BLACK  │  WHITE', description: 'BLACK and WHITE occupy stark opposing halves', difficulty: 'Hard' },
  { answer: 'black mark', pattern: '5 4', visual: 'MARK', description: 'MARK is rendered as a deep black blemish', difficulty: 'Hard' },
  { answer: 'white as a sheet', pattern: '5 2 1 5', visual: '▱  SHEET  ▱', description: 'SHEET is almost completely white against a pale surface', difficulty: 'Hard' },
  { answer: 'raise the white flag', pattern: '5 3 5 4', visual: '    ⚑\n    ↑\n  RAISE', description: 'RAISE lifts a white flag high above itself', difficulty: 'Hard' },
  { answer: 'hit the roof', pattern: '3 3 4', visual: '      HIT\n     ↑↑↑\n   ╱────╲', description: 'HIT travels upward and strikes a roof', difficulty: 'Hard' },
  { answer: 'break new ground', pattern: '5 3 6', visual: 'GRO  BREAK  UND', description: 'BREAK creates a new opening directly in GROUND', difficulty: 'Hard' },
  { answer: 'stand your ground', pattern: '5 4 6', visual: '   STAND\n════════ GROUND ════════', description: 'STAND holds firmly on top of GROUND', difficulty: 'Hard' },
  { answer: 'common ground', pattern: '6 6', visual: 'YOU      ME\n━━━ COMMON ━━━', description: 'YOU and ME share COMMON on the same ground line', difficulty: 'Hard' },
  { answer: 'keep your ear to the ground', pattern: '4 4 3 2 3 6', visual: 'KEEP\n   👂\n════════════\n  GROUND', description: 'KEEP holds an ear directly against the ground line', difficulty: 'Hard' },
  { answer: 'tip the scales', pattern: '3 3 6', visual: 'TIP  →  ⚖', description: 'TIP forces a balanced scale to lean', difficulty: 'Hard' },
  { answer: 'hanging by a thread', pattern: '7 2 1 6', visual: '', description: 'A key suspended precariously from one thin fraying thread', format: 'illustration', difficulty: 'Hard' },
  { answer: 'lose the plot', pattern: '4 3 4', visual: 'P  L  ?  T', description: 'One essential part of PLOT has been lost', difficulty: 'Hard' },
  { answer: 'the plot thickens', pattern: '3 4 8', visual: 'PLOT\nPPLLOOTT\nPPPPLLLLOOOOTTTT', description: 'PLOT becomes progressively thicker on each line', difficulty: 'Hard' },
  { answer: 'steal the show', pattern: '5 3 4', visual: 'STEAL  ←  SHOW', description: 'STEAL pulls SHOW away from its position', difficulty: 'Hard' },
  { answer: 'the show must go on', pattern: '3 4 4 2 2', visual: 'SHOW  →  ON  →  ON  →', description: 'SHOW continues moving onward through repeated ON words', difficulty: 'Hard' },
  { answer: 'behind the scenes', pattern: '6 3 6', visual: 'SCENES      BEHIND', description: 'BEHIND is placed literally behind SCENES', difficulty: 'Hard' },
  { answer: 'centre stage', pattern: '6 5', visual: 'ST  CENTRE  AGE', description: 'CENTRE occupies the exact middle of STAGE', difficulty: 'Hard' },
  { answer: 'stage fright', pattern: '5 6', visual: 'S T A G E\n  ~ ~ ~', description: 'STAGE appears to tremble with fear', difficulty: 'Hard' },
  { answer: 'curtain call', pattern: '7 4', visual: '╲████████╱\n  ╲████╱\n    CALL', description: 'CALL appears from beneath a heavy closing theatre curtain', difficulty: 'Hard' },
]

const chapterSevenPuzzles = chapterSevenSpecs.map((spec, index) => candidate(
  index + 316,
  spec.answer,
  spec.pattern,
  spec.difficulty ?? 'Hard',
  spec.format ?? 'typography',
  [{ content: spec.visual, className: 'chapter-seven-rebus', ariaLabel: spec.description }],
  [
    'More than one visual detail contributes to this expert phrase.',
    'Describe the position, scale, colour or action before naming it.',
    'Combine those literal observations into a familiar expression.',
  ],
  [spec.description + '.', `Together the elements represent “${spec.answer}.”`],
))

const chapterEightSpecs: ChapterFiveSpec[] = [
  { answer: 'between a rock and a hard place', pattern: '7 1 4 3 1 4 5', visual: '', description: 'A person is tightly positioned between a rough natural boulder and an immovable concrete block', format: 'illustration', difficulty: 'Hard' },
  { answer: 'pull the wool over your eyes', pattern: '4 3 4 4 4 4', visual: '', description: 'A continuous roll of fluffy wool is pulled completely across both eyes', format: 'illustration', difficulty: 'Hard' },
  { answer: "water off a duck's back", pattern: '5 3 1 5 4', visual: '', description: "Water beads visibly roll away from a duck's dry back", format: 'illustration', difficulty: 'Hard' },
  { answer: 'a square peg in a round hole', pattern: '1 6 3 2 1 5 4', visual: '', description: 'A square wooden peg cannot pass through the incompatible round hole below it', format: 'illustration', difficulty: 'Hard' },
  { answer: 'the weight of the world on your shoulders', pattern: '3 6 2 3 5 2 4 9', visual: '', description: 'A kneeling figure supports an enormous globe directly across both shoulders', format: 'illustration', difficulty: 'Hard' },
  { answer: 'back against the wall', pattern: '4 7 3 4', visual: 'BACK▐████████', description: 'BACK is pressed firmly against a solid wall', difficulty: 'Hard' },
  { answer: 'hit a brick wall', pattern: '3 1 5 4', visual: 'HIT  →  ▦▦▦▦\n          ▦▦▦▦', description: 'HIT travels directly into an unbroken brick wall', difficulty: 'Hard' },
  { answer: 'off the wall', pattern: '3 3 4', visual: '████ WALL ████     OFF', description: 'OFF has moved completely away from the wall', difficulty: 'Hard' },
  { answer: 'drive someone up the wall', pattern: '5 7 2 3 4', visual: '      SOMEONE ↑\n      ↑       ▦\nDRIVE ↑       ▦ WALL', description: 'DRIVE sends SOMEONE upward along a wall', difficulty: 'Hard' },
  { answer: 'the walls have ears', pattern: '3 5 4 4', visual: '👂  ▦▦ WALL ▦▦  👂', description: 'A wall has a visible ear on each side', difficulty: 'Hard' },
  { answer: 'turn a blind eye', pattern: '4 1 5 3', visual: 'TURN  ↻  🚫👁', description: 'An eye marked blind has been deliberately turned away', difficulty: 'Hard' },
  { answer: 'more than meets the eye', pattern: '4 4 5 3 3', visual: '〈  M O R E  〉\n       👁', description: 'MORE is encountered inside the outline of a giant eye', difficulty: 'Hard' },
  { answer: 'eyes bigger than your stomach', pattern: '4 6 4 4 7', visual: 'E   Y   E   S\n     stomach', description: 'EYES are vastly larger than the tiny stomach beneath them', difficulty: 'Hard' },
  { answer: 'a sight for sore eyes', pattern: '1 5 3 4 4', visual: 'SORE  〈 SIGHT 〉  EYES', description: 'SIGHT appears directly between SORE and EYES', difficulty: 'Hard' },
  { answer: 'stars in your eyes', pattern: '5 2 4 4', visual: '〈 ★ 〉     〈 ★ 〉', description: 'Bright stars occupy the centre of two eye shapes', difficulty: 'Hard' },
  { answer: 'actions speak louder than words', pattern: '7 5 6 4 5', visual: 'ACTIONS  ACTIONS  ACTIONS\n          words', description: 'ACTIONS dominate while words appear quiet and small', difficulty: 'Hard' },
  { answer: 'put words in your mouth', pattern: '3 5 2 4 5', visual: '（   W O R D S   ）', description: 'WORDS are placed inside a mouth-shaped outline', difficulty: 'Hard' },
  { answer: 'word on the street', pattern: '4 2 3 6', visual: '       WORD\n══════ STREET ══════', description: 'WORD sits directly on top of STREET', difficulty: 'Hard' },
  { answer: 'eat your words', pattern: '3 4 5', visual: 'WOR  EAT  DS', description: 'EAT has entered and consumed the middle of WORDS', difficulty: 'Hard' },
  { answer: 'famous last words', pattern: '6 4 5', visual: '★  ★  ★                 WORDS │', description: 'Celebrated WORDS occupy the very last position at the end marker', difficulty: 'Hard' },
  { answer: 'music to your ears', pattern: '5 2 4 4', visual: '♫  ♬  ♫  →  👂', description: 'Music travels directly toward an ear', difficulty: 'Hard' },
  { answer: 'fall on deaf ears', pattern: '4 2 4 4', visual: '       FALL\n        ↓\n      🚫👂', description: 'FALL drops directly onto an ear that cannot hear it', difficulty: 'Hard' },
  { answer: 'in one ear and out the other', pattern: '2 3 3 3 3 3 5', visual: 'IN → 👂（ HEAD ）👂 → OUT', description: 'One continuous path enters one ear and exits through the other', difficulty: 'Hard' },
  { answer: 'all ears', pattern: '3 4', visual: '👂  A L L  👂', description: 'ALL is surrounded entirely by ears', difficulty: 'Hard' },
  { answer: 'play it by ear', pattern: '4 2 2 3', visual: 'PLAY  →  👂', description: 'PLAY is directed and guided only by an ear', difficulty: 'Hard' },
  { answer: 'head and shoulders above the rest', pattern: '4 3 9 5 3 4', visual: '       HEAD\n    SHOULDERS\n\nREST  REST  REST', description: 'HEAD and SHOULDERS stand high above everything labelled REST', difficulty: 'Hard' },
  { answer: 'put your heads together', pattern: '3 4 5 8', visual: 'HEADHEAD', description: 'Two HEAD words are pressed tightly together', difficulty: 'Hard' },
  { answer: 'keep a level head', pattern: '4 1 5 4', visual: 'KEEP   ── HEAD ──   ◉', description: 'KEEP holds HEAD perfectly level beside a spirit-level bubble', difficulty: 'Hard' },
  { answer: 'from head to toe', pattern: '4 4 2 3', visual: 'HEAD\n  ↓\n  ↓\n TOE', description: 'A direct path runs from HEAD down to TOE', difficulty: 'Hard' },
  { answer: 'think on your feet', pattern: '5 2 4 4', visual: '   THINK\n  🦶  🦶', description: 'THINK balances directly on two feet', difficulty: 'Hard' },
  { answer: 'the best of both worlds', pattern: '3 4 2 4 6', visual: 'WORLD   BEST   WORLD', description: 'BEST is positioned between both WORLD words', difficulty: 'Hard' },
  { answer: 'worlds apart', pattern: '6 5', visual: 'WORLD            WORLD', description: 'Two WORLD words are separated by an enormous distance', difficulty: 'Hard' },
  { answer: 'the world at your feet', pattern: '3 5 2 4 4', visual: '     🌍\n   🦶  🦶', description: 'The world rests immediately at a pair of feet', difficulty: 'Hard' },
  { answer: 'a world of difference', pattern: '1 5 2 10', visual: 'WORLD   DIFFERENCE   WORLD', description: 'DIFFERENCE creates the only separation between two worlds', difficulty: 'Hard' },
  { answer: 'not the end of the world', pattern: '3 3 3 2 3 5', visual: 'E̶N̶D̶        WORLD', description: 'END is visibly cancelled beside WORLD', difficulty: 'Hard' },
  { answer: "two's company three's a crowd", pattern: '4 7 6 1 5', visual: '2     COMPANY\n3  3  3  CROWD', description: 'Two is paired calmly with COMPANY while three is packed into a CROWD', difficulty: 'Hard' },
  { answer: 'six of one half a dozen of the other', pattern: '3 2 3 4 1 5 2 3 5', visual: '6       ⚖       ½ DOZEN', description: 'Six balances as exactly equal to half a dozen', difficulty: 'Hard' },
  { answer: 'third time lucky', pattern: '5 4 5', visual: '1     2     ★ 3 ★', description: 'The third position alone receives the lucky stars', difficulty: 'Hard' },
  { answer: "three strikes and you're out", pattern: '5 7 3 5 3', visual: '╱     ╱     ╱       OUT →', description: 'Three clear strikes send OUT beyond the boundary', difficulty: 'Hard' },
  { answer: 'twenty four seven', pattern: '6 4 5', visual: '24\n──\n 7', description: 'Twenty-four is placed continuously over seven', difficulty: 'Hard' },
  { answer: 'break the mould', pattern: '5 3 5', visual: 'MO  ╱ BREAK ╲  ULD', description: 'BREAK splits apart the middle of MOULD', difficulty: 'Hard' },
  { answer: 'set in stone', pattern: '3 2 5', visual: 'ST  SET  ONE', description: 'SET is embedded inside the word STONE', difficulty: 'Hard' },
  { answer: 'chip off the old block', pattern: '4 3 3 3 5', visual: '▪        OLD BLOCK', description: 'A small chip has separated from an old solid block', difficulty: 'Hard' },
  { answer: 'a stumbling block', pattern: '1 9 5', visual: 'STUM\n   ▦ BLOCK\n       BLING', description: 'STUMBLING visibly trips and breaks across a block', difficulty: 'Hard' },
  { answer: 'building blocks', pattern: '8 6', visual: '   BLOCK\n BLOCK BLOCK\nBLOCK BLOCK BLOCK', description: 'BLOCK words are stacked into a growing building', difficulty: 'Hard' },
  { answer: 'connect the dots', pattern: '7 3 4', visual: '•──•──•──•──•', description: 'Every dot is joined into one connected path', difficulty: 'Hard' },
  { answer: 'piece together the puzzle', pattern: '5 8 3 6', visual: 'PUZ  →←  ZLE', description: 'Two separated pieces of PUZZLE are moving together', difficulty: 'Hard' },
  { answer: 'fit like a glove', pattern: '3 4 1 5', visual: 'GLO[ FIT ]VE', description: 'FIT sits perfectly inside GLOVE', difficulty: 'Hard' },
  { answer: 'the missing piece', pattern: '3 7 5', visual: 'PUZ  □  LE\n     ?', description: 'One essential piece is missing from PUZZLE', difficulty: 'Hard' },
  { answer: 'complete the picture', pattern: '8 3 7', visual: '┌────────────┐\n│  PICTURE  ✓ │\n└────────────┘', description: 'A fully framed PICTURE carries a completion mark', difficulty: 'Hard' },
  { answer: 'a place in the sun', pattern: '1 5 2 3 3', visual: '      ☀\n    PLACE', description: 'PLACE occupies the warm position directly in the sun', difficulty: 'Hard' },
  { answer: 'everything under the sun', pattern: '10 5 3 3', visual: '        ☀\n   EVERYTHING', description: 'EVERYTHING sits beneath a single sun', difficulty: 'Hard' },
  { answer: 'reach for the stars', pattern: '5 3 3 5', visual: '★   ★   ★\n    ↑\n  REACH', description: 'REACH stretches upward toward the stars', difficulty: 'Hard' },
  { answer: 'written in the stars', pattern: '7 2 3 5', visual: 'ST  WRITTEN  ARS', description: 'WRITTEN is embedded inside STARS', difficulty: 'Hard' },
  { answer: 'thank your lucky stars', pattern: '5 4 5 5', visual: '★  ★ LUCKY ★  ★\n      THANK ↑', description: 'THANK points gratefully toward a group of lucky stars', difficulty: 'Hard' },
  { answer: 'seeing stars', pattern: '6 5', visual: '★   SEEING   ★', description: 'SEEING is surrounded by visible stars', difficulty: 'Hard' },
  { answer: 'star crossed lovers', pattern: '4 7 6', visual: '★ ╲ ╱ ★\n   ╳\nLOVER  LOVER', description: 'Two lovers sit beneath a pair of paths crossed by stars', difficulty: 'Hard' },
  { answer: 'shoot for the moon', pattern: '5 3 3 4', visual: '       🌙\n       ↑\n     SHOOT', description: 'SHOOT aims directly upward toward the moon', difficulty: 'Hard' },
  { answer: 'many moons ago', pattern: '4 5 3', visual: '☾  ☾  ☾  ☾  ☾      AGO', description: 'Many moons appear before AGO', difficulty: 'Hard' },
  { answer: 'ask for the moon', pattern: '3 3 3 4', visual: 'ASK  →  🌙', description: 'ASK points directly toward the moon', difficulty: 'Hard' },
  { answer: 'go round in circles', pattern: '2 5 2 7', visual: '↻  GO  ○  ○  ○  ↺', description: 'GO travels round a repeated set of circles', difficulty: 'Hard' },
  { answer: 'come full circle', pattern: '4 4 6', visual: '◯  COME  ◯', description: 'COME is enclosed by complete full circles', difficulty: 'Hard' },
  { answer: 'square the circle', pattern: '6 3 6', visual: '□   THE   ○', description: 'A square is set directly against a circle', difficulty: 'Hard' },
  { answer: 'cut to the chase', pattern: '3 2 3 5', visual: 'CH  CUT  ASE', description: 'CUT has gone directly into CHASE', difficulty: 'Hard' },
  { answer: 'chase your tail', pattern: '5 4 4', visual: 'CHASE  ↻  🐕', description: 'CHASE circles repeatedly around a dog toward its tail', difficulty: 'Hard' },
  { answer: 'running on empty', pattern: '7 2 5', visual: 'RUNNING  →  [       ]', description: 'RUNNING continues toward a completely empty container', difficulty: 'Hard' },
  { answer: 'hit the ground running', pattern: '3 3 6 7', visual: '    RUNNING ↓\n══════ GROUND ══════', description: 'RUNNING lands directly on the ground', difficulty: 'Hard' },
  { answer: 'running out of steam', pattern: '7 3 2 5', visual: 'RUNNING       〰 〰 〰 →', description: 'Steam is visibly escaping out and away from RUNNING', difficulty: 'Hard' },
  { answer: 'a one horse race', pattern: '1 3 5 4', visual: '🐎  →  ───────── RACE', description: 'Exactly one horse occupies the entire race', difficulty: 'Hard' },
  { answer: 'neck and neck', pattern: '4 3 4', visual: 'NECKNECK', description: 'Two NECK words are perfectly level and touching', difficulty: 'Hard' },
  { answer: "money doesn't grow on trees", pattern: '5 6 4 2 5', visual: '', description: 'A person searches a leafy tree while holding an empty wallet, but no money grows anywhere', format: 'illustration', difficulty: 'Hard' },
  { answer: 'penny pincher', pattern: '5 7', visual: '〉〉  PENNY  〈〈', description: 'PENNY is being tightly pinched from both sides', difficulty: 'Hard' },
  { answer: 'cost a fortune', pattern: '4 1 7', visual: 'COST  →  FORTUNE', description: 'COST points toward an entire FORTUNE', difficulty: 'Hard' },
  { answer: 'worth a mint', pattern: '5 1 4', visual: 'WORTH  =  MINT  MINT  MINT', description: 'WORTH equals a large supply of MINT', difficulty: 'Hard' },
  { answer: 'make ends meet', pattern: '4 4 4', visual: 'END  →←  END', description: 'Two separated ends move together until they meet', difficulty: 'Hard' },
  { answer: 'break even', pattern: '5 4', visual: 'BR  EVEN  EAK', description: 'EVEN breaks into the centre of BREAK', difficulty: 'Hard' },
  { answer: 'pay through the nose', pattern: '3 7 3 4', visual: '', description: 'Coins travel harmlessly from a wallet through a nose into a payment tray', format: 'illustration', difficulty: 'Hard' },
  { answer: 'foot the bill', pattern: '4 3 4', visual: '   BILL\n    🦶', description: 'A foot supports the BILL directly above it', difficulty: 'Hard' },
  { answer: 'pick up the tab', pattern: '4 2 3 3', visual: 'PICK UP  ↑\n        TAB', description: 'PICK UP lifts a TAB upward', difficulty: 'Hard' },
  { answer: 'money to burn', pattern: '5 2 4', visual: 'MONEY\n  ↓\n  🔥', description: 'MONEY is being directed toward a flame to burn', difficulty: 'Hard' },
  { answer: 'keep your cards close to your chest', pattern: '4 4 5 5 2 4 5', visual: 'KEEP   CARDS →← CHEST', description: 'KEEP presses CARDS extremely close to CHEST', difficulty: 'Hard' },
  { answer: 'play your cards right', pattern: '4 4 5 5', visual: 'PLAY   CARDS               RIGHT →', description: 'PLAY moves the cards all the way to the right', difficulty: 'Hard' },
  { answer: 'the cards are stacked against you', pattern: '3 5 3 7 7 3', visual: 'CARD\n CARD\n  CARD ▌ YOU', description: 'A leaning stack of cards presses against YOU', difficulty: 'Hard' },
  { answer: 'wild card', pattern: '4 4', visual: 'C  W I L D  ARD', description: 'WILD has broken unpredictably into CARD', difficulty: 'Hard' },
  { answer: 'poker face', pattern: '5 4', visual: '〈   POKER   〉', description: 'POKER sits inside a still expressionless face outline', difficulty: 'Hard' },
]

const chapterEightPuzzles = chapterEightSpecs.map((spec, index) => candidate(
  index + 416,
  spec.answer,
  spec.pattern,
  spec.difficulty ?? 'Hard',
  spec.format ?? 'typography',
  [{ content: spec.visual, className: 'chapter-eight-rebus', ariaLabel: spec.description }],
  [
    'This master puzzle combines several visual signals.',
    'Name the objects, then describe their exact relationship or imbalance.',
    'Turn the complete arrangement into a familiar expression.',
  ],
  [spec.description + '.', `Together the elements represent “${spec.answer}.”`],
))

const chapterNineSpecs: ChapterFiveSpec[] = [
  { answer: "call someone's bluff", pattern: '4 8 5', visual: 'CALL  ☎  →  BLUFF', description: 'CALL directly confronts BLUFF', difficulty: 'Hard' },
  { answer: 'luck of the draw', pattern: '4 2 3 4', visual: '★ LUCK ★  ←  DRAW', description: 'DRAW unexpectedly produces LUCK', difficulty: 'Hard' },
  { answer: 'draw the short straw', pattern: '4 3 5 5', visual: 'DRAW  →  │  │  ┆  │', description: 'DRAW points toward the only short straw among long ones', difficulty: 'Hard' },
  { answer: 'when the chips are down', pattern: '4 3 5 3 4', visual: 'CHIPS\n  ↓\n  ↓\n DOWN', description: 'CHIPS have fallen all the way down', difficulty: 'Hard' },
  { answer: 'put your money where your mouth is', pattern: '3 4 5 5 4 5 2', visual: 'PUT  →  （ MONEY ）', description: 'PUT places MONEY directly inside a mouth', difficulty: 'Hard' },
  { answer: 'pins and needles', pattern: '4 3 7', visual: '📍 NEEDLE 📍 NEEDLE 📍', description: 'Pins and needles alternate in one prickly row', difficulty: 'Hard' },
  { answer: 'sharp as a tack', pattern: '5 2 1 4', visual: 'SHARP  →  ▲ TACK', description: 'SHARP points to the needle-like tip of a tack', difficulty: 'Hard' },
  { answer: 'pin your hopes on something', pattern: '3 4 5 2 9', visual: '📌  HOPES\n    SOMETHING', description: 'HOPES are pinned directly onto SOMETHING', difficulty: 'Hard' },
  { answer: 'pin down', pattern: '3 4', visual: 'PIN\n ↓\nDOWN', description: 'PIN is directed straight down', difficulty: 'Hard' },
  { answer: 'safety in numbers', pattern: '6 2 7', visual: '🛡  1 2 3 4 5  🛡', description: 'A group of numbers is protected inside two safety shields', difficulty: 'Hard' },
  { answer: 'number one priority', pattern: '6 3 8', visual: 'PRIORITY\n    1\n  ↑↑↑', description: 'PRIORITY is placed directly above number one', difficulty: 'Hard' },
  { answer: 'by the numbers', pattern: '2 3 7', visual: '1   2   3   4\n      BY', description: 'BY sits beneath and is guided by the numbers', difficulty: 'Hard' },
  { answer: 'your number is up', pattern: '4 6 2 2', visual: '      NUMBER\n        ↑\n        UP', description: 'NUMBER has moved upward from UP', difficulty: 'Hard' },
  { answer: 'paint by numbers', pattern: '5 2 7', visual: '1  2  3  4  5\n🎨  PAINT', description: 'PAINT follows a numbered sequence', difficulty: 'Hard' },
  { answer: 'a numbers game', pattern: '1 7 4', visual: '┌────────────┐\n│ 1 2 GAME 3 │\n└────────────┘', description: 'GAME is completely surrounded and controlled by numbers', difficulty: 'Hard' },
  { answer: 'raise eyebrows', pattern: '5 8', visual: 'EYEBROWS\n ↑  ↑  ↑', description: 'EYEBROWS are being raised upward', difficulty: 'Hard' },
  { answer: 'hair raising', pattern: '4 7', visual: 'H\n A\n  I\n   R   ↑ RAISING', description: 'HAIR rises progressively upward', difficulty: 'Hard' },
  { answer: 'split hairs', pattern: '5 5', visual: 'HA  SPLIT  IRS', description: 'SPLIT divides HAIRS directly through the middle', difficulty: 'Hard' },
  { answer: 'let your hair down', pattern: '3 4 4 4', visual: 'HAIR\n ↓ ↓ ↓\n DOWN', description: 'HAIR is released downward', difficulty: 'Hard' },
  { answer: 'bad hair day', pattern: '3 4 3', visual: '〰╱ HAIR ╲〰\n     DAY', description: 'Disordered hair sits on top of DAY', difficulty: 'Hard' },
  { answer: 'by the skin of your teeth', pattern: '2 3 4 2 4 5', visual: 'T E E T H\n   skin', description: 'Only a tiny thin layer of skin remains beneath TEETH', difficulty: 'Hard' },
  { answer: 'armed to the teeth', pattern: '5 2 3 5', visual: '💪  T E E T H  💪', description: 'TEETH are flanked by a strong arm on each side', difficulty: 'Hard' },
  { answer: 'long in the tooth', pattern: '4 2 3 5', visual: 'T     O     O     T     H', description: 'TOOTH is stretched to an extreme length', difficulty: 'Hard' },
  { answer: 'tongue in cheek', pattern: '6 2 5', visual: 'CHE  TONGUE  EK', description: 'TONGUE is lodged inside CHEEK', difficulty: 'Hard' },
  { answer: 'bite your tongue', pattern: '4 4 6', visual: 'BI  TONGUE  TE', description: 'TONGUE is caught directly inside BITE', difficulty: 'Hard' },
  { answer: 'smoke and mirrors', pattern: '5 3 7', visual: '', description: 'Elegant smoke curls through and confuses the reflections of two ornate mirrors', format: 'illustration', difficulty: 'Hard' },
  { answer: 'mirror image', pattern: '6 5', visual: 'IMAGE  │  EGAMI', description: 'IMAGE is reflected backward across a mirror line', difficulty: 'Hard' },
  { answer: 'face value', pattern: '4 5', visual: '🏷  [ FACE ]  $', description: 'FACE is displayed directly on a value tag', difficulty: 'Hard' },
  { answer: 'two faced', pattern: '3 5', visual: '〈 FACE  FACE 〉', description: 'One outline contains exactly two opposing faces', difficulty: 'Hard' },
  { answer: 'put on a brave face', pattern: '3 2 1 5 4', visual: 'PUT  →  [ BRAVE ]\n             FACE', description: 'PUT places BRAVE onto FACE', difficulty: 'Hard' },
  { answer: 'keep a straight face', pattern: '4 1 8 4', visual: 'KEEP  ─── FACE ───', description: 'KEEP holds FACE on a perfectly straight line', difficulty: 'Hard' },
  { answer: 'save face', pattern: '4 4', visual: 'FA  SAVE  CE', description: 'SAVE is hidden protectively inside FACE', difficulty: 'Hard' },
  { answer: 'egg on your face', pattern: '3 2 4 4', visual: '   🥚\n〈  FACE  〉', description: 'An egg rests directly on top of FACE', difficulty: 'Hard' },
  { answer: 'a face in the crowd', pattern: '1 4 2 3 5', visual: '○ ○ ○ ○ ○\n○ ○ FACE ○ ○\n○ ○ ○ ○ ○', description: 'One FACE is buried in the centre of a crowd', difficulty: 'Hard' },
  { answer: 'face to face', pattern: '4 2 4', visual: 'FACE  →←  FACE', description: 'Two FACE words confront each other directly', difficulty: 'Hard' },
  { answer: 'under lock and key', pattern: '5 4 3 3', visual: '🔒       🔑\n   UNDER', description: 'UNDER sits beneath both a lock and a key', difficulty: 'Hard' },
  { answer: 'key player', pattern: '3 6', visual: 'PLA  🔑  YER', description: 'A key occupies the centre of PLAYER', difficulty: 'Hard' },
  { answer: 'key figure', pattern: '3 6', visual: 'FIG  🔑  URE', description: 'A key forms the centre of FIGURE', difficulty: 'Hard' },
  { answer: 'low key', pattern: '3 3', visual: 'LOW\n\n       🔑', description: 'A key is positioned unusually low', difficulty: 'Hard' },
  { answer: 'turn the key', pattern: '4 3 3', visual: 'TURN  ↻  🔑', description: 'A key is visibly being turned', difficulty: 'Hard' },
  { answer: 'lock stock and barrel', pattern: '4 5 3 6', visual: '', description: 'A brass lock, wooden gunstock and coopered barrel appear as three separate objects', format: 'illustration', difficulty: 'Hard' },
  { answer: 'open sesame', pattern: '4 6', visual: 'SES  ← OPEN →  AME', description: 'OPEN separates the two halves of SESAME', difficulty: 'Hard' },
  { answer: 'close ranks', pattern: '5 5', visual: 'R A N K S  →←  R A N K S', description: 'Two ranks move tightly together until they close', difficulty: 'Hard' },
  { answer: 'get some shut eye', pattern: '3 4 4 3', visual: 'GET SOME  ── 👁 ──', description: 'An eye is visibly shut between two closed lids', difficulty: 'Hard' },
  { answer: 'an open mind', pattern: '2 4 4', visual: 'MI  ← OPEN →  ND', description: 'MIND has been opened through its centre', difficulty: 'Hard' },
  { answer: 'fish for compliments', pattern: '4 3 11', visual: '🐟  ←────  ★ PRAISE ★', description: 'A fish is being drawn toward visible praise and compliments', difficulty: 'Hard' },
  { answer: 'plenty more fish in the sea', pattern: '6 4 4 2 3 3', visual: 'SEA  ≋≋≋≋≋≋≋\n🐟  🐟  🐟  🐟  🐟', description: 'Many fish fill the sea beneath its surface', difficulty: 'Hard' },
  { answer: 'cold fish', pattern: '4 4', visual: '❄  🐟  ❄', description: 'A fish is surrounded by icy cold flakes', difficulty: 'Hard' },
  { answer: 'a different kettle of fish', pattern: '1 9 6 2 4', visual: 'KETTLE  [ 🐟 ]  DIFFERENT', description: 'A fish appears as the unexpected contents of a different kettle', difficulty: 'Hard' },
  { answer: 'hook line and sinker', pattern: '4 4 3 6', visual: '', description: 'One complete fishing rig clearly displays its hook, continuous line and heavy sinker', format: 'illustration', difficulty: 'Hard' },
]

const chapterNinePuzzles = chapterNineSpecs.map((spec, index) => candidate(
  index + 501,
  spec.answer,
  spec.pattern,
  spec.difficulty ?? 'Hard',
  spec.format ?? 'typography',
  [{ content: spec.visual, className: 'chapter-nine-rebus', ariaLabel: spec.description }],
  [
    'This finale puzzle combines several advanced visual signals.',
    'Read the symbols, scale and positioning as one complete scene.',
    'Convert that scene into a familiar expression.',
  ],
  [spec.description + '.', `Together the elements represent “${spec.answer}.”`],
))

const chapterTenSpecs: ChapterFiveSpec[] = [
  { answer: 'off the hook', pattern: '3 3 4', visual: 'OFF          🪝', description: 'OFF has escaped far away from a hook', difficulty: 'Hard' },
  { answer: 'bait and switch', pattern: '4 3 6', visual: 'BAIT  ⇄  SWITCH', description: 'BAIT and SWITCH exchange positions', difficulty: 'Hard' },
  { answer: 'get your hooks into something', pattern: '3 4 5 4 9', visual: 'GET  🪝→  SOME🪝THING', description: 'Hooks have caught and entered SOMETHING', difficulty: 'Hard' },
  { answer: 'cast a wide net', pattern: '4 1 4 3', visual: 'CAST  →  ╱╲╱╲╱╲╱╲╱╲', description: 'CAST throws an unusually wide net outward', difficulty: 'Hard' },
  { answer: 'slip through the net', pattern: '4 7 3 3', visual: '╳╳╳ NET ╳╳╳\n      ↓\n     SLIP', description: 'SLIP has passed entirely through the net', difficulty: 'Hard' },
  { answer: 'throw a spanner in the works', pattern: '5 1 7 2 3 5', visual: '', description: 'A bright spanner flies into and jams a set of interlocking gears', format: 'illustration', difficulty: 'Hard' },
  { answer: 'well oiled machine', pattern: '4 5 7', visual: '   💧 OIL\n⚙  MACHINE  ⚙', description: 'Oil drops directly into a smoothly turning machine', difficulty: 'Hard' },
  { answer: 'a cog in the machine', pattern: '1 3 2 3 7', visual: 'MA  ⚙ COG  CHINE', description: 'A single cog occupies the centre of MACHINE', difficulty: 'Hard' },
  { answer: 'set the wheels in motion', pattern: '3 3 6 2 6', visual: 'SET  →  ⚙  ⚙  →→', description: 'SET starts two wheels moving forward', difficulty: 'Hard' },
  { answer: 'reinvent the wheel', pattern: '8 3 5', visual: '◯  REINVENT  ◯', description: 'REINVENT is placed inside and between complete wheels', difficulty: 'Hard' },
  { answer: 'fifth wheel', pattern: '5 5', visual: '◉  ◉\n◉  ◉        ⑤◉', description: 'A fifth wheel sits awkwardly apart from four matched wheels', difficulty: 'Hard' },
  { answer: 'the squeaky wheel gets the grease', pattern: '3 7 5 4 3 6', visual: 'SQUEAK!  ◉  ←  💧 GREASE', description: 'The noisy wheel alone receives the grease', difficulty: 'Hard' },
  { answer: 'put the brakes on', pattern: '3 3 6 2', visual: 'PUT  →  [ BRAKES ]  ON', description: 'PUT switches the BRAKES into the ON position', difficulty: 'Hard' },
  { answer: 'change gear', pattern: '6 4', visual: 'GE  CHANGE  AR', description: 'CHANGE replaces the centre of GEAR', difficulty: 'Hard' },
  { answer: 'full steam ahead', pattern: '4 5 5', visual: '〰 〰 〰  →→  AHEAD', description: 'A full cloud of steam drives directly ahead', difficulty: 'Hard' },
]

const chapterTenPuzzles = chapterTenSpecs.map((spec, index) => candidate(
  index + 551,
  spec.answer,
  spec.pattern,
  spec.difficulty ?? 'Hard',
  spec.format ?? 'typography',
  [{ content: spec.visual, className: 'chapter-ten-rebus', ariaLabel: spec.description }],
  [
    'This encore puzzle uses advanced visual shorthand.',
    'Identify every symbol and describe the complete arrangement.',
    'Use those relationships to name the familiar expression.',
  ],
  [spec.description + '.', `Together the elements represent “${spec.answer}.”`],
))

export const puzzles: Puzzle[] = [...starterPuzzles, ...candidatePuzzles, ...chapterFivePuzzles, ...chapterSixPuzzles, ...chapterSevenPuzzles, ...chapterEightPuzzles, ...chapterNinePuzzles, ...chapterTenPuzzles].map(migrateStarterPuzzle)
