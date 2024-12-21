import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};