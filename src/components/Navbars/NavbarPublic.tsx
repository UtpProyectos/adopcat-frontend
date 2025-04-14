import { Link } from "react-router-dom"

const NavbarPublic = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o Nombre */}
        <Link to="/" className="text-xl font-bold text-gray-700">
          ADOCAT
        </Link>

        {/* Menú */}
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-900 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavbarPublic
