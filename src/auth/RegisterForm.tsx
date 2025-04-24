import { useState } from "react"
import { api } from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      })
      // ✅ ahora pasamos también el user al contexto
      login(res.data.token, res.data.user)
      navigate("/dashboard") // redirige después del registro
    } catch (err: any) {
      console.error("Error al registrarse", err)
      setError("Ocurrió un error al registrarse. Inténtalo de nuevo.")
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        type="submit"
      >
        Registrarse
      </button>
    </form>
  )
}

export default RegisterForm
