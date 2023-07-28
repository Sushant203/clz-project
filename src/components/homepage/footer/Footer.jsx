import React from "react";
import logo from "../../resources/images/logo.png";
import Data from "../../resources/Data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary  h-full ">
      <div className="container mx-auto px-4">
        <div className="flex justify-around  text-white">
          <img src={logo} alt="logos" className="h-20 w-18" />
          <div>
            {Data.map((val, i) => {
              return (
                <div key={i}>
                  <div className="text-white capitalize hover:border-none hover:px-2 py-2 hover:rounded-lg px-2 hover:translate-x-3 hover:shadow-lg hover:shadow-white">
                    <Link to={val.path}>{val.name}</Link>
                  </div>
                </div>
              );
            })}
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
