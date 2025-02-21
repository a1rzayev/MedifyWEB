// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const DoctorProfilePage = () => {
//     const { id } = useParams();
//     const [doctor, setDoctor] = useState(null);
//     const [error, setError] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({});
//     const [isOwner, setIsOwner] = useState(false);
//     const [specialities, setSpecialities] = useState([]);
//     const [genders, setGenders] = useState([]);
//     const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//     useEffect(() => {
//         const fetchDoctor = async () => {
//             try {
//                 if (!id) {
//                     throw new Error('Invalid doctor ID');
//                 }
//                 const response = await axios.get(`http://localhost:5250/api/Doctor/${id}`);
//                 setDoctor(response.data);
//                 setFormData(response.data);

//                 const token = localStorage.getItem('accessToken');
//                 if (token) {
//                     const decodedToken = jwtDecode(token);
//                     const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
//                     setIsOwner(userId === id);
//                 }
//             } catch (error) {
//                 setError(error.message);
//                 console.error('Error fetching doctor:', error);
//             }
//         };

//         const fetchSpecialities = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5250/api/Enum/Specialities");
//                 setSpecialities(response.data.result);
//             } catch (error) {
//                 console.error("Error fetching specialities:", error);
//             }
//         };

//         const fetchGenders = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5250/api/Enum/Genders");
//                 setGenders(response.data.result);
//             } catch (error) {
//                 console.error("Error fetching genders:", error);
//             }
//         };

//         fetchGenders();
//         fetchDoctor();
//         fetchSpecialities();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({ ...prevState, [name]: value }));
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         console.log(formData);



//         // Validate workDaysHours to ensure that each enabled day has both start and end time
//         const workDaysHours = formData.workDaysHours || {};
//         for (const day of daysOfWeek) {
//             const dayHours = workDaysHours[day];

//             if (dayHours && dayHours.enabled) {
//                 // Ensure both start and end times are provided if the day is enabled
//                 if (!dayHours.start || !dayHours.end) {
//                     setError(`Please provide both start and end times for ${day}.`);
//                     return;
//                 }

//                 // Ensure the start time is before the end time
//                 if (dayHours.start >= dayHours.end) {
//                     setError(`Start time must be before end time for ${day}.`);
//                     return;
//                 }
//             }
//         }

//         // If all validations pass, proceed with form submission
//         try {
//             console.log(id);
//             console.log(doctor.Id);
//             formData.id = id;
//             const requestData = {
//                 ...formData
//             };

//             const response = await axios.put(`http://localhost:5250/api/Doctor/${id}`, requestData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//             setDoctor(formData);
//             setIsEditing(false);
//             console.log(formData);
//         } catch (error) {
//             setError('Failed to update profile');
//             console.error('Error updating doctor profile:', error);

//             console.log(formData);

//         }
//     };




//     if (error) {
//         return <div className="text-center text-danger">Error: {error}</div>;
//     }

//     if (!doctor) {
//         return <div className="text-center">Loading...</div>;
//     }

//     return (
//         <div className="container mt-5">
//             <h1 className="text-center">Doctor Profile</h1>
//             <div className="card">
//                 <div className="card-body">
//                     {isEditing ? (
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-3">
//                                 <label className="form-label">Name</label>
//                                 <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Surname</label>
//                                 <input type="text" name="surname" className="form-control" value={formData.surname} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Email</label>
//                                 <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Phone</label>
//                                 <input type="text" name="phone" className="form-control" value={formData.phone || ''} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Birthdate</label>
//                                 <input type="date" name="birthdate" className="form-control" value={formData.birthdate || ''} onChange={handleChange} required />
//                             </div>

//                             <div className="mb-3">
//                                 <label className="form-label">Gender</label>
//                                 <select
//                                     name="gender"
//                                     className="form-control"
//                                     value={formData.gender ?? ''}  // Ensure value is either an index or empty string
//                                     onChange={(e) => {
//                                         const selectedIndex = Number(e.target.value);  // Get the selected index
//                                         setFormData((prev) => ({
//                                             ...prev,
//                                             gender: selectedIndex,  // Save the index instead of the name
//                                         }));
//                                     }}
//                                     required
//                                 >
//                                     <option value="">Select Gender</option>
//                                     {genders.map((spec, index) => (
//                                         <option key={spec} value={index}>
//                                             {spec}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Speciality</label>
//                                 <select
//                                     name="speciality"
//                                     className="form-control"
//                                     value={formData.speciality ?? ''}  // Ensure value is either an index or empty string
//                                     onChange={(e) => {
//                                         const selectedIndex = Number(e.target.value);  // Get the selected index
//                                         setFormData((prev) => ({
//                                             ...prev,
//                                             speciality: selectedIndex,  // Save the index instead of the name
//                                         }));
//                                     }}
//                                     required
//                                 >
//                                     <option value="">Select Speciality</option>
//                                     {specialities.map((spec, index) => (
//                                         <option key={spec} value={index}>
//                                             {spec}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
                            
