import { useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  addToast,
} from "@heroui/react";
import { useAuth } from "../../../../../context/AuthContext";
import { AdoptionResponse } from "../../../../../models/adoption";
import { adoptionService } from "../../../../../services/adoption";
import AdoptionDrawer from "../Drawers/AdoptionDrawer";
import AdoptionCard from "../Cards/AdoptionCard";
import { useNavigate } from "react-router-dom";

const RequestTab = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<AdoptionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; requestId: string | null }>({
    isOpen: false,
    requestId: null,
  });
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchRequests = () => {
    if (!user?.userId) return;
    setLoading(true);
    adoptionService
      .getMyRequests()
      .then((res) => setRequests(res.data))
      .catch(() =>
        addToast({
          title: "Error",
          description: "No se pudieron cargar tus solicitudes.",
          color: "danger",
        })
      )
      .finally(() => setLoading(false));
  };

  console.log(requests);
  
  useEffect(() => {
    fetchRequests();
  }, [user?.userId]);

  const confirmDelete = (requestId: string) => {
    setConfirmModal({ isOpen: true, requestId });
  };

  const handleDelete = async () => {
    if (!confirmModal.requestId) return;

    setDeletingId(confirmModal.requestId);
    try {
      await adoptionService.deleteRequest(confirmModal.requestId);
      addToast({
        title: "Eliminado",
        description: "Solicitud eliminada correctamente.",
        color: "success",
      });
      setRequests((prev) => prev.filter((r) => r.requestId !== confirmModal.requestId));
    } catch {
      addToast({
        title: "Error",
        description: "No se pudo eliminar la solicitud.",
        color: "danger",
      });
    } finally {
      setDeletingId(null);
      setConfirmModal({ isOpen: false, requestId: null });
    }
  };

  if (loading) return <Spinner label="Cargando solicitudes..." color="primary" />;

  if (requests.length === 0) {
    return <p className="text-center text-gray-600">No has enviado solicitudes de adopción.</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {requests.map((req) => (
          <AdoptionCard
            key={req.requestId}
            request={req}
            deletingId={deletingId}
            onDelete={() => confirmDelete(req.requestId)}
            onViewDetails={() => setOpenDrawerId(req.requestId)}
            onNavigateToCat={() => navigate(`/cats/${req.cat?.catId}`)}
          />
        ))}
      </div>


      <Modal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ isOpen: false, requestId: null })}>
        <ModalContent>
          <ModalHeader>¿Estás seguro?</ModalHeader>
          <ModalBody>
            Esta acción no se puede deshacer. ¿Deseas eliminar tu solicitud de adopción?
          </ModalBody>
          <ModalFooter>
            <Button color="default" onClick={() => setConfirmModal({ isOpen: false, requestId: null })}>
              Cancelar
            </Button>
            <Button color="danger" onClick={handleDelete} isLoading={deletingId !== null}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AdoptionDrawer
        isOpen={!!openDrawerId}
        onOpenChange={() => setOpenDrawerId(null)}
        request={requests.find((r) => r.requestId === openDrawerId) || null}
      />
    </>
  );
};

export default RequestTab;