import profileImage from '../../assets/account.png'

export default function FavouritesHeader() {
  return (
    <header className="favourites">
      <div className="favourites__header">
        <img src={profileImage} alt=""/>
        <div>
          <h2>Lighter Than Air</h2>
          <p>Joined: March 2024</p>
          <p>214 followers - 320 following</p>
        </div>
      </div>
      <div className="favourites__highlights-container text-right">
        <h3 className="favourites__highlights">Highlights</h3>
        <ul className="favourites__highlights-list">
          <li className="favourites__highlights-item">
            <p>Highlights</p>
          </li>
          <li className="favourites__highlights-item">
            <p>Favourite Tracks <span>117</span></p>
          </li>
          <li className="favourites__highlights-item">
            <p>Playlists <span>70</span></p>
          </li>
          <li className="favourites__highlights-item">
            <p>Albums <span>97</span></p>
          </li>
          <li className="favourites__highlights-item">
            <p>Artists <span>82</span></p>
          </li>
          <li className="favourites__highlights-item">
            <p>Podcasts <span>43</span></p>
          </li>
        </ul>
      </div>
    </header>
  )
}