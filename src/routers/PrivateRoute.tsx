// // components/routeguards/PrivateRoute.tsx
// import { Navigate, Outlet } from "react-router-dom" 
// import { useAuth } from "../context/AuthContext"

// const PrivateRoute = () => {
//   const { token, initialized } = useAuth()
//   if (!initialized) return null
//   return token ? <Outlet /> : <Navigate to="/login" />
// }

// export default PrivateRoute
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PrivateRoute = () => {
  const { token, initialized } = useAuth()
  const location = useLocation()

  if (!initialized) return null

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}

export default PrivateRoute
