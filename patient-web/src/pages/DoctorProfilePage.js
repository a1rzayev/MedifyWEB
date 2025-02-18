import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DoctorProfilePage = () => {
    const { id } = useParams(); // Getting the doctor ID from the URL parameters
    const [doctor, setDoctor] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("accessToken") !== null);
    const [userId, setUserId] = useState(null);
    const [dateTime, setDateTime] = useState(""); // State for DateTime
    const [description, setDescription] = useState(""); // State for Description
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const decodedToken = jwtDecode(token);
                const extractedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                setUserId(extractedUserId);
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`http://localhost:5250/api/Doctor/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setDoctor(data);
            } catch (error) {
                console.error("Failed to fetch doctor data:", error);
            }
        };

        fetchDoctor();
    }, [id]);

    const handleRequest = async () => {
        try {
            const response = await fetch(`http://localhost:5250/api/Patient/RendezvouzRequest/${id}/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dateTime: dateTime,
                    description: description,
                }),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            const data = await response.json();
            console.log("Response:", data);
            alert("Rendezvous request sent successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send request");
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    if (!doctor) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary">Həkim Profili</h1>
            <div className="card shadow-lg mx-auto" style={{ maxWidth: "400px" }}>
                <div className="card-body">
                    <h2 className="card-title">{doctor.name} {doctor.surname}</h2>
                    <p><strong>İxtisas:</strong> {doctor.speciality}</p>
                    <p><strong>Reytinq:</strong> ⭐ {doctor.rating}</p>
                    
                    {isAuthenticated ? (
                        <>
                            <div className="form-group">
                                <label>Tarix və Saat:</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    value={dateTime}
                                    onChange={(e) => setDateTime(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label>Açıqlama:</label>
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Müraciətin məqsədini qeyd edin..."
                                />
                            </div>
                            <button
                                onClick={handleRequest}
                                className="btn btn-warning mt-3 w-100"
                            >
                                Müraciət et
                            </button>
                        </>
                    ) : (
                        <p>
                            Müraciət etmək üçün hesabınıza daxil olun{" "}
                            <a className="btn-link text-center" onClick={handleLoginRedirect}>
                                Daxil ol
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;
