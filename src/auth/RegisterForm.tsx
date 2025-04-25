import { useState } from "react"
import { api } from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Input } from "@heroui/react" 
import AdoptButton from "../components/Buttons/AdoptButton"
import { User } from "lucide-react"
import MailIcon from "../components/IconsSvg/MailIcon"
import LockIcon from "../components/IconsSvg/LockIcon"

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      })
      login(res.data.token, res.data.user)
      navigate("/")
    } catch (err: any) {
      console.error("Error al registrarse", err)
      setError("Ocurrió un error al registrarse. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-4">
      <Input
        label="Nombre"
        labelPlacement="outside"
        value={firstName}
        onValueChange={setFirstName}
        placeholder="Juan"
        startContent={<User className="w-5 h-5 text-default-400" />}
        isRequired
      />
      <Input
        label="Apellido"
        labelPlacement="outside"
        value={lastName}
        onValueChange={setLastName}
        placeholder="Pérez"
        startContent={<User className="w-5 h-5 text-default-400" />}
        isRequired
      />
      <Input
        label="Correo electrónico"
        labelPlacement="outside"
        type="email"
        value={email}
        onValueChange={setEmail}
        placeholder="correo@ejemplo.com"
        startContent={<MailIcon className="text-2xl text-default-400" />}
        isRequired
      />
      <Input
        label="Contraseña"
        labelPlacement="outside"
        type="password"
        value={password}
        onValueChange={setPassword}
        placeholder="********"
        startContent={<LockIcon className="w-5 h-5 text-default-400" />}
        isRequired
      />

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
 
        <AdoptButton
         type="submit"
          label={loading ? "Registrando..." : "Registrarse"}
          variant="secondary"
          isLoading={loading}
          fullWidth
        /> 
    </form>
  )
}

export default RegisterForm
