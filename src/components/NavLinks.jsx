import React from 'react';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import { IoAccessibility } from 'react-icons/io5';
import { BiCaretDown } from 'react-icons/bi';

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            onClick={toggleSidebar}
            end
          >
            <span className='icon'>{icon}</span> {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
