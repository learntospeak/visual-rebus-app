type SupportedAudioContext = AudioContext & { resume: () => Promise<void> }

let sharedContext: SupportedAudioContext | null = null
let musicGain: GainNode | null = null
let musicTimer: number | null = null
let nextMusicBar = 0

function getAudioContext() {
  const AudioContextClass = window.AudioContext
    ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

  if (!AudioContextClass) return null
  if (!sharedContext || sharedContext.state === 'closed') sharedContext = new AudioContextClass() as SupportedAudioContext
  if (sharedContext.state === 'suspended') void sharedContext.resume()
  return sharedContext
}

function tone(
  context: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  volume: number,
  type: OscillatorType = 'sine',
) {
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(.018, duration / 4))
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(start)
  oscillator.stop(start + duration + .02)
}

function musicTone(context: AudioContext, frequency: number, start: number, duration: number, volume: number) {
  if (!musicGain) return
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(frequency, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(volume, start + .35)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  oscillator.connect(gain)
  gain.connect(musicGain)
  oscillator.start(start)
  oscillator.stop(start + duration + .05)
}

function scheduleMusic() {
  const context = sharedContext
  if (!context || !musicGain || context.state !== 'running') return
  const barLength = 6.4
  const chords = [
    [261.63, 329.63, 392],
    [220, 261.63, 329.63],
    [174.61, 220, 261.63],
    [196, 246.94, 293.66],
  ]
  if (nextMusicBar < context.currentTime + .2) nextMusicBar = context.currentTime + .1
  while (nextMusicBar < context.currentTime + 8) {
    const chord = chords[Math.floor(nextMusicBar / barLength) % chords.length]
    chord.forEach((frequency, index) => musicTone(context, frequency, nextMusicBar + index * .8, 4.8, index === 0 ? .34 : .22))
    musicTone(context, chord[2] * 2, nextMusicBar + 4.8, 1.4, .1)
    nextMusicBar += barLength
  }
}

export function startBackgroundMusic() {
  const context = getAudioContext()
  if (!context || musicGain) return
  musicGain = context.createGain()
  musicGain.gain.setValueAtTime(.035, context.currentTime)
  musicGain.connect(context.destination)
  nextMusicBar = context.currentTime + .1
  scheduleMusic()
  musicTimer = window.setInterval(scheduleMusic, 4000)
}

export function stopBackgroundMusic() {
  if (musicTimer !== null) window.clearInterval(musicTimer)
  musicTimer = null
  if (musicGain && sharedContext) {
    musicGain.gain.cancelScheduledValues(sharedContext.currentTime)
    musicGain.gain.setTargetAtTime(0.0001, sharedContext.currentTime, .12)
    const oldGain = musicGain
    window.setTimeout(() => oldGain.disconnect(), 700)
  }
  musicGain = null
  nextMusicBar = 0
}

export function playSolveChime() {
  const context = getAudioContext()
  if (!context) return
  const start = context.currentTime
  ;[523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
    tone(context, frequency, start + index * .095, .82, .105, index < 2 ? 'triangle' : 'sine')
  })
}

export function playIncorrectSound() {
  const context = getAudioContext()
  if (!context) return
  const start = context.currentTime
  tone(context, 220, start, .18, .055, 'triangle')
  tone(context, 174.61, start + .105, .24, .05, 'triangle')
}

export function playClueSound() {
  const context = getAudioContext()
  if (!context) return
  const start = context.currentTime
  tone(context, 659.25, start, .13, .045, 'sine')
  tone(context, 880, start + .07, .24, .055, 'sine')
}

const livingPuzzleSounds = new Set([408, 410, 456, 499])

export function hasLivingPuzzleSound(puzzleId: number) {
  return livingPuzzleSounds.has(puzzleId)
}

function noiseAccent(
  context: AudioContext,
  duration: number,
  volume: number,
  filterType: BiquadFilterType,
  frequency: number,
  playbackRate = 1,
) {
  const frames = Math.ceil(context.sampleRate * duration)
  const buffer = context.createBuffer(1, frames, context.sampleRate)
  const channel = buffer.getChannelData(0)
  let previous = 0
  for (let index = 0; index < frames; index += 1) {
    const white = Math.random() * 2 - 1
    previous = previous * .88 + white * .12
    channel[index] = previous
  }
  const source = context.createBufferSource()
  const filter = context.createBiquadFilter()
  const gain = context.createGain()
  source.buffer = buffer
  source.playbackRate.value = playbackRate
  filter.type = filterType
  filter.frequency.value = frequency
  gain.gain.setValueAtTime(.0001, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + .025)
  gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration)
  source.connect(filter)
  filter.connect(gain)
  gain.connect(context.destination)
  source.start()
}

export function playLivingPuzzleAccent(puzzleId: number) {
  const context = getAudioContext()
  if (!context || !hasLivingPuzzleSound(puzzleId)) return
  const start = context.currentTime

  if (puzzleId === 408) {
    noiseAccent(context, .78, .055, 'bandpass', 1450, .82)
    tone(context, 164.81, start + .12, .7, .012, 'sine')
  } else if (puzzleId === 410) {
    noiseAccent(context, .62, .038, 'lowpass', 760, .72)
    tone(context, 110, start + .16, .26, .025, 'triangle')
    tone(context, 82.41, start + .36, .38, .018, 'sine')
  } else if (puzzleId === 456) {
    noiseAccent(context, .24, .075, 'highpass', 1700, 1.15)
    tone(context, 146.83, start, .12, .035, 'triangle')
    tone(context, 98, start + .085, .18, .025, 'triangle')
  } else if (puzzleId === 499) {
    noiseAccent(context, .28, .04, 'bandpass', 2200, 1.45)
    tone(context, 392, start + .09, .2, .018, 'sine')
  }
}

export function playDailyStreakAccent() {
  const context = getAudioContext()
  if (!context) return
  const start = context.currentTime
  tone(context, 392, start, .2, .065, 'triangle')
  tone(context, 523.25, start + .1, .22, .07, 'triangle')
  tone(context, 659.25, start + .2, .25, .07, 'triangle')
  tone(context, 1046.5, start + .5, .68, .065, 'sine')
  tone(context, 1318.51, start + .5, .68, .05, 'sine')
}

export function playHaptic(kind: 'success' | 'wrong' | 'streak') {
  if (!('vibrate' in navigator)) return
  const pattern = kind === 'wrong' ? [24, 45, 24] : kind === 'streak' ? [18, 35, 18, 35, 28] : [28]
  navigator.vibrate(pattern)
}
