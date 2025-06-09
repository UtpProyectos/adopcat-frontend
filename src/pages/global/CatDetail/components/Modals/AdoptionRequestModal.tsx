import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Textarea,
  Spinner,
  addToast, 
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { UserProfile } from "../../../../../models/user";
import { userService } from "../../../../../services/user"; 

interface Props {
  isOpen: boolean;
  onClose: () => void;
  catName: string;
  onSubmit: (data: FormData) => Promise<void>;
  loading: boolean;
}

export default function AdoptionRequestModal({
  isOpen,
  onClose,
  catName,
  onSubmit,
  loading,
}: Props) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Campos del formulario
  const [reason, setReason] = useState("");
  const [experience, setExperience] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [reactionPlan, setReactionPlan] = useState("");
  const [followUpConsent, setFollowUpConsent] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [homePhoto, setHomePhoto] = useState<File | null>(null);
  const [commitment, setCommitment] = useState<File | null>(null);
 
  // Estado de errores
  const [errors, setErrors] = useState({
    reason: false,
    experience: false,
    residenceType: false,
    reactionPlan: false,
    followUpConsent: false,
    receipt: false,
    homePhoto: false,
    commitment: false,
  });

  useEffect(() => {
    if (user?.userId) {
      userService.getUserById(user.userId).then((res) => {
        setProfile(res.data);
      });
    }
  }, [user]);

  const handleSubmit = async () => {
    const newErrors = {
      reason: !reason.trim(),
      experience: !experience.trim(),
      residenceType: !residenceType.trim(),
      reactionPlan: !reactionPlan.trim(),
      followUpConsent: !followUpConsent.trim(),
      receipt: !receipt,
      homePhoto: !homePhoto,
      commitment: !commitment,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      addToast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        timeout: 3000,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });

      
      return;
    }

    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("experience", experience);
    formData.append("residenceType", residenceType);
    formData.append("reactionPlan", reactionPlan);
    formData.append("followUpConsent", followUpConsent);
    if (receipt) formData.append("receipt", receipt);
    if (homePhoto) formData.append("homePhoto", homePhoto);
    if (commitment) formData.append("commitment", commitment);
    formData.append("catName", catName);

    try {
      await onSubmit(formData); 
      handleClose();
    } catch (error) {
      addToast({
        title: "Error",
        description: "No se pudo enviar la solicitud, intenta nuevamente.",
        timeout: 3000,
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  };

  const handleClose = () => {
    setReason("");
    setExperience("");
    setResidenceType("");
    setReactionPlan("");
    setFollowUpConsent("");
    setReceipt(null);
    setHomePhoto(null);
    setCommitment(null);
    setErrors({
      reason: false,
      experience: false,
      residenceType: false,
      reactionPlan: false,
      followUpConsent: false,
      receipt: false,
      homePhoto: false,
      commitment: false,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Solicitud de Adopción</ModalHeader>

        <ModalBody className="flex flex-col gap-4">
          <p className="text-sm text-gray-700">
            Estás solicitando adoptar a <strong>{catName}</strong>.
          </p>

          <Input
            label="Tu nombre"
            value={`${user?.firstName || ""} ${user?.lastName || ""}`}
            isReadOnly
          />
          <Input label="DNI" value={profile?.dni || ""} isReadOnly />
          <Input label="Celular" value={profile?.phoneNumber || ""} isReadOnly />

          <Textarea
            label="¿Por qué deseas adoptar un gato?"
            placeholder="Motivaciones personales o familiares..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            isInvalid={errors.reason}
            errorMessage={errors.reason ? "Este campo es obligatorio." : ""}
          />

          <Textarea
            label="¿Has tenido mascotas anteriormente?"
            placeholder="Comenta tu experiencia..."
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            isInvalid={errors.experience}
            errorMessage={errors.experience ? "Este campo es obligatorio." : ""}
          />

          <Input
            label="¿Vives en casa propia, alquilada o familiar?"
            placeholder="Ej. Alquilada con permiso para mascotas"
            value={residenceType}
            onChange={(e) => setResidenceType(e.target.value)}
            isInvalid={errors.residenceType}
            errorMessage={errors.residenceType ? "Este campo es obligatorio." : ""}
          />

          <Textarea
            label="¿Qué harías si el gato se enferma o tiene un mal comportamiento?"
            placeholder="Tu plan de acción..."
            value={reactionPlan}
            onChange={(e) => setReactionPlan(e.target.value)}
            isInvalid={errors.reactionPlan}
            errorMessage={errors.reactionPlan ? "Este campo es obligatorio." : ""}
          />

          <Input
            label="¿Aceptas visitas de seguimiento del refugio? (Sí / No)"
            value={followUpConsent}
            onChange={(e) => setFollowUpConsent(e.target.value)}
            isInvalid={errors.followUpConsent}
            errorMessage={errors.followUpConsent ? "Este campo es obligatorio." : ""}
          />

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <Input
              type="file"
              label="Recibo de luz/agua"
              onChange={(e) => setReceipt(e.target.files?.[0] || null)}
              isInvalid={errors.receipt}
              errorMessage={errors.receipt ? "Documento obligatorio." : ""}
            />
            <Input
              type="file"
              label="Foto del hogar"
              onChange={(e) => setHomePhoto(e.target.files?.[0] || null)}
              isInvalid={errors.homePhoto}
              errorMessage={errors.homePhoto ? "Documento obligatorio." : ""}
            />
            <Input
              type="file"
              label="Carta de compromiso firmada"
              onChange={(e) => setCommitment(e.target.files?.[0] || null)}
              isInvalid={errors.commitment}
              errorMessage={errors.commitment ? "Documento obligatorio." : ""}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="default" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button color="primary" onClick={handleSubmit} isLoading={loading}>
            {loading ? <Spinner size="sm" /> : "Enviar Solicitud"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
