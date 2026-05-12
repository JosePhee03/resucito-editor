import type { Song } from '../types/song'
import { useSong } from '../hooks/useSong'
import { useEffect } from 'react'
import type { Pagination } from '../types/paginationType'

export default function SongSearch() {
  const { songsSearch, search } = useSong()

  useEffect(() => search('maria'), [])

  return (
    <main className="h-svh w-full">
      <Content songsSearch={songsSearch} />
    </main>
  )
}

type ContentProps = { songsSearch: Pagination<Song[]> }

function Content({ songsSearch }: ContentProps) {
  if (songsSearch.data.length === 0) return <EmptySongList />
  else return <SongList songs={songsSearch.data} />
}

function SongList({ songs }: { songs: Song[] }) {
  return (
    <div className="pt-14 flex flex-col items-center">
      {songs.map(song => (
        <div
          key={song.id}
          className="w-full px-4 sm:px-8 py-2 flex md:justify-center odd:bg-neutral-800 hover:bg-neutral-700 hover:cursor-pointer"
        >
          <div className="flex gap-2 sm:min-w-lg">
            <div className="flex justify-center items-center size-10 bg-neutral-300 text-neutral-800">
              {song.page}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold leading-none">{song.title}</span>
              <span className="font-medium text-xs leading-none">
                {song.subtitle}
              </span>
              <span className="text-sm font-light leading-none">
                {song.lyric.split('\n')[1]}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptySongList() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-2">
      <span className="text-4xl font-bold">Sin resultados</span>
      <span className="text-lg font-medium">canto no encontrado</span>
    </div>
  )
}
