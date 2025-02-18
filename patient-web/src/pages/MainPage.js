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

const MainPage = () => {
    // JSON data directly inside the component
    const [logs, setLogs] = useState([
        { id: 1, doctorName: "Dr. Elçin Quliyev", patientName: "Aytən Rüstəmova", description: "Ümumi müayinə", date: "2025-02-20T10:30:00Z", status: "accepted" },
        { id: 2, doctorName: "Dr. Leyla Məmmədova", patientName: "Aytən Rüstəmova", description: "Qan analizinin nəticələri", date: "2025-02-18T15:45:00Z", status: "accepted" },
        { id: 3, doctorName: "Dr. Ramil Hüseynov", patientName: "Aytən Rüstəmova", description: "Diş təmizliyi", date: "2025-02-22T09:00:00Z", status: "rejected" },
        { id: 4, doctorName: "Dr. Nigar Həsənova", patientName: "Aytən Rüstəmova", description: "Göz müayinəsi", date: "2025-02-25T13:15:00Z", status: "rejected" },
        { id: 5, doctorName: "Dr. Kamran Əhmədov", patientName: "Aytən Rüstəmova", description: "Bel ağrısı üçün konsultasiya", date: "2025-02-21T11:00:00Z", status: "pending" },
        { id: 6, doctorName: "Dr. Sevinc Rəhimova", patientName: "Aytən Rüstəmova", description: "İllik müayinə", date: "2025-02-19T14:30:00Z", status: "pending" },
        { id: 7, doctorName: "Dr. Elçin Quliyev", patientName: "Aytən Rüstəmova", description: "Rentgen müayinəsi", date: "2025-02-23T16:00:00Z", status: "pending" },
        { id: 8, doctorName: "Dr. Leyla Məmmədova", patientName: "Aytən Rüstəmova", description: "Vitamin testi", date: "2025-02-26T10:45:00Z", status: "accepted" }
    ]);

    // Categorize logs
    const acceptedLogs = logs.filter(log => log.status === 'accepted');
    const rejectedLogs = logs.filter(log => log.status === 'rejected');
    const pendingLogs = logs.filter(log => log.status === 'pending');

    // Handle Approve/Deny Actions
    const handleAction = (id, status) => {
        setLogs(prevLogs =>
            prevLogs.map(log =>
                log.id === id ? { ...log, status } : log
            )
        );
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Randevu Müraciətləri</h1>

            <div className="row">
                {/* Accepted Requests */}
                <div className="col-md-4">
                    <h2 className="text-success">Qəbul Edilənlər</h2>
                    <ul className="list-group">
                        {acceptedLogs.map(log => (
                            <li key={log.id} className="list-group-item">
                                <p><strong>Həkim:</strong> {log.doctorName}</p>
                                <p><strong>Təsvir:</strong> {log.description}</p>
                                <p><strong>Vaxt:</strong> {new Date(log.date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Rejected Requests */}
                <div className="col-md-4">
                    <h2 className="text-danger">İmtina Edilənlər</h2>
                    <ul className="list-group">
                        {rejectedLogs.map(log => (
                            <li key={log.id} className="list-group-item">
                                <p><strong>Həkim:</strong> {log.doctorName}</p>
                                <p><strong>Təsvir:</strong> {log.description}</p>
                                <p><strong>Vaxt:</strong> {new Date(log.date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Pending Requests with Approve/Deny Buttons */}
                <div className="col-md-4">
                    <h2 className="text-warning">Gözləyənlər</h2>
                    <ul className="list-group">
                        {pendingLogs.map(log => (
                            <li key={log.id} className="list-group-item">
                                <p><strong>Həkim:</strong> {log.doctorName}</p>
                                <p><strong>Təsvir:</strong> {log.description}</p>
                                <p><strong>Vaxt:</strong> {new Date(log.date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
