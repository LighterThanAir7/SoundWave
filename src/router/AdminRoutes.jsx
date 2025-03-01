import { Navigate, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {useAuth} from "../context/AuthContext.jsx";
import {ProtectedRoute} from "./ProtectedRoute.jsx";
import AdminDashboard from "../../backend/components/AdminDashboard.jsx";
import AdminLogin from "../../backend/pages/AdminLogin.jsx";
import Users from "../../backend/components/lists/Users.jsx";
import Songs from "../../backend/components/lists/Songs.jsx";
import Artists from "../../backend/components/lists/Artists.jsx";
import Albums from "../../backend/components/lists/Albums.jsx";
import Genres from "../../backend/components/lists/Genres.jsx";
import Playlists from "../../backend/components/lists/Playlists.jsx";
import Song from "../../backend/components/pages/Song.jsx";
import User from "../../backend/components/pages/User.jsx";
import Artist from "../../backend/components/pages/Artist.jsx";
import Album from "../../backend/components/pages/Album.jsx";
import Playlist from "../../backend/components/pages/Playlist.jsx";
import Genre from "../../backend/components/pages/Genre.jsx";

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
          path="/users"
          element={
            <>
              <Helmet>
                <title>Admin - Users</title>
              </Helmet>
              <Users />
            </>
          }
        />

        <Route
          path="/users/:id"
          element={
            <>
              <Helmet>
                <title>Admin - User Details</title>
              </Helmet>
              <User />
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
              <Songs />
            </>
          }
        />

        <Route
          path="/songs/:id"
          element={
            <>
              <Helmet>
                <title>Admin - Song Details</title>
              </Helmet>
              <Song />
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
              <Artists />
            </>
          }
        />

        <Route
          path="/artists/:id"
          element={
            <>
              <Helmet>
                <title>Admin - Artist Details</title>
              </Helmet>
              <Artist />
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
              <Albums />
            </>
          }
        />

        <Route
          path="/albums/:id"
          element={
            <>
              <Helmet>
                <title>Admin - Album Details</title>
              </Helmet>
              <Album />
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
              <Playlists />
            </>
          }
        />

        <Route
          path="/playlists/:id"
          element={
            <>
              <Helmet>
                <title>Admin - Playlist Details</title>
              </Helmet>
              <Playlist />
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
              <Genres />
            </>
          }
        />

        <Route
          path="/genres/:id"
          element={
            <>
              <Helmet>
                <title>Admin - Genre Details</title>
              </Helmet>
              <Genre />
            </>
          }
        />

      </Route>
    </Routes>
  );
}