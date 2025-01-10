import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";
import HospitalsPage from "./pages/HospitalsPage";
import LogsPage from "./pages/LogsPage";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/patients">Patients</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
          <li><Link to="/hospitals">Hospitals</Link></li>
          <li><Link to="/logs">Logs</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/hospitals" element={<HospitalsPage />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
