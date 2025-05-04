import { AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom" 


interface AlertProps {
  title: string
  description: string
  buttonText: string
  redirectTo: string
  backgroundImage?: string // URL o import de imagen
}

const Alert = ({
  title,
  description,
  buttonText,
  redirectTo,
  backgroundImage ="../../assets/bg/Cats_legs.png", // ruta pública o importada
}: AlertProps) => {
  const navigate = useNavigate()

  return (
    <div
      className="relative bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-xl flex items-start gap-4 overflow-hidden shadow-md mb-6"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Capa para contraste */}
      <div className="absolute inset-0 bg-yellow-100/60 backdrop-blur-sm pointer-events-none" />

      <div className="relative z-10 flex items-start gap-4">x
        <AlertTriangle className="mt-1 min-w-[20px]" />

        <div className="flex-1">
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-sm mb-2">{description}</p>
          <button
            onClick={() => navigate(redirectTo)}
            className="text-sm font-semibold text-yellow-800 hover:text-yellow-900 underline underline-offset-2 transition"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Alert
