import { Link } from "react-router-dom";

const GraciasPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white dark:from-[#1a1a1a] dark:to-[#121212] px-4 py-20 text-center text-gray-800 dark:text-white">
      <div className="max-w-xl bg-white dark:bg-[#1f1f1f] p-10 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-orange-600 mb-4">¡Gracias por tu compra! 🧡</h1>
        <p className="text-lg mb-6">
          Hemos recibido tu pedido correctamente. Te enviaremos una confirmación por correo y nos pondremos en contacto para coordinar el envío.
        </p>
        <Link
          to="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default GraciasPage;
