import React, { useState, useEffect } from 'react';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Test data for hospitals
    const testHospitals = [
      { id: 1, name: 'City Hospital', address: '123 Main St', mail: 'contact@cityhospital.com', phones: '123-456-7890', rating: 4.6 },
      { id: 2, name: 'General Care Hospital', address: '456 Oak Ave', mail: 'info@generalcare.com', phones: '555-555-5555', rating: 4.8 },
      { id: 3, name: 'Heart Clinic', address: '789 Pine Rd', mail: 'support@heartclinic.com', phones: '321-654-9870', rating: 4.3 },
    ];
    setHospitals(testHospitals);
  }, []);

  const handleEdit = (id) => {
    // Edit hospital logic
    console.log(`Edit hospital with id: ${id}`);
  };

  const handleBanUnban = (id) => {
    // Ban/unban logic
    console.log(`Ban/Unban hospital with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Delete hospital logic
    console.log(`Delete hospital with id: ${id}`);
  };

  return (
    <div>
      <h1>Hospitals</h1>
      <ul>
        {hospitals.map(hospital => (
          <li key={hospital.id}>
            <div>
              <p>{hospital.name}</p>
              <p>Address: {hospital.address}</p>
              <p>Email: {hospital.mail}</p>
              <p>Phones: {hospital.phones}</p>
              <p>Rating: {hospital.rating}</p>
              <button onClick={() => handleEdit(hospital.id)}>Edit</button>
              <button onClick={() => handleBanUnban(hospital.id)}>Ban/Unban</button>
              <button onClick={() => handleDelete(hospital.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hospitals;
