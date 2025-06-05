import { useEffect, useState } from 'react';
import axios from 'axios';
import ContainerHeader from '../../../components/Containers/ContainerHeader';
import CatHeader from '../../../assets/cats/cat-catalogo.png';
import { useNavigate } from 'react-router-dom';

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  discountPct: number;
  imageUrl: string;
  isActive: boolean;
  categoryId: string;
  supplierId: string;
  createdAt: string;
}

const ProductTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error al cargar productos', err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('¿Deseas eliminar este producto?');
    if (!confirm) return;
    try {
      await axios.delete(`/api/products/${id}`);
      await loadProducts();
    } catch (err) {
      console.error('Error al eliminar producto', err);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ContainerHeader
        classP="h-[500px] md:h-[480px] xl:h-[440px] items-center"
        childrenLeft={
          <div className="pt-20">
            <h1 className="text-4xl font-bold text-orange-600 mb-4">
              Administración de Productos
            </h1>
            <p className="text-gray-600 text-lg">
              Gestiona todos los productos que aparecerán en la tienda.
            </p>
          </div>
        }
        childrenRight={
          <img
            src={CatHeader}
            alt="Productos gato"
            className="w-[300px] h-auto object-contain drop-shadow-md"
          />
        }
      />

      <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate('/admin')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            ⬅️ Volver al Panel Principal
          </button>

          <input
            type="text"
            placeholder="🔍 Buscar producto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-orange-500 w-1/2"
          />
        </div>

        <table className="w-full border border-gray-200 mt-4">
          <thead className="bg-orange-50 text-left">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Descuento</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Proveedor</th>
              <th className="px-4 py-2">Activo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  No hay productos registrados.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.productId} className="border-t">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">S/ {product.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{product.discountPct}%</td>
                  <td className="px-4 py-2">{product.categoryId}</td>
                  <td className="px-4 py-2">{product.supplierId}</td>
                  <td className="px-4 py-2">
                    {product.isActive ? 'Sí' : 'No'}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => navigate(`/admin/tienda/editar/${product.productId}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(product.productId)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ProductTable;

