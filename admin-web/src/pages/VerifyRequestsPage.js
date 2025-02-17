import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const VerifyRequestsPage = () => {
    const [message, setMessage] = useState('');
    const [verifyRequests, setVerifyRequests] = useState([]);

    useEffect(() => {
        const fetchDiplomas = async () => {
            try {
                const response = await fetch("http://localhost:5250/api/Doctor/Diplomas");
                if (!response.ok) {
                    throw new Error("Failed to fetch diplomas");
                }
                const data = await response.json();
                console.log(data);
                setVerifyRequests(data);
            } catch (error) {
                console.error("Error fetching diplomas:", error);
            }
        };

        fetchDiplomas();
    }, []);

    const handleDownload = async (doctorId) => {
        try {
            const response = await fetch(`http://localhost:5250/api/Doctor/DownloadDiploma/${doctorId}`);
            if (!response.ok) {
                throw new Error("Failed to download diploma");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${doctorId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    const handleApprove = async (doctorId) => {
        try {
            const response = await fetch(
              `http://localhost:5250/api/Doctor/ApproveDegree/${doctorId}`,
              { method: "POST" }
            );
      
            if (!response.ok) {
              throw new Error("Failed to approve degree");
            }
      
            alert("Degree approved successfully!");
          } catch (error) {
            console.error(error);
            alert("An error occurred");
          }

    };

    const handleDeny = async (doctorId) => {
        try {
            const response = await fetch(`http://localhost:5250/api/Doctor/DenyDegree/${doctorId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to deny diploma");
            }

            setVerifyRequests((prev) => prev.filter((req) => req.senderId !== doctorId));
        } catch (error) {
            console.error("Error denying diploma:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Uploaded Diplomas</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Doctor ID</th>
                        <th className="border px-4 py-2">File Name</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {verifyRequests.length > 0 ? (
                        verifyRequests.map((verifyRequest, index) => (
                            <tr key={index} className="border">
                                <td className="border px-4 py-2">
                                    <Link to={`/profile/${verifyRequest.senderId}`} className="text-blue-500 hover:underline">
                                        {verifyRequest.senderId}
                                    </Link>
                                </td>
                                <td className="border px-4 py-2">{verifyRequest.senderId}.pdf</td>
                                <td className="border px-4 py-2 flex space-x-2">
                                    <button
                                        onClick={() => handleDownload(verifyRequest.senderId)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Download
                                    </button>
                                    <button
                                        onClick={() => handleApprove(verifyRequest.senderId)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleDeny(verifyRequest.senderId)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                    >
                                        Deny
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center py-4 text-gray-600">
                                No diplomas found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default VerifyRequestsPage;
