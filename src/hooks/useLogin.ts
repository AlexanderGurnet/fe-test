import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { authApi } from '../api'
import { useStore } from '../store'

export default function useLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const setUser = useStore((s) => s.setUser)

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError(null)
    try {
      const res = await authApi.login(username, password)
      localStorage.setItem('guss_token', res.token)

      setUser({ username: res.username, role: res.role })
      navigate('/rounds')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Ошибка входа')
      }
    }
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    submit,
  }
}
