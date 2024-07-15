import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../store/authContext';
import { toast } from 'react-toastify';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.section`
  padding: 4rem 2rem;
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  padding: 40px;
  background-color: #1e1e1e;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 0.75rem;
  width: 400px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 400px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #f0c14b;
  font-family: 'Poppins', sans-serif;
`;

const Form = styled.form`
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #424242;
  border-radius: 8px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    border-color: #f0c14b;
    box-shadow: 0 0 10px rgba(240, 193, 75, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #f0c14b;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.2s ease;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background-color: #ff5722;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StyledLink = styled(Link)`
  color: #f0c14b;
  font-family: 'Poppins', sans-serif;

  &:hover {
    text-decoration: underline;
    color: #ff5722;
  }
`;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      const { token, username } = response.data;

      login(token, username);
      toast.success('Registration successful!');
      setFormData({ username: '', email: '', phone: '', password: '' });
      navigate('/', { state: { message: 'Signup successful' } });
    } catch (error) {
      toast.error('Registration failed. Please check your details and try again.');
      console.error('Registration error', error);
    }
  };

  return (
    <Container>
      <Box>
        <Title>Signup</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <Button type="submit">Signup</Button>
        </Form>
        <p style={{ color: '#ccc' }}>
          Already have an account? <StyledLink to="/login">Login</StyledLink>
        </p>
      </Box>
    </Container>
  );
};

export default SignupPage;
