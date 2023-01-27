import React from 'react';
import './RegisterPage.css';
import Register from '../Forms/Register';

const RegisterPage = ({ register }) => {
  return (
    <>
      <h1>MLB Dream Team</h1>
      <h2>Register</h2>
      <Register register={register} />
    </>
  );
};

export default RegisterPage;
