import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Install with: npm install jwt-decode

const VerifyRequestsPage = () => {
    const [verifyRequests, setVerifyRequests] = useState([]);
    // const [isAdmin, setIsAdmin] = useState(false);
    const [id, setId] = useState(null); // State for storing decoded ID

    //useEffect(() => {
        // Get the access token from localStorage
        //const accessToken = localStorage.getItem('accessToken');


        //if (accessToken) {
        //    try {
                // Decode the token
                //const decodedToken = jwtDecode(accessToken);
                //const extractedUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                //console.log(`userId: ${extractedUserId}`);
                //setId(extractedUserId);

                //console.log(extractedUserId)
        //    } catch (error) {
        //        console.error('Error decoding token:', error);
         //   }
        //} else {
         //   console.log('No access token found');
        //}
    //}, []);

    useEffect(() => {
        // if (isAdmin) return; // Fetch data only if admin

        axios.get("http://localhost:5250/api/Doctor/Diplomas", {
            //headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(response => setVerifyRequests(response.data))
            .catch(error => console.error("Error fetching diplomas:", error));
    });

    const handleDownload = async (doctorId) => {
        try {
            const response = await axios.get(
                `http://localhost:5250/api/Doctor/DownloadDiploma/${doctorId}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
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


    // if (isAdmin) {
    // return <p className="text-red-500 text-lg font-bold">Access Denied: Admins Only</p>;
    // }

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
                        verifyRequests.map((verifyReuqest, index) => (
                            <tr key={index} className="border">
                                <td className="border px-4 py-2">{verifyReuqest.SenderId}</td>
                                <td className="border px-4 py-2">{verifyReuqest.State}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleDownload(verifyReuqest.DoctorId)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Download
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
