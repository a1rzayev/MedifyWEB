// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

// const ValidatePage = () => {
//   const [file, setFile] = useState(null);
//   const [id, setId] = useState(null);
//   const [hasPendingRequest, setHasPendingRequest] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');

//     if (accessToken) {
//       try {
//         const decodedToken = jwtDecode(accessToken);
//         const extractedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
//         setId(extractedUserId);
//         console.log(extractedUserId);

//         // Fetch hasPendingRequest status
//         // axios.get(`http://localhost:5250/api/Doctor/HasPendingRequest/${extractedUserId}`)
//         //   .then(response => {
//         //     setHasPendingRequest(response.data);
//         //   })
//         //   .catch(error => {
//         //     console.error('Error fetching pending request status:', error);
//         //   });
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     }
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file');
//       return;
//     }

//     if (!id) {
//       alert('No user ID found, please log in again');
//       return;
//     }

//     if (hasPendingRequest) {
//       alert('You already have a pending request. Please wait for approval.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('pdf', file);
//     console.log(hasPendingRequest);

//     try {
//       const response = await axios.post(`http://localhost:5250/api/Doctor/VerifyDegree/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('File uploaded successfully:', response.data);
//       navigate('/');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="application/pdf" onChange={handleFileChange} disabled={hasPendingRequest} />
//       <button onClick={handleUpload} disabled={hasPendingRequest}>Upload PDF</button>
//       {hasPendingRequest && <p style={{ color: 'red' }}>You have a pending request. Please wait for approval.</p>}
//     </div>
//   );
// };

// export default ValidatePage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ValidatePage = () => {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const extractedUserId =
          decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        setId(extractedUserId);
        console.log(extractedUserId);

        // Fetch hasPendingRequest status
        // axios.get(`http://localhost:5250/api/Doctor/HasPendingRequest/${extractedUserId}`)
        //   .then(response => {
        //     setHasPendingRequest(response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error fetching pending request status:', error);
        //   });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Zəhmət olmasa, bir PDF faylı seçin.');
      return;
    }

    if (!id) {
      alert('İstifadəçi ID-si tapılmadı, yenidən daxil olun.');
      return;
    }

    if (hasPendingRequest) {
      alert('Sizin təsdiq gözləyən sorğunuz var. Zəhmət olmasa, gözləyin.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    console.log(hasPendingRequest);

    try {
      const response = await axios.post(`http://localhost:5250/api/Doctor/VerifyDegree/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Fayl uğurla yükləndi:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Fayl yüklənərkən xəta baş verdi:', error);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-3">📜 Diplomunuzu Təsdiqləyin</h3>
        <p className="text-center text-muted">
          Zəhmət olmasa, PDF formatında diplomunuzu yükləyin və təsdiqlənməsini gözləyin.
        </p>

        <div className="mb-3">
          <label htmlFor="pdfUpload" className="form-label fw-bold">
            Diplomunuzu seçin 📄
          </label>
          <input
            type="file"
            id="pdfUpload"
            accept="application/pdf"
            className="form-control"
            onChange={handleFileChange}
            disabled={hasPendingRequest}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleUpload}
          disabled={hasPendingRequest}
        >
          📤 PDF Yüklə
        </button>

        {hasPendingRequest && (
          <p className="text-danger mt-3 text-center">
            ⏳ Təsdiq gözləyən sorğunuz var. Zəhmət olmasa, gözləyin.
          </p>
        )}
      </div>
    </div>
  );
};

export default ValidatePage;
