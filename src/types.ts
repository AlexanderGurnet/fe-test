export interface User {
  username: string
}

export interface Stat {
  taps: number
  score: number
  user?: User
}

export interface Round {
  id: string
  startTime: string
  endTime: string
  totalScore: number
  createdAt: string
}

export interface TapResponse {
  taps: number
  score: number
}

export type UserRole = 'ADMIN' | 'SURVIVOR'

export type RoundStatus = 'Cooldown' | 'Active' | 'Finished'

export interface RoundApiGetResponse {
  round: Round
  topStats: Stat[]
  myStats: {
    taps: number
    score: number
  }
}

export interface RoundApiListResponse {
  data: Round[]
}

export type RoundApiCreateResponse = Round

export interface AuthApiLoginResponse {
  username: string
  role: UserRole
  token: string
}

export type UserState = Omit<AuthApiLoginResponse, 'token'>
