import React from 'react';
import './ListOfTeams.css';

const ListOfTeams = ({
  teams,
  roster,
  handleChange,
  callApi,
  callTeamRoster,
  addPlayer,
  handleTeamName,
  addTeam,
  clearField,
}) => {
  return (
    <>
      <h1>Get a Teams by Year and Team ID</h1>
      <form>
        <label htmlFor="year">Year</label>
        <input type="text" id="year" onChange={handleChange} />
        <button type="submit" onClick={callApi}>
          submit
        </button>
      </form>

      <ul>
        {teams.length
          ? teams.map((team) => (
              <li key={team.name}>
                <button type="submit" onClick={() => callTeamRoster(team.id)}>
                  {team.name}
                </button>
              </li>
            ))
          : null}
      </ul>
      {roster.length ? (
        <table style={{ backgroundColor: 'white' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((player) => (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>
                  <button
                    id="team-list"
                    onClick={() => addPlayer(player.position, player.name)}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <form>
        <button onClick={addTeam}>Add Team to Franchise</button>
        <label htmlFor="TeamName">Team Name</label>
        <input type="text" id="TeamName" onChange={handleTeamName} />
        <button onClick={clearField}>Clear Field & Team Name</button>
      </form>
    </>
  );
};

export default ListOfTeams;
