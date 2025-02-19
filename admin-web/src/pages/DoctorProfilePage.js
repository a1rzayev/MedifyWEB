import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("accessToken") !== null);
  const [userRole, setUserRole] = useState(null); // To check admin privileges
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5250/api/Doctor/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error("Failed to fetch doctor data:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBanToggle = async () => {
    try {
      const response = await fetch(`http://localhost:5250/api/Doctor/${id}/ban`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        alert(doctor.isBanned ? "Həkim açıldı!" : "Həkim banlandı!");
        setDoctor({ ...doctor, isBanned: !doctor.isBanned });
      } else {
        alert("Xəta baş verdi.");
      }
    } catch (error) {
      console.error("Failed to toggle ban status:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bu həkimi silmək istədiyinizə əminsiniz?")) {
      try {
        const response = await fetch(`http://localhost:5250/api/Doctor/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          alert("Həkim silindi.");
          navigate("/doctors"); // Redirect to the doctors list
        } else {
          alert("Silinmə zamanı xəta baş verdi.");
        }
      } catch (error) {
        console.error("Failed to delete doctor:", error);
      }
    }
  };

  if (!doctor) {
    return <div className="text-center mt-5">Yüklənir...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Həkim Profili</h1>
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h2 className="card-title">{doctor.name} {doctor.surname}</h2>
          <p><strong>İxtisas:</strong> {doctor.speciality}</p>
          <p><strong>Reytinq:</strong> ⭐ {doctor.rating}</p>
          <p><strong>Status:</strong> {doctor.isBanned ? "Banlanıb" : "Aktiv"}</p>

          {userRole === "admin" && (
            <div className="mt-4 d-flex justify-content-between">
              <button
                className={`btn ${doctor.isBanned ? "btn-success" : "btn-warning"}`}
                onClick={handleBanToggle}
              >
                {doctor.isBanned ? "Banı aç" : "Banla"}
              </button>

              <button className="btn btn-danger" onClick={handleDelete}>
                Sil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
