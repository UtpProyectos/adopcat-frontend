// components/routeguards/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom" 
import { useAuth } from "../context/AuthContext"

const PrivateRoute = () => {
  const { token, initialized } = useAuth()
  if (!initialized) return null
  return token ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
