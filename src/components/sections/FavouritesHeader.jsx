import profileImage from '../../assets/account-big.jpg'
import { useNavigate } from "react-router-dom";

export default function FavouritesHeader() {
  const navigate = useNavigate();
  return (
      <header className="header-single header-single--after-transparent">
        <div className="header-single__avatar">
            <img src={profileImage} alt=""/>
        </div>
        <div className="header-single__info">
          <h1 className="mb-8">Lighter Than Air</h1>
          <h5 className="mb-0">214 followers - 320 following</h5>
        </div>
        <div className="header-single__stats | text-italic ">
          <p className="fw-500">Joined: March 2024</p>
          <button className="header-single__close icon-arrow-left" type="button" onClick={() => navigate(-1)}></button>
        </div>
      </header>
  )
}