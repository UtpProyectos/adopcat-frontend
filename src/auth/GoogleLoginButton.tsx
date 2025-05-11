import { GoogleLogin } from "@react-oauth/google"
import { api } from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const GoogleLoginButton = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true)
    try {
      const res = await api.post("/auth/google", {
        idToken: credentialResponse.credential,
      })

      login(res.data.token, res.data.user)
      navigate("/")
    } catch (error) {
      console.error("Error al loguearse con Google", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-md z-10">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.error("Error en login con Google")}
          theme="outline"
          size="large"
          shape="pill"
          text="signin_with"
          logo_alignment="left"
          width="100%"
        />
      </div>
    </div>
  )
}

export default GoogleLoginButton

// import { GoogleLogin } from "@react-oauth/google"
// import { api } from "../services/api"
// import { useAuth } from "../context/AuthContext"
// import { useNavigate } from "react-router-dom"

// const GoogleLoginButton = () => {
//   const { login } = useAuth()
//   const navigate = useNavigate()

//   const handleGoogleSuccess = async (credentialResponse: any) => {
//     try {
//       const res = await api.post("/auth/google", {
//         idToken: credentialResponse.credential,
//       })

//       // ✅ ahora también guardamos el usuario con rol
//       login(res.data.token, res.data.user)
//       navigate("/")
//     } catch (error) {
//       console.error("Error al loguearse con Google", error)
//     }
//   }

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full ">
//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={() => console.error("Error en login con Google")}
//           theme="outline"              // Estilo claro
//           size="large"                 // Más visible
//           shape="pill"                 // Bordes redondeados
//           text="signin_with"           // Texto suave
//           logo_alignment="left"        // Logo al lado
//           width="100%"                 // Ocupa todo el ancho del contenedor
//         />
//       </div>
//     </div>
//   )
// }

// export default GoogleLoginButton
