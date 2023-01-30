import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// This is a functional component that renders a form for registering a new user.

const SignInAndRegister = ({ register }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let res = await register(formData);
    if (res.success) {
      navigate('/building');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default SignInAndRegister;
