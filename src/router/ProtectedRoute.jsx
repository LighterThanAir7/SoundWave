import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

export const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || (user.role !== 1 && user.role !== 2)) {
    return <Navigate to="/admin/login" state={{from: location}} replace/>;
  }

  return <Outlet />;
};