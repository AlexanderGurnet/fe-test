import { Routes, Route, Navigate } from 'react-router-dom'

import { PublicRoutes, PrivateRoutes, AppHeader } from './components'
import { RoundPage, RoundsPage, LoginPage } from './pages'
import { useAuthInit } from './hooks'

export default function App() {
  useAuthInit()

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/rounds" element={<RoundsPage />} />
            <Route path="/rounds/:id" element={<RoundPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
