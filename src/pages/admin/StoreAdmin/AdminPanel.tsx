import { useNavigate } from 'react-router-dom';
import ContainerHeader from '../../../components/Containers/ContainerHeader'; // Ajusta la ruta según tu estructura
import CatHeader from '../../../assets/cats/cat-catalogo.png'; // Imagen decorativa opcional

const AdminPanel = () => {
  const navigate = useNavigate();

  const options = [
    {
      label: '📦 Gestionar Productos',
      description: 'Registrar, editar o eliminar productos disponibles en tienda.',
      path: '/admin/tienda',
      color: 'bg-orange-100',
    },
    {
      label: '📂 Crear Categorías',
      description: 'Agregar nuevas categorías para organizar productos.',
      path: '/admin/categorias',
      color: 'bg-yellow-100',
    },
    {
      label: '🚚 Crear Proveedores',
      description: 'Registrar proveedores que suministran los productos.',
      path: '/admin/proveedores',
      color: 'bg-green-100',
    },
  ];

  return (
    <>
      {/* Encabezado con estilo */}
      <ContainerHeader
        classP="h-[500px] md:h-[480px] xl:h-[440px] items-center"
        childrenLeft={
          <div className="pt-20">
            <h1 className="text-4xl font-bold text-orange-600 mb-4">
              Administración de la Tienda
            </h1>
            <p className="text-gray-600 text-lg">
              Elige una sección para registrar o gestionar productos, categorías y proveedores.
            </p>
          </div>
        }
        childrenRight={
          <img
            src={CatHeader}
            alt="Gato administrador"
            className="w-[300px] h-auto object-contain drop-shadow-md"
          />
        }
      />

      {/* Opciones de administración */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {options.map((opt) => (
            <div
              key={opt.path}
              onClick={() => navigate(opt.path)}
              className={`cursor-pointer border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition transform hover:scale-[1.02] ${opt.color}`}
            >
              <h2 className="text-lg font-semibold mb-2">{opt.label}</h2>
              <p className="text-sm text-gray-600">{opt.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AdminPanel;
