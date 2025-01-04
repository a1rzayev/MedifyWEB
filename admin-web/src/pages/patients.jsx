import React, { useState, useEffect } from 'react';

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Test data for patients
    const testPatients = [
      { id: 1, name: 'Alice', surname: 'Brown', mail: 'alice.brown@mail.com', phone: '444-444-4444', rating: 4.5 },
      { id: 2, name: 'Bob', surname: 'White', mail: 'bob.white@mail.com', phone: '333-333-3333', rating: 4.2 },
      { id: 3, name: 'Charlie', surname: 'Green', mail: 'charlie.green@mail.com', phone: '666-666-6666', rating: 4.8 },
      { id: 3, name: 'Charlie', surname: 'Green', mail: 'charlie.green@mail.com', phone: '666-666-6666', rating: 4.8 },
      { id: 3, name: 'Charlie', surname: 'Green', mail: 'charlie.green@mail.com', phone: '666-666-6666', rating: 4.8 },
      { id: 3, name: 'Charlie', surname: 'Green', mail: 'charlie.green@mail.com', phone: '666-666-6666', rating: 4.8 },
    ];
    setPatients(testPatients);
  }, []);

  const handleEdit = (id) => {
    // Edit patient logic
    console.log(`Edit patient with id: ${id}`);
  };

  const handleBanUnban = (id) => {
    // Ban/unban logic
    console.log(`Ban/Unban patient with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Delete patient logic
    console.log(`Delete patient with id: ${id}`);
  };

  return (
    <div>
      <h1>Patients</h1>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            <div>
              <p>{patient.name} {patient.surname}</p>
              <p>Email: {patient.mail}</p>
              <p>Phone: {patient.phone}</p>
              <p>Rating: {patient.rating}</p>
              <button onClick={() => handleEdit(patient.id)}>Edit</button>
              <button onClick={() => handleBanUnban(patient.id)}>Ban/Unban</button>
              <button onClick={() => handleDelete(patient.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
