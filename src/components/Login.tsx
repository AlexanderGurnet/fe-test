import { useLogin } from '../hooks'

export default function LoginView() {
  const { username, setUsername, password, setPassword, error, submit } = useLogin()

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">ВОЙТИ</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm">Имя пользователя:</label>
          <input
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Пароль:</label>
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded cursor-pointer">
            Войти
          </button>
          {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
        </div>
      </form>
    </div>
  )
}
