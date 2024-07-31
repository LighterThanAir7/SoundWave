import { useRef } from 'react';
import NavDropdown from './NavDropdown';

export default function NavItem({ item }) {
  const navItemRef = useRef(null);

  function handleMouseEnter() {
    if (navItemRef.current) {
      const dropdown = navItemRef.current.querySelector('.nav__dropdown');
      if (dropdown) {
        const dropdownItem = dropdown.querySelector('.nav__dropdown-item');
        if (dropdownItem) {
          const itemHeight = dropdownItem.offsetHeight;
          dropdown.style.height = `${itemHeight * item.dropdownLinks.length - 2}px`;
        }
      }
    }
  }

  function handleMouseLeave() {
    if (navItemRef.current) {
      const dropdown = navItemRef.current.querySelector('.nav__dropdown');
      if (dropdown) {
        dropdown.style.height = '0';
      }
    }
  }

  return (
    <li className="nav__item" ref={navItemRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <a href={item.href} className="nav__link">{item.label}</a>
      {item.dropdownLinks && item.dropdownLinks.length > 0 && (
        <NavDropdown links={item.dropdownLinks}/>
      )}
    </li>
  );
}