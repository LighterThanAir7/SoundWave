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

export default function Music () {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <div className="main-content">
          <div className="pt-64 px-80 relative">
            <div className="soundwave__gif-container">
              <img className="soundwave__gif soundwave__gif--left" src="/src/assets/soundwave.gif" alt=""/>
              <img className="soundwave__gif soundwave__gif--right" src="/src/assets/soundwave.gif" alt=""/>
            </div>
            <Vibe/>
            <MadeForYou/>
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
          </div>
          <Footer type="bottom" footerClass="footer--adjust"/>
        </div>
      </main>
    </div>
  )
}