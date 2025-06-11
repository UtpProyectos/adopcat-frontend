import { useCartStore } from "../../store/useCartStore";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { items, removeFromCart, total } = useCartStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Botón flotante para abrir */}
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        onClick={() => setOpen(!open)}
      >
        🛒
      </button>

      {/* Sidebar */}
      {open && (
        <div className="absolute top-14 right-0 w-80 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Carrito</h3>
            <button onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Tu carrito está vacío.</p>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.productId}
                  className="flex justify-between items-center text-sm border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-500">x{quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-500 font-bold">
                      S/. {((product.price - (product.price * product.discountPct) / 100) * quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(product.productId)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t">
                <p className="font-semibold text-right">
                  Total: <span className="text-orange-600">S/. {total().toFixed(2)}</span>
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <Link
                  to="/carrito"
                  className="bg-gray-200 hover:bg-gray-300 text-center py-2 rounded-md"
                >
                  Ver Carrito
                </Link>
                <Link
                  to="/checkout"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-center py-2 rounded-md"
                >
                  Ir al Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
