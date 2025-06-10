import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useOrganization } from "@/context/OrganizationContext"
import { Avatar, Chip, addToast } from "@heroui/react"
import GenericTable, { Column } from "@/components/Tables/GenericTable"
import { MemberResponse } from "@/models/organizationMember"
import { organizationMemberService } from "@/services/organizationMember"
import AddMemberModal from "./components/Modals/AddMemberModal"
import ActionsDropdown from "@/components/Buttons/ActionsDropdown"
import EditRoleModal from "./components/Modals/EditRoleModal"

export default function OrganizationMembersPage() {
    const { organization, loading } = useOrganization()
    const [members, setMembers] = useState<MemberResponse[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedMember, setSelectedMember] = useState<MemberResponse | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);


    const fetchMembers = async () => {
        if (!organization) return
        try {
            const res = await organizationMemberService.getActiveMembers(
                organization.organizationId
            )
            setMembers(res.data)
        } catch (error: any) {
            addToast({
                title: "Error",
                description: error?.response?.data?.message || "Error al cargar miembros",
                color: "danger",
            })
        }
    }

    useEffect(() => {
        if (!loading && organization) fetchMembers()
    }, [loading, organization])

    const columns: Column<MemberResponse>[] = [
        {
            name: "Foto",
            uid: "userId",
            render: (member) => {
                const profileImage = member.profilePhoto
                    ? member.profilePhoto
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.userFullName)}&background=0D8ABC&color=fff`;

                return (
                    <Avatar
                        radius="sm"
                        src={profileImage}
                        name={member.userFullName}
                    />
                );
            },
        }
        ,
        { name: "Nombre", uid: "userFullName" },
        { name: "Correo", uid: "userEmail" },
        {
            name: "Rol",
            uid: "roleInOrg",
            render: (m) => <Chip size="sm" color="primary">{m.roleInOrg}</Chip>,
        },
        {
            name: "Estado",
            uid: "active",
            render: (m) => (
                <Chip color={m.active ? "success" : "danger"} size="sm">
                    {m.active ? "Activo" : "Inactivo"}
                </Chip>
            ),
        },
        {
            name: "Aprobado",
            uid: "approved",
            render: (m) => (
                <Chip color={m.approved ? "success" : "warning"} size="sm">
                    {m.approved ? "Sí" : "Pendiente"}
                </Chip>
            ),
        },
        {
            name: "Acciones",
            uid: "actions",
            render: (m) => (
                <ActionsDropdown
                    actions={[
                        {
                            key: "edit",
                            label: "Editar rol",
                            onClick: () => {
                                setSelectedMember(m);
                                setEditModalOpen(true);
                            },

                            color: "primary",
                        },
                        {
                            key: "deactivate",
                            label: m.active ? "Inactivar" : "Reactivar",
                            onClick: async () => {
                                try {
                                    if (m.active) {
                                        await organizationMemberService.deactivateMember(organization?.organizationId!, m.userId)
                                    } else {
                                        await organizationMemberService.reactivateMember(organization?.organizationId!, m.userId)
                                    }
                                    fetchMembers()
                                } catch (error: any) {
                                    addToast({
                                        title: "Error",
                                        description: error?.response?.data?.message || "No se pudo actualizar el estado",
                                        color: "danger",
                                    })
                                }
                            },
                            color: m.active ? "danger" : "success",
                        },
                    ]}
                />
            ),
        },
    ]

    return (
        <div>
            <h1 className="text-2xl font-bold mb-5">
                Miembros de la organización: {organization?.name || "Cargando..."}
            </h1>

            <GenericTable<MemberResponse>
                columns={columns}
                data={members}
                button_label="Agregar miembro"
                onAddNew={() => setModalOpen(true)}
                initialVisibleColumns={["userId", "userFullName", "userEmail", "roleInOrg", "active"]}
                initialRowsPerPage={10}
                filterKeys={["userFullName", "userEmail", "roleInOrg"]}
                showStatusFilter={true}
                statusColumnKey="active"
                statusOptions={[
                    { name: "Activo", uid: "true" },
                    { name: "Inactivo", uid: "false" },
                ]}
            />

            <AddMemberModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={fetchMembers}
                existingMemberIds={members.map((m) => m.userId)}
                organizationName={organization?.name || ""}
                organizationId={organization?.organizationId || ""}
            />

            <EditRoleModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                member={selectedMember}
                organizationId={organization?.organizationId || ""}
                onSuccess={fetchMembers}
            />

        </div>
    )
}
