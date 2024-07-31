import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";
import Vibe from "../components/sections/Vibe.jsx";
import MadeForYou from "../components/sections/MadeForYou.jsx";
import RecentlyPlayed from "../components/sections/RecentlyPlayed.jsx";
import PlaylistsYoullLove from "../components/sections/PlaylistsYoullLove.jsx";
import SummerIsHere from "../components/sections/SummerIsHere.jsx";
import NewReleasesForYou from "../components/sections/NewReleasesForYou.jsx";
import PlaylistCategories from "../components/sections/PlaylistCategories.jsx";
import Artists from "../components/sections/Artists.jsx";
import Genres from "../components/sections/Genres.jsx";

export default function Music () {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <div className="main-content">
          <Vibe />
          <MadeForYou />
          <RecentlyPlayed />
          <PlaylistsYoullLove />
          <SummerIsHere />
          <NewReleasesForYou />
          <PlaylistCategories />
          <Artists />
          <Genres />
        </div>

      </main>
    </div>
  )
}