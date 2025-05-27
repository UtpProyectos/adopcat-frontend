import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import iconAdocat from '../../assets/icons/icon-adocat.png'
import iconAdocatDark from '../../assets/icons/icon-adocat-dark.png'
import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../context/AuthContext"
import { Menu, X } from "lucide-react"
import AdoptButton from "../Buttons/AdoptButton"
import ThemeButton from "../Buttons/ThemeButton"

const links = [
  { name: "Home", href: "/" },
  { name: "Cats", href: "/cats" },
  { name: "Refugios", href: "/shelters" },
  { name: "Conocimiento", href: "/knowledge" },
  { name: "Como adoptar", href: "/adoption-process" },
  { name: "Planes", href: "/plans" },
  { name: "Tienda", href: "/store" },
  { name: "FAQ", href: "/faq" },
]

const NavbarPublic = () => {
  const { theme } = useTheme()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50 || currentScrollY < lastScrollY) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  return (
    // <header className="fixed top-0 left-0 w-full z-50 pt-5">
    <header
      className={`fixed top-0 left-0 w-full z-50 pt-5 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
    >

      <div className="container mx-auto py-6 px-10 flex items-center justify-between bg-body dark:bg-dark rounded-4xl shadow-primary dark:shadow-2xl   ">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={theme === 'dark' ? iconAdocatDark : iconAdocat}
              alt="AdoCat"
              className="w-8 h-8"
            />
            <span className="font-bold text-sm lg:text-lg">AdoCat</span>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center  gap-3 lg:gap-6 relative">
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
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <AdoptButton
            label={user?.role?.toUpperCase?.() === 'ROLE_ADMIN' ? "Ir a Admin" : "Dona Aquí"}
            variant="secondary"
            className="text-xs lg:text-sm"
            onPress={() => {
              if (user?.role?.toUpperCase?.() === 'ROLE_ADMIN') {
                window.location.href = "/admin/dashboard"
              } else {
                alert("Redirigir a donación")
              }
            }}
          />


          <ThemeButton />
          {user ? (
            <div className="relative group">
              <img
                src={
                  user.profilePhoto
                    ? user.profilePhoto
                    : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=0D8ABC&color=fff`
                }
                alt="Perfil"
                className="w-9 h-9 rounded-full object-cover cursor-pointer"
              />

              <div className="absolute right-[-4px] w-40 bg-white dark:bg-dark shadow-md rounded-lg p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                <NavLink to="/profile" className="block px-3 py-2 hover:text-primary">
                  Ver perfil
                </NavLink>
                <button
                  onClick={logout}
                  className="block px-3 py-2 text-left w-full hover:text-red-500"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                state={{ register: true }}
                className="hover:text-primary font-medium text-sm lg:text-lg" >
                Sign up
              </NavLink>

              <NavLink
                to="/login"
                state={{ register: false }}
                className="hover:text-primary font-medium text-sm lg:text-lg"   >
                Login
              </NavLink>

            </>
          )}
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
          <motion.div
            key="sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-screen w-full max-w-xs bg-body dark:bg-dark z-50 shadow-2xl px-6 py-8 rounded-l-3xl overflow-y-auto"
          >
            {/* Header Sidebar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <img
                  src={theme === 'dark' ? iconAdocatDark : iconAdocat}
                  alt="AdoCat"
                  className="w-8 h-8"
                />
                <span className="font-bold text-lg">AdoCat</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black dark:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Enlaces navegación */}
            <nav className="flex flex-col gap-4">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold text-lg"
                      : "text-black dark:text-white font-medium text-lg hover:text-primary"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Botones y usuario */}
            <div className="mt-6 flex flex-col gap-3">
              <AdoptButton label="Dona Aquí" variant="secondary" />
              <ThemeButton />
              {user ? (
                <>
                  <NavLink
                    to="/perfil"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary font-medium text-lg"
                  >
                    Ver perfil
                  </NavLink>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="text-left hover:text-red-500 font-medium text-lg"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    state={{ register: true }}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary font-medium text-lg"
                  >
                    Sign up
                  </NavLink>
                  <NavLink
                    to="/login"
                    state={{ register: false }}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-primary font-medium text-lg"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  )
}

export default NavbarPublic
