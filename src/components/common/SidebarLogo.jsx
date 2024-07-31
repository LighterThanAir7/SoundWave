import {Link} from "react-router-dom";

export default function SidebarLogo () {
  return (
    <Link className="sidebar__logo" to="/">
      <i className="icon-logo"></i>
      SoundWave
    </Link>
  )
}