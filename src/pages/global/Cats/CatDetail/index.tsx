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
            })
            .catch(err => {
                setError(err?.response?.data?.message || "Error cargando detalles del gato");
            })
            .finally(() => setLoading(false));
    }, [id]);

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
                classP="h-[600px] align-bottomw pt-15"
                childrenLeft={
                    <>
                        <div className="flex flex-col justify-center gap-5">
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

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-relaxed">
                                {cat.name}
                            </h1>
                            <p className="text-lg text-gray-500">
                                Edad: {formatAge(cat.birthDate)} <br />
                                Género: {cat.gender === "FEMALE" ? "Hembra" : cat.gender === "MALE" ? "Macho" : cat.gender || "Desconocido"} <br />
                                Tamaño: {cat.size || "Desconocido"} <br />
                                Salud: {cat.healthStatus || "Desconocida"} <br />
                                Raza: {cat.raza || "Desconocida"} <br />
                                <span className="flex items-center gap-2">
                                    Ubicación:  {cat.latitude && cat.longitude && (
                                        <Button size="sm" color="primary" onPress={openGoogleMaps} endContent={<MapPin  size={14}/>} > 
                                            Ir a mapa
                                        </Button>
                                    )}
                                </span>

                            </p>

                            <div className="flex gap-10 mt-4">
                                <AdoptButton label="Adóptame" />
                                <AdoptButton variant="secondary" label="Dona Aquí" />
                            </div>
                        </div>
                    </>
                }
                childrenRight={
                    <img
                        src={cat.mainImageUrl || CatCatalogoOption}
                        alt={`Foto de ${cat.name}`}
                        className="h-[300px] w-[180px] md:w-[300px] lg:w-[330px]  object-contain"
                    />
                }
            />
        </div>
    );
};

export default CatDetail;
