import { useState } from "react"
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, InputOtp, addToast
} from "@heroui/react" 
import { userService } from "../../../../../services/user"

interface Props {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
  userId: string
  onSuccess: () => void
}

const PhoneVerificationModal = ({ isOpen, onClose, phoneNumber, userId, onSuccess }: Props) => {
  const [otpValue, setOtpValue] = useState("")
  const [codeSent, setCodeSent] = useState(false)

  const sendCode = async () => {
    try {
      phoneNumber =  `+51${phoneNumber}`
      await userService.sendPhoneVerification(phoneNumber)
      setCodeSent(true)
      addToast({ title: "Código enviado", description: "Revisa tu celular.", color: "success" })
    } catch (err: any) {
      addToast({ title: "Error", description: err?.response?.data?.message || "Error al enviar código.", color: "danger" })
    }
  }

  const verifyCode = async () => {
    try {
      phoneNumber =  `+51${phoneNumber}`
      await userService.verifyPhoneCode(userId, phoneNumber, otpValue) 
      addToast({ title: "Teléfono verificado", color: "success" })
      onSuccess()
      onClose()  
    } catch (err: any) {
      console.error(err)
      addToast({ title: "Error", description: err?.response?.data?.message || "Error al verificar código.", color: "danger" })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Verificación de Teléfono</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          {!codeSent ? (
            <>
              <p>Haz clic para recibir un código por SMS.</p>
              <Button onClick={sendCode}>Enviar código</Button>
            </>
          ) : (
            <>
              <p>Ingresa el código recibido:</p>
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

export default PhoneVerificationModal
