import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DoctorProfilePage from './pages/DoctorProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import HospitalProfilePage from './pages/HospitalProfilePage';
import DoctorsPage from './pages/DoctorsPage';
import HospitalsPage from './pages/HospitalsPage';

const App = () => {
    return (
        <Router>
            <div style={{ padding: '20px' }}>
                <nav style={{ marginBottom: '20px' }}>
                    <Link to="/doctors" style={{ marginRight: '20px', textDecoration: 'none', color: 'blue' }}>Доктора</Link>
                    <Link to="/hospitals" style={{ textDecoration: 'none', color: 'blue' }}>Больницы</Link>
                    <Link to="/user-profile" style={{ textDecoration: 'none', color: 'blue' }}>
                        <img
                            src="https://via.placeholder.com/40"
                            alt="User Avatar"
                            style={{ borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}
                        />
                    </Link>
                </nav>

                <Routes>
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/hospitals" element={<HospitalsPage />} />
                    <Route path="/doctor/:id" element={<DoctorProfilePage />} />
                    <Route path="/hospital/:id" element={<HospitalProfilePage />} />
                    <Route path="/user-profile" element={<UserProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;