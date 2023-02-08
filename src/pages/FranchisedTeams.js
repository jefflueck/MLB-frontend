import React from 'react';
import './FranchisedTeams.css';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import MLBApi from '../api/api';

// This is a functional component that shows all team names, a ability to delete a team that belong to the logged in user.
// * Logged in user does not get to see other users teams.

const FranchisedTeams = () => {
  const { currentUser } = useContext(UserContext);

  const [userTeams, setUserTeams] = useState([]);
  useEffect(function getTeamsOnMount() {
    async function getTeams() {
      const teams = await MLBApi.getUserTeams(currentUser.id);
      setUserTeams(teams);
    }
    getTeams();
  }, []);

  const deleteTeam = async (teamId) => {
    await MLBApi.deleteTeam(teamId);
    const teams = await MLBApi.getUserTeams(currentUser.id);
    setUserTeams(teams);
  };

  if (!userTeams) return <LoadingSpinner />;
  // console.log('userTeams', userTeams);
  return (
    <>
      <h1>Franchised Teams</h1>
      <Link to="/building">
        <button>Return to building a Team</button>
      </Link>

      <h2 className="team_list">Current Teams:</h2>
      {userTeams.map((starters) => {
        return (
          <>
            <Link to="/franchise/team" state={starters}>
              <h3 style={{ color: 'white' }}>{starters.name}</h3>
            </Link>
            <button onClick={() => deleteTeam(starters.id)}>Delete Team</button>
          </>
        );
      })}
    </>
  );
};

export default FranchisedTeams;
