import React from 'react';

const TeamName = ({ starters }) => {
  return (
    <>
      <h2 className="Team Name">{starters['Team Name']}</h2>
    </>
  );
};

export default TeamName;
