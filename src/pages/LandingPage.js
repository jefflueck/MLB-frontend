import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

// This is a functional component that renders a landing page for sign in and register.

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>MLB Dream Team</h1>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </>
  );
};

export default LandingPage;
