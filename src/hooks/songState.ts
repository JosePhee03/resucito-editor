import { useContext } from 'react'
import { SongContext } from '../store/SongContext'

export function useSongState() {
  const context = useContext(SongContext)

  if (!context) {
    throw new Error('Error en el SongContext')
  }

  return context
}
