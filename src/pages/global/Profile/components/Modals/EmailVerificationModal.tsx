import { useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputOtp,
  addToast
} from "@heroui/react"
import { userService } from "../../../../../services/user"

interface Props {
  isOpen: boolean
  onClose: () => void
  email: string
  userId: string
  onSuccess: () => void
}

const EmailVerificationModal = ({ isOpen, onClose, email, userId, onSuccess }: Props) => {
  const [otpValue, setOtpValue] = useState("")
  const [codeSent, setCodeSent] = useState(false)

  const sendCode = async () => {
    try {
      await userService.sendEmailVerification(userId)
      setCodeSent(true)
      addToast({
        title: "Código enviado",
        description: "Revisa tu bandeja de entrada.",
        color: "success"
      })
    } catch (err: any) {
      addToast({
        title: "Error",
        description: err?.response?.data?.message || "Error al enviar el código.",
        color: "danger"
      })
    }
  }

  const verifyCode = async () => {
    try {
      await userService.verifyEmailCode(userId, email, otpValue)
      addToast({
        title: "Correo verificado",
        color: "success"
      })
      onSuccess()
      onClose()
    } catch (err: any) {
      addToast({
        title: "Error",
        description: err?.response?.data?.message || "Error al verificar el código.",
        color: "danger"
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Verificación de Correo</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          {!codeSent ? (
            <>
              <p>Haz clic para recibir un código al correo electrónico:</p>
              <Button onClick={sendCode}>Enviar código</Button>
            </>
          ) : (
            <>
              <p>Ingresa el código que recibiste:</p>
              <InputOtp length={6} value={otpValue} onValueChange={setOtpValue} />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {codeSent ? (
            <Button color="primary" onClick={verifyCode}>Verificar</Button>
          ) : (
            <Button onClick={onClose}>Cancelar</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EmailVerificationModal
