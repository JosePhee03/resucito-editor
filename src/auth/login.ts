import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../database/supabase'

export async function singIn() {
  return await signInWithPopup(auth, provider)
}
