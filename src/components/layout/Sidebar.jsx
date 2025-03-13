import React, { useState, useEffect } from "react";
import SidebarNav from "./SidebarNav.jsx";
import SidebarLogo from "../common/SidebarLogo.jsx";
import Player from "../player/Player.jsx";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userCollapsed, setUserCollapsed] = useState(false); // Praćenje ručnog zatvaranja

  // Funkcija za ručno zatvaranje ili otvaranje
  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState); // Postavi sidebar kao zatvoren
    setUserCollapsed((prevState) => !prevState); // Označi da je korisnik ručno zatvorio
  };

  useEffect(() => {
    const handleResize = () => {
      // Automatsko zatvaranje samo ako korisnik nije ručno zatvorio sidebar
      if (!userCollapsed) {
        setIsCollapsed(window.innerWidth < 920);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Provjeri početnu širinu

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [userCollapsed]); // Dodaj userCollapsed kao ovisnost

  return (
    <aside className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""}`}>
      <div className="w-full">
        <SidebarLogo />
        {/* Prosljeđivanje funkcije kao prop */}
        <SidebarNav toggleCollapse={toggleCollapse} />
      </div>
      <Player />
    </aside>
  );
}
