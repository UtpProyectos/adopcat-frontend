import { useParams, Outlet } from "react-router-dom"
import { OrganizationProvider, useOrganization } from "../context/OrganizationContext"
import SidebarOrganizations from "../components/Sidebars/SidebarOrganizations"
import OrganizationLoadingScreen from "../components/common/OrganizationLoadingScreen"
import OrganizationNotFound from "../pages/organization/NotFound/OrganizationNotFound"

export default function OrganizationDetailLayout() {
  const { id } = useParams<{ id: string }>()

  if (!id) return <div className="p-6 text-center text-red-600 font-semibold">ID de organización no válido</div>

  return (
    <OrganizationProvider id={id}>
      <OrganizationLayoutContent />
    </OrganizationProvider>
  )
}

function OrganizationLayoutContent() {
  const { organization, loading, error } = useOrganization()

  if (loading) return <OrganizationLoadingScreen />


  if (error || !organization)
    return <OrganizationNotFound />

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark">
      <SidebarOrganizations organization={organization} />
      <main className="flex-1 p-6 overflow-auto min-h-0">
        <Outlet context={{ organization }} />
      </main>
    </div>


  )
}
