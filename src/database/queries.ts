import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './supabase'
import type { Song } from '../types/songTypes'

export async function saveSong(song: Song) {
  await setDoc(doc(db, 'documents', 'config'), song)
}

export async function getSongs() {
  const ref = doc(db, 'documents', 'config')

  const snap = await getDoc(ref)

  console.log(snap.data())
}
