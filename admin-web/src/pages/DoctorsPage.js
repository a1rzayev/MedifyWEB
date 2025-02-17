// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const DoctorsPage = () => {
//     const [doctors, setDoctors] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedSpecialty, setSelectedSpecialty] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchDoctors = async () => {
//             const response = await fetch('http://localhost:5250/api/Doctor'); // Replace with your API
//             const data = await response.json();
//             setDoctors(data);
//         };

//         fetchDoctors();
//     }, []);

//     const filteredDoctors = doctors.filter(doctor => {
//         const matchesName = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                             doctor.surname.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesSpecialty = selectedSpecialty ? doctor.speciality === selectedSpecialty : true;
//         return matchesName && matchesSpecialty;
//     });

//     const specialties = [
//         'Cardiologist', 'Neurologist', 'Endocrinologist', 'Pediatrician', 'Surgeon', 
//         'Gynecologist', 'Oncologist', 'Dermatologist', 'Orthopedic', 'Psychiatrist', 
//         'Rheumatologist', 'InfectiousDiseaseSpecialist', 'Urologist', 'Pulmonologist', 
//         'Gastroenterologist', 'Otorhinolaryngologist', 'Radiologist', 'Anesthesiologist', 
//         'Pathologist', 'Allergist', 'Hematologist', 'Geriatrician'
//     ];

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Doctors List</h1>

//             {/* Search bar */}
//             <input
//                 type="text"
//                 placeholder="Search by name or surname..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
//             />

//             {/* Specialty filter */}
//             <select
//                 value={selectedSpecialty}
//                 onChange={(e) => setSelectedSpecialty(e.target.value)}
//                 style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
//             >
//                 <option value="">Select Specialty</option>
//                 {specialties.map((specialty) => (
//                     <option key={specialty} value={specialty}>
//                         {specialty}
//                     </option>
//                 ))}
//             </select>

//             {/* Doctors cards */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//                 {filteredDoctors.map(doctor => (
//                     <div
//                         key={doctor.id}
//                         onClick={() => navigate(`/doctor/${doctor.id}`)}
//                         style={{
//                             border: '1px solid #ccc',
//                             borderRadius: '8px',
//                             padding: '10px',
//                             cursor: 'pointer',
//                             width: '200px',
//                             textAlign: 'center'
//                         }}
//                     >
//                         <img
//                             src={doctor.photo || 'https://via.placeholder.com/150'}
//                             alt={`${doctor.name} ${doctor.surname}`}
//                             style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
//                         />
//                         <h3>{doctor.name} {doctor.surname}</h3>
//                         <p><strong>Specialty:</strong> {doctor.speciality}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DoctorsPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Test data for doctors
        const fetchedDoctors = [
            {
              "id": 1,
              "name": "Ali",
              "surname": "Mammadov",
              "speciality": "Cardiologist"
            },
            {
              "id": 2,
              "name": "Leyla",
              "surname": "Huseynova",
              "speciality": "Neurologist"
            },
            {
              "id": 3,
              "name": "Rashad",
              "surname": "Ismayilov",
              "speciality": "Pediatrician"
            },
            {
              "id": 4,
              "name": "Zeynab",
              "surname": "Veliyeva",
              "speciality": "Surgeon"
            },
            {
              "id": 5,
              "name": "Emin",
              "surname": "Aslanov",
              "speciality": "Dermatologist"
            },
            {
              "id": 6,
              "name": "Gulzar",
              "surname": "Abdullayeva",
              "speciality": "Orthopedic"
            },
            {
              "id": 7,
              "name": "Farid",
              "surname": "Bashirov",
              "speciality": "Psychiatrist"
            },
            {
              "id": 8,
              "name": "Sabina",
              "surname": "Taghiyeva",
              "speciality": "Oncologist"
            },
            {
              "id": 9,
              "name": "Nigar",
              "surname": "Mirzayeva",
              "speciality": "Endocrinologist"
            },
            {
              "id": 10,
              "name": "Ramin",
              "surname": "Ismayilov",
              "speciality": "Gastroenterologist"
            },
            {
              "id": 11,
              "name": "Aynur",
              "surname": "Aliyeva",
              "speciality": "Radiologist"
            },
            {
              "id": 12,
              "name": "Nijat",
              "surname": "Mammadov",
              "speciality": "Anesthesiologist"
            },
            {
              "id": 13,
              "name": "Kamran",
              "surname": "Huseynov",
              "speciality": "Pediatrician"
            },
            {
              "id": 14,
              "name": "Sahil",
              "surname": "Bayramov",
              "speciality": "Orthopedic"
            },
            {
              "id": 15,
              "name": "Zakir",
              "surname": "Novruzov",
              "speciality": "Urologist"
            },
            {
              "id": 16,
              "name": "Gulshan",
              "surname": "Mammadova",
              "speciality": "Psychiatrist"
            },
            {
              "id": 17,
              "name": "Ibrahim",
              "surname": "Mammadov",
              "speciality": "Neurologist"
            },
            {
              "id": 18,
              "name": "Lala",
              "surname": "Bayramova",
              "speciality": "Otorhinolaryngologist"
            },
            {
              "id": 19,
              "name": "Sahar",
              "surname": "Mammadova",
              "speciality": "Pathologist"
            },
            {
              "id": 20,
              "name": "Rana",
              "surname": "Rzayeva",
              "speciality": "Surgeon"
            }
          ]
          
        setDoctors(fetchedDoctors);
    }, []);

    const filteredDoctors = doctors.filter(doctor => {
        const matchesName = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            doctor.surname.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = selectedSpecialty ? doctor.speciality === selectedSpecialty : true;
        return matchesName && matchesSpecialty;
    });

    const specialties = [
        'Cardiologist', 'Neurologist', 'Endocrinologist', 'Pediatrician', 'Surgeon', 
        'Gynecologist', 'Oncologist', 'Dermatologist', 'Orthopedic', 'Psychiatrist', 
        'Rheumatologist', 'InfectiousDiseaseSpecialist', 'Urologist', 'Pulmonologist', 
        'Gastroenterologist', 'Otorhinolaryngologist', 'Radiologist', 'Anesthesiologist', 
        'Pathologist', 'Allergist', 'Hematologist', 'Geriatrician'
    ];

    const handleEdit = (id) => {
        console.log(`Edit doctor with id: ${id}`);
    };

    const handleBan = (id) => {
        console.log(`Ban doctor with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete doctor with id: ${id}`);
    };

    // Function to generate avatar initials
    const getAvatarInitials = (name, surname) => {
        return `${name[0]}${surname[0]}`.toUpperCase();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Doctors List</h1>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by name or surname..."
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
                <option value="">Select Specialty</option>
                {specialties.map((specialty) => (
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
                        <p><strong>Specialty:</strong> {doctor.speciality}</p>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button onClick={(e) => { e.stopPropagation(); handleEdit(doctor.id); }} className="btn btn-warning">Edit</button>
                            <button onClick={(e) => { e.stopPropagation(); handleBan(doctor.id); }} className="btn btn-danger">Ban</button>
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(doctor.id); }} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsPage;
