import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import AdminRoutes from "./AdminRoutes.jsx";
import {FrontendRoutes} from "./FrontendRoutes.jsx";

export default function AppRouter () {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<FrontendRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}