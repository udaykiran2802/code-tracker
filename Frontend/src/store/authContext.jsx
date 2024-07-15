// store/authContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  // Function to check user Authentication
  const userAuthentication = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsLoggedIn(true);
      } else {
        console.error('Error fetching user data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to store token in localStorage
  const storeTokenInLS = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setAuthState({
      token,
      isAuthenticated: true,
    });
  };

  // Function to login user
  const login = (token) => {
    storeTokenInLS(token);
  };

  // Function to logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setAuthState({
      token: null,
      isAuthenticated: false,
    });
  };
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logout, login, user, authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
