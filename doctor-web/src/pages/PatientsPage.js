import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PatientsPage = () => {
    // Mock test data
    const testPatients = [
        { id: 1, name: "Orxan", surname: "Quliyev", date: "2025-02-18", came: true },
        { id: 2, name: "Nigar", surname: "Əliyeva", date: "2025-02-18", came: false },
        { id: 3, name: "Elvin", surname: "Məmmədov", date: "2025-02-19", came: true },
        { id: 4, name: "Rəşad", surname: "Hüseynov", date: "2025-02-19", came: false }
    ];

    const [selectedDate, setSelectedDate] = useState("2025-02-18"); // Default date

    // Filter patients by selected date
    const filteredPatients = testPatients.filter(patient => patient.date === selectedDate);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary">Xəstə Siyahısı</h1>

            {/* Date Picker */}
            <div className="mb-3 text-center">
                <label className="form-label"><strong>Tarix seçin:</strong></label>
                <input 
                    type="date" 
                    className="form-control w-50 mx-auto" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)} 
                />
            </div>

            {/* Patients Table */}
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient, index) => (
                            <tr key={patient.id}>
                                <td>{index + 1}</td>
                                <td>{patient.name}</td>
                                <td>{patient.surname}</td>
                                <td>
                                    {patient.came ? 
                                        <span className="badge bg-success">Gəldi ✅</span> : 
                                        <span className="badge bg-danger">Gəlmədi ❌</span>
                                    }
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">Bu tarixdə xəstə yoxdur</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PatientsPage;
