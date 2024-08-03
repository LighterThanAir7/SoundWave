import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import {Helmet, HelmetProvider} from "react-helmet-async";
import Music from "../pages/Music.jsx";
import Podcasts from "../pages/Podcasts.jsx";
import Explore from "../pages/Explore.jsx";
import Favourites from "../pages/Favourites.jsx";

export default function AppRouter () {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>SoundWave</title>
                </Helmet>
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Helmet>
                  <title>SoundWave - Login</title>
                </Helmet>
                <Login />
              </>
            }
          />
          <Route
            path="/music"
            element={
              <>
                <Helmet>
                  <title>SoundWave - Music</title>
                </Helmet>
                <Music />
              </>
            }
          />
          <Route
            path="/podcasts"
            element={
              <>
                <Helmet>
                  <title>SoundWave - Podcasts</title>
                </Helmet>
                <Podcasts />
              </>
            }
          />
          <Route
            path="/explore"
            element={
              <>
                <Helmet>
                  <title>SoundWave - Explore</title>
                </Helmet>
                <Explore />
              </>
            }
          />
          <Route
            path="/favourites"
            element={
              <>
                <Helmet>
                  <title>SoundWave - Favourites</title>
                </Helmet>
                <Favourites />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}