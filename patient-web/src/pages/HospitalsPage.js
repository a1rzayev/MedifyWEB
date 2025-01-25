import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalsPage = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHospitalType, setSelectedHospitalType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHospitals = async () => {
            const response = await fetch('http://localhost:5250/api/Hospital'); // Replace with your API
            const data = await response.json();
            setHospitals(data);
        };

        fetchHospitals();
    }, []);

    const filteredHospitals = hospitals.filter(hospital => {
        const matchesName = hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedHospitalType ? hospital.type === selectedHospitalType : true;
        return matchesName && matchesType;
    });

    const hospitalTypes = [
        'General', 'Specialized', 'Research', 'Teaching', 'Pediatric', 'Maternity', 
        'Surgical', 'Psychiatric', 'Rehabilitation', 'Emergency', 'Oncology', 
        'Cardiology', 'Orthopedic', 'BurnUnit', 'Renal', 'Dental', 'EyeCare', 'Urology'
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Hospitals List</h1>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by hospital name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            />

            {/* Hospital Type filter */}
            <select
                value={selectedHospitalType}
                onChange={(e) => setSelectedHospitalType(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            >
                <option value="">Select Hospital Type</option>
                {hospitalTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {/* Hospitals cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredHospitals.map(hospital => (
                    <div
                        key={hospital.id}
                        onClick={() => navigate(`/hospital/${hospital.id}`)}
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
                            src={hospital.photo || 'https://via.placeholder.com/150'}
                            alt={hospital.name}
                            style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
                        />
                        <h3>{hospital.name}</h3>
                        <p><strong>Address:</strong> {hospital.address}</p>
                        <p><strong>Type:</strong> {hospital.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalsPage;
