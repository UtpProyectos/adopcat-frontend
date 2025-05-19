import { googleLogout } from "@react-oauth/google"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react"
import { User } from "../models/user"

 

interface AuthContextProps {
  token: string | null
  user: User | null
  login: (token: string, user: User) => void
  logout: () => void
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  initialized: boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error("❌ Error al parsear user del localStorage:", err)
        logout()
      }
    }

    setInitialized(true)
  }, [])

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser) 
  }

  const logout = () => {
    console.warn("🔴 Logout forzado")
    googleLogout()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  // 🔄 Sync logout entre pestañas
  useEffect(() => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === "token" && event.newValue === null) {
        logout()
      }
    }
    window.addEventListener("storage", syncLogout)
    return () => window.removeEventListener("storage", syncLogout)
  }, [])

  const contextValue = useMemo(() => ({
    token,
    user,
    login,
    logout,
    setUser,
    initialized,
  }), [token, user, initialized])

  return (
    <AuthContext.Provider value={contextValue}>
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
 