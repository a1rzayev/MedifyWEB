// src/MainMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div>
      <h1>Medify - Main Menu</h1>
      <nav>
        <ul>
          <li><Link to="/doctors">Doctors</Link></li>
          <li><Link to="/hospitals">Hospitals</Link></li>
          <li><Link to="/patients">Patients</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MainMenu;
