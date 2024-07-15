import React, { useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaRocket } from 'react-icons/fa';
import logo1 from './logo1.png';
import { AuthContext } from '../store/authContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(50px);
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

const Hero = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  background: #000;
  color: #fff;
  animation: ${fadeIn} 1s ease-in-out;
  padding: 0 20px;

  .overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: ${slideUp} 1s ease-in-out;
  }

  img {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
    animation: ${fadeIn} 2s ease-in-out, ${slideUp} 2s ease-in-out, ${pulse} 3s infinite;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    animation: ${fadeIn} 1.5s ease-in-out, ${slideUp} 1.5s ease-in-out;
    font-family: 'Poppins', sans-serif;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 30px;
    animation: ${fadeIn} 2s ease-in-out, ${slideUp} 2s ease-in-out;
    font-family: 'Poppins', sans-serif;
    max-width: 600px;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    font-size: 1.2rem;
    color: #fff;
    background: linear-gradient(135deg, #ff5722 0%, #ff9800 100%);
    border: none;
    border-radius: 50px;
    text-decoration: none;
    margin-top: 20px;
    transition: background 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    animation: ${fadeIn} 2.5s ease-in-out, ${slideUp} 2.5s ease-in-out;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    &:hover {
      background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    svg {
      margin-right: 10px;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;
    }

    img {
      width: 150px;
      height: 150px;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 0.875rem;
    }

    a {
      font-size: 1rem;
      padding: 10px 20px;
    }
  }
`;

const Home = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('User is logged in:', user);
    } else {
      console.log('User is not logged in');
    }
  }, [isLoggedIn, user]);

  return (
    <Hero>
      <div className="overlay">
        <img src={logo1} alt="Code Tracker Logo" />
        {isLoggedIn ? <p>Welcome back, {user.username}!</p> : <p>Please log in to access more features.</p>}
        <h1>Track Code, Elevate Productivity</h1>
        <p>Explore a variety of coding problem categories and improve your skills.</p>
        <a href="/categories">
          <FaRocket />
          Get Started
        </a>
      </div>
    </Hero>
  );
};

export default Home;
