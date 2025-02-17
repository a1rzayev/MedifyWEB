import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import DoctorsPage from './pages/DoctorsPage';
import PatientsPage from './pages/PatientsPage';
import HospitalsPage from './pages/HospitalsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import HospitalProfilePage from './pages/HospitalProfilePage';
import MainPage from './pages/MainPage';
import { jwtDecode } from 'jwt-decode';
import VerifyRequestsPage from './pages/VerifyRequestsPage';
import LoginPage from './pages/LoginPage';

const Navbar = ({ isAuthenticated, userId, handleLogout }) => {
    const location = useLocation();

    // Function to check if a link is active
    const isActive = (path) => location.pathname === path ? 'bg-dark text-danger' : '';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger rounded shadow-lg p-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-white fw-bold fs-4">
                    Medify <span className="fs-6">Admin</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Navigasiyanı aç/qapat"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {/* Main Page Button */}
                        <li className="nav-item">
                            <Link to="/" className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive('/')}`}>
                                🏠 Ana Səhifə
                            </Link>
                        </li>
                        {/* Doctors Button */}
                        <li className="nav-item">
                            <Link to="/doctors" className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive('/doctors')}`}>
                                👨‍⚕️ Həkimlər
                            </Link>
                        </li>
                        {/* Patients Button */}
                        <li className="nav-item">
                            <Link to="/patients" className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive('/patients')}`}>
                                😷 Pasientlər
                            </Link>
                        </li>
                        {/* Hospitals Button */}
                        <li className="nav-item">
                            <Link to="/hospitals" className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive('/hospitals')}`}>
                                🏥 Xəstəxanalar
                            </Link>
                        </li>
                        {/* Verify Requests Button */}
                        <li className="nav-item">
                            <Link to="/verifyrequests" className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive('/verifyrequests')}`}>
                                ✅ Təsdiqləmə
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link to={`/profile/${userId}`} className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive(`/profile/${userId}`)}`}>
                                        <img
                                            src="https://via.placeholder.com/40"
                                            alt="İstifadəçi Avatarı"
                                            className="rounded-circle border border-light me-2"
                                            style={{ width: '40px', height: '40px' }}
                                        />
                                        Profil
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/validate/${userId}`} className={`nav-link text-white fs-5 fw-semibold rounded-pill p-3 ${isActive(`/validate/${userId}`)}`}>
                                        🔍 Doğrula
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light ms-3 px-4 py-2 rounded-pill"
                                        onClick={handleLogout}
                                    >
                                        🚪 Çıxış
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item d-flex">
                                <Link to="/login" className="btn btn-light text-danger fw-bold px-4 py-2 rounded-pill">
                                    🔑 Giriş
                                </Link>
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

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const decodedToken = jwtDecode(token);
                const extractedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                setUserId(extractedUserId);
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated !== (localStorage.getItem('accessToken') !== null)) {
            window.location.reload();
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

                <div className="mt-4">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/doctors" element={<DoctorsPage />} />
                        <Route path="/patients" element={<PatientsPage />} />
                        <Route path="/hospitals" element={<HospitalsPage />} />
                        <Route path="/doctor/:id" element={<DoctorProfilePage />} />
                        <Route path="/hospital/:id" element={<HospitalProfilePage />} />
                        <Route path="/profile/:id" element={<DoctorProfilePage />} />
                        <Route path="/verifyrequests/" element={<VerifyRequestsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
