import { useState } from "react"
import { api } from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Input, Progress } from "@heroui/react"
import AdoptButton from "../components/Buttons/AdoptButton"
import { User } from "lucide-react"
import MailIcon from "../components/IconsSvg/MailIcon" 
import { validarPassword } from "../auth/passwordValidator"
import InputPassword from "../components/Inputs/InputPassword"

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
 

  const { login } = useAuth()
  const navigate = useNavigate()

  const { score, color, strengthLabel, suggestions } = validarPassword(password)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (score < 3) {
      return setError("La contraseña es demasiado débil. Usa una combinación más segura.")
    }

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
      setError(err.response?.data?.message || "Error de conexión. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-4 flex flex-col gap-1" autoComplete="off">
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
    
      <InputPassword
                    label="Confirmar nueva contraseña"
                    value={password}
                    onChange={setPassword}
                    isRequired
                  />

      {/* Seguridad de contraseña */}
      {password && (
        <div className="space-y-1">
          <Progress
            value={(score + 1) * 20}
            color={color}
            showValueLabel={false}
          />
          <p className={`text-sm font-medium ${
            color === "danger"
              ? "text-red-600"
              : color === "warning"
              ? "text-yellow-600"
              : "text-green-600"
          }`}>
            Seguridad: {strengthLabel}
          </p>
          {suggestions.length > 0 && (
            <ul className="text-xs text-gray-500 list-disc pl-5">
              {suggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          )}
        </div>
      )}

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
