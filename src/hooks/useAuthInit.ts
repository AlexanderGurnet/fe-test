import { useEffect } from 'react'

import { authApi } from '../api'
import { useStore } from '../store'
import type { UserState } from '../types'

export default function useAuthInit() {
  const setUser = useStore((s) => s.setUser)

  useEffect(() => {
    const token = localStorage.getItem('guss_token')
    if (!token) return

    authApi
      .me()
      .then((user: UserState) => setUser(user))
      .catch(() => setUser(null))
  }, [setUser])
}
