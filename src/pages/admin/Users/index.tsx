import { useState, useEffect } from "react"
import { userService } from "../../../services/user"
import { addToast, Button, Chip, Switch } from "@heroui/react"
import GenericTable, { Column, StatusOption } from "../../../components/Tables/GenericTable"
import { UserResponse } from "../../../models/user"
import UserDetailModal from "./components/Modals/UserDetailModal"
import { CircleCheck, CircleX } from "lucide-react"
import CreateAdminModal from "./components/Modals/CreateAdminModal"

export default function AdminUserPage() {
  const [data, setData] = useState<UserResponse[]>([])
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)



  const fetchUsers = async () => {
    try {
      const res = await userService.getUsers()
      setData(res.data)
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching users", error)
    }
  }

  const handleToggleAdminApproval = async (userId: string, approved: boolean) => {
    try {
      await userService.updateUserApproval(userId, approved)
      fetchUsers()

      addToast({
        title: "Aprobación actualizada",
        description: "Aprobación actualizada correctamente",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
    } catch (error) {
      console.error("Error updating approval status", error)
    }
  }

  const handleToggleEnabled = async (userId: string, enabled: boolean) => {
    try {
      await userService.updateUserEnabled(userId, enabled)
      fetchUsers()
      addToast({
        title: "Estado de activación",
        description: "Estado de activación actualizado correctamente",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
    })
    } catch (error) {
      console.error("Error al cambiar estado de habilitación", error)
    }
  }


  useEffect(() => {
    fetchUsers()
  }, [])

  const columns: Column<UserResponse>[] = [
    {
      name: "ID",
      uid: "userId", // ✅ clave única
      sortable: true,
    },
    {
      name: "Usuario",
      uid: "name",
      render: (user) => (
        <div className="flex items-center gap-3">
          <img
            src={user.profilePhoto || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-medium">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      name: "Rol",
      uid: "role",
      render: (user) => (
        <Chip color={user.role === "ROLE_ADMIN" ? "success" : "warning"} variant="dot" size="sm"  >
          {user.role.replace("ROLE_", "").toLowerCase()}
        </Chip>
      ),
    },
    {
      name: "Email Verificado",
      uid: "emailVerified",
      sortable: true,
      render: (user) => (

        <Chip startContent={user.emailVerified ? <CircleCheck size={14} /> : <CircleX size={14} />}
          color={user.emailVerified ? "success" : "danger"} size="sm" variant="flat">
          {user.emailVerified ? "Verificado" : "No Verificado"}
        </Chip>
      ),
    },
    {
      name: "Telefono Verificado",
      uid: "phoneVerified",
      sortable: true,
      render: (user) => (
        <Chip startContent={user.phoneVerified ? <CircleCheck size={14} /> : <CircleX size={14} />}
          color={user.phoneVerified ? "success" : "danger"} size="sm" variant="flat">
          {user.phoneVerified ? "Verificado" : "No Verificado"}
        </Chip>
      ),
    },
    {
      name: "Admin Aprobado",
      uid: "adminApproved",
      sortable: true,
      render: (user) => (
        <Switch
          isSelected={user.adminApproved}
          onChange={() => handleToggleAdminApproval(user.userId, !user.adminApproved)}
          size="sm"
        />
      ),
    },
    {
      name: "Activo",
      uid: "enabled",
      sortable: true,
      render: (user) => (
        <Switch
          isSelected={user.enabled}
          isDisabled={user.role !== "ROLE_ADMIN"}
          onChange={() => handleToggleEnabled(user.userId, !user.enabled)}
          size="sm"
        />
      ),
    },
    {
      name: "Acciones",
      uid: "actions",
      render: (user) => (
        <Button
          size="sm"
          color="primary"
          onPress={() => {
            setSelectedUser(user)
            setShowModal(true)
          }}
        >
          Ver más
        </Button>
      ),
      align: "center",
    },
  ]


  const statusOptions: StatusOption[] = [
    { name: "Aprobado", uid: "true" },
    { name: "No Aprobado", uid: "false" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">Usuarios</h1>
      <GenericTable<UserResponse>
        columns={columns}
        data={data}
        statusOptions={statusOptions}
        statusColumnKey="adminApproved"
        filterKeys={["email", "firstName", "lastName"]}
        initialVisibleColumns={["name", "role", "emailVerified", "phoneVerified", "adminApproved", "actions"]}
        initialSort={{ column: "userId", direction: "ascending" }}
        initialRowsPerPage={5}
        onAddNew={() => setShowCreateModal(true)}

        showStatusFilter={true}
      />
      <UserDetailModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        user={selectedUser}
      />

      <CreateAdminModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={fetchUsers}
      />

    </div>
  )
}
