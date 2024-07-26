import navItems from "../../config/NavConfig.jsx";
import NavItem from "./NavItem.jsx";

export default function Nav () {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {navItems.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </ul>
    </nav>
  )
}