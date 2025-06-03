import { api } from "./api"
import { AdoptionRequestData, AdoptionResponse } from "../models/adoption"

export const adoptionService = {
  /**
   * 📤 Registrar solicitud de adopción
   */
  submitRequest: (catId: string, data: AdoptionRequestData) => {
    const formData = new FormData()

    // Añadir datos estructurados
    const json = {
      reason: data.reason,
      experience: data.experience,
      residenceType: data.residenceType,
      reactionPlan: data.reactionPlan,
      followUpConsent: data.followUpConsent,
    }

    formData.append("data", new Blob([JSON.stringify(json)], { type: "application/json" }))
    formData.append("receipt", data.receipt)
    formData.append("homePhoto", data.homePhoto)
    formData.append("commitment", data.commitment)

    return api.post(`/adoptions/${catId}/request`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  /**
   * 👤 Ver solicitudes del usuario autenticado
   */
  getMyRequests: () => {
    return api.get<AdoptionResponse[]>("/adoptions/my-requests")
  },

  /**
   * 🏠 Ver solicitudes de la organización autenticada
   */
  getOrgRequests: () => {
    return api.get<AdoptionResponse[]>("/adoptions/organization")
  },

  /**
   * ✅ Cambiar estado de solicitud (ADMIN / RESCATISTA)
   */
  updateStatus: (requestId: string, status: string) => {
    return api.patch(`/adoptions/${requestId}/status`, null, {
      params: { status },
    })
  },

  /**
   * 📝 Enviar comentario
   */
  leaveComment: (requestId: string, comment: string) => {
    return api.post(`/adoptions/${requestId}/comment`, null, {
      params: { comment },
    })
  },

  /**
   * 🐾 Marcar como entregado
   */
  approveAdoption: (requestId: string) => {
    return api.patch(`/adoptions/${requestId}/approve`)
  },
  deleteRequest: (requestId: string) => {
    return api.delete(`/adoptions/${requestId}`)
  },
}
