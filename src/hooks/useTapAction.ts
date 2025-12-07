import { useState } from 'react'

import { roundsApi } from '../api'
import type { TapResponse } from '../types'

export default function useTapAction(
  id: string | undefined,
  setMyStats: React.Dispatch<React.SetStateAction<TapResponse>>,
  load: () => Promise<void>
) {
  const [isAnimating, setIsAnimating] = useState(false)

  const tap = async () => {
    if (!id) return

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 150)

    setMyStats((prev: TapResponse) => ({
      taps: prev.taps + 1,
      score: prev.score + 1,
    }))

    try {
      const res = await roundsApi.tap(id)
      setMyStats({ taps: res.taps, score: res.score })
    } catch (err) {
      await load()
      console.error('tap error', err)
    }
  }

  return { tap, isAnimating, setIsAnimating }
}
