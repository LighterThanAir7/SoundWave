import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";
import Categories from "../components/sections/Categories.jsx";
import Genres from "../components/sections/Genres.jsx";
import Quote from "../components/sections/Quote.jsx";
import Footer from "../components/layout/Footer.jsx";
import ExploreSection from "../components/sections/ExploreSection.jsx";

export default function Explore () {
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
            <ExploreSection />
            <Categories/>
            <Genres/>
            <Quote
              mainText="Not all those who wander are lost"
              primaryWords={["Not", "all"]}
              author="J.R.R. Tolkien"
            />
            <Footer type="large"/>
          </div>
          <Footer type="bottom" footerClass="footer--adjust"/>
        </div>
      </main>
    </div>
  )
}