import React from 'react';
import './LoginPage.css';
import SignIn from '../Forms/SignIn';

// This is a functional component that renders a login page.

const LoginPage = ({ login }) => {
  return (
    <>
      <h1>MLB Dream Team</h1>
      <h2>Login</h2>
      <SignIn login={login} />
    </>
  );
};

export default LoginPage;
