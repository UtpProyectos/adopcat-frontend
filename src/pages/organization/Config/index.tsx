import { useState, useEffect } from "react"
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  addToast,
  Checkbox, 
  Image,
} from "@heroui/react"
import { useOrganization } from "../../../context/OrganizationContext"

const tipos = ["Refugio", "Casa Hogar"]
const estados = ["Solicitado", "Pendiente", "En Progreso", "Aprobado"]

export default function OrganizationConfig() {
  const { organization, loading, error, updateOrganization } = useOrganization()
  const [form, setForm] = useState({
    name: "",
    ruc: "",
    tipo: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
    status: "",
    verified: false,
    coverPhotoUrl: "",
    photos: [] as string[],
    newPhotos: [] as File[],
  })
  const [saving, setSaving] = useState(false)

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
        status: organization.status || "Solicitado",
        verified: organization.verified || false,
        coverPhotoUrl: organization.coverPhotoUrl || "",
        photos: [], // assuming no photos field yet, or set from organization.photos
        newPhotos: [],
      })
    }
  }, [organization])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (files: File[]) => {
    setForm((prev) => ({ ...prev, newPhotos: files }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Aquí podrías implementar la subida de fotos nuevas si es necesario

      await updateOrganization({
        ...form,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
      })
      addToast({ title: "Datos actualizados", color: "success" })
    } catch {
      addToast({ title: "Error al guardar", color: "danger" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Cargando organización...</div>
  if (error) return <div>Error cargando organización</div>

  return (
    <form className="flex flex-col gap-4 max-w-xl mx-auto">
      <Input name="name" label="Nombre" value={form.name} onChange={handleChange} required />
      <Input name="ruc" label="RUC" value={form.ruc} onChange={handleChange} maxLength={11} required />
      <Select name="tipo" label="Tipo" value={form.tipo} onChange={handleChange} required>
        {tipos.map((t) => (
          <SelectItem key={t} value={t}>{t}</SelectItem>
        ))}
      </Select>
      <Select name="status" label="Estado" value={form.status} onChange={handleChange} required>
        {estados.map((e) => (
          <SelectItem key={e} value={e}>{e}</SelectItem>
        ))}
      </Select>
      <Checkbox
        name="verified"
        label="Verificado"
        isSelected={form.verified}
        onChange={(e) => setForm((prev) => ({ ...prev, verified: (e.target as HTMLInputElement).checked }))}
      />
      <Textarea name="description" label="Descripción" value={form.description} onChange={handleChange} />
      <Input name="address" label="Dirección" value={form.address} onChange={handleChange} />
      <Input name="latitude" label="Latitud" value={form.latitude} onChange={handleChange} />
      <Input name="longitude" label="Longitud" value={form.longitude} onChange={handleChange} />

      <label className="font-semibold">Fotos del Refugio</label>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          const files = Array.from((e.target as HTMLInputElement).files || []);
          handleFileChange(files);
        }}
        placeholder="Sube las fotos del refugio"
      />
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

      <Button onClick={handleSave} isLoading={saving}>Guardar</Button>
    </form>
  )
}
