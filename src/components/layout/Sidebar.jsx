import SidebarNav from "./SidebarNav.jsx";
import SidebarLogo from "../common/SidebarLogo.jsx";
import Player from "../player/Player.jsx";

export default function Sidebar () {
  return (
    <aside className="sidebar">
      <SidebarLogo />
      <SidebarNav />
      <Player />
    </aside>
  )
}