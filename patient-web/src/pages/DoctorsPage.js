import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('/api/Doctors'); // Replace with your API
            const data = await response.json();
            setDoctors(data);
        };

        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doctor => {
        const matchesName = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            doctor.surname.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty ? doctor.speciality === selectedSpecialty : true;
        return matchesName && matchesSpecialty;
    });

    const specialties = [
        'Cardiologist', 'Neurologist', 'Endocrinologist', 'Pediatrician', 'Surgeon', 
        'Gynecologist', 'Oncologist', 'Dermatologist', 'Orthopedic', 'Psychiatrist', 
        'Rheumatologist', 'InfectiousDiseaseSpecialist', 'Urologist', 'Pulmonologist', 
        'Gastroenterologist', 'Otorhinolaryngologist', 'Radiologist', 'Anesthesiologist', 
        'Pathologist', 'Allergist', 'Hematologist', 'Geriatrician'
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Doctors List</h1>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by name or surname..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            />

            {/* Specialty filter */}
            <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            >
                <option value="">Select Specialty</option>
                {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                        {specialty}
                    </option>
                ))}
            </select>

            {/* Doctors cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredDoctors.map(doctor => (
                    <div
                        key={doctor.id}
                        onClick={() => navigate(`/doctor/${doctor.id}`)}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            width: '200px',
                            textAlign: 'center'
                        }}
                    >
                        <img
                            src={doctor.photo || 'https://via.placeholder.com/150'}
                            alt={`${doctor.name} ${doctor.surname}`}
                            style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
                        />
                        <h3>{doctor.name} {doctor.surname}</h3>
                        <p><strong>Specialty:</strong> {doctor.speciality}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsPage;
