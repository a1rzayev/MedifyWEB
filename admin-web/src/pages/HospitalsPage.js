import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalsPage = () => {
    const [hospitals, setHospitals] = useState([]);
    const [hospitalTypes, setHospitalTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHospitalType, setSelectedHospitalType] = useState('');
    const [newHospital, setNewHospital] = useState({
        name: '',
        address: '',
        phones: '',
        email: '',
    });
    const [errors, setErrors] = useState({});
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
                setHospitalTypes(Array.isArray(data.result) ? data.result : []);
            } catch (error) {
                console.error("Error fetching hospital types:", error);
                setHospitalTypes([]);
            }
        };

        fetchHospitalTypes();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!newHospital.name) newErrors.name = "Name is required.";
        if (!newHospital.address) newErrors.address = "Address is required.";
        if (!newHospital.phones) newErrors.phones = "At least one phone number is required.";
        if (!newHospital.email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(newHospital.email)) newErrors.email = "Invalid email format.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const hospitalData = {
        name: newHospital.name,
        address: newHospital.address,
        email: newHospital.email,
        phones: newHospital.phones.split(',').map(phone => phone.trim()) // Split by commas and trim spaces
    };

    try {
        const response = await fetch('http://localhost:5250/api/Hospital', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hospitalData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData);
            // Optionally handle validation errors here
            return;
        }

        // Assuming successful submission, you can redirect or reset the form here
        alert('Hospital added successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
};


    const filteredHospitals = hospitals.filter(hospital => {
        const matchesName = hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedHospitalType ? hospital.type === selectedHospitalType : true;
        return matchesName && matchesType;
    });

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary mb-4">Hospitals List</h1>

            {/* Add Hospital Form */}
            <div className="card mb-5">
                <div className="card-header bg-primary text-white">
                    <h4>Add New Hospital</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={newHospital.name}
                                onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                value={newHospital.address}
                                onChange={(e) => setNewHospital({ ...newHospital, address: e.target.value })}
                            />
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phones (comma-separated)</label>
                            <input
                                type="text"
                                className={`form-control ${errors.phones ? 'is-invalid' : ''}`}
                                placeholder="e.g., +1234567890, +0987654321"
                                value={newHospital.phones}
                                onChange={(e) => setNewHospital({ ...newHospital, phones: e.target.value })}
                            />
                            {errors.phones && <div className="invalid-feedback">{errors.phones}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={newHospital.email}
                                onChange={(e) => setNewHospital({ ...newHospital, email: e.target.value })}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <button type="submit" className="btn btn-success">Add Hospital</button>
                    </form>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by hospital name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <select
                    className="form-select"
                    value={selectedHospitalType}
                    onChange={(e) => setSelectedHospitalType(e.target.value)}
                >
                    <option value="">Select Hospital Type</option>
                    {hospitalTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
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
                                <p className="card-text"><strong>Address:</strong> {hospital.address}</p>
                                <p className="card-text"><strong>Type:</strong> {hospital.type}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalsPage;
