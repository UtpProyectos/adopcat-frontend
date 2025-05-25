import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  addToast,
} from "@heroui/react";
import LocationPickerWithSearch from "../../../../../components/Maps/LocationPickerWithSearch";
import { UploadCloud } from "lucide-react";

interface CatCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCat: (data: any, file?: File) => Promise<void>;
  onSuccess: () => void;
  organizationId?: string | null;
  createdBy: string; // ID del usuario autenticado (obligatorio)
}

const sizes = [
  { key: "SMALL", label: "Pequeño" },
  { key: "MEDIUM", label: "Mediano" },
  { key: "LARGE", label: "Grande" },
];

const genders = [
  { key: "MALE", label: "Macho" },
  { key: "FEMALE", label: "Hembra" },
];

const CatCreateModal = ({
  isOpen,
  onClose,
  onCreateCat,
  onSuccess,
  organizationId = null,
  createdBy,
}: CatCreateModalProps) => {
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    gender: "",
    size: "",
    healthStatus: "",
    raza: "",
    description: "",
    location: "",
    latitude: 0,
    longitude: 0,
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Generar preview cuando cambie el archivo
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };


  const handleSubmit = async () => {
    if (!form.name || !form.gender || !form.size) {
      addToast({
        title: "Error",
        description: "Completa los campos obligatorios.",
        color: "danger",
      });
      return;
    }

    setLoading(true);

    const dataToSend = {
      ...form,
      createdBy,
      organizationId: organizationId ?? undefined,
    };

    try {

      console.log("file origen: ",file);
      if (file) {
        console.log("file existe");
        await onCreateCat(dataToSend, file);
      } else{
        console.log("file no existe");
        await onCreateCat(dataToSend,undefined);
      }

      onSuccess();
      onClose();
      setForm({
        name: "",
        birthDate: "",
        gender: "",
        size: "",
        healthStatus: "",
        raza: "",
        description: "",
        location: "",
        latitude: 0,
        longitude: 0,
      });
      setFile(null);
      addToast({
        title: "Éxito",
        description: "Gato creado correctamente",
        color: "success",
      });
    } catch (error: any) {
      addToast({
        title: "Error",
        description: error.message || "Error creando gato",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="max-w-xl max-h-[80vh] overflow-auto">
        <ModalHeader>Agregar nuevo gato</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Input
            label="Nombre *"
            value={form.name}
            onValueChange={(v) => handleChange("name", v)}
            isDisabled={loading}
          />
          <Input
            label="Fecha de nacimiento"
            type="date"
            value={form.birthDate}
            onValueChange={(v) => handleChange("birthDate", v)}
            isDisabled={loading}
          />
          <Select
            label="Género *"
            selectedKeys={form.gender ? new Set([form.gender]) : new Set()}
            onSelectionChange={(keys) => handleChange("gender", Array.from(keys)[0] || "")}
            placeholder="Selecciona género"
            isRequired
            isDisabled={loading}
          >
            {genders.map((g) => (
              <SelectItem key={g.key}>{g.label}</SelectItem>
            ))}
          </Select>
          <Select
            label="Tamaño *"
            selectedKeys={form.size ? new Set([form.size]) : new Set()}
            onSelectionChange={(keys) => handleChange("size", Array.from(keys)[0] || "")}
            placeholder="Selecciona tamaño"
            isRequired
            isDisabled={loading}
          >
            {sizes.map((s) => (
              <SelectItem key={s.key}>{s.label}</SelectItem>
            ))}
          </Select>
          <Input
            label="Estado de salud"
            placeholder="Ej: saludable, con alergias"
            value={form.healthStatus}
            onValueChange={(v) => handleChange("healthStatus", v)}
            isDisabled={loading}
          />
          <Input
            label="Raza"
            value={form.raza}
            onValueChange={(v) => handleChange("raza", v)}
            isDisabled={loading}
          />
          <Textarea
            label="Descripción"
            value={form.description}
            onValueChange={(v) => handleChange("description", v)}
            isDisabled={loading}
          />

          <Input
            label="Imagen principal"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            isDisabled={loading}
            description="Formato: imagen JPG, PNG"
            startContent={<UploadCloud className="text-2xl text-default-400" />}
          />

          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="max-w-full max-h-40 rounded-md" />
            </div>
          )}

          <LocationPickerWithSearch
            address={form.location}
            latitude={form.latitude}
            longitude={form.longitude}
            onAddressChange={(addr) => handleChange("location", addr)}
            onLocationChange={(lat, lng) => {
              handleChange("latitude", lat);
              handleChange("longitude", lng);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onClick={onClose} isDisabled={loading}>
            Cancelar
          </Button>
          <Button color="primary" onClick={handleSubmit} isDisabled={loading}>
            Crear gato
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CatCreateModal;
