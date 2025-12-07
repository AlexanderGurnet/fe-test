import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoutes() {
  const token = localStorage.getItem('guss_token')
  return token ? <Outlet /> : <Navigate to="/login" replace />
}
