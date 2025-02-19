import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfilePage = () => {
    const { id } = useParams(); // Get the 'id' from the URL
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
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('accessToken') !== null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect if not authenticated
        }
    }, [isAuthenticated, navigate]);

    // Fetch user data using the 'id' from the URL
    useEffect(() => {
        if (isAuthenticated && id) {
            axios.get(`http://localhost:5250/api/Patient/${id}`)
                .then(response => {
                    setUser(response.data);
                    setIsLoading(false);
                })
                .catch(() => {
                    setError('Failed to load user data.');
                    setIsLoading(false);
                });
        }
    }, [isAuthenticated, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setUser(prev => ({ ...prev, avatar: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const handleSave = () => {
        console.log('User data saved:', user);
        // Optionally, send a PUT request to save changes
        // axios.put(`http://localhost:5250/api/Patient/${id}`, user)
        //     .then(() => alert('Profile updated!'))
        //     .catch(() => alert('Failed to save changes.'));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container py-4">
            <h1 className="mb-4">User Profile</h1>

            <div className="d-flex align-items-center mb-4">
                <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="rounded-circle me-3"
                    style={{ width: '150px', height: '150px' }}
                />
                <input type="file" className="form-control" onChange={handleAvatarChange} />
            </div>

            <form style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" name="surname" value={user.surname} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" name="birthdate" value={user.birthdate} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select name="gender" value={user.gender} onChange={handleChange} className="form-select">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" name="phone" value={user.phone} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Date Joined</label>
                    <input type="date" name="dateJoined" value={user.dateJoined} readOnly className="form-control" />
                </div>

                <button type="button" className="btn btn-danger mt-3 me-2" onClick={handleLogout}>Logout</button>
                <button type="button" className="btn btn-primary mt-3" onClick={handleSave}>Save Changes</button>
            </form>
        </div>
    );
};

export default UserProfilePage;
