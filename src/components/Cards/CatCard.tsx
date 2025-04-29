import AdoptButton from "../Buttons/AdoptButton";
import { FaMapMarkerAlt, FaMars, FaBirthdayCake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@heroui/react";

type CatCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  location: string;
  gender: string;
  age: string;
};

const CatCard = ({ id, name, imageUrl, location, gender, age }: CatCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="max-w-[300px] rounded-4xl overflow-hidden bg-body dark:bg-dark">
      {/* Imagen */}
      <CardBody className="p-0">
        <Image
          removeWrapper
          src={imageUrl}
          alt={`Foto de ${name}`}
          className="w-full h-[310px] object-cover"
        />
      </CardBody>

      {/* Información */}
      <CardHeader className="flex flex-col items-start px-4 pt-2 pb-0">
        <div className="flex items-center justify-between text-gray-500 text-xs w-full mb-2">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-gray-400" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <FaMars className="text-gray-400" />
            {gender}
          </div>
          <div className="flex items-center gap-1">
            <FaBirthdayCake className="text-gray-400" />
            {age}
          </div>
        </div>
      </CardHeader>

      {/* Nombre + Botón */}
      <CardFooter className="flex items-center justify-between py-2 pb-6 px-4">
        <span className="font-semibold text-lg">{name}</span>
        <AdoptButton onPress={() => navigate(`/cats/${id}`)} />
      </CardFooter>
    </Card>
  );
};

export default CatCard;
