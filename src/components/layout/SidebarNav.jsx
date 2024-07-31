import {Link} from "react-router-dom";

export default function SidebarNav () {
  return (
    <nav className="sidebar__nav">
      <Link className="sidebar__nav-link sidebar__nav-link--active" to="/music">
        <i className="icon-music-note"></i>Music
      </Link>
      <Link className="sidebar__nav-link" to="/podcasts">
        <i className="icon-podcasts"></i>Podcasts
      </Link>
      <Link className="sidebar__nav-link" to="/expore">
        <i className="icon-explore"></i>Expore
      </Link>
      <Link className="sidebar__nav-link" to="/favourites">
        <i className="icon-heart_outline"></i>Favourites
      </Link>
    </nav>
  )
}