import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/homepage/footer/Footer";

const Layout = (children) => {
  return (
    <div>
      <div>
        <Navbar />
        {/* <Footer /> */}
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
