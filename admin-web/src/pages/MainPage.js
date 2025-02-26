import React, { useState, useEffect } from 'react';

const MainPage = () => {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 5;  

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch('http://localhost:5250/api/Log');
                const data = await response.json();
                setLogs(data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();
    }, []);

    const totalPages = Math.ceil(logs.length / logsPerPage);

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    const range = 2; 
    for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Tarixçə</h1>

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <ul className="list-group mb-4">
                        {currentLogs.map((log) => (
                            <li key={log.id} className="list-group-item">
                                <p><strong>Həkim:</strong> {log.doctorName}</p>
                                <p><strong>Pasient:</strong> {log.patientName}</p>
                                <p><strong>Təsvir:</strong> {log.description}</p>
                                <p><strong>Vaxt:</strong> {new Date(log.date).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <nav>
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>Əvvəlki</button>
                                </li>

                                {pageNumbers.map((number) => (
                                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(number)}>
                                            {number}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>Növbəti</button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
