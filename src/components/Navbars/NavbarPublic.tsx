import { useState } from "react"
import { NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import iconAdocat from '../../assets/icons/icon-adocat.png'
import iconAdocatDark from '../../assets/icons/icon-adocat-dark.png'
import { useTheme } from "../../context/ThemeContext"
import { Menu, X } from "lucide-react"

const links = [
  { name: "Home", href: "/" },
  { name: "Cats", href: "/cats" },
  { name: "Proceso Adopción", href: "/proceso-adopcion" },
  { name: "Planes", href: "/planes" },
  { name: "FAQ", href: "/faq" },
]

const NavbarPublic = () => {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-5">
      <div className="container mx-auto py-6 px-10 flex items-center justify-between bg-body dark:bg-dark rounded-4xl shadow-primary">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={theme === 'dark' ? iconAdocatDark : iconAdocat}
            alt="AdoCat"
            className="w-8 h-8"
          />
          <span className="font-bold text-lg">AdoCat</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                isActive
                  ? "text-primary relative font-bold text-sm lg:text-lg"
                  : "text-black relative font-medium dark:text-white text-sm lg:text-lg hover:text-primary"
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 right-0 mx-auto h-[2px] bg-primary bottom-0"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Botones Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/register" className="hover:text-primary font-medium text-sm lg:text-lg">
            Sign up
          </NavLink>
          <NavLink to="/login" className="hover:text-primary font-medium text-sm lg:text-lg">
            Login
          </NavLink>
        </div>

        {/* Botón Hamburguesa */}
        <button
          className="md:hidden text-black dark:text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar móvil con framer-motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-xs bg-body dark:bg-dark z-50 shadow-2xl px-6 py-8 rounded-l-3xl"
          >
            {/* Botón X para cerrar */}

            <div className="relative flex items-center justify-between mb-8">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <img
                  src={theme === 'dark' ? iconAdocatDark : iconAdocat}
                  alt="AdoCat"
                  className="w-8 h-8"
                />
                <span className="font-bold text-lg">AdoCat</span>
              </div>

              {/* Botón cerrar */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-black dark:text-white cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>


            <div className="flex flex-col gap-6 mt-10">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold text-lg "
                      : "text-black font-medium dark:text-white text-lg hover:text-primary"
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="mt-6 flex flex-col gap-3">
                <NavLink to="/register" className="hover:text-primary font-medium text-lg">
                  Sign up
                </NavLink>
                <NavLink to="/login" className="hover:text-primary font-medium text-lg">
                  Login
                </NavLink>
              </div>
            </div>
          </motion.aside>

        )}
      </AnimatePresence>
    </header>
  )
}

export default NavbarPublic
