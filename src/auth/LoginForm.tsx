import { useState } from "react"
import { api } from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await api.post("/auth/login", { email, password })

      // ✅ ACTUALIZADO: pasar también el usuario al contexto
      login(res.data.token, res.data.user)

      navigate("/dashboard")
    } catch (err: any) {
      console.error("Error al iniciar sesión", err)
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Credenciales inválidas. Verifica tu correo y contraseña.")
      } else {
        setError("Error de conexión. Intenta nuevamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  )
}

export default LoginForm
