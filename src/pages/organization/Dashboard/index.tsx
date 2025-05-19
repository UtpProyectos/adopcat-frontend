import { useOrganization } from "../../../context/OrganizationContext"

 
export default function OrganizationDashboard() {
  const { organization, loading } = useOrganization()

  if (loading) return <div>Cargando...</div>

  return (
    <div>
      <h1>Dashboard de {organization?.name}</h1>
      {/* contenido */}
    </div>
  )
}
