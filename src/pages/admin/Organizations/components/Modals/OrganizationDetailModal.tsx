import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  User,
  Chip,
} from "@heroui/react"
import { OrganizationResponse } from "../../../../../models/organization"

interface Props {
  isOpen: boolean
  onClose: () => void
  organization: OrganizationResponse | null
}

export default function OrganizationDetailModal({
  isOpen,
  onClose,
  organization,
}: Props) {
  if (!organization) return null

  const user = organization.createdBy

  // Avatar organización: imagen o iniciales
  const orgAvatar = organization.coverPhotoUrl
    ? organization.coverPhotoUrl
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        organization.name
      )}&background=0D8ABC&color=fff`

  // Avatar creador
  const creatorAvatar = user?.profilePhoto
    ? user.profilePhoto
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.firstName || ""
      )}+${encodeURIComponent(user?.lastName || "")}&background=0D8ABC&color=fff`

  const openGoogleMaps = () => {
    if (!organization.latitude || !organization.longitude) return
    const url = `https://www.google.com/maps?q=${organization.latitude},${organization.longitude}`
    window.open(url, "_blank")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Detalle de Organización</ModalHeader>
        <ModalBody className="space-y-8">
          {/* Organización arriba, centrada */}
          <div className="flex flex-col items-center gap-4 border-b border-gray-200 pb-6">
            <User
              avatarProps={{ radius: "lg", src: orgAvatar }}
              name={organization.name}
              description={organization.tipo}
              // size="xl"
              className="text-center"
            />
          </div>

          {/* Información general y dirección */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-base">
            <div className="space-y-2">
              <p><strong>RUC:</strong> {organization.ruc}</p>
              <p><strong>Estado:</strong>{" "}
                <Chip
                  color={organization.status.toUpperCase() === "APROBADO" ? "success" : "default"}
                  size="sm"
                  className="capitalize"
                >
                  {organization.status.toLowerCase().replace("_", " ")}
                </Chip>
              </p>
               <p>
                <strong>Activo:</strong>{" "}
                <Chip color={organization.state ? "success" : "default"} size="sm">
                  {organization.state ? "Sí" : "No"}
                </Chip>
              </p>
              <p>
                <strong>Verificado:</strong>{" "}
                <Chip color={organization.verified ? "success" : "default"} size="sm">
                  {organization.verified ? "Sí" : "No"}
                </Chip>
              </p>
              <p><strong>Fecha creación:</strong> {new Date(organization.createdAt).toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Dirección:</strong> {organization.address || "No proporcionada"}</p>
              <p className="flex items-center gap-2">
                <strong>Coordenadas:</strong>  
                {organization.latitude && organization.longitude && (
                  <Button size="sm"   color="primary" onPress={openGoogleMaps}>
                    Ir a mapa
                  </Button>
                )}
              </p>
              
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">Descripción</h3>
            <p className="whitespace-pre-wrap text-gray-700">{organization.description || "Sin descripción"}</p>
            
          </div>

          {/* Creador abajo, con separación */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold mb-4 text-gray-900">Creado por</h3>
            <User
              avatarProps={{ radius: "lg", src: creatorAvatar }}
              name={`${user.firstName} ${user.lastName}`}
              description={user.email}
              // size="lg"
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="default" onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
