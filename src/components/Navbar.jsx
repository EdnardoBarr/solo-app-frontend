import { FaCaretDown, FaHome, FaUserCircle } from 'react-icons/fa';
import { FaAlignLeft } from 'react-icons/fa6';
import styled from 'styled-components';
import Logo from './Logo';
import Avatar from './Avatar';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import loginService from '../services/login-service';
import { toast } from 'react-toastify';
import userService from '../services/user-service';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setToken } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    loginService
      .doLogout()
      .then((resp) => {
        setToken(null);
      })
      .catch((error) => {
        toast.error('Error logging out');
      });
  };
  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          className='toggle-btn'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Avatar />
            <FaCaretDown className='caret-down' size={32} />
          </button>
          <div className={showDropdown ? 'dropdown show-dropdown' : 'dropdown'}>
            <div className='profile-btn'>
              <Link
                to='/my-friendship'
                className='dropdown-btn'
                onClick={() => setShowDropdown(!showDropdown)}
              >
                friends
              </Link>
            </div>
            <div className='profile-btn'>
              <Link
                to='/profile'
                className='dropdown-btn'
                onClick={() => setShowDropdown(!showDropdown)}
              >
                profile
              </Link>
            </div>
            <div className='profile-btn'>
              <button
                type='button'
                className='dropdown-btn '
                onClick={() => handleLogout()}
              >
                logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: var(--white);
  .separator {
    padding: 0;
    color: var(--grey-400);
  }
  .btn-container {
    position: relative;
    /* display: flex;
    align-items: center; */
  }
  .btn {
    background: white;
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: none;
  }
  .profile-btn {
    padding: 0.8rem 0;
    width: 100%;
  }
  .profile-btn:hover {
    cursor: pointer;
    background: var(--grey-400);
    transition: var(--transition);
  }
  .btn:hover {
    box-shadow: var(--shadow-1);
    background: var(--grey-100);
    .caret-down {
      color: var(--primary-900);
    }
  }
  .avatar {
    padding: 2px;
    box-shadow: var(--shadow-4);
    border-radius: 80px;
    background-color: var(--primary-700);
  }
  .caret-down {
    color: var(--primary-700);
  }
  .dropdown {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background: var(--grey-100);
    box-shadow: var(--shadow-2);
    // padding: 0.5rem 0;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;

export default Navbar;
