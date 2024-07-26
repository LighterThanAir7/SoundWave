import Logo from "../common/Logo.jsx";
import Nav from "./Nav.jsx";

export default function Header ({ className }) {
  return (
    <header className={`header ${className}`}>
      <Logo />
      <Nav />
    </header>
  )
}