import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { catService } from "../../../../services/cats";
import ContainerHeader from "../../../../components/Containers/ContainerHeader";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { NavLink } from "react-router-dom";
import AdoptButton from "../../../../components/Buttons/AdoptButton";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";
import CatCatalogoOption from "../../../../assets/cats/cat-catalogo-option.png";
import { CatResponse } from "../../../../models/cat";
import { Button } from "@heroui/react";
import { MapPin } from "lucide-react";
import { CatFeatureResponse } from "../../../../models/catFeature";
import ImageCarousel from "../../../../components/Carrousel/ImageCarousel";

const CatDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [cat, setCat] = useState<CatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatAge = (birthDateStr?: string | null) => {
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

  const formatSize = (size?: string | null) => {
    if (!size) return "Desconocido";
    return size.charAt(0).toUpperCase() + size.slice(1).toLowerCase();
  };

  const openGoogleMaps = () => {
    if (!cat) return;
    if (!cat.latitude || !cat.longitude) return;
    const url = `https://www.google.com/maps?q=${cat.latitude},${cat.longitude}`;
    window.open(url, "_blank");
  };


  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    catService.getCatById(id)
      .then(res => {
        setCat(res.data as CatResponse);
        console.log(res.data);

      })
      .catch(err => {
        setError(err?.response?.data?.message || "Error cargando detalles del gato");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const images = cat
    ? [
        cat.mainImageUrl || "",
        ...(cat.photos?.map(photo => photo.url) || [])
      ].filter(url => !!url)
    : [CatCatalogoOption];


      console.log(images);

  if (loading) {
    return <LoadingSpinner message="Cargando detalles del gato..." />;
  }

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  }

  if (!cat) {
    return <p className="text-center mt-10">No se encontró el gato.</p>;
  }

  return (
    <div>
      <ContainerHeader
        classP="h-[600px] align-bottomw md:pt-15 pt-0"
        childrenLeft={
          <>
            <div className="flex flex-col justify-center gap-1 w-full">
              <div className="flex flex-col align-start">
                <Breadcrumbs>
                  <BreadcrumbItem>
                    <NavLink to="/">Home</NavLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <NavLink to="/cats">Cats</NavLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <span className="text-primary font-bold">{cat.name}</span>
                  </BreadcrumbItem>
                </Breadcrumbs>
              </div>

              <h1 className="text-4xl md:text-5xl mb-4 leading-relaxed border-b-1 border-b-gray-300">
                Hola , soy <span className="font-bold">{cat.name}</span>
              </h1>
              <div className="flex flex-col text-md text-gray-800 gap-2 border-b-1 border-b-gray-300 pb-4">
                <p><span className="font-semibold mr-14">Edad:  </span>  {formatAge(cat.birthDate)} </p>
                <p><span className="font-semibold mr-9">Género:</span> {cat.gender === "FEMALE" ? "Hembra" : cat.gender === "MALE" ? "Macho" : cat.gender || "Desconocido"} </p>
                <p><span className="font-semibold mr-7">Tamaño:</span> {formatSize(cat.size)} </p>
                <p><span className="font-semibold mr-12">Salud: </span> {cat.healthStatus || "Desconocida"} </p>
                <p><span className="font-semibold mr-14">Raza:  </span> {cat.raza || "Desconocida"} </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold mr-2">Ubicación:</span>
                  {cat.latitude && cat.longitude && (
                    <Button size="sm" color="primary" onPress={openGoogleMaps} endContent={<MapPin size={14} />} >
                      Ir a mapa
                    </Button>
                  )}
                </p>
              </div>

              {/* Sección de características */}
              <div className="mt-1">
                <p className="font-semibold mb-2">Yo soy …</p>
                <div className="grid grid-cols-2 gap-2 text-gray-600">
                  {cat.features && cat.features.length > 0 ? (
                    cat.features.map((feature: CatFeatureResponse) => (
                      <div key={feature.id} className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{feature.name}</span>
                      </div>
                    ))
                  ) : (
                    <p>No hay características disponibles.</p>
                  )}
                </div>
              </div>

              <div className="flex gap-10 mt-4">
                <AdoptButton label="Adóptame" />
                <AdoptButton variant="secondary" label="Dona Aquí" />
              </div>
            </div>
          </>
        }
        childrenRight={
          <div className="h-[480px] md:h-[300px] lg:h-[480px] flex justify-center items-center">
            <ImageCarousel images={images} />
          </div>
        }
      />
    </div>
  );
};

export default CatDetail;
