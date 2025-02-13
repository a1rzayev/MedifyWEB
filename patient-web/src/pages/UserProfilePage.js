import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id,
        name: "",
        surname: "",
        birthdate: "",
        gender: "", // This will hold the index of the gender
        phone: "",
        email: "",
        passwordHash: "",
        dateJoined: ""
    });
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        // Fetch gender enum values from the backend
        axios.get("http://localhost:5250/api/Patient/Genders")  // Update the endpoint if necessary
            .then(response => {
                setGenders(response.data); // Store gender values in the state
            })
            .catch(error => {
                console.error("Error fetching genders", error);
            });

        // Fetch the existing user data (for update)
        axios.get(`http://localhost:5250/api/Patient/${id}`)  // Update the endpoint if necessary
            .then(response => {
                setUser({
                    ...user,
                    name: response.data.name,
                    surname: response.data.surname,
                    birthdate: response.data.birthdate,
                    gender: response.data.gender,
                    phone: response.data.phone,
                    email: response.data.email,
                });
            })
            .catch(error => {
                console.error("Error fetching user data", error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send gender by index (gender array)
            const response = await axios.put(
                `http://localhost:5250/api/Patient/${id}`, // Correct the endpoint if needed
                {
                    ...user,
                    gender: genders[user.gender]  // Map gender index to actual value
                }
            );
            alert("User updated successfully!");
            navigate("/"); // Navigate after successful update
        } catch (error) {
            console.error("Error updating user", error);
            alert("Failed to update user.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 p-6 shadow-lg bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-4">Update User</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={handleChange}
                        className="mb-2 w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        value={user.surname}
                        onChange={handleChange}
                        className="mb-2 w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="date"
                        name="birthdate"
                        value={user.birthdate}
                        onChange={handleChange}
                        className="mb-2 w-full p-2 border rounded"
                    />
                    <select
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                        className="mb-2 w-full p-2 border rounded"
                    >
                        <option value="">Select Gender</option>
                        {genders.map((gender, index) => (
                            <option key={index} value={index}>
                                {gender}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="mb-2 w-full p-2 border rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        className="mb-2 w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        name="passwordHash"
                        placeholder="New Password"
                        value={user.passwordHash}
                        onChange={handleChange}
                        className="mb-2 w-full p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserProfilePage;
