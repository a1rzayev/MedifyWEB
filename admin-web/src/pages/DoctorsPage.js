import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5271/api/doctors')
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  return (
    <div>
      <h2>Doctors</h2>
      <Link to="/doctors/add">Add New Doctor</Link>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} - {doctor.specialty}
            {}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsPage;
