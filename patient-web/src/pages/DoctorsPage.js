import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialities, setSpecialities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState( localStorage.getItem('accessToken') !== null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem('accessToken');
            console.log(`token: ${token}`);
            if (token) {
                const decodedToken = jwtDecode(token);
                const extractedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                console.log(`userId: ${extractedUserId}`);
                setUserId(extractedUserId);
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('http://localhost:5250/api/Doctor');
            const data = await response.json();
            setDoctors(data);
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
      const fetchSpecialities = async () => {
          try {
              const response = await fetch('http://localhost:5250/api/Enum/Specialities');
              const data = await response.json();
              console.log("Fetched specialities:", data);  // 👈 Check console output
              setSpecialities(Array.isArray(data) ? data : []);  // Ensure it's an array
          } catch (error) {
              console.error("Error fetching specialities:", error);
              setSpecialities([]);  // Avoid map errors on failure
          }
      };
  
      fetchSpecialities();
  }, []);
  


    const filteredDoctors = doctors.filter(doctor => {
        const matchesName = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.surname.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty ? doctor.speciality === selectedSpecialty : true;
        return matchesName && matchesSpecialty;
    });

    // Function to generate avatar initials
    const getAvatarInitials = (name, surname) => {
        return `${name[0]}${surname[0]}`.toUpperCase();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Həkimlər</h1>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Ad və ya soyadla axtarış..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            />

            {/* Specialty filter */}
            <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
            >
                <option value="">İxtisasın seçin</option>
                {specialities.map((specialty) => (
                    <option key={specialty} value={specialty}>
                        {specialty}
                    </option>
                ))}
            </select>

            {/* Doctors cards in a row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' }}>
                {filteredDoctors.map(doctor => (
                    <div
                        key={doctor.id}
                        onClick={() => navigate(`/doctor/${doctor.id}`)}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            width: '200px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        {/* Avatar with initials */}
                        <div
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                backgroundColor: '#3498db', // You can customize the background color
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '24px',
                                marginBottom: '10px'
                            }}
                        >
                            {getAvatarInitials(doctor.name, doctor.surname)}
                        </div>
                        <h3>{doctor.name} {doctor.surname}</h3>
                        <p><strong>İxtisas:</strong> {doctor.speciality}</p>

                        {/* Action buttons */}

                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsPage;
