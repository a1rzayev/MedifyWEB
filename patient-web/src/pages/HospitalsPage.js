import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalsPage = () => {
    const [hospitals, setHospitals] = useState([]);
    const [hospitalTypes, setHospitalTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHospitalType, setSelectedHospitalType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHospitals = async () => {
            const response = await fetch('http://localhost:5250/api/Hospital');
            const data = await response.json();
            setHospitals(data);
        };

        fetchHospitals();
    }, []);

    useEffect(() => {
        const fetchHospitalTypes = async () => {
            try {
                const response = await fetch('http://localhost:5250/api/Enum/HospitalTypes');
                const data = await response.json();
                console.log("Fetched hospital types:", data);  // Check updated console output
    
                // Access the 'result' property where the array is stored
                setHospitalTypes(Array.isArray(data.result) ? data.result : []);
            } catch (error) {
                console.error("Error fetching hospital types:", error);
                setHospitalTypes([]);  // Prevent map errors on failure
            }
        };
    
        fetchHospitalTypes();
    }, []);
    

    const filteredHospitals = hospitals.filter(hospital => {
        const matchesName = hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedHospitalType ? hospital.type === selectedHospitalType : true;
        return matchesName && matchesType;
    });

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary mb-4">Hospitals List</h1>

            {/* Search bar */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by hospital name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Hospital Type filter */}
            <div className="mb-4">
                <select
                    className="form-select"
                    value={selectedHospitalType}
                    onChange={(e) => setSelectedHospitalType(e.target.value)}
                >
                    <option value="">Select Hospital Type</option>
                    {hospitalTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Hospitals Cards */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredHospitals.map(hospital => (
                    <div className="col" key={hospital.id}>
                        <div
                            className="card shadow-sm"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/hospital/${hospital.id}`)}
                        >
                            <img
                                src={hospital.photo || 'https://via.placeholder.com/300x200?text=Hospital'}
                                alt={hospital.name}
                                className="card-img-top"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{hospital.name}</h5>
                                <p className="card-text">
                                    <strong>Address:</strong> {hospital.address}
                                </p>
                                <p className="card-text">
                                    <strong>Type:</strong> {hospital.type}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalsPage;
