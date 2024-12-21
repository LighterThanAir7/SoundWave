import { Navigate, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminDashboard from "../backend/components/AdminDashboard.jsx";
import AdminLogin from "../backend/pages/AdminLogin.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {ProtectedRoute} from "./ProtectedRoute.jsx";

export default function AdminRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !user ? (
            <>
              <Helmet>
                <title>Admin - Login</title>
              </Helmet>
              <AdminLogin />
            </>
          ) : (
            <Navigate to="/admin" replace />
          )
        }
      />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <>
              <Helmet>
                <title>Admin - Dashboard</title>
              </Helmet>
              <AdminDashboard />
            </>
          }
        />
        {/* Add other protected admin routes here */}
      </Route>
    </Routes>
  );
}