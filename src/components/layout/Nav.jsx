import navItems from "../../config/NavConfig.jsx";
import NavItem from "./NavItem.jsx";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  const linkState = location.pathname === "/login"
    ? { text: "Home", href: "/" }
    : { text: "Log in", href: "/login" };

  return (
    <nav className="nav">
      <ul className="nav__list">
        {navItems.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </ul>
      <Link className="btn btn--primary text-350" to={linkState.href}>{linkState.text}</Link>
    </nav>
  );
}