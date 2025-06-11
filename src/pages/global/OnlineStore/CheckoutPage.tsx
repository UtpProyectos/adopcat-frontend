import { useCartStore } from "../../../store/useCartStore";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { items, total } = useCartStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-[#1a1a1a] dark:to-[#121212] px-6 py-10 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold mb-8 text-orange-600">Checkout 🧾</h1>

        {items.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío. <Link to="/tienda" className="text-orange-500 underline">Volver a la tienda</Link></p>
        ) : (
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre completo</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-dark text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                <input type="email" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-dark text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-dark text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dirección de envío</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-dark text-sm" required />
              </div>
            </div>

            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Resumen del pedido</h2>
              <ul className="text-sm space-y-1">
                {items.map(({ product, quantity }) => {
                  const price = product.price - (product.price * product.discountPct) / 100;
                  return (
                    <li key={product.productId} className="flex justify-between">
                      <span>{product.name} x{quantity}</span>
                      <span>S/. {(price * quantity).toFixed(2)}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="text-right mt-4 text-lg font-bold">
                Total: <span className="text-orange-600">S/. {total().toFixed(2)}</span>
              </p>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-md">
                Confirmar y pagar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
