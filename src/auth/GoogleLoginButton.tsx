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
      navigate("/dashboard")
    } catch (error) {
      console.error("Error al loguearse con Google", error)
    }
  }

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => console.error("Error en login con Google")}
    />
  )
}

export default GoogleLoginButton
