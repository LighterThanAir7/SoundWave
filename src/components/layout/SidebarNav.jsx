import { Link, useLocation } from 'react-router-dom';

export default function SidebarNav () {
  const location = useLocation();

  return (
    <nav className="sidebar__nav">
      <Link
        className={`sidebar__nav-link ${location.pathname === '/music' ? 'sidebar__nav-link--active' : ''}`}
        to="/music"
      >
        <i className="icon-music-note"></i>Music
      </Link>
      <Link
        className={`sidebar__nav-link ${location.pathname === '/podcasts' ? 'sidebar__nav-link--active' : ''}`}
        to="/podcasts"
      >
        <i className="icon-podcasts"></i>Podcasts
      </Link>
      <Link
        className={`sidebar__nav-link ${location.pathname === '/explore' ? 'sidebar__nav-link--active' : ''}`}
        to="/explore"
      >
        <i className="icon-explore"></i>Explore
      </Link>
      <Link
        className={`sidebar__nav-link ${location.pathname === '/favourites' ? 'sidebar__nav-link--active' : ''}`}
        to="/favourites"
      >
        <i className="icon-heart_outline"></i>Favourites
      </Link>
    </nav>
  );
}
