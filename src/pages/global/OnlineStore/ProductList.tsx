import { useEffect, useState } from 'react';
import { getAllProducts } from '../../../../src/services/productService';
import { Product } from '../../../models/product';

import ContainerHeader from '../../../components/Containers/ContainerHeader';
import { Breadcrumbs, BreadcrumbItem } from '@heroui/breadcrumbs';
import { NavLink } from 'react-router-dom';
import CatCatalogo from '../../../assets/cats/cat-catalogo.png'; 


const ProductList = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    getAllProducts()
      .then(data => {
        console.log('📦 Productos:', data);
        setProducts(data);
      })
      .catch(error => {
        console.error('❌ Error al obtener productos:', error);
        setProducts([]);
      });
  }, []);

  return (
    <div>
      <ContainerHeader
        classP="h-[600px] align-bottomw"
        childrenLeft={
          <div className="flex flex-col justify-center">
            <Breadcrumbs>
              <BreadcrumbItem>
                <NavLink to="/">
                  <span className="text-primary font-bold">Home</span>
                </NavLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <span className="text-primary">Tienda</span>
              </BreadcrumbItem>
            </Breadcrumbs>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-relaxed pt-12">
              Explora nuestra tienda solidaria
            </h1>
            <p className="text-lg text-gray-500">
              Apoya a los refugios comprando productos<br />que ayudan a gatos en adopción.
            </p>
          </div>
        }
        childrenRight={
          <img
            src={CatCatalogo}
            alt="Gato en adopción"
            className="w-[180px] md:w-[300px] lg:w-[500px] h-auto object-contain"
          />
        }
      />

      <section className="p-6">

        <h2 className="text-2xl font-bold mb-4">Tienda en línea</h2>

        {!Array.isArray(products) ? (
          <p className="text-gray-600">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600">No hay productos disponibles aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div
                key={product.productId}
                className="shadow-md border border-gray-200 rounded-xl p-4 hover:shadow-lg"
              >
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/300x200'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
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
      </section>
    </div>
  );
};

export default ProductList;
