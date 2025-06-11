import { useCartStore } from "../../../store/useCartStore";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const CartPage = () => {
  const { items, removeFromCart, total, clearCart } = useCartStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-[#1a1a1a] dark:to-[#121212] px-6 py-10 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold mb-8 text-orange-600 flex items-center gap-2">
          🧺 Tu carrito de compras
        </h1>

        {items.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío. <Link to="/tienda" className="text-orange-500 underline">Ir a la tienda</Link></p>
        ) : (
          <div className="space-y-6">
            {items.map(({ product, quantity }) => {
              const finalPrice = product.price - (product.price * product.discountPct) / 100;

              return (
                <div key={product.productId} className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center gap-4">
                    <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md border" />
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800 dark:text-white">{product.name}</h2>
                      <p className="text-sm text-gray-500">Cantidad: {quantity}</p>
                      <p className="text-sm text-gray-500">Precio unitario: S/. {finalPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-orange-600 font-bold text-lg">S/. {(finalPrice * quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(product.productId)}
                      className="text-sm text-red-500 hover:underline flex items-center gap-1 mt-1"
                    >
                      <X size={16} /> Eliminar
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="border-t pt-4 flex justify-between items-center">
              <p className="text-xl font-bold">Total: <span className="text-orange-600">S/. {total().toFixed(2)}</span></p>
              <button
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-red-500 underline"
              >
                Vaciar carrito
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <Link to="/checkout" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
                Continuar al Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
