import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import {Link} from "react-router-dom";

export default function Home () {
  return (
    <div className="bg-main">
      <Header />

      <main>
        <h1>Music is the soundtrack of your life</h1>
        <p>Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</p>
        <div>
          <p>What are you waiting for?</p>
          <Link to="/login" className="btn btn--primary">Join now</Link>
        </div>
      </main>

      <Footer type="bottom"/>
    </div>
  )
}