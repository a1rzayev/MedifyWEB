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


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container py-4">
            <h1 className="mb-4">User Profile</h1>


            <form style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <label type="text" name="name" value={user.name} className="form-control" >{user.name}</label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <label type="text" name="name" value={user.name} className="form-control" >{user.name}</label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Date of Birth</label>
                    <label type="text" name="name" value={user.name} className="form-control" >{user.birthdate}</label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <label type="text" name="name" value={user.name} className="form-control" >{user.gender}</label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <label type="text" name="name" value={user.name} className="form-control" >{user.phone}</label>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <label type="text" name="name" value={user.name} className="form-control" >{user.email}</label>
                </div>
            </form>
        </div>
    );
};

export default UserProfilePage;
