import { Link } from 'react-router-dom'

import { useStore } from '../store'
import { colorStatus, determineStatus, formatDate, mapStatusToRussian } from '../utils'
import { useRoundsData, useCreateRound } from '../hooks'

export default function RoundsView() {
  const { rounds, loading } = useRoundsData()
  const { createRound } = useCreateRound()

  const user = useStore((s) => s.user)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-white">Список РАУНДОВ</h3>
        <p className="font-bold text-white">{`Имя игрока: ${user?.username ?? '-'}`}</p>
      </div>

      {user?.role === 'ADMIN' && (
        <button onClick={createRound} className="mb-4 bg-emerald-600 text-white py-2 cursor-pointer px-3 rounded">
          Создать раунд
        </button>
      )}

      {loading ? (
        <div className="text-white">Загрузка...</div>
      ) : (
        <div className="space-y-4">
          {rounds.map((round) => (
            <Link key={round.id} to={`/rounds/${round.id}`} className="block bg-white p-4 rounded shadow">
              <div className="text-sm flex items-center gap-2">
                <div className={`rounded-full w-3 h-3 ${colorStatus(determineStatus(round))}`} /> Round ID: {round.id}
              </div>
              <div className="text-xs mt-1">Start: {formatDate(round.startTime)}</div>
              <div className="text-xs">End: {formatDate(round.endTime)}</div>
              <div className="mt-2">Статус: {mapStatusToRussian(determineStatus(round))}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
