import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/homepage/footer/Footer";
import UserAuthContextapi from "../contextapi/Userauth";
import Login from "../../components/login/Login";
import Signup from "../../components/login/Signup";
import Landing from "../../components/landingpage/Landing";
import DriverForm from "../../components/driverRequest/DriverForm";

const Layout = () => {
  const location = useLocation();
  return (
    <UserAuthContextapi>
      <>
        {location.pathname === "/login" && <Login />}
        {location.pathname === "/signup" && <Signup />}
        {location.pathname === "/landing" && <Landing />}
        {location.pathname === "/drivingrequest" && <DriverForm />}
        {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/landing" && location.pathname !== "/drivingrequest" && (
          <div>
            <Navbar />
            <div className="min-h-screen ">
              <Outlet />
            </div>
            <Footer />
          </div>
        )}
      </>
    </UserAuthContextapi>
  );
};

export default Layout;
