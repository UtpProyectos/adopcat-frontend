import { GoogleLogin } from "@react-oauth/google"
import { api } from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const GoogleLoginButton = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await api.post("/auth/google", {
        idToken: credentialResponse.credential,
      })

      // ✅ ahora también guardamos el usuario con rol
      login(res.data.token, res.data.user)
      navigate("/")
    } catch (error) {
      console.error("Error al loguearse con Google", error)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full ">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.error("Error en login con Google")}
          theme="outline"              // Estilo claro
          size="large"                 // Más visible
          shape="pill"                 // Bordes redondeados
          text="signin_with"           // Texto suave
          logo_alignment="left"        // Logo al lado
          width="100%"                 // Ocupa todo el ancho del contenedor
        />
      </div>
    </div>
  )
}

export default GoogleLoginButton
