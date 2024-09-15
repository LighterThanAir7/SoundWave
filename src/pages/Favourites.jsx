import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";
import SoundwaveContainer from "../components/common/SoundwaveContainer.jsx";
import FavouritesHeader from "../components/sections/FavouritesHeader.jsx";
import PlaylistsYoullLove from "../components/sections/PlaylistsYoullLove.jsx";
import Artists from "../components/sections/Artists.jsx";
import YouMightLove from "../components/sections/YouMightLove.jsx";
import Quote from "../components/sections/Quote.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function Favourites () {
  return (
    <div className="flex">
      <Sidebar/>
      <Topbar />
      <div className="content-wrapper">
        <main className="content-wrapper__inner">
          <SoundwaveContainer/>
          <FavouritesHeader/>
          <PlaylistsYoullLove/>
          <Artists/>
          <YouMightLove/>
          <Quote
            mainText="Music is enough for a lifetime but a lifetime is not enough for music"
            primaryWords={['Music', 'lifetime']}
            author="Sergei Rachmaninoff"
          />
          <Footer type="large" />
        </main>
        <Footer type="bottom" footerClass="footer--adjust"/>
      </div>
    </div>
  )
}