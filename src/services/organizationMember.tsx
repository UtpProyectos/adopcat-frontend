import { api } from "./api"

export const organizationMemberService = {
  /**
   * 🔍 Obtiene todos los miembros activos de una organización
   */
  getActiveMembers: (organizationId: string) => {
    return api.get(`/organizations/${organizationId}/members`)
  },

  /**
   * ➕ Agrega un nuevo miembro a la organización
   */
  addMember: (
    organizationId: string,
    data: {
      userId: string
      roleInOrg: string
      organizationName: string // para enviar al correo
    }
  ) => {
    return api.post(`/organizations/${organizationId}/members`, data)
  },

  /**
   * ❌ Inactiva a un miembro de la organización
   */
  deactivateMember: (organizationId: string, userId: string) => {
    return api.put(`/organizations/${organizationId}/members/${userId}/deactivate`)
  },

  /**
   * ♻️ Reactiva a un miembro previamente inactivado
   */
  reactivateMember: (organizationId: string, userId: string) => {
    return api.put(`/organizations/${organizationId}/members/${userId}/reactivate`)
  }
}
