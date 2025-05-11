import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // timeout: 10000,
  timeout: 60000 ,// 60 segundos para desarrollo

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

// import axios from "axios"

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   timeout: 10000,
// })

// // Lista de endpoints públicos
// const excludedPaths = ["/auth/login", "/auth/register", "/auth/google"]

// // Interceptor de solicitud
// api.interceptors.request.use(
//   (config) => {
//     const isPublic = excludedPaths.some((path) => config.url?.includes(path))
//     const token = localStorage.getItem("token")

//     if (!isPublic) {
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//         console.log(`🔐 Enviando token para ${config.url}:`, token)
//       } else {
//         console.warn(`⚠️ No se encontró token para endpoint protegido: ${config.url}`)
//       }
//     } else {
//       console.log(`🔓 Endpoint público: ${config.url}`)
//     }

//     return config
//   },
//   (error) => {
//     console.error("❌ Error en solicitud Axios:", error)
//     return Promise.reject(error)
//   }
// )

// // Interceptor de respuesta para manejar errores
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       console.error("❌ Error de respuesta:", {
//         url: error.config?.url,
//         status: error.response.status,
//         data: error.response.data,
//       })

//       // ⚠️ Solo mostrar advertencia, no eliminar token aún
//       if (error.response.status === 401 || error.response.status === 403) {
//         console.warn("⚠️ Token posiblemente inválido o expirado (no se redirige automáticamente para debug).")
//         // Puedes habilitar esta lógica cuando termines de depurar:
//         // localStorage.removeItem("token")
//         // window.location.href = "/login"
//       }
//     } else {
//       console.error("❌ Error sin respuesta del servidor:", error)
//     }

//     return Promise.reject(error)
//   }
// )
