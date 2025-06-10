import { useState, useEffect } from "react";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  addToast,
  Image,
} from "@heroui/react";
import { useOrganization } from "../../../context/OrganizationContext";
import { organizationService } from "@/services/organization";
import LocationPickerWithSearch from "@/components/Maps/LocationPickerWithSearch";
import { Icon, TrashIcon } from "lucide-react";

const tipos = [
  { label: "Refugio", key: "REFUGIO" },
  { label: "Casa Hogar", key: "CASA_HOGAR" },
];

export default function OrganizationConfig() {
  const { organization, loading, error } = useOrganization();
  const [form, setForm] = useState({
    name: "",
    ruc: "",
    tipo: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
    coverPhotoUrl: "",
    newPhotos: [] as File[],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (organization) {
      setForm({
        name: organization.name || "",
        ruc: organization.ruc || "",
        tipo: organization.tipo || "",
        description: organization.description || "",
        address: organization.address || "",
        latitude: organization.latitude?.toString() || "",
        longitude: organization.longitude?.toString() || "",
        coverPhotoUrl: organization.coverPhotoUrl || "",
        newPhotos: [],
      });
    }
  }, [organization]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (files: File[]) => {
    setForm((prev) => ({ ...prev, newPhotos: files }));
  };

  const handleDeleteCover = () => {
    setForm((prev) => ({
      ...prev,
      coverPhotoUrl: "",
    }));
    addToast({ title: "Imagen eliminada. Se actualizará al guardar.", color: "warning" });
  };

  const handleSave = async () => {
    if (!organization) return;
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("ruc", form.ruc);
      formData.append("tipo", form.tipo);
      formData.append("description", form.description);
      formData.append("address", form.address);
      formData.append("latitude", form.latitude);
      formData.append("longitude", form.longitude);

      if (form.newPhotos.length > 0) {
        formData.append("coverPhoto", form.newPhotos[0]);
      }

      if (!form.coverPhotoUrl) {
        formData.append("coverPhotoUrl", "null"); // el backend interpretará esto como null
      }

      await organizationService.update(organization.organizationId, formData);
      addToast({ title: "Datos actualizados correctamente", color: "success" });
    } catch {
      addToast({ title: "Error al guardar", color: "danger" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Cargando organización...</div>;
  if (error) return <div>Error cargando organización</div>;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">
        Información de la organización: {organization?.name || "Cargando..."}
      </h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input name="name" label="Nombre" value={form.name} onChange={handleChange} required />
        <Input name="ruc" label="RUC" value={form.ruc} onChange={handleChange} maxLength={11} required />

        <Select
          name="tipo"
          label="Tipo"
          selectedKeys={form.tipo ? [form.tipo] : []} // para controlado
          onSelectionChange={(keys) => {
            const key = Array.isArray(keys) ? keys[0] : keys;
            setForm((prev) => ({ ...prev, tipo: key as string }));
          }}
          required
        >
          {tipos.map((t) => (
            <SelectItem key={t.key} textValue={t.label}>
              {t.label}
            </SelectItem>
          ))}
        </Select>

        <div className="md:col-span-2">
          <LocationPickerWithSearch
            address={form.address}
            latitude={parseFloat(form.latitude) || 0}
            longitude={parseFloat(form.longitude) || 0}
            onAddressChange={(addr) => setForm((prev) => ({ ...prev, address: addr }))}
            onLocationChange={(lat, lng) =>
              setForm((prev) => ({
                ...prev,
                latitude: lat.toString(),
                longitude: lng.toString(),
              }))
            }
          />
        </div>

        <div className="md:col-span-2">
          <Textarea name="description" label="Descripción" value={form.description} onChange={handleChange} />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold block mb-1">Portada del Refugio</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const files = Array.from((e.target as HTMLInputElement).files || []);
              handleFileChange(files);
            }}
          />
          {form.coverPhotoUrl && (
            <div className="relative w-32 h-32 mt-4">
              <Image
                src={form.coverPhotoUrl}
                alt="Portada actual"
                className="object-cover w-full h-full rounded-md"
              />
              <Button
                size="sm"
                color="danger"
                isIconOnly
                className="absolute top-1 right-1 z-10 p-1 rounded-full shadow-xl"
                onClick={handleDeleteCover}
              >
                <TrashIcon size={16} />
              </Button>

            </div>
          )}
          {form.newPhotos.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {form.newPhotos.map((file, idx) => (
                <Image
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={`Foto ${idx + 1}`}
                  radius="md"
                  className="w-24 h-24 object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button onClick={handleSave} isLoading={saving} className="mt-2" color="primary" >
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
}
