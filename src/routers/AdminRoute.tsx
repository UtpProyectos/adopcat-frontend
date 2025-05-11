import { JSX } from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth()

  const isAdmin = user?.role?.toUpperCase?.().trim() === "ROLE_ADMIN"

  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace /> 
  return children
}

export default AdminRoute
