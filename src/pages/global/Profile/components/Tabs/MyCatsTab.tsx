import { useEffect, useState } from "react";
import { Spinner, addToast } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import { catService } from "@/services/cats";
import { CatResponse } from "@/models/cat";
import CatCard from "@/components/Cards/CatCard";

const MyCatsTab = () => {
  const { user } = useAuth();
  const [cats, setCats] = useState<CatResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCats = async () => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      const res = await catService.getDeliveredCatsByMe();
      setCats(res.data);
    } catch (error) {
      addToast({
        title: "Error",
        description: "No se pudieron cargar tus gatos adoptados.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, [user?.userId]);

  if (loading) return <Spinner label="Cargando gatos..." color="primary" />;

  if (cats.length === 0) {
    return <p className="text-center text-gray-600">No tienes gatos adoptados aún.</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {cats.map((cat) => (
        <CatCard
          key={cat.catId}
          id={cat.catId}
          name={cat.name}
          imageUrl={cat.mainImageUrl || "/default-cat.png"}
          location={cat.location ? formatearUbicacion(cat.location) : ""}

          gender={cat.gender ?? ""}
          age={cat.birthDate ? calcularEdad(cat.birthDate) : "N/A"}
          buttonLabel="Ver mi gato" 
        />
      ))}
    </div>
  );
};

export default MyCatsTab;

// 📆 Función para calcular edad desde la fecha de nacimiento
function calcularEdad(fechaNacimiento: string): string {
  const birth = new Date(fechaNacimiento);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  return m < 0 || (m === 0 && today.getDate() < birth.getDate())
    ? `${age - 1} años`
    : `${age} años`;
}

function formatearUbicacion(location: string): string {
  const partes = location.split(",");
  // Tomamos las últimas 2 o 3 partes, típicamente "Ciudad, País" o "Departamento, Ciudad, País"
  const visibles = partes.slice(-3).map((p) => p.trim());
  return visibles.join(", ");
}
