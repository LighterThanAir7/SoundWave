import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import adminLogo from "../../src/assets/logo-horizontal-white.svg"

export default function AdminSidebar () {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: 'dashboard'},
    { path: "/admin/users", label: "Users", icon: 'users1'},
    { path: "/admin/songs", label: "Songs", icon: 'music'},
    { path: "/admin/artists", label: "Artists", icon: 'artist'},
    { path: "/admin/albums", label: "Albums", icon: 'album'},
    { path: "/admin/playlists", label: "Playlists", icon: 'playlist-play'},
    { path: "/admin/genres", label: "Genres", icon: 'genres'},
  ];

  const navSecondaryItems = [
    { path: "/admin/analytics", label: "Analytics", icon: 'analytics' },
    { path: "/admin/settings", label: "Settings", icon: 'settings' },
    { onClick: handleLogout, label: "Logout", icon: 'logout' }
  ]

  const isActiveLink = (path) => {
    if (path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__logo">
        <img src={adminLogo} alt=""/>
      </div>
      <nav className="admin-sidebar__nav-primary">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.label}
            className={`admin-sidebar__link ${isActiveLink(item.path) ? 'admin-sidebar__link--active' : ''}`}
          >
            <i className={`icon-${item.icon}`}></i>
            {item.label}
          </Link>
        ))}
      </nav>
      <nav className="admin-sidebar__nav-secondary">
        {navSecondaryItems.map((item) => (
          item.onClick ? (
            <button
              onClick={item.onClick}
              key={item.label}
              className={`admin-sidebar__link`}
            >
              <i className={`icon-${item.icon}`}></i>
              {item.label}
            </button>
          ) : (
            <Link
              to={item.path}
              key={item.label}
              className={`admin-sidebar__link ${isActiveLink(item.path) ? 'admin-sidebar__link--active' : ''}`}
            >
              <i className={`icon-${item.icon}`}></i>
              {item.label}
            </Link>
          )
        ))}
      </nav>
    </aside>
  );
}