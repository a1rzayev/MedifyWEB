import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        birthdate: '',
        gender: '',
        phone: '',
        email: '',
        dateJoined: '',
        avatar: 'https://via.placeholder.com/150',
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Dummy authentication check (you can replace this with your actual logic)
    const isAuthenticated = localStorage.getItem('accessToken') !== null; // Replace with your actual authentication check

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login page if not authenticated
        }
    }, [isAuthenticated, navigate]);

    // Fetch user data
    useEffect(() => {
        if (isAuthenticated) {
            const userId = 1; // Example: you can get the user ID dynamically if needed

            axios.get(`http://localhost:5250/api/Patient/${userId}`)
                .then(response => {
                    setUser(response.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError('Failed to load user data.');
                    setIsLoading(false);
                });
        }
    }, [isAuthenticated]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setUser({ ...user, avatar: reader.result });
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Save changes logic (for now just logs to the console)
        console.log('User data saved:', user);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container py-4">
            <h1 className="mb-4">User Profile</h1>

            {/* Avatar and File Upload */}
            <div className="d-flex align-items-center mb-4">
                <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="rounded-circle me-3"
                    style={{ width: '150px', height: '150px' }}
                />
                <input type="file" className="form-control" onChange={handleAvatarChange} />
            </div>

            {/* Form */}
            <form style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={user.birthdate}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Date Joined</label>
                    <input
                        type="date"
                        name="dateJoined"
                        value={user.dateJoined}
                        readOnly
                        className="form-control"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    className="btn btn-primary mt-3"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UserProfilePage;
