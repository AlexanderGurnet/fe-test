import { useState, useEffect } from 'react'

import { roundsApi } from '../api'
import type { Round, Stat } from '../types'

export default function useRoundData(roundId?: string) {
  const [round, setRound] = useState<Round | null>(null)
  const [topStats, setTopStats] = useState<Stat[]>([])
  const [myStats, setMyStats] = useState<{ taps: number; score: number }>({ taps: 0, score: 0 })
  const [loading, setLoading] = useState(true)

  const load = async () => {
    if (!roundId) return
    try {
      const res = await roundsApi.get(roundId)
      setRound(res.round)
      setTopStats(res.topStats || [])
      setMyStats(res.myStats || { taps: 0, score: 0 })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundId])

  return { round, topStats, myStats, setMyStats, load, loading }
}
