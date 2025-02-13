import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DoctorsPage from './pages/DoctorsPage';
import HospitalsPage from './pages/HospitalsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import HospitalProfilePage from './pages/HospitalProfilePage';
import ValidatePage from './pages/ValidatePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import { jwtDecode } from 'jwt-decode';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('accessToken') !== null
    );
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem('accessToken');
            console.log(`token: ${token}`);
            if (token) {
                const decodedToken = jwtDecode(token);
                const extractedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                console.log(`userId: ${extractedUserId}`);
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
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-success rounded mb-4">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand text-white">Medify<h6>Doctors</h6></Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            {/* Left Side - Doctors and Hospitals */}
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link to="/doctors" className="nav-link text-white">Doctors</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/hospitals" className="nav-link text-white">Hospitals</Link>
                                </li>
                            </ul>

                            {/* Right Side - Authentication */}
                            <ul className="navbar-nav ms-auto d-flex align-items-center">
                                {isAuthenticated ? (
                                    <>
                                        <li className="nav-item">
                                            <Link to={`/profile/${userId}`} className="nav-link text-white d-flex align-items-center">
                                                <img
                                                    src="https://via.placeholder.com/40"
                                                    alt="User Avatar"
                                                    className="rounded-circle me-2"
                                                    style={{ width: '40px', height: '40px' }}
                                                />
                                                Profile
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={`/validate/${userId}`} className="nav-link text-white d-flex align-items-center">
                                                Validate
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className="btn btn-link nav-link text-white"
                                                style={{ textDecoration: 'none' }}
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item d-flex">
                                        <Link to="/login" className="nav-link text-white">Login</Link>
                                        <Link to="/signup" className="nav-link text-white">Sign Up</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Routing Pages */}
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/hospitals" element={<HospitalsPage />} />
                    <Route path="/doctor/:id" element={<DoctorProfilePage />} />
                    <Route path="/hospital/:id" element={<HospitalProfilePage />} />
                    <Route path="/profile/:id" element={<DoctorProfilePage />} />
                    <Route path="/validate/:id" element={<ValidatePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