//                             <button type="submit" className="btn btn-success">Save Changes</button>
//                             <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
//                         </form>
//                     ) : (
//                         <>
//                             <h2 className="card-title">{doctor.name} {doctor.surname}</h2>
//                             <p><strong>Email:</strong> {doctor.email}</p>
//                             <p><strong>Phone:</strong> {doctor.phone}</p>
//                             <p><strong>Birthdate:</strong> {doctor.birthdate}</p>
//                             <p><strong>Gender:</strong> {doctor.gender}</p>
//                             <p><strong>Speciality:</strong> {doctor.speciality}</p>
//                             <p><strong>Date Joined:</strong> {doctor.dateJoined}</p>
//                             {isOwner && <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>Edit Profile</button>}
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DoctorProfilePage;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const DoctorProfilePage = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        birthdate: '',
        gender: '',
        phone: '',
        email: '',
        speciality: ''
    });
    const [isOwner, setIsOwner] = useState(false);
    const [specialities, setSpecialities] = useState([]);
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                if (!id) throw new Error('Invalid doctor ID');

                const response = await axios.get(`http://localhost:5250/api/Doctor/${id}`);
                setDoctor(response.data);
                setFormData({
                    name: response.data.name || '',
                    surname: response.data.surname || '',
                    birthdate: response.data.birthdate ? response.data.birthdate.split('T')[0] : '',
                    gender: response.data.gender ?? '',
                    phone: response.data.phone || '',
                    email: response.data.email || '',
                    speciality: response.data.speciality ?? ''
                });

                const token = localStorage.getItem('accessToken');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                    setIsOwner(userId === id);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchEnums = async () => {
            try {
                const [specialitiesResponse, gendersResponse] = await Promise.all([
                    axios.get("http://localhost:5250/api/Enum/Specialities"),
                    axios.get("http://localhost:5250/api/Enum/Genders")
                ]);
                setSpecialities(specialitiesResponse.data.result);
                setGenders(gendersResponse.data.result);
            } catch (error) {
                console.error("Error fetching enums:", error);
            }
        };

        fetchDoctor();
        fetchEnums();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const requestData = {
                name: formData.name,
                surname: formData.surname,
                birthdate: formData.birthdate ? new Date(formData.birthdate).toISOString() : null,
                gender: formData.gender ? Number(formData.gender) : null,
                phone: formData.phone || null,
                email: formData.email,
                speciality: formData.speciality ? Number(formData.speciality) : null
            };

            await axios.put(`http://localhost:5250/api/Doctor/${id}`, requestData, {
                headers: { 'Content-Type': 'application/json' }
            });

            setDoctor(requestData);
            setIsEditing(false);
        } catch (error) {
            setError('Failed to update profile');
            console.error('Error updating profile:', error);
        }
    };

    if (error) return <div className="text-center text-danger">Error: {error}</div>;
    if (!doctor) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center">Doctor Profile</h1>
            <div className="card">
                <div className="card-body">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            {['name', 'surname', 'email', 'phone', 'birthdate'].map(field => (
                                <div className="mb-3" key={field}>
                                    <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type={field === 'birthdate' ? 'date' : field === 'email' ? 'email' : 'text'}
                                        name={field}
                                        className="form-control"
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required={['name', 'surname', 'email'].includes(field)}
                                    />
                                </div>
                            ))}

                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <select name="gender" className="form-control" value={formData.gender} onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    {genders.map((gender, index) => (
                                        <option key={gender} value={index}>{gender}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Speciality</label>
                                <select name="speciality" className="form-control" value={formData.speciality} onChange={handleChange} required>
                                    <option value="">Select Speciality</option>
                                    {specialities.map((speciality, index) => (
                                        <option key={speciality} value={index}>{speciality}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-success">Save Changes</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <h2 className="card-title">{doctor.name} {doctor.surname}</h2>
                            <p><strong>Email:</strong> {doctor.email}</p>
                            <p><strong>Phone:</strong> {doctor.phone}</p>
                            <p><strong>Birthdate:</strong> {doctor.birthdate?.split('T')[0]}</p>
                            <p><strong>Gender:</strong> {genders[doctor.gender]}</p>
                            <p><strong>Speciality:</strong> {specialities[doctor.speciality]}</p>
                            {isOwner && <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>Edit Profile</button>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorProfilePage;
