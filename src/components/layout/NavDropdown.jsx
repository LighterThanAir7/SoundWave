export default function NavDropdown({ links }) {
  return (
    <ul className="nav__dropdown">
      {links.map((dropdownLink, index) => (
        <li key={index} className="nav__dropdown-item">
          <a href={dropdownLink.href} className="nav__dropdown-link">{dropdownLink.label}</a>
        </li>
      ))}
    </ul>
  );
}
