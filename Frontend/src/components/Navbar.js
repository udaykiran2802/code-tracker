import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaHome, FaTrophy, FaThList, FaEnvelope, FaBars, FaFacebook, FaInstagram, FaTwitter, FaGoogle, FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa'; // Import necessary icons
import { AuthContext } from '../store/authContext';
import logo from './logo.png';

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  animation: ${slideDown} 0.5s ease-in-out;

  .navbar-brand {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    animation: ${pulse} 2s infinite;

    img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
    }
  }

  .navbar-toggler {
    border: none;
    background: transparent;
    color: #fff;

    &:focus {
      outline: none;
    }
  }

  .navbar-toggler-icon {
    font-size: 1.2rem;
  }

  .collapse {
    flex-grow: 1;
    justify-content: flex-end;

    .nav-item {
      margin-left: 20px;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -5px;
        left: 50%;
        background-color: #1e90ff;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
      }

      .nav-link {
        color: #fff;
        text-decoration: none;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        transition: color 0.3s ease-in-out;

        &:hover {
          color: #1e90ff;
        }

        &:hover::before {
          visibility: visible;
          width: 100%;
          left: 0;
        }

        svg {
          margin-right: 5px;
          transition: transform 0.3s ease-in-out;
        }

        &:hover svg {
          transform: rotate(360deg);
        }
      }
    }
  }
`;

const ContactWindow = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 2000;

  a {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    margin-bottom: 10px;
    font-size: 1.1rem;

    &:last-child {
      margin-bottom: 0;
    }

    svg {
      margin-right: 8px;
    }

    &:hover {
      color: #1e90ff;
    }
  }
`;

const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  const [showContact, setShowContact] = useState(false);

  const toggleContact = () => {
    setShowContact(!showContact);
  };

  return (
    <NavbarContainer className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Code Tracker Logo" />
        Code Tracker
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"><FaBars /></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <FaHome /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contests">
              <FaTrophy /> Contests
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">
              <FaThList /> Categories
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={toggleContact}>
              <FaEnvelope /> Contact
            </button>
            {showContact && (
              <ContactWindow>
                <a href="mailto:someone@example.com">
                  <FaGoogle /> dinesharagonda79@gmail.com
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook /> Facebook
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram /> Instagram
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter /> Twitter
                </a>
              </ContactWindow>
            )}
          </li>
          {authState.isAuthenticated ? (
            <li className="nav-item">
              <button className="nav-link" onClick={logout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  <FaUserPlus /> Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
