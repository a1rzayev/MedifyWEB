import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Test data for patients
        const fetchedPatients = [
            {
              "id": 1,
              "name": "Samir",
              "surname": "Mammadov",
            },
            {
              "id": 2,
              "name": "Aysel",
              "surname": "Huseynova",
            },
            {
              "id": 3,
              "name": "Elvin",
              "surname": "Ismayilov",
            },
            {
              "id": 4,
              "name": "Aysel",
              "surname": "Veliyeva",
            },
            {
              "id": 5,
              "name": "Leyla",
              "surname": "Aslanova",
            },
            {
              "id": 6,
              "name": "Sami",
              "surname": "Abdullayev",
            },
            {
              "id": 7,
              "name": "Elvin",
              "surname": "Bashirov",
            },
            {
              "id": 8,
              "name": "Sabina",
              "surname": "Taghiyeva",
            },
            {
              "id": 9,
              "name": "Seda",
              "surname": "Mirzayeva",
            },
            {
              "id": 10,
              "name": "Ramin",
              "surname": "Ismayilov",
            },
        ];

        setPatients(fetchedPatients);
    }, []);

    const filteredPatients = patients.filter(patient => {
        const matchesName = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            patient.surname.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesName;
    });

    // Function to generate avatar initials
    const getAvatarInitials = (name, surname) => {
        return `${name[0]}${surname[0]}`.toUpperCase();
    };

    const handleEdit = (id) => {
        console.log(`Edit patient with id: ${id}`);
    };

    const handleBan = (id) => {
        console.log(`Ban patient with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete patient with id: ${id}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Patients List</h1>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by name or surname..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            />

            {/* Patients cards in a row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' }}>
                {filteredPatients.map(patient => (
                    <div
                        key={patient.id}
                        onClick={() => navigate(`/patient/${patient.id}`)}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            width: '200px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        {/* Avatar with initials */}
                        <div
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                backgroundColor: '#3498db', // You can customize the background color
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '24px',
                                marginBottom: '10px'
                            }}
                        >
                            {getAvatarInitials(patient.name, patient.surname)}
                        </div>

                        <h3>{patient.name} {patient.surname}</h3>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={(e) => { e.stopPropagation(); handleEdit(patient.id); }} className="btn btn-warning">Edit</button>
                            <button onClick={(e) => { e.stopPropagation(); handleBan(patient.id); }} className="btn btn-danger">Ban</button>
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(patient.id); }} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientsPage;
