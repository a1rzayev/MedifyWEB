import React, { useState } from 'react';

const SignupPage = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering:', user);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Surname:
                    <input
                        type="text"
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white' }}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
