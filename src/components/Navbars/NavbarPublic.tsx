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
  { name: "Proceso Adopción", href: "/proceso-adopcion" },
  { name: "Planes", href: "/planes" },
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
        <div className="hidden md:flex items-center gap-6">
          <AdoptButton label="Dona Aquí" variant="secondary" />
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
                <NavLink to="/perfil" className="block px-3 py-2 hover:text-primary">
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
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[80%] max-w-xs bg-body dark:bg-dark z-50 shadow-2xl px-6 py-8 rounded-l-3xl"
          >
            {/* Botón X y Logo */}
            <div className="relative flex items-center justify-between mb-8">
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
                className="text-black dark:text-white cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menú Móvil */}
            <div className="flex flex-col gap-6 mt-10">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold text-lg"
                      : "text-black font-medium dark:text-white text-lg hover:text-primary"
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="mt-6 flex flex-col gap-3">
                <AdoptButton label="Dona Aquí" variant="secondary" />

                {user ? (
                  <>
                    <NavLink to="/perfil" onClick={() => setIsOpen(false)} className="hover:text-primary font-medium text-lg">
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
                    <NavLink to="/register" onClick={() => setIsOpen(false)} className="hover:text-primary font-medium text-lg">
                      Sign up
                    </NavLink>
                    <NavLink to="/login" onClick={() => setIsOpen(false)} className="hover:text-primary font-medium text-lg">
                      Login
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  )
}

export default NavbarPublic
