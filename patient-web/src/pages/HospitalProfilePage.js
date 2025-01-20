import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HospitalProfilePage = () => {
    const { id } = useParams(); // Getting the hospital ID from the URL parameters
    const [hospital, setHospital] = useState(null);

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                const response = await fetch(`http://localhost:5250/api/Hospital/${id}`); // Correct API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHospital(data);
            } catch (error) {
                console.error('Failed to fetch hospital data:', error);
            }
        };

        fetchHospital();
    }, [id]); // Only refetch when the `id` parameter changes

    if (!hospital) {
        return <div className="text-center">Loading...</div>; // Show loading message if hospital data is not yet loaded
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Hospital Profile</h1>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{hospital.name}</h2>
                    <p><strong>Address:</strong> {hospital.address}</p>
                    <p><strong>Email:</strong> {hospital.email}</p>
                    <p><strong>Phone Numbers:</strong> {hospital.phones.join(', ')}</p>
                    <p><strong>Website:</strong> <a href={hospital.website} target="_blank" rel="noopener noreferrer">{hospital.website}</a></p>
                    <p><strong>Type:</strong> {hospital.type}</p>
                </div>
            </div>
        </div>
    );
};

export default HospitalProfilePage;
