import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/global/Home"
import Login from "../pages/global/Login"
import PublicLayout from "../layout/PublicLayout"
import AdminLayout from "../layout/AdminLayout"
import Cats from "../pages/global/Cats"
import CatDetail from "../pages/global/CatDetail"
<<<<<<< HEAD
import Profile from "../pages/global/Profile"
import NotFound from "../pages/NotFound"
import ResetPasswordPage from "../pages/global/ResetPassword"
import Dashboard from "../pages/admin/Dashboard"
import { useAuth } from "../context/AuthContext"
import LoadingScreen from "../components/common/LoadingScreen"
import { useEffect, useState } from "react"
import UsersPage from "../pages/admin/Users"
import AdminRoute from "./AdminRoute"
import PrivateRoute from "./PrivateRoute"
import OrganizationsAdminPage from "../pages/admin/Organizations"
import OrganizationsLayout from "../layout/OrganizationsLayout"
import OrganizationTab from "../pages/global/Profile/components/Tabs/OrganizationTab"
import OrganizationDashboard from "../pages/organization/Dashboard"
import OrganizationDetailLayout from "../layout/OrganizationsLayout"
import OrganizationConfig from "../pages/organization/Config"
=======
import Shelters from "../pages/global/Shelters"
import Knowledge from "../pages/global/Knowledge"
>>>>>>> feat/victor

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
    return <LoadingScreen />;
  }



  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Layout público */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/cats/:id" element={<CatDetail />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/knowledge" element={<Knowledge />} />

          {/* Ruta protegida solo para usuarios logueados */}
          <Route element={<PrivateRoute />}>
            <Route path="/perfil" element={<Profile />} />
          </Route>
        </Route>

        {/* Layout de organizaciones */} 
        <Route element={<PrivateRoute />}>
          <Route path="/organizaciones" element={<OrganizationsLayout />}>
            <Route index element={<OrganizationTab />} />
            <Route path=":id" element={<OrganizationDashboard />} />
            <Route path=":id/configuracion" element={<OrganizationConfig />} />
          </Route>
        </Route>




        {/* Layout admin protegido */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="organizaciones" element={<OrganizationsAdminPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
