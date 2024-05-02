import { FaCaretDown, FaHome, FaUserCircle } from 'react-icons/fa';
import { FaAlignLeft } from 'react-icons/fa6';
import styled from 'styled-components';
import Logo from './Logo';
import Avatar from './Avatar';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import loginService from '../services/login-service';
import { toast } from 'react-toastify';

const Navbar = () => {
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
    //  setToken(null);
    // navigate('/landing');
  };
  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn'>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          {/* <BsThreeDotsVertical className='separator' size={32} /> */}
          <button
            type='button'
            className='btn'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Avatar />
            <FaCaretDown className='caret-down' size={32} />
          </button>
          <div className={showDropdown ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => handleLogout()}
            >
              logout
            </button>
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
    padding: 0.5rem;
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
