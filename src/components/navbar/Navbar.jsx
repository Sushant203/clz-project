import React, { useState, useEffect, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import logo from "../resources/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

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
  // const [showDashboard, setShowDashboard] = useState(false);
  // console.log(showDashboard)
  const profileRef = useRef();

  const toggleDropdown = (event) => {
    setIsOpen(!isOpen);
    event.stopPropagation();
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useOutsideClick(profileRef, closeDropdown);

  //logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/landing");
  };
  //setting
  // const handleSettings = () => { };

  // const handleDashboardClick = () => {
  //   setShowDashboard(true);
  // };

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
              <div key={i} className="flex gap-2 items-center" ref={profileRef}>
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
              {/* profile */}
              <Link to={`/profile/${userid}`}>
                <div className="block px-4 py-1 w-full text-gray-800 hover:text-white hover:bg-primary">
                  Profile
                </div>
              </Link>
              {/* settings */}
              {/* <Link to="/setting">
                <div className="block px-4 py-1 w-full text-gray-800 hover:text-white hover:bg-primary">
                  Setting
                </div>
              </Link> */}
              <Link to="/dashboard">
                <div className="block px-4 py-1 w-full text-gray-800 hover:text-white hover:bg-primary">
                  Dashboard
                </div>
              </Link>
              <button
                className="block px-4 py-1 text-gray-800 w-full hover:text-white hover:bg-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </h3>
      </div>
    </nav>
  );
};

export default Navbar;
