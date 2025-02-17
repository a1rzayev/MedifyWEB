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
        const extractedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
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
      alert('Please select a file');
      return;
    }

    if (!id) {
      alert('No user ID found, please log in again');
      return;
    }

    if (hasPendingRequest) {
      alert('You already have a pending request. Please wait for approval.');
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

      console.log('File uploaded successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} disabled={hasPendingRequest} />
      <button onClick={handleUpload} disabled={hasPendingRequest}>Upload PDF</button>
      {hasPendingRequest && <p style={{ color: 'red' }}>You have a pending request. Please wait for approval.</p>}
    </div>
  );
};

export default ValidatePage;
