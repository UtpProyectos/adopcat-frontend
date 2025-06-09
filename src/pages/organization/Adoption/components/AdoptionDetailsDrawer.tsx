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
  } from "@heroui/react";
  import { useState } from "react";
  import { AdoptionResponse } from "@/models/adoption";
  import { adoptionService } from "@/services/adoption";
  
  interface Props {
    request: AdoptionResponse;
    onClose: () => void;
  }
  
  export default function AdoptionDetailsDrawer({ request, onClose }: Props) {
    const [comment, setComment] = useState("");
  
    const handleComment = async () => {
      await adoptionService.leaveComment(request.requestId, comment);
      setComment("");
    };
  
    const handleStatus = async (newStatus: string) => {
      await adoptionService.updateStatus(request.requestId, newStatus);
      onClose(); // actualiza estado en tabla
    };
  
    const handleDelivered = async () => {
      await adoptionService.approveAdoption(request.requestId);
      onClose();
    };
  
    return (
      <Drawer isOpen={true} onClose={onClose} placement="right" size="lg">
        <DrawerContent>
          <DrawerHeader>
            Detalles de la solicitud
          </DrawerHeader>
          <DrawerBody className="space-y-4">
            <div>
              <p className="font-bold">Adoptante:</p>
              <p>{request?.adopter?.firstName} {request?.adopter?.lastName} - {request?.adopter?.email}</p>
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
              </AccordionItem>
  
              <AccordionItem key="docs" title="📎 Documentos Adjuntos">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <iframe src={request.receiptUrl} className="rounded-xl w-full h-48" />
                  <iframe src={request.homePhotoUrl} className="rounded-xl w-full h-48" />
                  <iframe src={request.commitmentUrl} className="rounded-xl w-full h-48" />
                </div>
              </AccordionItem>
            </Accordion>
  
            <div className="mt-4">
              <label className="font-semibold mb-1 block">💬 Comentario</label>
              <Textarea
                placeholder="Escribe un comentario interno..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="mt-2" size="sm" onClick={handleComment}>
                Enviar comentario
              </Button>
            </div>
          </DrawerBody>
  
          <DrawerFooter className="flex justify-between">
            <div className="flex gap-2">
              {request.status !== "APPROVED" && (
                <Button color="success" onClick={() => handleStatus("APPROVED")}>Aprobar</Button>
              )}
              {request.status !== "REJECTED" && (
                <Button color="danger" onClick={() => handleStatus("REJECTED")}>Rechazar</Button>
              )}
              {request.status === "APPROVED" && !request.finalized && (
                <Button color="primary" onClick={handleDelivered}>Marcar como Entregado</Button>
              )}
            </div>
            <Button variant="ghost" onClick={onClose}>Cerrar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  