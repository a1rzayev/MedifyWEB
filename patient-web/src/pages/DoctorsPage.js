import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]); // Список докторов
    const [searchTerm, setSearchTerm] = useState(''); // Текст поиска
    const [specialityFilter, setSpecialityFilter] = useState(''); // Фильтр по специальности
    const [specialities, setSpecialities] = useState([]); // Доступные специальности
    const navigate = useNavigate();

    useEffect(() => {
        // Имитация загрузки данных
        const fetchDoctors = async () => {
            const response = await fetch('/api/doctors'); // Замените на ваш API
            const data = await response.json();
            setDoctors(data);

            // Извлекаем уникальные специальности для фильтрации
            const uniqueSpecialities = [...new Set(data.map(doc => doc.speciality))];
            setSpecialities(uniqueSpecialities);
        };

        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doc => {
        return (
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (specialityFilter === '' || doc.speciality === specialityFilter)
        );
    });

    const handleDoctorClick = (id) => {
        navigate(`/doctor/${id}`); // Перенаправляем на страницу доктора
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Список докторов</h1>

            {/* Строка поиска */}
            <input
                type="text"
                placeholder="Поиск по имени..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            />

            {/* Фильтр по специальности */}
            <select
                value={specialityFilter}
                onChange={(e) => setSpecialityFilter(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            >
                <option value="">Все специальности</option>
                {specialities.map(speciality => (
                    <option key={speciality} value={speciality}>{speciality}</option>
                ))}
            </select>

            {/* Таблица докторов */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredDoctors.map(doctor => (
                    <div
                        key={doctor.id}
                        onClick={() => handleDoctorClick(doctor.id)}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            width: '200px'
                        }}
                    >
                        <h3>{doctor.name}</h3>
                        <p><strong>Специальность:</strong> {doctor.speciality}</p>
                        <p><strong>Рейтинг:</strong> {doctor.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsPage;
