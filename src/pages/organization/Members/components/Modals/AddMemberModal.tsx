import { useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  addToast
} from "@heroui/react"
import { User } from "@/models/user"
import { organizationMemberService } from "@/services/organizationMember"
import UserSearchSelect from "@/components/Inputs/UserSearchSelect"

interface Props {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  existingMemberIds: string[]
  organizationId: string
  organizationName: string
}

export default function AddMemberModal({
  isOpen,
  onClose,
  onSuccess,
  existingMemberIds,
  organizationId,
  organizationName,
}: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (!selectedUser || !selectedRole) return
    try {
      setLoading(true)
      console.log("Miembro agregado:", selectedUser.userId, selectedRole)
      
      await organizationMemberService.addMember(organizationId, {
        userId: selectedUser.userId,
        roleInOrg: selectedRole,
        organizationName,
      })

      console.log("Miembro agregado:", selectedUser.userId, selectedRole)
      addToast({
        title: "Miembro agregado",
        description: `${selectedUser.firstName} fue agregado con rol ${selectedRole}`,
        color: "success",
      })
      onSuccess()
      onClose()
      setSelectedUser(null)
      setSelectedRole("")
    } catch (error: any) {
      addToast({
        title: "Error",
        description: error?.response?.data?.message || "No se pudo agregar el miembro",
        color: "danger",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Agregar nuevo miembro</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <UserSearchSelect
            onSelect={setSelectedUser}
            organizationMembersIds={existingMemberIds}
          />

          <Select
            label="Rol en la organización"
            placeholder="Selecciona un rol"
            selectedKeys={selectedRole ? [selectedRole] : []}
            onSelectionChange={(keys) => setSelectedRole(Array.from(keys)[0] as string)}
          >
            <SelectItem key="OWNER">OWNER</SelectItem>
            <SelectItem key="VOLUNTARIO">VOLUNTARIO</SelectItem>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>Cancelar</Button>
          <Button
            color="primary"
            onPress={handleAdd}
            isLoading={loading}
            isDisabled={!selectedUser || !selectedRole}
          >
            Agregar miembro
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
