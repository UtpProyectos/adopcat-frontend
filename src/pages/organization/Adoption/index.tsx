import { useEffect, useState } from "react";
import GenericTable, { Column } from "@/components/Tables/GenericTable";
import { adoptionService } from "@/services/adoption";
import { AdoptionResponse } from "@/models/adoption";
import { addToast, Chip, Avatar } from "@heroui/react"; 
import AdoptionDetailsDrawer from "./components/AdoptionDetailsDrawer";
import { useOrganization } from "@/context/OrganizationContext";

export default function OrganizationAdoptionsPage() {
    const { organization, loading } = useOrganization();
  const [requests, setRequests] = useState<AdoptionResponse[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AdoptionResponse | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await adoptionService.getOrgRequests(organization?.organizationId || "");
      setRequests(res.data);
    } catch {
      addToast({
        title: "Error",
        description: "No se pudieron cargar las solicitudes.",
        color: "danger",
      });
    }
  }; 
  const handleViewDetails = async (req: AdoptionResponse) => {
    if (req.status === "PENDING") {
      await adoptionService.updateStatus(req.requestId, "IN_REVIEW");
    }
    setSelectedRequest({ ...req, status: "IN_REVIEW" });
  };

  const columns: Column<AdoptionResponse>[] = [
    { name: "Gato", uid: "cat", render: r => <Avatar src={r.cat?.mainImageUrl || ""} name={r.cat?.name || "" } /> },
    { name: "Adoptante", uid: "adopter", render: r => r.adopter?.firstName + " " + r.adopter?.lastName },
    { name: "Fecha", uid: "submittedAt", render: r => new Date(r.submittedAt).toLocaleDateString() },
    { name: "Tipo Vivienda", uid: "residenceType", render: r => r.residenceType ?? "—" },
    { name: "Consentimiento", uid: "followUpConsent", render: r => r.followUpConsent ? "Sí" : "No" },
    {
      name: "Estado",
      uid: "status",
      render: r => (
        <Chip size="sm" variant="flat" color={
          r.status === "PENDING" ? "warning" :
          r.status === "IN_REVIEW" ? "primary" :
          r.status === "APPROVED" ? "success" :
          r.status === "REJECTED" ? "danger" : "default"
        }>
          {r.status}
        </Chip>
      )
    },
    {
      name: "Acciones",
      uid: "actions",
      render: (r) => <button onClick={() => handleViewDetails(r)}>Ver detalles</button>
    }
  ];
  

  useEffect(() => { fetchRequests(); }, []);

  return (
    <>
      <GenericTable<AdoptionResponse>
        data={requests}
        columns={columns}
        initialVisibleColumns={["cat", "adopter", "status", "actions"]}
        initialRowsPerPage={8}
        onAddNew={() => {}}
      />
      {selectedRequest && (
        <AdoptionDetailsDrawer
          request={selectedRequest}
          onClose={() => {
            setSelectedRequest(null);
            fetchRequests(); // Refresca la tabla
          }}
        />
      )}
    </>
  );
}