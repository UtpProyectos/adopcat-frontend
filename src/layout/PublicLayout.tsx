 
import { Outlet } from "react-router-dom"
import NavbarPublic from "../components/Navbars/NavbarPublic"

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarPublic />

      <main className="flex-1">
        <Outlet /> {/* Aquí carga Home, Login, Registro, etc */}
      </main>

      <footer className="text-center py-4 text-gray-400 text-sm">
        © 2025 ADOCAT. Todos los derechos reservados.
      </footer>
    </div>
  )
}

export default PublicLayout
