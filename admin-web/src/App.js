// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Doctors from './pages/Doctors';
import Hospitals from './pages/Hospitals';
import Patients from './pages/Patients';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
