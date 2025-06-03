import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Spinner,
} from "@heroui/react"
import { useState } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
  userEmail: string
  onConfirm: () => void
  loading: boolean
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  userEmail,
  onConfirm,
  loading,
}: Props) {
  const [confirmInput, setConfirmInput] = useState("")
  const [touched, setTouched] = useState(false)

  const handleClose = () => {
    setConfirmInput("")
    setTouched(false)
    onClose()
  }

  const isMatch = confirmInput.trim() === userEmail.trim()
  const showError = touched && !isMatch

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        <ModalHeader>Confirmar eliminación de cuenta</ModalHeader>

        <ModalBody className="flex flex-col gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Esta acción desactivará tu cuenta de inmediato. Tu información será eliminada completamente en <strong>90 días</strong>.
          </p>

          <p className="text-sm">
            Para confirmar, escribe tu correo exacto:
          </p>
          <strong className="text-center break-words text-danger">{userEmail}</strong>

          <Input
            isInvalid={showError}
            errorMessage={showError ? "Debe coincidir con tu correo" : ""}
            placeholder="Escribe tu correo aquí"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            onBlur={() => setTouched(true)}
            disabled={loading}
          />
        </ModalBody>

        <ModalFooter>
          <Button color="default" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            color="danger"
            onPress={onConfirm}
            isDisabled={!isMatch || loading}
            isLoading={loading}
          >
            {loading ? "Procesando..." : "Desactivar cuenta"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
