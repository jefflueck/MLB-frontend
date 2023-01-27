import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import BuildingTeamPage from '../pages/BuildingTeamPage';
import FranchisedTeams from '../pages/FranchisedTeams';
import SelectedTeam from '../pages/SelectedTeam';

const Router = ({ login, register }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route
          path="/register"
          element={<RegisterPage register={register} />}
        />
        <Route path="/building" element={<BuildingTeamPage />} />
        <Route path="/franchise" element={<FranchisedTeams />} />
        <Route path="/franchise/team" element={<SelectedTeam />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
