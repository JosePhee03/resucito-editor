import { useEffect, useState } from 'react'

function App() {
  const [text, setText] = useState('')
  const [hiddenJson, setHiddenJson] = useState(true)
  const [jsonText, setJsonText] = useState<LyricNode[]>(parseText(text))
  useEffect(() => {
    setJsonText(parseText(text))
  }, [text])

  return (
    <main className="w-screen h-screen flex p-8 gap-8 dark:bg-neutral-900 dark:text-white">
      <section className="flex flex-col gap-4 w-full h-full ">
        <span className="font-bold dark:text-red-400 my-auto h-8">
          Escribir canto
        </span>
        <textarea
          className="w-full h-full overflow-y-scroll p-4 font-mono dark:bg-neutral-800"
          onChange={e => setText(e.currentTarget.value)}
          placeholder="# Title"
        />
      </section>
      <section className="w-full h-full flex flex-col gap-4">
        <div className="flex justify-between items-center h-8">
          <span className="font-bold dark:text-red-400">Formato de Canto</span>
          <button
            onClick={() => setHiddenJson(!hiddenJson)}
            className="bg-red-400 text-white px-4 h-full "
          >
            {hiddenJson ? 'json' : 'formato'}
          </button>
        </div>
        {hiddenJson ? (
          <FormatView json={jsonText} />
        ) : (
          <JsonView json={jsonText} />
        )}
      </section>
    </main>
  )
}

function FormatView({ json }: { json: LyricNode[] }) {
  return (
    <div className="w-full h-full flex flex-col dark:bg-neutral-950">
      <JsonToHTML json={json} />
    </div>
  )
}

function JsonToHTML({ json }: { json: LyricNode[] }) {
  return (
    <pre className="font-mono">
      {json.map((section, i) => (
        <p key={i}>
          {section.children.map((line, j) => (
            <LyricLineElement lyricLine={line.children} key={j} />
          ))}
        </p>
      ))}
    </pre>
  )
}

function LyricLineElement({ lyricLine }: { lyricLine: LyricSegment[] }) {
  const chords = lyricLine.filter(c => c.type === 'chord')

  return (
    <div className="font-mono">
      <div className="flex">
        {chords.map((chord, i) => {
          const pad = chords[i - 1]?.pos ?? 0
          const lenghtLast = chords[i - 1]?.type.length ?? 0

          return (
            <>
              <span>
                {' '.repeat(Math.max(chord.pos - pad - lenghtLast, 0))}
              </span>
              <span className="text-red-500">{chord.value}</span>
            </>
          )
        })}
      </div>
      <div>
        {lyricLine.map(lyric => {
          switch (lyric.type) {
            case 'label':
              return <span className="text-gray-500">{lyric.value}</span>
            case 'text':
              return <span>{lyric.value}</span>
          }
        })}
      </div>
    </div>
  )
}

function JsonView({ json }: { json: LyricNode[] }) {
  return (
    <pre className="w-full h-full overflow-y-scroll flex flex-col space-y-4 p-4 dark:bg-neutral-950">
      {JSON.stringify(json, null, 2)}
    </pre>
  )
}

type LyricNode = { type: 'section'; children: LyricLine[] }

type LyricLine = { type: 'line'; children: LyricSegment[] }

type LyricSegment =
  | { type: 'label'; value: string }
  | { type: 'chord'; value: string; pos: number }
  | { type: 'text'; value: string }

function parseText(text: string) {
  const sections = text.split('\n\n')
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
  let posBuffer = 0

  for (const match of input.matchAll(regex)) {
    const [, label, chord, text] = match

    if (label) {
      posBuffer += label.length
      segments.push({ type: 'label', value: label })
    } else if (chord) {
      segments.push({ type: 'chord', value: chord, pos: posBuffer })
    } else if (text) {
      posBuffer += text.length
      segments.push({ type: 'text', value: text })
    }
  }

  return segments
}

export default App
