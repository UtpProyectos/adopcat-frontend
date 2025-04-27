import { useNavigate } from "react-router-dom"
import { AlertTriangle } from "lucide-react" 
import { useAuth } from "../../context/AuthContext"

const VerificationAlert = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user || user.verified) return null

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg flex items-start gap-4 mb-6">
      <AlertTriangle className="mt-1" />
      <div className="flex-1">
        <p className="font-semibold text-sm">
          Tu perfil aún no está verificado.
        </p>
        <p className="text-sm mb-2">
          Para poder adoptar gatos o participar en eventos oficiales de AdoCat, primero debes verificar tu identidad.
        </p>
        <button
          onClick={() => navigate("/verificar")}
          className="text-sm font-semibold text-prymary hover:underline"
        >
          Verificar perfil
        </button>
      </div>
    </div>
  )
}

export default VerificationAlert
