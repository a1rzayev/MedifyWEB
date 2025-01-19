import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalsPage = () => {
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHospitals = async () => {
            const response = await fetch('/api/Hospital'); // Замените на ваш API
            const data = await response.json();
            setHospitals(data);
        };

        fetchHospitals();
    }, []);

    const filteredHospitals = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Список больниц</h1>

            {/* Строка поиска */}
            <input
                type="text"
                placeholder="Поиск по названию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            />

            {/* Карточки больниц */}
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
                        <p><strong>Адрес:</strong> {hospital.address}</p>
                        <p><strong>Тип:</strong> {hospital.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalsPage;
