import React from 'react';
import './BaseballTeam.css';
import myImage from '../assests/Baseball_diamond_clean.svg.png';

// This is a functional component that renders a baseball team.
// Starts out as a blank team, but can be filled in by the user.
const BaseballTeam = ({ starters }) => {
  return (
    <>
      <div>
        <h1 className="Team_Name">{starters['name']}</h1>
      </div>
      <img
        src={myImage}
        alt="Baseball Diamond Graphic to See Players on Field"
      />
      <p className="First">{starters['first']}</p>
      <p className="Second">{starters['second']}</p>
      <p className="Third">{starters['third']}</p>
      <p className="SS">{starters['ss']}</p>
      <p className="C">{starters['c']}</p>
      <p className="LF">{starters['lf']}</p>
      <p className="CF">{starters['cf']}</p>
      <p className="RF">{starters['rf']}</p>
      <p className="SP">{starters['p']}</p>
    </>
  );
};

export default BaseballTeam;

// addPlayer = (currentPlayer) => {
//   const { name, position } = currentPlayer;
//   setStarters({ ...starters, [position]: name, [position]: position });
//   return starters;
// };
