// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const DoctorProfilePage = () => {
//     const { id } = useParams(); // Getting the doctor ID from the URL parameters
//     const [doctor, setDoctor] = useState(null);

//     useEffect(() => {
//         const fetchDoctor = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5250/api/Doctor/${id}`); // Correct API URL
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setDoctor(data);
//             } catch (error) {
//                 console.error('Failed to fetch doctor data:', error);
//             }
//         };

//         fetchDoctor();
//     }, [id]); // Only refetch when the `id` parameter changes

//     if (!doctor) {
//         return <div className="text-center">Loading...</div>; // Show loading message if doctor data is not yet loaded
//     }

//     return (
//         <div className="container mt-5">
//             <h1 className="text-center">Doctor Profile</h1>
//             <div className="card">
//                 <div className="card-body">
//                     <h2 className="card-title">{doctor.name} {doctor.surname}</h2>
//                     <p><strong>Specialty:</strong> {doctor.speciality}</p>
//                     <p><strong>Email:</strong> {doctor.mail}</p>
//                     <p><strong>Phone:</strong> {doctor.phone}</p>
//                     <p><strong>Rating:</strong> {doctor.rating}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DoctorProfilePage;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DoctorProfilePage = () => {
    const { id } = useParams(); // Getting the doctor ID from the URL parameters
    const [doctor, setDoctor] = useState(null);

    // Mock test data (instead of API fetching)
    const testDoctors = [
        {
            id: "1",
            name: "Elşən",
            surname: "Rzayev",
            speciality: "Cardiologist",
            rating: 5
        },
        {
            id: "2",
            name: "Leyla",
            surname: "Huseynova",
            speciality: "Neurologist",
            rating: 4.9
        },
        {
            id: "3",
            name: "Rashad",
            surname: "Ismayilov",
            speciality: "Pediatrician",
            rating: 4.9
        }
        ];

    useEffect(() => {
        // Simulating a delay to mimic loading
        setTimeout(() => {
            const foundDoctor = testDoctors.find((doc) => doc.id === id);
            setDoctor(foundDoctor || null);
        }, 1000); // Simulated delay
    }, [id]);

    if (!doctor) {
        return <div className="text-center mt-5">Loading...</div>; // Show loading if data is not ready
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary">Həkim Profili</h1>
            <div className="card shadow-lg mx-auto" style={{ maxWidth: "400px" }}>
                <div className="card-body">
                    <h2 className="card-title">{doctor.name} {doctor.surname}</h2>
                    <p><strong>İxtisas:</strong> {doctor.speciality}</p>
                    <p><strong>Reytinq:</strong> ⭐ {doctor.rating}</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;
