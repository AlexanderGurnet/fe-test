import type { Round, RoundStatus, Stat } from './types'

export function formatDate(s: string) {
  try {
    return new Date(s).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'medium' })
  } catch {
    return s
  }
}

export function determineStatus(r: Round): RoundStatus {
  const now = Date.now()
  const st = new Date(r.startTime).getTime()
  const en = new Date(r.endTime).getTime()

  if (now < st) return 'Cooldown'
  if (now >= st && now <= en) return 'Active'
  return 'Finished'
}

export function getWinner(stats: Stat[]): Stat | null {
  if (!stats.length) return null
  return stats.reduce((a, b) => (a.score >= b.score ? a : b))
}

export function colorStatus(status: string) {
  if (status === 'Active') return 'bg-green-600'
  if (status === 'Finished') return 'bg-gray-600'
  if (status === 'Cooldown') return 'bg-blue-600'
  return ''
}

export function mapStatusToRussian(status: string) {
  if (status === 'Active') return 'Активен'
  if (status === 'Finished') return 'Завершен'
  if (status === 'Cooldown') return 'Ожидание'
  return status
}

export function timeLeft(round: Round | null) {
  if (!round) return ''
  const now = Date.now()
  const st = new Date(round.startTime).getTime()
  const en = new Date(round.endTime).getTime()
  if (now >= st && now <= en) return msToTime(en - now)
  if (now < st) return msToTime(st - now)
  return '00:00'
}

export function msToTime(ms: number) {
  const sec = Math.max(0, Math.floor(ms / 1000))
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0')
  const s = (sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}
