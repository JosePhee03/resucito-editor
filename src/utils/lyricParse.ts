import type { LyricLine, LyricNode, LyricSegment } from '../types/song'

export function lyricParser(lyric: string) {
  const sections = lyric.split('\n\n')
  const songSection: LyricNode[] = []

  for (const section of sections) {
    const lines = section.split('\n')
    const lineParser: LyricLine[] = lines.map(l => ({
      type: 'line',
      children: parseLyricLine(l)
    }))
    songSection.push({ type: 'section', children: lineParser })
  }

  return songSection
}

const parseLyricLine = (input: string) => {
  const regex = /([A-Z]\.)|\[([^\]]+)\]|([^[\]]+)/g

  const segments: LyricSegment[] = []

  for (const match of input.matchAll(regex)) {
    const [, label, chord, text] = match

    if (label) {
      segments.push({ type: 'label', value: label })
    } else if (chord) {
      segments.push({ type: 'chord', value: chord })
    } else if (text) {
      segments.push({ type: 'text', value: text })
    }
  }

  return segments
}
