import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import BaseballTeam from './BaseballTeam';

const SelectedTeam = () => {
  const location = useLocation();
  const myTeams = location.state;
  console.log('myTeams', myTeams);

  return (
    <>
      <Link to="/building">
        <button>Return to Build Another Team</button>
      </Link>
      <h1>Selected Team</h1>
      <BaseballTeam starters={myTeams} />
    </>
  );
};

export default SelectedTeam;
