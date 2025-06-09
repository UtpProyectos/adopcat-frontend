import ContainerHeader from "../../../components/Containers/ContainerHeader";
import CatCatalogo from "../../../assets/cats/cat-catalogo.png";
import CatCatalogoOption from "../../../assets/cats/cat-catalogo-option.png";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { NavLink } from "react-router-dom";
import CatCard from "../../../components/Cards/CatCard";
import { CatResponse } from "../../../models/cat";
import { useState, useEffect } from "react";
import { catService } from "../../../services/cats";
import { addToast } from "@heroui/react";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const Cats = () => {
  const [cats, setCats] = useState<CatResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCats = async () => {
    setLoading(true);
    try {
      const res = await catService.getAllCats();
      setCats(res.data);
    } catch (error: any) {
      addToast({
        title: "Error",
        description: error?.response?.data?.message || "Error cargando gatos",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  // Función para calcular edad legible en meses o años
  const formatAge = (birthDateStr?: string) => {
    if (!birthDateStr) return "Desconocida";

    const birthDate = new Date(birthDateStr);
    const now = new Date();

    let months =
      (now.getFullYear() - birthDate.getFullYear()) * 12 +
      (now.getMonth() - birthDate.getMonth());

    if (now.getDate() < birthDate.getDate()) {
      months--;
    }

    if (months < 0) return "Desconocida";

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0 && remainingMonths > 0) {
      return `${remainingMonths}m`;
    } else if (years > 0 && remainingMonths === 0) {
      return `${years}y`;
    } else if (years > 0 && remainingMonths > 0) {
      return `${years}y ${remainingMonths}m`;
    } else {
      return "Desconocida";
    }
  };


  return (
    <div>
      <ContainerHeader
        classP="h-[600px] align-bottomw"
        childrenLeft={
          <>
            <div className="flex flex-col justify-center">
              <Breadcrumbs>
                <BreadcrumbItem>
                  <NavLink to="/">Home</NavLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <span className="text-primary font-bold">Cats</span>
                </BreadcrumbItem>
              </Breadcrumbs>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-relaxed pt-12">
                Encuentra a tu nuevo compañero felino
              </h1>
              <p className="text-lg text-gray-500">
                Explora gatos en adopción cerca de ti <br /> y dale un hogar lleno
                de amor.
              </p>
            </div>
          </>
        }
        childrenRight={
          <img
            src={CatCatalogo}
            alt="Gato en adopción"
            className="w-[180px] md:w-[300px] lg:w-[500px] h-auto object-contain"
          />
        }
      />
      <section className="bg-body py-10 dark:bg-dark">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <LoadingSpinner message="Buscando gatitos disponibles..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {cats.length === 0 ? (
                <p className="text-center col-span-full">No hay gatos disponibles.</p>
              ) : (
                cats.map((cat) => (
                  <CatCard
                    key={cat.catId}
                    id={cat.catId}
                    name={cat.name}
                    imageUrl={cat.mainImageUrl || CatCatalogoOption}
                    location="Lima, Perú"
                    age={formatAge(cat.birthDate ? cat.birthDate.toString() : undefined)}
                    gender={cat.gender === "FEMALE" ? "Hembra" : cat.gender === "MALE" ? "Macho" : cat.gender || "Desconocido"}
                  />
                ))
              )}
            </div>
          )}
               

        </div>
      </section>
    </div>
  );
};

export default Cats;
