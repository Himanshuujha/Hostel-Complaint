import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import RegisterIssue from './registerIssue';


const Complaints = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const complaintsPerPage = 5;

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/complaints');
                const data = await response.json();

                if (Array.isArray(data)) {
                    setComplaints(data);
                } else if (data && data.complaints && Array.isArray(data.complaints)) {
                    setComplaints(data.complaints);
                } else {
                    console.error('Unexpected data format:', data);
                    setComplaints([]);
                }
            } catch (error) {
                console.error('Failed to fetch complaints', error);
                setComplaints([]);
            }
        };

        fetchComplaints();
    }, []);

    const handleAddComplaint = () => {
        navigate('/dashboard/complaints/registerIssue');
    };

    const addIssue = (issue) => {
        setComplaints([issue, ...complaints]);
        setCurrentPage(1);
        navigate('/dashboard/complaints');
    };

    const handleDeleteComplaint = async (index, id) => {
        try {
            await fetch(`http://localhost:5000/api/complaints/${id}`, {
                method: 'DELETE',
            });
            const updatedComplaints = complaints.filter((_, i) => i !== index);
            setComplaints(updatedComplaints);
        } catch (error) {
            console.error('Failed to delete complaint', error);
        }
    };

    const handleComplaintButtonClick = async (complaint) => {
        setLoading((prevState) => ({ ...prevState, [complaint._id]: true }));
        try {
            await fetch('http://localhost:5000/api/complaints/sendComplaintMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: complaint.category,
                    phoneNo: complaint.PhoneNo,
                }),
            });
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setLoading((prevState) => ({ ...prevState, [complaint._id]: false }));
        }
    };

    const currentComplaints = complaints
        .map((complaint, index) => ({ ...complaint, index }))
        .filter(({ index }) => index >= (currentPage - 1) * complaintsPerPage && index < currentPage * complaintsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-2xl font-semibold">Sorry for the Inconvenience</h2>
                <button onClick={handleAddComplaint} className="bg-primaryGreen text-white px-4 py-2 rounded-md">
                    Add Issue
                </button>
            </div>
            <Routes>
                <Route path="registerIssue" element={<RegisterIssue addIssue={addIssue} />} />
            </Routes>
            <div>
                {currentComplaints.length === 0 ? (
                    <p className="text-white">No complaints registered yet.</p>
                ) : (
                    currentComplaints.map((complaint, index) => (
                        <div key={index} className="bg-secondaryBlack p-4 rounded-md mb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-white"><strong>Category:</strong> {complaint.category}</p>
                                    <p className="text-white"><strong>Issue:</strong> {complaint.issue}</p>
                                    {complaint.rollNo && <p className="text-white"><strong>Roll No:</strong> {complaint.rollNo}</p>}
                                    {complaint.roomNo && <p className="text-white"><strong>Room No:</strong> {complaint.roomNo}</p>}
                                    {complaint.PhoneNo && <p className="text-white"><strong>Phone Number:</strong> {complaint.PhoneNo}</p>}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleComplaintButtonClick(complaint)}
                                        className="bg-primaryGreen text-white px-4 py-2 rounded-md"
                                        disabled={loading[complaint._id]}
                                    >
                                        {loading[complaint._id] ? 'Sending...' : 'Complaint'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteComplaint(index, complaint._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(complaints.length / complaintsPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 rounded-md mx-1 ${currentPage === i + 1 ? 'bg-primaryGreen' : 'bg-secondaryBlack'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Complaints;
