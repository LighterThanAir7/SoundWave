import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import {Helmet, HelmetProvider} from "react-helmet-async";
import Music from "../pages/Music.jsx";

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
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}