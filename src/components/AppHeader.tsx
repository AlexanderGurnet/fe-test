import { Link, useNavigate } from 'react-router-dom'

import { useStore } from '../store'

export default function AppHeader() {
  const logout = useStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-bold">
          The Last of Guss
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/rounds" className="text-sm font-semibold">
            Раунды
          </Link>

          <button onClick={handleLogout} className="text-sm font-semibold cursor-pointer">
            Выйти
          </button>
        </div>
      </div>
    </header>
  )
}
