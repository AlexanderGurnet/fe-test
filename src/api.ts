import type {
  AuthApiLoginResponse,
  RoundApiCreateResponse,
  RoundApiGetResponse,
  RoundApiListResponse,
  TapResponse,
} from './types'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://v2991160.hosted-by-vdsina.ru'

export type ApiOptions = Omit<RequestInit, 'body'> & { json?: unknown }

function getToken() {
  return localStorage.getItem('guss_token') || null
}

async function api(path: string, opts: ApiOptions = {}) {
  const headers: Record<string, string> = {}

  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const init: RequestInit = {
    method: opts.method || 'GET',
    headers,
    ...opts,
  }

  if (opts.json !== undefined) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(opts.json)
  }

  const res = await fetch(API_BASE + path, init)
  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    const message = data?.message || res.statusText || 'API error'
    throw new Error(message)
  }
  return data
}

export const authApi = {
  login: (username: string, password: string): Promise<AuthApiLoginResponse> =>
    api('/api/v1/auth/login', { method: 'POST', json: { username, password } }),
  me: () => api('/api/v1/auth/me'),
}

export const roundsApi = {
  list: (params = ''): Promise<RoundApiListResponse> => api('/api/v1/rounds' + params),
  create: (): Promise<RoundApiCreateResponse> => api('/api/v1/rounds', { method: 'POST' }),
  get: (id: string): Promise<RoundApiGetResponse> => api(`/api/v1/rounds/${id}`),
  tap: (id: string): Promise<TapResponse> => api(`/api/v1/rounds/${id}/tap`, { method: 'POST' }),
}
