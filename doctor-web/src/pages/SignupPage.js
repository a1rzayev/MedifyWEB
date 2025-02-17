import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "doctor",
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
                <h2 className="mb-4 text-center">Sign Up</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
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
                        <label className="form-label">Surname</label>
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
                        <label className="form-label">Password</label>
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
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <div className="mt-2">
                            <p>Password must meet the following requirements:</p>
                            <ul>
                                <li style={{ color: validation.minLength ? "green" : "red" }}>
                                    At least 8 characters
                                </li>
                                <li style={{ color: validation.uppercase ? "green" : "red" }}>
                                    At least 1 uppercase letter
                                </li>
                                <li style={{ color: validation.specialChar ? "green" : "red" }}>
                                    At least 1 special character (!, @, #, etc.)
                                </li>
                                <li style={{ color: validation.number ? "green" : "red" }}>
                                    At least 1 number
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={handleLoginRedirect}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
