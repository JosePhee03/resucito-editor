import { useEffect, useState } from 'react'
import { FormSection } from '../components/FormSection'
import ViewSection from '../components/ViewSection'
import { useSongStore } from '../stores/songStore'
import type { Song } from '../types/song'
import { useParams } from 'react-router-dom'

const SONG_PRESET: Song = {
  title: '',
  subtitle: '',
  stage: 'precatechumenate',
  tags: [],
  lyric: '',
  capo: 0,
  chords: [],
  id: '',
  page: undefined
}

export default function SongEditor() {
  const { id } = useParams()
  const songById = useSongStore().getSong(id ?? '')
  const [song, setSong] = useState<Song>(SONG_PRESET)

  useEffect(() => {
    setSong(songById ?? SONG_PRESET)
  }, [songById, setSong])

  return (
    <main className="flex flex-col w-full h-svh px-4 md:px-8 md:pb-8 md:pt-12 md:gap-8 md:grid grid-cols-2">
      <FormSection song={song} setSong={setSong} />
      <ViewSection song={song} />
    </main>
  )
}
