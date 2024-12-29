import { Link } from "react-router-dom";

export default function AdminNav() {
  const navItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/songs", label: "Songs" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/artists", label: "Artists" },
    { path: "/admin/albums", label: "Albums" },
    { path: "/admin/notifications", label: "Notifications" },
    { path: "/admin/settings", label: "Settings" },
  ];

  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}