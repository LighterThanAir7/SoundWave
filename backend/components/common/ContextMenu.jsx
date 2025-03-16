import { useState, useEffect, useRef } from 'react';
import {Link} from "react-router-dom";

export default function ContextMenu({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        triggerRef.current && !triggerRef.current.contains(event.target)
      ) {
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
    <>
      <i className="icon-dots" onClick={toggleMenu} ref={triggerRef}></i>
      <ul className={`context-menu ${isOpen ? 'context-menu--open' : ''}`} ref={menuRef}>
        {options.map((option, index) => (
          <li key={index}>
            <Link className="context-menu__link" to={option.link}>{option.label}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}