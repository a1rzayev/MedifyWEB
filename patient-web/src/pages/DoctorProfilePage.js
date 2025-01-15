import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DoctorProfilePage = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            const response = await fetch(`/api/Doctors/${id}`); // Замените на ваш API
            const data = await response.json();
            setDoctor(data);
        };

        fetchDoctor();
    }, [id]);

    if (!doctor) {
        return <div>Загрузка...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Профиль доктора</h1>
            <h2>{doctor.name} {doctor.surname}</h2>
            <p><strong>Специальность:</strong> {doctor.speciality}</p>
            <p><strong>Электронная почта:</strong> {doctor.mail}</p>
            <p><strong>Телефон:</strong> {doctor.phone}</p>
            <p><strong>Рейтинг:</strong> {doctor.rating}</p>
        </div>
    );
};

export default DoctorProfilePage;