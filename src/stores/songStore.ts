import { create } from 'zustand'
import type { Song } from '../types/song'
import { persist } from 'zustand/middleware'
import type AppError from '../database/error'

type SongStore = {
  songs: Song[]
  isLoading: boolean
  error: AppError | null
  setSongs: (songs: Song[]) => void
  setLoading: (value: boolean) => void
  setError: (value: AppError | null) => void
  getSong: (id: string) => Song | undefined
}

export const useSongStore = create<SongStore, [['zustand/persist', SongStore]]>(
  persist(
    (set, get) => ({
      songs: [],
      error: null,
      isLoading: true,
      setSongs: songs => set({ songs }),
      setLoading: value => set({ isLoading: value }),
      setError: value => set({ error: value }),
      getSong: id => get().songs.find(song => song.id === id)
    }),
    {
      name: 'songs-storage'
    }
  )
)
