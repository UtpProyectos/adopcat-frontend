import { useEffect, useState } from 'react';
import axios from 'axios';
import ContainerHeader from '../../../components/Containers/ContainerHeader';
import CatHeader from '@/assets/cats/cat-catalogo.png';

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-10">
      <ContainerHeader
        classP="h-[580px]"
        childrenLeft={
          <div className="pt-14">
            <h1 className="text-4xl font-bold text-orange-600">
              Catálogo de Productos
            </h1>
            <p className="text-lg text-gray-600 mt-2 max-w-xl">
              Explora todos los productos solidarios para tu gato.
            </p>
          </div>
        }
        childrenRight={<img src={CatHeader} className="w-[480px]" />}
      />

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-4 py-2 w-full max-w-md rounded shadow-sm"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos para mostrar.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(product => (
              <div
                key={product.productId}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/300x200'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h2 className="font-semibold text-lg text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {product.description}
                </p>
                <p className="mt-1 text-orange-600 font-bold">
                  S/ {product.price.toFixed(2)}
                </p>
                {product.discountPct > 0 && (
                  <p className="text-xs text-green-600">
                    Descuento: {product.discountPct}%
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
