import React, { useState, useEffect } from 'react';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Test data for doctors
    const testDoctors = [
      { id: 1, name: 'John', surname: 'Doe', mail: 'john.doe@mail.com', phone: '123-456-7890', speciality: 'Cardiology', rating: 4.5 },
      { id: 2, name: 'Jane', surname: 'Smith', mail: 'jane.smith@mail.com', phone: '987-654-3210', speciality: 'Neurology', rating: 4.7 },
      { id: 3, name: 'Michael', surname: 'Johnson', mail: 'michael.johnson@mail.com', phone: '555-555-5555', speciality: 'Pediatrics', rating: 4.2 },
    ];
    setDoctors(testDoctors);
  }, []);

  const handleEdit = (id) => {
    // Edit doctor logic
    console.log(`Edit doctor with id: ${id}`);
  };

  const handleBanUnban = (id) => {
    // Ban/unban logic
    console.log(`Ban/Unban doctor with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Delete doctor logic
    console.log(`Delete doctor with id: ${id}`);
  };

  return (
    <div>
      <h1>Doctors</h1>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>
            <div>
              <p>{doctor.name} {doctor.surname}</p>
              <p>Email: {doctor.mail}</p>
              <p>Phone: {doctor.phone}</p>
              <p>Speciality: {doctor.speciality}</p>
              <p>Rating: {doctor.rating}</p>
              <button onClick={() => handleEdit(doctor.id)}>Edit</button>
              <button onClick={() => handleBanUnban(doctor.id)}>Ban/Unban</button>
              <button onClick={() => handleDelete(doctor.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
