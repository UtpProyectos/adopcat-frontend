
import { Outlet } from "react-router-dom" 
import SidebarAdmin from "../components/Sidebars/SidebarAdmin"

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
