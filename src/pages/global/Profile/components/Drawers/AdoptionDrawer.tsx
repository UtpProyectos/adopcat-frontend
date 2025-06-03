// src/components/Drawers/AdoptionDrawer.tsx
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    Button,
    Spinner,
  } from "@heroui/react";
  import { useEffect, useState } from "react"; 
import { AdoptionResponse } from "../../../../../models/adoption";
  
  interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    request: AdoptionResponse | null;
  }
  
  const AdoptionDrawer = ({ isOpen, onOpenChange, request }: Props) => {
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<any>(null);
  
    useEffect(() => {
      if (!request) return;
      const fetchData = async () => {
        setLoading(true);
         
         
        setLoading(false);
      };
      fetchData();
    }, [request]);
  
    return (
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right">
        <DrawerContent className="max-w-md">
          {(onClose) => (
            <>
              <DrawerHeader className="text-lg font-bold">
                Detalles de Solicitud
              </DrawerHeader>
              <DrawerBody className="space-y-3">
                {loading ? (
                  <Spinner label="Cargando..." />
                ) : details ? (
                  <>
                    <p><strong>Gato:</strong> s </p>
                    <p><strong>Estado:</strong> {request?.status}</p>
                    <p><strong>Motivo:</strong> {details.reason}</p>
                    <p><strong>Experiencia:</strong> {details.experience}</p>
                    <p><strong>Tipo de vivienda:</strong> {details.residenceType}</p>
                    <p><strong>Reacción ante problemas:</strong> {details.reactionPlan}</p>
                    <p><strong>Consentimiento seguimiento:</strong> {details.followUpConsent}</p>
                    <p className="text-xs text-gray-400">
                      Enviado el  
                    </p>
                  </>
                ) : (
                  <p>No hay detalles disponibles.</p>
                )}
              </DrawerBody>
              <DrawerFooter>
                <Button variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default AdoptionDrawer;
  