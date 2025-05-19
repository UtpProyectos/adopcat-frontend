import { useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  Textarea,
  addToast,
  SelectItem,
} from "@heroui/react"
import { organizationService } from "../../../../../services/organization"
import AdoptButton from "../../../../../components/Buttons/AdoptButton"

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface Props {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const LocationPicker = ({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void
}) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

const OrganizationRequestModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [form, setForm] = useState({
    name: "",
    ruc: "",
    tipo: "",
    description: "",
    address: "",
    latitude: 0,
    longitude: 0,
  })

  const tipos = [
    { key: "Refugio", label: "Refugio" },
    { key: "Casa Hogar", label: "Casa Hogar" },
  ]

  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Busca la dirección usando Nominatim y actualiza lat/lng
  const buscarDireccion = async () => {
    if (!form.address) {
      addToast({ title: "Escribe una dirección para buscar", color: "warning" })
      return
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          form.address
        )}`
      )
      const data = await res.json()
      if (data.length === 0) {
        addToast({ title: "No se encontró la dirección", color: "warning" })
        return
      }
      const { lat, lon, display_name } = data[0]
      setForm((prev) => ({
        ...prev,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      }))
      addToast({ title: "Dirección encontrada", description: display_name, color: "success" })
    } catch {
      addToast({ title: "Error buscando la dirección", color: "danger" })
    }
  }

  const handleSubmit = async () => {
    console.log(form)
    if (
      !form.name ||
      !form.ruc ||
      !form.tipo ||
      form.latitude === 0 ||
      form.longitude === 0
    ) {
      addToast({
        title: "Completa todos los campos obligatorios y selecciona ubicación en el mapa",
        color: "warning",
      })
      return
    }

    setLoading(true)
    try {
      await organizationService.create(form)
      addToast({
        title: "Solicitud enviada",
        description: "Tu organización está en revisión.",
        color: "success",
      })
      onSuccess()
      onClose()
    } catch (err: any) {
      addToast({
        title: "Error",
        description:
          err?.response?.data?.message || "No se pudo enviar la solicitud.",
        color: "danger",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent >

        <ModalHeader>Solicitar Registro de Organización</ModalHeader>
        <ModalBody className="flex flex-col gap-4 max-h-[80vh] overflow-auto">
          <Input
            labelPlacement="outside"
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            labelPlacement="outside"
            label="RUC"
            name="ruc"
            value={form.ruc}
            onChange={handleChange}
            required
            maxLength={11}
          />
          <Select
            label="Tipo de organización"
            labelPlacement="outside"
            isRequired
            selectedKeys={form.tipo ? new Set([form.tipo]) : new Set()}
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as string || ""
              setForm((prev) => ({ ...prev, tipo: key }))
            }}
            placeholder="Selecciona tipo"
          >
            {tipos.map((tipo) => (
              <SelectItem key={tipo.key}>{tipo.label}</SelectItem>
            ))}
          </Select>
          <Textarea
            labelPlacement="outside"
            label="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          {/* Dirección + botón Buscar */}
          <div className="flex gap-2 items-end">
            <Textarea
              labelPlacement="outside"
              label="Dirección"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="flex-grow"
            />
            <Button onClick={buscarDireccion} color="primary" className="mb-4">
              Buscar
            </Button>
          </div>

          {/* Mapa */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Ubicación (haz clic en el mapa)
            </label>
            <div className="h-64 w-full rounded-xl overflow-hidden border border-gray-300">
              <MapContainer
                center={
                  form.latitude !== 0 && form.longitude !== 0
                    ? [form.latitude, form.longitude]
                    : [-12.0464, -77.0428]
                }
                zoom={13}
                className="h-full w-full"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {form.latitude !== 0 && form.longitude !== 0 && (
                  <Marker position={[form.latitude, form.longitude]} />
                )}
                <LocationPicker
                  onSelect={(lat, lng) =>
                    setForm((prev) => ({ ...prev, latitude: lat, longitude: lng }))
                  }
                />
              </MapContainer>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={onClose}>
            Cancelar
          </Button>
          <AdoptButton
            label="Enviar Solicitud"
            variant="primary"
            onPress={handleSubmit}
            isLoading={loading}
            className="ml-2"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OrganizationRequestModal
