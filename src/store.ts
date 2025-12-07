import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { UserState } from './types'

type State = {
  user: UserState | null
  setUser: (u: UserState | null) => void
  logout: () => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      user: null,
      setUser: (u) => set({ user: u }),
      logout: () => {
        localStorage.removeItem('guss_token')
        set({ user: null })
      },
    }),
    {
      name: 'guss_user',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
