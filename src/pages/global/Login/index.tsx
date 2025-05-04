import { useEffect, useState } from "react"
import RegisterForm from "../../../auth/RegisterForm"
import ForgotPasswordModal from "../../../auth/ForgotPasswordModal"
import LoginForm from "../../../auth/LoginForm"
import GoogleLoginButton from "../../../auth/GoogleLoginButton"
import { useAuth } from "../../../context/AuthContext"
import { useNavigate, useLocation, NavLink } from "react-router-dom"
import catLogin from "../../../assets/cats/cat-catalogo.png"
import { motion } from "framer-motion"
import iconAdocat from '../../../assets/icons/icon-adocat.png'
import iconAdocatDark from '../../../assets/icons/icon-adocat-dark.png'
import { useTheme } from "../../../context/ThemeContext"

const LoginPage = () => {
  const { theme } = useTheme()
  const { token } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const fromState = location.state as { register?: boolean }

  const [showRegister, setShowRegister] = useState(false)

  const [showForgotModal, setShowForgotModal] = useState(false)

  useEffect(() => {
    if (token) {
      navigate("/", {
        state: {
          toast: {
            title: "Inicio de sesión exitoso",
            description: "Bienvenido de nuevo.",
            timeout: 3000,
            color: "success",
            shouldShowTimeoutProgress: true,
          },
        },
      })
      
    }

    if (fromState?.register) {
      setShowRegister(true)
      navigate(location.pathname, { replace: true, state: {} }) // ✅ limpia el estado
    } else if (fromState?.register === false) {
      setShowRegister(false)
      navigate(location.pathname, { replace: true, state: {} }) // ✅ limpia el estado
    }
  }, [token, navigate, fromState, location.pathname])

  const baseClasses =
    "flex flex-col justify-center items-center px-6 py-1 md:p-20 md:py-1 z-10 w-full min-h-screen"

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-body dark:bg-dark relative overflow-hidden">
      <div className="absolute top-5 left-5 z-40">
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={theme === "dark" ? iconAdocatDark : iconAdocat}
            alt="AdoCat"
            className="w-8 h-8"
          />
          <span className="font-bold text-lg">AdoCat</span>
        </NavLink>
      </div>
      {/* LOGIN FORM */}
      <div className={`${showRegister ? "hidden md:flex" : "flex"} ${baseClasses}`}>
        <div className="w-full max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-center">Iniciar sesión</h1>
          <LoginForm />
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 my-2">o</p>
            <GoogleLoginButton />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:underline cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>


          <div className="text-center ">
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
        <div className="w-full max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-center">Crear cuenta</h1>
          <RegisterForm />
          <div className="text-center">
            <button
              onClick={() => setShowRegister(false)}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        </div>
      </div>

      {/* IMAGEN MÓVIL SOLO EN DESKTOP */}
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

      <ForgotPasswordModal isOpen={showForgotModal} onClose={() => setShowForgotModal(false)} />

    </div>

    
  )
}

export default LoginPage
