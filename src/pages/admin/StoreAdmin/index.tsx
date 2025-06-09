import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

const StoreAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 px-4 md:px-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
          Administración de la Tienda
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Registra y gestiona los productos disponibles en la tienda virtual de Adocat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Formulario para crear productos */}
        <div className="bg-white shadow-lg border border-orange-100 rounded-xl p-6">
          <h2 className="text-xl font-bold text-orange-600 mb-4">
            Registrar nuevo producto
          </h2>
          <ProductForm />
        </div>

        {/* Tabla de productos */}
        <div className="bg-white shadow-lg border border-orange-100 rounded-xl p-6">
          <h2 className="text-xl font-bold text-orange-600 mb-4">
            Productos registrados
          </h2>
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default StoreAdmin;
