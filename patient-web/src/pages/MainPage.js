import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const API_BASE_URL = "http://localhost:5250/";

const MainPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('accessToken') !== null);
    const [id, setId] = useState(null);
    const [logs, setLogs] = useState([]);
    const [states, setStates] = useState([]);
    

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const decodedToken = jwtDecode(token);
                const extractedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                setId(extractedUserId);
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchRequestStates = async () => {
            try {
                const response = await axios.get("http://localhost:5250/api/Enum/RequestStates");
                setStates(response.data);
            } catch (error) {
                console.error("Error fetching genders:", error);
            }
        };

        fetchRequestStates();
    }, []);
    useEffect(() => {
        if (id) {  // ✅ Ensure id is not null before fetching
            const fetchLogs = async () => {
                try {
                    const response = await fetch(`http://localhost:5250/api/Patient/RendezvouzRequests/${id}`);
                    const data = await response.json();
                    setLogs(data);
                } catch (error) {
                    console.error("Failed to fetch logs:", error);
                }
            };

            fetchLogs();
        }
    }, [id]);
    const stateMap = {
        [states[0]]: 0, // "Approved" -> 0
        [states[1]]: 1, // "Pending" -> 1
        [states[2]]: 2  // "Denied" -> 2
    };
    const acceptedLogs = logs.filter(log => log.state === 0 || Number(log.State) === 0);
    const rejectedLogs = logs.filter(log => log.state === 2 || Number(log.State) === 2);
    const pendingLogs = logs.filter(log => log.state === 1 || Number(log.State) === 1);



    return (
        <div className="container mt-5">
            <h1 className="text-center">Randevu Müraciətləri</h1>
            <div className="row">
                <div className="col-md-4">
                    <h2 className="text-success">Qəbul Edilənlər</h2>
                    <ul className="list-group">
                        {acceptedLogs.map(log => (
                            <li key={log.id} className="list-group-item">
                                <strong>Patient ID:</strong><Link to={`/patient-profile/${log.patientId}`}> {log.patientId}</Link>
                                <p><strong>Vaxt:</strong> {new Date(log.dateTime).toLocaleString()}</p>
                                <p><strong>Təsvir:</strong> {log.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <h2 className="text-danger">İmtina Edilənlər</h2>
                    <ul className="list-group">
                        {rejectedLogs.map(log => (
                            <li key={log.id} className="list-group-item">
                                <strong>Patient ID:</strong><Link to={`/patient-profile/${log.patientId}`}> {log.patientId}</Link>
                                <p><strong>Vaxt:</strong> {new Date(log.dateTime).toLocaleString()}</p>
                                <p><strong>Təsvir:</strong> {log.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <h2 className="text-warning">Gözləyənlər</h2>
                    <ul className="list-group">
                        {pendingLogs.map(log => (
                            <li key={log.id} className="list-group-item">
                                <strong>Patient ID:</strong><Link to={`/patient-profile/${log.patientId}`}> {log.patientId}</Link>
                                <p><strong>Vaxt:</strong> {new Date(log.dateTime).toLocaleString()}</p>
                                <p><strong>Təsvir:</strong> {log.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MainPage;


