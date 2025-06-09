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
import AdminRoute from "./AdminRoute"
import PrivateRoute from "./PrivateRoute"
import OrganizationsAdminPage from "../pages/admin/Organizations"
import OrganizationsLayout from "../layout/OrganizationsLayout"
import OrganizationTab from "../pages/global/Profile/components/Tabs/OrganizationTab"
import OrganizationDashboard from "../pages/organization/Dashboard" 
import OrganizationConfig from "../pages/organization/Config"
import Knowledge from "../pages/global/Knowledge"
import SheltersModule from "../pages/global/Shelters" 
import CurvedRoadTimeline from "../pages/global/Adoption/Progress"
import OrganizationCatsPage from "../pages/organization/Cats"
import Donaciones from "../pages/global/Donaciones/Donaciones"
import Planes from "../pages/global/Planes/Planes"
import OnlineStore from "../pages/global/OnlineStore"
import OrganizationAdoptionsPage from "@/pages/organization/Adoption"

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
          <Route path="/shelters" element={<SheltersModule />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/adoption-process" element={<CurvedRoadTimeline />} />
          <Route path="/donaciones" element={<Donaciones />} />
           <Route path="/plans" element={<Planes />} />
           <Route path="/store" element={<OnlineStore />} />
          {/* Ruta protegida solo para usuarios logueados */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Layout de organizaciones */} 
        <Route element={<PrivateRoute />}>
          <Route path="/organizations" element={<OrganizationsLayout />}>
            <Route index element={<OrganizationTab />} />
            <Route path=":id" element={<OrganizationDashboard />} />
            <Route path=":id/settings" element={<OrganizationConfig />} />
            <Route path=":id/cats" element={<OrganizationCatsPage />} />
            <Route path=":id/adoptions" element={<OrganizationAdoptionsPage />} />
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
