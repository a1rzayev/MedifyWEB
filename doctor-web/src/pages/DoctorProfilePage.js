import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const DoctorProfilePage = () => {
    const { id } = useParams(); // Extract doctor ID from URL
    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                if (!id) {
                    throw new Error('Invalid doctor ID');
                }
                const response = await axios.get(`http://localhost:5250/api/Doctor/${id}`);
                setDoctor(response.data);
                setFormData(response.data);

                
                // Check if logged-in user is the owner
                const token = localStorage.getItem('accessToken');
                console.log(`token: ${token}`);
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setIsOwner(decodedToken.id === id);
                    const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                    console.log(`id: ${userId}`);
                    if (userId === id) {
                        setIsOwner(true);
                    } else {
                        setIsOwner(false);
                    }
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching doctor:', error);
            }
        };

        fetchDoctor();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5250/api/Doctor/Update/${id}`, formData);
            setDoctor(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating doctor profile:', error);
            setError('Failed to update profile');
        }
    };

    if (error) {
        return <div className="text-center text-danger">Error: {error}</div>;
    }

    if (!doctor) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Doctor Profile</h1>
            <div className="card">
                <div className="card-body">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="text" name="phone" className="form-control" value={formData.phone || ''} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Birthdate</label>
                                <input type="date" name="birthdate" className="form-control" value={formData.birthdate || ''} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <select name="gender" className="form-control" value={formData.gender || ''} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success">Save Changes</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <h2 className="card-title">{doctor.name} {doctor.surname}</h2>
                            <p><strong>Speciality:</strong> {doctor.speciality}</p>
                            <p><strong>Email:</strong> {doctor.email}</p>
                            <p><strong>Phone:</strong> {doctor.phone}</p>
                            <p><strong>Birthdate:</strong> {doctor.birthdate}</p>
                            <p><strong>Gender:</strong> {doctor.gender}</p>
                            {isOwner && <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>Edit Profile</button>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;
