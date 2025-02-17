// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const MainPage = () => {
//     const { id } = useParams();
//     const [logs, setLogs] = useState([]);
    
//     useEffect(() => {
//         const fetchLogs = async () => {
//             const response = await fetch('http://localhost:5250/api/Log'); // Replace with the correct endpoint
//             const data = await response.json();
//             setLogs(data);
//         };

//         fetchLogs();
//     }, []);

//     // Filter logs into two categories: accepted and rejected
//     const acceptedLogs = logs.filter(log => log.status === 'accepted');
//     const rejectedLogs = logs.filter(log => log.status === 'rejected');

//     return (
//         <div className="container mt-5">
//             <h1 className="text-center">Rendez-vous Requests</h1>

//             <div className="mt-4">
//                 <h2>Accepted Requests</h2>
//                 <ul className="list-group">
//                     {acceptedLogs.map((log) => (
//                         <li key={log.id} className="list-group-item">
//                             <p><strong>Doctor:</strong> {log.doctorName}</p>
//                             <p><strong>Patient:</strong> {log.patientName}</p>
//                             <p><strong>Description:</strong> {log.description}</p>
//                             <p><strong>Date:</strong> {new Date(log.date).toLocaleString()}</p>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <div className="mt-4">
//                 <h2>Rejected Requests</h2>
//                 <ul className="list-group">
//                     {rejectedLogs.map((log) => (
//                         <li key={log.id} className="list-group-item">
//                             <p><strong>Doctor:</strong> {log.doctorName}</p>
//                             <p><strong>Patient:</strong> {log.patientName}</p>
//                             <p><strong>Description:</strong> {log.description}</p>
//                             <p><strong>Date:</strong> {new Date(log.date).toLocaleString()}</p>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default MainPage;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MainPage = () => {
    const { id } = useParams();
    
    const [logs, setLogs] = useState([
        { id: 1, doctorName: "Dr. Elçin Quliyev", patientName: "Murad Əliyev", description: "Ümumi müayinə", date: "2025-02-17T10:30:00Z", status: "accepted" },
        { id: 2, doctorName: "Dr. Leyla Məmmədova", patientName: "Aytən Rüstəmova", description: "Qan analizinin nəticələri", date: "2025-02-18T14:00:00Z", status: "accepted" },
        { id: 3, doctorName: "Dr. Ramil Hüseynov", patientName: "Cavid Orucov", description: "Diş təmizliyi", date: "2025-02-19T09:15:00Z", status: "rejected" },
        { id: 4, doctorName: "Dr. Nigar Həsənova", patientName: "Günay Vəliyeva", description: "Göz müayinəsi", date: "2025-02-20T11:45:00Z", status: "rejected" },
        { id: 5, doctorName: "Dr. Kamran Əhmədov", patientName: "Fuad İsmayılov", description: "Bel ağrısı üçün konsultasiya", date: "2025-02-21T11:00:00Z", status: "pending" },
        { id: 6, doctorName: "Dr. Sevinc Rəhimova", patientName: "Nərgiz Abbasova", description: "İllik müayinə", date: "2025-02-19T14:30:00Z", status: "pending" }
    ]);

    const acceptedLogs = logs.filter(log => log.status === 'accepted');
    const rejectedLogs = logs.filter(log => log.status === 'rejected');
    const pendingLogs = logs.filter(log => log.status === 'pending');

    const handleAction = (id, status) => {
        setLogs(prevLogs =>
            prevLogs.map(log =>
                log.id === id ? { ...log, status } : log
            )
        );
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Randevu Müraciətləri</h1>
            <div className="row">
                <div className="col-md-4">
                    <h2 className="text-success">Qəbul Edilənlər</h2>
                    <ul className="list-group">
                        {acceptedLogs.map(log => (
                            <li key={log.id} className="list-group-item">
                                <p><strong>Həkim:</strong> {log.doctorName}</p>
                                <p><strong>Pasient:</strong> {log.patientName}</p>
                                <p><strong>Təsvir:</strong> {log.description}</p>
                                <p><strong>Vaxt:</strong> {new Date(log.date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <h2 className="text-danger">İmtina Edilənlər</h2>
                    <ul className="list-group">
                        {rejectedLogs.map(log => (
                            <li key={log.id} className="list-group-item">
                                <p><strong>Həkim:</strong> {log.doctorName}</p>
                                <p><strong>Pasient:</strong> {log.patientName}</p>
                                <p><strong>Təsvir:</strong> {log.description}</p>
                                <p><strong>Vaxt:</strong> {new Date(log.date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <h2 className="text-warning">Gözləyənlər</h2>
                    <ul className="list-group">
                        {pendingLogs.map(log => (
                            <li key={log.id} className="list-group-item">
                                <p><strong>Həkim:</strong> {log.doctorName}</p>
                                <p><strong>Pasient:</strong> {log.patientName}</p>
                                <p><strong>Təsvir:</strong> {log.description}</p>
                                <p><strong>Vaxt:</strong> {new Date(log.date).toLocaleString()}</p>
                                <button className="btn btn-success btn-sm me-2" onClick={() => handleAction(log.id, 'accepted')}>✅ Qəbul Et</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleAction(log.id, 'rejected')}>❌ İmtina Et</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MainPage;


