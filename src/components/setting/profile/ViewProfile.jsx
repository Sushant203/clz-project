import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ViewProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/${id}`);
            setProfile(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const handleDelete = async (uid) => {
        const confirmDelete = window.confirm("Are you Sure you want to delete your Account");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/user/${uid}`).then(res => {
                    if (res.status === 200) {
                        toast.success("Account Deleted Successfully");
                        localStorage.clear();
                        navigate('/landing')
                    }
                    else if (res.status === 500) {
                        toast.error("Account cannot be deleted")
                    }
                })
            } catch (error) {

                toast.error("Cannot Delete Account During Bookings madel");
                toast.warn("First Delete Booking History before deleting Account")
                console.log(error)
            }
        }

    }

    return (
        <div className="min-h-screen py-10 flex justify-center items-center">
            {profile.map((val, i) => (
                <div
                    key={i}
                    className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105"
                >
                    <div className="relative rounded-full overflow-hidden w-36 h-36 mx-auto mb-6 p-2 border-4 border-primary">
                        <img
                            src={`http://localhost:8000/${val.image}`}
                            className="w-full h-full object-cover rounded-full"
                            alt="USER"
                        />
                    </div>
                    <div className="text-gray-800 text-center">
                        <h2 className="text-3xl font-bold mb-4 capitalize">
                            {val.firstname} {val.middlename} {val.lastname}
                        </h2>
                        <div className="text-blue-600 font-bold mb-2">Email: {val.email}</div>
                        <div className="text-gray-600 mb-2">Contact: {val.contact}</div>
                        <div className="text-gray-600 mb-2">Address: {val.address}</div>
                        <div className="text-gray-600 mb-2">Gender: {val.gender}</div>
                        <div className="text-gray-600 mb-2">Profile Added: {formatDate(val.created_at)}</div>
                        <div className="text-gray-600 mb-2">Profile Updated: {formatDate(val.updated_at)}</div>
                        <div className="mt-4 flex justify-evenly">
                            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={() => {
                                    handleDelete(val.id)
                                }}
                            >
                                Delete
                            </button>
                            <Link state={val} to={`/profile/editprofile/${id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Update
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
};

export default ViewProfile;
