import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";
import Categories from "../components/sections/Categories.jsx";
import Genres from "../components/sections/Genres.jsx";
import Quote from "../components/sections/Quote.jsx";
import Footer from "../components/layout/Footer.jsx";
import PodcastsSection from "../components/sections/PodcastsSection.jsx";
import YouMightLove from "../components/sections/YouMightLove.jsx";
import PodcastsByDuration from "../components/sections/PodcastsByDuration.jsx";
import PodcastCategories from "../components/sections/PodcastCategories.jsx";

export default function Podcasts () {
  return (
    <div className="flex">
      <Sidebar/>
      <main className="flex-1">
        <Topbar/>
        <div className="content-wrapper">
          <div className="pt-64 px-80 relative">
            <div className="soundwave__gif-container">
              <img className="soundwave__gif soundwave__gif--left" src="/src/assets/soundwave.gif" alt=""/>
              <img className="soundwave__gif soundwave__gif--right" src="/src/assets/soundwave.gif" alt=""/>
            </div>
            <PodcastsSection />
            <PodcastCategories />
            <YouMightLove />
            <PodcastsByDuration />
            <Quote
              mainText="When people talk, listen completely. Most people never listen"
              primaryWords={["talk", "listen"]}
              author="Ernest Hemingway"
            />
            <Footer type="large"/>
          </div>
          <Footer type="bottom" footerClass="footer--adjust"/>
        </div>
      </main>
    </div>
  )
}