import AdoptButton from "../Buttons/AdoptButton"
import { FaMapMarkerAlt, FaMars, FaBirthdayCake } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

type CatCardProps = {
  id: string
  name: string
  imageUrl: string
  location: string
  gender: string
  age: string
}


const CatCard = ({ id, name, imageUrl, location, gender, age }: CatCardProps) => {
  const navigate = useNavigate()

  return (
    <div className="bg-body  dark:bg-dark  shadow-primary overflow-hidden max-w-[300px] rounded-4xl">
      {/* Imagen */}
      <img
        src={imageUrl}
        alt={`Foto de ${name}`}
        className="w-full h-[310px] object-cover"
      />

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between text-gray-500 text-xs mb-2">
          <div className="flex items-center gap-1 ">
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

        {/* Nombre + Botón */}
        <div className="flex items-center justify-between py-2">
          <span className="font-semibold text-lg">{name}</span>
          <AdoptButton onClick={() => navigate(`/cats/${id}`)} />
        </div>
      </div>
    </div>
  )
}

export default CatCard
