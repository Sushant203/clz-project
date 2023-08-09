import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineVerticalRight } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const userid = localStorage.getItem("user_id");
  const [datas, setDatas] = useState([]);
  const [toggle, setToggle] = useState(false);

  const fetchData = useCallback(() => {
    try {
      axios
        .get(`http://localhost:8000/book/user/${userid}`)
        .then((res) => {
          setDatas(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, toggle]);

  const handleDelete = (id) => {
    try {
      axios
        .delete(`http://localhost:8000/book/${id}`)
        .then((res) => {
          console.log(res.data);

          setToggle(!toggle);
          if (res.status === 200) {
            toast.success("Booking records Deleted Successfully!");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Cannot Delete Cab Record!");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return (
          <span className="px-4 py-1 text-xs rounded-full bg-gray-500 text-white font-bold">
            Pending
          </span>
        );
      case 1:
        return (
          <span className="px-4 py-1 text-xs rounded-full bg-green-500 text-white">
            Approved
          </span>
        );
      case 2:
        return (
          <span className="px-4 py-1 text-xs rounded-full bg-red-500 text-white">
            Rejected
          </span>
        );
      case 3:
        return (
          <span className="px-4 py-1 text-xs rounded-full bg-yellow-500 text-white">
            Canceled
          </span>
        );
      case 4:
        return (
          <span className="px-4 py-1 text-xs rounded-full bg-blue-500 text-white">
            Dropped
          </span>
        );
      default:
        return null;
    }
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <div className="w-full overflow-x-auto">
      <h1 className="text-2xl font-bold my-4">List of My Bookings</h1>
      <table className="w-full">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3">Booking ID</th>
            <th className="px-6 py-3">Booked by</th>
            <th className="hidden sm:table-cell px-6 py-3">Selected Cab</th>
            <th className="hidden sm:table-cell px-6 py-3">Driver's Name</th>
            <th className="hidden md:table-cell px-6 py-3">Date Booked</th>
            <th className="px-6 py-3 hidden sm:table-cell">Status</th>
            <th className="px-6 py-3 text-right pr-12 sm:pr-6">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {datas.map((val, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-blue-100" : "bg-blue-50"}>
              <td className="px-6 py-4">{val.id}</td>
              <td className="px-6 py-4">
                {val.firstname} {val.middlename} {val.lastname}
              </td>
              <td className="hidden sm:table-cell px-6 py-4">{val.name}</td>
              <td className="hidden sm:table-cell px-6 py-4">{val.dname}</td>
              <td className="hidden md:table-cell px-6 py-4">
                {formatDate(val.booked_at)}
              </td>
              <td className="px-6 py-4  sm:flex-row  sm:justify-start hidden sm:table-cell">
                {getStatusLabel(val.statuss)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 justify-start sm:justify-end">
                  <div
                    className="cursor-pointer text-red-700"
                    onClick={() => {
                      handleDelete(val.bid);
                    }}
                  >
                    <AiFillDelete />
                  </div>

                  <div className="cursor-pointer text-green-700">
                    <Link to={`/singledash/${userid}/${val.bid}`}>
                      <FaEye />
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
