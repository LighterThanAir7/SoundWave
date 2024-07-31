import TopbarSearchHistory from "./TopbarSearchHistory.jsx";
import {useState} from "react";

export default function TopbarForm () {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleSearchClick () {
    setIsSearchOpen(!isSearchOpen);
  }

  return (
    <form className="topbar__form" action="">
      <i className="icon-search"></i>
      <input className="topbar__search" onClick={handleSearchClick} type="search" placeholder="Search here..."/>
      { isSearchOpen && <TopbarSearchHistory /> }
    </form>
  )
}