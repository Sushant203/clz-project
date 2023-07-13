import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/homepage/footer/Footer";

const Layout = (children) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
