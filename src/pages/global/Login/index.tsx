 
import { useEffect, useState } from "react"
import RegisterForm from "../../../auth/RegisterForm"
import LoginForm from "../../../auth/LoginForm"
import GoogleLoginButton from "../../../auth/GoogleLoginButton"
import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate("/dashboard") // ✅ redirige si ya está logueado
    }
  }, [token, navigate])

  const [showRegister, setShowRegister] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {showRegister ? "Crear cuenta" : "Iniciar sesión"}
        </h1>

        {showRegister ? (
          <RegisterForm />
        ) : (
          <>
            <LoginForm />
            <div className="text-center">
              <p className="text-sm text-gray-500 my-2">o</p>
              <GoogleLoginButton />
            </div>
          </>
        )}

        <div className="text-center">
          <button
            onClick={() => setShowRegister(!showRegister)}
            className="text-blue-600 hover:underline text-sm"
          >
            {showRegister
              ? "¿Ya tienes cuenta? Inicia sesión"
              : "¿No tienes cuenta? Regístrate"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
