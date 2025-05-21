import { useState, useEffect } from "react"
import GenericTable, { Column, StatusOption } from "../../../../../components/Tables/GenericTable"
import OrganizationRequestModal from "../Modals/OrganizationRequestModal"
import { organizationService } from "../../../../../services/organization"
import { Chip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, addToast } from "@heroui/react"
import { OrganizationResponse } from "../../../../../models/organization"

const statusOptions: StatusOption[] = [
  { name: "SOLICITADO", uid: "SOLICITADO" },
  { name: "PENDIENTE", uid: "PENDIENTE" },
  { name: "EN PROGRESO", uid: "EN PROGRESO" },
  { name: "APROBADO", uid: "APROBADO" },
]

export default function OrganizationTab() {
  const [data, setData] = useState<OrganizationResponse[]>([])
  // const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Estados para modal eliminar
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<OrganizationResponse | null>(null)
  const [deleteConfirmName, setDeleteConfirmName] = useState("")
  const [deleting, setDeleting] = useState(false)

  const fetchOrganizations = async () => {
    try {
      const res = await organizationService.getAll()
      setData(res.data)
    } catch (error) {
      console.error("Error cargando organizaciones", error)
      addToast({ title: "Error cargando organizaciones", color: "danger" })
    }
  }

  useEffect(() => {
    fetchOrganizations()
  }, [])

  const handleAddNew = () => setIsModalOpen(true)

  const handleSuccess = () => {
    setIsModalOpen(false)
    fetchOrganizations()
  }

  const openDeleteModal = (org: OrganizationResponse) => {
    setDeleteTarget(org)
    setDeleteConfirmName("")
    setDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    if (deleteConfirmName !== deleteTarget.name) {
      addToast({ title: "El nombre no coincide", color: "warning" })
      return
    }

    setDeleting(true)
    try {
      await organizationService.delete(deleteTarget.organizationId)
      setDeleteModalOpen(false)
      fetchOrganizations()
      addToast({ title: "Organización eliminada", color: "success" })
    } catch (error) {
      addToast({ title: "Error eliminando organización", color: "danger" })
      console.error(error)
    } finally {
      setDeleting(false)
    }
  }

  const columns: Column<OrganizationResponse>[] = [
    { name: "Nombre", uid: "name", sortable: true },
    {
      name: "Estado",
      uid: "status",
      sortable: true,
      render: (org) => {
        const status = org.status.toLowerCase()
        const colorMap: Record<string, "success" | "danger" | "warning"> = {
          aprobado: "success",
          pendiente: "warning",
          solicitado: "warning",
          "en progreso": "warning",
        }
        return (
          <Chip color={colorMap[status] || "warning"} size="sm" variant="flat" className="capitalize">
            {org.status}
          </Chip>
        )
      },
    },
    {
      name: "Activo",
      uid: "state",
      align: "center",
      render: (org) => (
        <Chip color={org.state ? "success" : "danger"} size="sm" variant="flat" className="capitalize">
          {org.state ? "Activo" : "Inactivo"}
        </Chip>
      ),
    },
    {
      name: "Verificado",
      uid: "verified",
      render: (org) => (org.verified ? "✅" : "❌"),
      align: "center",
    },
    {
      name: "Acciones",
      uid: "actions",
      align: "center",
      render: (org) => (
        <>
          <div className="flex gap-2">
            <Button size="sm" color="primary" onPress={() => window.location.href = `/organizaciones/${org.organizationId}`}>
              Entrar
            </Button>
            <Button size="sm" color="danger" onPress={() => openDeleteModal(org)}>
              Eliminar
            </Button>
          </div>

        </>
      ),
    },
  ]

  return (
    <>
      <GenericTable<OrganizationResponse>
        columns={columns}
        data={data}
        statusOptions={statusOptions}
        initialVisibleColumns={["name", "status", "state", "verified", "actions"]}
        initialSort={{ column: "name", direction: "ascending" }}
        initialRowsPerPage={5}
        button_label="Solicitar"
        onAddNew={handleAddNew}
        showStatusFilter={true}
        statusColumnKey="status"
        emptyMessage="No hay organizaciones registradas"
        filterKeys={["name", "status"]}
      />

      <OrganizationRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Confirmar eliminación</ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <p>Para confirmar la eliminación, escribe el nombre exacto de la organización:</p>
            <strong className="text-center">{deleteTarget?.name}</strong>
            <Input
              placeholder="Escribe el nombre aquí"
              value={deleteConfirmName}
              onChange={(e) => setDeleteConfirmName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={() => setDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              color="danger"
              onPress={handleDelete}
              isLoading={deleting}
              disabled={deleteConfirmName !== deleteTarget?.name}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
