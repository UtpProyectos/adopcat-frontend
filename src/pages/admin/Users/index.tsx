import { useState, useEffect } from "react"
import { userService } from "../../../services/user"
import { Button } from "@heroui/react"
import GenericTable, { Column, StatusOption } from "../../../components/Tables/GenericTable"

interface UserResponse {
    userId: number
    email: string
    emailVerified: boolean
    dniUrl: string
    adminApproved: boolean
}

const columns: Column<UserResponse>[] = [
    { name: "ID", uid: "userId", sortable: true },
    { name: "Email", uid: "email", sortable: true },
    {
        name: "Email Verified",
        uid: "emailVerified",
        render: (user) => (user.emailVerified ? "Verified" : "Not Verified"),
    },
    { name: "DNI URL", uid: "dniUrl" },
    {
        name: "Admin Approved",
        uid: "adminApproved",
        render: (user) => (user.adminApproved ? "Approved" : "Not Approved"),
    },
    {
        name: "Actions",
        uid: "actions",
        render: (user) => (
            <Button
                size="sm"
                color="primary"
                onPress={() => {
                    // Ejemplo de acción, puedes abrir modal o ir a detalle
                    alert(`Acciones para usuario ${user.userId}`)
                }}
            >
                Acciones
            </Button>
        ),
        align: "center",
    },
]

const statusOptions: StatusOption[] = [
    { name: "Approved", uid: "true" },
    { name: "Not Approved", uid: "false" },
]

export default function AdminUserPage() {
    const [data, setData] = useState<UserResponse[]>([])
    // const [loading, setLoading] = useState(false)

    // Si necesitas mapear adminApproved a string, hazlo solo para filtros o visualización, no para la data de la tabla
    // const mappedData = data.map((user) => ({
    //   ...user,
    //   adminApproved: user.adminApproved ? "true" : "false",
    // }))

    const fetchUsers = async () => {
        try {
            const res = await userService.getUsers()
            setData(res.data)
        } catch (error) {
            console.error("Error fetching users", error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div  >
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">Usuarios</h1>
            <GenericTable<UserResponse>
                columns={columns}
                data={data}
                statusOptions={statusOptions}
                statusColumnKey="adminApproved"
                filterKeys={["email", "dniUrl", "emailVerified"]}
                initialVisibleColumns={["userId", "email", "emailVerified", "adminApproved", "actions"]}
                initialSort={{ column: "userId", direction: "ascending" }}
                initialRowsPerPage={5}
                button_label="Add New User"
                onAddNew={() => { /* Implement modal logic here if needed */ }}
                showStatusFilter={true}

            />
        </div>

    )
}
