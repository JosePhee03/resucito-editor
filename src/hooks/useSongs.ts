import { useSongStore } from '../stores/songStore'
import { getSongs } from '../database/queries'
import AppError from '../database/error'
import { useState } from 'react'
import type { Song } from '../types/song'
import type { Pagination } from '../types/pagination'

const PAGE = 1
const SIZE = 10

export function useSong() {
  const { setSongs, setLoading, setError } = useSongStore.getState()
  const songs = useSongStore(state => state.songs)
  const error = useSongStore(state => state.error)
  const isLoading = useSongStore(state => state.isLoading)
  const [songsSearch, setSongsSearch] = useState<Pagination<Song[]>>({
    data: songs,
    page: PAGE,
    size: SIZE,
    total: songs.length
  })

  async function loadSongs() {
    if (songs.length !== 0) return
    try {
      setLoading(true)
      setError(null)
      const data = await getSongs()
      setSongs(data)
    } catch (error) {
      if (error instanceof AppError) {
        setError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  const search = (
    query: string = '',
    page: number = PAGE,
    size: number = SIZE
  ) => {
    const songsFilter = songs.filter(
      song =>
        normalize(song.title).includes(normalize(query)) ||
        normalize(song.subtitle).includes(normalize(query)) ||
        normalize(song.lyric).includes(normalize(query))
    )

    console.log({ songsFilter })
    setSongsSearch({
      data: songsFilter.slice(page, page * size),
      total: songsFilter.length,
      size,
      page
    })
  }

  const getSong = (id: string) => {
    return songs.find(song => song.id === id)
  }

  const reset = () => {
    setSongs([])
    loadSongs()
  }

  return {
    songs,
    loadSongs,
    isLoading,
    error,
    reset,
    search,
    songsSearch,
    getSong
  }
}

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
