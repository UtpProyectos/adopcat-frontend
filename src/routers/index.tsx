import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/global/Home"
import Login from "../pages/global/Login"
import PublicLayout from "../layout/PublicLayout"
import AdminLayout from "../layout/AdminLayout"
import Cats from "../pages/global/Cats"
import CatDetail from "../pages/global/CatDetail"
import Profile from "../pages/global/Profile"
import NotFound from "../pages/NotFound"
import ResetPasswordPage from "../pages/global/ResetPassword"
import Dashboard from "../pages/admin/Dashboard"
import { useAuth } from "../context/AuthContext"
import LoadingScreen from "../components/common/LoadingScreen"
import { useEffect, useState } from "react"
import UsersPage from "../pages/admin/Users"

const AppRouter = () => {
  const { initialized } = useAuth()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (initialized) {
      const timeout = setTimeout(() => {
        setShowLoader(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [initialized])

  if (!initialized || showLoader) {
    console.log("⏳ Cargando Auth...");
    return <LoadingScreen />;
  }

  console.log("✅ Auth listo, renderizando rutas...");



  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Público */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />



        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/cats/:id" element={<CatDetail />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>

        {/* Layout Admin  protegemos con adminroute*/}
        <Route path="/admin" element={
          <AdminLayout />
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
