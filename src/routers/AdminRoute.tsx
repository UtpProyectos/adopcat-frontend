import { Navigate, Outlet } from "react-router-dom" 
import { useAuth } from "../context/AuthContext"

const AdminRoute = () => {
  const { user, token, initialized } = useAuth()
  if (!initialized) return null
  return token && user?.role === "ROLE_ADMIN"
    ? <Outlet />
    : <Navigate to="/login" />
}

export default AdminRoute