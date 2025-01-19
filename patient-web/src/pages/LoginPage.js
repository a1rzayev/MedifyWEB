import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5250/Auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Optionally, you can store the token and redirect
            // localStorage.setItem('token', data.token);
            navigate('/user-profile');
        } catch (err) {
            setError('Invalid credentials or an error occurred. Please try again.');
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
                        value={credentials.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
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
