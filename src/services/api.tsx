import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

// Lista de endpoints públicos
const excludedPaths = ["/auth/login", "/auth/register", "/auth/google"]

// Interceptor de solicitud
api.interceptors.request.use(
  (config) => {
    const isPublic = excludedPaths.some((path) => config.url?.includes(path))

    if (!isPublic) {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de respuesta para manejar expiración de token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.warn("⚠️ Token inválido o expirado. Cerrando sesión.")
      localStorage.removeItem("token")
      window.location.href = "/login" // Redirige al login
    }

    return Promise.reject(error)
  }
)
