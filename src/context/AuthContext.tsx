import { googleLogout } from "@react-oauth/google"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

interface User {
  userId: number
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
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  )

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    googleLogout()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    const syncLogout = () => {
      const storedToken = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")

      setToken(storedToken)
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }

    window.addEventListener("storage", syncLogout)
    return () => window.removeEventListener("storage", syncLogout)
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
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
