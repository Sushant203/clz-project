import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import logo from "../resources/images/logo.png";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
const Navbar = () => {
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //logout
  const handleLogout = () => {};
  //setting
  const handleSettings = () => {};

  const handleDashboardClick = () => {
    setShowDashboard(true);
    console.log("nsfvkkjsf");
  };

  return (
    <nav>
      <div className="flex justify-around bg-primary text-white text-center w-screen h-14 items-center capitalize">
        <div>
          <img src={logo} alt="logo" className="h-16 w-18 " />
        </div>

        <div className="">
          <div className="flex justify-evenly gap-3">
            {NavItems.map((val, i) => {
              return (
                <div key={i} className="">
                  <Link to={val.path}>{val.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
        {/* profile logo section */}
        <h3>
          <CgProfile
            className="text-white text-2xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {isOpen && (
            <div className="absolute right-28 mt-2  w-fit bg-white rounded-md shadow-lg ">
              <button
                className="block px-4 py-1 text-gray-800 w-full hover:text-white hover:bg-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
              {/* settings */}
              <button className="block px-4 py-1 w-full text-gray-800 hover:text-white hover:bg-primary">
                Setting
              </button>
              <button
                onClick={handleDashboardClick}
                className="block px-4 py-1 text-gray-800 hover:text-white hover:bg-primary"
              >
                Dashboard
              </button>
              {showDashboard && <Dashboard />}
            </div>
          )}
        </h3>
      </div>
    </nav>
  );
};

export default Navbar;
