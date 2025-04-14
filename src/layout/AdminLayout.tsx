 
import { Outlet } from "react-router-dom"
import NavbarPublic from "../components/Navbars/NavbarPublic"

const AdminLayout = () => {
  return (
    <div className="flex h-screen"> 
          <NavbarPublic />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />   {/* Aquí sí va */}
      </div>
    </div>
  )
}

export default AdminLayout
