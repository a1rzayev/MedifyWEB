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

    // useEffect(() => {
    //     // Test data for doctors
    //     const fetchedDoctors = [
    //         {
    //             "id": 1,
    //             "name": "Elşən",
    //             "surname": "Rzayev",
    //             "speciality": "Cardiologist"
    //         },
    //         {
    //             "id": 2,
    //             "name": "Leyla",
    //             "surname": "Huseynova",
    //             "speciality": "Neurologist"
    //         },
    //         {
    //             "id": 3,
    //             "name": "Rashad",
    //             "surname": "Ismayilov",
    //             "speciality": "Pediatrician"
    //         },
    //         {
    //             "id": 4,
    //             "name": "Zeynab",
    //             "surname": "Veliyeva",
    //             "speciality": "Surgeon"
    //         },
    //         {
    //             "id": 5,
    //             "name": "Emin",
    //             "surname": "Aslanov",
    //             "speciality": "Dermatologist"
    //         },
    //         {
    //             "id": 6,
    //             "name": "Gulzar",
    //             "surname": "Abdullayeva",
    //             "speciality": "Orthopedic"
    //         },
    //         {
    //             "id": 7,
    //             "name": "Farid",
    //             "surname": "Bashirov",
    //             "speciality": "Psychiatrist"
    //         },
    //         {
    //             "id": 8,
    //             "name": "Sabina",
    //             "surname": "Taghiyeva",
    //             "speciality": "Oncologist"
    //         },
    //         {
    //             "id": 9,
    //             "name": "Nigar",
    //             "surname": "Mirzayeva",
    //             "speciality": "Endocrinologist"
    //         },
    //         {
    //             "id": 10,
    //             "name": "Ramin",
    //             "surname": "Ismayilov",
    //             "speciality": "Gastroenterologist"
    //         },
    //         {
    //             "id": 11,
    //             "name": "Aynur",
    //             "surname": "Aliyeva",
    //             "speciality": "Radiologist"
    //         },
    //         {
    //             "id": 12,
    //             "name": "Nijat",
    //             "surname": "Mammadov",
    //             "speciality": "Anesthesiologist"
    //         },
    //         {
    //             "id": 13,
    //             "name": "Kamran",
    //             "surname": "Huseynov",
    //             "speciality": "Pediatrician"
    //         },
    //         {
    //             "id": 14,
    //             "name": "Sahil",
    //             "surname": "Bayramov",
    //             "speciality": "Orthopedic"
    //         },
    //         {
    //             "id": 15,
    //             "name": "Zakir",
    //             "surname": "Novruzov",
    //             "speciality": "Urologist"
    //         },
    //         {
    //             "id": 16,
    //             "name": "Gulshan",
    //             "surname": "Mammadova",
    //             "speciality": "Psychiatrist"
    //         },
    //         {
    //             "id": 17,
    //             "name": "Ibrahim",
    //             "surname": "Mammadov",
    //             "speciality": "Neurologist"
    //         },
    //         {
    //             "id": 18,
    //             "name": "Lala",
    //             "surname": "Bayramova",
    //             "speciality": "Otorhinolaryngologist"
    //         },
    //         {
    //             "id": 19,
    //             "name": "Sahar",
    //             "surname": "Mammadova",
    //             "speciality": "Pathologist"
    //         },
    //         {
    //             "id": 20,
    //             "name": "Rana",
    //             "surname": "Rzayeva",
    //             "speciality": "Surgeon"
    //         }
    //     ]

    //     setDoctors(fetchedDoctors);
    // }, []);

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
            const response = await fetch('http://localhost:5250/api/Doctor/Specialities');
            const data = await response.json();
            setSpecialities(data);
        };

        fetchSpecialities();
    }, []);


    const filteredDoctors = doctors.filter(doctor => {
        const matchesName = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.surname.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty ? doctor.speciality === selectedSpecialty : true;
        return matchesName && matchesSpecialty;
    });


    const handleRequest = async (doctorId) => {
        try {
            const response = await fetch(`http://localhost:5250/api/Patient/ReuqestRendezvouz/${doctorId}/${userId}`, {
                method: 'POST',  // Use PUT method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Add any necessary data to be sent in the request body
                    status: 'requested',  // Example of data you may want to send
                }),
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            // Handle success (e.g., show a success message or update UI)
            const data = await response.json();
            console.log('Response:', data);
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error:', error);
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

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
