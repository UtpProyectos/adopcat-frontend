import ContainerHeader from "../../../components/Containers/ContainerHeader";
import CatCatalogo from "../../../assets/cats/cat-catalogo.png";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { NavLink, useLocation } from "react-router-dom";
import Alert from "../../../components/Alerts/Alert";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { addToast } from "@heroui/react";
import Footer from "../../../components/Footer";
import { FaCat, FaHome, FaBookOpen, FaQuestionCircle, FaRegListAlt, FaStore, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
  { label: "Gatos", to: "/cats", icon: <FaCat size={32} className="text-primary" />, count: 84 },
  { label: "Refugios", to: "/shelters", icon: <FaHome size={32} className="text-primary" />, count: 12 },
  { label: "Conocimiento", to: "/knowledge", icon: <FaBookOpen size={32} className="text-primary" />, count: 24 },
  { label: "Cómo Adoptar", to: "/adoptar", icon: <FaQuestionCircle size={32} className="text-primary" />, count: 10 },
  { label: "Planes", to: "/planes", icon: <FaRegListAlt size={32} className="text-primary" />, count: 6 },
  { label: "Tienda", to: "/tienda", icon: <FaStore size={32} className="text-primary" />, count: 18 },
];

const catsDestacados = [
  // Ejemplo, reemplaza por tus datos y CatCard
  { id: 1, nombre: "Milo", descripcion: "Cariñoso y juguetón", imagen: "/cat1.jpg" },
  { id: 2, nombre: "Luna", descripcion: "Tranquila y dulce", imagen: "/cat2.jpg" },
  { id: 3, nombre: "Simba", descripcion: "Curioso y activo", imagen: "/cat3.jpg" },
];

const news = [
  {
    id: 1,
    title: "Nueva campaña de adopción",
    date: "24 May,2024",
    description: "Participa en nuestra próxima feria de adopción felina.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReYcBsHazD7D_IMpOaJZneo4Pyitq9vcXoQ0uLnR4fvSQwFQmfEhxvaH4vDHBcYJQzmGA&usqp=CAU",
  },
  {
    id: 2,
    title: "Tips para cuidar a tu gato",
    date: "24 May,2024",
    description: "Consejos prácticos para el bienestar de tu felino.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrrRFRgmRDacaGIY6Vhw7_yA2OvNjtWeW1Dw&s",
  },
  {
    id: 3,
    title: "Historias de adopción",
    date: "24 May,2024",
    description: "Conoce a familias que cambiaron vidas adoptando.",
    img: "https://marketplace.canva.com/EAGJKU8JQ20/1/0/900w/canva-historia-de-instagram-gato-en-adopci%C3%B3n-ilustraci%C3%B3n-celeste-y-amarillo-cTwvr1FMfAs.jpg",
  },
];

