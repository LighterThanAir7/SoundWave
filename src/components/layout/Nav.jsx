import navItems from "../../config/NavConfig.jsx";
import NavItem from "./NavItem.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Nav () {
  const [linkState, setLinkState] = useState({ text: "Join now", href: "/login" });

  useEffect(() => {
    const updateLinkText = () => {
      const title = document.title;
      if (title === "SoundWave - Login") {
        setLinkState({ text: "Home", href: "/" })
      } else {
        setLinkState({ text: "Log in", href: "/login" })
      }
    }
    updateLinkText();

    const observer = new MutationObserver(updateLinkText);
    observer.observe(document.querySelector('title'), { childList: true });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav">
      <ul className="nav__list">
        {navItems.map((item, index) => (
          <NavItem key={index} item={item}/>
        ))}
      </ul>
      <Link className="btn btn--primary text-350" to={linkState.href} >{linkState.text}</Link>
    </nav>
  )
}