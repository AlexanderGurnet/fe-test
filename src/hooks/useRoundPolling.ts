import { useEffect, useRef } from 'react'

import { determineStatus } from '../utils'
import type { Round } from '../types'

export default function useRoundPolling(round: Round | null, load: () => Promise<void>) {
  const intervalRef = useRef<number | null>(null)
  const prevStatusRef = useRef<string | null>(null)

  useEffect(() => {
    if (!round) return
    prevStatusRef.current = determineStatus(round)

    intervalRef.current = window.setInterval(async () => {
      const status = determineStatus(round)

      if (status === 'Finished') {
        if (prevStatusRef.current !== 'Finished') {
          await load()
        }

        clearInterval(intervalRef.current!)
        intervalRef.current = null
        return
      }

      await load()
      prevStatusRef.current = status
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [round, load])
}
