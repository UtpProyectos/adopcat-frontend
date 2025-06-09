import ProductList from "./ProductList";
import VerificationAlert from "../../../components/Alerts/Alert";

const OnlineStore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white pt-32 px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white rounded-xl shadow p-6 border border-orange-100">
          <h2 className="text-xl font-bold text-orange-600 mb-4">Categorías</h2>
          <ul className="space-y-2 text-gray-600 text-sm font-medium">
            <li className="hover:text-orange-500 transition-all cursor-pointer">Squeaky</li>
            <li className="hover:text-orange-500 transition-all cursor-pointer">Alimento</li>
            <li className="hover:text-orange-500 transition-all cursor-pointer">Accesorios</li>
            <li className="hover:text-orange-500 transition-all cursor-pointer">Casa y Refugio</li>
            <li className="hover:text-orange-500 transition-all cursor-pointer">Salud e Higiene</li>
          </ul>

          <h2 className="text-xl font-bold text-orange-600 mt-8 mb-2">Marcas</h2>
          <ul className="text-gray-600 text-sm font-medium space-y-2">
            <li className="hover:text-orange-500 transition-all cursor-pointer">AdopBrand</li>
            <li className="hover:text-orange-500 transition-all cursor-pointer">GatoTop</li>
            <li className="hover:text-orange-500 transition-all cursor-pointer">Felinex</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3 bg-white rounded-xl shadow p-6 border border-orange-100">
          <VerificationAlert />

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-orange-600">Tienda en línea</h1>
            <input
              type="text"
              placeholder="Buscar productos..."
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-60 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <ProductList />
        </main>
      </div>
    </div>
  );
};

export default OnlineStore;
