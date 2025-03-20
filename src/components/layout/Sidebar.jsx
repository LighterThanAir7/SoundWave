import React, { useState, useEffect } from "react";
import SidebarNav from "./SidebarNav.jsx";
import SidebarLogo from "../common/SidebarLogo.jsx";
import Player from "../player/Player.jsx";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userCollapsed, setUserCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
    setUserCollapsed((prevState) => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!userCollapsed) {
        setIsCollapsed(window.innerWidth < 920);
      }
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [userCollapsed]);

  return (
    <aside className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""} ${isMobile ? "sidebar--mobile" : ""}`}>
      <div className="w-full">
        <SidebarLogo />
        <SidebarNav toggleCollapse={toggleCollapse} isCollapsed={isCollapsed} />
      </div>
      <Player />
    </aside>
  );
}