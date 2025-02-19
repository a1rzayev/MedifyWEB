import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id,
        name: "",
        surname: "",
        birthdate: "",
        gender: "",
        phone: "",
        email: "",
        passwordHash: "",
    });

    const [genders, setGenders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5250/api/Enum/Genders")
            .then(response => setGenders(response.data))
            .catch(error => console.error("Cinslər yüklənərkən xəta baş verdi", error));

        axios.get(`http://localhost:5250/api/Patient/${id}`)
            .then(response => {
                setUser(prevUser => ({
                    ...prevUser,
                    name: response.data.name,
                    surname: response.data.surname,
                    birthdate: response.data.birthdate,
                    gender: response.data.gender,
                    phone: response.data.phone,
                    email: response.data.email,
                }));
            })
            .catch(error => console.error("İstifadəçi məlumatları yüklənərkən xəta baş verdi", error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:5250/api/Patient/${id}`,
                { ...user, gender: genders[user.gender] }
            );
            alert("Məlumatlar uğurla yeniləndi!");
            navigate("/");
        } catch (error) {
            console.error("İstifadəçi yenilənmədi", error);
            alert("Məlumatları yeniləmək mümkün olmadı.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4 w-50">
                <h2 className="text-center text-primary">Profil Məlumatlarını Yenilə</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Ad</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Adınızı daxil edin"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Soyad</label>
                        <input
                            type="text"
                            name="surname"
                            className="form-control"
                            placeholder="Soyadınızı daxil edin"
                            value={user.surname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Doğum tarixi</label>
                        <input
                            type="date"
                            name="birthdate"
                            className="form-control"
                            value={user.birthdate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cins</label>
                        <select
                            name="gender"
                            className="form-select"
                            value={user.gender}
                            onChange={handleChange}
                        >
                            <option value="">Cins seçin</option>
                            {genders.map((gender, index) => (
                                <option key={index} value={index}>
                                    {gender}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Telefon</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Telefon nömrənizi daxil edin"
                            value={user.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email ünvanınızı daxil edin"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Yeni şifrə</label>
                        <input
                            type="password"
                            name="passwordHash"
                            className="form-control"
                            placeholder="Yeni şifrə təyin edin"
                            value={user.passwordHash}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Yenilə
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserProfilePage;
