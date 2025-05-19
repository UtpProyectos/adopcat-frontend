import { Button } from "@heroui/react";
import { ArrowLeft, Home } from "lucide-react";
import {  useNavigate } from "react-router-dom"; 
import  org_not_found_img  from "../../../assets/cats3d/org_not_found.png"; 

export default function OrganizationNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="max-w-md mx-auto">
        {/* Imagen */}
        <div className="relative mx-auto flex flex-col items-center justify-center mb-4">
          <img
            src={org_not_found_img}
            alt="Organización no encontrada"
            className="object-cover w-90"
          />
        </div>

        {/* Mensaje */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Organización no encontrada
          </h2>
          <p className="text-muted-foreground">
            No pudimos encontrar la organización que buscas.
            <br />
            Quizás se eliminó o la dirección es incorrecta.
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver atrás
          </Button>
 
            <Button className="flex items-center gap-2" onClick={() => navigate("/perfil?tab=organizaciones")}>
              <Home className="h-4 w-4" />
              Ir a Organizaciones 
            </Button> 
        </div>
      </div>
    </div>
  );
}
