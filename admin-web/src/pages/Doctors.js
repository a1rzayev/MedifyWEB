// src/Doctors.js
import React, { useState, useEffect } from 'react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch data (replace with real API endpoint)
    setDoctors([
      { id: 1, name: 'John', surname: 'Doe', mail: 'john.doe@mail.com', phone: '123456789', speciality: 'Cardiology', rating: 4.5 },
      { id: 2, name: 'Jane', surname: 'Smith', mail: 'jane.smith@mail.com', phone: '987654321', speciality: 'Neurology', rating: 4.7 },
    ]);
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit doctor with ID: ${id}`);
  };

  const handleBan = (id) => {
    console.log(`Ban doctor with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete doctor with ID: ${id}`);
  };

  return (
    <div>
      <h2>Doctors</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Speciality</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name} {doctor.surname}</td>
              <td>{doctor.speciality}</td>
              <td>{doctor.rating}</td>
              <td>
                <button onClick={() => handleEdit(doctor.id)}>Edit</button>
                <button onClick={() => handleBan(doctor.id)}>Ban/Unban</button>
                <button onClick={() => handleDelete(doctor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
