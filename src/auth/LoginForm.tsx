import { useState } from "react"
import { api } from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { addToast, Input } from "@heroui/react" 
import { EyeFilledIcon, EyeSlashFilledIcon } from "../components/IconsSvg/EyeIcons"
import AdoptButton from "../components/Buttons/AdoptButton"
import MailIcon from "../components/IconsSvg/MailIcon"
import LockIcon from "../components/IconsSvg/LockIcon"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await api.post("/auth/login", { email, password })
      login(res.data.token, res.data.user)
      
      navigate("/")
    
    } catch (err: any) {
      console.error("Error al iniciar sesión", err) 
      setError(
        err.response?.data?.message || "Error de conexión. Intenta nuevamente."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto" autoComplete="on">
      <div className="space-y-4 flex flex-col gap-1">
        <Input
          label="Email"
          labelPlacement="outside"
          value={email}
          onValueChange={setEmail}
          placeholder="you@example.com"
          name="email"
          type="email"
          autoComplete="email"
          startContent={<MailIcon className="text-2xl text-default-400" />}
          isRequired
        />
        <Input
          label="Contraseña"
          labelPlacement="outside"
          value={password}
          onValueChange={setPassword}
          name="password"
          placeholder="••••••••"
          autoComplete="current-password"
          type={isVisible ? "text" : "password"}
          startContent={<LockIcon className="w-5 h-5 text-default-400" />}
          endContent={
            <button
              type="button"
              aria-label="toggle password visibility"
              onClick={() => setIsVisible(!isVisible)}
              className="focus:outline-none"
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          isRequired
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <AdoptButton
        type="submit"
        label={loading ? "Ingresando..." : "Iniciar sesión"}
        variant="primary"
        isLoading={loading}
        fullWidth
      />
    </form>
  )
}

export default LoginForm
