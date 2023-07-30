import React, { useState, useEffect } from "react";
// import { CgDrop, CgMenu, CgProfile, CgSidebarOpen } from "react-icons/cg";
import { AiFillCaretDown } from "react-icons/ai";
import logo from "../resources/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [Users, setUsers] = useState([]);
  const userid = localStorage.getItem("user_id");
  const fetchData = () => {
    try {
      axios
        .get(`http://localhost:8000/user/${userid}`)
        .then((res) => {
          setUsers(res.data);
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
  }, []);
  const navigate = useNavigate();
  const NavItems = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "about us",
      path: "/about",
    },
    {
      name: "contact",
      path: "/contact",
    },
    {
      name: "Available Cabs",
      path: "/availablecabs",
    },
  ];
  // profile logout and setting dropdown logic
  const [isOpen, setIsOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleDropdown = (event) => {
    setIsOpen(!isOpen);
    event.stopPropagation();
  };

  //logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  //setting
  const handleSettings = () => {};

  const handleDashboardClick = () => {
    setShowDashboard(true);
    // console.log("nsfvkkjsf");
  };

  return (
    <nav>
      <div className="flex justify-around bg-primary text-slate-200  text-center w-full h-14 items-center capitalize">
        <div>
          <img src={logo} alt="logo" className="h-16 w-18 " />
        </div>

        <div className="">
          <div className="flex justify-evenly gap-3">
            {NavItems.map((val, i) => {
              return (
                <div
                  key={i}
                  className="border-2 border-primary hover:border-t-0 hover:border-l-0 hover: border-r-0 hover:border-b-2 hover:border-third"
                >
                  <Link to={val.path}>{val.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
        {/* profile logo section */}
        <h3>
          {Users.map((val, i) => {
            return (
              <div key={i} className="flex gap-2 items-center">
                <div>
                  <img
                    src={`http://localhost:8000/${val.image}`}
                    className="w-10 h-10 rounded-full cursor-pointer "
                    onClick={toggleDropdown}
                    alt="Profile"
                  />
                </div>
                <div onClick={toggleDropdown} className="cursor-pointer">
                  {val.firstname} {val.lastname}
                </div>
                <div className="cursor-pointer" onClick={toggleDropdown}>
                  <AiFillCaretDown />
                </div>
              </div>
            );
          })}
          {/* <CgSidebarOpen
            className="text-white text-2xl cursor-pointer "
            onClick={toggleDropdown} */}
          {/* /> */}
          {isOpen && (
            <div className="absolute right-28 mt-2  w-fit bg-white rounded-md shadow-lg z-20">
              <button
                className="block px-4 py-1 text-gray-800 w-full hover:text-white hover:bg-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
              {/* settings */}
              <div className="block px-4 py-1 w-full text-gray-800 hover:text-white hover:bg-primary">
                Setting
              </div>
              <Link to="/dashboard">
                <div className="block px-4 py-1 w-full text-gray-800 hover:text-white hover:bg-primary">
                  Dashboard
                </div>
              </Link>
            </div>
          )}
        </h3>
      </div>
    </nav>
  );
};

export default Navbar;
