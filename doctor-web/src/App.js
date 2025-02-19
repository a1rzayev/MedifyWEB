import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import DoctorsPage from './pages/DoctorsPage';
import HospitalsPage from './pages/HospitalsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import HospitalProfilePage from './pages/HospitalProfilePage';
import ValidatePage from './pages/ValidatePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import PatientsPage from './pages/PatientsPage';
import UserProfilePage from './pages/UserProfilePage';

const Navbar = ({ isAuthenticated, userId, handleLogout }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'bg-dark text-danger' : '';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success rounded shadow-lg p-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-white fw-bold fs-4">
                    Medify <span className="fs-6">Doctor</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><Link to="/" className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive('/')}`}>🏠 Ana Səhifə</Link></li>
                        <li className="nav-item"><Link to="/doctors" className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive('/doctors')}`}>👨‍⚕️ Həkimlər</Link></li>
                        <li className="nav-item"><Link to="/patients" className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive('/patients')}`}>😷 Pasientlər</Link></li>
                        <li className="nav-item"><Link to="/hospitals" className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive('/hospitals')}`}>🏥 Xəstəxanalar</Link></li>
                    </ul>
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link to={`/profile/${userId}`} className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive(`/profile/${userId}`)}`}>
                                        <img src="https://via.placeholder.com/40" alt="Avatar" className="rounded-circle border border-light me-2" style={{ width: '40px', height: '40px' }} />
                                        
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/validate/${userId}`} className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive(`/validate/${userId}`)}`}>🔍 Doğrula</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light ms-3 px-4 py-2 rounded-pill" onClick={handleLogout}>🚪 Çıxış</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item d-flex">
                                <Link to="/login" className="btn btn-light text-danger fw-bold px-4 py-2 rounded-pill">🔑 Giriş</Link>
                                <Link to="/signup" className="nav-link text-white"> 🖊️ Qeydiyyat </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('accessToken') !== null);
    const [userId, setUserId] = useState(null);
    const [isValidated, setIsValidated] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const decodedToken = jwtDecode(token);
                const extractedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                setUserId(extractedUserId);

                axios.get(`http://localhost:5250/api/Doctor/HasPendingRequest/${extractedUserId}`)
                    .then(response => setIsValidated(response.data))
                    .catch(error => console.error('Error fetching pending request status:', error));
            }
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="container-fluid px-4 py-4">
                <Navbar isAuthenticated={isAuthenticated} userId={userId} handleLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/hospitals" element={<HospitalsPage />} />
                    <Route path="/doctor/:id" element={<DoctorProfilePage />} />
                    <Route path="/hospital/:id" element={<HospitalProfilePage />} />
                    <Route path="/profile/:id" element={<DoctorProfilePage />} />
                    <Route path="/validate/:id" element={<ValidatePage />} />
                    <Route path="/patient-profile/:id" element={<UserProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
