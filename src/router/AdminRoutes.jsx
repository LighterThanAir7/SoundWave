import { Navigate, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {useAuth} from "../context/AuthContext.jsx";
import {ProtectedRoute} from "./ProtectedRoute.jsx";
import AdminDashboard from "../../backend/components/AdminDashboard.jsx";
import AdminLogin from "../../backend/pages/AdminLogin.jsx";
import UserManagement from "../../backend/components/UserManagement.jsx";
import SongsManagement from "../../backend/components/SongsManagement.jsx";
import ArtistsManagement from "../../backend/components/ArtistsManagement.jsx";
import AlbumsManagement from "../../backend/components/AlbumsManagement.jsx";
import GenresManagement from "../../backend/components/GenresManagement.jsx";
import PlaylistsManagement from "../../backend/components/PlaylistsManagement.jsx";

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

        <Route
          path="/playlists"
          element={
            <>
              <Helmet>
                <title>Admin - Playlists</title>
              </Helmet>
              <PlaylistsManagement />
            </>
          }
        />

        <Route
          path="/genres"
          element={
            <>
              <Helmet>
                <title>Admin - Genres</title>
              </Helmet>
              <GenresManagement />
            </>
          }
        />

      </Route>
    </Routes>
  );
}