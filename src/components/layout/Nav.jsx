import navItems from "../../config/NavConfig.jsx";
import NavItem from "./NavItem.jsx";
import { Link, useLocation } from "react-router-dom";
import {useState} from "react";

export default function Nav() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkState = location.pathname === "/login"
    ? { text: "Home", href: "/" }
    : { text: "Log in", href: "/login" };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        {navItems.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </ul>
      <Link className="btn btn--primary btn-home" to={linkState.href}>{linkState.text}</Link>

      {/* Hamburger Icon for Mobile */}
      <div className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <div className="ham-bar bar-top"></div>
        <div className="ham-bar bar-mid"></div>
        <div className="ham-bar bar-bottom"></div>
      </div>

      {/* Mobile Menu */}
      <div className={`nav__mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>

      </div>
    </nav>
  );
}