import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ThemeProvider } from "./context/ThemeContext.tsx"
import { AuthProvider } from "./context/AuthContext.tsx"
import { GoogleOAuthProvider } from "@react-oauth/google" 
import { HeroUIProvider } from "@heroui/react"


ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <React.StrictMode> 
    <HeroUIProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider> 
    </HeroUIProvider>
  </React.StrictMode>
)
