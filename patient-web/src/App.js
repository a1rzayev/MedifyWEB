import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DoctorListPage from './pages/DoctorsPage';
import HospitalListPage from './pages/HospitalsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import HospitalProfilePage from './pages/HospitalProfilePage';
import UserProfilePage from './pages/UserProfilePage';

const App = () => {
    return (
        <Router>
            <div style={{ padding: '20px' }}>
                <nav style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Link to="/doctors" style={{ textDecoration: 'none', color: 'blue' }}>Doctors</Link>
                        <Link to="/hospitals" style={{ textDecoration: 'none', color: 'blue' }}>Hospitals</Link>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <input
                            type="text"
                            placeholder="Search"
                            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <Link to="/user-profile" style={{ textDecoration: 'none', color: 'blue' }}>
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User Avatar"
                                style={{ borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}
                            />
                        </Link>
                    </div>
                </nav>

                <Routes>
                    <Route path="/doctors" element={<DoctorListPage />} />
                    <Route path="/hospitals" element={<HospitalListPage />} />
                    <Route path="/doctor/:id" element={<DoctorProfilePage />} />
                    <Route path="/hospital/:id" element={<HospitalProfilePage />} />
                    <Route path="/user-profile" element={<UserProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;