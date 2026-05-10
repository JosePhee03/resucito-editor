import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../database/supabase'

export async function login() {
  try {
    const result = await signInWithPopup(auth, provider)
    console.log({ loggg: result })
  } catch (error) {
    console.log(error)
  }
}
