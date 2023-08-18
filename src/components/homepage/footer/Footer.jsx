import React from "react";
import logo from "../../resources/images/logo.png";
import Data from "../../resources/Data";
import { contactMethods } from "../Contact";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary  h-full ">
      <div className="container mx-auto px-4 pt-10 ">
        <div className="flex justify-around  text-white items-center">
          <img src={logo} alt="logos" className="h-20 w-18" />
          <div className="">
            {Data.map((val, i) => {
              return (
                <div key={i} className="">
                  <div className="text-white py-1 text-sm capitalize hover:border-none hover:px-2  hover:rounded-lg px-2  hover:shadow-lg hover:shadow-white ">
                    <Link to={val.path} className="py-1">
                      {val.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          {/* join our community */}
          <div className=" ">
            <h2>Join Our Community</h2>
            <div>
              <input type="text" className="px-6 py-1.5 rounded-sm text-black outline-none" />
              <button
                type="Submit"
                value="submit"
                className="border-2 ring-primary rounded-sm px-4 py-1"
              >
                Join
              </button>
            </div>
          </div>
          <div className="flex gap-6 ">
            {contactMethods.map((val, i) => (
              <a
                key={i}
                href={val.href}
                target={val.target}

              // className={`py-1 flex items-center gap-1 ${
              //   hoveredIndex === i ? "bg-white" : ""
              // }`}
              // onMouseEnter={() => setHoveredIndex(i)}
              // onMouseLeave={() => setHoveredIndex(null)}
              >
                <p className="cursor-pointer">{val.icon}</p>
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-white text-center">
            &copy; 2023
            <span className="font-bold "> Sushant & Himal co.</span> . All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
