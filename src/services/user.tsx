import { api } from "./api"

export const userService = {
  /**
   * 🔁 Actualiza datos del perfil del usuario
   */
  updateProfile: (
    userId: string,
    data: {
      firstName?: string
      lastName?: string
      dni?: string
      phoneNumber?: string
      address?: string
    }
  ) => {
    return api.put(`/users/${userId}`, data)
  },

  /**
   * 📤 Sube el archivo del DNI del usuario
   */
  // uploadDni: (userId: string, file: File) => {
  //   const formData = new FormData()
  //   formData.append("file", file)

  //   return api.post(`/users/${userId}/dni`, formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  // },
  uploadDni: (userId: string, file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    return api.post(`/users/${userId}/dni`, formData)
  }
  ,

  /**
   * 👤 Obtiene los datos del usuario autenticado desde el backend
   */
  getProfile: () => {
    return api.get("/users/me")
  },

  /**
   * 🔍 Consulta un usuario específico (solo para admin)
   */
  getUserById: (userId: string) => {
    return api.get(`/users/${userId}`)
  }
}
