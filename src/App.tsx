import { useEffect, useState } from 'react'

function App() {
  const [text, setText] = useState('')

  useEffect(() => {
    parseLine(text)
  }, [text])

  return (
    <main className="w-screen h-screen flex p-8 gap-8 dark:bg-neutral-900 dark:text-white">
      <section className="flex flex-col gap-4 w-full h-full ">
        <span className="font-bold dark:text-red-400">Escribir canto</span>
        <textarea
          className="w-full h-full p-4 font-mono dark:bg-neutral-800"
          onChange={e => setText(e.currentTarget.value)}
          placeholder="# Title"
        />
      </section>
      <section className="w-full h-full flex flex-col gap-4">
        <span className="font-bold dark:text-red-400">Formato de Canto</span>
        <ParseText text={text} />
      </section>
    </main>
  )
}

function ParseText({ text }: { text: string }) {
  return (
    <pre className="w-full h-auto flex flex-col space-y-4 p-4 dark:bg-neutral-950">
      {parseLine(text)}
    </pre>
  )
}

type LyricNode =
  | { type: 'line'; children: LyricSegment[] }
  | { type: 'section'; children: LyricNode[] }

type LyricSegment =
  | { type: 'label'; value: string; pos: number }
  | { type: 'chord'; value: string; pos: number }
  | { type: 'text'; value: string; pos: number }

function parseLine(source: string) {
  const sections = source.split('\n\n')
  const songSection: LyricNode[] = []

  for (const section of sections) {
    const lines = section.split('\n')
    const lineParser: LyricNode[] = lines.map(l => ({
      type: 'line',
      children: parseLyricLine(l)
    }))
    songSection.push({ type: 'section', children: lineParser })
  }

  return JSON.stringify(songSection, null, 2)
}

const parseLyricLine = (input: string) => {
  const regex = /([A-Z]\.)|\[([^\]]+)\]|([^[\]]+)/g

  const segments: LyricSegment[] = []

  for (const match of input.matchAll(regex)) {
    const index = match.index ?? 0
    const [, label, chord, text] = match

    if (label) {
      segments.push({ type: 'label', value: label, pos: index })
    } else if (chord) {
      segments.push({ type: 'chord', value: chord, pos: index })
    } else if (text) {
      segments.push({ type: 'text', value: text, pos: index })
    }
  }

  return segments
}

export default App
