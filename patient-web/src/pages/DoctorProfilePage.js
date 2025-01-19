import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DoctorProfilePage = () => {
    const { id } = useParams(); // Getting the doctor ID from the URL parameters
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`http://localhost:5250/Doctor/${id}`); // Correct API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDoctor(data);
            } catch (error) {
                console.error('Failed to fetch doctor data:', error);
            }
        };

        fetchDoctor();
    }, [id]); // Only refetch when the `id` parameter changes

    if (!doctor) {
        return <div className="text-center">Loading...</div>; // Show loading message if doctor data is not yet loaded
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Doctor Profile</h1>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{doctor.name} {doctor.surname}</h2>
                    <p><strong>Specialty:</strong> {doctor.speciality}</p>
                    <p><strong>Email:</strong> {doctor.mail}</p>
                    <p><strong>Phone:</strong> {doctor.phone}</p>
                    <p><strong>Rating:</strong> {doctor.rating}</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;
