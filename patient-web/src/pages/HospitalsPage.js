import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalTypes = {
    General: 'General',
    Specialized: 'Specialized',
    Research: 'Research',
    Teaching: 'Teaching',
    Pediatric: 'Pediatric',
    Maternity: 'Maternity',
    Surgical: 'Surgical',
    Psychiatric: 'Psychiatric',
    Rehabilitation: 'Rehabilitation',
    Emergency: 'Emergency',
    Oncology: 'Oncology',
    Cardiology: 'Cardiology',
    Orthopedic: 'Orthopedic',
    BurnUnit: 'BurnUnit',
    Renal: 'Renal',
    Dental: 'Dental',
    EyeCare: 'EyeCare',
    Urology: 'Urology',
};

const HospitalsPage = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchHospitals = async (search) => {
        try {
            const response = await fetch(`http://localhost:5250/Hospital/${search}`); // Use the searchTerm in the URL
            if (!response.ok) {
                throw new Error('Failed to fetch hospitals');
            }
            const data = await response.json();
            setHospitals(data);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        }
    };

    useEffect(() => {
        if (!searchTerm) {
            fetchAllHospitals();
        }
    }, [searchTerm]);

    const fetchAllHospitals = async () => {
        try {
            const response = await fetch('http://localhost:5250/Hospital'); // Fetch all hospitals if no search term
            if (!response.ok) {
                throw new Error('Failed to fetch hospitals');
            }
            const data = await response.json();
            setHospitals(data);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        }
    };

    // Categorize hospitals by type
    const categorizedHospitals = hospitals.reduce((acc, hospital) => {
        const category = hospital.type || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(hospital);
        return acc;
    }, {});

    const handleSearch = () => {
        fetchHospitals(searchTerm);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Hospitals List</h1>

            {/* Search Bar with Button */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                        padding: '10px',
                        width: '100%',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        padding: '10px',
                        backgroundColor: 'blue',
                        color: 'white',
                        borderRadius: '4px',
                        border: 'none',
                    }}
                >
                    Search
                </button>
            </div>

            {/* Categorized Hospital Cards */}
            {Object.keys(categorizedHospitals).length === 0 ? (
                <p>No hospitals found</p>
            ) : (
                Object.keys(categorizedHospitals).map((category) => (
                    <div key={category} style={{ marginBottom: '40px' }}>
                        <h2>{HospitalTypes[category] || category}</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            {categorizedHospitals[category].map(hospital => (
                                <div
                                    key={hospital.id}
                                    onClick={() => navigate(`/hospital/${hospital.id}`)}
                                    style={{
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        width: '200px',
                                        textAlign: 'center',
                                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <img
                                        src={hospital.photo || 'https://via.placeholder.com/150'}
                                        alt={hospital.name}
                                        style={{
                                            width: '100%',
                                            borderRadius: '8px',
                                            marginBottom: '10px',
                                        }}
                                    />
                                    <h3>{hospital.name}</h3>
                                    <p><strong>Address:</strong> {hospital.address}</p>
                                    <p><strong>Type:</strong> {hospital.type}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default HospitalsPage;
