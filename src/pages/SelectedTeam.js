import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import BaseballTeam from './BaseballTeam';
// import ListOfTeams from '../Forms/ListOfTeams';

// This is a functional component that renders a page for the selected team when a user clicks on a team name from their list of teams.
// It displays the team name and the players on the team.
const SelectedTeam = () => {
  const location = useLocation();
  const myTeams = location.state;
  // console.log('myTeams', myTeams);

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
