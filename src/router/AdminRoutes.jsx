import {Navigate, Route, Routes} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import AdminDashboard from "../backend/components/AdminDashboard.jsx";
import AdminLogin from "../backend/pages/AdminLogin.jsx";

export default function AdminRoutes () {
  const isAuthenticated = false; // This will be replaced with actual auth check

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <>
              <Helmet>
                <title>Admin - Dashboard</title>
              </Helmet>
              <AdminDashboard />
            </>
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
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
    </Routes>
  );
}