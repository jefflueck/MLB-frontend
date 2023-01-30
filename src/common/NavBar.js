import React from 'react';
import './NavBar.css';
import { useContext } from 'react';
import UserContext from '../auth/UserContext';

// This is a functional component that renders a navigation bar.

const NavBar = ({ logout, deleteUser }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <nav className="NavBar">
      {currentUser ? (
        <button className="NavBar_Button" onClick={() => logout()}>
          Logout
        </button>
      ) : null}
      {currentUser ? (
        <button className="NavBar_Button" onClick={() => deleteUser()}>
          Delete User
        </button>
      ) : null}
    </nav>
  );
};

export default NavBar;
