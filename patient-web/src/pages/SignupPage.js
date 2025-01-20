import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        role: 'Patient'
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5250/api/Auth/Signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.errors ? data.errors.join(', ') : data.message || 'Failed to sign up.');
                return;
            }

            navigate('/login');
        } catch (err) {
            setError('An error occurred during signup. Please try again.');
            console.error('Signup error:', err);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">Sign Up</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>


                <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>
            </form>

            <div className="mt-3 text-center">
                <p>
                    Already have an account?{' '}
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={handleLoginRedirect}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
