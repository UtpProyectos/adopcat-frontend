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
  uploadDni: (userId: string, file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    return api.post(`/users/${userId}/dni`, formData)
  },

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
  },

  /**
   * 🔐 Cambia la contraseña del usuario autenticado
   */
  changePassword: (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => {
    return api.put(`/users/${userId}/change-password`, null, {
      params: { currentPassword, newPassword }
    })
  },

  /**
   * 📲 Enviar código de verificación al número de teléfono
   */
  sendPhoneVerification: (phoneNumber: string) => {
    return api.post("/users/send-phone-verification", { phoneNumber })
  },

  /**
   * ✅ Verificar código recibido por SMS
   */
  verifyPhoneCode: (
    userId: string,
    phoneNumber: string,
    code: string
  ) => {
    return api.post(`/users/${userId}/verify-phone`, {
      phoneNumber,
      code
    })
  },
  /**
 * 📧 Enviar código de verificación al correo electrónico
 */
  sendEmailVerification: (userId: string) => {
    return api.post(`/users/${userId}/verify-email/send`)
  },

  /**
   * ✅ Verificar código recibido por correo electrónico
   */
  verifyEmailCode: (userId: string, email: string, code: string) => {
    return api.post(`/users/${userId}/verify-email/confirm`, {
      email,
      code
    })
  }
}