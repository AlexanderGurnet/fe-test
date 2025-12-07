import { Navigate, Outlet } from 'react-router-dom'

export default function PublicRoutes() {
  const token = localStorage.getItem('guss_token')
  return token ? <Navigate to="/rounds" replace /> : <Outlet />
}
