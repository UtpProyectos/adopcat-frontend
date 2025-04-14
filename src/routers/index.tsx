import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Home from "../pages/global/Home"
import Login from "../pages/global/Login" 
import PublicLayout from "../layout/PublicLayout"
import AdminLayout from "../layout/AdminLayout"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Público */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Layout Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
