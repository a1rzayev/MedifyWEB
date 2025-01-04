// src/Hospitals.js
import React, { useState, useEffect } from 'react';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Fetch data (replace with real API endpoint)
    setHospitals([
      { id: 1, name: 'City Hospital', address: '123 Main St', mail: 'info@cityhospital.com', phone: '555-1234', rating: 4.6 },
      { id: 2, name: 'Lakeview Hospital', address: '456 Lake Rd', mail: 'contact@lakeviewhospital.com', phone: '555-5678', rating: 4.8 },
    ]);
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit hospital with ID: ${id}`);
  };

  const handleBan = (id) => {
    console.log(`Ban hospital with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete hospital with ID: ${id}`);
  };

  return (
    <div>
      <h2>Hospitals</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id}>
              <td>{hospital.name}</td>
              <td>{hospital.address}</td>
              <td>{hospital.rating}</td>
              <td>
                <button onClick={() => handleEdit(hospital.id)}>Edit</button>
                <button onClick={() => handleBan(hospital.id)}>Ban/Unban</button>
                <button onClick={() => handleDelete(hospital.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hospitals;
