import { useState } from "react";
import { Card, CardBody, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, InputOtp } from "@heroui/react";
import { CheckCircle, XCircle, MailIcon, PhoneIcon, UploadCloud } from "lucide-react";
import { useAuth } from "../../../../../context/AuthContext";
import AdoptButton from "../../../../../components/Buttons/AdoptButton";

const InfoTab = () => {
    const { user } = useAuth();

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
    const [dni, setDni] = useState(user?.dni || "");
    const [address, setAddress] = useState(user?.address || "");
    const [dniFile, setDniFile] = useState<File | null>(null);

    const emailModal = useDisclosure();
    const phoneModal = useDisclosure();
    const [otpValue, setOtpValue] = useState("");

    const [savedPhone, setSavedPhone] = useState(Boolean(user?.phoneNumber));

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ firstName, lastName, phoneNumber, dni, address, dniFile });

        if (phoneNumber) setSavedPhone(true);
    };

    return (
        <div className="w-full flex flex-col gap-6">

            <h2 className="text-2xl font-bold text-center">Información de Perfil</h2>

            <form onSubmit={handleSave} className="flex flex-col gap-6">

                {/* Email */}
                <div className="flex items-end gap-4">
                    <Input
                        label="Correo electrónico"
                        labelPlacement="outside"
                        placeholder="you@example.com"
                        value={user?.email || ""}
                        startContent={<MailIcon className="text-2xl text-default-400" />}
                        disabled
                        type="email"
                    />
                    {user?.email && !user?.emailVerified && (
                        <Button color="danger" onClick={emailModal.onOpen} type="button">
                            Verificar
                        </Button>
                    )}
                </div>

                {/* Nombre */}
                <Input
                    label="Nombre"
                    labelPlacement="outside"
                    placeholder="Tu nombre"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                {/* Apellido */}
                <Input
                    label="Apellido"
                    labelPlacement="outside"
                    placeholder="Tu apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                {/* DNI */}
                <Input
                    label={
                        <div className="flex items-center gap-1">
                            <span>DNI</span>
                            {!dni && <span className="text-red-500 text-xs">(Pendiente)</span>}
                        </div>
                    }
                    labelPlacement="outside"
                    placeholder="Número de DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                />

                {/* Upload de DNI */}
                <Input
                    label={
                        <div className="flex items-center gap-1">
                            <span>Documento de Identidad</span>
                            {!user?.dniUrl && <span className="text-red-500 text-xs">(Pendiente)</span>}
                        </div>
                    }
                    labelPlacement="outside"
                    placeholder="Subir documento"
                    type="file"
                    accept="image/*,application/pdf"
                    startContent={<UploadCloud className="text-2xl text-default-400" />}
                    onChange={(e) => setDniFile(e.target.files?.[0] || null)}
                />

                {/* Teléfono */}
                <div className="flex items-end gap-4">
                    <Input
                        label={
                            <div className="flex items-center gap-1">
                                <span>Número de Teléfono</span>
                                {!phoneNumber && <span className="text-red-500 text-xs">(Pendiente)</span>}
                            </div>
                        }
                        labelPlacement="outside"
                        placeholder="+51 999999999"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        startContent={<PhoneIcon className="text-2xl text-default-400" />}
                    />
                    {savedPhone && !user?.phoneVerified && (
                        <AdoptButton label="Verificar" variant="primary" type="button" onPress={phoneModal.onOpen} />
                    )}
                </div>

                {/* Dirección */}
                <Input
                    label={
                        <div className="flex items-center gap-1">
                            <span>Dirección</span>
                            {!address && <span className="text-red-500 text-xs">(Pendiente)</span>}
                        </div>
                    }
                    labelPlacement="outside"
                    placeholder="Tu dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                {/* Verificación administrativa */}
                <div className="flex items-center gap-2 mt-4">
                    {user?.adminApproved ? (
                        <CheckCircle size={20} className="text-green-500" />
                    ) : (
                        <XCircle size={20} className="text-red-500" />
                    )}
                    <span className="text-sm">Verificación administrativa</span>
                </div>

                {/* Botón Guardar */}
                <AdoptButton label="Guardar Cambios" variant="primary" type="submit" />


            </form>


            {/* Sección Cambio de Contraseña */}
            <form onSubmit={(e) => { e.preventDefault(); console.log('Actualizar contraseña') }} className="flex flex-col gap-6">

                <h2 className="text-2xl font-bold text-center mt-8">Cambiar Contraseña</h2>

                <Card className="shadow-primary">
                    <CardBody className="flex flex-col gap-6">

                        {/* Nueva contraseña */}
                        <Input
                            label="Nueva contraseña"
                            labelPlacement="outside"
                            placeholder="Escribe tu nueva contraseña"
                            type="password"
                        />

                        {/* Confirmar nueva contraseña */}
                        <Input
                            label="Confirmar nueva contraseña"
                            labelPlacement="outside"
                            placeholder="Repite tu nueva contraseña"
                            type="password"
                        />

                        {/* Botón actualizar contraseña */}
                        <AdoptButton label="Actualizar Contraseña" variant="primary" type="submit" />

                    </CardBody>
                </Card>

            </form>
            {/* Modal OTP para Email */}
            <Modal isOpen={emailModal.isOpen} onClose={emailModal.onClose}>
                <ModalContent>
                    <ModalHeader>Verificar tu correo electrónico</ModalHeader>
                    <ModalBody>
                        <InputOtp length={6} value={otpValue} onValueChange={setOtpValue} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={emailModal.onClose}>
                            Confirmar OTP
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal OTP para Teléfono */}
            <Modal isOpen={phoneModal.isOpen} onClose={phoneModal.onClose}>
                <ModalContent>
                    <ModalHeader>Verificar tu número de teléfono</ModalHeader>
                    <ModalBody>
                        <InputOtp length={6} value={otpValue} onValueChange={setOtpValue} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={phoneModal.onClose}>
                            Confirmar OTP
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
};

export default InfoTab;
