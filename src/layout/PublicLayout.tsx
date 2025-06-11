 
import { Outlet } from "react-router-dom"
import NavbarPublic from "../components/Navbars/NavbarPublic"
import Footer from "@/components/Footer"

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <NavbarPublic />

      <main className="flex-1 ">
        <Outlet /> {/* Aquí carga Home, Login, Registro, etc */}
      </main>

       <Footer />
    </div>
  )
}

export default PublicLayout
