import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MainPage = () => {
    const { id } = useParams();
    const [logs, setLogs] = useState([]);
    
    useEffect(() => {
        const fetchLogs = async () => {
            const response = await fetch('http://localhost:5250/Log'); // Replace with the correct endpoint
            const data = await response.json();
            setLogs(data);
        };

        fetchLogs();
    }, []);

    // Filter logs into two categories: accepted and rejected
    const acceptedLogs = logs.filter(log => log.status === 'accepted');
    const rejectedLogs = logs.filter(log => log.status === 'rejected');

    return (
        <div className="container mt-5">
            <h1 className="text-center">Rendez-vous Requests</h1>

            <div className="mt-4">
                <h2>Accepted Requests</h2>
                <ul className="list-group">
                    {acceptedLogs.map((log) => (
                        <li key={log.id} className="list-group-item">
                            <p><strong>Doctor:</strong> {log.doctorName}</p>
                            <p><strong>Patient:</strong> {log.patientName}</p>
                            <p><strong>Description:</strong> {log.description}</p>
                            <p><strong>Date:</strong> {new Date(log.date).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h2>Rejected Requests</h2>
                <ul className="list-group">
                    {rejectedLogs.map((log) => (
                        <li key={log.id} className="list-group-item">
                            <p><strong>Doctor:</strong> {log.doctorName}</p>
                            <p><strong>Patient:</strong> {log.patientName}</p>
                            <p><strong>Description:</strong> {log.description}</p>
                            <p><strong>Date:</strong> {new Date(log.date).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MainPage;
