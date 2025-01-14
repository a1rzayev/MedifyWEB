import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalsPage = () => {
    const [hospitals, setHospitals] = useState([]); // Список больниц
    const [searchTerm, setSearchTerm] = useState(''); // Текст поиска
    const [ratingFilter, setRatingFilter] = useState(''); // Фильтр по рейтингу
    const navigate = useNavigate();

    useEffect(() => {
        // Имитация загрузки данных
        const fetchHospitals = async () => {
            const response = await fetch('/api/hospitals'); // Замените на ваш API
            const data = await response.json();
            setHospitals(data);
        };

        fetchHospitals();
    }, []);

    const filteredHospitals = hospitals.filter(hospital => {
        return (
            hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (ratingFilter === '' || hospital.rating === Number(ratingFilter))
        );
    });

    const handleHospitalClick = (id) => {
        navigate(`/hospital/${id}`); // Перенаправляем на страницу больницы
    };

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

            {/* Фильтр по рейтингу */}
            <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            >
                <option value="">Все рейтинги</option>
                {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>{rating} звезды</option>
                ))}
            </select>

            {/* Таблица больниц */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {filteredHospitals.map(hospital => (
                    <div
                        key={hospital.id}
                        onClick={() => handleHospitalClick(hospital.id)}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            width: '200px'
                        }}
                    >
                        <h3>{hospital.name}</h3>
                        <p><strong>Адрес:</strong> {hospital.address}</p>
                        <p><strong>Рейтинг:</strong> {hospital.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalsPage;
