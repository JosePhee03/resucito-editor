import { create } from 'zustand'
import type { User } from '../types/user'

type AuthStore = {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (value: boolean) => void
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isLoading: true,
  setUser: user => set({ user }),
  setLoading: value => set({ isLoading: value })
}))
