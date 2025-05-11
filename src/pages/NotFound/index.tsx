import { Button } from "@heroui/react";
import { ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import  cat_not_found  from "../../assets/cats3d/cats_not_found2.png"; 

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className=" max-w-md mx-auto">
        {/* Imagen de gato */}
        <div className="relative  mx-auto flex flex-col items-center justify-center mb-4">
          <img
            src={cat_not_found} // Cambia por tu propia imagen real de gato si quieres
            alt="Gato confundido buscando la página"
            className="object-cover w-90"
          />
        </div>

        {/* Mensaje de error */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            ¡Miau! Página no encontrada
          </h2>
          <p className="text-muted-foreground">
            Parece que este gatito se ha perdido... o la página ya no existe.  
            <br />
            ¡No te preocupes, te ayudamos a regresar!
          </p>
        </div>

        {/* Botones de navegación */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver atrás
          </Button>

          <Link to="/">
            <Button className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Ir al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
