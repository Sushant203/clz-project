import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleDashboard = () => {
    const { bid } = useParams();
    const userid = localStorage.getItem('user_id');
    const [cab, setCab] = useState([]);
    const [statusUpdated, setStatusUpdated] = useState(false);

    const fetchData = () => {
        try {
            axios
                .get(`http://localhost:8000/book/user/${userid}/${bid}`)
                .then((res) => {
                    setCab(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleStatusUpdate = (updatedStatus) => {
        try {
            axios
                .patch(`http://localhost:8000/book/status/${bid}`, { statuss: updatedStatus })
                .then((res) => {
                    console.log(res.data);
                    // Update the status in the local state
                    setCab((prevState) => [{ ...prevState[0], statuss: updatedStatus }]);
                    setStatusUpdated(true); // Set statusUpdated to true after the status update

                    // Check if the updated status is 'approved' (1) or 'dropped' (4)
                    if (updatedStatus === 1) {
                        // If approved, make a request to update the status in the 'cab' table to 0
                        axios
                            .patch(`http://localhost:8000/cab/status/${cab[0].cabid}`, { status: 0 })
                            .then((res) => {
                                console.log(res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else if (updatedStatus === 4) {
                        axios
                            .patch(`http://localhost:8000/cab/status/${cab[0].cabid}`, { status: 1 })
                            .then((res) => {
                                console.log(res.data);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getStatusLabel = (statuss) => {
        if (statuss === 0) return 'pending';
        else if (statuss === 1) return 'approved';
        else if (statuss === 2) return 'rejected';
        else if (statuss === 3) return 'canceled';
        else if (statuss === 4) return 'dropped';
        else return '';
    };

    return (
        <div className="container mx-auto py-8">
            {cab.map((val, i) => (
                <div key={i} className="max-w-lg mx-auto gap-5 bg-white rounded-lg shadow-lg overflow-hidden">
                    <div
                        className={`bg-gradient-to-r from-purple-600 to-indigo-600 h-12 flex items-center justify-center ${val.statuss === 0
                            ? 'via-pink-600'
                            : val.statuss === 1
                                ? 'via-green-600'
                                : val.statuss === 2
                                    ? 'via-red-600'
                                    : val.statuss === 3
                                        ? 'via-yellow-600' : "via-blue-600"
                            }`}
                    >
                        <h2 className="text-white text-xl font-semibold">{val.name}</h2>
                    </div>
                    <img src={`http://localhost:8000/${val.cimage}`} className="w-full h-48 object-cover rounded-t-lg" alt="CAB" />
                    <div className="p-4 text-justify">
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Booked By</span>: {val.firstname} {val.lastname}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Customer's email</span>: {val.email}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Customer's Phone no</span>: {val.contact}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Cab Model</span> : {val.model}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Cab Number</span>: {val.cnumber}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Cab Capacity</span>: {val.capacity}
                        </p>
                        <p className="text-gray-500 ">
                            <span className="font-bold text-black text-md">Cab Description</span>: {val.description}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Driver's Name</span>: {val.dname}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Driver's Phone</span>: {val.phone}
                        </p>

                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Selected Location</span>: {val.source_destination}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Date_updated(approve/cancel/reject)</span>:{val.updated_date}
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Total Distance</span>: {val.km} KM.
                        </p>
                        <p className="text-gray-500">
                            <span className="font-bold text-black text-md">Total Fare</span>:Rs. {(val.km) * 50}
                        </p>
                        <div className="mt-4 text-center">
                            {val.statuss === 0 && !statusUpdated && (
                                <button className="text-white py-2 px-4 rounded-xl bg-red-500" onClick={() => handleStatusUpdate(3)}>
                                    Cancel
                                </button>
                            )}
                            {val.statuss === 1 && !statusUpdated && (
                                <button className="text-white py-2 px-4 rounded-xl bg-green-500" onClick={() => handleStatusUpdate(4)}>
                                    Dropped
                                </button>
                            )}
                            {val.statuss === 2 && <span className="text-red-500 font-bold">Rejected</span>}
                            {val.statuss === 3 && <span className="text-yellow-500 font-bold">Canceled</span>}
                            {val.statuss === 4 && <span className="text-blue-500 font-bold">Dropped</span>}

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SingleDashboard;
