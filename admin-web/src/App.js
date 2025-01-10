import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorsPage from './pages/DoctorsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <h1>Medical Admin Panel</h1>
        <Routes>
          <Route path="/" element={<h2>Welcome to Admin Panel</h2>} />
          <Route path="/doctors" element={<DoctorsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
