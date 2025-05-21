import { useState, useEffect } from "react"
import GenericTable, { Column } from "../../../components/Tables/GenericTable"
import { organizationService } from "../../../services/organization"
import { Chip, Button, Select, SelectItem, Switch, addToast } from "@heroui/react"
import OrganizationDetailModal from "./components/Modals/OrganizationDetailModal";
import { OrganizationResponse } from "../../../models/organization";

 
// Subcomponente para manejar Select de Estado
function StatusSelectCell({ org, onUpdated }: { org: OrganizationResponse; onUpdated: () => void }) {
    const [status, setStatus] = useState(org.status)
    const statusOptionsSelect = ["SOLICITADO", "PENDIENTE", "EN_PROGRESO", "APROBADO"]

    // Si está aprobado, no permitir cambios, solo mostrar chip
    if (status.toUpperCase() === "APROBADO") {
        return (
            <Chip color="success" size="sm" variant="flat" className="capitalize">
                {status}
            </Chip>
        )
    }

    const handleChange = async (val: string) => {
        const prev = status
        setStatus(val)
        try {
            await organizationService.updateStatus(org.organizationId, val, org.verified)
            addToast({
                title: "Estado actualizado",
                description: `Estado cambiado a "${val}"`,
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
            onUpdated()
        } catch (err: any) {
            setStatus(prev)
            addToast({
                title: "Error",
                description: `No se pudo actualizar el estado. ${err?.message ?? err}`,
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
        }
    }

    return (
        <Select
            selectedKeys={new Set([status])}
            onSelectionChange={(keys) => {
                const key = Array.from(keys)[0]
                if (typeof key === "string") handleChange(key)
            }}
            aria-label="Cambiar estado"
            size="sm"
        >
            {statusOptionsSelect.map((s) => (
                <SelectItem key={s}>{s}</SelectItem>
            ))}
        </Select>
    )
}

// Subcomponente para Switch de Activación
function StateSwitchCell({ org, onUpdated }: { org: OrganizationResponse; onUpdated: () => void }) {
    const [active, setActive] = useState(org.state)

    const toggle = async () => {
        const prev = active
        setActive(!active)
        try {
            await organizationService.updateState(org.organizationId, !active)
            addToast({
                title: "Estado de activación actualizado",
                description: `Organización ${!active ? "activada" : "desactivada"}`,
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
            onUpdated()
        } catch {
            setActive(prev)
            addToast({
                title: "Error",
                description: "No se pudo actualizar estado de activación.",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
        }
    }

    return <Switch isSelected={active} onChange={toggle} aria-label="Activar / Desactivar" size="sm" />
}

// Subcomponente para Switch de Verificación
function VerifiedSwitchCell({ org, onUpdated }: { org: OrganizationResponse; onUpdated: () => void }) {
    const [verified, setVerified] = useState(org.verified)

    const toggle = async () => {
        const prev = verified
        setVerified(!verified)
        try {
            await organizationService.updateApprovalStatusAndState(org.organizationId, !verified, org.status, org.state)
            addToast({
                title: "Estado de verificación actualizado",
                description: `Organización ${!verified ? "verificada" : "no verificada"}`,
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
            onUpdated()
        } catch {
            setVerified(prev)
            addToast({
                title: "Error",
                description: "No se pudo actualizar estado de verificación.",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            })
        }
    }

    return <Switch isSelected={verified} onChange={toggle} aria-label="Verificado / No Verificado" size="sm" />
}



export default function OrganizationsAdminPage() {
    const [data, setData] = useState<OrganizationResponse[]>([])
    // const [loading, setLoading] = useState(false)

    const [selectedOrganization, setSelectedOrganization] = useState<OrganizationResponse | null>(null)
    const [showDetailModal, setShowDetailModal] = useState(false)
 

    const columns: Column<OrganizationResponse>[] = [
        { name: "Nombre", uid: "name", sortable: true },
        { name: "RUC", uid: "ruc", sortable: true },
        { name: "Tipo", uid: "tipo" },
        {
            name: "Estado",
            uid: "status",
            sortable: true,
            render: (org) => <StatusSelectCell org={org} onUpdated={() => { }} />,
        },
        {
            name: "Activo",
            uid: "state",
            align: "center",
            render: (org) => <StateSwitchCell org={org} onUpdated={() => { }} />,
        },
        {
            name: "Verificado",
            uid: "verified",
            align: "center",
            render: (org) => <VerifiedSwitchCell org={org} onUpdated={() => { }} />,
        },
        {
            name: "Acciones",
            uid: "actions",
            align: "center",
            render: (org) => (
                <Button
                    size="sm"
                    color="primary"
                    onPress={() => openDetailModal(org)}
                >
                    Gestionar
                </Button>
            ),
        },
    ]

    const fetchOrganizations = async () => {
        try {
            const res = await organizationService.getAll()
            console.log(res.data)
            setData(res.data)
        } catch (error) {
            console.error("Error cargando organizaciones", error)
        }
    }

    useEffect(() => {
        fetchOrganizations()
    }, [])

    const handleRefresh = () => fetchOrganizations()

    const columnsWithRefresh = columns.map((col) => {
        if (col.uid === "status") {
            return {
                ...col,
                render: (org: OrganizationResponse) => (
                    <StatusSelectCell org={org} onUpdated={handleRefresh} />
                ),
            }
        }
        if (col.uid === "state") {
            return {
                ...col,
                render: (org: OrganizationResponse) => <StateSwitchCell org={org} onUpdated={handleRefresh} />,
            }
        }
        if (col.uid === "verified") {
            return {
                ...col,
                render: (org: OrganizationResponse) => (
                    <VerifiedSwitchCell org={org} onUpdated={handleRefresh} />
                ),
            }
        }
        if (col.uid === "actions") {
            return {
                ...col,
                render: (org: OrganizationResponse) => (
                    <Button
                        size="sm"
                        color="primary"
                        onPress={() => openDetailModal(org)}
                    >
                        Gestionar
                    </Button>
                ),
            }
        }
        return col
    })

    const openDetailModal = (org: OrganizationResponse) => {
        setSelectedOrganization(org)
        setShowDetailModal(true)
    }

    const closeDetailModal = () => {
        setSelectedOrganization(null)
        setShowDetailModal(false)
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-5">Gestión de Organizaciones</h1>

            <GenericTable<OrganizationResponse>
                columns={columnsWithRefresh}
                data={data}
                statusOptions={[
                    { name: "Solicitado", uid: "SOLICITADO" },
                    { name: "Pendiente", uid: "PENDIENTE" },
                    { name: "En Progreso", uid: "EN_PROGRESO" },
                    { name: "Aprobado", uid: "APROBADO" },
                ]}
                statusColumnKey="status"
                filterKeys={["name", "ruc", "tipo"]}
                initialVisibleColumns={["name", "ruc", "tipo", "status", "verified", "actions"]}
                initialSort={{ column: "name", direction: "ascending" }}
                initialRowsPerPage={10}
                onAddNew={() => { }}
                showStatusFilter={true}
            />

            <OrganizationDetailModal
                isOpen={showDetailModal}
                onClose={closeDetailModal}
                organization={selectedOrganization}
            />
        </div>
    )
}