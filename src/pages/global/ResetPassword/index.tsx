import {  useState } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import { Card, Progress } from "@heroui/react"
import AdoptButton from "../../../components/Buttons/AdoptButton"
import { api } from "../../../services/api" 
import { validarPassword } from "../../../auth/passwordValidator"
import InputPassword from "../../../components/Inputs/InputPassword"

const ResetPasswordPage = () => {
  const [params] = useSearchParams()
  const token = params.get("token")
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false) 

  const { score, strengthLabel, suggestions, color } = validarPassword(password)
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden.")
    }

    if (score < 3) {
      return setError("La contraseña es demasiado débil. Usa una combinación más segura.")
    }

    try {
      await api.post("/auth/reset-password", { token, newPassword: password })
      setSuccess(true)
      setTimeout(() => navigate("/login"), 3000)
    } catch (err: any) {
      setError("El enlace es inválido o ha expirado.")
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-body dark:bg-dark px-4">
      <Card className="w-full max-w-md p-6 bg-white dark:bg-dark rounded-4xl shadow-primary">
        <h1 className="text-2xl font-bold text-center">Restablecer contraseña</h1>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col mt-4">
          <InputPassword
            label="Confirmar nueva contraseña"
            value={password}
            onChange={setPassword}
            isRequired
          />

          {password && (
            <div className="space-y-1">
              <Progress
                value={(score + 1) * 20}
                color={color}
                showValueLabel={false}
              />
              <p className={`text-sm font-medium ${color === "danger"
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

          <InputPassword
            label="Confirmar nueva contraseña"
            value={confirmPassword}
            onChange={setConfirmPassword}
            isRequired
          />



          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Contraseña actualizada con éxito. Redirigiendo...
            </p>
          )}

          <AdoptButton
            label="Restablecer contraseña"
            type="submit"
            variant="primary"
            className="m-auto"
          />

          {/* Enlace para volver al login */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
            ¿Recordaste tu contraseña?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Volver a iniciar sesión
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default ResetPasswordPage
