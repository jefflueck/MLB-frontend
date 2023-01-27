import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInAndRegister = ({ login }) => {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    let res = await login(formData);
    if (res.success) {
      navigate('/building');
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default SignInAndRegister;
