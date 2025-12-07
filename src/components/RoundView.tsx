import { determineStatus, getWinner, timeLeft } from '../utils'
import { useRoundData, useRoundPolling, useTapAction } from '../hooks'

export default function RoundView({ roundId }: { roundId?: string }) {
  const { round, topStats, myStats, setMyStats, load, loading } = useRoundData(roundId)
  const { tap, isAnimating, setIsAnimating } = useTapAction(roundId, setMyStats, load)

  useRoundPolling(round, load)

  if (loading) return <div className="flex justify-center items-center h-[80vh] text-white">Загрузка...</div>
  if (!round) return <div className="flex justify-center items-center h-[80vh] text-white">Раунд не найден</div>

  const winner = getWinner(topStats)

  const status = determineStatus(round)
  const isFinished = status === 'Finished'
  const isActive = status === 'Active'
  const isCooldown = status === 'Cooldown'

  const handleTap = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
    if (isActive) tap()
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="col-span-2">
        <div className="bg-gray-100 p-6 rounded flex flex-col items-center">
          <div className="mt-4 text-center">
            <div className="mt-6 flex flex-col items-center">
              <img
                src="/goose.png"
                alt="Goose"
                className={`w-48 h-48 cursor-pointer select-none transition ${isAnimating ? 'tap-pop' : ''}`}
                draggable={false}
                onClick={handleTap}
              />
            </div>

            {isFinished ? (
              <div className="mt-6 w-full max-w-xs mx-auto font-mono text-sm bg-gray-900/30 border border-white/40 rounded p-4 space-y-2">
                <h3>Раунд завершен!</h3>
                <div className="flex justify-between">
                  <span>Всего oчков:</span>
                  <span>{round.totalScore}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Победитель - {winner?.user?.username || ''}</span>
                  <span>{winner?.score || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Мои очки:</span>
                  <span>{myStats.score}</span>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-6 text-center">
                  <div className="font-semibold text-lg">{isActive ? 'Раунд активен!' : 'Ожидание'}</div>

                  <div className="text-sm mt-2">
                    {isActive && (
                      <>
                        До конца осталось: <span className="font-mono">{timeLeft(round)}</span>
                      </>
                    )}
                    {isCooldown && (
                      <>
                        до начала: <span className="font-mono">{timeLeft(round)}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-6 text-sm text-center">
                  Мои очки - <span className="font-bold">{myStats.score}</span> (тапов: {myStats.taps})
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
