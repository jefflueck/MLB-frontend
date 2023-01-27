import React, { useState, useEffect } from 'react';
import MLBApi from '../api/api';
import './BuildingTeamPage.css';
import { Link } from 'react-router-dom';
import ListOfTeams from '../Forms/ListOfTeams';
import BaseballTeam from './BaseballTeam';
import { useContext } from 'react';
import UserContext from '../auth/UserContext';
import currentUser from '../auth/UserContext';

const BuildingTeamPage = () => {
  const { currentUser } = useContext(UserContext);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    year: '',
  });
  const [teamNameData, setTeamNameData] = useState({
    TeamName: '',
  });
  const [roster, setRoster] = useState([]);
  const [userTeams, setUserTeams] = useState([]);

  const [starters, setStarters] = useState({
    name: 'Team Name',
    first: '1B',
    second: '2B',
    third: '3B',
    ss: 'SS',
    c: 'C',
    lf: 'LF',
    cf: 'CF',
    rf: 'RF',
    p: 'P',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const callApi = async (e) => {
    e.preventDefault();
    const allTeams = await MLBApi.getTeams(formData.year);
    setTeams(allTeams);
  };

  const callTeamRoster = async (rosterId) => {
    const currentRoster = await MLBApi.getTeamRoster(rosterId);
    setTeams([]);
    setRoster(currentRoster);
  };

  const addPlayer = (position, name) => {
    let positionConversion = {
      '1B': 'first',
      '2B': 'second',
      '3B': 'third',
      SS: 'ss',
      C: 'c',
      LF: 'lf',
      CF: 'cf',
      RF: 'rf',
      P: 'p',
    };
    // positionConversion["1B"] Evaluates to "first" which matches the column name in the database.
    position = positionConversion[position];
    setStarters({ ...starters, [position]: name });
    return starters;
  };

  const handleTeamName = (e) => {
    e.preventDefault();
    setTeamNameData({ ...teamNameData, [e.target.id]: e.target.value });
    setStarters({ ...starters, name: e.target.value });
  };

  const addTeam = (e) => {
    e.preventDefault();
    let newTeam = MLBApi.createTeam(currentUser.id, starters);
    return newTeam;
  };

  const deleteTeam = (e) => {
    e.preventDefault();
    let deleteTeam = MLBApi.deleteTeam(userTeams.id);
    if (userTeams.id === deleteTeam.id) alert('Team Deleted', deleteTeam);
    else alert('Team Not Deleted');
    return deleteTeam;
  };

  const clearField = (e) => {
    e.preventDefault();
    setStarters({
      name: 'Team Name',
      first: '1B',
      second: '2B',
      third: '3B',
      ss: 'SS',
      c: 'C',
      lf: 'LF',
      cf: 'CF',
      rf: 'RF',
      p: 'P',
    });
  };

  const getAllTeams = async (e) => {
    e.preventDefault();
    const userTeams = await MLBApi.getUserTeams(currentUser.id);
    setUserTeams(userTeams);
  };

  const seeOneTeam = async (e) => {
    e.preventDefault();
    const oneTeam = await MLBApi.getOneTeam(userTeams.id);
  };

  return (
    <>
      <h1>MLB Dream Team</h1>
      <Link to="/franchise">
        <button>Franchise</button>
      </Link>
      <ListOfTeams
        roster={roster}
        starters={starters}
        handleChange={handleChange}
        callTeamRoster={callTeamRoster}
        addPlayer={addPlayer}
        callApi={callApi}
        teams={teams}
        formData={formData}
        handleTeamName={handleTeamName}
        addTeam={addTeam}
        clearField={clearField}
        deleteTeam={deleteTeam}
        getAllTeams={getAllTeams}
        userTeams={userTeams}
      />
      <BaseballTeam starters={starters} />
    </>
  );
};

export default BuildingTeamPage;
