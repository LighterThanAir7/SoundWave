import { Navigate, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AdminDashboard from "../backend/components/AdminDashboard.jsx";
import AdminLogin from "../backend/pages/AdminLogin.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {ProtectedRoute} from "./ProtectedRoute.jsx";
import UserManagement from "../backend/components/UserManagement.jsx";
import SongsManagement from "../backend/components/SongsManagement.jsx";
import ArtistsManagement from "../backend/components/ArtistsManagement.jsx";
import AlbumsManagement from "../backend/components/AlbumsManagement.jsx";

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

        <Route
          path="/songs"
          element={
            <>
              <Helmet>
                <title>Admin - Songs</title>
              </Helmet>
              <SongsManagement />
            </>
          }
        />

        <Route
          path="/users"
          element={
            <>
              <Helmet>
                <title>Admin - Users</title>
              </Helmet>
              <UserManagement />
            </>
          }
        />

        <Route
          path="/artists"
          element={
            <>
              <Helmet>
                <title>Admin - Artists</title>
              </Helmet>
              <ArtistsManagement />
            </>
          }
        />

        <Route
          path="/albums"
          element={
            <>
              <Helmet>
                <title>Admin - Albums</title>
              </Helmet>
              <AlbumsManagement />
            </>
          }
        />

      </Route>
    </Routes>
  );
}