// Galería para cards tipo Tinder (agrega aquí URLs de fotos reales de gatos)
const tinderCats = [
  { id: 1, nombre: "Milo", descripcion: "Juguetón y cariñoso", imagen: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg" },
  { id: 2, nombre: "Luna", descripcion: "Tranquila y dulce", imagen: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg" },
  { id: 3, nombre: "Simba", descripcion: "Curioso y activo", imagen: "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg" },
  { id: 4, nombre: "Misha", descripcion: "Aventurera y tierna", imagen: "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg" },
  { id: 5, nombre: "Salem", descripcion: "Inteligente y observador", imagen: "https://images.pexels.com/photos/1276553/pexels-photo-1276553.jpeg" },
  { id: 6, nombre: "Nina", descripcion: "Dormilona y mimosa", imagen: "https://cdnm.westwing.com/image/upload/v1/contenthub/app/uploads/es/2022/12/08162935/nombres-para-gatos-hembra.jpg" },
  { id: 7, nombre: "Toby", descripcion: "Sociable y curioso", imagen: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg" },
];

// Componente de Card tipo Tinder
const TinderCards = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % tinderCats.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + tinderCats.length) % tinderCats.length);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-80 h-96">
        <img
          src={tinderCats[index].imagen}
          alt={tinderCats[index].nombre}
          className="absolute inset-0 w-full h-full rounded-2xl object-cover shadow-lg"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 rounded-b-2xl p-4">
          <h3 className="font-bold text-primary text-xl">{tinderCats[index].nombre}</h3>
          <p className="text-gray-700">{tinderCats[index].descripcion}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <button
          onClick={handlePrev}
          className="bg-primary text-white px-4 py-2 rounded-full shadow hover:bg-primary/80 transition"
          aria-label="Anterior"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="bg-primary text-white px-4 py-2 rounded-full shadow hover:bg-primary/80 transition"
          aria-label="Siguiente"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

// Testimonios de adoptantes
const testimonios = [
  {
    nombre: "María Torres",
    edad: 29,
    distrito: "Miraflores",
    historia: "Adopté a Luna y mi vida cambió. Ahora tengo una compañera fiel y alegre. El proceso fue rápido y el refugio me orientó en todo momento.",
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    nombre: "Carlos Pérez",
    edad: 35,
    distrito: "San Borja",
    historia: "Simba llegó a casa y se adaptó de inmediato. Recomiendo adoptar, es una experiencia única y gratificante.",
    foto: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    nombre: "Lucía Fernández",
    edad: 24,
    distrito: "Surco",
    historia: "Siempre quise ayudar a un gatito. Gracias a AdoCat adopté a Misha y ahora somos inseparables.",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

// Componente de testimonios deslizables con rotación automática y mejores flechas
const TestimoniosSlider = () => {
  const [index, setIndex] = useState(0);

  // Rotación automática cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonios.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonios.length]);

  const handlePrev = () => setIndex((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % testimonios.length);

  const testimonio = testimonios[index];

  return (
    <section className="max-w-4xl mx-auto mt-16 mb-20">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg p-8 gap-8 relative overflow-hidden transition-all duration-500">
        {/* Imagen con fondo decorativo */}
        <div className="flex-shrink-0 relative">
          <div className="absolute -top-4 -left-4 w-48 h-48 bg-gradient-to-tr from-orange-400 to-yellow-300 rounded-full opacity-60 z-0"></div>
          <img
            src={testimonio.foto}
            alt={testimonio.nombre}
            className="w-40 h-40 object-cover rounded-full border-8 border-white shadow-lg relative z-10"
          />
        </div>
        {/* Texto */}
        <div className="flex-1 z-10">
          <span className="text-primary font-semibold text-sm mb-1 block">Testimonios</span>
          <h2 className="text-2xl font-bold mb-2">¿Qué dicen nuestros adoptantes?</h2>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>
          <p className="italic text-gray-700 mb-4">{testimonio.historia}</p>
          <div className="font-bold">{testimonio.nombre}</div>
          <div className="text-sm text-gray-500">
            {testimonio.edad} años, {testimonio.distrito}
          </div>
        </div>
        {/* Controles */}
        <div className="absolute bottom-6 right-8 flex gap-3">
          <button
            onClick={handlePrev}
            className="bg-white border-2 border-primary text-primary w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-primary hover:text-white transition text-xl"
            aria-label="Anterior"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white border-2 border-primary text-primary w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-primary hover:text-white transition text-xl"
            aria-label="Siguiente"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.toast) {
      addToast(location.state.toast);
      window.history.replaceState({}, ""); // limpia el estado después
    }
  }, [location.state]);

  const { user } = useAuth();

  return (
    <div className="bg-[#fafbfc]">
      {/* Banner principal */}
      <ContainerHeader
        classP="h-[500px] md:h-[600px] align-bottomw"
        childrenLeft={
          <div className="flex flex-col justify-center">
            <Breadcrumbs>
              <BreadcrumbItem>
                <NavLink to="/">
                  <span className="text-primary font-bold">Home</span>
                </NavLink>
              </BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Un hogar para cada gato
              <br />
              <span className="text-primary">¡Adopta, ayuda, comparte!</span>
            </h1>
            <p className="text-lg text-gray-500 mb-6">
              Descubre gatos en adopción, conoce refugios y únete a la comunidad felina de Lima.
            </p>
            <NavLink
              to="/cats"
              className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-full shadow hover:bg-primary/90 transition"
            >
              Ver gatos en adopción
            </NavLink>
          </div>
        }
        childrenRight={
          <img
            src={CatCatalogo}
            alt="Gato en adopción"
            className="w-[180px] md:w-[340px] lg:w-[500px] h-auto object-contain"
          />
        }
      />

      {/* Alerta de verificación */}
      <section>
        {user?.verified === false && (
          <Alert
            title="Tu perfil aún no está verificado"
            description="Para poder adoptar gatos o participar en eventos oficiales de AdoCat, primero verifica tu identidad."
            buttonText="Verificar perfil"
            redirectTo="/perfil"
          />
        )}
      </section>

      {/* Browse by category */}
      <section className="max-w-6xl mx-auto mt-12">
        <h1 className="text-2xl font-bold mb-6">Explora por categoría</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <NavLink
              to={cat.to}
              key={cat.label}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:bg-primary/10 transition"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                {cat.icon}
              </div>
              <span className="font-bold text-primary">{cat.label}</span>
              <span className="text-xs text-gray-500">{cat.count} recursos</span>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Featured cats */}
      <section className="max-w-6xl mx-auto mt-16">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
          <span role="img" aria-label="paw">🐾</span>
          Gatos destacados
          <span role="img" aria-label="paw">🐾</span>
        </h1>
        <div className="flex justify-center">
          <TinderCards />
        </div>
      </section>

      {/* Sección informativa/CTA */}
      <section className="max-w-6xl mx-auto mt-16 flex flex-col md:flex-row items-center bg-white rounded-xl shadow p-8 gap-8">
        <img
          src="https://us.123rf.com/450wm/kongvector/kongvector1704/kongvector170401650/77073558-thinking-cat-character-style-collection.jpg" // Gato animado pensando
          alt="Gato animado pensando"
          className="w-40 md:w-64 h-auto object-contain"
        />
        <div>
          <span className="text-primary font-semibold">AdoCat</span>
          <h3 className="text-2xl font-bold mb-2 mt-2">La mejor manera de adoptar o ayudar</h3>
          <p className="text-gray-600 mb-4">
            Únete a nuestra comunidad, aprende sobre tenencia responsable y ayuda a cientos de gatos a encontrar un hogar.
          </p>
          <NavLink
            to="/adoptar"
            className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-full shadow hover:bg-primary/90 transition"
          >
            Cómo adoptar
          </NavLink>
        </div>
      </section>

      {/* Testimonios */}
      <TestimoniosSlider />

      {/* Equipo AdoCat */}
      <section className="max-w-6xl mx-auto mt-20 mb-20">
        {/* Founder */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <img
            src="https://media.istockphoto.com/id/1332100919/es/vector/icono-de-hombre-icono-negro-s%C3%ADmbolo-de-persona.jpg?s=612x612&w=0&k=20&c=zf8iV9whu1NbDpw0H9A043wWjqyhPFP5m6CuesrBVFk="
            alt="Juan Lozada"
            className="w-56 h-56 object-cover rounded-2xl shadow-lg"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-1">Juan Lozada</h2>
            <div className="text-gray-500 text-sm mb-3">Fundador</div>
            <p className="text-gray-700 mb-2">
Juan Lozada creó esta plataforma digital tras identificar la necesidad de conectar eficientemente gatos abandonados con familias adoptivas. Su sistema optimiza el proceso de adopción, reduciendo tiempos y mejorando resultados para refugios.            </p>
            <p className="text-gray-700 mb-4">
              
            </p>
            <div className="mt-4">
              <img
                src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs3/264062995/original/88b9161a127fb85aeadf298b941da86f93c9f6e9/design-professional-signature-with-practice-video.jpg"
                alt="Firma Juan Lozada"
                className="h-10"
              />
            </div>
          </div>
        </div>

        {/* Team */}
        <h3 className="text-2xl font-bold text-center mb-8">Nuestro Equipo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {/* Victor Leon */}
          <div className="bg-orange-200 rounded-2xl shadow-lg p-4 flex flex-col items-center w-full max-w-xs">
            <img
              src="https://media.istockphoto.com/id/1332100919/es/vector/icono-de-hombre-icono-negro-s%C3%ADmbolo-de-persona.jpg?s=612x612&w=0&k=20&c=zf8iV9whu1NbDpw0H9A043wWjqyhPFP5m6CuesrBVFk="
              alt="Victor Leon"
              className="w-36 h-36 object-cover rounded-xl mb-4"
            />
            <div className="font-bold text-lg text-gray-900">Victor Leon</div>
            <div className="text-gray-600">Equipo</div>
          </div>
          {/* Mario Ivan */}
          <div className="bg-orange-200 rounded-2xl shadow-lg p-4 flex flex-col items-center w-full max-w-xs">
            <img
              src="https://media.istockphoto.com/id/1332100919/es/vector/icono-de-hombre-icono-negro-s%C3%ADmbolo-de-persona.jpg?s=612x612&w=0&k=20&c=zf8iV9whu1NbDpw0H9A043wWjqyhPFP5m6CuesrBVFk="
              alt="Mario Ivan"
              className="w-36 h-36 object-cover rounded-xl mb-4"
            />
            <div className="font-bold text-lg text-gray-900">Mario Ivan</div>
            <div className="text-gray-600">Equipo</div>
          </div>
          {/* Valeri Dona */}
          <div className="bg-orange-200 rounded-2xl shadow-lg p-4 flex flex-col items-center w-full max-w-xs">
            <img
              src="https://media.istockphoto.com/id/1332100919/es/vector/icono-de-hombre-icono-negro-s%C3%ADmbolo-de-persona.jpg?s=612x612&w=0&k=20&c=zf8iV9whu1NbDpw0H9A043wWjqyhPFP5m6CuesrBVFk="
              alt="Valeria Dona"
              className="w-36 h-36 object-cover rounded-xl mb-4"
            />
            <div className="font-bold text-lg text-gray-900">Valeria Dona</div>
            <div className="text-gray-600">Equipo</div>
          </div>
        </div>
      </section>

      {/* Noticias & Blog */}
      <section className="max-w-6xl mx-auto mt-16 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Noticias & Blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
              <div className="relative">
                <img src={item.img} alt={item.title} className="rounded-lg w-full h-32 object-cover mb-2" />
                <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">News</span>
              </div>
              <div className="text-xs text-gray-400 mb-1">{item.date}</div>
              <div className="font-bold mb-2">{item.title}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
            </div>
          ))}
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Home;
