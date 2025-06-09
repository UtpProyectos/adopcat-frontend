import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
  } from "@heroui/react"
  import { useState } from "react"
  import { userService } from "../../../../../services/user"
  
  interface Props {
    isOpen: boolean
    onClose: () => void
    onCreated?: () => void
  }
  
  export default function CreateAdminModal({ isOpen, onClose, onCreated }: Props) {
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    })
  
    const [loading, setLoading] = useState(false)
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = async () => {
      try {
        setLoading(true)
        await userService.createAdmin(form)
        onCreated?.()
        onClose()
      } catch (error) {
        console.error("Error al crear admin", error)
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Registrar Administrador</ModalHeader>
          <ModalBody className="space-y-4">
            <Input
              label="Nombres"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              isRequired
            />
            <Input
              label="Apellidos"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              isRequired
            />
            <Input
              label="Correo Electrónico"
              name="email"
              value={form.email}
              onChange={handleChange}
              isRequired
              type="email"
            />
            <Input
              label="Contraseña"
              name="password"
              value={form.password}
              onChange={handleChange}
              isRequired
              type="password"
            />

            
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={onClose}>Cancelar</Button>
            <Button color="primary" isLoading={loading} onPress={handleSubmit}>
              Registrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  