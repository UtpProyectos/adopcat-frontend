import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Button,
  Spinner,
  Accordion,
  AccordionItem,
  Input,
  Select,
  SelectItem,
  useDisclosure,
  useToast,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";
import {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  TimelineContent,
  TimelineDate,
  TimelineIndicator,
  TimelineSeparator,
} from "@/components/ui/timeline";
import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { AdoptionResponse } from "../../../../../models/adoption";
import { adoptionService } from "@/services/adoption";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  request: AdoptionResponse | null;
}

const STAGES = {
  common: [
    {
      key: "PENDING",
      title: "Solicitud Enviada",
      description: "Tu solicitud fue registrada y está en espera de revisión.",
    },
    {
      key: "IN_REVIEW",
      title: "En Revisión",
      description: "El refugio está evaluando tu solicitud.",
    },
  ],
  approved: [
    {
      key: "APPROVED",
      title: "Aprobada",
      description: "La organización ha aprobado tu solicitud.",
    },
    {
      key: "DELIVERED",
      title: "Gato Entregado",
      description: "El gato fue entregado exitosamente.",
    },
  ],
  rejected: [
    {
      key: "REJECTED",
      title: "Rechazada",
      description: "La solicitud fue rechazada. Puedes volver a intentarlo más adelante.",
    },
  ],
};

const AdoptionDrawer = ({ isOpen, onOpenChange, request }: Props) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<AdoptionResponse | null>(null);
  const [comment, setComment] = useState("");
  const [interviewType, setInterviewType] = useState("Virtual");
  const { isOpen: showModal, onOpen, onClose } = useDisclosure();
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
 

  useEffect(() => {
    if (!request) return;
    setLoading(true);
    setDetails(request);
    setLoading(false);
  }, [request]);

  const getStages = () => {
    if (!details) return [];
    const stages = [...STAGES.common];
    if (details.status === "REJECTED") stages.push(...STAGES.rejected);
    if (["APPROVED", "DELIVERED"].includes(details.status ?? "")) {
      stages.push(...STAGES.approved);
    }
    return stages;
  };

  const handleAction = async () => {
    if (!details) return;

    try {
      if (actionType === "approve") {
        await adoptionService.leaveComment(details.requestId, comment);
        await adoptionService.leaveComment(
          details.requestId,
          `¿Prefieres una entrevista virtual o presencial? Seleccionó: ${interviewType}`
        );
        await adoptionService.updateStatus(details.requestId, "APPROVED");
        // toast.success("Solicitud aprobada exitosamente");
      } else if (actionType === "reject") {
        await adoptionService.leaveComment(details.requestId, comment);
        await adoptionService.updateStatus(details.requestId, "REJECTED");
        // toast.success("Solicitud rechazada exitosamente");
      }

      setComment("");
      setInterviewType("Virtual");
      setActionType(null);
      onClose();
      onOpenChange();
    } catch (error) {
      // toast.error("Error al procesar la acción");
    }
  };

  const stages = getStages();
  const currentIndex = stages.findIndex((s) => s.key === details?.status);

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right">
      <DrawerContent className="max-w-md">
        {(onCloseDrawer) => (
          <>
            <DrawerHeader className="text-lg font-bold">Seguimiento de Solicitud</DrawerHeader>
            <DrawerBody>
              {loading || !details ? (
                <Spinner label="Cargando..." />
              ) : (
                <Timeline defaultValue={currentIndex}>
                  {stages.map((step, index) => {
                    const completed = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    const showDecisionDate = index === currentIndex && details.decisionDate;

                    return (
                      <TimelineItem
                        key={step.key}
                        step={index + 1}
                        className="group-data-[orientation=vertical]/timeline:ms-10"
                        data-completed={completed}
                      >
                        <TimelineHeader>
                          <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                          <TimelineDate>
                            {index === 0 && details.submittedAt
                              ? new Date(details.submittedAt).toLocaleDateString()
                              : showDecisionDate
                              ? new Date(details.decisionDate ?? "").toLocaleDateString()
                              : "—"}
                          </TimelineDate>
                          <TimelineTitle>{step.title}</TimelineTitle>
                          <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                            <CheckIcon
                              className="group-not-data-completed/timeline-item:hidden"
                              size={16}
                            />
                          </TimelineIndicator>
                        </TimelineHeader>

                        <TimelineContent>
                          {isCurrent ? (
                            <Accordion defaultValue="detalles">
                              <AccordionItem
                                key="detalles"
                                value="detalles"
                                title="Detalles de la solicitud"
                              >
                                <div className="space-y-2 text-sm text-muted-foreground">
                                  <p>{step.description}</p>

                                  {details.reason && (
                                    <p><strong>Motivo:</strong> {details.reason}</p>
                                  )}
                                  {details.experience && (
                                    <p><strong>Experiencia:</strong> {details.experience}</p>
                                  )}
                                  {details.residenceType && (
                                    <p><strong>Tipo de vivienda:</strong> {details.residenceType}</p>
                                  )}
                                  {details.reactionPlan && (
                                    <p><strong>Plan ante problemas:</strong> {details.reactionPlan}</p>
                                  )}
                                  <p>
                                    <strong>Consentimiento:</strong>{" "}
                                    {String(details.followUpConsent) === "true" ? "Sí" : "No"}
                                  </p>

                                  {details.receiptUrl && (
                                    <div>
                                      <strong>Comprobante:</strong>
                                      <iframe src={details.receiptUrl} className="w-full h-48 mt-2 rounded-lg border" />
                                    </div>
                                  )}
                                  {details.homePhotoUrl && (
                                    <div>
                                      <strong>Foto del hogar:</strong>
                                      <iframe src={details.homePhotoUrl} className="w-full h-48 mt-2 rounded-lg border" />
                                    </div>
                                  )}
                                  {details.commitmentUrl && (
                                    <div>
                                      <strong>Compromiso:</strong>
                                      <iframe src={details.commitmentUrl} className="w-full h-48 mt-2 rounded-lg border" />
                                    </div>
                                  )}
                                </div>
                              </AccordionItem>
                            </Accordion>
                          ) : (
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          )}
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              )}
            </DrawerBody>
            <DrawerFooter className="gap-2">
              <Button color="danger" onPress={() => { setActionType("reject"); onOpen(); }}>
                Rechazar
              </Button>
              <Button color="success" onPress={() => { setActionType("approve"); onOpen(); }}>
                Aceptar
              </Button>
              <Button variant="light" onPress={onCloseDrawer}>
                Cerrar
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>

      <Modal isOpen={showModal} onOpenChange={onClose}>
        <ModalHeader>
          {actionType === "approve" ? "Aceptar Solicitud" : "Rechazar Solicitud"}
        </ModalHeader>
        <ModalBody className="flex flex-col gap-3">
          <Input
            label="Comentario"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            isRequired
          />
          {actionType === "approve" && (
            <Select label="Tipo de entrevista" selectedKeys={[interviewType]} onSelectionChange={(key) => setInterviewType(String(key))}>
              <SelectItem key="Virtual">Virtual</SelectItem>
              <SelectItem key="Presencial">Presencial</SelectItem>
            </Select>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color={actionType === "approve" ? "success" : "danger"}
            onPress={handleAction}
            isDisabled={!comment.trim()}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </Modal>
    </Drawer>
  );
};

export default AdoptionDrawer;
