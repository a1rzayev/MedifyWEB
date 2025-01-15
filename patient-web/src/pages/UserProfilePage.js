import React, { useState } from 'react';

const UserProfilePage = () => {
    const [user, setUser] = useState({
        name: 'Имя',
        surname: 'Фамилия',
        birthdate: '1990-01-01',
        gender: 'Мужчина',
        phone: '+123456789',
        email: 'example@mail.com',
        dateJoined: '2023-01-01',
        avatar: 'https://via.placeholder.com/150',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setUser({ ...user, avatar: reader.result });
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Профиль пользователя</h1>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img
                    src={user.avatar}
                    alt="User Avatar"
                    style={{ width: '150px', height: '150px', borderRadius: '50%', marginRight: '20px' }}
                />
                <input type="file" onChange={handleAvatarChange} />
            </div>

            <form style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>
                    Имя:
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Фамилия:
                    <input
                        type="text"
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Дата рождения:
                    <input
                        type="date"
                        name="birthdate"
                        value={user.birthdate}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Пол:
                    <select
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                    >
                        <option value="Мужчина">Мужчина</option>
                        <option value="Женщина">Женщина</option>
                    </select>
                </label>
                <label>
                    Телефон:
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Электронная почта:
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Дата регистрации:
                    <input
                        type="date"
                        name="dateJoined"
                        value={user.dateJoined}
                        readOnly
                    />
                </label>
                <button type="button" style={{ padding: '10px', marginTop: '10px', background: 'blue', color: 'white' }}>
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
};

export default UserProfilePage;
