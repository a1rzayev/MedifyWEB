import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const DoctorProfilePage = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [specialities, setSpecialities] = useState([]);
    const [genders, setGenders] = useState([]);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                if (!id) {
                    throw new Error('Invalid doctor ID');
                }
                const response = await axios.get(`http://localhost:5250/api/Doctor/${id}`);
                setDoctor(response.data);
                setFormData(response.data);

                const token = localStorage.getItem('accessToken');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                    setIsOwner(userId === id);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching doctor:', error);
            }
        };

        const fetchSpecialities = async () => {
            try {
                const response = await axios.get("http://localhost:5250/api/Enum/Specialities");
                setSpecialities(response.data);
            } catch (error) {
                console.error("Error fetching specialities:", error);
            }
        };

        const fetchGenders = async () => {
            try {
                const response = await axios.get("http://localhost:5250/api/Enum/Genders");
                setGenders(response.data);
            } catch (error) {
                console.error("Error fetching genders:", error);
            }
        };

        fetchGenders();
        fetchDoctor();
        fetchSpecialities();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // const handleWorkHoursChange = (day, field, value) => {
    //     // Ensure the value is in the correct time format (HH:mm), padding if necessary
    //     const formattedValue = field === 'start' || field === 'end' ? value.padStart(5, '0') : value;
    //     // Check if enabled value is properly set to a boolean
    //     const enabled = field === 'enabled' ? (value === 'true') : undefined;

    //     setFormData(prevState => ({
    //         ...prevState,
    //         workDaysHours: {
    //             ...prevState.workDaysHours,
    //             [day]: {
    //                 ...prevState.workDaysHours?.[day],
    //                 [field]: formattedValue || (enabled !== undefined ? enabled : prevState.workDaysHours?.[day]?.[field])
    //             }
    //         }
    //     }));
    // };




    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all basic fields are filled out
        if (!formData.name || !formData.surname || !formData.email || !formData.phone || !formData.birthdate || !formData.gender || !formData.speciality) {
            setError("Please fill out all the basic fields.");
            return;
        }

        // Validate workDaysHours to ensure that each enabled day has both start and end time
        const workDaysHours = formData.workDaysHours || {};
        for (const day of daysOfWeek) {
            const dayHours = workDaysHours[day];

            if (dayHours && dayHours.enabled) {
                // Ensure both start and end times are provided if the day is enabled
                if (!dayHours.start || !dayHours.end) {
                    setError(`Please provide both start and end times for ${day}.`);
                    return;
                }

                // Ensure the start time is before the end time
                if (dayHours.start >= dayHours.end) {
                    setError(`Start time must be before end time for ${day}.`);
                    return;
                }
            }
        }

        // If all validations pass, proceed with form submission
        try {
            console.log(id);
            console.log(doctor.Id);
            formData.id = id;
            const requestData = {
                ...formData
            };

            const response = await axios.put(`http://localhost:5250/api/Doctor/${id}`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setDoctor(formData);
            setIsEditing(false);
            console.log(formData);
        } catch (error) {
            setError('Failed to update profile');
            console.error('Error updating doctor profile:', error);

            console.log(formData);
        }
    };




    if (error) {
        return <div className="text-center text-danger">Error: {error}</div>;
    }

    if (!doctor) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Doctor Profile</h1>
            <div className="card">
                <div className="card-body">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Surname</label>
                                <input type="text" name="surname" className="form-control" value={formData.surname} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="text" name="phone" className="form-control" value={formData.phone || ''} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Birthdate</label>
                                <input type="date" name="birthdate" className="form-control" value={formData.birthdate || ''} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <select name="gender" className="form-control" value={formData.gender || ''} onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    {genders.map((spec) => (
                                        <option key={spec} value={spec}>{spec}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Speciality</label>
                                <select name="speciality" className="form-control" value={formData.speciality || ''} onChange={handleChange} required>
                                    <option value="">Select Speciality</option>
                                    {specialities.map((spec) => (
                                        <option key={spec} value={spec}>{spec}</option>
                                    ))}
                                </select>
                            </div>
                            {/* <h4>Working Days & Hours</h4>
                            {daysOfWeek.map(day => (
                                <div className="mb-3">
                                    <input
                                        type="checkbox"
                                        id={day}
                                        checked={!!formData.workDaysHours?.[day]?.enabled}
                                        onChange={(e) => handleWorkHoursChange(day, 'enabled', e.target.checked)}
                                    />
                                    <label htmlFor={day} className="ms-2">{day}</label>
                                    {formData.workDaysHours?.[day]?.enabled && (
                                        <div className="d-flex mt-2">
                                            <input
                                                type="time"
                                                className="form-control me-2"
                                                value={formData.workDaysHours?.[day]?.start || ''}
                                                onChange={(e) => handleWorkHoursChange(day, 'start', e.target.value)}
                                            />
                                            <input
                                                type="time"
                                                className="form-control"
                                                value={formData.workDaysHours?.[day]?.end || ''}
                                                onChange={(e) => handleWorkHoursChange(day, 'end', e.target.value)}
                                            />
                                            {/* If you're using a checkbox or something else to toggle 'enabled' 
                                            <input
                                                type="checkbox"
                                                checked={formData.workDaysHours?.[day]?.enabled || false}
                                                onChange={(e) => handleWorkHoursChange(day, 'enabled', e.target.checked.toString())}
                                            />

                                        </div>
                                    )}
                                </div>

                            ))} */}
                            <button type="submit" className="btn btn-success">Save Changes</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <h2 className="card-title">{doctor.name} {doctor.surname}</h2>
                            <p><strong>Email:</strong> {doctor.email}</p>
                            <p><strong>Phone:</strong> {doctor.phone}</p>
                            <p><strong>Birthdate:</strong> {doctor.birthdate}</p>
                            <p><strong>Gender:</strong> {doctor.gender}</p>
                            <p><strong>Speciality:</strong> {doctor.speciality}</p>
                            <p><strong>Date Joined:</strong> {doctor.dateJoined}</p>
                            {isOwner && <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>Edit Profile</button>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Form, Button, Container } from "react-bootstrap";
// import { jwtDecode } from "jwt-decode";
// const [isOwner, setIsOwner] = useState(false);

// const getDoctorIdFromToken = () => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
//         setIsOwner(userId === id);
//     }

// };

// const EditDoctor = () => {
//     const { id } = useParams();
//     const [doctorId,  // Get doctorId from JWT
//     const [doctor, setDoctor] = useState({
//         name: "",
//         surname: "",
//         birthdate: "",
//         gender: "",
//         phone: "",
//         email: "",
//         password: "",
//         dateJoined: "",
//         speciality: "",
//     });

//     useEffect(() => {
//         if (!doctorId) {
//             console.error("No doctorId found in token.");
//             return;
//         }

//         axios.get(`http://localhost:5250/api/Doctor/${doctorId}`)
//             .then(response => setDoctor(response.data))
//             .catch(error => console.error("Error fetching doctor:", error));
//     }, [doctorId]);

//     const handleChange = (e) => {
//         setDoctor({ ...doctor, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!doctorId) return;

//         try {
//             await axios.put(`http://localhost:5250/api/Doctor/${doctorId}`, doctor);
//             alert("Doctor updated successfully!");
//         } catch (error) {
//             console.error("Error updating doctor:", error);
//         }
//     };

//     return (
//         <Container>
//             <h2>Edit Doctor</h2>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group>
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" name="name" value={doctor.name} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group>
//                     <Form.Label>Surname</Form.Label>
//                     <Form.Control type="text" name="surname" value={doctor.surname} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group>
//                     <Form.Label>Birthdate</Form.Label>
//                     <Form.Control type="date" name="birthdate" value={doctor.birthdate} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group>
//                     <Form.Label>Gender</Form.Label>
//                     <Form.Control as="select" name="gender" value={doctor.gender} onChange={handleChange}>
//                         <option value="">Select</option>
//                         <option value="0">Male</option>
//                         <option value="1">Female</option>
//                     </Form.Control>
//                 </Form.Group>

//                 <Form.Group>
//                     <Form.Label>Phone</Form.Label>
//                     <Form.Control type="text" name="phone" value={doctor.phone} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group>
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control type="email" name="email" value={doctor.email} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group>
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control type="password" name="password" value={doctor.password} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group>
//                     <Form.Label>Date Joined</Form.Label>
//                     <Form.Control type="date" name="dateJoined" value={doctor.dateJoined} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group>
//                     <Form.Label>Speciality</Form.Label>
//                     <Form.Control as="select" name="speciality" value={doctor.speciality} onChange={handleChange}>
//                         <option value="">Select</option>
//                         <option value="0">Cardiology</option>
//                         <option value="1">Neurology</option>
//                         <option value="2">Oncology</option>
//                     </Form.Control>
//                 </Form.Group>

//                 <Button variant="primary" type="submit">Save Changes</Button>
//             </Form>
//         </Container>
//     );
// };

// export default EditDoctor;
