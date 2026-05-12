export type Song = {
  id: string
  page: number | undefined
  title: string
  subtitle: string
  stage: keyof typeof STAGE | undefined
  tags: (keyof typeof TAGS)[]
  lyric: string
  chords: string[]
  capo: number
}

export const STAGE = {
  precatechumenate: 'Precatecumenado',
  liturgy: 'Liturgia',
  election: 'Elección',
  catechumenate: 'Catecumenado'
}

export const TAGS = {
  salp: 'Salmo',
  chrismas: 'Navidad',
  lent: 'Cuaresma'
}

export type LyricNode = { type: 'section'; children: LyricLine[] }

export type LyricLine = { type: 'line'; children: LyricSegment[] }

export type LyricSegment =
  | { type: 'label'; value: string }
  | { type: 'chord'; value: string }
  | { type: 'text'; value: string }
