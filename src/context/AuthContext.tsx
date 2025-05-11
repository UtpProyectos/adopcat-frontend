import { googleLogout } from "@react-oauth/google"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  role: string
  profilePhoto?: string
  verified: boolean
}

interface AuthContextProps {
  token: string | null
  user: User | null
  login: (token: string, user: User) => void
  logout: () => void
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  initialized: boolean // ✅ Nuevo
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")

      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      }
    } catch (err) {
      console.error("❌ Error al leer del localStorage:", err)
      logout()
    } finally {
      setInitialized(true) // ✅ Mover fuera del if/try
    }
  }, [])


  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
    console.log("✅ Login exitoso:", newUser)
  }

  const logout = () => {
    console.warn("🔴 Logout forzado")
    googleLogout()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  // Sync logout en otras pestañas
  useEffect(() => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === "token" && event.newValue === null) {
        logout()
      }
    }
    window.addEventListener("storage", syncLogout)
    return () => window.removeEventListener("storage", syncLogout)
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, login, logout, setUser, initialized }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>")
  }
  return context
}
