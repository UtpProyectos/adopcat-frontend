import { useEffect, useState } from "react"
import RegisterForm from "../../../auth/RegisterForm"
import LoginForm from "../../../auth/LoginForm"
import GoogleLoginButton from "../../../auth/GoogleLoginButton"
import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import catLogin from "../../../assets/cats/cat-catalogo.png"
import { motion } from "framer-motion"

const LoginPage = () => {
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate])

  const [showRegister, setShowRegister] = useState(false)

  const baseClasses =
    "flex flex-col justify-center items-center px-6 py-16 md:p-20 z-10 w-full min-h-screen"

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-body dark:bg-dark relative overflow-hidden">
      
      {/* LOGIN FORM */}
      <div className={`${showRegister ? "hidden md:flex" : "flex"} ${baseClasses}`}>
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">Iniciar sesión</h1>
          <LoginForm />
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 my-2">o</p>
            <GoogleLoginButton />
          </div>
          <div className="text-center pt-4">
            <button
              onClick={() => setShowRegister(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </div>
        </div>
      </div>

      {/* REGISTER FORM */}
      <div className={`${!showRegister ? "hidden md:flex" : "flex"} ${baseClasses}`}>
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-center">Crear cuenta</h1>
          <RegisterForm />
          <div className="text-center pt-4">
            <button
              onClick={() => setShowRegister(false)}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        </div>
      </div>

      {/* IMAGEN ANIMADA SOLO EN DESKTOP */}
      <motion.div
        animate={{ left: showRegister ? "0%" : "50%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="hidden md:flex items-center justify-center absolute top-0 w-1/2 h-full bg-gray-100 dark:bg-zinc-900 z-30 shadow-xl"
        style={{ position: "absolute" }}
      >
        <img
          src={catLogin}
          alt="Ilustración"
          className="w-3/4 h-auto object-contain pointer-events-none"
        />
      </motion.div>
    </div>
  )
}

export default LoginPage
