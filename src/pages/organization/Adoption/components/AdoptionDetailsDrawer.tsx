import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Button,
  Chip,
  Textarea,
  Accordion,
  AccordionItem,
  User as HeroUser,
  Tooltip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Card,
  CardBody
} from "@heroui/react";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { AdoptionResponse, AdoptionComment } from "@/models/adoption";
import { adoptionService } from "@/services/adoption";

interface Props {
  request: AdoptionResponse;
  onClose: () => void;
}

export default function AdoptionDetailsDrawer({ request, onClose }: Props) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<AdoptionComment[]>([]);
  const [documentPreviewUrl, setDocumentPreviewUrl] = useState<string | null>(null);
  const { isOpen, onOpen, onClose: closeModal, onOpenChange } = useDisclosure();

  console.log("AdoptionDetailsDrawer request", request);
  const loadComments = async () => {
    try {
      const res = await adoptionService.getComments(request.requestId);
      setComments(res.data || []);
    } catch {
      setComments([]);
    }
  };

  useEffect(() => {
    loadComments();
  }, [request.requestId]);

  const handleComment = async () => {
    await adoptionService.leaveComment(request.requestId, comment);
    setComment("");
    await loadComments();
  };

  const handleStatus = async (newStatus: string) => {
    if (newStatus === "IN_PROCESS_DELIVERY") {
      await adoptionService.leaveComment(
        request.requestId,
        "🚚 La entrega está en proceso. Por favor acércate al refugio para recoger al gato."
      );
      await adoptionService.updateStatus(request.requestId, newStatus);
    } else if (newStatus === "DELIVERED") {
      await adoptionService.leaveComment(
        request.requestId,
        "✅ Gato entregado satisfactoriamente al adoptante."
      );
      await adoptionService.approveAdoption(request.requestId); // 🔁 usa el endpoint correcto aquí
    } else {
      await adoptionService.updateStatus(request.requestId, newStatus);
    }

    onClose();
  };


  const handlePreview = (url: string) => {
    setDocumentPreviewUrl(url);
    onOpen();
  };

  return (
    <Drawer isOpen={true} onClose={onClose} placement="right" size="4xl">
      <DrawerContent>
        <DrawerHeader>Detalles de la solicitud</DrawerHeader>
        <DrawerBody className="space-y-4">
          <div>
            <p className="font-bold">Adoptante:</p>
            <p>
              {request?.adopter?.firstName} {request?.adopter?.lastName} - {request?.adopter?.email}
            </p>
            <p>DNI: {request?.adopter?.dni}</p>
            <p>Teléfono: {request?.adopter?.phoneNumber}</p>
          </div>

          <div>
            <p className="font-bold">Gato:</p>
            <p>{request?.cat?.name}</p>
            <Chip size="sm" variant="flat">{request?.cat?.status}</Chip>
          </div>

          <Accordion defaultExpandedKeys={["form", "docs"]}>
            <AccordionItem key="form" title="📝 Formulario de Adopción">
              <p><strong>Motivo:</strong> {request.reason}</p>
              <p><strong>Experiencia:</strong> {request.experience}</p>
              <p><strong>Tipo de residencia:</strong> {request.residenceType}</p>
              <p><strong>Plan ante reacciones:</strong> {request.reactionPlan}</p>
              <p><strong>Consentimiento seguimiento:</strong> {request.followUpConsent ? "Sí" : "No"}</p>
              <p><strong>Reunión de Adopción:</strong> {request.interviewType}</p>
            </AccordionItem>

            <AccordionItem key="docs" title="📎 Documentos Adjuntos">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[request.receiptUrl, request.homePhotoUrl, request.commitmentUrl].map((url, idx) => (
                  url ? (
                    <div key={idx} className="relative">
                      <iframe src={url} className="rounded-xl w-full h-48 border" />
                      <Tooltip content="Ver grande">
                        <Button
                          className="absolute top-2 right-2"
                          isIconOnly
                          onPress={() => handlePreview(url)}
                          size="sm"
                          variant="light">
                          <Eye size={16} />
                        </Button>
                      </Tooltip>
                    </div>
                  ) : null
                ))}
              </div>
            </AccordionItem>
          </Accordion>

          <div className="mt-4">
            <p className="font-bold mb-2">🗒 Comentarios anteriores</p>
            <div>
              {comments.length > 0 ? (
                comments.map((c, idx) => (
                  <Card key={idx} className="bg-body shadow-none mb-2 border border-gray-200">
                    <CardBody className="overflow-visible py-2 flex flex-col items-start">
                      <HeroUser
                        name={c.userName}
                        avatarProps={{ src: c.profilePhoto }}
                        description={new Date(c.createdAt).toLocaleString()}
                      />
                      <p className="text-sm mt-2 text-foreground">{c.comment}</p>
                    </CardBody>
                  </Card>
                ))
              ) : (
                <p className="text-xs">No hay comentarios registrados.</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="font-semibold mb-1 block">💬 Comentario</label>
            <Textarea
              placeholder="Escribe un comentario interno..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button className="mt-2" size="sm" onPress={handleComment} isDisabled={!comment.trim()}>
              Enviar comentario
            </Button>
          </div>
        </DrawerBody>

        <DrawerFooter className="flex justify-between">
          <div className="flex gap-2">
            {request.status !== "DELIVERED" && (
              <>
                {request.status === "APPROVED" && (
                  <>
                    <Button color="primary" onPress={() => handleStatus("IN_PROCESS_DELIVERY")}>
                      Programar Entrega
                    </Button>
                    <Button color="danger" onPress={() => handleStatus("REJECTED")}>
                      Rechazar
                    </Button>
                  </>
                )}

                {request.status === "IN_PROCESS_DELIVERY" && (
                  <>
                    <Button color="primary" onPress={() => handleStatus("DELIVERED")}>
                      Marcar como Entregado
                    </Button>
                    <Button color="danger" onPress={() => handleStatus("REJECTED")}>
                      Rechazar
                    </Button>
                  </>
                )}

                {!["APPROVED", "IN_PROCESS_DELIVERY"].includes((request.status ?? "").toUpperCase()) && (
                  <>
                    <Button color="success" onPress={() => handleStatus("APPROVED")}>
                      Aprobar
                    </Button>
                    <Button color="danger" onPress={() => handleStatus("REJECTED")}>
                      Rechazar
                    </Button>
                  </>
                )}
              </>
            )}

          </div>

          <Button variant="ghost" onPress={onClose}>Cerrar</Button>
        </DrawerFooter>
      </DrawerContent>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          <ModalHeader>Vista previa del documento</ModalHeader>
          <ModalBody>
            {documentPreviewUrl && (
              <iframe
                src={documentPreviewUrl}
                className="w-full h-[75vh] rounded-lg border"
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button onPress={closeModal}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Drawer>
  );
}
