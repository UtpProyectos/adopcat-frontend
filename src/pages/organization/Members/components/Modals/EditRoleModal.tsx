import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Button,
  addToast,
} from "@heroui/react";
import { useState } from "react";
import { organizationMemberService } from "@/services/organizationMember";
import { MemberResponse } from "@/models/organizationMember";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  member: MemberResponse | null;
  organizationId: string;
  onSuccess: () => void;
}

const roles = [
  { key: "OWNER", label: "Propietario" },
  { key: "VOLUNTARIO", label: "Voluntario" },
];

export default function EditRoleModal({
  isOpen,
  onClose,
  member,
  organizationId,
  onSuccess,
}: Props) {
  const [selectedRole, setSelectedRole] = useState<string>(member?.roleInOrg || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!member || !selectedRole) return;

    try {
      setLoading(true);
      await organizationMemberService.addMember(organizationId, {
        userId: member.userId,
        roleInOrg: selectedRole,
        organizationName: "", // no es necesario para update
      });
      addToast({
        title: "Rol actualizado",
        description: `${member.userFullName} ahora es ${selectedRole}`,
        color: "success",
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      addToast({
        title: "Error",
        description: error?.response?.data?.message || "No se pudo actualizar el rol",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Editar rol</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Select
            label="Nuevo rol"
            selectedKeys={selectedRole ? [selectedRole] : []}
            onSelectionChange={(keys) => setSelectedRole(Array.from(keys)[0] as string)}
          >
            {roles.map((r) => (
              <SelectItem key={r.key}>{r.label}</SelectItem>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            onPress={handleSave}
            isLoading={loading}
            isDisabled={!selectedRole}
          >
            Guardar cambios
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
