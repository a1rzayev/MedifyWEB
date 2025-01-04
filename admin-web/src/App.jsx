import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainMenu from './pages/mainmenu';
import Doctors from './pages/doctors';
import Hospitals from './pages/hospitals';
import Patients from './pages/patients';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
    </Router>
  );
};

export default App;
