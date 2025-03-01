import { useState, useEffect, useRef } from 'react';
import {Link} from "react-router-dom";

export default function ContextMenu({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="table__data" ref={menuRef}>
      <i className="icon-dots" onClick={toggleMenu}></i>
      <ul className={`context-menu ${isOpen ? 'context-menu--open' : ''}`}>
        {options.map((option, index) => (
          <li key={index}>
            <Link className="context-menu__link" to={option.link}>{option.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}