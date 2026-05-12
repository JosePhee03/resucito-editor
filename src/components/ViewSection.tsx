import { useState } from 'react'
import type { LyricSegment, Song } from '../types/song'
import { lyricParser } from '../utils/lyricParse'

export default function ViewSection({ song }: { song: Song }) {
  const [hiddenJson, setHiddenJson] = useState(true)

  return (
    <section className="w-full h-dvh py-4 md:p-0 md:h-full flex flex-col gap-4">
      <div className="flex justify-between items-center h-8">
        <span className="font-bold text-red-500 dark:text-red-400">
          Formato de Canto
        </span>
        <button
          onClick={() => setHiddenJson(!hiddenJson)}
          className="font-bold bg-red-500 dark:bg-red-400 text-white px-4 h-full "
        >
          {hiddenJson ? 'json' : 'formato'}
        </button>
      </div>
      {hiddenJson ? <FormatView song={song} /> : <JsonView song={song} />}
    </section>
  )
}

function FormatView({ song }: { song: Song }) {
  const lyricNode = lyricParser(song.lyric)

  return (
    <div className="flex flex-col w-full h-full px-4 overflow-auto bg-neutral-100 dark:bg-neutral-950">
      <div className="max-h-32">
        {lyricNode.map((section, i) => (
          <div key={i} className="pt-8">
            {section.children.map((line, j) => (
              <LyricLineElement lyricLine={line.children} key={j} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function LyricLineElement({ lyricLine }: { lyricLine: LyricSegment[] }) {
  return (
    <div className="font-mono pt-4 relative">
      {lyricLine.map((lyric, index) => {
        switch (lyric.type) {
          case 'chord':
            return (
              <span
                key={index}
                className="font-bold text-red-600 dark:text-red-500 absolute -top-0.5"
              >
                {lyric.value}
              </span>
            )
          case 'label':
            return (
              <span
                key={index}
                className="font-bold text-gray-400 dark:text-gray-500 relative"
              >
                {lyric.value}
              </span>
            )
          case 'text':
            return (
              <span key={index} style={{ whiteSpace: 'pre-wrap' }}>
                {lyric.value}
              </span>
            )
        }
      })}
    </div>
  )
}

function JsonView({ song }: { song: Song }) {
  return (
    <div className="w-full h-full overflow-auto p-4 bg-white dark:bg-neutral-950">
      <pre className="">{JSON.stringify(song, null, 2)}</pre>
    </div>
  )
}
