import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const HospitalProfilePage = () => {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);

    useEffect(() => {
        const fetchHospital = async () => {
            const response = await fetch(`/api/hospitals/${id}`); // Замените на ваш API
            const data = await response.json();
            setHospital(data);
        };

        fetchHospital();
    }, [id]);

    if (!hospital) {
        return <div>Загрузка...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Профиль больницы</h1>
            <h2>{hospital.name}</h2>
            <p><strong>Адрес:</strong> {hospital.address}</p>
            <p><strong>Электронная почта:</strong> {hospital.email}</p>
            <p><strong>Телефоны:</strong> {hospital.phones.join(', ')}</p>
            <p><strong>Веб-сайт:</strong> <a href={hospital.website} target="_blank" rel="noopener noreferrer">{hospital.website}</a></p>
            <p><strong>Тип:</strong> {hospital.type}</p>
        </div>
    );
};

export default HospitalProfilePage;
