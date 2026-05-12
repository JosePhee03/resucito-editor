import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from './supabase'
import type { Song } from '../types/song'
import z from 'zod'
import AppError from './error'
import { FirebaseError } from 'firebase/app'

const SongSchema = z.object({
  id: z.string(),
  page: z.number(),
  title: z.string(),
  subtitle: z.string(),
  stage: z.string(),
  tags: z.array(z.string()),
  chords: z.array(z.string()),
  capo: z.number(),
  lyric: z.string()
})

const SongsSchema = z.array(SongSchema)

export async function saveSong(song: Song) {
  await setDoc(doc(db, 'documents', 'config'), song)
}

export async function getSongs(): Promise<Song[]> {
  try {
    const coll = collection(db, 'ES_2019')

    const snapshot = await getDocs(coll)

    const data: Song[] = snapshot.docs.map(doc => ({
      id: doc.id,
      page: doc.data().page,
      title: doc.data().title,
      subtitle: doc.data().subtitle,
      stage: doc.data().stage,
      tags: doc.data().categories,
      chords: doc.data().chords,
      capo: doc.data().capo,
      lyric: doc.data().lyric
    }))
    const validData = SongsSchema.safeParse(data)
    if (validData.success) return data
    throw new AppError('Error en la validación de datos', 500)
  } catch (err) {
    if (err instanceof FirebaseError && err.code === 'permission-denied') {
      throw new AppError(`No tienes permiso`, 403)
    } else throw new AppError(`Error base de datos: ${err}`, 500)
  }
}
