import {
  IconLayoutDashboard,
  IconBuildingCommunity,
  IconUsers,
  IconCat,
  IconInbox,
  IconSettings,
  IconChevronLeft,
  IconChevronRight,
  IconHome,
} from "@tabler/icons-react"
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { User } from "@heroui/react"

interface Organization {
  organizationId: string
  name: string
  coverPhotoUrl?: string
  tipo?: string
  verified?: boolean
}

interface SidebarProps {
  organization?: Organization | null
}

const SidebarOrganizations = ({ organization }: SidebarProps) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const orgId = organization?.organizationId || ""

  // Links que siempre se muestran (Dashboard)
  const baseLinks = [
    {
      label: "Dashboard",
      href: `/organizations/${orgId}`,
      icon: IconLayoutDashboard,
    },
    {
      label: "Configuración",
      href: `/organizations/${orgId}/settings`,
      icon: IconSettings,
    },
  ]

  // Links adicionales si la organización está verificada
  const verifiedLinks = [
    {
      label: "Gatos Rescatados",
      href: `/organizations/${orgId}/cats`,
      icon: IconCat,
    },
    {
      label: "Solicitudes de Adopción",
      href: `/organizations/${orgId}/adoptions`,
      icon: IconInbox,
    },
    {
      label: "Miembros",
      href: `/organizations/${orgId}/members`,
      icon: IconUsers,
    },
    {
      label: "Donaciones",
      href: `/organizations/${orgId}/donations`,
      icon: IconBuildingCommunity,
    },

  ]

  // Decide qué links mostrar según verificación
  const orgLinks = organization?.verified ? [...baseLinks, ...verifiedLinks] : baseLinks

  const orgAvatar = organization?.coverPhotoUrl
    ? organization.coverPhotoUrl
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
      organization?.name || "Org"
    )}&background=0D8ABC&color=fff`

  return (
    <aside
      className={`h-screen transition-all duration-300 bg-body dark:bg-dark dark:border-neutral-700 shadow-xl
        ${collapsed ? "w-17" : "w-64"}`}
    >
      <div className="flex flex-col h-full justify-between py-6 px-3">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            {!collapsed && organization && (
              <User
                avatarProps={{ radius: "lg", src: orgAvatar }}
                name={organization.name}
                description={organization.tipo || ""}
                className="text-center"
              />
            )}

            {!collapsed && !organization && (
              <h2 className="text-xl font-bold text-primary">Organizaciones</h2>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer"
              aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
            >
              {collapsed ? <IconChevronRight size={20} /> : <IconChevronLeft size={20} />}
            </button>
          </div>

          <nav className="flex flex-col gap-2 mt-6">
            {orgLinks.map(({ label, href, icon: Icon }) => (
              <NavLink
                key={label}
                to={href}
                end={href === `/organizations/${organization?.organizationId}`} // <-- Solo exacto para dashboard
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${isActive
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
        </div>
      </div>
    </aside>
  )
}

export default SidebarOrganizations
