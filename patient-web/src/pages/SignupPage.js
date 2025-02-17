import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "patient",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [validation, setValidation] = useState({
        minLength: false,
        uppercase: false,
        specialChar: false,
        number: false,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setValidation({
            minLength: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            number: /\d/.test(value),
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5250/api/Auth/Signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to sign up.");
                return;
            }

            navigate("/login"); // Redirect to login page
        } catch (err) {
            setError("An error occurred during signup. Please try again later.");
            console.error(err);
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="container py-4">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
                <h2 className="mb-4 text-center">Qeydiyyatdan keç</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Ad</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Soyad</label>
                        <input
                            type="text"
                            name="surname"
                            value={user.surname}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Şifrə</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="btn btn-outline-secondary"
                            >
                            {showPassword ? "🔓" : "🔒"}
                            </button>
                        </div>
                        <div className="mt-2">
                            <p>Şifrə qeyd olunan tələblərə uymalıdır:</p>
                            <ul>
                                <li style={{ color: validation.minLength ? "green" : "red" }}>
                                    Ən azı 8 simvol
                                </li>
                                <li style={{ color: validation.uppercase ? "green" : "red" }}>
                                    Ən azı 1 böyük hərf
                                </li>
                                <li style={{ color: validation.specialChar ? "green" : "red" }}>
                                    Ən azı 1 xüsusi simvol (!, @, #, etc.)
                                </li>
                                <li style={{ color: validation.number ? "green" : "red" }}>
                                    Ən azı 1 rəqəm
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Qeydiyyatdan keç</button>
                </form>
                <p className="mt-3 text-center">
                    Artıq hesabınız var?{" "}
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={handleLoginRedirect}
                    >
                        Daxil ol
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
