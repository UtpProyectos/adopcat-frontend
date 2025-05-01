import { useEffect, useState } from "react"
import {
  Card, CardBody, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, InputOtp,
  addToast,
  CircularProgress
} from "@heroui/react"
import { CheckCircle, XCircle, MailIcon, PhoneIcon, UploadCloud } from "lucide-react"
import { useAuth } from "../../../../../context/AuthContext"
import AdoptButton from "../../../../../components/Buttons/AdoptButton"
import { userService } from "../../../../../services/user"

interface UserProfile {
  firstName: string
  lastName: string
  dni: string
  phoneNumber: string
  address: string
  dniUrl: string
  emailVerified: boolean
  phoneVerified: boolean
  adminApproved: boolean
}

const InfoTab = ({ onProfileLoad }: { onProfileLoad: (profile: UserProfile) => void }) => {

  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [dniFile, setDniFile] = useState<File | null>(null)

  const emailModal = useDisclosure()
  const phoneModal = useDisclosure()
  const [otpValue, setOtpValue] = useState("")
  const [savedPhone, setSavedPhone] = useState(false)
 
  


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await userService.getProfile()
        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          dni: data.dni,
          phoneNumber: data.phoneNumber,
          address: data.address,
          dniUrl: data.dniUrl,
          emailVerified: data.emailVerified,
          phoneVerified: data.phoneVerified,
          adminApproved: data.adminApproved
        })
        
        onProfileLoad(data);
        setSavedPhone(Boolean(data.phoneNumber))
      } catch (error) {
        console.error("❌ Error al cargar perfil", error)
      }
    }

    fetchProfile()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setLoading(true) // ✅ inicia el loading

    try {
      if (dniFile) {
        if (user) {
          await userService.uploadDni(user.userId, dniFile)
        }
      }

      if (user) {
        await userService.updateProfile(user.userId, {
          firstName: profile.firstName,
          lastName: profile.lastName,
          dni: profile.dni,
          phoneNumber: profile.phoneNumber,
          address: profile.address
        })
      } else {
        throw new Error("User is not authenticated.");
      }

      const { data: updatedUser } = await userService.getProfile()

      const minimalUser = {
        userId: updatedUser.userId,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: typeof updatedUser.role === "string" ? updatedUser.role : updatedUser.role?.roleName ?? "UNKNOWN",
        profilePhoto: updatedUser.profilePhoto ?? "",
        verified: updatedUser.verified ?? false
      }

      
      setUser(minimalUser)
      localStorage.setItem("user", JSON.stringify(minimalUser))

      setProfile({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        dni: updatedUser.dni,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
        dniUrl: updatedUser.dniUrl,
        emailVerified: updatedUser.emailVerified,
        phoneVerified: updatedUser.phoneVerified,
        adminApproved: updatedUser.adminApproved
      })


      onProfileLoad(updatedUser);

      addToast({
        title: "Perfil actualizado",
        description: "Tus datos se guardaron correctamente.",
        timeout: 3000,
        color: "success",
        shouldShowTimeoutProgress: true,
      })
    } catch (error: any) {
      addToast({
        title: "Error al guardar",
        description: error?.response?.data?.message || "Ocurrió un error al guardar los cambios.",
        color: "danger",
        icon: <XCircle className="text-red-500" />,
      })
    } finally {
      setLoading(false)
    }
  }


  if (!profile) return <p className="flex flex-col items-center"><CircularProgress aria-label="Loading..." />Cargando perfil</p>

  return (
    <div className="w-full flex flex-col gap-8">
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold border-b pb-2 border-gray-300">Información Personal</h2>

        <div className="flex items-end gap-4">
          <Input
            label="Correo electrónico"
            labelPlacement="outside"
            value={user?.email || ""}
            startContent={<MailIcon className="text-2xl text-default-400" />}
            disabled
          />
          {!profile.emailVerified && (
            <Button color="danger" onClick={emailModal.onOpen} type="button">
              Verificar
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Input
            label="Nombre"
            labelPlacement="outside"
            value={profile.firstName}
            onChange={e => setProfile({ ...profile, firstName: e.target.value })}
          />
          <Input
            label="Apellido"
            labelPlacement="outside"
            value={profile.lastName}
            onChange={e => setProfile({ ...profile, lastName: e.target.value })}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Input
            label={<div className="flex gap-1 items-center">DNI {!profile.dni && <span className="text-xs text-red-500">(Pendiente)</span>}</div>}
            labelPlacement="outside"
            value={profile.dni}
            onChange={e => setProfile({ ...profile, dni: e.target.value })}
          />
          <Input
            label={
              <div className="flex gap-1 items-center">
                Documento
                {!profile.dniUrl ? (
                  <span className="text-xs text-red-500">(Pendiente)</span>
                ) : (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    (Cargado) <CheckCircle className="w-4 h-4" />
                  </span>
                )}
              </div>
            }
            labelPlacement="outside"
            type="file"
            placeholder="Sube tu DNI"
            
            description="Formato: PDF o imagen (JPG, PNG)"
            className="w-full"
            accept="image/*,application/pdf"
            startContent={<UploadCloud className="text-2xl text-default-400" />}
            onChange={e => setDniFile(e.target.files?.[0] || null)}
          />

        </div>

        <h2 className="text-xl font-bold mt-8 border-b pb-2 border-gray-300">Contacto</h2>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <Input
            label={<div className="flex gap-1 items-center">Teléfono {!profile.phoneNumber && <span className="text-xs text-red-500">(Pendiente)</span>}</div>}
            labelPlacement="outside"
            value={profile.phoneNumber}
            onChange={e => setProfile({ ...profile, phoneNumber: e.target.value })}
            startContent={<PhoneIcon className="text-2xl text-default-400" />}
          />
          {savedPhone && !profile.phoneVerified && (
            <AdoptButton label="Verificar" variant="primary" type="button" onPress={phoneModal.onOpen} />
          )}
        </div>

        <Input
          label={<div className="flex gap-1 items-center">Dirección {!profile.address && <span className="text-xs text-red-500">(Pendiente)</span>}</div>}
          labelPlacement="outside"
          value={profile.address}
          onChange={e => setProfile({ ...profile, address: e.target.value })}
        />

        <div className="flex items-center gap-2 mt-4">
          {profile.adminApproved ? (
            <CheckCircle size={20} className="text-green-500" />
          ) : (
            <XCircle size={20} className="text-red-500" />
          )}
          <span className="text-sm">Verificación administrativa</span>
        </div>

        <AdoptButton
          label={loading ? "Guardando..." : "Guardar Cambios"}
          variant="primary"
          type="submit"
          isLoading={loading}
        />

      </form>

      <form onSubmit={(e) => { e.preventDefault(); console.log('Actualizar contraseña') }} className="flex flex-col gap-6 mt-12">
        <h2 className="text-2xl font-bold border-b pb-2 border-gray-300">Cambiar Contraseña</h2>
        <Card className="shadow-primary">
          <CardBody className="flex flex-col gap-6">
            <Input label="Nueva contraseña" labelPlacement="outside" type="password" />
            <Input label="Confirmar nueva contraseña" labelPlacement="outside" type="password" />
            <AdoptButton label="Actualizar Contraseña" variant="primary" type="submit" />
          </CardBody>
        </Card>
      </form>

      <Modal isOpen={emailModal.isOpen} onClose={emailModal.onClose}>
        <ModalContent>
          <ModalHeader>Verificar tu correo electrónico</ModalHeader>
          <ModalBody><InputOtp length={6} value={otpValue} onValueChange={setOtpValue} /></ModalBody>
          <ModalFooter><Button color="primary" onClick={emailModal.onClose}>Confirmar OTP</Button></ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={phoneModal.isOpen} onClose={phoneModal.onClose}>
        <ModalContent>
          <ModalHeader>Verificar tu número de teléfono</ModalHeader>
          <ModalBody><InputOtp length={6} value={otpValue} onValueChange={setOtpValue} /></ModalBody>
          <ModalFooter><Button color="primary" onClick={phoneModal.onClose}>Confirmar OTP</Button></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default InfoTab
