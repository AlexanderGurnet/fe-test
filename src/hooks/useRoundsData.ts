import { useCallback, useEffect, useState } from 'react'

import { roundsApi } from '../api'
import type { Round } from '../types'

export default function useRoundsData(limit = 30) {
  const [rounds, setRounds] = useState<Round[]>([])
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await roundsApi.list(`?limit=${limit}`)
      setRounds(res.data ?? [])
    } catch (err) {
      console.error('Failed to load rounds:', err)
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    load()
  }, [load])

  return { rounds, loading, load }
}
