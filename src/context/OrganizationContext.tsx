import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { OrganizationResponse } from "../models/organization"
import { organizationService } from "../services/organization"

interface OrganizationContextProps {
  organization: OrganizationResponse | null
  loading: boolean
  error: Error | null
  refreshOrganization: () => void
  setOrganization: (org: OrganizationResponse | null) => void
  updateOrganization: (data: Partial<OrganizationResponse>) => Promise<void>
}

const OrganizationContext = createContext<OrganizationContextProps | undefined>(undefined)

export const OrganizationProvider = ({ id, children }: { id: string; children: ReactNode }) => {
  const [organization, setOrganization] = useState<OrganizationResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchOrganization = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await organizationService.getById(id)
      setOrganization(res.data)
    } catch (err) {
      setError(err as Error)
      setOrganization(null)
    } finally {
      setLoading(false)
    }
  }

  // Método para actualizar organización via servicio y actualizar state
  const updateOrganization = async (data: Partial<OrganizationResponse>) => {
    if (!organization) throw new Error("No hay organización cargada")
    try {
      await organizationService.update(organization.organizationId, data)
      // Luego refresca la organización actualizada
      await fetchOrganization()
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    fetchOrganization()
  }, [id])

  return (
    <OrganizationContext.Provider
      value={{ organization, loading, error, refreshOrganization: fetchOrganization, setOrganization, updateOrganization }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}

export const useOrganization = () => {
  const context = useContext(OrganizationContext)
  if (!context) throw new Error("useOrganization debe usarse dentro de OrganizationProvider")
  return context
}
