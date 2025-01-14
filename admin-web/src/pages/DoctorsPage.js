import React, { useState, useEffect } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", specialty: "" });
  const [isEditing, setIsEditing] = useState(false);
  const apiUrl = "https://your-api-url/api/Doctors"; // Replace with your actual API URL

  // Fetch all doctors
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateDoctor();
    } else {
      await addDoctor();
    }
    fetchDoctors();
    resetForm();
  };

  const addDoctor = async () => {
    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  const updateDoctor = async () => {
    try {
      await fetch(`${apiUrl}/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const editDoctor = (doctor) => {
    setForm(doctor);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({ id: "", name: "", specialty: "" });
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Doctors</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="specialty"
          value={form.specialty}
          placeholder="Specialty"
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? "Update" : "Add"} Doctor</button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </form>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name} - {doctor.specialty}
            <button onClick={() => editDoctor(doctor)}>Edit</button>
            <button onClick={() => deleteDoctor(doctor.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
