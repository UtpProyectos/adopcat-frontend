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
  Textarea,
  User as HeroUser,
  Card,
  CardBody,
  Select,
  SelectItem,
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
import { AdoptionResponse, AdoptionComment } from "../../../../../models/adoption";
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
  approvedOnly: [
    {
      key: "APPROVED",
      title: "Aprobada",
      description: "La organización ha aprobado tu solicitud.",
    },
  ],
  delivered: [
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
  const [comments, setComments] = useState<AdoptionComment[]>([]);

  useEffect(() => {
    if (!request) return;
    setLoading(true);
    setDetails(request);
    fetchComments(request.requestId);
    setLoading(false);
  }, [request]);

  const fetchComments = async (requestId: string) => {
    try {
      const res = await adoptionService.getComments(requestId);
      setComments(res.data || []);
    } catch {
      setComments([]);
    }
  };

  const handleComment = async () => {
    if (!details) return;
    await adoptionService.leaveComment(details.requestId, comment);
    setComment("");
    await fetchComments(details.requestId);
  };

  const alreadyAnsweredMeeting = comments.some(c =>
    c.comment.includes("Preferencia para la entrevista")
  );

  const handleMeetingAnswer = async (response: "yes" | "no") => {
    if (!details) return;
    const type = response === "yes" ? "PRESENTIAL" : "VIRTUAL";

    try {
      await adoptionService.updateInterviewType(details.requestId, type);
      const autoComment = `Preferencia para la entrevista: ${type === "PRESENTIAL" ? "Presencial" : "Virtual"}`;
      await adoptionService.leaveComment(details.requestId, autoComment);
      await fetchComments(details.requestId);
    } catch (e) {
      console.error("Error actualizando tipo de entrevista", e);
    }
  };

  const getStages = () => {
    if (!details) return [];
    const stages = [...STAGES.common];

    if (details.status === "REJECTED") {
      stages.push(...STAGES.rejected);
    }
    if (details.status === "APPROVED") {
      stages.push(...STAGES.approvedOnly);
    }
    if (details.status === "DELIVERED") {
      stages.push(...STAGES.approvedOnly, ...STAGES.delivered);
    }

    return stages;
  };

  const stages = getStages();
  const currentIndex = stages.findIndex((s) => s.key === details?.status);

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right" size="4xl">
      <DrawerContent className="max-w-md">
        <DrawerHeader className="text-lg font-bold">Seguimiento de Solicitud</DrawerHeader>
        <DrawerBody>
          {loading || !details ? (
            <Spinner label="Cargando..." />
          ) : (
            <>
              <Timeline defaultValue={currentIndex}>
                {stages.map((step, index) => {
                  const isCurrent = index === currentIndex;
                  const showDecisionDate = isCurrent && details.decisionDate;
                  const completed =
                    step.key === "DELIVERED"
                      ? false
                      : index < currentIndex || (isCurrent && details.status !== "DELIVERED");

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
                                {details.reason && <p><strong>Motivo:</strong> {details.reason}</p>}
                                {details.experience && <p><strong>Experiencia:</strong> {details.experience}</p>}
                                {details.residenceType && <p><strong>Tipo de vivienda:</strong> {details.residenceType}</p>}
                                {details.reactionPlan && <p><strong>Plan ante problemas:</strong> {details.reactionPlan}</p>}
                                <p><strong>Consentimiento:</strong> {String(details.followUpConsent) === "true" ? "Sí" : "No"}</p>
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

              {/* Pregunta por tipo de entrevista */}
              {details.status === "APPROVED" && !alreadyAnsweredMeeting && (
                <div className="mt-4">
                  <label className="font-semibold mb-1 block">🗓 ¿Cómo deseas realizar la entrevista de adopción?</label>
                  <Select
                    placeholder="Selecciona una opción"
                    onSelectionChange={(key) => {
                      if (key === null) return;
                      handleMeetingAnswer(key.toString() as "yes" | "no");
                    }}
                    className="max-w-xs"
                  >
                    <SelectItem key="yes">Presencial</SelectItem>
                    <SelectItem key="no">Virtual</SelectItem>
                  </Select>
                </div>
              )}

              {/* Comentarios anteriores */}
              <div className="mt-6">
                <p className="font-bold mb-2">🗒 Comentarios anteriores</p>
                <div className="space-y-3 max-h-48 overflow-y-auto text-sm text-muted-foreground">
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

              {/* Campo para nuevo comentario */}
              <div className="mt-4">
                <label className="font-semibold mb-1 block">💬 Comentario</label>
                <Textarea
                  placeholder="Escribe un comentario interno..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  className="mt-2"
                  size="sm"
                  onPress={handleComment}
                  isDisabled={!comment.trim()}
                >
                  Enviar comentario
                </Button>
              </div>
            </>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onPress={onOpenChange}>Cerrar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AdoptionDrawer;
