import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated, requiredRole, userRole }) => {
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role (if applicable)
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render the protected content
  return children;
};

export default ProtectedRoute;