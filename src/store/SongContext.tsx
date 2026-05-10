import { createContext, useState, type ReactNode } from 'react'
import type { Song } from '../types/songTypes'

const INITIAL_SONG_JSON: Song = {
  page: undefined,
  title: '',
  subtitle: '',
  stage: 'precatechumenate',
  tags: [],
  lyric: '',
  capo: 0,
  chords: []
}

type SongContextType = {
  song: Song
  setSong: React.Dispatch<React.SetStateAction<Song>>
}

const SongContext = createContext<SongContextType | undefined>(undefined)

type ProviderProps = {
  children: ReactNode
}

function SongProvider({ children }: ProviderProps) {
  const [song, setSong] = useState<Song>(INITIAL_SONG_JSON)

  return (
    <SongContext.Provider
      value={{
        song,
        setSong
      }}
    >
      {children}
    </SongContext.Provider>
  )
}

export { SongContext, SongProvider }
