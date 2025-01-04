// src/Patients.js
import React, { useState, useEffect } from 'react';

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch data (replace with real API endpoint)
    setPatients([
      { id: 1, name: 'Alice', surname: 'Johnson', mail: 'alice.johnson@mail.com', phone: '321654987', rating: 4.2 },
      { id: 2, name: 'Bob', surname: 'Martin', mail: 'bob.martin@mail.com', phone: '654987321', rating: 4.3 },
    ]);
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit patient with ID: ${id}`);
  };

  const handleBan = (id) => {
    console.log(`Ban patient with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete patient with ID: ${id}`);
  };

  return (
    <div>
      <h2>Patients</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name} {patient.surname}</td>
              <td>{patient.rating}</td>
              <td>
                <button onClick={() => handleEdit(patient.id)}>Edit</button>
                <button onClick={() => handleBan(patient.id)}>Ban/Unban</button>
                <button onClick={() => handleDelete(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
