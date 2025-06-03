import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    User as UserCard,
    Chip,
} from "@heroui/react"
import { UserResponse } from "../../../../../models/user"
import { CircleCheck, CircleX } from "lucide-react"

interface Props {
    isOpen: boolean
    onClose: () => void
    user: UserResponse | null
}

export default function UserDetailModal({ isOpen, onClose, user }: Props) {
    if (!user) return null

    const avatar =
        user.profilePhoto ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            `${user.firstName} ${user.lastName}`
        )}&background=0D8ABC&color=fff`

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
            <ModalContent>
                <ModalHeader className="text-gray-800 dark:text-white">
                    Detalle de Usuario
                </ModalHeader>

                <ModalBody className="space-y-6 text-gray-800 dark:text-gray-200">
                    {/* Avatar + info principal */}
                    <div className="flex justify-center">
                        <UserCard
                            avatarProps={{ radius: "lg", src: avatar }}
                            name={`${user.firstName} ${user.lastName}`}
                            description={user.email}
                            className="text-center"
                        />
                    </div>

                    {/* Detalles en 2 columnas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p>
                            <strong>DNI:</strong> {user.dni || "No proporcionado"}
                        </p>
                        <p>
                            <strong>Teléfono:</strong> {user.phoneNumber || "No proporcionado"}
                        </p>
                        <p>
                            <strong>Dirección:</strong> {user.address || "No proporcionada"}
                        </p>
                        <p>
                            <strong>Rol:</strong> {user.role}
                        </p>
                        <p>
                            <strong>Email:</strong>{" "}
                            <Chip startContent={user.emailVerified ? <CircleCheck size={14} /> : <CircleX size={14} />}
                                color={user.emailVerified ? "success" : "danger"} size="sm" variant="flat">
                                {user.emailVerified ? "Verificado" : "No Verificado"}
                            </Chip>
                        </p>
                        <p>
                            <strong>Teléfono:</strong>{" "}
                            <Chip startContent={user.phoneVerified ? <CircleCheck size={14} /> : <CircleX size={14} />}
                                color={user.phoneVerified ? "success" : "danger"} size="sm" variant="flat">
                                {user.phoneVerified ? "Verificado" : "No Verificado"}
                            </Chip>
                        </p>
                        <p>
                            <strong>Admin:</strong>{" "}
                            <Chip startContent={user.adminApproved ? <CircleCheck size={14} /> : <CircleX size={14} />}
                                color={user.adminApproved ? "success" : "danger"} size="sm" variant="flat">
                                {user.adminApproved ? "Aprobado" : "No Aprobado"}
                            </Chip>
                        </p>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button color="default" onPress={onClose}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
