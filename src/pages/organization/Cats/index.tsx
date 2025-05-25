import { useState, useEffect } from "react";
import GenericTable, { Column } from "../../../components/Tables/GenericTable";

import { useOrganization } from "../../../context/OrganizationContext";
import { CatResponse } from "../../../models/cat";
import { addToast, Avatar, Chip } from "@heroui/react";
import { catService } from "../../../services/cats";
import CatCreateModal from "./components/Modals/CatCreateModal";
import { useAuth } from "../../../context/AuthContext";
import { FaMars, FaVenus } from "react-icons/fa";

export default function OrganizationCatsPage() {

    const { user } = useAuth();
    const { organization, loading } = useOrganization();
    const [cats, setCats] = useState<CatResponse[]>([]);
    const [modalOpen, setModalOpen] = useState(false);


    const fetchCats = async () => {
        if (!organization) return;
        try {
            const res = await catService.getAllCatsOrganization(organization.organizationId);
            setCats(res.data);
            console.log(res.data);
        } catch (error: any) {
            addToast({
                title: "Error",
                description: error?.response?.data?.message || "Error cargando gatos",
                color: "danger",
            });
        }
    };

    useEffect(() => {
        if (!loading && organization) {
            fetchCats();
        }
    }, [loading, organization]);

    const handleCreateCat = async (data: any, file?: File) => {
        try {
            // Forzar organizationId para que sea siempre la de la organización activa
            const payload = { ...data, organizationId: organization?.organizationId };
            await catService.createCat(payload, file);
            fetchCats();
            setModalOpen(false);
        } catch (error: any) {
            addToast({
                title: "Error",
                description: error?.response?.data?.message || "Error creando gato",
                color: "danger",
            });
        }
    };

    const columns: Column<CatResponse>[] = [
 
        { name: "Imagen", uid: "mainImageUrl", render: (cat: CatResponse) => <Avatar radius="sm" src={cat.mainImageUrl || ""} /> },
        { name: "Nombre", uid: "name", sortable: true },
        {
            name: "Género",
            uid: "gender",
            sortable: true,
            render: (cat: CatResponse) => {
                const gender = cat.gender;
                const genderLower = gender?.toLowerCase() || "";

                const color = genderLower === "female" ? "danger" : genderLower === "male" ? "warning" : "danger";
                const label = gender === "FEMALE" ? "Hembra" : gender === "MALE" ? "Macho" : gender;

                const icon = genderLower === "female" ? <FaVenus size={18} /> : genderLower === "male" ? <FaMars size={18} /> : null;

                return (
                    <Chip color={color} size="sm" variant="flat" className="capitalize" startContent={icon}>
                        {label}
                    </Chip>
                );
            },
        },
        {
            name: "Fecha de nacimiento",
            uid: "birthDate",
            sortable: true,
            render: (cat) => (cat.birthDate ? new Date(cat.birthDate).toLocaleDateString() : ""),
        },
        { name: "Estado de salud", uid: "healthStatus" },
        { name: "Estado", uid: "status",
            render: (cat) => {
                const status = cat.status?.toUpperCase() || "sin estado";
                const color = status === "ADOPTED" ? "success" : status === "AVAILABLE" ? "warning" : "danger";
                return <Chip color={color} size="sm" variant="flat">{status}</Chip>;
            },
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-5">
                Gatos de la organización: {organization?.name || "Cargando..."}
            </h1>

            <GenericTable<CatResponse>
                columns={columns}
                data={cats}
                button_label="Agregar gato"
                onAddNew={() => setModalOpen(true)}
                initialVisibleColumns={["mainImageUrl","name", "gender", "birthDate", "healthStatus", "status"]}
                initialRowsPerPage={10}
                filterKeys={["name", "gender", "location"]}
                statusOptions={[
                    { name: "Disponible", uid: "AVAILABLE" },
                    { name: "En Adopción", uid: "IN_ADOPTION" },
                    { name: "Adoptado", uid: "ADOPTED" },
                    { name: "No Disponible", uid: "NOT_AVAILABLE" },
                    { name: "Enviando a Organizacion", uid: "SENTO_ORGANIZATION" },
                ]}
                statusColumnKey="status"
                showStatusFilter={true}
                
            />
 
            <CatCreateModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreateCat={handleCreateCat}
                onSuccess={fetchCats}
                organizationId={organization?.organizationId || null}
                createdBy={user?.userId || ""}
            />

        </div>
    );
}
