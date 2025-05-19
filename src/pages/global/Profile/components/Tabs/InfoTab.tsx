import { useEffect, useState } from "react"
import {
  Input, Button, 
  addToast,
  CircularProgress,
  Progress
} from "@heroui/react"
import { CheckCircle, XCircle, MailIcon, PhoneIcon, UploadCloud } from "lucide-react"
import { useAuth } from "../../../../../context/AuthContext"
import AdoptButton from "../../../../../components/Buttons/AdoptButton"
import { userService } from "../../../../../services/user"
import InputPassword from "../../../../../components/Inputs/InputPassword"
import { validarPassword } from "../../../../../auth/passwordValidator"
import PhoneVerificationModal from "../Modals/PhoneVerificationModal"
import EmailVerificationModal from "../Modals/EmailVerificationModal"
import { UserProfile } from "../../../../../models/user"

 

const InfoTab = ({ onProfileLoad }: { onProfileLoad: (profile: UserProfile) => void }) => {

  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [dniFile, setDniFile] = useState<File | null>(null)

  const [phoneModalOpen, setPhoneModalOpen] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [changingPassword, setChangingPassword] = useState(false)

  const { score, strengthLabel, suggestions, color } = validarPassword(newPassword)
 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await userService.getProfile()
        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          dni: data.dni,
          phoneNumber: data.phoneNumber?.replace("+51", ""),
          address: data.address,
          dniUrl: data.dniUrl,
          emailVerified: data.emailVerified,
          phoneVerified: data.phoneVerified,
          adminApproved: data.adminApproved
        })
        onProfileLoad(data)
      } catch (error) {
        console.error("❌ Error al cargar perfil", error)
      }
    }
    fetchProfile()
  }, [])

  const handlePhoneVerified = () => {

    if (profile) setProfile({ ...profile, phoneVerified: true })
  }

  const handleEmailVerified = () => {
    if (profile) setProfile({ ...profile, emailVerified: true })
  }
  

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
          phoneNumber: `+51${profile.phoneNumber}`,
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
        phoneNumber: updatedUser.phoneNumber.replace("+51", ""),
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

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError(null)

    if (newPassword !== confirmNewPassword) {
      console.log(newPassword, confirmNewPassword)
      return setPasswordError("Las contraseñas no coinciden.")
    }

    try {
      setChangingPassword(true)
      if (!user) throw new Error("Usuario no autenticado")

      console.log(user)
      await userService.changePassword(user.userId, currentPassword, newPassword)

      addToast({
        title: "Contraseña actualizada",
        description: "Tu contraseña fue cambiada exitosamente.",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })

      // Limpia los campos
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    } catch (err: any) {
      setPasswordError(err?.response?.data?.message || "Error al cambiar la contraseña.")
    } finally {
      setChangingPassword(false)
    }
  }


  if (!profile) return (
    <div className="flex flex-col items-center text-center">
      <CircularProgress aria-label="Loading..." />
      <p>Cargando perfil</p>
    </div>
  )

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
            <Button color="danger" onClick={() => setEmailModalOpen(true)} type="button">
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
            startContent={
              <div className="pointer-events-none flex items-center">

                <PhoneIcon className="text-2xl text-default-400" />
                <span className="text-default-400 text-small">+51</span>
              </div>}
          />
          {!profile.phoneVerified && (
            <Button color="danger" onClick={() => setPhoneModalOpen(true)} type="button">
              Verificar
            </Button>
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

      <form onSubmit={handleChangePassword} className="flex flex-col gap-6 mt-12">
        <h2 className="text-2xl font-bold border-b pb-2 border-gray-300">Cambiar Contraseña</h2>

        <InputPassword
          label="Contraseña actual"
          value={currentPassword}
          onChange={setCurrentPassword}
          isRequired
        />
        <InputPassword
          label="Nueva contraseña"
          value={newPassword}
          onChange={setNewPassword}
          isRequired
        />
        {newPassword && (
          <>
            <Progress
              value={(score + 1) * 20}
              color={color}
              showValueLabel={false}
            />
            <p className={`text-sm font-medium ${color === "danger"
              ? "text-red-600"
              : color === "warning"
                ? "text-yellow-600"
                : "text-green-600"
              }`}>
              Seguridad: {strengthLabel}
            </p>
            {suggestions.length > 0 && (
              <ul className="text-xs text-gray-500 list-disc pl-5">
                {suggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            )}
          </>
        )}
        <InputPassword
          label="Confirmar nueva contraseña"
          value={confirmNewPassword}
          onChange={setConfirmNewPassword}
          isRequired
        />
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        <AdoptButton
          label={changingPassword ? "Actualizando..." : "Actualizar Contraseña"}
          variant="primary"
          type="submit"
          isLoading={changingPassword}
        />
      </form>



      <EmailVerificationModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        email={user?.email || ""}
        userId={user?.userId || ""}
        onSuccess={handleEmailVerified}
      />


      <PhoneVerificationModal
        isOpen={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        phoneNumber={profile.phoneNumber}
        userId={user?.userId || ""}
        onSuccess={handlePhoneVerified}
      />
    </div>
  )
}

export default InfoTab
