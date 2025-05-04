import { useState } from "react"
import { api } from "../services/api"
import AdoptButton from "../components/Buttons/AdoptButton"
import MailIcon from "../components/IconsSvg/MailIcon"
import { addToast, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react" 

type ForgotPasswordModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState("") 
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await api.post('/auth/forgot-password', { email }) 
      addToast({
        title: "Se enviaron las instrucciones",
        description: "Revisa tu correo electrónico para restablecer tu contraseña.",
        timeout: 3000,
        color: "success",
        shouldShowTimeoutProgress: true,
      })
 
      setCooldown(true)
      setTimeout(() => setCooldown(false), 60000)

    } catch (err: any) {
      setError(
        err.response?.status === 404
          ? "Correo no registrado"
          : "Error al enviar el correo. Intenta nuevamente."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" className="py-5">
      <ModalContent>
        <ModalHeader className="text-lg font-bold">¿Olvidaste tu contraseña?</ModalHeader>
        <ModalBody>
          <form onSubmit={handleForgotPassword} className="space-y-5">
            <Input
              label="Correo electrónico"
              value={email}
              onValueChange={setEmail}
              placeholder="you@example.com"
              name="email"
              type="email"
              startContent={<MailIcon className="text-2xl text-default-400" />}
              isRequired
              isDisabled={cooldown}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <AdoptButton
              type="submit"
              label={
                cooldown
                  ? "Espera 1 minuto..."
                  : loading
                    ? "Enviando..."
                    : "Enviar instrucciones"
              }
              variant="primary"
              isLoading={loading}
              fullWidth
              disabled={cooldown}
            />
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ForgotPasswordModal
