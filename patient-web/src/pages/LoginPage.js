import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [user, setuser] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5250/api/Auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }


            const { accessToken } = await response.json();

            localStorage.setItem("accessToken", accessToken);

            navigate('/user-profile');
        } catch (err) {
            setError('Invalid user or an error occurred. Please try again.');
            console.error('Login error:', err);
        }
    };

    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">Login</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="btn btn-outline-secondary"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
            </form>

            <div className="mt-3 text-center">
                <p>Don't have an account?
                    <a className="btn-link text-center" onClick={handleSignupRedirect}>
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
