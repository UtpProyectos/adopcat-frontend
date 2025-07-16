import { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/productService";
import { Product } from "../../../models/product";
import { Card } from "../../../components/Cards/Card";
import AdoptButton from "../../../components/Buttons/AdoptButton";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import StoreHeader from "../../../components/Containers/StoreHeader";
import catTienda from "../../../assets/cats/cat-tienda.png";
import CartSidebar from "../../../components/Cart/CartSidebar";
import { useCartStore } from "../../../store/useCartStore";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useAuth();
  const { items, addToCart } = useCartStore();

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-gray-900 dark:text-white">
      {/* Header */}
      <StoreHeader
        title="Explora nuestra tienda solidaria"
        subtitle="Apoya a los refugios comprando productos que ayudan a gatos en adopción."
        imageRight={
          <img
            src={catTienda}
            alt="Gato tienda"
            className="w-64 h-auto object-contain"
          />
        }
      />

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-2 uppercase">Categorías</h3>
            <ul className="text-sm space-y-1">
              <li><Link to="/categorias/squeaky" className="hover:text-orange-600 font-medium">Squeaky</Link></li>
              <li><Link to="/categorias/alimento" className="hover:text-orange-600 font-medium">Alimento</Link></li>
              <li><Link to="/categorias/accesorios" className="hover:text-orange-600 font-medium">Accesorios</Link></li>
              <li><Link to="/categorias/casa" className="hover:text-orange-600 font-medium">Casa y Refugio</Link></li>
              <li><Link to="/categorias/higiene" className="hover:text-orange-600 font-medium">Salud e Higiene</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-2 uppercase">Marcas</h3>
            <ul className="text-sm space-y-1">
              <li><Link to="/marcas/adopbrand" className="hover:text-orange-600 font-medium">AdopBrand</Link></li>
              <li><Link to="/marcas/gatotop" className="hover:text-orange-600 font-medium">GatoTop</Link></li>
              <li><Link to="/marcas/felinex" className="hover:text-orange-600 font-medium">Felinex</Link></li>
            </ul>
          </div>
        </aside>

        {/* Productos */}
        <main className="w-full lg:w-3/4">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            🛒 Tienda en línea
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <p className="text-sm text-gray-600">Cargando productos...</p>
            ) : (
              products.map((product) => {
                const finalPrice = product.price - (product.price * product.discountPct) / 100;
                const isInCart = items.some(item => item.product.productId === product.productId);

                return (
                  <button
                    key={product.productId}
                    onClick={() => !isInCart && addToCart(product)}
                    className="text-left"
                  >
                    <Card className="group flex flex-col items-center p-4 border-2 border-gray-200 hover:border-orange-400 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#1f1f1f]">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="mt-4 text-center space-y-2">
                        <p className="text-[12px] font-semibold uppercase text-orange-400 tracking-wide">
                          {product.categoryName}
                        </p>
                        <h3 className="font-bold text-base text-gray-800 dark:text-white">
                          {product.name}
                        </h3>
                        <p className="text-lg text-orange-600 font-bold">
                          S/. {finalPrice.toFixed(2)}
                        </p>

                        {user?.role === "ROLE_ADOPTANTE" && (
                          isInCart ? (
                            <AdoptButton
                              label="✅ Añadido"
                              disabled
                              fullWidth
                              variant="secondary"
                              className="mt-2"
                            />
                          ) : (
                            <AdoptButton
                              label="ADD +"
                              fullWidth
                              variant="primary"
                              className="mt-2"
                            />
                          )
                        )}
                      </div>
                    </Card>
                  </button>
                );
              })
            )}
          </div>
        </main>
      </div>

      {/* Carrito flotante */}
      <CartSidebar />
    </div>
  );
};

export default Catalog;
