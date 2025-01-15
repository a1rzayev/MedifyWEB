import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('/api/doctors'); // Замените на ваш API
            const data = await response.json();
            setDoctors(data);
        };

        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.surname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Список докторов</h1>

            {/* Строка поиска */}
            <input
                type="text"
                placeholder="Поиск по имени или фамилии..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            />

            {/* Карточки докторов */}
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
                        <p><strong>Специальность:</strong> {doctor.speciality}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsPage;
