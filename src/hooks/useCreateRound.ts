import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { roundsApi } from '../api'

export default function useCreateRound() {
  const navigate = useNavigate()

  const createRound = useCallback(async () => {
    try {
      const round = await roundsApi.create()
      navigate(`/rounds/${round.id}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert('Не удалось создать раунд: ' + err.message)
      } else {
        alert('Не удалось создать раунд')
      }
    }
  }, [navigate])

  return { createRound }
}
