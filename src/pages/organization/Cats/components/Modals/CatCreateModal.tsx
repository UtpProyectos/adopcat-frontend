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
  Chip,
} from "@heroui/react";
import { UploadCloud } from "lucide-react";
import LocationPickerWithSearch from "../../../../../components/Maps/LocationPickerWithSearch";
import { catService } from "../../../../../services/cats";

interface CatCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCat: (data: any, file?: File) => Promise<void>;
  onSuccess: () => void;
  organizationId?: string | null;
  createdBy: string;
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

export default function CatCreateModal({
  isOpen,
  onClose,
  onCreateCat,
  onSuccess,
  organizationId = null,
  createdBy,
}: CatCreateModalProps) {
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

  const [features, setFeatures] = useState<{ id: string; name: string }[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<{ id: string; name: string }[]>([]);
  const [newFeatureName, setNewFeatureName] = useState("");

  // Cargar características desde backend
  useEffect(() => {
    console.log('useEffect iniciando...');
    const loadFeatures = async () => {
      try {
        console.log('Intentando cargar características...');
        const res = await catService.getAllFeatures();  
        console.log('Respuesta del servidor:', res.data);
        setFeatures(res.data);
        console.log('Features actualizadas en el estado:', res.data);
      } catch (error) {
        console.error('Error al cargar características:', error);
        addToast({ title: "Error", description: "Error cargando características", color: "danger" });
      }
    };
    loadFeatures();
  }, []);

  // Generar preview
  useEffect(() => {
    if (!file) return setPreview(null);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setFile(e.target.files[0]);
  };

  const handleAddNewFeature = () => {
    const trimmed = newFeatureName.trim();
    if (!trimmed) return;

    const exists = [...features, ...selectedFeatures].some(
      (f) => f.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      addToast({ title: "Ya existe", description: "Esta característica ya fue agregada", color: "warning" });
      return;
    }

    const newId = trimmed.toLowerCase().replace(/\s+/g, "_");
    const newFeature = { id: newId, name: trimmed };

    setFeatures((prev) => [...prev, newFeature]);
    setSelectedFeatures((prev) => [...prev, newFeature]);
    setNewFeatureName("");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.gender || !form.size) {
      addToast({ title: "Error", description: "Completa los campos obligatorios", color: "danger" });
      return;
    }

    setLoading(true);

    const dataToSend = {
      ...form,
      createdBy,
      organizationId: organizationId ?? undefined,
      features: selectedFeatures.map((f) => ({ id: f.id, name: f.name })),
    };

    try {
      await onCreateCat(dataToSend, file || undefined);
      addToast({ title: "Éxito", description: "Gato creado correctamente", color: "success" });
      onSuccess();
      onClose();

      // Reset
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
      setSelectedFeatures([]);
      setFile(null);
      setPreview(null);
      setNewFeatureName("");
    } catch (error: any) {
      addToast({ title: "Error", description: error.message || "Error creando gato", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="max-w-xl max-h-[80vh] overflow-auto">
        <ModalHeader>Agregar nuevo gato</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Input label="Nombre *" value={form.name} onValueChange={(v) => handleChange("name", v)} isDisabled={loading} />
          <Input label="Fecha de nacimiento" type="date" value={form.birthDate} onValueChange={(v) => handleChange("birthDate", v)} isDisabled={loading} />
          <Select label="Género *" selectedKeys={form.gender ? new Set([form.gender]) : new Set()} onSelectionChange={(keys) => handleChange("gender", Array.from(keys)[0] || "")} placeholder="Selecciona género" isDisabled={loading}>
            {genders.map((g) => <SelectItem key={g.key}>{g.label}</SelectItem>)}
          </Select>
          <Select label="Tamaño *" selectedKeys={form.size ? new Set([form.size]) : new Set()} onSelectionChange={(keys) => handleChange("size", Array.from(keys)[0] || "")} placeholder="Selecciona tamaño" isDisabled={loading}>
            {sizes.map((s) => <SelectItem key={s.key}>{s.label}</SelectItem>)}
          </Select>
          <Input label="Estado de salud" value={form.healthStatus} onValueChange={(v) => handleChange("healthStatus", v)} isDisabled={loading} />
          <Input label="Raza" value={form.raza} onValueChange={(v) => handleChange("raza", v)} isDisabled={loading} />
          <Textarea label="Descripción" value={form.description} onValueChange={(v) => handleChange("description", v)} isDisabled={loading} />

          {/* Campo multiselect con características */}
          <Select
            label="Características del gato"
            placeholder="Selecciona una o más"
            items={features}
            selectionMode="multiple"
            selectedKeys={new Set(selectedFeatures.map((f) => f.id))}
            onSelectionChange={(keys) => {
              const selected = features.filter((f) => Array.from(keys).includes(f.id));
              setSelectedFeatures(selected);
            }}
            isMultiline
            variant="bordered"
            renderValue={(items) => (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip key={item.key}>{item.data?.name || item.key}</Chip>
                ))}
              </div>
            )}
          >
            {(feature) => (
              <SelectItem key={feature.id} textValue={feature.name}>
                {feature.name}
              </SelectItem>
            )}
          </Select>

          {/* Campo para ingresar nueva característica */}
          <Input
            label="Agregar nueva característica"
            placeholder="Ej: Juguetón"
            value={newFeatureName}
            onValueChange={setNewFeatureName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddNewFeature();
              }
            }}
            isDisabled={loading}
            description="Presiona Enter para agregarla a la lista"
          />

          <Input type="file" label="Imagen principal" accept="image/*" onChange={handleFileChange} isDisabled={loading} description="Formato: imagen JPG, PNG" startContent={<UploadCloud className="text-2xl text-default-400" />} />
          {preview && <img src={preview} alt="Preview" className="max-w-full max-h-40 rounded-md" />}

          <LocationPickerWithSearch address={form.location} latitude={form.latitude} longitude={form.longitude} onAddressChange={(addr) => handleChange("location", addr)} onLocationChange={(lat, lng) => {
            handleChange("latitude", lat);
            handleChange("longitude", lng);
          }} />
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onClick={onClose} isDisabled={loading}>Cancelar</Button>
          <Button color="primary" onClick={handleSubmit} isDisabled={loading}>Crear gato</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
