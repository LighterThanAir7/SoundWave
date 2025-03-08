import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";
import Vibe from "../components/sections/Vibe.jsx";
import MadeForYou from "../components/sections/MadeForYou.jsx";
import RecentlyPlayed from "../components/sections/RecentlyPlayed.jsx";
import PlaylistsYoullLove from "../components/sections/PlaylistsYoullLove.jsx";
import SummerIsHere from "../components/sections/SummerIsHere.jsx";
import NewReleasesForYou from "../components/sections/NewReleasesForYou.jsx";
import Categories from "../components/sections/Categories.jsx";
import Artists from "../components/sections/Artists.jsx";
import Genres from "../components/sections/Genres.jsx";
import Quote from "../components/sections/Quote.jsx";
import Footer from "../components/layout/Footer.jsx";
import SoundwaveContainer from "../components/common/SoundwaveContainer.jsx";
import TestSongs from "../components/sections/TestSongs.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

export default function Music() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  // Only render the page content if user is authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="flex">
      <Sidebar />
      <Topbar />
      <div className="content-wrapper">
        <main className="content-wrapper__inner">
          <SoundwaveContainer/>
          <Vibe/>
          <TestSongs/>
          <RecentlyPlayed/>
          <PlaylistsYoullLove/>
          <SummerIsHere/>
          <NewReleasesForYou/>
          <Categories/>
          <Artists/>
          <Genres/>
          <Quote
            mainText="Music is the universal language of mankind"
            primaryWords={['Music']}
            author="Henry Wadsworth Longfellow"
          />
          <Footer type="large" />
        </main>
        <Footer type="bottom" footerClass="footer--adjust"/>
      </div>
    </div>
  );
}