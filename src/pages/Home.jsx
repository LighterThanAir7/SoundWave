import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import {Link} from "react-router-dom";
import playerHome from "../assets/playerHome.png";

export default function Home () {
  return (
    <div className="home bg-main">
      <Header />

      <main className="hero container">
        <div className="hero__content">
          <h1 className="hero__title">Music is the <br/> soundtrack of your life</h1>
          <p className="hero__text">Discover, stream, and share a constantly expanding mix of music from
            emerging and major artists around the world.</p>
          <div className="hero__cta">
            <p className="hero__cta-text">What are you waiting for</p>
            <Link to="/login" className="btn btn--primary">Join now</Link>
          </div>
        </div>
        <div className="hero__images">
          <img className="hero__image" src={playerHome} alt="Music player for showcase"/>
          <img className="hero__image hero__image--secondary" src={playerHome} alt="Music player for showcase"/>
        </div>
      </main>

      <Footer type="bottom"/>
    </div>
  )
}