import React from "react";
import { CgProfile } from "react-icons/cg";
import logo from "../resources/images/logo.png";
import { Link } from "react-router-dom";
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
      path: "/available cabs",
    },
  ];
  return (
    <nav>
      <div className="flex justify-around bg-[#1b8bd0] text-white text-center w-screen h-14 items-center capitalize">
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
          <CgProfile className="text-white text-2xl" />
        </h3>
      </div>
    </nav>
  );
};

export default Navbar;
