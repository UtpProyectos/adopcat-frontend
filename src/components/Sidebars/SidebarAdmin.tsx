import {
    IconLayoutDashboard,
    IconUsers, 
    IconBuildingCommunity, 
    IconLogout,
    IconChevronLeft,
    IconChevronRight,
    IconHome,
  } from "@tabler/icons-react"
  import { NavLink, useNavigate } from "react-router-dom"
  import { useAuth } from "../../context/AuthContext"
  import { useState } from "react"
import { Award } from "lucide-react"
  
  const adminLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: IconLayoutDashboard },
    { label: "Usuarios", href: "/admin/users", icon: IconUsers },
    { label: "Organizaciones", href: "/admin/organizaciones", icon: IconBuildingCommunity },
    { label: "Donaciones", href: "/admin/donations", icon: Award  },
  ]
  
  const SidebarAdmin = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
  
    return (
      <aside
        className={`h-screen transition-all duration-300 bg-body dark:bg-dark  dark:border-neutral-700 shadow-xl
          ${collapsed ? "w-17" : "w-64"}`} 
      >
        <div className="flex flex-col h-full justify-between py-6 px-3">
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              {!collapsed && (
                <h2 className="text-xl font-bold text-primary">AdoCat</h2>
              )}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer"
              >
                {collapsed ? <IconChevronRight size={20} /> : <IconChevronLeft size={20} />}
              </button>
            </div>
  
            <nav className="flex flex-col gap-2 mt-6">
              {adminLinks.map(({ label, href, icon: Icon }) => (
                <NavLink
                  key={label}
                  to={href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gray-100 dark:bg-neutral-800 text-primary"
                        : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800"
                    }`
                  }
                >
                  <Icon size={20} />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
  
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all cursor-pointer"
            >
              <IconHome size={20} />
              {!collapsed && <span>Volver a la web</span>}
            </button>
  
            <button
              onClick={() => {
                logout()
                navigate("/")
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-all cursor-pointer"
            >
              <IconLogout size={20} />
              {!collapsed && <span>Cerrar sesión</span>}
            </button>
          </div>
        </div>
      </aside>
    )
  }
  
  export default SidebarAdmin
  